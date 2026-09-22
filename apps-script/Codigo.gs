/**
 * Backend do site de casamento — armazenamento de confirmações e recados.
 *
 * Este arquivo NÃO roda no site: ele é colado no editor do Google Apps Script
 * vinculado à planilha. Instruções completas em apps-script/README.md.
 *
 * Endpoints (mesma URL do Web App):
 *   POST { tipo: 'rsvp', ... }     -> acrescenta uma linha na aba Confirmados
 *   POST { tipo: 'recado', ... }   -> acrescenta uma linha na aba Recados
 *   GET  ?confirmar=<token>        -> o POST daquele token chegou a gravar?
 *   GET                            -> versão + recados aprovados
 *
 * Todo GET aceita &callback=<fn> e responde em JSONP. O site precisa disso: o
 * /exec responde com redirecionamento e o navegador não consegue ler a resposta
 * de um fetch comum, mesmo quando a gravação deu certo.
 */

// Marcador de versão. Abra a URL /exec no navegador para ver qual versão está
// realmente publicada — é a forma rápida de saber se um redeploy pegou.
var VERSAO = '5-jsonp';

var ABA_RSVP = 'Confirmados';
var ABA_RECADOS = 'Recados';

var COLUNAS_RSVP = [
  'Data/Hora',
  'Nome',
  'E-mail',
  'Telefone',
  'Vai comparecer',
  'Total de pessoas',
  'Acompanhantes',
  'Restrição alimentar',
  'Detalhe da restrição',
  'Mensagem aos noivos',
  'Situação',
];

var COLUNAS_RECADOS = ['Data/Hora', 'Nome', 'Recado', 'Aprovado'];

var COL_EMAIL = 3;
var COL_SITUACAO = COLUNAS_RSVP.length;

var ATUAL = 'Atual';
var SUBSTITUIDA = 'Substituída';

// ---------------------------------------------------------------- roteamento

function doPost(e) {
  try {
    var corpo = JSON.parse(e.postData.contents);
    var resultado;

    if (corpo.tipo === 'rsvp') {
      resultado = salvarRsvp(corpo);
    } else if (corpo.tipo === 'recado') {
      resultado = salvarRecado(corpo);
    } else {
      return json({ok: false, erro: 'Tipo desconhecido: ' + corpo.tipo});
    }

    // Só registra o token depois de gravar de fato. É isso que o site consulta
    // para saber se pode mostrar a tela de confirmação.
    if (resultado.ok) registrarToken(corpo.token);

    return json(resultado);
  } catch (err) {
    return json({ok: false, erro: String(err)});
  }
}

function doGet(e) {
  var parametros = (e && e.parameter) || {};

  try {
    var resposta = parametros.confirmar
      ? {ok: true, versao: VERSAO, gravado: foiGravado(parametros.confirmar)}
      : {ok: true, versao: VERSAO, recados: lerRecadosAprovados()};

    return responder(parametros.callback, resposta);
  } catch (err) {
    return responder(parametros.callback, {ok: false, erro: String(err)});
  }
}

/**
 * Guarda por 10 minutos a marca de que este envio foi gravado.
 *
 * Fica no cache do script, não na planilha: é informação descartável, só serve
 * para o site confirmar o envio segundos depois.
 */
function registrarToken(token) {
  if (!token) return;
  CacheService.getScriptCache().put('envio:' + token, '1', 600);
}

function foiGravado(token) {
  return CacheService.getScriptCache().get('envio:' + token) === '1';
}

// -------------------------------------------------------------------- escrita

/**
 * Grava a confirmação sempre como uma linha nova — nada é sobrescrito.
 *
 * A linha nova entra como "Atual" e as respostas anteriores do mesmo e-mail
 * passam a "Substituída". Assim o histórico fica preservado e, para contar os
 * convidados, basta filtrar a coluna Situação por "Atual".
 */
function salvarRsvp(dados) {
  var aba = obterAba(ABA_RSVP, COLUNAS_RSVP);
  var trava = LockService.getScriptLock();
  trava.waitLock(20000);

  try {
    aba.appendRow([
      new Date(),
      dados.nome || '',
      dados.email || '',
      dados.telefone || '',
      dados.vaiComparecer ? 'Sim' : 'Não',
      dados.totalPessoas || 0,
      (dados.acompanhantes || []).join(', '),
      dados.restricaoAlimentar || '',
      dados.detalheRestricao || '',
      dados.mensagem || '',
      ATUAL,
    ]);

    marcarAnteriores(aba, dados.email, aba.getLastRow());

    return {ok: true};
  } finally {
    trava.releaseLock();
  }
}

/**
 * Marca como "Substituída" toda resposta anterior do mesmo e-mail.
 *
 * Sem e-mail não há como saber que duas linhas são da mesma pessoa, então a
 * linha simplesmente fica como "Atual" — melhor do que agrupar por nome e
 * arriscar juntar dois convidados homônimos.
 */
function marcarAnteriores(aba, email, linhaNova) {
  if (!email) return;

  var ultimaLinha = aba.getLastRow();
  if (ultimaLinha < 3) return;

  var total = ultimaLinha - 1;
  var emails = aba.getRange(2, COL_EMAIL, total, 1).getValues();
  var situacoes = aba.getRange(2, COL_SITUACAO, total, 1).getValues();
  var alvo = normalizar(email);
  var mudou = false;

  for (var i = 0; i < total; i++) {
    var linha = i + 2;
    if (linha === linhaNova) continue;
    if (normalizar(emails[i][0]) !== alvo) continue;
    if (situacoes[i][0] === SUBSTITUIDA) continue;

    situacoes[i][0] = SUBSTITUIDA;
    mudou = true;
  }

  if (mudou) {
    aba.getRange(2, COL_SITUACAO, total, 1).setValues(situacoes);
  }
}

/**
 * Grava o recado como NÃO aprovado. Os noivos marcam a caixinha da coluna
 * "Aprovado" na planilha para o recado aparecer no mural do site.
 */
function salvarRecado(dados) {
  var aba = obterAba(ABA_RECADOS, COLUNAS_RECADOS);
  var trava = LockService.getScriptLock();
  trava.waitLock(20000);

  try {
    aba.appendRow([new Date(), dados.nome || '', dados.recado || '', false]);

    // Transforma a célula recém-criada em caixinha de seleção.
    aba
      .getRange(aba.getLastRow(), 4)
      .setDataValidation(
        SpreadsheetApp.newDataValidation().requireCheckbox().build(),
      );

    return {ok: true};
  } finally {
    trava.releaseLock();
  }
}

// -------------------------------------------------------------------- leitura

function lerRecadosAprovados() {
  var aba = obterAba(ABA_RECADOS, COLUNAS_RECADOS);
  if (aba.getLastRow() < 2) return [];

  var valores = aba
    .getRange(2, 1, aba.getLastRow() - 1, COLUNAS_RECADOS.length)
    .getValues();

  var aprovados = [];

  for (var i = 0; i < valores.length; i++) {
    var linha = valores[i];
    if (linha[3] !== true) continue;
    if (!linha[1] && !linha[2]) continue;

    aprovados.push({
      id: 'sheet-' + (i + 2),
      nome: String(linha[1]),
      recado: String(linha[2]),
      data: formatarData(linha[0]),
    });
  }

  return aprovados.reverse(); // mais recentes primeiro
}

// -------------------------------------------------------------------- apoio

/**
 * Devolve a aba, criando-a se não existir.
 *
 * Também reescreve o cabeçalho quando ele tem menos colunas que o esperado —
 * é o que atualiza uma aba criada por uma versão anterior do script, sem
 * precisar apagar nada.
 */
function obterAba(nome, colunas) {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(nome);

  if (!aba) {
    aba = planilha.insertSheet(nome);
    escreverCabecalho(aba, colunas);
    return aba;
  }

  if (aba.getLastColumn() < colunas.length) {
    escreverCabecalho(aba, colunas);
  }

  return aba;
}

function escreverCabecalho(aba, colunas) {
  aba
    .getRange(1, 1, 1, colunas.length)
    .setValues([colunas])
    .setFontWeight('bold')
    .setBackground('#608334')
    .setFontColor('#FFFFFF');
  aba.setFrozenRows(1);
}

function normalizar(valor) {
  return String(valor || '').trim().toLowerCase();
}

function formatarData(valor) {
  if (!(valor instanceof Date)) return String(valor || '');
  return Utilities.formatDate(
    valor,
    Session.getScriptTimeZone(),
    'dd/MM/yyyy',
  );
}

function responder(callback, objeto) {
  return callback ? jsonp(callback, objeto) : json(objeto);
}

function json(objeto) {
  return ContentService.createTextOutput(
    JSON.stringify(objeto),
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Devolve a resposta como chamada de função, para ser carregada via <script>.
 *
 * O nome vem da URL, então é validado antes de entrar no corpo da resposta —
 * sem isso qualquer um poderia injetar código na página que consome o endpoint.
 */
function jsonp(callback, objeto) {
  if (!/^[A-Za-z_$][A-Za-z0-9_$]{0,63}$/.test(callback)) {
    return json({ok: false, erro: 'Nome de callback inválido.'});
  }

  return ContentService.createTextOutput(
    callback + '(' + JSON.stringify(objeto) + ');',
  ).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

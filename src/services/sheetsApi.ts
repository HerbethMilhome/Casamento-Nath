/**
 * Comunicação com o Google Apps Script que grava na planilha dos noivos.
 *
 * O Apps Script é hostil a chamadas de navegador: o /exec responde com um
 * redirecionamento, e essa etapa não carrega os cabeçalhos de CORS. Um fetch
 * comum rejeita a resposta mesmo quando a gravação deu certo. Por isso:
 *
 *   - escrita  -> POST com mode 'no-cors' (sai da máquina, resposta opaca)
 *   - leitura  -> JSONP via <script>, que não passa por CORS
 *
 * Como a resposta do POST é ilegível, cada envio leva um token e depois é
 * confirmado por JSONP. É o que impede o site de dizer "confirmado!" para um
 * convidado cujo RSVP nunca chegou na planilha.
 */

import {DietaryRestriction} from '../types';

const ENDPOINT = import.meta.env.VITE_SHEETS_ENDPOINT as string | undefined;

/** Rótulos legíveis — a planilha é lida por pessoas, não pelo código. */
const RESTRICOES: Record<DietaryRestriction, string> = {
  nao: 'Nenhuma',
  vegetariana: 'Vegetariana',
  vegana: 'Vegana',
  sem_lactose: 'Sem lactose',
  sem_gluten: 'Sem glúten',
  alergia_alimentar: 'Alergia alimentar',
  outra: 'Outra',
};

export interface RsvpPayload {
  name: string;
  email: string;
  phone: string;
  attending: boolean;
  plusOneNames: string[];
  dietaryRestriction: DietaryRestriction;
  dietaryRestrictionDetail?: string;
  message?: string;
}

export interface RecadoAprovado {
  id: string;
  nome: string;
  recado: string;
  data: string;
}

export const sheetsConfigurado = (): boolean =>
  typeof ENDPOINT === 'string' && ENDPOINT.startsWith('https://');

function exigirEndpoint(): string {
  if (!sheetsConfigurado()) {
    throw new Error(
      'VITE_SHEETS_ENDPOINT não configurado. Veja apps-script/README.md.',
    );
  }
  return ENDPOINT as string;
}

const esperar = (ms: number) => new Promise(r => setTimeout(r, ms));

let contadorCallback = 0;

/**
 * Faz um GET carregando o endpoint como <script>. Contorna o CORS por completo,
 * já que tag de script não está sujeita a ele.
 */
function jsonp<T>(
  parametros: Record<string, string>,
  timeoutMs = 10000,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const nome = `__casamento_cb_${contadorCallback++}`;
    const tag = document.createElement('script');
    // O Apps Script devolve uma chamada de função; ela precisa existir no
    // escopo global para a tag de script encontrar.
    const janela = window as unknown as Record<string, unknown>;

    const limpar = () => {
      clearTimeout(temporizador);
      delete janela[nome];
      tag.remove();
    };

    const temporizador = setTimeout(() => {
      limpar();
      reject(new Error('A planilha demorou demais para responder.'));
    }, timeoutMs);

    janela[nome] = (dados: T) => {
      limpar();
      resolve(dados);
    };

    tag.onerror = () => {
      limpar();
      reject(new Error('Não foi possível contatar a planilha.'));
    };

    // '_' quebra o cache: sem ele o navegador guarda a resposta da tag de
    // script e devolve recados velhos por minutos a fio.
    const query = new URLSearchParams({
      ...parametros,
      callback: nome,
      _: Date.now().toString(36),
    });
    tag.src = `${exigirEndpoint()}?${query.toString()}`;
    document.head.appendChild(tag);
  });
}

function gerarToken(): string {
  return `t${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Pergunta ao script se aquele envio chegou a ser gravado.
 *
 * Tenta algumas vezes porque a gravação e a consulta são requisições
 * independentes — a segunda pode chegar antes de a primeira terminar.
 */
async function confirmarGravacao(token: string): Promise<void> {
  const esperas = [700, 1200, 1800, 2500];

  for (const espera of esperas) {
    await esperar(espera);

    try {
      const resposta = await jsonp<{ok: boolean; gravado?: boolean}>({
        confirmar: token,
      });
      if (resposta.gravado) return;
    } catch {
      // Rede instável: continua tentando dentro do orçamento acima.
    }
  }

  throw new Error('Não foi possível confirmar a gravação na planilha.');
}

async function enviar(corpo: Record<string, unknown>): Promise<void> {
  const token = gerarToken();

  // 'no-cors' + text/plain mantém a requisição "simples": o navegador manda
  // direto, sem preflight, que o Apps Script não sabe responder. Em troca, a
  // resposta vem opaca — daí a confirmação logo abaixo.
  await fetch(exigirEndpoint(), {
    method: 'POST',
    mode: 'no-cors',
    headers: {'Content-Type': 'text/plain;charset=utf-8'},
    body: JSON.stringify({...corpo, token}),
  });

  await confirmarGravacao(token);
}

/** Grava a confirmação de presença como uma linha nova na aba Confirmados. */
export async function enviarRsvp(dados: RsvpPayload): Promise<void> {
  await enviar({
    tipo: 'rsvp',
    nome: dados.name,
    email: dados.email,
    telefone: dados.phone,
    vaiComparecer: dados.attending,
    totalPessoas: dados.attending ? 1 + dados.plusOneNames.length : 0,
    acompanhantes: dados.plusOneNames,
    restricaoAlimentar: RESTRICOES[dados.dietaryRestriction] ?? '',
    detalheRestricao: dados.dietaryRestrictionDetail ?? '',
    mensagem: dados.message ?? '',
  });
}

/** Grava o recado. Entra como não aprovado até os noivos marcarem na planilha. */
export async function enviarRecado(
  nome: string,
  recado: string,
): Promise<void> {
  await enviar({tipo: 'recado', nome, recado});
}

/**
 * Busca os recados já aprovados.
 *
 * Devolve null quando a consulta falhou — diferente de [], que significa "a
 * planilha respondeu e não há recado aprovado". Sem essa distinção, uma falha
 * de rede apagaria o mural de quem já estava com a página aberta.
 */
export async function buscarRecadosAprovados(): Promise<
  RecadoAprovado[] | null
> {
  if (!sheetsConfigurado()) return null;

  try {
    const resposta = await jsonp<{ok: boolean; recados?: RecadoAprovado[]}>({});
    return resposta.ok && Array.isArray(resposta.recados)
      ? resposta.recados
      : null;
  } catch {
    return null;
  }
}

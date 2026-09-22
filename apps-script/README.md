# Armazenamento das confirmações e recados

As confirmações de presença (RSVP) e os recados dos convidados são gravados numa
**planilha do Google**, de graça e sem servidor. O intermediário é um Google Apps
Script publicado como Web App.

```
Convidado envia   →  POST  →  Apps Script  →  linha na planilha
Mural do site     ←  GET   ←  Apps Script  ←  linhas com "Aprovado" marcado
```

Leva uns 10 minutos e só precisa ser feito uma vez.

---

## 1. Criar a planilha

1. Abra <https://sheets.new> e crie uma planilha.
2. Dê um nome — por exemplo **Casamento Nathalie & Igor — Respostas**.

Não precisa criar abas nem colunas: o script cria `Confirmados` e `Recados` com os
cabeçalhos certos no primeiro envio.

## 2. Colar o script

1. Na planilha: menu **Extensões → Apps Script**.
2. Apague todo o conteúdo do arquivo `Código.gs` que aparece.
3. Cole o conteúdo de [`Codigo.gs`](./Codigo.gs) deste repositório.
4. Salve (ícone de disquete ou `Ctrl+S`).

## 3. Publicar como Web App

1. No editor do Apps Script, clique em **Implantar → Nova implantação**.
2. No ícone de engrenagem, escolha o tipo **App da Web**.
3. Preencha:
   - **Executar como:** `Eu` (sua conta Google)
   - **Quem pode acessar:** `Qualquer pessoa`
4. Clique em **Implantar**.
5. O Google vai pedir autorização. Aparecerá um aviso de "app não verificado" —
   é esperado, o app é seu. Clique em **Avançado → Acessar (nome do projeto)**.
6. Copie a **URL do app da Web**. Ela termina em `/exec`.

> **"Quem pode acessar: Qualquer pessoa" é seguro aqui?**
> Sim, com uma ressalva. O script só sabe fazer duas coisas: acrescentar uma
> linha e devolver os recados **já aprovados**. Ninguém consegue ler a lista de
> convidados, e-mails ou telefones através dele. A planilha em si continua
> privada na sua conta Google.

## 4. Ligar no site

Crie um arquivo `.env.local` na raiz do projeto (ele é ignorado pelo Git):

```env
VITE_SHEETS_ENDPOINT="https://script.google.com/macros/s/SEU_ID_AQUI/exec"
```

Cole a URL do passo 3. Reinicie o `npm run dev` — o Vite só lê variáveis de
ambiente na inicialização.

> Ao publicar o site (Vercel, Netlify, Cloud Run...), cadastre a mesma variável
> no painel de variáveis de ambiente do serviço.

## 5. Testar

1. Abra o site, preencha a confirmação de presença e envie.
2. Uma aba **Confirmados** deve aparecer na planilha com a sua linha.
3. Deixe um recado. Uma aba **Recados** deve aparecer com a coluna
   **Aprovado** desmarcada.

---

## Como os noivos aprovam um recado

Na aba **Recados**, marque a caixinha da coluna **Aprovado**.

O site busca os recados quando a página carrega e de novo toda vez que você
volta para a aba dele. Então, depois de marcar na planilha, basta clicar na aba
do site — o recado aparece. Quem está com a página aberta há um tempo só vê o
recado novo ao voltar para a aba ou recarregar.

Para esconder um recado que já está no ar, basta desmarcar.

## O que cai em cada aba

**Confirmados** — uma linha por envio. Nada é sobrescrito.

Se a mesma pessoa responder de novo (mesmo e-mail), a resposta nova entra como
`Atual` e as anteriores passam a `Substituída` automaticamente. O histórico
fica preservado e a contagem continua simples: **filtre a coluna Situação por
`Atual`** para ver quem vale.

| Coluna | Observação |
|---|---|
| Data/Hora | Momento do último envio |
| Nome, E-mail, Telefone | Informados pelo convidado |
| Vai comparecer | `Sim` / `Não` |
| Total de pessoas | O convidado + acompanhantes |
| Acompanhantes | Nomes separados por vírgula |
| Restrição alimentar | Rótulo legível (ex.: `Sem glúten`) |
| Detalhe da restrição | Preenchido em "alergia alimentar" e "outra" |
| Mensagem aos noivos | Campo opcional do formulário |
| Situação | `Atual` ou `Substituída` — preenchida pelo script |

**Recados** — uma linha por recado, com a coluna **Aprovado** controlando o
mural.

> Se o convidado escrever uma mensagem dentro do formulário de RSVP, ela é
> registrada nos dois lugares: na coluna *Mensagem aos noivos* da aba Confirmados e
> como um recado pendente de aprovação. Assim vocês podem publicá-la no mural
> se quiserem, sem perder o vínculo com a confirmação.

> Quem responde **sem e-mail** não tem como ser agrupado, então a linha fica
> sempre como `Atual`. Agrupar por nome arriscaria juntar dois convidados
> homônimos.

## Conferindo qual versão está no ar

Abra a URL do Web App (a que termina em `/exec`) direto no navegador. A
resposta traz o número da versão:

```json
{"ok":true,"versao":"5-jsonp","recados":[]}
```

Se o campo `versao` não aparecer, ou trouxer um número menor, o redeploy não
pegou — veja a seção abaixo.

## Depois de alterar o `Codigo.gs`

Editar o script não basta — é preciso republicar:
**Implantar → Gerenciar implantações → (ícone de lápis) → Versão: Nova versão → Implantar**.
A URL continua a mesma.

## Problemas comuns

| Sintoma | Causa provável |
|---|---|
| "Não conseguimos registrar sua confirmação" | URL errada no `.env.local`, ou o `npm run dev` não foi reiniciado |
| Envio funciona, mas nada chega na planilha | A implantação não foi atualizada após editar o script |
| Erro de CORS no console | A implantação não está como **Qualquer pessoa** |
| Recado não aparece no mural | A caixinha **Aprovado** não foi marcada |
| Página pede login do Google | "Executar como" está diferente de `Eu` |

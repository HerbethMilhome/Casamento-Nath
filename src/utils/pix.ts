/**
 * Builds a static PIX "BR Code" (the copia-e-cola string behind the QR).
 * Spec: Manual do BR Code / EMV®QRCPS, as adopted by the Banco Central.
 */

interface PixPayloadInput {
  /** The PIX key exactly as registered (e-mail, CPF/CNPJ, phone or random). */
  key: string;
  /** Receiver name — max 25 chars in the code. */
  name: string;
  /** Receiver city — max 15 chars in the code. */
  city: string;
  /** Optional amount in BRL. Omitted or 0 lets the payer type the value. */
  amount?: number;
  /** Optional identifier shown in the payer's statement. Max 25 chars. */
  txid?: string;
}

/** id + 2-digit length + value */
const field = (id: string, value: string): string =>
  `${id}${String(value.length).padStart(2, '0')}${value}`;

/**
 * Banks reject accents and most symbols in the free-text fields, so strip them
 * and keep the result inside its maximum length.
 */
const sanitize = (value: string, maxLength: number): string =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9 ]/g, '')
    .trim()
    .slice(0, maxLength)
    .toUpperCase();

/** CRC16/CCITT-FALSE — poly 0x1021, init 0xFFFF, no final xor. */
export const crc16 = (payload: string): string => {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i += 1) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
};

export const buildPixPayload = ({ key, name, city, amount, txid }: PixPayloadInput): string => {
  const merchantAccount = field('00', 'br.gov.bcb.pix') + field('01', key.trim());

  let payload =
    field('00', '01') +
    field('26', merchantAccount) +
    field('52', '0000') +
    field('53', '986');

  if (amount && amount > 0) {
    payload += field('54', amount.toFixed(2));
  }

  payload +=
    field('58', 'BR') +
    field('59', sanitize(name, 25) || 'RECEBEDOR') +
    field('60', sanitize(city, 15) || 'BRASIL') +
    field('62', field('05', sanitize(txid || '', 25) || '***'));

  const withCrcId = `${payload}6304`;
  return `${withCrcId}${crc16(withCrcId)}`;
};

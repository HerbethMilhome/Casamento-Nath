import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Gift, GiftCategory } from '../../types';
import { Check, Copy, Heart, Info, QrCode, Search, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { GiftIllustration } from '../common/GiftIllustration';
import { buildPixPayload } from '../../utils/pix';

const CATEGORIAS: GiftCategory[] = [
  'Eletrodomésticos',
  'Cama, mesa e banho',
  'Cozinha',
  'Organização e utilidades',
];

type Faixa = 'todas' | 'ate150' | '150a300' | 'acima300';

const FAIXAS: { id: Faixa; rotulo: string; cabe: (preco: number) => boolean }[] = [
  { id: 'todas', rotulo: 'Todos os valores', cabe: () => true },
  { id: 'ate150', rotulo: 'Até R$ 150', cabe: (p) => p <= 150 },
  { id: '150a300', rotulo: 'R$ 151 a R$ 300', cabe: (p) => p > 150 && p <= 300 },
  { id: 'acima300', rotulo: 'Acima de R$ 300', cabe: (p) => p > 300 },
];

const reais = (valor: number): string =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/** Lowercase, no accents, no punctuation: "Micro-ondas" and "microondas" match. */
const normalizar = (texto: string): string =>
  texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

/** What the dialog shows: a catalogue item, or the free contribution. */
type Escolha = { tipo: 'presente'; presente: Gift } | { tipo: 'livre' };

/** Small watercolour lily used as the section ornament. */
const Lirio: React.FC<{ cor: string; ouro: string }> = ({ cor, ouro }) => (
  <svg viewBox="0 0 120 40" className="w-28 h-10 mx-auto" aria-hidden="true">
    <path d="M10 30 q25 -4 50 0 q25 4 50 0" fill="none" stroke={ouro} strokeWidth="1.2" opacity="0.7" />
    <g fill="none" stroke={cor} strokeWidth="1.4" strokeLinecap="round" opacity="0.8">
      <path d="M60 30 q-3 -14 -12 -19 q-2 11 5 17" />
      <path d="M60 30 q3 -14 12 -19 q2 11 -5 17" />
      <path d="M60 30 q-9 -9 -20 -8 q5 9 15 11" />
      <path d="M60 30 q9 -9 20 -8 q-5 9 -15 11" />
      <path d="M60 30 v-17" />
      <path d="M38 31 q-10 -6 -18 -2 M82 31 q10 -6 18 -2" />
    </g>
    <circle cx="60" cy="30" r="2.2" fill={ouro} />
  </svg>
);

export const GiftsSection: React.FC = () => {
  const { gifts, wedding } = useWedding();
  const olive = wedding.theme?.primaryColor || '#657153';
  const gold = wedding.theme?.accentColor || '#A98C5B';

  const [categoria, setCategoria] = useState<GiftCategory | 'Todas'>('Todas');
  const [faixa, setFaixa] = useState<Faixa>('todas');
  const [busca, setBusca] = useState('');
  const [escolha, setEscolha] = useState<Escolha | null>(null);
  const [copiou, setCopiou] = useState<'chave' | 'codigo' | null>(null);

  const fecharRef = useRef<HTMLButtonElement | null>(null);
  const ultimoFocoRef = useRef<HTMLElement | null>(null);

  const visiveis = useMemo(() => {
    const termo = normalizar(busca);
    const faixaAtual = FAIXAS.find((f) => f.id === faixa) ?? FAIXAS[0];
    return gifts
      .filter((g) => categoria === 'Todas' || g.category === categoria)
      .filter((g) => faixaAtual.cabe(g.price))
      .filter((g) => !termo || normalizar(g.title).includes(termo))
      .sort((a, b) => a.price - b.price || a.order - b.order);
  }, [gifts, categoria, faixa, busca]);

  const filtrando = categoria !== 'Todas' || faixa !== 'todas' || busca.trim() !== '';

  const limparFiltros = () => {
    setCategoria('Todas');
    setFaixa('todas');
    setBusca('');
  };

  // BR Code for the open choice. If it cannot be built, the dialog falls back
  // to the key and the instructions — never to a made-up code.
  const codigoPix = useMemo(() => {
    if (!escolha || !wedding.pixKey) return null;
    try {
      return buildPixPayload({
        key: wedding.pixKey,
        name: wedding.pixReceiverName,
        city: wedding.pixCity,
        amount: escolha.tipo === 'presente' ? escolha.presente.price : undefined,
      });
    } catch {
      return null;
    }
  }, [escolha, wedding.pixKey, wedding.pixReceiverName, wedding.pixCity]);

  const abrir = (nova: Escolha) => {
    ultimoFocoRef.current = document.activeElement as HTMLElement | null;
    setCopiou(null);
    setEscolha(nova);
  };

  const fechar = useCallback(() => {
    setEscolha(null);
    ultimoFocoRef.current?.focus();
  }, []);

  const copiar = async (texto: string, qual: 'chave' | 'codigo') => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiou(qual);
      setTimeout(() => setCopiou(null), 3000);
    } catch {
      // Clipboard blocked (older browser / insecure context): the text stays
      // visible on screen for the guest to copy by hand.
    }
  };

  useEffect(() => {
    if (!escolha) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar();
    };
    document.addEventListener('keydown', onKey);
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    fecharRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflowAnterior;
    };
  }, [escolha, fechar]);

  const pill = (ativo: boolean) =>
    `px-3.5 py-2 rounded-full text-[11px] tracking-wider uppercase transition-all cursor-pointer focus-gold ${
      ativo ? 'text-white font-medium shadow-sm' : 'glass text-[#55594A] hover:text-[#2C3225]'
    }`;

  return (
    <section id="presentes" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* 2. Cabeçalho */}
        <header className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] tracking-[0.25em] uppercase font-semibold block mb-2" style={{ color: gold }}>
            Mimo & Carinho
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2C3225] font-normal mb-3">
            Nossa Lista de Presentes
          </h2>
          <Lirio cor={olive} ouro={gold} />

          <blockquote className="mt-6 font-cormorant text-lg sm:text-xl text-[#55594A] leading-relaxed space-y-3">
            <p>“Celebrar esse momento ao lado de pessoas tão especiais já é o nosso maior presente!</p>
            <p>
              Para aqueles que desejarem nos presentear, preparamos uma lista simbólica com itens que
              representam o carinho e a construção do nosso novo lar.
            </p>
            <p>Escolham com o coração! Cada gesto de carinho fará parte da nossa história.</p>
          </blockquote>
          <p className="mt-4 font-cormorant italic text-[#55594A]">Com amor,</p>
          <p className="font-script text-3xl" style={{ color: olive }}>Nathalie & Igor”</p>
        </header>

        {/* 3. Aviso explicativo */}
        <aside
          className="max-w-3xl mx-auto mb-12 rounded-3xl bg-white/70 border border-[#E9DDCC] p-6 sm:p-8"
          style={{ borderLeft: `4px solid ${gold}` }}
          aria-labelledby="como-funciona"
        >
          <h3 id="como-funciona" className="flex items-center gap-2 font-serif text-xl sm:text-2xl text-[#2C3225] mb-4">
            <Info size={20} style={{ color: gold }} className="shrink-0" />
            Como funciona nossa lista de presentes?
          </h3>
          <div className="space-y-3 text-sm sm:text-[15px] text-[#3F463A] leading-relaxed">
            <p>
              Os produtos e valores apresentados nesta página são <strong>meramente ilustrativos</strong> e
              representam sugestões simbólicas de presentes.
            </p>
            <p>
              Ao escolher um item, <strong>você não estará comprando o produto físico</strong>. O valor
              correspondente será oferecido aos noivos por meio de uma contribuição via PIX.
            </p>
            <p>
              Não é necessário comprar o produto na Amazon, em outra loja ou realizar qualquer entrega.
            </p>
            <p>
              Após selecionar o presente, você terá acesso à nossa chave PIX e ao QR Code para realizar a
              contribuição diretamente pelo aplicativo do seu banco.
            </p>
            <p className="font-medium" style={{ color: olive }}>
              Sua presença e seu carinho são o que mais importam. Presentear é totalmente opcional!
            </p>
          </div>
        </aside>

        {/* Contribuição livre */}
        <div className="max-w-3xl mx-auto mb-12 glass rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-28 h-20 rounded-2xl overflow-hidden shrink-0 border border-[#E9DDCC]">
            <GiftIllustration motif="coracao" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-serif text-xl text-[#2C3225]">Contribuição com carinho</h3>
            <p className="text-sm text-[#55594A] mt-1">
              Prefere não escolher um item? Envie o valor que desejar — você define na hora, pelo app do banco.
            </p>
          </div>
          <button
            type="button"
            onClick={() => abrir({ tipo: 'livre' })}
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-white text-xs tracking-wider uppercase font-semibold px-6 py-3.5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer focus-gold"
            style={{ backgroundColor: olive }}
          >
            <Heart size={14} />
            Contribuir via PIX
          </button>
        </div>

        {/* 7. Busca e filtros */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-md mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7C7D6C]" aria-hidden="true" />
            <input
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar presente pelo nome"
              aria-label="Buscar presente pelo nome"
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/80 border border-[#E9DDCC] text-sm text-[#2C3225] placeholder:text-[#7C7D6C] focus:outline-none focus:ring-2 focus:ring-[#A98C5B]/40"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Categoria">
            {(['Todas', ...CATEGORIAS] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategoria(c)}
                aria-pressed={categoria === c}
                className={pill(categoria === c)}
                style={categoria === c ? { backgroundColor: olive } : undefined}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Faixa de valor">
            {FAIXAS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFaixa(f.id)}
                aria-pressed={faixa === f.id}
                className={pill(faixa === f.id)}
                style={faixa === f.id ? { backgroundColor: gold } : undefined}
              >
                {f.rotulo}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-[#7C7D6C]" aria-live="polite">
            {visiveis.length === 1 ? '1 presente' : `${visiveis.length} presentes`} · do menor para o maior valor ·
            valores sugeridos, sem nenhuma obrigação
          </p>
        </div>

        {/* 4. Catálogo */}
        {visiveis.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 list-none">
            {visiveis.map((presente) => (
              <li key={presente.id}>
                <article className="glass rounded-3xl p-4 h-full flex flex-col border border-white/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 border border-[#E9DDCC]/70">
                    {presente.imageUrl ? (
                      <img src={presente.imageUrl} alt={presente.title} loading="lazy" className="w-full h-full object-cover" />
                    ) : (
                      <GiftIllustration motif={presente.art} label={presente.title} />
                    )}
                    <span className="absolute top-2.5 left-2.5 bg-white/85 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold" style={{ color: olive }}>
                      {presente.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-[#2C3225] leading-snug mb-3">{presente.title}</h3>

                  <div className="mt-auto pt-3 border-t border-[#E9DDCC]">
                    <span className="block text-[10px] uppercase tracking-widest font-semibold" style={{ color: gold }}>
                      Valor sugerido
                    </span>
                    <span className="block font-serif text-xl text-[#2C3225] font-semibold mb-3">
                      {reais(presente.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => abrir({ tipo: 'presente', presente })}
                      aria-label={`Presentear via PIX: ${presente.title}, ${reais(presente.price)}`}
                      className="w-full flex items-center justify-center gap-2 text-white text-xs tracking-wider uppercase font-semibold py-3 rounded-full shadow-sm hover:shadow transition-all cursor-pointer focus-gold"
                      style={{ backgroundColor: olive }}
                    >
                      <QrCode size={14} />
                      Presentear via PIX
                    </button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <p className="font-cormorant text-xl text-[#55594A]">Nenhum presente encontrado com esses filtros.</p>
            {filtrando && (
              <button
                type="button"
                onClick={limparFiltros}
                className="mt-4 text-xs uppercase tracking-wider font-semibold underline underline-offset-4 cursor-pointer"
                style={{ color: olive }}
              >
                Limpar filtros
              </button>
            )}
          </div>
        )}

        {/* 8. Rodapé */}
        <footer className="mt-16 text-center max-w-xl mx-auto">
          <Lirio cor={olive} ouro={gold} />
          <p className="mt-4 font-cormorant text-lg sm:text-xl text-[#55594A] leading-relaxed">
            “Cada presente representa um gesto de amor e carinho que levaremos conosco nessa nova etapa.
            Obrigada por fazer parte da nossa história!”
          </p>
          <p className="mt-3 font-script text-3xl" style={{ color: olive }}>Nathalie & Igor</p>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#7C7D6C] mt-1">
            20 de novembro de 2026 · Guaramiranga — Ceará
          </p>
        </footer>
      </div>

      {/* 5 e 6. Janela do PIX */}
      {escolha && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pix-titulo"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2C3225]/80 backdrop-blur-sm"
          onClick={fechar}
        >
          <div
            className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-[#F9F6EF] border border-[#E9DDCC] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-center pr-8 sm:pr-0" style={{ color: gold }}>
                {escolha.tipo === 'presente' ? 'Você escolheu um presente para Nathalie & Igor!' : 'Contribuição com carinho'}
              </p>

              <div className="mt-4 rounded-2xl bg-white/80 border border-[#E9DDCC] p-4 text-center">
                <span className="block text-[10px] uppercase tracking-widest text-[#7C7D6C]">
                  {escolha.tipo === 'presente' ? 'Presente escolhido' : 'Presente'}
                </span>
                <h3 id="pix-titulo" className="font-serif text-xl sm:text-2xl text-[#2C3225] mt-0.5">
                  {escolha.tipo === 'presente' ? escolha.presente.title : 'Contribuição livre'}
                </h3>
                <span className="block text-[10px] uppercase tracking-widest text-[#7C7D6C] mt-3">
                  {escolha.tipo === 'presente' ? 'Valor sugerido' : 'Valor'}
                </span>
                <span className="block font-serif text-2xl font-semibold" style={{ color: olive }}>
                  {escolha.tipo === 'presente' ? reais(escolha.presente.price) : 'Você escolhe'}
                </span>
              </div>

              <p className="mt-5 font-cormorant italic text-lg text-[#55594A] text-center leading-snug">
                “Que alegria receber seu carinho! Para nos presentear, basta realizar uma contribuição via PIX.”
              </p>

              {codigoPix && (
                <div className="mt-5 flex flex-col items-center gap-3">
                  <div className="bg-white p-3 rounded-2xl border border-[#E9DDCC] shadow-sm">
                    <QRCodeSVG
                      value={codigoPix}
                      size={184}
                      level="M"
                      marginSize={0}
                      bgColor="#FFFFFF"
                      fgColor="#2C3225"
                      title={
                        escolha.tipo === 'presente'
                          ? `QR Code PIX de ${reais(escolha.presente.price)} para ${wedding.pixReceiverName}`
                          : `QR Code PIX para ${wedding.pixReceiverName}, valor livre`
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => copiar(codigoPix, 'codigo')}
                    className="w-full flex items-center justify-center gap-2 text-white text-xs tracking-wider uppercase font-semibold py-3.5 rounded-full transition-colors cursor-pointer focus-gold"
                    style={{ backgroundColor: olive }}
                  >
                    {copiou === 'codigo' ? <Check size={14} /> : <Copy size={14} />}
                    {copiou === 'codigo' ? 'Código copiado!' : 'Copiar código PIX Copia e Cola'}
                  </button>
                </div>
              )}

              <div className="mt-4">
                <span className="block text-[10px] uppercase tracking-widest font-semibold mb-1.5" style={{ color: olive }}>
                  Chave PIX ({wedding.pixType === 'email' ? 'e-mail' : wedding.pixType})
                </span>
                <div className="flex items-center gap-2 p-2.5 bg-white/80 border border-[#E9DDCC] rounded-xl">
                  <span className="flex-1 text-sm font-mono text-[#2C3225] break-all">{wedding.pixKey}</span>
                  <button
                    type="button"
                    onClick={() => copiar(wedding.pixKey, 'chave')}
                    className="shrink-0 flex items-center gap-1.5 border px-3 py-2 rounded-full text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer focus-gold"
                    style={{ borderColor: olive, color: olive }}
                  >
                    {copiou === 'chave' ? <Check size={12} /> : <Copy size={12} />}
                    {copiou === 'chave' ? 'Copiada!' : 'Copiar chave PIX'}
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-serif text-lg text-[#2C3225] mb-2">Como enviar seu presente:</h4>
                <ol className="list-decimal pl-5 space-y-1 text-sm text-[#3F463A] leading-relaxed">
                  <li>Abra o aplicativo do seu banco.</li>
                  <li>Acesse a opção PIX.</li>
                  <li>Escaneie o QR Code ou escolha pagar utilizando a chave PIX.</li>
                  <li>Confira o nome do destinatário antes de confirmar.</li>
                  <li>
                    {escolha.tipo === 'presente'
                      ? 'Informe o valor do presente, caso ele não esteja preenchido automaticamente.'
                      : 'Informe o valor que desejar contribuir.'}
                  </li>
                  <li>Confirme a transferência.</li>
                </ol>
              </div>

              <p className="mt-5 text-xs text-[#55594A] italic text-center leading-relaxed bg-[#E9DDCC]/40 rounded-xl p-3">
                “O presente é simbólico e o pagamento é realizado diretamente aos noivos. Não existe compra, frete
                ou entrega de produtos.”
              </p>

              <button
                type="button"
                onClick={fechar}
                className="mt-5 w-full text-xs tracking-wider uppercase font-semibold py-3 rounded-full border transition-colors cursor-pointer focus-gold"
                style={{ borderColor: '#E9DDCC', color: '#3F463A' }}
              >
                Escolher outro presente
              </button>
            </div>

            <button
              ref={fecharRef}
              type="button"
              onClick={fechar}
              aria-label="Fechar"
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-[#2C3225] shadow-md flex items-center justify-center hover:bg-white transition-colors cursor-pointer focus-gold"
            >
              <X size={17} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

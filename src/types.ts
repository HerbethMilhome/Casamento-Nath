export type RsvpStatus = 'not_sent' | 'sent' | 'confirmed' | 'declined';

export type DietaryRestriction = 
  | 'nao' 
  | 'vegetariana' 
  | 'vegana' 
  | 'sem_lactose' 
  | 'sem_gluten' 
  | 'alergia_alimentar' 
  | 'outra';

export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  photoUrl?: string;
  caption?: string;
  order: number;
}

export interface Godparent {
  id: string;
  name: string;
  type: 'individual' | 'casal';
  partnerName?: string;
  role: 'Madrinha' | 'Padrinho' | 'Padrinhos (Casal)';
  side: 'noiva' | 'noivo' | 'ambos';
  photoUrl: string;
  bio: string;
  curiosity?: string;
  order: number;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  group: string;
  allowedPlusOnes: number;
  hasPlusOne: boolean;
  rsvpStatus: RsvpStatus;
  attendingCount: number;
  plusOneNames: string[];
  dietaryRestriction: DietaryRestriction;
  dietaryRestrictionDetail?: string;
  message?: string;
  updatedAt: string;
  notes?: string;
}

export type GiftCategory = 'Casa' | 'Lua de mel' | 'Experiências' | 'Cozinha' | 'Viagem' | 'Outros';

export type GiftType = 'symbolic' | 'external';

export type GuestGroup = string;

export interface Gift {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: GiftCategory;
  type: 'symbolic' | 'external';
  externalUrl?: string;
  status: 'available' | 'gifted';
  giftedBy?: string;
  giftedAt?: string;
  order: number;
}

export interface GuestbookMessage {
  id: string;
  name: string;
  message: string;
  date: string;
  isApproved: boolean;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  category: 'pre_wedding' | 'historico' | 'festa' | 'convidados';
  order: number;
}

export type UsefulInfoCategory = 'hospedagem' | 'salao' | 'transporte' | 'estacionamento' | 'aeroporto' | 'outros';

export interface UsefulInfoItem {
  id: string;
  category: UsefulInfoCategory;
  title: string;
  subtitle?: string;
  description: string;
  address?: string;
  link?: string;
  linkText?: string;
  distance?: string;
  order: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export type ThemePreset = 
  | 'frosted_glass' 
  | 'classico' 
  | 'minimalista' 
  | 'romantico' 
  | 'jardim' 
  | 'terracota' 
  | 'moderno';

export interface ThemeConfig {
  presetId: ThemePreset;
  presetName: string;
  primaryColor: string;      // e.g. #8C7355
  secondaryColor: string;    // e.g. #745F46
  accentColor: string;       // e.g. #D4AF37
  backgroundColor: string;   // e.g. #F9F6F2
  textColor: string;         // e.g. #4A443F
  headingFont: 'cormorant' | 'playfair' | 'montserrat' | 'sans';
  bodyFont: 'sans' | 'montserrat' | 'serif';
  buttonRadius: 'pill' | 'rounded-xl' | 'rounded-md' | 'square';
  cardStyle: 'glass' | 'solid' | 'minimal' | 'bordered';
}

export interface WeddingData {
  id: string;
  slug: string;
  coupleNames: string;
  spouse1: string;
  spouse2: string;
  monogram: string;
  monogramImage?: string;
  shortPhrase: string;
  weddingDate: string; // YYYY-MM-DD
  weddingTime: string; // HH:MM
  city: string;
  state: string;
  coverImage: string;
  secondaryImage?: string;
  
  // Ceremony & Reception
  sameLocation: boolean;
  ceremonyVenue: string;
  ceremonyAddress: string;
  ceremonyTime: string;
  ceremonyImage?: string;
  ceremonyGoogleMapsUrl?: string;
  receptionVenue: string;
  receptionAddress: string;
  receptionTime: string;
  receptionGoogleMapsUrl?: string;
  
  // Location & Map
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
  wazeUrl: string;
  mapEmbedQuery: string;

  // Dress Code
  dressCodeTitle: string;
  dressCodeDescription: string;
  dressCodeWomen: string;
  dressCodeMen: string;
  dressCodeAvoid: string;
  dressCodeColors: { name: string; hex: string }[];
  
  // Gift list PIX
  pixKey: string;
  pixType: 'email' | 'cpf' | 'telefone' | 'aleatoria';
  pixReceiverName: string;
  pixCity: string;
  
  // Security & Settings
  isPasswordProtected: boolean;
  guestAccessPassword?: string;
  rsvpDeadline: string;
  hashtag: string;
  contactEmail: string;
  contactPhone: string;
  
  // Appearance
  theme: ThemeConfig;
}

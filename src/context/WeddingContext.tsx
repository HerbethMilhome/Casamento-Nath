import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  WeddingData,
  StoryMilestone,
  Godparent,
  Guest,
  Gift,
  GuestbookMessage,
  GalleryPhoto,
  UsefulInfoItem,
  FaqItem,
  ThemePreset,
  ThemeConfig,
  DietaryRestriction,
} from '../types';
import {
  INITIAL_WEDDING,
  INITIAL_STORY,
  INITIAL_GODPARENTS,
  INITIAL_GUESTS,
  INITIAL_GIFTS,
  INITIAL_MESSAGES,
  INITIAL_PHOTOS,
  INITIAL_USEFUL_INFO,
  INITIAL_FAQS,
  THEME_PRESETS,
} from '../data/initialWeddingData';
import {
  buscarRecadosAprovados,
  enviarRecado,
  enviarRsvp,
  sheetsConfigurado,
} from '../services/sheetsApi';

interface WeddingContextType {
  wedding: WeddingData;
  updateWedding: (updates: Partial<WeddingData>) => void;
  
  milestones: StoryMilestone[];
  addMilestone: (m: Omit<StoryMilestone, 'id' | 'order'>) => void;
  updateMilestone: (id: string, updates: Partial<StoryMilestone>) => void;
  deleteMilestone: (id: string) => void;
  
  godparents: Godparent[];
  addGodparent: (g: Omit<Godparent, 'id' | 'order'>) => void;
  updateGodparent: (id: string, updates: Partial<Godparent>) => void;
  deleteGodparent: (id: string) => void;
  
  guests: Guest[];
  addGuest: (guest: Omit<Guest, 'id' | 'updatedAt'>) => void;
  updateGuest: (id: string, updates: Partial<Guest>) => void;
  deleteGuest: (id: string) => void;
  submitRsvp: (data: {
    name: string;
    email: string;
    phone: string;
    attending: boolean;
    plusOneNames: string[];
    dietaryRestriction: DietaryRestriction;
    dietaryRestrictionDetail?: string;
    message?: string;
  }) => Promise<{ success: boolean; message: string }>;
  
  gifts: Gift[];
  addGift: (gift: Omit<Gift, 'id' | 'order'>) => void;
  updateGift: (id: string, updates: Partial<Gift>) => void;
  deleteGift: (id: string) => void;
  giftItem: (id: string, giftedBy: string) => void;
  
  messages: GuestbookMessage[];
  addGuestbookMessage: (name: string, message: string) => Promise<void>;
  approveMessage: (id: string) => void;
  deleteMessage: (id: string) => void;
  
  photos: GalleryPhoto[];
  addPhoto: (photo: Omit<GalleryPhoto, 'id' | 'order'>) => void;
  updatePhoto: (id: string, updates: Partial<GalleryPhoto>) => void;
  deletePhoto: (id: string) => void;
  
  usefulInfo: UsefulInfoItem[];
  addUsefulInfo: (item: Omit<UsefulInfoItem, 'id' | 'order'>) => void;
  updateUsefulInfo: (id: string, updates: Partial<UsefulInfoItem>) => void;
  deleteUsefulInfo: (id: string) => void;
  
  faqs: FaqItem[];
  addFaq: (faq: Omit<FaqItem, 'id' | 'order'>) => void;
  updateFaq: (id: string, updates: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;
  
  theme: ThemeConfig;
  setThemePreset: (preset: ThemePreset) => void;
  applyThemePreset: (preset: ThemePreset) => void;
  updateCustomTheme: (updates: Partial<ThemeConfig>) => void;
  setThemeConfig: (updates: Partial<ThemeConfig>) => void;
  
  isAdminAuthenticated: boolean;
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  
  activeView: 'public' | 'admin';
  setActiveView: (view: 'public' | 'admin') => void;
  adminSection: string;
  setAdminSection: (section: string) => void;
  
  updateWeddingDetails: (updates: Partial<WeddingData>) => void;
  toggleMessageApproval: (id: string) => void;
  resetToDefaults: () => void;
  resetToInitialData: () => void;
}

const STORAGE_KEYS = {
  WEDDING: 'casamento_data_v5',
  STORY: 'casamento_story_v2',
  GODPARENTS: 'casamento_godparents_v1',
  GUESTS: 'casamento_guests_v1',
  GIFTS: 'casamento_gifts_v2',
  MESSAGES: 'casamento_messages_v1',
  PHOTOS: 'casamento_photos_v2',
  USEFUL_INFO: 'casamento_useful_info_v2',
  FAQS: 'casamento_faqs_v2',
  ADMIN_AUTH: 'casamento_admin_auth_v1',
};

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wedding, setWedding] = useState<WeddingData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WEDDING);
    return saved ? JSON.parse(saved) : INITIAL_WEDDING;
  });

  const [milestones, setMilestones] = useState<StoryMilestone[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STORY);
    return saved ? JSON.parse(saved) : INITIAL_STORY;
  });

  const [godparents, setGodparents] = useState<Godparent[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GODPARENTS);
    return saved ? JSON.parse(saved) : INITIAL_GODPARENTS;
  });

  const [guests, setGuests] = useState<Guest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GUESTS);
    return saved ? JSON.parse(saved) : INITIAL_GUESTS;
  });

  const [gifts, setGifts] = useState<Gift[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GIFTS);
    return saved ? JSON.parse(saved) : INITIAL_GIFTS;
  });

  const [messages, setMessages] = useState<GuestbookMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PHOTOS);
    return saved ? JSON.parse(saved) : INITIAL_PHOTOS;
  });

  const [usefulInfo, setUsefulInfo] = useState<UsefulInfoItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USEFUL_INFO);
    return saved ? JSON.parse(saved) : INITIAL_USEFUL_INFO;
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  const [activeView, setActiveView] = useState<'public' | 'admin'>('public');
  const [adminSection, setAdminSection] = useState<string>('dashboard');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WEDDING, JSON.stringify(wedding));
  }, [wedding]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STORY, JSON.stringify(milestones));
  }, [milestones]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GODPARENTS, JSON.stringify(godparents));
  }, [godparents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GUESTS, JSON.stringify(guests));
  }, [guests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GIFTS, JSON.stringify(gifts));
  }, [gifts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USEFUL_INFO, JSON.stringify(usefulInfo));
  }, [usefulInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, String(isAdminAuthenticated));
  }, [isAdminAuthenticated]);

  // Recados aprovados vêm da planilha, não do localStorage — é o que permite um
  // convidado ver o recado que outro convidado deixou.
  //
  // Recarrega ao voltar para a aba, e não só na primeira carga: os noivos
  // aprovam na planilha e voltam para o site esperando ver o resultado.
  useEffect(() => {
    if (!sheetsConfigurado()) return;

    let cancelado = false;

    const carregar = async () => {
      const recados = await buscarRecadosAprovados();

      // null = a consulta falhou. Mantém o mural como está em vez de esvaziá-lo.
      if (cancelado || recados === null) return;

      setMessages(
        recados.map(r => ({
          id: r.id,
          name: r.nome,
          message: r.recado,
          date: r.data,
          isApproved: true,
        })),
      );
    };

    const aoVoltarParaAba = () => {
      if (document.visibilityState === 'visible') carregar();
    };

    carregar();
    document.addEventListener('visibilitychange', aoVoltarParaAba);

    return () => {
      cancelado = true;
      document.removeEventListener('visibilitychange', aoVoltarParaAba);
    };
  }, []);

  // Mutations
  const updateWedding = (updates: Partial<WeddingData>) => {
    setWedding(prev => ({ ...prev, ...updates }));
  };

  const addMilestone = (m: Omit<StoryMilestone, 'id' | 'order'>) => {
    const newMilestone: StoryMilestone = {
      ...m,
      id: `story-${Date.now()}`,
      order: milestones.length + 1,
    };
    setMilestones(prev => [...prev, newMilestone]);
  };

  const updateMilestone = (id: string, updates: Partial<StoryMilestone>) => {
    setMilestones(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteMilestone = (id: string) => {
    setMilestones(prev => prev.filter(item => item.id !== id));
  };

  const addGodparent = (g: Omit<Godparent, 'id' | 'order'>) => {
    const newGp: Godparent = {
      ...g,
      id: `gp-${Date.now()}`,
      order: godparents.length + 1,
    };
    setGodparents(prev => [...prev, newGp]);
  };

  const updateGodparent = (id: string, updates: Partial<Godparent>) => {
    setGodparents(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteGodparent = (id: string) => {
    setGodparents(prev => prev.filter(item => item.id !== id));
  };

  const addGuest = (guest: Omit<Guest, 'id' | 'updatedAt'>) => {
    const newGuest: Guest = {
      ...guest,
      id: `gst-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };
    setGuests(prev => [newGuest, ...prev]);
  };

  const updateGuest = (id: string, updates: Partial<Guest>) => {
    setGuests(prev => prev.map(item => item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item));
  };

  const deleteGuest = (id: string) => {
    setGuests(prev => prev.filter(item => item.id !== id));
  };

  const submitRsvp = async (data: {
    name: string;
    email: string;
    phone: string;
    attending: boolean;
    plusOneNames: string[];
    dietaryRestriction: DietaryRestriction;
    dietaryRestrictionDetail?: string;
    message?: string;
  }) => {
    // A planilha é a fonte da verdade. Se a gravação falhar não podemos exibir
    // tela de sucesso: o convidado iria embora achando que confirmou.
    if (sheetsConfigurado()) {
      try {
        await enviarRsvp(data);
      } catch {
        return {
          success: false,
          message:
            'Não conseguimos registrar sua confirmação agora. Verifique sua conexão e tente novamente em instantes.',
        };
      }
    }

    const now = new Date().toISOString();
    // Check if guest already exists by email or name
    const existingIndex = guests.findIndex(
      g => (data.email && g.email.toLowerCase() === data.email.toLowerCase()) || 
           g.name.toLowerCase() === data.name.toLowerCase()
    );

    const attendingCount = data.attending ? 1 + data.plusOneNames.length : 0;
    const rsvpStatus = data.attending ? 'confirmed' : 'declined';

    if (existingIndex >= 0) {
      setGuests(prev => {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          phone: data.phone || next[existingIndex].phone,
          rsvpStatus,
          attendingCount,
          plusOneNames: data.plusOneNames,
          dietaryRestriction: data.dietaryRestriction,
          dietaryRestrictionDetail: data.dietaryRestrictionDetail,
          message: data.message,
          updatedAt: now,
        };
        return next;
      });
    } else {
      const newGuest: Guest = {
        id: `gst-${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        group: 'Convidados Gerais',
        allowedPlusOnes: data.plusOneNames.length,
        hasPlusOne: data.plusOneNames.length > 0,
        rsvpStatus,
        attendingCount,
        plusOneNames: data.plusOneNames,
        dietaryRestriction: data.dietaryRestriction,
        dietaryRestrictionDetail: data.dietaryRestrictionDetail,
        message: data.message,
        updatedAt: now,
      };
      setGuests(prev => [newGuest, ...prev]);
    }

    // A mensagem também vira um recado pendente, para os noivos poderem
    // aprová-la no mural se quiserem. Ela já ficou registrada na aba RSVP.
    if (data.message && data.message.trim().length > 0) {
      await addGuestbookMessage(data.name, data.message);
    }

    return {
      success: true,
      message: data.attending
        ? 'Presença confirmada! Estamos muito felizes em celebrar esse momento com você.'
        : 'Agradecemos por nos avisar. Sentiremos sua falta!',
    };
  };

  const addGift = (gift: Omit<Gift, 'id' | 'order'>) => {
    const newGift: Gift = {
      ...gift,
      id: `gift-${Date.now()}`,
      order: gifts.length + 1,
    };
    setGifts(prev => [...prev, newGift]);
  };

  const updateGift = (id: string, updates: Partial<Gift>) => {
    setGifts(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteGift = (id: string) => {
    setGifts(prev => prev.filter(item => item.id !== id));
  };

  const giftItem = (id: string, giftedBy: string) => {
    setGifts(prev => prev.map(item => item.id === id ? {
      ...item,
      status: 'gifted',
      giftedBy,
      giftedAt: new Date().toISOString(),
    } : item));
  };

  const addGuestbookMessage = async (name: string, message: string) => {
    if (sheetsConfigurado()) {
      // Deixa o erro subir: quem chamou precisa saber que o recado não foi salvo.
      await enviarRecado(name, message);
      return;
    }

    // Sem planilha configurada (ex.: desenvolvimento local) o recado fica
    // apenas neste navegador.
    const newMsg: GuestbookMessage = {
      id: `msg-${Date.now()}`,
      name,
      message,
      date: new Date().toISOString().split('T')[0],
      isApproved: false, // Aguarda aprovação dos noivos antes de ir ao mural
    };
    setMessages(prev => [newMsg, ...prev]);
  };

  const approveMessage = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isApproved: true } : m));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const addPhoto = (photo: Omit<GalleryPhoto, 'id' | 'order'>) => {
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: `p-${Date.now()}`,
      order: photos.length + 1,
    };
    setPhotos(prev => [...prev, newPhoto]);
  };

  const updatePhoto = (id: string, updates: Partial<GalleryPhoto>) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const addUsefulInfo = (item: Omit<UsefulInfoItem, 'id' | 'order'>) => {
    const newItem: UsefulInfoItem = {
      ...item,
      id: `nfo-${Date.now()}`,
      order: usefulInfo.length + 1,
    };
    setUsefulInfo(prev => [...prev, newItem]);
  };

  const updateUsefulInfo = (id: string, updates: Partial<UsefulInfoItem>) => {
    setUsefulInfo(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const deleteUsefulInfo = (id: string) => {
    setUsefulInfo(prev => prev.filter(i => i.id !== id));
  };

  const addFaq = (faq: Omit<FaqItem, 'id' | 'order'>) => {
    const newFaq: FaqItem = {
      ...faq,
      id: `faq-${Date.now()}`,
      order: faqs.length + 1,
    };
    setFaqs(prev => [...prev, newFaq]);
  };

  const updateFaq = (id: string, updates: Partial<FaqItem>) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const deleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  const setThemePreset = (preset: ThemePreset) => {
    const theme = THEME_PRESETS[preset];
    if (theme) {
      setWedding(prev => ({ ...prev, theme }));
    }
  };

  const updateCustomTheme = (updates: Partial<ThemeConfig>) => {
    setWedding(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        ...updates,
      },
    }));
  };

  const loginAdmin = (password: string): boolean => {
    // Demo password or default '123456' or 'casamento' or 'admin'
    if (password === '123456' || password === 'casamento' || password === 'admin' || password === 'nathalie2026') {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
  };

  const resetToDefaults = () => {
    setWedding(INITIAL_WEDDING);
    setMilestones(INITIAL_STORY);
    setGodparents(INITIAL_GODPARENTS);
    setGuests(INITIAL_GUESTS);
    setGifts(INITIAL_GIFTS);
    setMessages(INITIAL_MESSAGES);
    setPhotos(INITIAL_PHOTOS);
    setUsefulInfo(INITIAL_USEFUL_INFO);
    setFaqs(INITIAL_FAQS);
    localStorage.clear();
  };

  return (
    <WeddingContext.Provider
      value={{
        wedding,
        updateWedding,
        milestones,
        addMilestone,
        updateMilestone,
        deleteMilestone,
        godparents,
        addGodparent,
        updateGodparent,
        deleteGodparent,
        guests,
        addGuest,
        updateGuest,
        deleteGuest,
        submitRsvp,
        gifts,
        addGift,
        updateGift,
        deleteGift,
        giftItem,
        messages,
        addGuestbookMessage,
        approveMessage,
        deleteMessage,
        photos,
        addPhoto,
        updatePhoto,
        deletePhoto,
        usefulInfo,
        addUsefulInfo,
        updateUsefulInfo,
        deleteUsefulInfo,
        faqs,
        addFaq,
        updateFaq,
        deleteFaq,
        theme: wedding.theme,
        setThemePreset,
        applyThemePreset: setThemePreset,
        updateCustomTheme,
        setThemeConfig: updateCustomTheme,
        isAdminAuthenticated,
        isAdminLoggedIn: isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        activeView,
        setActiveView,
        adminSection,
        setAdminSection,
        updateWeddingDetails: updateWedding,
        toggleMessageApproval: (id: string) => {
          setMessages(prev => prev.map(m => m.id === id ? { ...m, isApproved: !m.isApproved } : m));
        },
        resetToDefaults,
        resetToInitialData: resetToDefaults,
      }}
    >
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};

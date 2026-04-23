/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import React, { useRef, useState, useEffect, FormEvent } from 'react';
import { 
  ArrowRight, 
  Target, 
  Zap, 
  BarChart3, 
  Sparkles, 
  Menu, 
  X,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Mail,
  Phone,
  Send,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Music2
} from 'lucide-react';

const SCENES = [
  {
    id: 1,
    title: <>Votre présence digitale <br/><span className="italic text-accent">commence ici.</span></>,
    subtitle: "La créativité au service de votre marque.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000",
    color: "from-accent/20 to-bg"
  },
  {
    id: 2,
    title: <>Identité Visuelle <br/><span className="italic text-accent">& Design Unique.</span></>,
    subtitle: "Création de logos, affiches, cartes de visite et identités de marque percutantes.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=2000",
    color: "from-blue-500/10 to-bg"
  },
  {
    id: 3,
    title: <>Sites Web Haute <br/><span className="italic text-accent">Performance.</span></>,
    subtitle: "Création de sites web optimisés, rapides et orientés vers l'expérience utilisateur.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
    color: "from-purple-500/10 to-bg"
  },
  {
    id: 4,
    title: <>Influence & <br/><span className="italic text-accent">Gestion Sociale.</span></>,
    subtitle: "Transformez vos réseaux en moteurs de croissance avec un contenu engageant.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=2000",
    color: "from-emerald-500/10 to-bg"
  },
  {
    id: 5,
    title: <>SEO, Trafic & <br/><span className="italic text-accent">Conversion.</span></>,
    subtitle: "Atteignez la bonne audience et convertissez vos prospects en clients fidèles.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2000",
    color: "from-rose-500/10 to-bg"
  },
  {
    id: 6,
    title: <>AMEILO <span className="italic text-accent">AGENCE</span></>,
    subtitle: "La créativité au service de votre marque.",
    image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=2000",
    color: "from-accent/30 to-bg",
    final: true
  }
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'landing' | 'about' | 'services' | 'contact'>('landing');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    if (currentView !== 'landing') return;

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const index = Math.min(Math.floor(scrollPos / windowHeight + 0.5), SCENES.length - 1);
      setActiveScene(index);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const navigateTo = (view: 'landing' | 'about' | 'services' | 'contact') => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div ref={containerRef} className="relative bg-bg font-sans selection:bg-accent/30 overflow-x-hidden">
      <MouseFollower />
      
      {/* Atmosphere Layer */}
      <div className="fixed inset-0 pointer-events-none z-[5]">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full"
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center transition-all duration-500 ${currentView !== 'landing' ? 'bg-bg/80 backdrop-blur-md border-b border-white/5' : ''}`}>
        <motion.div 
          onClick={() => navigateTo('landing')}
          className="text-2xl font-serif font-light tracking-tighter cursor-pointer"
        >
          AMEILO <span className="text-accent italic font-normal">AGENCE</span>
        </motion.div>

        <div className="hidden md:flex gap-12 text-[10px] items-center tracking-[0.4em] uppercase font-medium text-white/40">
          {[
            { id: 'landing', label: 'Accueil' },
            { id: 'services', label: 'Services' },
            { id: 'about', label: 'À propos' },
            { id: 'contact', label: 'Contact' }
          ].map((item) => (
            <motion.button
              key={item.id}
              onClick={() => navigateTo(item.id as any)}
              whileHover={{ color: '#c5a059' }}
              className={`hover:text-accent transition-colors ${currentView === item.id ? 'text-accent underline underline-offset-8' : ''}`}
            >
              {item.label}
            </motion.button>
          ))}
          <div className="h-[1px] w-12 bg-white/10" />
          <span className="font-mono text-white/20">AM-2026</span>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden glass p-3 rounded-full border border-white/10"
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-12 md:hidden"
          >
            {[
              { id: 'landing', label: 'Accueil' },
              { id: 'services', label: 'Services' },
              { id: 'about', label: 'À propos' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => navigateTo(item.id as any)}
                className={`text-4xl font-serif ${currentView === item.id ? 'text-accent italic' : 'text-white/40'}`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative pt-24 min-h-screen">
        {currentView === 'landing' && (
          <>
            {/* Progress Indicator */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-8 items-center">
              <span className="text-[10px] vertical-text tracking-[0.4em] text-white/20 mb-4">PROGRESS</span>
              {SCENES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: activeScene === i ? 24 : 8,
                    backgroundColor: activeScene === i ? '#c5a059' : 'rgba(255,255,255,0.1)'
                  }}
                  className="w-[1px] cursor-pointer transition-all duration-500"
                  onClick={() => window.scrollTo({ top: i * window.innerHeight, behavior: 'smooth' })}
                />
              ))}
            </div>

            {/* Scenes */}
            {SCENES.map((scene, index) => (
              <Scene 
                key={scene.id} 
                scene={scene} 
                index={index} 
                isActive={activeScene === index}
                onQuoteClick={() => setIsQuoteModalOpen(true)}
              />
            ))}
          </>
        )}

        {currentView === 'services' && <ServicesView onQuoteClick={() => setIsQuoteModalOpen(true)} />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'contact' && <ContactView onQuoteClick={() => setIsQuoteModalOpen(true)} />}
      </div>

      {/* Floating Actions */}
      <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-4">
        <motion.a
          href="https://wa.me/221756367023"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, backgroundColor: '#25D366' }}
          whileTap={{ scale: 0.9 }}
          className="bg-accent text-bg p-4 rounded-full shadow-2xl transition-colors"
        >
          <MessageCircle size={24} />
        </motion.a>
      </div>

      {/* Quote Modal */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <QuoteModal onClose={() => setIsQuoteModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="h-[40vh] bg-bg flex items-center justify-center p-12 border-t border-white/5 relative z-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-ink">
          <div className="text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.4em] text-ink/40 mb-4 block">Ameilo Agence &bull; Established 2026</span>
            <h3 className="text-4xl font-serif font-light italic text-accent mb-6">Faites-vous remarquer.</h3>
            
            <div className="flex flex-col gap-3">
              <a href="mailto:ameilo.agence@gmail.com" className="flex items-center gap-3 text-xs text-white/60 hover:text-accent transition-colors">
                <Mail size={14} className="text-accent" />
                ameilo.agence@gmail.com
              </a>
              <a href="https://wa.me/221756367023" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs text-white/60 hover:text-accent transition-colors">
                <Phone size={14} className="text-accent" />
                +221 75 636 70 23
              </a>
              <div className="flex gap-4 mt-2">
                <a href="https://instagram.com/ameilo11" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-accent transition-colors">
                  <Instagram size={16} />
                </a>
                <a href="https://facebook.com/ameiloagence" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-accent transition-colors">
                  <Facebook size={16} />
                </a>
                <a href="https://linkedin.com/company/ameiloagence" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-accent transition-colors">
                  <Linkedin size={16} />
                </a>
                <a href="https://tiktok.com/@ameilo11" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-accent transition-colors">
                  <Music2 size={16} />
                </a>
                <a href="https://youtube.com/@ameiloagence" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-accent transition-colors">
                  <Youtube size={16} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex gap-12 text-center md:text-right">
             <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-ink/20 mb-2">Location</span>
              <span className="text-xs font-light tracking-wide italic underline underline-offset-4 decoration-accent/20">ameiloagence.unaux.com</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-ink/20 mb-2">Agency Code</span>
              <span className="text-xs font-mono">AM-2026-HQ</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface SceneProps {
  scene: any;
  index: number;
  isActive: boolean;
  onQuoteClick: () => void;
  key?: any;
}

function Scene({ scene, index, isActive, onQuoteClick }: SceneProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section 
      ref={ref}
      className={`relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-white/5 ${isActive ? 'z-20' : 'z-10'}`}
    >
      {/* Background Image Layer */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <div className={`absolute inset-0 bg-gradient-to-t ${scene.color} z-10 opacity-80`} />
        <div className="absolute inset-0 bg-bg/60 z-10" />
        
        {scene.id === 3 ? (
          <div className="flex h-full w-full">
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: isActive ? 0.2 : 1 }}
              className="w-1/2 h-full grayscale opacity-40"
            >
              <img src={scene.image} className="w-full h-full object-cover" alt="" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20 }}
              transition={{ delay: 0.5, duration: 1.2 }}
              className="w-1/2 h-full"
            >
              <img src={scene.image} className="w-full h-full object-cover" alt="" />
            </motion.div>
          </div>
        ) : (
          <img 
            src={scene.image} 
            alt="Strategic Branding"
            className={`w-full h-full object-cover ${scene.id === 4 ? 'grayscale contrast-125 opacity-30' : 'opacity-60'}`}
          />
        )}
      </motion.div>

      {/* Content Layer */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-20 container mx-auto px-6 text-center"
      >
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="max-w-5xl mx-auto"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "120px" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[1px] bg-accent mx-auto mb-10"
              />
              
              {scene.final ? (
                <div className="space-y-16">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1.8, ease: "circOut" }}
                    className="relative inline-block"
                  >
                    <div className="absolute -inset-16 bg-accent/10 blur-[120px] rounded-full" />
                    <h1 className="text-7xl md:text-[12rem] font-serif font-light tracking-[0.3em] relative text-ink leading-tight">
                      AMEILO
                    </h1>
                    <span className="absolute bottom-0 right-0 text-accent italic md:text-3xl font-serif">AGENCE</span>
                  </motion.div>
                  
                  <div className="flex flex-col items-center gap-8">
                    <p className="text-xl md:text-2xl font-serif italic text-white/50 tracking-widest max-w-xl mx-auto">
                      "Votre succès est le reflet de notre engagement."
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02, letterSpacing: "0.6em" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onQuoteClick}
                      className="bg-accent text-bg px-16 py-6 rounded-none font-medium uppercase tracking-[0.4em] text-[10px] transition-all shadow-3xl shadow-accent/20"
                    >
                      Demander un devis
                    </motion.button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-5xl md:text-[7rem] font-serif font-light leading-[1.05] mb-10 text-glow tracking-tight">
                    {scene.title}
                  </h2>
                  
                  <div className="flex flex-col items-center gap-12">
                    <p className="text-xl md:text-2xl text-white/40 font-serif italic max-w-2xl mx-auto leading-relaxed tracking-wide">
                      {scene.subtitle}
                    </p>
                    
                    <motion.div
                      animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="flex flex-col items-center gap-3"
                    >
                      <span className="text-[9px] uppercase tracking-[0.6em] text-white/20">Scroll to Explore</span>
                      <ChevronDown className="text-accent/40" size={20} strokeWidth={1} />
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/dark-matter.png)' }} />
    </section>
  );
}

function MouseFollower() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-12 h-12 border border-accent/50 rounded-full pointer-events-none z-[100] hidden md:block"
      animate={{ x: mousePos.x - 24, y: mousePos.y - 24 }}
      transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
    />
  );
}

function QuoteModal({ onClose }: { onClose: () => void }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(onClose, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-bg/95 backdrop-blur-xl" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="relative w-full max-w-xl bg-bg border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/30" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/30 hover:text-accent transition-colors"
        >
          <X size={24} strokeWidth={1} />
        </button>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Sparkles className="text-accent" size={40} />
            </div>
            <h2 className="text-3xl font-serif italic text-accent mb-4">Merci !</h2>
            <p className="text-white/60 font-serif">Votre demande a été transmise. Notre équipe reviendra vers vous très prochainement.</p>
          </motion.div>
        ) : (
          <>
            <div className="mb-10">
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-4 block">DEMANDE DE DEVIS</span>
              <h2 className="text-4xl font-serif font-light text-ink">Commençons votre <span className="italic text-accent">ascension.</span></h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-white/30 ml-4">Nom Complet</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Jean Dupont"
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-white/30 ml-4">Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="contact@exemple.com"
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-white/30 ml-4">Service Souhaité</label>
                <select className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm text-white/60 focus:outline-none focus:border-accent/50 transition-colors appearance-none">
                  <optgroup label="Design & Création" className="bg-bg text-white/40">
                    <option value="branding">Identité Visuelle / Branding</option>
                    <option value="logo">Création de Logo</option>
                    <option value="motion">Motion Design / Montage Vidéo</option>
                    <option value="print">Supports Print (Affiches, Flyers, etc.)</option>
                  </optgroup>
                  <optgroup label="Digital & Web" className="bg-bg text-white/40">
                    <option value="web-vitrine">Site Web Vitrine</option>
                    <option value="ecommerce">Site E-commerce</option>
                    <option value="maintenance">Maintenance & Support Web</option>
                    <option value="seo">SEO / Référencement Naturel</option>
                  </optgroup>
                  <optgroup label="Marketing & Stratégie" className="bg-bg text-white/40">
                    <option value="social">Community Management / Réseaux Sociaux</option>
                    <option value="ads">Publicité Digitale (Meta, Google Ads)</option>
                    <option value="strategy">Stratégie de Communication Globale</option>
                    <option value="influence">Marketing d'Influence</option>
                  </optgroup>
                  <option value="other">Autre demande spécifique</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-white/30 ml-4">Message</label>
                <textarea 
                  required
                  placeholder="Décrivez brièvement votre projet..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-accent text-bg py-5 font-bold uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-3 shadow-xl"
              >
                Envoyer la demande
                <Send size={14} />
              </motion.button>
              
              <p className="text-[9px] text-white/20 text-center tracking-widest">
                OU CONTACTEZ-NOUS DIRECTEMENT VIA <a href="https://wa.me/221756367023" className="text-accent underline">WHATSAPP</a>
              </p>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function ServicesView({ onQuoteClick }: { onQuoteClick: () => void }) {
  const services = [
    {
      category: "Design & Branding",
      icon: <Sparkles className="text-accent" />,
      items: [
        { title: "Identité Visuelle", desc: "Logotypes, chartes graphiques, univers de marque." },
        { title: "Design Graphique", desc: "Flyers, affiches, menus, packaging, catalogues." },
        { title: "Motion Design", desc: "Animations 2D/3D et montages vidéo professionnels." }
      ]
    },
    {
      category: "Web & Digital",
      icon: <Zap className="text-accent" />,
      items: [
        { title: "Sites Web Vitrines", desc: "Présence en ligne élégante et optimisée." },
        { title: "E-Commerce", desc: "Boutiques performantes pour maximiser vos ventes." },
        { title: "Maintenance", desc: "Support technique, mises à jour et sécurité." }
      ]
    },
    {
      category: "Marketing & Influence",
      icon: <Target className="text-accent" />,
      items: [
        { title: "Social Media", desc: "Gestion de communautés et création de contenu viral." },
        { title: "Publicité (Ads)", desc: "Campagnes Facebook, Instagram et Google Ads." },
        { title: "SEO", desc: "Optimisation pour les moteurs de recherche." }
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="container mx-auto px-6 py-20"
    >
      <div className="max-w-4xl mb-20">
        <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-4 block">NOS EXPERTISES</span>
        <h2 className="text-5xl md:text-7xl font-serif font-light text-ink leading-tight">
          Des solutions <span className="italic text-accent">sur mesure</span> pour votre marque.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {services.map((group, i) => (
          <div key={i} className="space-y-8 p-8 border border-white/5 glass hover:border-accent/20 transition-all">
            <div className="flex items-center gap-4">
              {group.icon}
              <h3 className="text-xl font-serif italic text-white/80">{group.category}</h3>
            </div>
            <div className="space-y-6 text-sm">
              {group.items.map((item, j) => (
                <div key={j} className="space-y-2">
                  <h4 className="font-medium text-white">{item.title}</h4>
                  <p className="text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 border border-accent/20 bg-accent/5 text-center space-y-10">
        <h3 className="text-3xl font-serif italic text-ink">Prêt à transformer votre vision en réalité ?</h3>
        <motion.button 
          onClick={onQuoteClick}
          whileHover={{ scale: 1.05 }}
          className="bg-accent text-bg px-12 py-5 font-bold uppercase tracking-[0.4em] text-[10px]"
        >
          Démarrer un projet
        </motion.button>
      </div>
    </motion.div>
  );
}

function Logo({ className = "", size = "large" }: { className?: string, size?: "small" | "large" }) {
  const isLarge = size === "large";
  return (
    <div className={`relative flex items-center justify-center p-8 md:p-12 border border-white/5 bg-white/[0.02] overflow-hidden ${className}`}>
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-accent/40" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-accent/40" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-accent/40" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-accent/40" />
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
      
      <div className="flex flex-col items-center relative z-10">
        <motion.span 
          initial={{ letterSpacing: "0.5em", opacity: 0 }}
          animate={{ letterSpacing: isLarge ? "0.3em" : "0.2em", opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`${isLarge ? 'text-6xl md:text-[5rem]' : 'text-3xl'} font-serif font-light text-ink leading-none`}
        >
          AMEILO
        </motion.span>
        <div className="flex items-center gap-4 mt-4 w-full">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-[1px] flex-grow bg-accent/20" 
          />
          <motion.span 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className={`${isLarge ? 'text-xl md:text-2xl' : 'text-xs'} font-serif italic text-accent tracking-[0.2em] whitespace-nowrap`}
          >
            AGENCE
          </motion.span>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-[1px] flex-grow bg-accent/20" 
          />
        </div>
      </div>
    </div>
  );
}

function AboutView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="container mx-auto px-6 py-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="space-y-10">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold block">À PROPOS</span>
            <h2 className="text-5xl md:text-7xl font-serif font-light text-ink leading-tight">
              L'excellence par la <span className="italic text-accent">stratégie.</span>
            </h2>
          </div>
          
          <div className="space-y-6 text-lg text-white/50 font-serif italic leading-relaxed">
            <p>
              Basée à Dakar, avec une vision globale s'étendant d'Abidjan à Paris, AMEILO AGENCE est née d'une conviction simple : chaque marque mérite une identité digne de ses ambitions.
            </p>
            <p>
              Nous fusionnons créativité artistique et rigueur technologique pour forger des expériences digitales qui ne se contentent pas d'être vues, mais qui sont mémorisées.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-center md:text-left">
            <div className="space-y-2">
              <span className="text-4xl font-serif italic text-accent">98%</span>
              <p className="text-[10px] uppercase tracking-widest text-white/30 italic">Satisfaction Client</p>
            </div>
            <div className="space-y-2">
              <span className="text-4xl font-serif italic text-accent">100+</span>
              <p className="text-[10px] uppercase tracking-widest text-white/30 italic">Projets Réalisés</p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center items-center py-12">
          <div className="absolute -inset-20 bg-accent/10 blur-[120px] rounded-full" />
          <Logo className="w-full max-w-md drop-shadow-[0_0_50px_rgba(197,160,89,0.15)] transform md:rotate-[-2deg]" />
        </div>
      </div>
    </motion.div>
  );
}

function ContactView({ onQuoteClick }: { onQuoteClick: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="container mx-auto px-6 py-20"
    >
      <div className="max-w-4xl mx-auto text-center space-y-16">
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold block">CONTACTEZ-NOUS</span>
          <h2 className="text-5xl md:text-7xl font-serif font-light text-ink leading-tight">
            Prêt pour une <span className="italic text-accent">nouvelle étape ?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <a href="mailto:ameilo.agence@gmail.com" className="p-10 border border-white/5 glass space-y-4 group transition-colors hover:border-accent/30">
            <Mail size={32} className="text-accent mx-auto" strokeWidth={1} />
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-white/30 italic">Email Officiel</span>
              <p className="text-xs text-ink">ameilo.agence@gmail.com</p>
            </div>
          </a>
          <a href="https://wa.me/221756367023" target="_blank" rel="noopener noreferrer" className="p-10 border border-white/5 glass space-y-4 group transition-colors hover:border-accent/30">
            <MessageCircle size={32} className="text-accent mx-auto" strokeWidth={1} />
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-white/30 italic">WhatsApp Business</span>
              <p className="text-xs text-ink">+221 75 636 70 23</p>
            </div>
          </a>
          <div className="p-10 border border-white/5 glass space-y-4 group transition-colors hover:border-accent/30">
            <Phone size={32} className="text-accent mx-auto" strokeWidth={1} />
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-white/30 italic">Localisation</span>
              <p className="text-xs text-ink italic">Dakar &mdash; Global Reach</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-3xl mx-auto pt-10">
          {[
            { icon: <Instagram size={20} />, label: "Instagram", id: "@ameilo11", href: "https://instagram.com/ameilo11" },
            { icon: <Music2 size={20} />, label: "TikTok", id: "@ameilo11", href: "https://tiktok.com/@ameilo11" },
            { icon: <Facebook size={20} />, label: "Facebook", id: "@ameiloagence", href: "https://facebook.com/ameiloagence" },
            { icon: <Linkedin size={20} />, label: "LinkedIn", id: "@ameiloagence", href: "https://linkedin.com/company/ameiloagence" },
            { icon: <Youtube size={20} />, label: "YouTube", id: "@ameiloagence", href: "https://youtube.com/@ameiloagence" }
          ].map((social, i) => (
            <motion.a 
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, borderColor: '#c5a059' }}
              className="p-6 border border-white/5 glass flex flex-col items-center gap-3 group transition-all"
            >
              <div className="text-white/20 group-hover:text-accent transition-colors">
                {social.icon}
              </div>
              <div className="text-center">
                <span className="text-[8px] uppercase tracking-widest text-white/20 block mb-1">{social.label}</span>
                <span className="text-[9px] font-mono text-white/40">{social.id}</span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="pt-20">
           <motion.button 
            onClick={onQuoteClick}
            whileHover={{ scale: 1.05 }}
            className="bg-accent text-bg px-20 py-6 font-bold uppercase tracking-[0.4em] text-[10px] shadow-3xl shadow-accent/20"
          >
            Lancer mon devis en ligne
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}


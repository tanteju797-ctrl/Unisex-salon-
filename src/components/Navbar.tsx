import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scissors, 
  Phone, 
  Calendar, 
  MapPin, 
  Clock, 
  Star, 
  Menu, 
  X, 
  MessageCircle, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check salon hours 9:30 AM - 8:00 PM
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;
    setIsOpenNow(currentHour >= 9.5 && currentHour < 20);
  }, []);

  const navLinks = [
    { label: 'Haircuts', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'Academy', href: '#academy' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top micro-bar */}
      <div className="bg-[#0F0F0E] text-[#B0AAA0] text-xs py-1.5 border-b border-[#2A2825] px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#D1C8BC]">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              {isOpenNow ? 'Open Now • Closes at 8:00 PM' : 'Opens Daily at 9:30 AM'}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C2A377]" />
              SCO 33, Cantt County, Suffipind, Jalandhar
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a 
              href={SALON_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#C2A377] hover:underline"
            >
              <Star className="w-3.5 h-3.5 fill-[#C2A377]" />
              4.9/5 Rating (80+ Google Reviews)
            </a>
            <span className="text-[#3E3A35]">|</span>
            <a 
              href={`tel:${SALON_INFO.rawPhone}`} 
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C2A377]" />
              {SALON_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#141413]/90 backdrop-blur-md border-b border-[#282624] py-3 shadow-lg shadow-black/20' 
            : 'bg-[#141413] py-4 border-b border-[#22201D]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <a 
            href="#" 
            className="group flex items-center gap-3 text-left"
            id="nav-brand-logo"
          >
            <div className="w-10 h-10 rounded-lg bg-[#22201D] border border-[#3A352F] flex items-center justify-center text-[#C2A377] group-hover:border-[#C2A377] transition-all">
              <Scissors className="w-5 h-5 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div>
              <span className="block font-serif text-lg sm:text-xl font-bold tracking-tight text-[#FAF7F2] group-hover:text-[#C2A377] transition-colors leading-tight">
                TAANI'S MAKEOVERS
              </span>
              <span className="block text-[10px] tracking-widest text-[#9C9488] uppercase font-medium">
                Unisex Salon & Beauty Academy
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-[#C8C2B7] hover:text-[#FAF7F2] transition-colors relative py-1 cursor-pointer"
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C2A377]"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Hi%20Taani%27s%20Makeovers,%20I%20would%20like%20to%20inquire%20about%20a%20salon%20service/appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#1E1C1A] text-[#25D366] hover:bg-[#282522] border border-[#332F2A] transition-all"
              title="Chat on WhatsApp"
              id="nav-whatsapp-btn"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <a
              href={`tel:${SALON_INFO.rawPhone}`}
              className="px-3.5 py-2 rounded-lg bg-[#1E1C1A] text-[#D8D2C7] hover:text-white hover:bg-[#282522] border border-[#332F2A] text-xs font-medium flex items-center gap-1.5 transition-all"
              id="nav-call-btn"
            >
              <Phone className="w-3.5 h-3.5 text-[#C2A377]" />
              <span>Call Salon</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              id="nav-book-appointment-btn"
              className="px-4 py-2 rounded-lg bg-[#C2A377] hover:bg-[#D4B58A] text-[#141413] text-xs font-semibold tracking-wide uppercase flex items-center gap-2 shadow-sm hover:shadow-[#C2A377]/20 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 rounded-md bg-[#C2A377] text-[#141413] text-xs font-semibold"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#D8D2C7] bg-[#1E1C1A] border border-[#332F2A]"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-[#181715] border-b border-[#2A2825] px-4 py-6 space-y-4"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-base font-medium text-[#D1C8BC] hover:text-[#C2A377] py-2 border-b border-[#24221F]"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-lg bg-[#C2A377] text-[#141413] font-semibold text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${SALON_INFO.rawPhone}`}
                  className="py-2.5 px-3 rounded-lg bg-[#22201D] border border-[#3A352F] text-xs font-medium text-center text-[#E0D9CE] flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C2A377]" />
                  Call Salon
                </a>
                <a
                  href={`https://wa.me/${SALON_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-[#22201D] border border-[#3A352F] text-xs font-medium text-center text-[#25D366] flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="text-[11px] text-[#8C8478] pt-2 flex items-center justify-between border-t border-[#24221F]">
              <span>SCO 33, Cantt County, Jalandhar</span>
              <span className="text-emerald-400">9:30 AM – 8:00 PM</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

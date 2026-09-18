import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioSection } from './components/PortfolioSection';
import { ServicesMenu } from './components/ServicesMenu';
import { BookingSystem } from './components/BookingSystem';
import { AcademySection } from './components/AcademySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { Calendar, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { SALON_INFO } from './data/salonData';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalServiceId, setModalServiceId] = useState<string | undefined>(undefined);
  const [modalHaircutTitle, setModalHaircutTitle] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState<string>('portfolio');
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingBar(window.scrollY > 400);

      const sections = ['portfolio', 'services', 'booking-section', 'academy', 'reviews', 'location'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = (serviceId?: string, haircutTitle?: string) => {
    setModalServiceId(serviceId);
    setModalHaircutTitle(haircutTitle);
    setIsModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsModalOpen(false);
    setModalServiceId(undefined);
    setModalHaircutTitle(undefined);
  };

  const handleBookCut = (haircutTitle: string) => {
    handleOpenBooking(undefined, haircutTitle);
  };

  const handleSelectService = (serviceId: string) => {
    handleOpenBooking(serviceId, undefined);
  };

  const handleInquireCourse = (courseTitle: string) => {
    handleOpenBooking('srv-academy-consult', undefined);
  };

  const handleExplorePortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#141413] text-[#EBE7DF] font-sans selection:bg-[#C2A377] selection:text-[#141413]">
      {/* Top Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        activeSection={activeSection}
      />

      {/* Main Hero View */}
      <Hero
        onOpenBooking={() => handleOpenBooking()}
        onExplorePortfolio={handleExplorePortfolio}
      />

      {/* Haircut & Lookbook Portfolio Section */}
      <PortfolioSection
        onBookCut={handleBookCut}
      />

      {/* Services Menu Section */}
      <ServicesMenu
        onSelectService={handleSelectService}
      />

      {/* Direct Embedded Booking Section */}
      <section id="booking-section" className="py-16 lg:py-24 bg-[#141413] border-b border-[#24221F]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C2A377]">
              Reserve Your Salon Visit
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Instant Online Appointment Scheduler
            </h2>
            <p className="text-sm text-[#9E9689] max-w-xl mx-auto">
              Select your service, choose your preferred time slot, and receive instant confirmation with WhatsApp synchronization.
            </p>
          </div>

          <BookingSystem
            isModal={false}
            initialServiceId={modalServiceId}
            initialHaircutTitle={modalHaircutTitle}
          />
        </div>
      </section>

      {/* Beauty Academy Program Section */}
      <AcademySection
        onInquireCourse={handleInquireCourse}
      />

      {/* Verified Google Reviews Section */}
      <ReviewsSection />

      {/* Location, Contact & Map Section */}
      <LocationContact
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Floating Action Button for Mobile/Quick Access */}
      <AnimatePresence>
        {showFloatingBar && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-5 right-5 z-40 flex items-center gap-2"
          >
            <a
              href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Hi%20Taani%27s%20Makeovers,%20I%20would%20like%20to%20book%20an%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-full bg-[#25D366] text-[#0D2413] shadow-xl hover:scale-105 transition-transform"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              onClick={() => handleOpenBooking()}
              id="floating-book-now-btn"
              className="px-5 py-3.5 rounded-full bg-[#C2A377] hover:bg-[#D4B58A] text-[#141413] font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-2xl shadow-[#C2A377]/30 hover:scale-105 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseBooking}
        initialServiceId={modalServiceId}
        initialHaircutTitle={modalHaircutTitle}
      />
    </div>
  );
}

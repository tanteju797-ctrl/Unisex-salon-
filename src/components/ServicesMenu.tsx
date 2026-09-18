import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scissors, 
  Sparkles, 
  Heart, 
  Clock, 
  Calendar, 
  Info, 
  ShieldCheck, 
  Check, 
  Layers, 
  Brush, 
  Smile, 
  Crown,
  GraduationCap
} from 'lucide-react';
import { SERVICES_LIST } from '../data/salonData';
import { ServiceItem } from '../types';

interface ServicesMenuProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesMenu: React.FC<ServicesMenuProps> = ({ onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hair' | 'skin' | 'nails' | 'bridal' | 'grooming'>('all');

  const categories = [
    { key: 'all', label: 'All Services', icon: Sparkles },
    { key: 'hair', label: 'Hair & Styling', icon: Scissors },
    { key: 'skin', label: 'Facial & Skin Care', icon: Smile },
    { key: 'nails', label: 'Nails & Pedicure', icon: Brush },
    { key: 'bridal', label: 'Bridal & Occasion', icon: Crown },
    { key: 'grooming', label: 'Lashes & Grooming', icon: Heart },
  ];

  const filteredServices = SERVICES_LIST.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="services" className="py-16 lg:py-24 bg-[#111110] border-b border-[#24221F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1D1A] border border-[#35302A] text-xs font-medium text-[#C2A377] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unisex Salon Menu</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF7F2] tracking-tight">
              Curated Beauty & Hair Services
            </h2>
            <p className="text-[#9E9689] text-sm sm:text-base mt-2 max-w-xl">
              From bespoke haircuts and keratin treatments to luxury bridal artistry and hydra-glow facials, delivered with salon-grade hygiene and care.
            </p>
          </div>

          {/* Verification Transparency Note */}
          <div className="max-w-md p-3 rounded-xl bg-[#181715] border border-[#2B2824] text-[11px] text-[#8C8477] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#C2A377] shrink-0 mt-0.5" />
            <span>
              <strong>Note:</strong> Customized consultations determine exact treatment formulas and pricing based on individual hair length, texture, and skin profile.
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-[#22201D]">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#C2A377] text-[#141413] font-bold shadow-md'
                    : 'bg-[#181715] text-[#9E9689] hover:text-[#FAF7F2] hover:bg-[#22201D] border border-[#292622]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Services Cards Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                layout
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="p-5 rounded-xl bg-[#181715] border border-[#282522] hover:border-[#3D372F] hover:bg-[#1C1A18] transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-black/30"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-[#C2A377] block mb-1">
                        {service.category.toUpperCase()} • {service.gender.toUpperCase()}
                      </span>
                      <h3 className="font-serif font-bold text-base text-[#FAF7F2] group-hover:text-[#C2A377] transition-colors leading-snug">
                        {service.name}
                      </h3>
                    </div>
                    {service.popular && (
                      <span className="px-2 py-0.5 rounded bg-[#C2A377]/15 text-[#C2A377] text-[10px] font-semibold tracking-wide shrink-0">
                        {service.tag || 'Popular'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#9E9689] leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-3 pt-2 text-xs text-[#80776B] border-t border-[#22201D]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#C2A377]" />
                      ~{service.durationMinutes} mins
                    </span>
                    <span className="text-[#3E3A33]">•</span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Sterilized Care
                    </span>
                  </div>
                </div>

                <div className="pt-4 mt-3">
                  <button
                    onClick={() => onSelectService(service.id)}
                    className="w-full py-2.5 rounded-lg bg-[#22201D] hover:bg-[#C2A377] text-[#D8D2C7] hover:text-[#141413] border border-[#332F2A] hover:border-[#C2A377] text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Select for Booking</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bridal Suite Special Feature Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1C1A17] via-[#221F1B] to-[#1C1A17] border border-[#3A342B] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C2A377]">
                <Crown className="w-4 h-4" />
                <span>Specialized Bridal & Groom Lounge</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">
                Planning Your Wedding or Big Occasion?
              </h3>
              <p className="text-xs sm:text-sm text-[#A8A093] leading-relaxed">
                We offer personalized bridal packages including HD/Airbrush makeup, signature hair up-dos, floral accessories, pre-bridal skin therapy, and complete groom packages for families.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <button
                onClick={() => onSelectService('srv-bridal-hd-makeup')}
                className="w-full py-3 rounded-xl bg-[#C2A377] text-[#141413] font-bold text-xs uppercase tracking-wider hover:bg-[#D4B58A] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Bridal Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Scissors, 
  Sparkles, 
  Star, 
  MapPin, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle2, 
  GraduationCap,
  Users
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
  onExplorePortfolio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExplorePortfolio }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#24221F]">
      {/* Subtle architectural background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[#C2A377]/10 via-[#8C7352]/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C2A377]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <motion.a
            href={SALON_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F1D1A] border border-[#3A352F] text-xs font-medium text-[#E0D9CE] hover:border-[#C2A377] transition-all group cursor-pointer"
          >
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-white">4.9 / 5.0</span>
            <span className="text-[#8E877C]">•</span>
            <span className="text-[#B5ADA0]">80+ Verified Google Reviews</span>
            <ArrowUpRight className="w-3 h-3 text-[#C2A377] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181715] border border-[#2B2925] text-xs text-[#9E9689]"
          >
            <Users className="w-3.5 h-3.5 text-[#C2A377]" />
            <span>Unisex Salon & Certified Academy</span>
          </motion.div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-[#FAF7F2] leading-[1.12]"
            >
              Modern Precision Haircuts,{' '}
              <span className="italic font-normal text-[#C2A377]">
                Bridal Artistry
              </span>{' '}
              & Beauty Academy.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base sm:text-lg text-[#B5ADA0] max-w-2xl font-normal leading-relaxed"
            >
              Taani's Makeovers brings high-craft haircutting, balayage, skin aesthetics, and bridal glam to Jalandhar. A peaceful unisex space dedicated to custom morphology-based styling and certified professional beauty training.
            </motion.p>

            {/* Micro Highlights Grid */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2"
            >
              <div className="p-3 rounded-lg bg-[#191816] border border-[#2A2825]">
                <div className="flex items-center gap-1.5 text-[#C2A377] text-xs font-semibold uppercase tracking-wider mb-1">
                  <Scissors className="w-3.5 h-3.5" />
                  Unisex Styling
                </div>
                <p className="text-xs text-[#9E9689]">Men's fades, women's layers & color craft</p>
              </div>

              <div className="p-3 rounded-lg bg-[#191816] border border-[#2A2825]">
                <div className="flex items-center gap-1.5 text-[#C2A377] text-xs font-semibold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Bridal Suite
                </div>
                <p className="text-xs text-[#9E9689]">HD airbrush, party glam & groom prep</p>
              </div>

              <div className="p-3 rounded-lg bg-[#191816] border border-[#2A2825] col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-[#C2A377] text-xs font-semibold uppercase tracking-wider mb-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Beauty Academy
                </div>
                <p className="text-xs text-[#9E9689]">Hands-on masterclasses & certifications</p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={onOpenBooking}
                id="hero-book-now-btn"
                className="px-6 py-3.5 rounded-xl bg-[#C2A377] hover:bg-[#D4B58A] text-[#141413] font-semibold text-sm tracking-wide uppercase flex items-center gap-2.5 shadow-lg shadow-[#C2A377]/15 transition-all hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Online in 30s</span>
              </button>

              <button
                onClick={onExplorePortfolio}
                id="hero-view-portfolio-btn"
                className="px-5 py-3.5 rounded-xl bg-[#1E1C19] hover:bg-[#282521] border border-[#3B362F] text-[#E5DFD4] font-medium text-sm flex items-center gap-2 transition-all hover:border-[#C2A377] cursor-pointer"
              >
                <Scissors className="w-4 h-4 text-[#C2A377]" />
                <span>View Haircut Portfolio</span>
              </button>

              <a
                href={`tel:${SALON_INFO.rawPhone}`}
                className="px-4 py-3.5 rounded-xl text-xs font-medium text-[#9E9689] hover:text-white transition-colors"
              >
                Or Call {SALON_INFO.phone}
              </a>
            </motion.div>

            {/* Address bar footer in hero */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex items-center gap-2 text-xs text-[#827A6E] pt-2 border-t border-[#22201D]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C2A377] shrink-0" />
              <span>SCO 33, Cantt County, Suffipind, Jalandhar, Punjab – 144024</span>
              <span className="text-[#3E3A35]">•</span>
              <span className="text-emerald-400 font-medium">9:30 AM – 8:00 PM Daily</span>
            </motion.div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              {/* Main Card with Split Unisex Imagery */}
              <div className="relative rounded-2xl overflow-hidden border border-[#332F2A] bg-[#1A1816] shadow-2xl">
                <div className="relative h-80 sm:h-96 w-full">
                  <img
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                    alt="Taani's Makeovers Unisex Salon Interior and Styling Station"
                    className="w-full h-full object-cover brightness-[0.88] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-[#141413]/30 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-[#141413]/85 backdrop-blur-md border border-[#3A352F] text-[11px] font-medium text-[#E0D9CE] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Appointments Available Today
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#C2A377] text-[#141413] text-[11px] font-bold tracking-wider uppercase">
                      Cantt County
                    </span>
                  </div>

                  {/* Bottom details inside card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#181715]/90 backdrop-blur-md border border-[#2E2B27] space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-semibold text-white font-serif">
                          Taani's Unisex Salon & Academy
                        </h2>
                        <p className="text-[11px] text-[#A8A093]">
                          SCO 33, Suffipind, Jalandhar
                        </p>
                      </div>
                      <button
                        onClick={onOpenBooking}
                        className="px-3 py-1.5 rounded-lg bg-[#C2A377] text-[#141413] text-xs font-semibold hover:bg-[#D4B58A] transition-colors"
                      >
                        Reserve Slot
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-center border-t border-[#2A2824]">
                      <div>
                        <span className="block text-xs font-bold text-[#E0D9CE]">4.9 ⭐</span>
                        <span className="text-[10px] text-[#7E776C]">80+ Reviews</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-[#E0D9CE]">Unisex</span>
                        <span className="text-[10px] text-[#7E776C]">Men & Women</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-[#E0D9CE]">Academy</span>
                        <span className="text-[10px] text-[#7E776C]">Certified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Accent Pill */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden sm:flex absolute -bottom-5 -left-5 p-3 rounded-xl bg-[#201E1B] border border-[#3D3831] shadow-xl items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[#2A2722] text-[#C2A377] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="pr-2">
                  <div className="text-xs font-semibold text-white">Hygiene & Safety Assured</div>
                  <div className="text-[10px] text-[#8C8477]">Sterilized tools • Premium salon products</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

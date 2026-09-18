import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  ExternalLink, 
  MessageCircle, 
  Calendar,
  Sparkles,
  CheckCircle2,
  Info
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface LocationContactProps {
  onOpenBooking: () => void;
}

export const LocationContact: React.FC<LocationContactProps> = ({ onOpenBooking }) => {
  return (
    <section id="location" className="py-16 lg:py-24 bg-[#141413] border-b border-[#24221F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left info column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1D1A] border border-[#35302A] text-xs font-medium text-[#C2A377] mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>Visit Our Unisex Salon & Academy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF7F2] tracking-tight">
                SCO 33, Cantt County, Jalandhar
              </h2>
              <p className="text-[#9E9689] text-sm sm:text-base mt-2">
                Conveniently located in Cantt County, Suffipind. Ample parking, modern air-conditioned styling stations, and a dedicated beauty training studio.
              </p>
            </div>

            {/* Quick Details Cards */}
            <div className="space-y-3">
              {/* Address card */}
              <div className="p-4 rounded-xl bg-[#181715] border border-[#2B2824] flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#22201D] border border-[#35302A] text-[#C2A377] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A8A093] block">
                    Primary Salon Address
                  </span>
                  <p className="text-sm font-medium text-white">
                    {SALON_INFO.address}
                  </p>
                  <p className="text-[11px] text-[#7A7367]">
                    (Verified location on Google Maps: SCO 33, Cantt County, Suffipind)
                  </p>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="p-4 rounded-xl bg-[#181715] border border-[#2B2824] flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#22201D] border border-[#35302A] text-[#C2A377] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A8A093] block">
                    Working Hours
                  </span>
                  <p className="text-sm font-medium text-white flex items-center gap-2">
                    <span>{SALON_INFO.hours}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Open 7 Days
                    </span>
                  </p>
                </div>
              </div>

              {/* Direct Phone & WhatsApp */}
              <div className="p-4 rounded-xl bg-[#181715] border border-[#2B2824] flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#22201D] border border-[#35302A] text-[#C2A377] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A8A093] block">
                    Contact & Appointments
                  </span>
                  <p className="text-sm font-medium text-white">
                    <a href={`tel:${SALON_INFO.rawPhone}`} className="hover:text-[#C2A377] transition-colors">
                      {SALON_INFO.phone}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={SALON_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#C2A377] hover:bg-[#D4B58A] text-[#141413] font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions (Google Maps)</span>
              </a>

              <a
                href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Hi%20Taani%27s%20Makeovers,%20I%20would%20like%20to%20visit%20your%20salon%20at%20Cantt%20County%20Jalandhar.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-[#1F1D1A] hover:bg-[#282521] border border-[#3A352F] text-[#25D366] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Salon</span>
              </a>
            </div>
          </div>

          {/* Right interactive visual map preview card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-[#332F2A] bg-[#181715] shadow-2xl relative">
              {/* Map Graphic / Mock View */}
              <div className="relative h-80 sm:h-96 w-full bg-[#1A1816]">
                <img
                  src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80"
                  alt="Taani's Makeovers Salon Styling Space"
                  className="w-full h-full object-cover brightness-[0.75]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-[#141413]/40 to-transparent" />

                {/* Map Pin Card Overlay */}
                <div className="absolute inset-x-6 bottom-6 p-5 rounded-xl bg-[#181715]/95 backdrop-blur-md border border-[#35302A] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#C2A377] text-[#141413] flex items-center justify-center font-bold text-xs">
                        TM
                      </div>
                      <div>
                        <h4 className="text-sm font-serif font-bold text-white">
                          TAANI'S MAKEOVERS
                        </h4>
                        <span className="text-[10px] text-[#A8A093] block">
                          Cantt County, Suffipind, Jalandhar
                        </span>
                      </div>
                    </div>

                    <a
                      href={SALON_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#24221E] text-[#C2A377] hover:bg-[#C2A377] hover:text-[#141413] transition-colors"
                      title="Open in Google Maps"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="pt-2 border-t border-[#2A2722] flex items-center justify-between text-xs">
                    <span className="text-[#8E877C]">Rating: <strong className="text-white">4.9 ⭐ (80+ Reviews)</strong></span>
                    <button
                      onClick={onOpenBooking}
                      className="text-[#C2A377] font-semibold hover:underline"
                    >
                      Book Visit →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

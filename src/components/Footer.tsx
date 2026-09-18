import React from 'react';
import { 
  Scissors, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  ExternalLink, 
  Calendar, 
  GraduationCap, 
  MessageCircle,
  Heart
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#0D0D0C] text-[#9E9689] border-t border-[#24221F] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1F1D1A]">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#1F1D1A] border border-[#3A352F] flex items-center justify-center text-[#C2A377]">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white tracking-tight block">
                  TAANI'S MAKEOVERS
                </span>
                <span className="text-[10px] tracking-widest text-[#9C9488] uppercase font-medium block">
                  Unisex Salon & Beauty Academy
                </span>
              </div>
            </div>

            <p className="text-xs text-[#8A8275] leading-relaxed max-w-sm">
              Contemporary haircutting, bespoke balayage, luxury bridal artistry, and certified professional beauty academy in Jalandhar.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={SALON_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full bg-[#181715] border border-[#2B2824] text-[11px] text-[#C2A377] flex items-center gap-1.5 hover:border-[#C2A377] transition-colors"
              >
                <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                <span>4.9 / 5.0 (80+ Reviews on Google)</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E5DFD4]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">Haircut Lookbook</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services & Menu</a>
              </li>
              <li>
                <a href="#academy" className="hover:text-white transition-colors">Beauty Academy</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Client Reviews</a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">Location & Hours</a>
              </li>
            </ul>
          </div>

          {/* Services Category highlights */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E5DFD4]">
              Specialities
            </h4>
            <ul className="space-y-1.5 text-xs text-[#8A8275]">
              <li>• Precision Men's Fade & Beard Grooming</li>
              <li>• Butterfly Layers & Botanical Blowouts</li>
              <li>• Dimensional Balayage & Keratin Spa</li>
              <li>• HD Bridal Makeup & Groom Suite</li>
              <li>• Acrylic, Gel & Chrome Nail Art</li>
              <li>• Certified Academy Diploma Training</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E5DFD4]">
              Visit & Contact
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C2A377] shrink-0 mt-0.5" />
                <span>{SALON_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C2A377] shrink-0" />
                <span>Every Day: 9:30 AM – 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C2A377] shrink-0" />
                <a href={`tel:${SALON_INFO.rawPhone}`} className="hover:text-white text-[#D8D2C7] transition-colors">
                  {SALON_INFO.phone}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 rounded-lg bg-[#C2A377] hover:bg-[#D4B58A] text-[#141413] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Bottom verification note & copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#70695E] gap-3">
          <p>
            © {new Date().getFullYear()} Taani's Makeovers Unisex Salon & Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href={SALON_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A8A093] hover:text-white flex items-center gap-1"
            >
              <span>Verified Google Maps Listing</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

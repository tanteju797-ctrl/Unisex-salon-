import React from 'react';
import { motion } from 'motion/react';
import { 
  Star, 
  CheckCircle, 
  ExternalLink, 
  Quote, 
  Sparkles, 
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { REVIEWS_LIST, SALON_INFO } from '../data/salonData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 lg:py-24 bg-[#111110] border-b border-[#24221F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1D1A] border border-[#35302A] text-xs font-medium text-[#C2A377] mb-3">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Verified Client Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF7F2] tracking-tight">
              4.9 ⭐ Rating on Google
            </h2>
            <p className="text-[#9E9689] text-sm sm:text-base mt-2 max-w-xl">
              Clients love our precision haircuts, relaxing facials & scrubs, hygienic pedicure spa, and welcoming salon environment.
            </p>
          </div>

          {/* Aggregate Rating Score Card */}
          <div className="p-4 rounded-xl bg-[#181715] border border-[#2E2A25] flex items-center gap-4">
            <div className="text-center pr-3 border-r border-[#2A2722]">
              <span className="text-3xl font-serif font-bold text-white block">4.9</span>
              <div className="flex items-center justify-center gap-0.5 text-amber-400 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">80+ Google Reviews</span>
              <a
                href={SALON_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#C2A377] hover:underline flex items-center gap-1 mt-0.5 font-medium"
              >
                <span>Read All on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS_LIST.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-6 rounded-xl bg-[#161513] border border-[#282521] hover:border-[#3A352D] flex flex-col justify-between space-y-4 group hover:shadow-lg hover:shadow-black/20"
            >
              <div className="space-y-3">
                {/* Stars and date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#7A7367]">{review.reviewDate}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#C8C2B7] leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Service Tag */}
              <div className="pt-3 border-t border-[#22201D] flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <span>{review.name}</span>
                    {review.verified && (
                      <span title="Verified Customer" className="inline-flex">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#C2A377] block mt-0.5">
                    {review.service}
                  </span>
                </div>

                <div className="w-6 h-6 rounded-full bg-[#201E1B] flex items-center justify-center text-[#7A7367]">
                  <Quote className="w-3 h-3 text-[#C2A377]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience Highlights Pillar Row */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#161513] border border-[#292621]">
          <div className="text-center p-3 border-r border-[#24221D] last:border-0">
            <span className="block text-xl font-bold font-serif text-[#FAF7F2]">100%</span>
            <span className="text-xs text-[#8F887C]">Sterilized Equipment</span>
          </div>
          <div className="text-center p-3 sm:border-r border-[#24221D]">
            <span className="block text-xl font-bold font-serif text-[#FAF7F2]">4.9 ⭐</span>
            <span className="text-xs text-[#8F887C]">Google Rating</span>
          </div>
          <div className="text-center p-3 border-r border-[#24221D] last:border-0">
            <span className="block text-xl font-bold font-serif text-[#FAF7F2]">Unisex</span>
            <span className="text-xs text-[#8F887C]">Men & Women Stylists</span>
          </div>
          <div className="text-center p-3">
            <span className="block text-xl font-bold font-serif text-[#FAF7F2]">Academy</span>
            <span className="text-xs text-[#8F887C]">Certified Diploma</span>
          </div>
        </div>
      </div>
    </section>
  );
};

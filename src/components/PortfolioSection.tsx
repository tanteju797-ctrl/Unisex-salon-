import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scissors, 
  Sparkles, 
  Eye, 
  Calendar, 
  X, 
  SlidersHorizontal, 
  Check, 
  User, 
  Layers, 
  Maximize2,
  HelpCircle
} from 'lucide-react';
import { HaircutItem } from '../types';
import { HAIRCUT_PORTFOLIO } from '../data/salonData';

interface PortfolioSectionProps {
  onBookCut: (haircutTitle: string) => void;
}

type FilterCategory = 'all' | 'men' | 'women' | 'color' | 'bridal';

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onBookCut }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedHaircut, setSelectedHaircut] = useState<HaircutItem | null>(null);
  const [beforeAfterToggle, setBeforeAfterToggle] = useState<Record<string, boolean>>({});

  const filterButtons: { key: FilterCategory; label: string; count: number }[] = [
    { key: 'all', label: 'All Haircuts', count: HAIRCUT_PORTFOLIO.length },
    { key: 'men', label: "Men's Fades & Crops", count: HAIRCUT_PORTFOLIO.filter(h => h.gender === 'men').length },
    { key: 'women', label: "Women's Cuts & Layers", count: HAIRCUT_PORTFOLIO.filter(h => h.gender === 'women' && h.category !== 'bridal_hair').length },
    { key: 'color', label: 'Balayage & Color Craft', count: HAIRCUT_PORTFOLIO.filter(h => h.category === 'color_balayage').length },
    { key: 'bridal', label: 'Bridal & Occasion Hair', count: HAIRCUT_PORTFOLIO.filter(h => h.category === 'bridal_hair').length },
  ];

  const filteredItems = HAIRCUT_PORTFOLIO.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'men') return item.gender === 'men' || item.gender === 'unisex';
    if (activeFilter === 'women') return (item.gender === 'women' || item.gender === 'unisex') && item.category !== 'bridal_hair';
    if (activeFilter === 'color') return item.category === 'color_balayage';
    if (activeFilter === 'bridal') return item.category === 'bridal_hair';
    return true;
  });

  const toggleBeforeAfter = (id: string) => {
    setBeforeAfterToggle(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="portfolio" className="py-16 lg:py-24 bg-[#141413] border-b border-[#24221F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1D1A] border border-[#35302A] text-xs font-medium text-[#C2A377] mb-3">
              <Scissors className="w-3.5 h-3.5" />
              <span>Recent Salon Transformations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF7F2] tracking-tight">
              Haircut & Styling Lookbook
            </h2>
            <p className="text-[#9E9689] text-sm sm:text-base mt-2 max-w-xl">
              Precision scissor cuts, textured skin fades, butterfly layers, and dimensional balayage crafted by our senior stylists at Taani's Makeovers.
            </p>
          </div>

          <div className="text-xs text-[#7A7367] bg-[#1A1816] px-3.5 py-2 rounded-lg border border-[#2B2824] self-start md:self-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C2A377]" />
            <span>Click any style to book directly or compare before/after</span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#24221F] pb-4">
          {filterButtons.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              id={`filter-haircut-${tab.key}`}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeFilter === tab.key
                  ? 'bg-[#C2A377] text-[#141413] shadow-md font-semibold'
                  : 'bg-[#1C1A18] text-[#A8A093] hover:text-[#FAF7F2] hover:bg-[#25221F] border border-[#2D2A26]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeFilter === tab.key ? 'bg-[#141413]/20 text-[#141413]' : 'bg-[#292622] text-[#80776A]'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Haircut Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((cut, idx) => {
              const isShowingBefore = !!beforeAfterToggle[cut.id] && !!cut.beforeImage;
              const currentImage = isShowingBefore ? cut.beforeImage! : cut.image;

              return (
                <motion.div
                  layout
                  key={cut.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group rounded-xl bg-[#191816] border border-[#292622] hover:border-[#3E382F] transition-all overflow-hidden flex flex-col justify-between hover:shadow-xl hover:shadow-black/40"
                  id={`haircut-card-${cut.id}`}
                >
                  <div>
                    {/* Image Area with toggle */}
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#100F0E]">
                      <img
                        src={currentImage}
                        alt={cut.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.92]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#191816] via-transparent to-black/30" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md bg-[#141413]/85 backdrop-blur-sm text-[10px] uppercase tracking-wider font-semibold text-[#C2A377] border border-[#2D2A26]">
                          {cut.gender === 'men' ? "Men's Cut" : cut.gender === 'women' ? "Women's Styling" : "Unisex Cut"}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {cut.beforeImage && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBeforeAfter(cut.id);
                              }}
                              className={`px-2 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                                isShowingBefore 
                                  ? 'bg-amber-500 text-black' 
                                  : 'bg-[#141413]/80 text-[#D4CDC3] hover:bg-[#141413] border border-[#3A352F]'
                              }`}
                              title="Compare Before/After"
                            >
                              <SlidersHorizontal className="w-3 h-3" />
                              <span>{isShowingBefore ? 'Showing: Before' : 'Before / After'}</span>
                            </button>
                          )}

                          <button
                            onClick={() => setSelectedHaircut(cut)}
                            className="p-1.5 rounded-md bg-[#141413]/80 text-[#D4CDC3] hover:text-white hover:bg-[#141413] border border-[#3A352F] transition-colors"
                            title="Inspect Details"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Maintenance Tag Indicator */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <span className="text-[11px] px-2 py-0.5 rounded bg-[#1A1816]/90 text-[#B0AAA0] border border-[#2E2A26]">
                          Maintenance: <strong className="text-[#E5DFD4] font-medium">{cut.maintenance}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="text-lg font-serif font-bold text-[#FAF7F2] group-hover:text-[#C2A377] transition-colors leading-snug">
                          {cut.title}
                        </h3>
                        <p className="text-xs text-[#9E9689] mt-1.5 line-clamp-2 leading-relaxed">
                          {cut.description}
                        </p>
                      </div>

                      {/* Stylist Notes Quote */}
                      <div className="p-2.5 rounded-lg bg-[#141312] border border-[#24221F] text-[11px] text-[#A8A093] italic flex items-start gap-2">
                        <Scissors className="w-3.5 h-3.5 text-[#C2A377] shrink-0 mt-0.5" />
                        <span>"{cut.stylistNote}"</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {cut.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded bg-[#211F1C] text-[10px] font-medium text-[#8F877B] border border-[#2B2824]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => onBookCut(cut.title)}
                      id={`book-haircut-btn-${cut.id}`}
                      className="w-full py-2.5 rounded-lg bg-[#22201D] hover:bg-[#C2A377] text-[#D8D2C7] hover:text-[#141413] border border-[#38332C] hover:border-[#C2A377] text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book This Haircut</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Modal Lightbox for Haircut Details */}
        <AnimatePresence>
          {selectedHaircut && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl rounded-2xl bg-[#181715] border border-[#3A352F] overflow-hidden shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedHaircut(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#141413]/80 text-[#D8D2C7] hover:text-white border border-[#3A352F] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative h-72 sm:h-80 w-full bg-black">
                  <img
                    src={selectedHaircut.image}
                    alt={selectedHaircut.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181715] via-transparent to-black/20" />
                  <div className="absolute bottom-4 left-6">
                    <span className="px-2.5 py-1 rounded bg-[#C2A377] text-[#141413] text-xs font-bold uppercase tracking-wider">
                      {selectedHaircut.gender === 'men' ? "Men's Specialist" : selectedHaircut.gender === 'women' ? "Women's Styling" : "Unisex"}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white mt-1">
                      {selectedHaircut.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-sm text-[#B5ADA0] leading-relaxed">
                    {selectedHaircut.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#1F1D1A] border border-[#2E2B27] text-xs">
                    <div>
                      <span className="text-[#877F73] block">Recommended For Face Shapes</span>
                      <span className="text-white font-medium">
                        {selectedHaircut.recommendedFaceShapes.join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#877F73] block">Maintenance Routine</span>
                      <span className="text-white font-medium">
                        {selectedHaircut.maintenance} effort styling
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#141312] border border-[#292622] text-xs text-[#A8A093]">
                    <strong className="text-[#C2A377] block mb-1">Stylist Recommendation:</strong>
                    {selectedHaircut.stylistNote}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-[#80776A]">
                      SCO 33, Cantt County, Suffipind, Jalandhar
                    </div>
                    <button
                      onClick={() => {
                        const title = selectedHaircut.title;
                        setSelectedHaircut(null);
                        onBookCut(title);
                      }}
                      className="px-5 py-2.5 rounded-lg bg-[#C2A377] text-[#141413] font-semibold text-xs uppercase tracking-wider hover:bg-[#D4B58A] transition-colors"
                    >
                      Book This Look Now
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

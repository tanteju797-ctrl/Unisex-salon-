import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  MessageCircle, 
  ChevronRight, 
  Sparkles,
  Users,
  ShieldCheck
} from 'lucide-react';
import { ACADEMY_COURSES, SALON_INFO } from '../data/salonData';
import { AcademyCourse } from '../types';

interface AcademySectionProps {
  onInquireCourse: (courseTitle: string) => void;
}

export const AcademySection: React.FC<AcademySectionProps> = ({ onInquireCourse }) => {
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse>(ACADEMY_COURSES[0]);

  const handleWhatsAppCourseInquiry = (courseTitle: string) => {
    const message = `Hello Taani's Beauty Academy, I would like to get syllabus details and batch dates for the *${courseTitle}* course.`;
    window.open(`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="academy" className="py-16 lg:py-24 bg-[#141413] border-b border-[#24221F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1D1A] border border-[#35302A] text-xs font-medium text-[#C2A377] mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Taani's Beauty Academy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF7F2] tracking-tight">
              Professional Beauty & Hair Academy
            </h2>
            <p className="text-[#9E9689] text-sm sm:text-base mt-2 max-w-xl">
              Turn your passion into a thriving career. Receive one-on-one mentorship, live model practical training, and certified professional credentials in Jalandhar.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#8F887C] bg-[#1A1816] px-3.5 py-2 rounded-lg border border-[#2B2824] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C2A377]" />
              Hands-On Live Model Practice
            </span>
          </div>
        </div>

        {/* Courses Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Course Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#7E776C] mb-2">
              Select Academy Program
            </label>

            {ACADEMY_COURSES.map((course) => {
              const isSelected = selectedCourse.id === course.id;
              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  id={`course-tab-${course.id}`}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#201E1B] border-[#C2A377] shadow-lg shadow-black/30'
                      : 'bg-[#181715] border-[#292622] hover:bg-[#1D1B18] hover:border-[#38332C]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#131211] text-[#C2A377] font-semibold border border-[#2E2A24]">
                        {course.duration}
                      </span>
                      <span className="text-[10px] text-[#7E776C]">• {course.level}</span>
                    </div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-white mt-1">
                      {course.title}
                    </h3>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-[#C2A377] translate-x-1' : 'text-[#474239]'
                  }`} />
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Course Details Card */}
          <div className="lg:col-span-7">
            <motion.div
              key={selectedCourse.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#191815] border border-[#332F28] space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2A2722] pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#C2A377]">
                    {selectedCourse.level}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                    {selectedCourse.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141312] border border-[#2C2923] text-xs text-[#E0D9CE]">
                  <Clock className="w-3.5 h-3.5 text-[#C2A377]" />
                  <span>{selectedCourse.duration}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#B5ADA0] leading-relaxed">
                {selectedCourse.description}
              </p>

              {/* Syllabus Highlights */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E5DFD4] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#C2A377]" />
                  Curriculum Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedCourse.curriculum.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-[#141312] border border-[#262420] text-xs text-[#D1C8BC] flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academy Perks */}
              <div className="p-4 rounded-xl bg-[#1F1D1A] border border-[#302B24] space-y-2">
                <span className="text-[11px] font-bold text-[#C2A377] uppercase tracking-wider block">
                  Certification Awarded:
                </span>
                <div className="text-sm font-semibold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C2A377]" />
                  <span>{selectedCourse.certification}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {selectedCourse.features.map((feat, fIdx) => (
                    <span key={fIdx} className="text-xs text-[#9E9689] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A377]" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Course Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="text-[11px] text-[#7E776C]">
                  Direct mentorship under senior stylists at Cantt County Jalandhar.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleWhatsAppCourseInquiry(selectedCourse.title)}
                    className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-[#0C2413] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire via WhatsApp</span>
                  </button>

                  <button
                    onClick={() => onInquireCourse(selectedCourse.title)}
                    className="px-4 py-2.5 rounded-xl bg-[#C2A377] hover:bg-[#D4B58A] text-[#141413] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Book Campus Visit
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

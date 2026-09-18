import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  Scissors, 
  Sparkles, 
  CheckCircle2, 
  User, 
  Phone, 
  MessageCircle, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  FileText,
  Trash2,
  Share2,
  Download,
  Plus,
  Shield,
  ArrowRight
} from 'lucide-react';
import { ServiceItem, AppointmentBooking } from '../types';
import { SERVICES_LIST, TIME_SLOTS, SALON_INFO } from '../data/salonData';

interface BookingSystemProps {
  initialServiceId?: string;
  initialHaircutTitle?: string;
  onBookingSuccess?: (booking: AppointmentBooking) => void;
  isModal?: boolean;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({
  initialServiceId,
  initialHaircutTitle,
  onBookingSuccess,
  isModal = false
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [genderPref, setGenderPref] = useState<'any' | 'male' | 'female'>('any');
  const [completedBooking, setCompletedBooking] = useState<AppointmentBooking | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [recentBookings, setRecentBookings] = useState<AppointmentBooking[]>([]);
  const [showMyBookings, setShowMyBookings] = useState(false);

  // Initialize dates
  useEffect(() => {
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    setSelectedDate(formatted);
  }, []);

  // Handle initial pre-selection
  useEffect(() => {
    if (initialServiceId) {
      if (!selectedServiceIds.includes(initialServiceId)) {
        setSelectedServiceIds([initialServiceId]);
      }
    } else if (initialHaircutTitle) {
      // Find matching service
      const matched = SERVICES_LIST.find(s => 
        s.name.toLowerCase().includes('haircut') || 
        s.name.toLowerCase().includes('precision')
      );
      if (matched) {
        setSelectedServiceIds([matched.id]);
        setSpecialNotes(`Requested Haircut Style: ${initialHaircutTitle}`);
      }
    }
  }, [initialServiceId, initialHaircutTitle]);

  // Load bookings from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('taanis_salon_bookings');
      if (saved) {
        setRecentBookings(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, [completedBooking]);

  const toggleService = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      setSelectedServiceIds(selectedServiceIds.filter(sId => sId !== id));
    } else {
      setSelectedServiceIds([...selectedServiceIds, id]);
    }
  };

  const selectedServices = SERVICES_LIST.filter(s => selectedServiceIds.includes(s.id));
  const totalDuration = selectedServices.reduce((acc, s) => acc + s.durationMinutes, 0);

  // Generate date choices (Next 7 days)
  const dateChoices = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return { dateStr, dayName, formattedDate };
  });

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || selectedServiceIds.length === 0 || !selectedTimeSlot) {
      return;
    }

    const bookingRef = `TM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: AppointmentBooking = {
      id: bookingRef,
      customerName: name.trim(),
      customerPhone: phone.trim(),
      serviceIds: selectedServiceIds,
      serviceNames: selectedServices.map(s => s.name),
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      genderPreference: genderPref,
      specialNotes: specialNotes.trim() || undefined,
      totalDurationMinutes: totalDuration,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    // Save to local storage
    try {
      const existing = localStorage.getItem('taanis_salon_bookings');
      const list = existing ? JSON.parse(existing) : [];
      const updated = [newBooking, ...list];
      localStorage.setItem('taanis_salon_bookings', JSON.stringify(updated));
      setRecentBookings(updated);
    } catch (err) {
      console.error(err);
    }

    setCompletedBooking(newBooking);
    setCurrentStep(4);
    if (onBookingSuccess) {
      onBookingSuccess(newBooking);
    }
  };

  const getWhatsAppMessage = (booking: AppointmentBooking) => {
    const text = `*New Appointment Request at Taani's Makeovers*%0A` +
      `• *Booking ID:* ${booking.id}%0A` +
      `• *Customer:* ${booking.customerName}%0A` +
      `• *Phone:* ${booking.customerPhone}%0A` +
      `• *Services:* ${booking.serviceNames.join(', ')}%0A` +
      `• *Date & Time:* ${booking.date} at ${booking.timeSlot}%0A` +
      `• *Duration:* ~${booking.totalDurationMinutes} mins%0A` +
      (booking.specialNotes ? `• *Notes:* ${encodeURIComponent(booking.specialNotes)}%0A` : '') +
      `%0A_Please confirm my appointment slot at SCO 33 Cantt County Jalandhar._`;
    return `https://wa.me/${SALON_INFO.whatsappNumber}?text=${text}`;
  };

  const downloadCalendarFile = (booking: AppointmentBooking) => {
    const startDate = new Date(`${booking.date} ${booking.timeSlot}`);
    const endDate = new Date(startDate.getTime() + (booking.totalDurationMinutes || 60) * 60000);
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Taanis Makeovers//Salon Appointment//EN
BEGIN:VEVENT
UID:${booking.id}@taanismakeovers.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(isNaN(startDate.getTime()) ? new Date() : startDate)}
DTEND:${formatDate(isNaN(endDate.getTime()) ? new Date() : endDate)}
SUMMARY:Appointment at Taani's Makeovers (${booking.serviceNames.join(', ')})
DESCRIPTION:Salon Booking Ref: ${booking.id}\\nServices: ${booking.serviceNames.join(', ')}\\nLocation: ${SALON_INFO.address}\\nPhone: ${SALON_INFO.phone}
LOCATION:${SALON_INFO.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `appointment-${booking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cancelSavedBooking = (id: string) => {
    const updated = recentBookings.filter(b => b.id !== id);
    setRecentBookings(updated);
    localStorage.setItem('taanis_salon_bookings', JSON.stringify(updated));
  };

  const categories = [
    { key: 'all', label: 'All Services' },
    { key: 'hair', label: 'Haircuts & Styling' },
    { key: 'skin', label: 'Facial & Skin' },
    { key: 'nails', label: 'Nails & Feet' },
    { key: 'bridal', label: 'Bridal & Groom' },
    { key: 'academy', label: 'Academy' },
  ];

  const filteredServices = SERVICES_LIST.filter(s => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <div className={`w-full bg-[#181715] rounded-2xl border border-[#2D2A26] overflow-hidden text-[#E0D9CE] shadow-2xl ${isModal ? '' : 'my-4'}`} id="online-booking-system">
      {/* Top Banner & Steps Indicator */}
      <div className="bg-[#141312] p-5 sm:p-6 border-b border-[#282623] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C2A377] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Online Scheduling</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF7F2]">
            Book Your Salon & Academy Slot
          </h2>
          <p className="text-xs text-[#8F887C] mt-0.5">
            Every Day: 9:30 AM – 8:00 PM • Cantt County, Suffipind, Jalandhar
          </p>
        </div>

        {/* Step progress pills */}
        {currentStep < 4 && (
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  currentStep === step
                    ? 'bg-[#C2A377] text-[#141413] font-bold'
                    : currentStep > step
                    ? 'bg-[#292622] text-[#C2A377]'
                    : 'bg-[#1F1E1B] text-[#696359]'
                }`}
              >
                <span>{step === 1 ? '1. Services' : step === 2 ? '2. Time' : '3. Details'}</span>
              </div>
            ))}
          </div>
        )}

        {/* View saved appointments badge */}
        {recentBookings.length > 0 && currentStep < 4 && (
          <button
            onClick={() => setShowMyBookings(!showMyBookings)}
            className="text-xs text-[#C2A377] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>My Bookings ({recentBookings.length})</span>
          </button>
        )}
      </div>

      {/* Saved Bookings Drawer Toggle */}
      <AnimatePresence>
        {showMyBookings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#1F1D1A] border-b border-[#2D2A26] p-4 sm:p-5 space-y-3"
          >
            <div className="flex items-center justify-between text-xs font-semibold text-[#FAF7F2]">
              <span>Your Saved Appointments</span>
              <button 
                onClick={() => setShowMyBookings(false)} 
                className="text-[#9E9689] hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {recentBookings.map(b => (
                <div key={b.id} className="p-3 rounded-lg bg-[#181715] border border-[#2D2A26] flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{b.id}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-medium">
                        {b.status}
                      </span>
                    </div>
                    <div className="text-[#A39C90] mt-0.5">
                      {b.serviceNames.join(', ')} • {b.date} at {b.timeSlot}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={getWhatsAppMessage(b)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30"
                      title="Sync with WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => cancelSavedBooking(b.id)}
                      className="p-1.5 rounded bg-rose-950/40 text-rose-400 hover:bg-rose-900/60"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STEP 1: SERVICE SELECTION */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-5 sm:p-7 space-y-6"
        >
          {/* Categories Tab Bar */}
          <div className="flex flex-wrap gap-1.5 pb-2 border-b border-[#24221F]">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-[#C2A377] text-[#141413] font-semibold'
                    : 'bg-[#1E1C1A] text-[#9E9689] hover:text-[#E0D9CE]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
            {filteredServices.map(service => {
              const isSelected = selectedServiceIds.includes(service.id);
              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  id={`booking-service-item-${service.id}`}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#25221E] border-[#C2A377] shadow-sm'
                      : 'bg-[#1A1917] border-[#2B2824] hover:border-[#3E3A33] hover:bg-[#1E1D1A]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-semibold text-sm text-[#FAF7F2]">
                        {service.name}
                      </span>
                      {service.popular && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#C2A377]/20 text-[#C2A377] font-medium">
                          {service.tag || 'Popular'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#8F887C] line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-3 pt-1 text-[11px] text-[#A69E90]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C2A377]" />
                        ~{service.durationMinutes} mins
                      </span>
                      <span className="text-[#47423B]">•</span>
                      <span className="capitalize">{service.gender} service</span>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-1 transition-colors ${
                    isSelected ? 'bg-[#C2A377] text-[#141413]' : 'border border-[#3D3831]'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 fill-current text-[#141413]" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Bar: Selected Summary & Continue Button */}
          <div className="pt-4 border-t border-[#262421] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#A8A093] text-center sm:text-left">
              {selectedServiceIds.length === 0 ? (
                <span className="text-[#7A7367]">Please select at least 1 service to proceed</span>
              ) : (
                <div>
                  <strong className="text-white">{selectedServiceIds.length} Service(s) Selected</strong>
                  <span className="text-[#80776A] ml-2">Total Duration: ~{totalDuration} mins</span>
                </div>
              )}
            </div>

            <button
              disabled={selectedServiceIds.length === 0}
              onClick={() => setCurrentStep(2)}
              id="booking-step1-continue-btn"
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                selectedServiceIds.length > 0
                  ? 'bg-[#C2A377] hover:bg-[#D4B58A] text-[#141413] shadow-md cursor-pointer'
                  : 'bg-[#22201D] text-[#5A544A] cursor-not-allowed'
              }`}
            >
              <span>Choose Date & Time</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 2: DATE & TIME SELECTION */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-5 sm:p-7 space-y-6"
        >
          {/* Selected Services Quick pill */}
          <div className="p-3 rounded-lg bg-[#141312] border border-[#262421] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#C2A377]">
              <Scissors className="w-3.5 h-3.5" />
              <span>{selectedServices.map(s => s.name).join(', ')}</span>
            </div>
            <button 
              onClick={() => setCurrentStep(1)}
              className="text-[#9E9689] hover:text-white underline cursor-pointer"
            >
              Change
            </button>
          </div>

          {/* Date Picker row */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A2] mb-3">
              1. Select Date
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
              {dateChoices.map((d) => {
                const isSelected = selectedDate === d.dateStr;
                return (
                  <button
                    key={d.dateStr}
                    type="button"
                    onClick={() => setSelectedDate(d.dateStr)}
                    className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#C2A377] text-[#141413] border-[#C2A377] font-bold shadow-md'
                        : 'bg-[#1A1917] border-[#292622] text-[#9E9689] hover:text-white hover:bg-[#22201D]'
                    }`}
                  >
                    <span className="block text-[10px] uppercase font-medium">{d.dayName}</span>
                    <span className="block text-sm font-semibold mt-0.5">{d.formattedDate}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Picker */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#B8B0A2]">
                2. Choose Arrival Time Slot
              </label>
              <span className="text-[11px] text-emerald-400 font-medium">
                Salon hours: 9:30 AM – 8:00 PM
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedTimeSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    id={`time-slot-${slot.replace(/\s|:/g, '')}`}
                    className={`py-2 px-1 rounded-lg text-xs font-medium text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#C2A377] text-[#141413] font-bold shadow-md'
                        : 'bg-[#1B1917] border border-[#2B2824] text-[#BDB5A8] hover:text-white hover:border-[#3F3B34]'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Nav */}
          <div className="pt-4 border-t border-[#262421] flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-lg text-xs text-[#9E9689] hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              disabled={!selectedTimeSlot}
              onClick={() => setCurrentStep(3)}
              id="booking-step2-continue-btn"
              className={`px-6 py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all ${
                selectedTimeSlot
                  ? 'bg-[#C2A377] hover:bg-[#D4B58A] text-[#141413] shadow-md cursor-pointer'
                  : 'bg-[#22201D] text-[#5A544A] cursor-not-allowed'
              }`}
            >
              <span>Enter Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: CLIENT DETAILS & SPECIAL REQUESTS */}
      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-5 sm:p-7 space-y-6"
        >
          <form onSubmit={handleCompleteBooking} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#B8B0A2] mb-1.5">
                  Full Name <span className="text-[#C2A377]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#7A7367] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurpreet Singh / Simran"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#141312] border border-[#2D2A26] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-[#5E5950] focus:outline-none focus:border-[#C2A377]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B8B0A2] mb-1.5">
                  WhatsApp Phone Number <span className="text-[#C2A377]">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#7A7367] absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 95922 52653"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#141312] border border-[#2D2A26] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-[#5E5950] focus:outline-none focus:border-[#C2A377]"
                  />
                </div>
              </div>
            </div>

            {/* Stylist Preference */}
            <div>
              <label className="block text-xs font-medium text-[#B8B0A2] mb-1.5">
                Staff / Stylist Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'any', label: 'Any Senior Stylist' },
                  { key: 'female', label: 'Female Stylist' },
                  { key: 'male', label: 'Male Specialist' },
                ].map(opt => (
                  <button
                    type="button"
                    key={opt.key}
                    onClick={() => setGenderPref(opt.key as any)}
                    className={`py-2 px-2 rounded-lg text-xs border transition-all cursor-pointer ${
                      genderPref === opt.key
                        ? 'bg-[#262421] text-[#C2A377] border-[#C2A377] font-semibold'
                        : 'bg-[#141312] border-[#2A2824] text-[#8C8477] hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-xs font-medium text-[#B8B0A2] mb-1.5">
                Custom Haircut/Style Notes or Questions (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Skin fade with textured top, or bringing bridal reference photo..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full bg-[#141312] border border-[#2D2A26] rounded-xl p-3 text-xs text-white placeholder-[#5E5950] focus:outline-none focus:border-[#C2A377]"
              />
            </div>

            {/* Summary Box */}
            <div className="p-3.5 rounded-xl bg-[#141312] border border-[#282623] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#8E8679]">
                <span>Appointment Date & Time:</span>
                <span className="text-white font-medium">{selectedDate} at {selectedTimeSlot}</span>
              </div>
              <div className="flex justify-between text-[#8E8679]">
                <span>Selected Services:</span>
                <span className="text-white font-medium">{selectedServices.map(s => s.name).join(', ')}</span>
              </div>
              <div className="flex justify-between text-[#8E8679]">
                <span>Location:</span>
                <span className="text-[#C2A377]">SCO 33, Cantt County, Suffipind</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 rounded-lg text-xs text-[#9E9689] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                id="booking-confirm-submit-btn"
                className="px-6 py-3 rounded-xl bg-[#C2A377] hover:bg-[#D4B58A] text-[#141413] font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-[#C2A377]/20 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Reserve Slot</span>
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* STEP 4: INSTANT CONFIRMATION SCREEN */}
      {currentStep === 4 && completedBooking && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 sm:p-8 space-y-6 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C2A377]">
              Booking Reserved Successfully
            </span>
            <h3 className="text-2xl font-serif font-bold text-white">
              We Look Forward to Welcoming You!
            </h3>
            <p className="text-xs text-[#9E9689] max-w-md mx-auto">
              Your appointment request has been recorded with Reference Code{' '}
              <strong className="text-white font-mono">{completedBooking.id}</strong>.
            </p>
          </div>

          {/* Booking Card Details */}
          <div className="max-w-md mx-auto p-4 rounded-xl bg-[#141312] border border-[#2B2925] text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-[#22201D] pb-2">
              <span className="text-[#877F73]">Client Name:</span>
              <span className="text-white font-semibold">{completedBooking.customerName}</span>
            </div>
            <div className="flex justify-between border-b border-[#22201D] pb-2">
              <span className="text-[#877F73]">Phone:</span>
              <span className="text-white">{completedBooking.customerPhone}</span>
            </div>
            <div className="flex justify-between border-b border-[#22201D] pb-2">
              <span className="text-[#877F73]">Date & Time:</span>
              <span className="text-emerald-400 font-semibold">{completedBooking.date} at {completedBooking.timeSlot}</span>
            </div>
            <div className="flex justify-between border-b border-[#22201D] pb-2">
              <span className="text-[#877F73]">Services:</span>
              <span className="text-white text-right font-medium max-w-[220px]">{completedBooking.serviceNames.join(', ')}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-[#877F73]">Salon Location:</span>
              <span className="text-[#C2A377]">SCO 33, Cantt County, Suffipind</span>
            </div>
          </div>

          {/* Action Buttons: WhatsApp sync, Add to Calendar, New Booking */}
          <div className="max-w-md mx-auto space-y-2.5">
            <a
              href={getWhatsAppMessage(completedBooking)}
              target="_blank"
              rel="noopener noreferrer"
              id="booking-whatsapp-sync-btn"
              className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-[#0D2413] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Confirmation to Salon on WhatsApp</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => downloadCalendarFile(completedBooking)}
                className="py-2.5 px-3 rounded-xl bg-[#211F1C] hover:bg-[#2A2723] border border-[#35302A] text-xs font-medium text-[#E0D9CE] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#C2A377]" />
                <span>Save to Calendar</span>
              </button>

              <button
                onClick={() => {
                  setCurrentStep(1);
                  setSelectedServiceIds([]);
                  setSelectedTimeSlot('');
                  setCompletedBooking(null);
                }}
                className="py-2.5 px-3 rounded-xl bg-[#211F1C] hover:bg-[#2A2723] border border-[#35302A] text-xs font-medium text-[#E0D9CE] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#C2A377]" />
                <span>Book Another</span>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-[#7A7367]">
            Need to reschedule or have urgent queries? Call directly at <a href={`tel:${SALON_INFO.rawPhone}`} className="text-[#C2A377] underline">{SALON_INFO.phone}</a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

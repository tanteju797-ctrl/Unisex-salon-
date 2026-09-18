export interface ServiceItem {
  id: string;
  name: string;
  category: 'hair' | 'skin' | 'nails' | 'bridal' | 'academy' | 'grooming';
  gender: 'unisex' | 'women' | 'men';
  durationMinutes: number;
  description: string;
  popular?: boolean;
  tag?: string;
}

export interface HaircutItem {
  id: string;
  title: string;
  gender: 'men' | 'women' | 'unisex';
  category: 'men_fade' | 'women_layers' | 'color_balayage' | 'bob_texture' | 'bridal_hair';
  image: string;
  beforeImage?: string;
  description: string;
  stylistNote: string;
  recommendedFaceShapes: string[];
  maintenance: 'Low' | 'Medium' | 'High';
  tags: string[];
  serviceIdRef?: string;
}

export interface AcademyCourse {
  id: string;
  title: string;
  duration: string;
  level: 'Foundation' | 'Advanced Masterclass' | 'Comprehensive Diploma';
  description: string;
  curriculum: string[];
  features: string[];
  certification: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  rating: number;
  reviewDate: string;
  comment: string;
  service: string;
  verified: boolean;
}

export interface AppointmentBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceIds: string[];
  serviceNames: string[];
  date: string;
  timeSlot: string;
  genderPreference?: 'male' | 'female' | 'any';
  specialNotes?: string;
  totalDurationMinutes: number;
  createdAt: string;
  status: 'confirmed' | 'pending';
}

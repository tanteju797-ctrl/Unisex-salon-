import { ServiceItem, HaircutItem, AcademyCourse, CustomerReview } from '../types';

export const SALON_INFO = {
  name: "TAANI'S MAKEOVERS UNISEX SALON & ACADEMY",
  shortName: "Taani's Makeovers",
  type: "Unisex Salon & Beauty Academy",
  tagline: "Contemporary hair craftsmanship, bespoke bridal artistry & certified beauty academy.",
  address: "SCO 33, Cantt County, Suffipind, Jalandhar, Punjab – 144024",
  phone: "+91 95922 52653",
  rawPhone: "+919592252653",
  whatsappNumber: "919592252653",
  hours: "Every Day: 9:30 AM – 8:00 PM",
  rating: 4.9,
  reviewsCount: "80+",
  mapsUrl: "https://maps.app.goo.gl/iZhpCtnhmdWNoYUa6?g_st=ac",
};

export const HAIRCUT_PORTFOLIO: HaircutItem[] = [
  {
    id: 'hc-1',
    title: 'Textured Crop & Low Skin Fade',
    gender: 'men',
    category: 'men_fade',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    description: 'Precision scissor-over-comb texturizing on top with seamless micro-gradient skin fade and defined matte finish.',
    stylistNote: 'Tailored for angular jawlines. Finished with lightweight sea salt spray and clay pomade.',
    recommendedFaceShapes: ['Oval', 'Square', 'Round'],
    maintenance: 'Medium',
    tags: ['Skin Fade', 'Textured Crop', 'Beard Blend', 'Men'],
    serviceIdRef: 'srv-hair-men-cut'
  },
  {
    id: 'hc-2',
    title: 'Butterfly Layers & Curtain Fringe',
    gender: 'women',
    category: 'women_layers',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    description: 'Dynamic cascading layers creating airy movement, face-framing sweep, and voluminous salon blowout silhouette.',
    stylistNote: 'Designed to retain length while removing bulky weight and maximizing bouncy volume.',
    recommendedFaceShapes: ['Heart', 'Oval', 'Square'],
    maintenance: 'Low',
    tags: ['Butterfly Cut', 'Curtain Bangs', 'Volumizing', 'Women'],
    serviceIdRef: 'srv-hair-wom-cut'
  },
  {
    id: 'hc-3',
    title: 'Dimensional Caramel Melt Balayage',
    gender: 'women',
    category: 'color_balayage',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-painted warm toffee highlights seamlessly blended from root to tips with bond-protecting high-gloss glaze.',
    stylistNote: 'Flattering warm Indian undertones with zero harsh regrowth lines. Lasts 4-6 months with tone refresh.',
    recommendedFaceShapes: ['All Face Types'],
    maintenance: 'Low',
    tags: ['Balayage', 'Hair Gloss', 'Warm Caramel', 'Color Craft'],
    serviceIdRef: 'srv-hair-color-balayage'
  },
  {
    id: 'hc-4',
    title: 'Classic Tapered Quiff with Beard Contour',
    gender: 'men',
    category: 'men_fade',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    description: 'Refined gentleman’s tapered sides with finger-combed textured quiff and sharp razor beard contouring.',
    stylistNote: 'Versatile for corporate meetings as well as casual evening looks. Effortless styling.',
    recommendedFaceShapes: ['Oval', 'Round', 'Oblong'],
    maintenance: 'Medium',
    tags: ['Classic Taper', 'Quiff', 'Beard Lineup', 'Executive'],
    serviceIdRef: 'srv-hair-men-cut'
  },
  {
    id: 'hc-5',
    title: 'Sculpted French Bob with Soft Ends',
    gender: 'women',
    category: 'bob_texture',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
    description: 'Clean jawline-skimming architectural bob cut with point-cut interior for effortless, French-girl weightless texture.',
    stylistNote: 'Accentuates neck and collarbones. Air-dry friendly or quick 3-minute round brush finish.',
    recommendedFaceShapes: ['Oval', 'Heart', 'Diamond'],
    maintenance: 'Medium',
    tags: ['French Bob', 'Minimalist', 'Precision Cut', 'Chic'],
    serviceIdRef: 'srv-hair-wom-cut'
  },
  {
    id: 'hc-6',
    title: 'Royal Bridal Hair Artistry & Textured Bun',
    gender: 'women',
    category: 'bridal_hair',
    image: 'https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=800&q=80',
    description: 'Intricate floral-braided low bun with textured crown volume, veil anchoring, and delicate hand-placed pearl accents.',
    stylistNote: 'Constructed to hold weight of heavy dupattas and maang tikka securely throughout the 10+ hour wedding celebration.',
    recommendedFaceShapes: ['All Face Types'],
    maintenance: 'High',
    tags: ['Bridal Updo', 'Wedding Artistry', 'Veil Styling', 'Bridal Suite'],
    serviceIdRef: 'srv-bridal-hair'
  },
  {
    id: 'hc-7',
    title: 'Ash Mocha Gloss & Modern Shag',
    gender: 'unisex',
    category: 'color_balayage',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    description: 'Multi-tiered 70s-inspired rock shag with cool ash undertone gloss and shattered perimeter.',
    stylistNote: 'Brings out natural curls or waves with effortless wash-and-go versatility.',
    recommendedFaceShapes: ['Square', 'Oval', 'Heart'],
    maintenance: 'Low',
    tags: ['Wolf Shag', 'Ash Mocha', 'Cool Tone', 'Unisex'],
    serviceIdRef: 'srv-hair-color-global'
  },
  {
    id: 'hc-8',
    title: 'Drop Fade with Curly Texture Crown',
    gender: 'men',
    category: 'men_fade',
    image: 'https://images.unsplash.com/photo-1517832606589-7629c339590a?auto=format&fit=crop&w=800&q=80',
    description: 'Curved drop fade following the occipital bone curvature with moisture-locked defined curl definition.',
    stylistNote: 'Hydrated with leave-in salon curl cream and diffuser finish.',
    recommendedFaceShapes: ['Oval', 'Round', 'Square'],
    maintenance: 'Medium',
    tags: ['Drop Fade', 'Natural Curls', 'Precision Edge', 'Men'],
    serviceIdRef: 'srv-hair-men-cut'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  // Haircuts & Styling
  {
    id: 'srv-hair-men-cut',
    name: 'Men\'s Signature Haircut & Beard Grooming',
    category: 'hair',
    gender: 'men',
    durationMinutes: 45,
    description: 'Precision clipper & shear cut tailored to face morphology, followed by hot towel refresh, neck taper and sharp beard contouring.',
    popular: true,
    tag: 'Bestseller'
  },
  {
    id: 'srv-hair-wom-cut',
    name: 'Women\'s Precision Cut & Botanical Blowdry',
    category: 'hair',
    gender: 'women',
    durationMinutes: 55,
    description: 'Consultation, scalp clarifying shampoo, customized scissor artistry (layers, bob, fringe) & luxury styling blowout.',
    popular: true,
    tag: 'Most Loved'
  },
  {
    id: 'srv-hair-styling',
    name: 'Hair Styling & Red-Carpet Blowouts',
    category: 'hair',
    gender: 'unisex',
    durationMinutes: 40,
    description: 'Sleek glass hair, voluminous beach waves, or sculpted red-carpet hair styling with anti-humidity thermal seal.',
  },
  {
    id: 'srv-hair-treatments',
    name: 'Keratin / Botox Hair Treatment & Spa',
    category: 'hair',
    gender: 'unisex',
    durationMinutes: 120,
    description: 'Deep restorative protein therapy eliminating frizz, restoring cuticle shine and providing silky smoothness for months.',
    popular: true,
    tag: 'Restorative'
  },
  {
    id: 'srv-hair-color-balayage',
    name: 'Bespoke Balayage & Highlights',
    category: 'hair',
    gender: 'unisex',
    durationMinutes: 150,
    description: 'Hand-painted sun-drenched dimension, contouring highlights with plex bond builder and gloss toner.',
    popular: true,
    tag: 'Signature'
  },
  {
    id: 'srv-hair-color-global',
    name: 'Global Hair Colour & Root Retouch',
    category: 'hair',
    gender: 'unisex',
    durationMinutes: 90,
    description: 'Even rich pigment coverage with ammonia-free premium formulation for high shine and silky softness.',
  },
  {
    id: 'srv-hair-extensions',
    name: 'Hair Extensions & Custom Volumizing',
    category: 'hair',
    gender: 'women',
    durationMinutes: 90,
    description: 'Seamless tape-in and micro-ring 100% human hair extensions tailored for length, thickness and instant transformation.',
  },

  // Skin & Facial
  {
    id: 'srv-skin-glow-facial',
    name: 'Signature Radiance & Hydra-Glow Facial',
    category: 'skin',
    gender: 'unisex',
    durationMinutes: 60,
    description: 'Deep pore vacuum extraction, antioxidant infusion, lymphatic facial massage, and cooling rubber mask.',
    popular: true,
    tag: 'Top Rated'
  },
  {
    id: 'srv-skin-detan',
    name: 'Anti-Tan & Skin Brightening Therapy',
    category: 'skin',
    gender: 'unisex',
    durationMinutes: 50,
    description: 'Exfoliating botanical scrub and active brightening serum to reverse UV damage and restore even skin tone.',
  },
  {
    id: 'srv-skin-scrub-polish',
    name: 'Full Body Scrub & Polish Treatment',
    category: 'skin',
    gender: 'unisex',
    durationMinutes: 75,
    description: 'Silkening walnut-apricot body scrub followed by nutrient-rich hydration balm for velvety soft skin.',
  },

  // Nails & Feet
  {
    id: 'srv-nail-gel-art',
    name: 'Custom Nail Art & Gel Extensions',
    category: 'nails',
    gender: 'unisex',
    durationMinutes: 75,
    description: 'Hand-painted intricate nail art, chrome chrome finishes, ombre blends, and durable acrylic or gel overlays.',
    popular: true,
    tag: 'Trending'
  },
  {
    id: 'srv-nail-pedicure',
    name: 'Luxury Spa Pedicure & Foot Scrub',
    category: 'nails',
    gender: 'unisex',
    durationMinutes: 55,
    description: 'Aromatherapy foot soak, intensive heel callus buffing, exfoliating scrub, soothing mask & therapeutic reflex massage.',
    popular: true,
    tag: 'Relaxing'
  },
  {
    id: 'srv-nail-manicure',
    name: 'Classic Nourishing Manicure',
    category: 'nails',
    gender: 'unisex',
    durationMinutes: 40,
    description: 'Nail shaping, cuticle revitalization, gentle hand exfoliation, pressure point massage & salon buff or polish.',
  },

  // Bridal & Special Occasion
  {
    id: 'srv-bridal-hd-makeup',
    name: 'Luxury HD Bridal Makeup & Studio Prep',
    category: 'bridal',
    gender: 'women',
    durationMinutes: 180,
    description: 'High-definition waterproof airbrush/HD makeup, draping, jewelry setting, eyelashes and pre-bridal skin prep.',
    popular: true,
    tag: 'Bridal Masterpiece'
  },
  {
    id: 'srv-bridal-hair',
    name: 'Bridal Hairstyling & Dupatta Setting',
    category: 'bridal',
    gender: 'women',
    durationMinutes: 90,
    description: 'Architectural floral buns, textured bridal braids, veil anchoring and long-lasting hold accessories.',
  },
  {
    id: 'srv-party-makeup',
    name: 'Party & Occasion Glam Makeup',
    category: 'bridal',
    gender: 'women',
    durationMinutes: 75,
    description: 'Flawless soft-glam, smokey eyes, or sculpted glowing look designed for weddings, receptions, and cocktail parties.',
  },
  {
    id: 'srv-groom-package',
    name: 'Groom & Family Grooming Suite',
    category: 'bridal',
    gender: 'men',
    durationMinutes: 90,
    description: 'Complete royal wedding prep for grooms: precision haircut, beard sculpt, skin brightening, scalp spa & styling.',
  },
  {
    id: 'srv-lash-services',
    name: 'Eyelash Extensions & Lash Lift',
    category: 'grooming',
    gender: 'women',
    durationMinutes: 60,
    description: 'Classic, hybrid or Russian volume lashes providing effortless flutter with keratin lash nourishment.',
  },

  // Academy
  {
    id: 'srv-academy-consult',
    name: 'Beauty Academy Course Admission & Demo',
    category: 'academy',
    gender: 'unisex',
    durationMinutes: 45,
    description: '1-on-1 career counselling, syllabus walkthrough, live academy studio tour and batch booking consultation.',
    tag: 'Certified Training'
  }
];

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'crs-bridal-masterclass',
    title: 'Professional Bridal & HD Makeup Artistry',
    duration: '6 Weeks (Intensive)',
    level: 'Advanced Masterclass',
    description: 'Master Indian, Western, and editorial bridal looks, HD airbrush techniques, skin tone color theory, and bridal dupatta draping.',
    curriculum: [
      'Color theory & Indian undertone color correction',
      'HD, 3D & Airbrush application methods',
      'Editorial eye styling, cut crease & lash application',
      'Dupatta, veil & jewellery styling',
      'Portfolio shoot & client business strategy'
    ],
    features: [
      'Hands-on live model practice daily',
      'Complete professional brush kit guidance',
      'Official Taani\'s Academy Certificate',
      'Social media branding & client acquisition'
    ],
    certification: 'Certified Professional Bridal Makeup Artist'
  },
  {
    id: 'crs-hair-mastery',
    title: 'Advanced Hair Design, Cuts & Colour Masterclass',
    duration: '8 Weeks',
    level: 'Comprehensive Diploma',
    description: 'From foundational geometry of haircuts to advanced balayage freehand painting, keratin treatments, and chemical texturizing.',
    curriculum: [
      'Classic & modern scissor haircutting geometry',
      'Men\'s barbering: Low, mid, high fades & beard sculpting',
      'Women\'s creative cuts: Shag, wolf cut, layers, bobs',
      'Balayage, ombre, highlights & color formulation',
      'Hair treatments: Keratin, Botox, Hair Spa diagnostics'
    ],
    features: [
      'Real salon client shadowing',
      'Chemical safety & sanitation certification',
      'Live haircut demonstration exams',
      'Job placement assistance & salon launch mentoring'
    ],
    certification: 'Diploma in Advanced Hairdressing & Color Artistry'
  },
  {
    id: 'crs-nail-art',
    title: 'Nail Extension & 3D Nail Art Specialist',
    duration: '3 Weeks',
    level: 'Foundation',
    description: 'Gel & acrylic extensions, chrome art, french ombre, cat-eye effects, 3D embellishments, and hygienic salon sanitation.',
    curriculum: [
      'Nail anatomy, prep & cuticle management',
      'Gel extension & acrylic sculpting techniques',
      'Nail art brush control, foil & glitter encasing',
      'Trending chrome, ombre & 3D floral art',
      'Safe removal, refilling & aftercare'
    ],
    features: [
      'Nail starter kit included in training',
      'Small batch size (max 4 students per batch)',
      'Official Master Nail Technician Certificate'
    ],
    certification: 'Certified Nail Technician & Extension Artist'
  },
  {
    id: 'crs-skin-aesthetics',
    title: 'Clinical Skin Aesthetics & Facial Therapy',
    duration: '4 Weeks',
    level: 'Foundation',
    description: 'Skin type analysis, hydra-facial protocols, anti-tan therapy, chemical exfoliation basics, and body polish techniques.',
    curriculum: [
      'Skin histology & diagnostic skin analysis',
      'Hydra-dermabrasion & vacuum extractions',
      'Facial massage & lymphatic drainage protocols',
      'Botanical peels, anti-aging & anti-tan formulations',
      'Salon hygiene, sterilization & consultation etiquette'
    ],
    features: [
      'Modern salon equipment hands-on practice',
      'Skin care product chemistry insights',
      'Academy Diploma in Skin Aesthetics'
    ],
    certification: 'Diploma in Professional Skin Care & Aesthetics'
  }
];

export const REVIEWS_LIST: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Gurpreet Kaur',
    rating: 5,
    reviewDate: '2 weeks ago',
    comment: 'Got my haircut and balayage done at Taani’s Makeovers. The staff is extremely professional and polite. The layered haircut completely transformed my look with zero loss in length. The salon environment is super clean and calming.',
    service: 'Butterfly Haircut & Balayage',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Manjot Singh',
    rating: 5,
    reviewDate: '1 month ago',
    comment: 'One of the best unisex salons in Cantt County Jalandhar! I regularly get my fade haircut and beard grooming here. Sharp finish, great attention to detail, and genuinely premium hair products.',
    service: 'Men\'s Fade & Beard Contour',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Simran Sharma',
    rating: 5,
    reviewDate: '3 weeks ago',
    comment: 'Booked their luxury spa pedicure and radiance facial. The scrub and massage were so deeply relaxing. My skin was glowing for days! Highly recommend for anyone looking for authentic quality salon care.',
    service: 'Spa Pedicure & Hydra Facial',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Harmanpreet Kaur',
    rating: 5,
    reviewDate: '1 month ago',
    comment: 'I completed my professional bridal makeup certification from Taani’s Beauty Academy! The practical training and personal mentoring by the team helped me build confidence. Now working on real bridal clients!',
    service: 'Academy Student (Bridal Artistry)',
    verified: true
  },
  {
    id: 'rev-5',
    name: 'Aman Deep',
    rating: 5,
    reviewDate: '2 months ago',
    comment: 'Very hygienic, welcoming staff and prompt service. The online appointment booking made everything effortless. Truly a 5-star standard salon in Jalandhar.',
    service: 'Keratin Treatment & Cut',
    verified: true
  }
];

export const TIME_SLOTS = [
  '09:30 AM',
  '10:15 AM',
  '11:00 AM',
  '11:45 AM',
  '12:30 PM',
  '01:15 PM',
  '02:00 PM',
  '02:45 PM',
  '03:30 PM',
  '04:15 PM',
  '05:00 PM',
  '05:45 PM',
  '06:30 PM',
  '07:15 PM'
];

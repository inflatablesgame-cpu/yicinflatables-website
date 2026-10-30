export type CaseStudy = {
  id: string;
  title: string;
  country: string;
  productType: string;
  application: string;
  segment: 'bounce-slide' | 'games-obstacle' | 'water-park' | 'events-branding';
  image: string;
  alt: string;
};

const image = (slug: string) => `/assets/case-studies/projects/${slug}.webp`;

export const caseStudies: CaseStudy[] = [
  { id: 'argentina-soccer-slide', title: 'Soccer-themed inflatable slide', country: 'Argentina', productType: 'Inflatable slide and jumping bouncer', application: 'Kids playground project', segment: 'bounce-slide', image: image('argentina-soccer-slide'), alt: 'Soccer-themed Argentina inflatable slide and jumping bouncer at a kids playground' },
  { id: 'france-water-slide', title: 'Commercial water slide', country: 'France', productType: 'Heavy-duty inflatable water slide', application: 'Commercial recreation project', segment: 'water-park', image: image('france-water-slide'), alt: 'Commercial heavy-duty inflatable water slide project in France' },
  { id: 'candy-house-combo', title: 'Candy-house bounce and water-slide combo', country: 'Project market private', productType: 'Inflatable castle and water slide', application: 'Professional rental project', segment: 'bounce-slide', image: image('candy-house-combo'), alt: 'Candy-house inflatable castle and water-slide combo for a professional rental project' },
  { id: 'uk-princess-bounce-house', title: 'Princess bounce house', country: 'United Kingdom', productType: 'Commercial pink bouncy castle', application: 'Rental business project', segment: 'bounce-slide', image: image('uk-princess-bounce-house'), alt: 'Commercial pink princess bouncy castle project in the United Kingdom' },
  { id: 'croatia-dual-lane-combo', title: 'Dual-lane bounce house combo', country: 'Croatia', productType: 'Commercial bounce house with slide', application: 'Outdoor playground project', segment: 'bounce-slide', image: image('croatia-dual-lane-combo'), alt: 'Commercial dual-lane bounce house and slide project in Croatia' },
  { id: 'usa-mario-combo', title: 'Mario-themed bounce house combo', country: 'United States', productType: 'Bounce house and slide', application: 'Party-rental project', segment: 'bounce-slide', image: image('usa-mario-combo'), alt: 'Mario-themed inflatable bounce house and slide project in the United States' },
  { id: 'usa-wedding-bounce-house', title: 'Wedding bounce house', country: 'United States', productType: 'Commercial white bounce house', application: 'Wedding and party-rental project', segment: 'bounce-slide', image: image('usa-wedding-bounce-house'), alt: 'Commercial wedding bounce house project in the United States' },
  { id: 'croatia-food-truck', title: 'Inflatable food truck', country: 'Croatia', productType: 'Portable inflatable ice-cream bus', application: 'Street-catering project', segment: 'events-branding', image: image('croatia-food-truck'), alt: 'Custom inflatable food truck project in Croatia for street catering' },
  { id: 'south-africa-inflatable-park', title: 'Outdoor inflatable park', country: 'South Africa', productType: 'Multi-activity inflatable park', application: 'Amusement playground project', segment: 'water-park', image: image('south-africa-inflatable-park'), alt: 'Outdoor inflatable park project in South Africa for an amusement playground' },
  { id: 'philippines-wedding-tent', title: 'Wedding party inflatable tent', country: 'Philippines', productType: 'Inflatable castle and event tent', application: 'Wedding-party project', segment: 'events-branding', image: image('philippines-wedding-tent'), alt: 'Inflatable event tent and castle project in the Philippines for a wedding party' },
  { id: 'sri-lanka-led-tent', title: 'LED inflatable nightclub tent', country: 'Sri Lanka', productType: 'Inflatable LED event tent', application: 'Rental and exhibition project', segment: 'events-branding', image: image('sri-lanka-led-tent'), alt: 'LED inflatable nightclub tent project in Sri Lanka for rental and exhibition use' },
  { id: 'peru-soccer-field', title: 'Inflatable soccer field and bumper-ball game', country: 'Peru', productType: 'Inflatable football pitch and bumper-ball game', application: 'Commercial sports and recreation project', segment: 'games-obstacle', image: image('peru-soccer-field'), alt: 'Inflatable soccer field and bumper-ball game project in Peru' },
  { id: 'peru-sumo-ring', title: 'Inflatable sumo wrestling ring', country: 'Peru', productType: 'Inflatable boxing and sumo game', application: 'Party-event project', segment: 'games-obstacle', image: image('peru-sumo-ring'), alt: 'Inflatable sumo wrestling ring project in Peru for party events' },
  { id: 'austria-airbag-system', title: 'Inflatable airbag system', country: 'Austria', productType: 'Sports-training airbag system', application: 'Extreme-sports project', segment: 'games-obstacle', image: image('austria-airbag-system'), alt: 'Inflatable airbag system project in Austria for sports training' },
  { id: 'austria-theme-park', title: 'Inflatable kids theme park', country: 'Austria', productType: 'Commercial inflatable bounce-house attraction', application: 'Kids theme-park project', segment: 'water-park', image: image('austria-theme-park'), alt: 'Inflatable kids theme-park project in Austria' },
  { id: 'usa-bubble-house', title: 'Inflatable bubble-house tent', country: 'United States', productType: 'Outdoor inflatable event tent', application: 'Wedding and exhibition project', segment: 'events-branding', image: image('usa-bubble-house'), alt: 'Inflatable bubble-house tent project in the United States for outdoor events' },
  { id: 'usa-bumper-balls', title: 'Inflatable bumper-ball set', country: 'United States', productType: 'Commercial bumper balls', application: 'Carnival interactive-play project', segment: 'games-obstacle', image: image('usa-bumper-balls'), alt: 'Commercial inflatable bumper-ball project in the United States' },
  { id: 'usa-led-white-tent', title: 'LED white inflatable tent', country: 'United States', productType: 'Inflatable event tent', application: 'Outdoor party project', segment: 'events-branding', image: image('usa-led-white-tent'), alt: 'LED white inflatable tent project in the United States for an outdoor party' },
  { id: 'argentina-obstacle-course', title: 'Racing inflatable obstacle course', country: 'Argentina', productType: 'Commercial obstacle course', application: 'Team-building event project', segment: 'games-obstacle', image: image('argentina-obstacle-course'), alt: 'Commercial inflatable obstacle-course project in Argentina for team building' },
  { id: 'germany-obstacle-course', title: 'Sports competition obstacle course', country: 'Germany', productType: 'Inflatable obstacle course', application: 'Sports competition project', segment: 'games-obstacle', image: image('germany-obstacle-course'), alt: 'Inflatable obstacle-course project in Germany for sports competition' },
  { id: 'usa-spiderman-slide', title: 'Spider-themed inflatable slide', country: 'United States', productType: 'Commercial inflatable slide', application: 'Rental-business project', segment: 'bounce-slide', image: image('usa-spiderman-slide'), alt: 'Spider-themed inflatable slide project in the United States for a rental business' },
  { id: 'philippines-water-slide', title: 'Aquatic-park water slide', country: 'Philippines', productType: 'Commercial inflatable water slide', application: 'Aquatic-park resort project', segment: 'water-park', image: image('philippines-water-slide'), alt: 'Commercial inflatable water-slide project in the Philippines for an aquatic-park resort' },
  { id: 'uae-dome-tent', title: 'Luxury inflatable dome tent', country: 'United Arab Emirates', productType: 'Inflatable dome tent', application: 'Exhibition and brand-event project', segment: 'events-branding', image: image('uae-dome-tent'), alt: 'Luxury inflatable dome-tent project in the United Arab Emirates for an exhibition event' },
  { id: 'brazil-soccer-goal', title: 'Inflatable soccer goal and dart board', country: 'Brazil', productType: 'Commercial inflatable sports game', application: 'Outdoor carnival project', segment: 'games-obstacle', image: image('brazil-soccer-goal'), alt: 'Inflatable soccer goal and dart-board project in Brazil for an outdoor carnival' },
  { id: 'brazil-spiderman-bounce-house', title: 'Spider-themed bounce house', country: 'Brazil', productType: 'Commercial inflatable bouncy castle', application: 'Outdoor kids-play project', segment: 'bounce-slide', image: image('brazil-spiderman-bounce-house'), alt: 'Spider-themed inflatable bounce-house project in Brazil for outdoor kids play' },
  { id: 'austria-bubble-house', title: 'White bubble bounce house', country: 'Austria', productType: 'Inflatable balloon tent', application: 'Event project', segment: 'events-branding', image: image('austria-bubble-house'), alt: 'White inflatable bubble bounce-house project in Austria for an event' },
];

const getCaseStudies = (ids: string[]) => ids.map((id) => {
  const caseStudy = caseStudies.find((item) => item.id === id);
  if (!caseStudy) throw new Error(`Case study not found: ${id}`);
  return caseStudy;
});

export const homeFeaturedCaseStudies = getCaseStudies([
  'usa-bumper-balls',
  'germany-obstacle-course',
  'france-water-slide',
]);

export const selectedCaseStudies = getCaseStudies([
  'philippines-water-slide',
  'germany-obstacle-course',
  'peru-soccer-field',
]);

const referenceImage = (id: string) => `/assets/case-studies/buyers/${id}.webp`;

export const buyerReferences = [
  { country: 'Argentina', image: referenceImage('argentina-1') },
  { country: 'Austria', image: referenceImage('austria-1') },
  { country: 'Brazil', image: referenceImage('brazil-1') },
  { country: 'Croatia', image: referenceImage('croatia-1') },
  { country: 'France', image: referenceImage('france-1') },
  { country: 'Germany', image: referenceImage('germany-1') },
  { country: 'Peru', image: referenceImage('peru-1') },
  { country: 'Philippines', image: referenceImage('philippines-1') },
  { country: 'Poland', image: referenceImage('poland-1') },
  { country: 'South Africa', image: referenceImage('south-africa-1') },
  { country: 'Sri Lanka', image: referenceImage('sri-lanka-1') },
  { country: 'United Arab Emirates', image: referenceImage('uae-1') },
  { country: 'United Kingdom', image: referenceImage('uk-1') },
  { country: 'United States', image: referenceImage('usa-1') },
  { country: 'Argentina', image: referenceImage('argentina-2') },
  { country: 'Austria', image: referenceImage('austria-2') },
  { country: 'Brazil', image: referenceImage('brazil-2') },
  { country: 'Croatia', image: referenceImage('croatia-2') },
  { country: 'Philippines', image: referenceImage('philippines-2') },
  { country: 'United States', image: referenceImage('usa-2') },
  { country: 'Austria', image: referenceImage('austria-3') },
  { country: 'United States', image: referenceImage('usa-3') },
  { country: 'United States', image: referenceImage('usa-4') },
  { country: 'United States', image: referenceImage('usa-5') },
  { country: 'United States', image: referenceImage('usa-6') },
];

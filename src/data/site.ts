import catalogData from './catalog.json';

export type Product = {
  slug: string;
  productSlug: string;
  category: string;
  categorySlug: string;
  title: string;
  sourceName: string;
  material: string;
  images: string[];
  dimensions: string;
  excerpt: string;
};

export type Category = {
  name: string;
  slug: string;
  count: number;
  heroImage: string;
  products: string[];
};

export const categories = catalogData.categories as Category[];
const rawProducts = catalogData.products as Product[];
const bubbleTentSource = '/assets/product/Inflatable%20Tent/3m%20diameter%20%2B%201.7m%20tunnel%2C%200.8%20mm%20PVC%20%2B0.6mmPVC%20%20%20%20inflatable%20bubble%20tent%20with%20balloons/';
const bubbleTentSafe = '/assets/product/inflatable-tent-bubble-tent/';
export const products = rawProducts.map((product) => product.slug === 'inflatable-tent--diameter-1-7m-tunnel-0-8-mm-pvc-0-6mmpvc-inflatable-bubble-tent-with-balloons-2'
  ? { ...product, images: product.images.map((image) => image.replace(bubbleTentSource, bubbleTentSafe)) }
  : product);

export function productPath(product: Pick<Product, 'categorySlug' | 'productSlug'>) {
  return `/products/${product.categorySlug}/${product.productSlug}/`;
}

// Compact product cards use generated WebP thumbnails; product pages retain
// the original files for their full-detail galleries.
export function productCardImage(product: Pick<Product, 'images'>) {
  return product.images[0]
    .replace('/assets/product/', '/assets/product-thumbs/')
    .replace(/\.(jpe?g|png|webp)$/i, '.webp');
}

export const policyLinks = [
  { href: '/privacy/', label: 'Privacy policy' },
  { href: '/terms/', label: 'Website terms' },
  { href: '/shipping/', label: 'Shipping & support' },
];

export function productAbsoluteUrl(product: Pick<Product, 'categorySlug' | 'productSlug'>) {
  return `https://${company.domain}${productPath(product)}`;
}

export function getProduct(slug: string, category?: string) {
  return products.find((product) => (category ? product.categorySlug === category : true) && (product.productSlug === slug || product.slug === slug));
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export const company = {
  name: 'YIC Inflatable Sports Co., Ltd.',
  email: 'lanna@yicinflatables.com',
  teamEmails: ['lanna@yicinflatables.com', 'sandy@yicinflatables.com', 'glya@yicinflatables.com', 'simi@yicinflatables.com'],
  whatsapp: '8613580380807',
  whatsappDisplay: '+86 135 8038 0807',
  teamWhatsApp: ['8613580380807', '8613798141001', '8613802727641'],
  teamWhatsAppDisplay: ['+86 135 8038 0807', '+86 137 9814 1001', '+86 138 0272 7641'],
  address: 'Room 0382, 8th Floor, No. 88 Anjing Road, Baiyun District, Guangzhou, China',
  mapQuery: 'Room 0382, 8th Floor, No. 88 Anjing Road, Baiyun District, Guangzhou, China',
  domain: 'yicinflatables.com',
  facebook: 'https://www.facebook.com/ChinaInflatablesLanna',
  youtube: 'https://www.youtube.com/@YICInflatables',
  instagram: 'https://www.instagram.com/lanna.chan/',
  linkedin: 'https://www.linkedin.com/in/inflatable--toys-factory/',
};

const categorySummaries: Record<string, string> = {
  'Advertising Inflatable': 'Branded inflatable displays, promotional bars, tents, and eye-catching event structures for retail and activations.',
  'Bounce House': 'Commercial bounce houses designed for party rental operators, venues, and family events.',
  'Bounce House Combo': 'Multi-play bounce house combinations that add slides, basketball hoops, ball pits, and themed play zones.',
  'Bumper Ball': 'Commercial TPU bubble balls and zorb-style games for sports operators, schools, events, and rental fleets.',
  'Inflatable Games': 'Interactive inflatable games for team building, carnivals, sports days, festivals, and rental events.',
  'Inflatable Mechanical Games': 'Mechanical bull and wipeout-style attractions built for high-energy events and operator-led entertainment.',
  'Inflatable Obstacle Course': 'Commercial obstacle courses for races, events, schools, entertainment centers, and large rental orders.',
  'Inflatable Slide': 'Dry and water inflatable slides designed for commercial party rental and event use.',
  'Inflatable Tent': 'Inflatable shelters, event tents, dome tents, and branded spaces for outdoor operations.',
  'Inflatable Theme Park': 'Large themed inflatable play attractions for parks, malls, family entertainment centers, and events.',
  'Inflatable Water Park': 'Commercial inflatable water attractions for resorts, rental fleets, recreation businesses, and water venues.',
};

export function categorySummary(category: string) {
  return categorySummaries[category] ?? `Commercial ${category.toLowerCase()} for party rental and event businesses.`;
}

export type CategorySeoProfile = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  options: string[];
  buyers: Array<{ title: string; text: string }>;
  oem: string;
  faq: Array<{ question: string; answer: string }>;
  related: string[];
};

type CategoryGuide = { title: string; text: string };

const categoryOptionDetails: Record<string, Record<string, string>> = {
  'Advertising Inflatable': {
    'Branded display inflatables': 'Large branded shapes create a visible focal point for launches, exhibitions, retail promotions, and outdoor campaigns.',
    'Promotional bars and counters': 'Functional display formats combine a branded surface with a practical hospitality, sampling, or registration point.',
    'Inflatable tents and pop-up spaces': 'Temporary branded spaces can be planned around guest access, product display, weather exposure, and campaign duration.',
    'Custom logo and campaign structures': 'A reference logo or concept can become a purpose-built structure with reviewed scale, viewing direction, and artwork.',
  },
  'Bounce House': {
    'Classic commercial bounce houses': 'A familiar jumping format gives rental fleets a flexible choice for birthdays, schools, and community events.',
    'White wedding and luxury bouncers': 'Neutral finishes support wedding planners and premium event packages where styling matters as much as play value.',
    'Themed and character jump houses': 'Themes, colors, and printed panels help operators match seasonal packages and age-specific party demand.',
    'Custom color and artwork designs': 'Custom graphics, entry details, and dimensions can align the unit with a private label or venue concept.',
  },
  'Bounce House Combo': {
    'Bounce house and slide combos': 'A bounce area plus slide creates two clear activities in one unit for birthday packages and rental inventory.',
    'Ball-pit and basketball combos': 'Ball pits and hoops add activity variety without requiring a separate attraction or additional booking slot.',
    'Themed multi-play inflatables': 'Character themes, colors, and printed panels help rental operators build age-specific and event-ready packages.',
    'Custom combo layouts for venues': 'The bounce area, slide, ball pit, entrance, exit, and play sequence can be planned around your available footprint.',
  },
  'Bumper Ball': {
    'Bubble soccer bumper balls': 'A durable group-play format for supervised bubble soccer, team challenges, and activity sessions.',
    'Team-color bumper ball sets': 'Mixed colors make it easier to organize teams, sessions, and branded activities for repeat programs.',
    'Youth and adult activity formats': 'Ball size and set quantity should be selected around the player age range and planned activity format.',
    'Custom logo and repair-kit packages': 'Branding, accessories, repair items, and carrying arrangements can be aligned with your operating plan.',
  },
  'Inflatable Games': {
    'Interactive carnival games': 'Simple rules and visible targets make these formats easy to use for fairs, festivals, and high-turnover events.',
    'Inflatable sports challenges': 'Sports-led challenges create repeat play for team events, schools, sports clubs, and activity venues.',
    'Target and accuracy games': 'Target games work well when operators need a compact, easy-to-explain attraction with clear scoring.',
    'Custom branded activity stations': 'Game rules, targets, scoring panels, colors, and printed branding can match a campaign or venue program.',
  },
  'Inflatable Mechanical Games': {
    'Mechanical bull attractions': 'A headline, operator-led attraction that requires a defined player zone, power plan, and supervision position.',
    'Wipeout and challenge games': 'Competitive formats help event operators create visible spectator appeal and repeat participation.',
    'Operator-led event inflatables': 'These attractions are planned around controls, queue space, safety perimeter, and trained supervision.',
    'Custom themed mechanical attractions': 'Theme graphics, mats, exterior details, and selected operating accessories can follow an event or venue concept.',
  },
  'Inflatable Obstacle Course': {
    'Compact obstacle courses': 'Shorter layouts fit rental packages and smaller sites while retaining a clear start-to-finish challenge.',
    'Race and fun-run inflatables': 'Longer courses support timed races, team competition, and high-throughput event activity.',
    'Ninja and challenge layouts': 'Climbing, crawling, balancing, and sliding elements can create an age-appropriate challenge sequence.',
    'Custom modular obstacle sequences': 'Length, lane count, obstacles, start and finish branding, and entry flow can follow your site plan.',
  },
  'Inflatable Slide': {
    'Dry inflatable slides': 'Dry landing formats suit party rentals, schools, fairs, and venue programs without water planning.',
    'Commercial water slides': 'Wet-use slides require site review for water supply, drainage, landing, anchoring, and seasonal operation.',
    'Themed and character slides': 'Themed exterior artwork creates a standout attraction for age-targeted rental and event packages.',
    'Slide and bounce-house combos': 'Combined formats add climbing, bouncing, and sliding activity while consolidating the attraction footprint.',
  },
  'Inflatable Tent': {
    'Inflatable dome tents': 'Dome structures create a fast-deploying branded shelter for hospitality, display, or guest activity space.',
    'Branded exhibition shelters': 'Print surfaces, entrances, counters, and interior layouts can support a focused exhibition or activation brief.',
    'Inflatable bars and tunnels': 'Functional bar and tunnel formats can guide guest flow or create a distinctive temporary event feature.',
    'Custom pop-up event spaces': 'Footprint, openings, windows, lighting, branding, and anchoring can be planned for the specific venue.',
  },
  'Inflatable Theme Park': {
    'Indoor inflatable playgrounds': 'Multi-zone play environments can be organized around ceiling height, supervision, entry, and guest circulation.',
    'Themed adventure parks': 'Characters, visual landmarks, and connected activities create a destination-style experience for visitors.',
    'Modular play attractions': 'Individual modules allow operators to plan the activity mix around available area, capacity, and expansion needs.',
    'Custom multi-zone entertainment projects': 'A venue plan can guide the theme, modules, entry and exit routes, capacity, and installation sequence.',
  },
  'Inflatable Water Park': {
    'Floating water parks': 'Connected floating modules create an active guest attraction for managed water venues and resorts.',
    'Inflatable water playgrounds': 'Water-play modules can be selected around age groups, water conditions, access, and expected capacity.',
    'Water obstacle courses': 'Climbing, balancing, and sliding challenges can create a high-energy aquatic route for group visitors.',
    'Custom modular aquatic attractions': 'A water-area plan can guide module selection, branding, anchoring, guest flow, and seasonal storage.',
  },
};

const categoryBuyingGuides: Record<string, CategoryGuide[]> = {
  'Advertising Inflatable': [
    { title: 'Define the campaign goal', text: 'Clarify whether the structure is for visibility, guest interaction, sampling, hospitality, or product display.' },
    { title: 'Plan viewing and placement', text: 'Confirm viewing direction, installation footprint, access, weather exposure, and the distance from which artwork must be readable.' },
    { title: 'Prepare brand assets', text: 'Provide vector logos, brand colors, campaign artwork, and any surfaces that need interchangeable graphics.' },
    { title: 'Plan repeat use', text: 'Review anchoring, packing, storage, transport, event dates, and inspection needs for recurring campaigns.' },
  ],
  'Bounce House': [
    { title: 'Choose by event market', text: 'Classic, themed, white wedding, and premium designs serve different rental packages and customer groups.' },
    { title: 'Confirm space and users', text: 'Match the footprint, height, entry, target age, supervision, and participant flow to the operating site.' },
    { title: 'Review rental handling', text: 'Consider setup crew, blower placement, transport, cleaning, dry storage, and repair planning for repeat bookings.' },
    { title: 'Decide the design level', text: 'Select a proven model, adapt colors and banners, or request a full custom theme and layout.' },
  ],
  'Bounce House Combo': [
    { title: 'Match the footprint', text: 'Confirm the usable site area, height clearance, access route, blower position, and packing or storage limits.' },
    { title: 'Choose play features', text: 'Select the right mix of bounce area, slide, ball pit, hoop, climbing, and themed elements for your users.' },
    { title: 'Plan by buyer', text: 'Rental fleets often need flexible party packages; FECs need guest flow, supervision zones, and repeat play.' },
    { title: 'Decide customization', text: 'Start with a proven layout, add artwork and colors, or develop a full OEM structure around your venue.' },
  ],
  'Bumper Ball': [
    { title: 'Choose the participant group', text: 'Match ball diameter and set configuration to the intended age range, activity rules, and supervised session format.' },
    { title: 'Plan the playing area', text: 'Confirm the surface, run-off space, participant count, boundary, operator position, and local venue requirements.' },
    { title: 'Build the right set', text: 'Choose quantities, team colors, inflation equipment, repair items, and carrying or storage arrangements.' },
    { title: 'Prepare repeat sessions', text: 'Plan cleaning, inspection, deflation, transport, and dry storage between rentals or group activities.' },
  ],
  'Inflatable Games': [
    { title: 'Choose the game objective', text: 'Select target, sports, competitive, team, or carnival play according to the event and audience.' },
    { title: 'Plan player throughput', text: 'Review activity duration, queue space, staffing, scoring, supervision, and repeat-play potential.' },
    { title: 'Check venue requirements', text: 'Confirm footprint, height, access, floor protection, blower or power needs, and indoor or outdoor use.' },
    { title: 'Customize the experience', text: 'Adapt targets, lanes, rules, artwork, branding, colors, and accessories to the program.' },
  ],
  'Inflatable Mechanical Games': [
    { title: 'Confirm the operating model', text: 'Define the operator position, participant rules, supervision, session format, and safety perimeter.' },
    { title: 'Check power and access', text: 'Provide voltage, frequency, plug type, equipment access route, floor conditions, and clearance.' },
    { title: 'Plan guest flow', text: 'Allow space for queueing, spectators, participant changeover, controls, and operator visibility.' },
    { title: 'Select theme and equipment', text: 'Review exterior artwork, mat design, controls, accessories, packing, and destination requirements.' },
  ],
  'Inflatable Obstacle Course': [
    { title: 'Start with usable length', text: 'Confirm the available footprint, height clearance, access, entry and exit direction, and storage limits.' },
    { title: 'Choose the challenge sequence', text: 'Match crawling, climbing, balancing, squeezing, and sliding elements to participant age and ability.' },
    { title: 'Plan lanes and throughput', text: 'Decide between open play, single-lane progression, dual-lane racing, timed events, or team competition.' },
    { title: 'Define modules and branding', text: 'Adjust course length, obstacles, start and finish sections, themes, sponsor graphics, and colors.' },
  ],
  'Inflatable Slide': [
    { title: 'Choose dry or wet use', text: 'Dry and water-slide configurations require different landing, water, drainage, anchoring, and operating plans.' },
    { title: 'Confirm height and landing', text: 'Measure total clearance, footprint, access route, queue, platform, landing zone, and supervision position.' },
    { title: 'Select lanes and theme', text: 'Choose single or dual lanes, pool or dry landing, themed artwork, colors, and visible branding.' },
    { title: 'Plan seasonal operation', text: 'Review setup crew, transport, blower or water connections, cleaning, drying, repair, and storage.' },
  ],
  'Inflatable Tent': [
    { title: 'Define the space function', text: 'Clarify whether the tent is for exhibition, hospitality, retail, sampling, sport, shelter, or guest circulation.' },
    { title: 'Plan openings and interior', text: 'Confirm doors, windows, tunnels, counters, partitions, lighting, equipment, and occupancy needs.' },
    { title: 'Review the installation site', text: 'Provide footprint, surface, anchoring, access, weather exposure, event duration, and venue restrictions.' },
    { title: 'Prepare the brand system', text: 'Coordinate logos, print panels, colors, viewing angles, reusable artwork, and private-label requirements.' },
  ],
  'Inflatable Theme Park': [
    { title: 'Start with the venue plan', text: 'Share total area, ceiling height, entrances, emergency routes, utilities, and surrounding attractions.' },
    { title: 'Define users and capacity', text: 'Plan age zones, expected visitors, session length, supervision, queueing, and spectator areas.' },
    { title: 'Build the activity mix', text: 'Combine jumping, climbing, sliding, obstacles, games, and themed landmarks around guest flow.' },
    { title: 'Plan installation and growth', text: 'Review modules, phased expansion, access, packing, installation schedule, storage, and target opening date.' },
  ],
  'Inflatable Water Park': [
    { title: 'Survey the water site', text: 'Confirm water area, depth, conditions, access, anchoring locations, weather, and operating season.' },
    { title: 'Plan capacity and flow', text: 'Define guest numbers, entry and exit, module circulation, supervision, rescue planning, and age groups.' },
    { title: 'Choose the module mix', text: 'Combine slides, climbing, balancing, jumping, resting, and obstacle modules for the intended experience.' },
    { title: 'Prepare seasonal handling', text: 'Plan installation, inspection, cleaning, drying, repair, removal, packing, transport, and storage.' },
  ],
};

const defaultBuyingGuides: CategoryGuide[] = [
  { title: 'Confirm the site', text: 'Review the usable footprint, access route, clearance, setup surface, and storage plan before selecting a model.' },
  { title: 'Match the application', text: 'Choose the format around user age, guest flow, event type, supervision, and expected repeat use.' },
  { title: 'Set the product brief', text: 'Confirm preferred features, dimensions, quantity, artwork, accessories, and destination-market requirements.' },
  { title: 'Choose customization', text: 'Start with a proven design, adapt colors and branding, or request a custom OEM/ODM project layout.' },
];

const categoryCustomizationOptions: Record<string, string[]> = {
  'Advertising Inflatable': ['Overall shape, scale, and viewing direction', 'Logo, brand colors, printed artwork, and changeable panels', 'Entrances, counters, display areas, lighting, and accessories', 'Anchoring, packing, storage, and campaign delivery requirements'],
  'Bounce House': ['Overall dimensions, entry, and jumping-area layout', 'Theme, characters, colors, banners, and printed artwork', 'Basketball hoop, decorative features, and branding', 'Blower, anchoring, repair kit, carry bag, and packing'],
  'Bounce House Combo': ['Overall dimensions and footprint', 'Bounce area, slide, ball pit, hoop, and climbing layout', 'Theme, colors, printed artwork, and logo', 'Entrance, exit, accessories, packing, and spare parts'],
  'Bumper Ball': ['Ball diameter, user group, and set quantity', 'Team colors, printed logos, and numbering', 'Inflation equipment, repair kit, and carrying bags', 'Packing configuration and repeat-session requirements'],
  'Inflatable Games': ['Game rules, targets, lanes, scoring, and player capacity', 'Overall size, entry, queue, and operator layout', 'Colors, logos, printed panels, and event branding', 'Accessories, blower or power details, and packing'],
  'Inflatable Mechanical Games': ['Theme, colors, exterior graphics, and mat treatment', 'Player zone, operator area, controls, and accessory list', 'Voltage, frequency, plug type, and equipment configuration', 'Packing, access, delivery, and installation requirements'],
  'Inflatable Slide': ['Slide height, lanes, landing, and pool layout', 'Dry or wet-use configuration', 'Theme, colors, printed artwork, and logo', 'Accessories, packing, and destination requirements'],
  'Inflatable Obstacle Course': ['Course length, modules, lanes, and challenge sequence', 'Start and finish layout, branding, and theme', 'Entry, exit, and guest-flow configuration', 'Accessories, packing, and project dimensions'],
  'Inflatable Tent': ['Footprint, height, dome, tunnel, or shelter structure', 'Doors, windows, counters, partitions, and lighting', 'Logo, colors, printed graphics, and interior branding', 'Anchoring, accessories, packing, and site requirements'],
  'Inflatable Theme Park': ['Theme, characters, artwork, and color palette', 'Modules, zones, footprint, and guest flow', 'Entry, exit, installation, and venue layout', 'Accessories, packing, and staged project delivery'],
  'Inflatable Water Park': ['Module mix, layout, water access, and capacity', 'Slides, obstacles, colors, and branding', 'Anchoring, accessories, storage, and packing', 'Project dimensions and destination requirements'],
};

export function categoryOptionDescription(category: string, option: string) {
  return categoryOptionDetails[category]?.[option] ?? `Choose this format around your application, footprint, user group, artwork, quantity, and destination requirements.`;
}

export function categoryBuyingGuide(category: string) {
  return categoryBuyingGuides[category] ?? defaultBuyingGuides;
}

export function categoryCustomization(category: string) {
  return categoryCustomizationOptions[category] ?? ['Overall dimensions and product layout', 'Colors, printed artwork, logos, and themes', 'Functional details, accessories, and packing', 'Destination-market and project requirements'];
}

const categorySeoProfiles: Record<string, CategorySeoProfile> = {
  'Advertising Inflatable': {
    title: 'Custom Advertising Inflatables | OEM Manufacturer | YIC',
    description: 'Custom advertising inflatables, branded displays, promotional bars and event structures from YIC for exhibitions, launches and global B2B campaigns.',
    h1: 'Custom Advertising Inflatables for Brand Activations',
    intro: 'YIC manufactures branded advertising inflatables for exhibitions, retail promotions, product launches, sports sponsorships, and outdoor campaigns. Choose a display format, then confirm your logo, artwork, footprint, viewing direction, and installation plan with the factory. Custom promotional inflatables are available for event agencies, exhibitors, distributors, and brand teams.',
    options: ['Branded display inflatables', 'Promotional bars and counters', 'Inflatable tents and pop-up spaces', 'Custom logo and campaign structures'],
    buyers: [{ title: 'Event and activation agencies', text: 'Create a high-visibility branded focal point that is easy for guests to recognize at public events.' }, { title: 'Exhibitors and distributors', text: 'Develop a repeatable display format with artwork and packing details suited to trade shows and campaigns.' }, { title: 'Retail and sports brands', text: 'Match colors, logos, scale, and viewing distance to a launch, sponsorship, or promotional site.' }],
    oem: 'Send a logo, reference image, dimensions, and event brief. YIC can support 3D layout, printed artwork, custom shapes, accessories, production inspection, and export packing for a campaign-ready advertising inflatable.',
    faq: [{ question: 'Can the inflatable be made to our exact brand shape?', answer: 'Yes. YIC can review a reference image or concept and develop the outline, dimensions, colors, printed artwork, entrances, display areas, and accessories for your campaign.' }, { question: 'What information is needed for a quotation?', answer: 'Share the artwork, intended venue, viewing direction, footprint, quantity, destination, and target event date so the factory can confirm a practical specification.' }, { question: 'Are advertising inflatables suitable for repeated events?', answer: 'They can be planned for repeated commercial use with appropriate material, reinforcement, packing, storage, anchoring, and operating instructions.' }],
    related: ['Inflatable Tent', 'Bounce House', 'Inflatable Games'],
  },
  'Bounce House': {
    title: 'Commercial Bounce Houses | OEM Manufacturer | YIC',
    description: 'Commercial bounce houses and bouncy castles from YIC for party rental businesses, FECs, schools and event operators. Custom themes and OEM production available.',
    h1: 'Commercial Bounce Houses for Party Rental Businesses',
    intro: 'YIC supplies commercial bounce houses for party rental fleets, family entertainment centers, schools, community venues, and event operators. The range covers classic jump houses, white wedding bouncers, themed castles, sports designs, and custom layouts. Compare the models below, then send the preferred theme, footprint, quantity, destination, and artwork requirements for a factory quotation.',
    options: ['Classic commercial bounce houses', 'White wedding and luxury bouncers', 'Themed and character jump houses', 'Custom color and artwork designs'],
    buyers: [{ title: 'Party rental companies', text: 'Add a recognizable jumping attraction with a clear footprint and a theme that is easy to sell for birthdays and community events.' }, { title: 'Family entertainment centers', text: 'Plan a supervised play zone around guest age, venue clearance, access, and expected throughput.' }, { title: 'Schools and event operators', text: 'Use a simple, highly visible attraction for fairs, sports days, festivals, and seasonal programs.' }],
    oem: 'YIC supports custom bounce house OEM and ODM projects, including color palettes, banners, characters, basketball hoops, dimensions, accessories, and commercial packing.',
    faq: [{ question: 'What makes a bounce house suitable for commercial rental?', answer: 'Commercial planning considers material selection, reinforced seams, anchoring, blower requirements, access, supervision, packing, and the expected frequency of setup and use.' }, { question: 'Can I order a white bounce house for weddings or luxury events?', answer: 'Yes. White and neutral designs can be developed with clean artwork, refined color accents, and dimensions suited to wedding venues, event planners, and premium rental packages.' }, { question: 'Can the bounce house be customized with our logo or theme?', answer: 'Yes. YIC can review brand colors, printed panels, themed artwork, size, entrance details, and optional play features before production.' }],
    related: ['Bounce House Combo', 'Inflatable Slide', 'Inflatable Obstacle Course'],
  },
  'Bounce House Combo': {
    title: 'Commercial Bounce House Combos | OEM Factory | YIC',
    description: 'Commercial bounce house combos with slides, ball pits and play features from YIC. OEM and custom combo inflatables for rental fleets and FECs.',
    h1: 'Commercial Bounce House Combos for Party Rental & FEC Businesses',
    intro: 'YIC manufactures bounce house combos that combine jumping, sliding, basketball, ball pits, and themed play in one commercial attraction. These multi-activity inflatables help party rental companies and family entertainment centers offer more value from a single footprint. Review the available layouts, then confirm the play sequence, target age group, dimensions, artwork, and quantity for a factory quote.',
    options: ['Bounce house and slide combos', 'Ball-pit and basketball combos', 'Themed multi-play inflatables', 'Custom combo layouts for venues'],
    buyers: [{ title: 'Party rental fleets', text: 'Offer more than one activity in a single rental package for birthdays, school events, and community celebrations.' }, { title: 'Family entertainment centers', text: 'Balance entry, exit, slide, bounce, and supervision zones for a busy indoor or outdoor venue.' }, { title: 'Distributors', text: 'Build a differentiated catalog with themed artwork, repeatable specifications, and private-label options.' }],
    oem: 'For a custom combo, send the required play features, venue footprint, reference artwork, target age, and preferred dimensions. YIC can develop the layout, confirm materials, and coordinate production and packing.',
    faq: [{ question: 'What features can be combined in one inflatable?', answer: 'Depending on the brief, a combo can include a bounce area, slide, basketball hoop, climbing section, ball pit, obstacle element, or themed play details.' }, { question: 'How do I plan a combo for a rental venue?', answer: 'Confirm the available footprint, ceiling height, access route, user age group, supervision plan, anchoring surface, blower position, and expected event flow.' }, { question: 'Can a combo be made in a custom theme?', answer: 'Yes. YIC can adapt colors, characters, printed panels, slide layout, feature placement, dimensions, and branding for an OEM or ODM project.' }],
    related: ['Bounce House', 'Inflatable Slide', 'Inflatable Games'],
  },
  'Bumper Ball': {
    title: 'Commercial Bumper Balls | Bubble Soccer OEM Supplier | YIC',
    description: 'Commercial bumper balls and bubble soccer inflatables from YIC for sports operators, schools, events and rental businesses. Custom colors and branding available.',
    h1: 'Commercial Bumper Balls for Bubble Soccer and Group Events',
    intro: 'YIC supplies bumper balls and bubble soccer equipment for sports operators, schools, team-building companies, festivals, and rental businesses. Select a ball format and quantity, then confirm participant age, playing surface, storage, transport, team colors, and logo requirements. Custom commercial bumper balls can be prepared for recurring activity programs and organized group play.',
    options: ['Bubble soccer bumper balls', 'Team-color bumper ball sets', 'Youth and adult activity formats', 'Custom logo and repair-kit packages'],
    buyers: [{ title: 'Sports and activity operators', text: 'Create a portable group attraction for timed sessions, leagues, camps, and supervised recreational play.' }, { title: 'Schools and team events', text: 'Use a clear, social activity format for field days, company events, and community programs.' }, { title: 'Rental businesses', text: 'Package multiple balls with transport, storage, and accessory planning for repeat bookings.' }],
    oem: 'YIC can review ball diameter, quantity, colors, printed logos, accessories, packaging, and intended user group for a custom bumper ball set.',
    faq: [{ question: 'How many bumper balls should I order?', answer: 'The quantity depends on the activity format, participant count, session size, storage capacity, and whether the set is for rentals, schools, or an operator-led venue.' }, { question: 'Can the bumper balls carry team colors or a logo?', answer: 'Yes. Color combinations and suitable logo or graphic placement can be reviewed as part of the production brief.' }, { question: 'What surface is suitable for bubble soccer?', answer: 'Use a clear, suitable playing surface with enough run-off and supervision space. Confirm the venue surface and operating rules before ordering.' }],
    related: ['Inflatable Games', 'Inflatable Mechanical Games', 'Inflatable Obstacle Course'],
  },
  'Inflatable Games': {
    title: 'Commercial Inflatable Games | OEM Manufacturer | YIC',
    description: 'Commercial inflatable games for carnivals, FECs, team events and rentals. YIC offers custom interactive games, sports inflatables and OEM production.',
    h1: 'Commercial Inflatable Games for Events and Entertainment Venues',
    intro: 'YIC manufactures interactive inflatable games for carnivals, family entertainment centers, sports days, festivals, team-building events, and rental fleets. The collection includes sports challenges, target games, competitive play, and repeat-play activity stations. Compare the formats below, then share your venue, game objective, player age, artwork, quantity, and destination for a tailored quotation.',
    options: ['Interactive carnival games', 'Inflatable sports challenges', 'Target and accuracy games', 'Custom branded activity stations'],
    buyers: [{ title: 'Family entertainment centers', text: 'Add repeat-play activities that complement jumping attractions and help organize guest flow.' }, { title: 'Event and rental operators', text: 'Build a flexible game package for festivals, team days, school events, and corporate activations.' }, { title: 'Sports and education programs', text: 'Adapt the challenge, player capacity, and branding to organized activities and community programs.' }],
    oem: 'Share the game concept, player flow, target age, venue size, logo, and artwork. YIC can support the structure, scoring or target layout, printed graphics, accessories, and export-ready packing.',
    faq: [{ question: 'Which inflatable game is right for a rental fleet?', answer: 'Choose according to the player age, venue footprint, setup time, repeat-play value, supervision plan, and whether the attraction is a target, sports, or competitive game.' }, { question: 'Can the game rules or target layout be customized?', answer: 'Yes. The play objective, target positions, colors, graphics, dimensions, and branded instructions can be reviewed for an OEM or ODM design.' }, { question: 'Are inflatable games suitable for indoor venues?', answer: 'Many formats can be adapted for indoor use when the height, access route, floor protection, blower position, ventilation, and local venue rules are confirmed.' }],
    related: ['Bumper Ball', 'Bounce House Combo', 'Inflatable Obstacle Course'],
  },
  'Inflatable Mechanical Games': {
    title: 'Commercial Inflatable Mechanical Games | OEM Factory | YIC',
    description: 'Commercial mechanical bull, wipeout and operator-led inflatable games from YIC for events, FECs, rentals and attractions. Custom themes and project support.',
    h1: 'Commercial Mechanical Inflatable Games for High-Energy Attractions',
    intro: 'YIC supplies operator-led inflatable mechanical games for family entertainment centers, event companies, rental operators, festivals, and attraction venues. These high-energy formats require clear player zones, power planning, supervision, access, and site coordination. Select a model below, then send the venue details, operating concept, theme, quantity, and destination so the factory can prepare a practical quotation.',
    options: ['Mechanical bull attractions', 'Wipeout and challenge games', 'Operator-led event inflatables', 'Custom themed mechanical attractions'],
    buyers: [{ title: 'Family entertainment centers', text: 'Create a supervised headline attraction with clear player, operator, queue, and spectator zones.' }, { title: 'Event and rental operators', text: 'Add an energetic activity to festivals, corporate days, fairs, and temporary event packages.' }, { title: 'Attraction developers', text: 'Coordinate layout, power, accessories, artwork, transport, and operator requirements at project level.' }],
    oem: 'YIC can review the attraction concept, theme, player capacity, power and accessory requirements, site footprint, and branded artwork for a custom mechanical game project.',
    faq: [{ question: 'What site information is needed for a mechanical attraction?', answer: 'Confirm the footprint, access route, floor or surface, power supply, clearance, queue area, operator position, supervision, and intended operating environment.' }, { question: 'Can the attraction be branded or themed?', answer: 'Yes. Theme graphics, colors, printed panels, signage, and selected exterior details can be adapted after the operating requirements are confirmed.' }, { question: 'Does the quotation include operator and safety planning?', answer: 'YIC can document the product specification, accessories, inspection points, and operating considerations; local operators remain responsible for venue procedures and applicable requirements.' }],
    related: ['Inflatable Games', 'Bumper Ball', 'Inflatable Theme Park'],
  },
  'Inflatable Obstacle Course': {
    title: 'Commercial Inflatable Obstacle Courses | OEM Manufacturer | YIC',
    description: 'Commercial inflatable obstacle courses and fun-run attractions from YIC for rentals, FECs, schools, races and events. Custom lengths, themes and layouts available.',
    h1: 'Commercial Inflatable Obstacle Courses for Races and FECs',
    intro: 'YIC manufactures inflatable obstacle courses for party rental companies, family entertainment centers, schools, races, team events, festivals, and activity operators. Choose from compact challenge formats to larger race-ready layouts, then confirm the available footprint, participant flow, target age, theme, length, and quantity. Custom obstacle sequences and branded graphics are available for commercial projects.',
    options: ['Compact obstacle courses', 'Race and fun-run inflatables', 'Ninja and challenge layouts', 'Custom modular obstacle sequences'],
    buyers: [{ title: 'Party rental businesses', text: 'Offer a larger-format challenge attraction for birthdays, school events, festivals, and team activities.' }, { title: 'FECs and activity venues', text: 'Plan lanes, obstacles, entry and exit around throughput, supervision, and the venue footprint.' }, { title: 'Race and event organizers', text: 'Create a branded course with clear participant flow, sponsor artwork, and event-specific dimensions.' }],
    oem: 'Send a site plan, target length, obstacle preferences, age group, artwork, and expected participants. YIC can develop a custom course layout and coordinate materials, inspection, packing, and shipment.',
    faq: [{ question: 'How do I choose the right obstacle course size?', answer: 'Start with the available footprint, height clearance, access route, participant age, desired throughput, supervision plan, and transport or storage limits.' }, { question: 'Can the obstacles and race layout be changed?', answer: 'Yes. YIC can review obstacle sequence, lane count, length, climbing or sliding features, theme artwork, and branded sections for an OEM design.' }, { question: 'Can an obstacle course be used for timed races?', answer: 'Many layouts can support timed or team challenges when the start, finish, supervision, queue, and participant flow are planned for the venue.' }],
    related: ['Inflatable Games', 'Bounce House Combo', 'Inflatable Slide'],
  },
  'Inflatable Slide': {
    title: 'Commercial Inflatable Slides | OEM Manufacturer | YIC',
    description: 'Commercial inflatable slides for party rentals, FECs, events, resorts and water venues. YIC offers dry slides, water slides, custom themes and OEM production.',
    h1: 'Commercial Inflatable Slides for Rentals, FECs and Water Venues',
    intro: 'YIC supplies commercial inflatable slides for party rental fleets, family entertainment centers, events, resorts, and seasonal recreation venues. The range includes dry slides, water-slide formats, themed slides, and slide combos. Compare the models below, then confirm the available height, landing zone, site conditions, intended users, artwork, quantity, and destination for a factory quotation.',
    options: ['Dry inflatable slides', 'Commercial water slides', 'Themed and character slides', 'Slide and bounce-house combos'],
    buyers: [{ title: 'Party rental companies', text: 'Add a visible headline attraction to birthday, school, community, and seasonal rental packages.' }, { title: 'FECs and event venues', text: 'Plan height, queue, landing, supervision, and guest flow around a busy indoor or outdoor attraction area.' }, { title: 'Water parks and resorts', text: 'Coordinate wet-use layout, water supply, anchoring, drainage, access, and seasonal operations.' }],
    oem: 'For a custom slide, share the desired height, footprint, landing arrangement, theme, color, artwork, use environment, and quantity. YIC can review the structure, accessories, testing, and export packing.',
    faq: [{ question: 'What is the difference between a dry slide and a water slide?', answer: 'A dry slide is planned for dry landing and general event or rental use, while a water slide requires suitable water flow, wet-use planning, landing, drainage, anchoring, and local operating procedures.' }, { question: 'How should I plan the site for an inflatable slide?', answer: 'Confirm the footprint, height clearance, access route, landing area, anchoring surface, queue, supervision, blower position, and any water or drainage requirements.' }, { question: 'Can the slide be made in a custom theme or height?', answer: 'Yes. YIC can review theme artwork, colors, slide height, platform and landing layout, branding, and other project-specific requirements.' }],
    related: ['Bounce House Combo', 'Inflatable Water Park', 'Inflatable Obstacle Course'],
  },
  'Inflatable Tent': {
    title: 'Commercial Inflatable Tents | OEM Manufacturer | YIC',
    description: 'Commercial inflatable tents, dome shelters and branded event spaces from YIC for exhibitions, activations, outdoor events and distributors. Custom OEM production available.',
    h1: 'Commercial Inflatable Tents for Events, Exhibitions and Activations',
    intro: 'YIC manufactures inflatable tents and branded shelters for exhibitions, outdoor events, retail activations, hospitality, sports promotions, and event agencies. Choose a dome, tunnel, bar, or enclosed shelter format, then confirm the footprint, entrance, windows, lighting, artwork, anchoring, and destination. Custom inflatable event spaces can be developed for repeat campaigns and commercial use.',
    options: ['Inflatable dome tents', 'Branded exhibition shelters', 'Inflatable bars and tunnels', 'Custom pop-up event spaces'],
    buyers: [{ title: 'Exhibitors and event agencies', text: 'Create a distinctive branded space that can be packed, transported, and reused across campaigns.' }, { title: 'Retail and hospitality brands', text: 'Plan entrances, counters, graphics, and guest flow around a promotion, sampling area, or temporary venue.' }, { title: 'Distributors', text: 'Build a private-label event shelter range with repeatable specifications, artwork, and packing options.' }],
    oem: 'Send your reference image, footprint, use environment, branding, openings, windows, lighting, quantity, and destination. YIC can support layout, artwork, production checks, and export preparation.',
    faq: [{ question: 'Can an inflatable tent be used outdoors?', answer: 'Yes, when the structure, anchoring, weather exposure, access, surface, and local operating conditions are reviewed for the intended site and duration.' }, { question: 'Can I customize the doors, windows, and interior layout?', answer: 'Yes. Openings, windows, counters, partitions, printed graphics, colors, and accessories can be included in a custom brief.' }, { question: 'How is an inflatable event shelter packed for shipping?', answer: 'Packing is planned around the deflated structure, blower or accessories, repair items, protection, packed volume, and destination handling requirements.' }],
    related: ['Advertising Inflatable', 'Inflatable Theme Park', 'Bounce House'],
  },
  'Inflatable Theme Park': {
    title: 'Commercial Inflatable Theme Parks | OEM Manufacturer | YIC',
    description: 'Commercial inflatable theme parks and indoor inflatable playgrounds from YIC for FECs, malls, parks and attractions. Custom themed project production available.',
    h1: 'Commercial Inflatable Theme Parks for FECs and Attractions',
    intro: 'YIC develops commercial inflatable theme parks and themed playground attractions for family entertainment centers, malls, parks, resorts, and destination venues. These larger projects combine themed artwork, multiple play modules, guest flow, supervision, access, and site planning. Review the available concepts, then share your footprint, theme, target age, capacity, quantity, and destination for a project quotation.',
    options: ['Indoor inflatable playgrounds', 'Themed adventure parks', 'Modular play attractions', 'Custom multi-zone entertainment projects'],
    buyers: [{ title: 'Family entertainment centers', text: 'Build an immersive play environment with multiple activity zones and a clear guest-flow plan.' }, { title: 'Malls and destination venues', text: 'Use a themed attraction to create a recognizable family destination with custom artwork and layout.' }, { title: 'Park and resort developers', text: 'Coordinate modules, capacity, access, storage, installation, and project documentation for a larger venue.' }],
    oem: 'YIC can support concept development, 3D layouts, character artwork, module planning, custom dimensions, production, inspection, packing, and project-level export coordination.',
    faq: [{ question: 'What information is needed for a theme park project quote?', answer: 'Share the venue footprint, ceiling or height limits, target age, expected capacity, theme references, modules, destination, installation plan, and target opening date.' }, { question: 'Can YIC create a complete custom themed layout?', answer: 'Yes. The factory can coordinate concept references, 3D layout, artwork approval, module arrangement, dimensions, production, and project documentation.' }, { question: 'How should guest flow and supervision be planned?', answer: 'Plan visible entry and exit points, age-appropriate zones, queue and spectator areas, operator access, emergency routes, and local venue procedures.' }],
    related: ['Inflatable Games', 'Inflatable Obstacle Course', 'Inflatable Water Park'],
  },
  'Inflatable Water Park': {
    title: 'Commercial Inflatable Water Parks | OEM Manufacturer | YIC',
    description: 'Commercial inflatable water parks and floating water attractions from YIC for resorts, parks, rental fleets and recreation venues. Custom modules and OEM production.',
    h1: 'Commercial Inflatable Water Parks for Resorts and Recreation Venues',
    intro: 'YIC manufactures commercial inflatable water parks, floating obstacle courses, water-play modules, and aquatic attractions for resorts, water parks, recreation businesses, and seasonal rental operators. Water depth, anchoring, access, guest capacity, storage, and local operating conditions should be confirmed early. Use the available concepts as a starting point for a custom water attraction brief.',
    options: ['Floating water parks', 'Inflatable water playgrounds', 'Water obstacle courses', 'Custom modular aquatic attractions'],
    buyers: [{ title: 'Water parks and resorts', text: 'Create a high-visibility aquatic attraction with modules planned around water depth, guest flow, and capacity.' }, { title: 'Recreation operators', text: 'Build a seasonal or permanent water activity program with storage, transport, anchoring, and maintenance planning.' }, { title: 'Distributors and project buyers', text: 'Coordinate a custom module range, branding, packaging, and documentation for a destination-market project.' }],
    oem: 'Share the water area, depth, module concept, target capacity, season, artwork, quantity, and destination. YIC can support layout, custom modules, material review, inspection, packing, and export coordination.',
    faq: [{ question: 'What site details are essential for a floating water park?', answer: 'Confirm water depth, area, access, anchoring points, expected capacity, weather and season, rescue or supervision plan, storage, and local operating requirements.' }, { question: 'Can the water park modules be arranged to fit our site?', answer: 'Yes. YIC can review the water area and create a modular arrangement with custom colors, branding, obstacle features, and project dimensions.' }, { question: 'How should a water attraction be stored between seasons?', answer: 'Confirm cleaning, drying, deflation, repair, packed volume, protection, and storage conditions as part of the product and operating plan.' }],
    related: ['Inflatable Slide', 'Inflatable Theme Park', 'Inflatable Obstacle Course'],
  },
};

const categorySixthFaqs: Record<string, { question: string; answer: string }> = {
  'Advertising Inflatable': { question: 'Can advertising inflatables be reused across multiple campaigns?', answer: 'They can be planned for repeat events. Confirm the display structure, replaceable or fixed artwork, packing, storage, anchoring, and inspection needs for the campaign schedule.' },
  'Bounce House': { question: 'Which accessories should I confirm with a commercial bounce house order?', answer: 'Confirm the compatible blower and electrical specification, anchoring equipment, repair kit, carry bag, and any market-specific documents for the selected model.' },
  'Bounce House Combo': { question: 'How should I choose combo features for my target age group?', answer: 'Match the bounce area, climbing access, slide, ball pit, and other features to the intended users, supervision plan, site footprint, and venue rules before approving the layout.' },
  'Bumper Ball': { question: 'How do I choose bumper ball sizes for my participants?', answer: 'Share the participant age range, activity format, and quantity. YIC can review suitable ball dimensions and set configuration for the planned group use.' },
  'Inflatable Games': { question: 'Can I order several inflatable game formats together?', answer: 'Yes. Send the game list, quantities, event or venue plan, destination, and timing so YIC can review a combined quotation, production schedule, and packing arrangement.' },
  'Inflatable Mechanical Games': { question: 'Which power details should I confirm for an inflatable mechanical game?', answer: 'Provide the destination voltage, frequency, plug type, and venue power arrangement so the equipment and electrical details can be checked for the requested model.' },
  'Inflatable Obstacle Course': { question: 'Can an obstacle course layout be adapted to my available site?', answer: 'YIC can review the usable footprint, height clearance, entry and exit direction, participant flow, and desired challenge sequence before confirming a suitable course layout.' },
  'Inflatable Slide': { question: 'What should I confirm about the slide landing area before ordering?', answer: 'Provide the available landing space, access and queue arrangement, intended dry or wet use, anchoring surface, and any water or drainage details for the proposed site.' },
  'Inflatable Tent': { question: 'What site details are needed to plan an inflatable tent installation?', answer: 'Share the surface, anchoring approach, footprint, access points, expected weather exposure, event duration, and local venue restrictions for the installation review.' },
  'Inflatable Theme Park': { question: 'Can a themed inflatable park be planned in phases?', answer: 'A project can be discussed around priority zones, future expansion, available site area, guest flow, installation timing, and a consistent theme and artwork brief.' },
  'Inflatable Water Park': { question: 'What information helps plan a floating water park layout?', answer: 'Share a water-area plan, depth information, access points, anchoring locations, target capacity, module preferences, operating season, and supervision arrangements.' },
};

export function categorySeoProfile(category: string): CategorySeoProfile {
  const profile = categorySeoProfiles[category] ?? {
    title: `Commercial ${category} | OEM Manufacturer | YIC`,
    description: `Commercial ${category.toLowerCase()} from YIC for rental businesses, venues, events, and global B2B buyers. OEM and custom production available.`,
    h1: `Commercial ${category} for Global B2B Buyers`,
    intro: `${categorySummary(category)} YIC supports commercial buyers with product selection, custom artwork, practical specifications, production coordination, and export quotation support.`,
    options: [category, `Custom ${category}`, `Commercial ${category} equipment`, `OEM ${category}`],
    buyers: [{ title: 'Rental and event businesses', text: `Select ${category.toLowerCase()} around your venue, customers, operating plan, and expected repeat use.` }, { title: 'Entertainment venues', text: `Match the format and dimensions to guest flow, supervision, access, and available space.` }, { title: 'Distributors', text: 'Build a differentiated product range with custom artwork, factory communication, and export support.' }],
    oem: `Send your preferred model, reference artwork, dimensions, quantity, destination, and intended use. YIC can review a custom ${category.toLowerCase()} OEM or ODM project.`,
    faq: [{ question: `How do I choose a commercial ${category.toLowerCase()}?`, answer: `Start with the venue, user group, footprint, access, operating plan, quantity, and destination-market requirements.` }, { question: `Can this ${category.toLowerCase()} be customized?`, answer: 'Yes. YIC can review size, colors, artwork, layout, branding, accessories, and packing requirements.' }, { question: 'What should I send for a factory quotation?', answer: 'Send the model, quantity, destination, application, preferred dimensions, artwork, and target delivery date.' }],
    related: categories.filter((item) => item.name !== category).slice(0, 3).map((item) => item.name),
  };
  const buyers = profile.buyers.length >= 4 ? profile.buyers : [...profile.buyers, { title: 'Project and wholesale buyers', text: `Plan commercial ${category.toLowerCase()} around repeat use, destination-market requirements, packing, and a clear factory quotation.` }];
  if (profile.faq.length >= 6 && buyers.length === profile.buyers.length) return profile;
  return {
    ...profile,
    buyers,
    faq: [...profile.faq, { question: `What material and construction details should I confirm for commercial ${category.toLowerCase()}?`, answer: `Confirm the product-specific material, reinforcement, seams, accessories, dimensions, intended use, and destination-market requirements with YIC before production.` }, { question: `How do I request a factory quotation for ${category.toLowerCase()}?`, answer: `Send the model or reference image, quantity, application, destination, preferred dimensions, artwork, and target delivery date so YIC can prepare a clear quotation.` }, categorySixthFaqs[category] ?? { question: `What delivery and operating details should I confirm for commercial ${category.toLowerCase()}?`, answer: `Confirm the destination, delivery timing, setup conditions, storage plan, operating environment, and any applicable local requirements with YIC before placing the order.` }],
  };
}

export function productDescription(product: Product) {
  const details = productDetailContent(product);
  const searchVariants = productKeywordVariants(product).slice(0, 4).join(', ');
  const intent = productIntentKeyword(product);
  const intentSentence = intent ? ` This listing is positioned for buyers searching for ${intent}.` : '';
  const name = productDisplayTitle(product);
  return `YIC Inflatable Sports manufactures commercial inflatables for ${details.primaryBuyer}. This listing features the “${name}” model. ${details.purpose} Custom artwork, colors, layout, and functional details can be developed around your venue, brand, and destination-market requirements.${intentSentence} Buyers researching this format may also compare terms such as ${searchVariants}.`;
}

function truncateMeta(value: string, maxLength: number, punctuation = '.') {
  if (value.length <= maxLength) return value;
  // Never leave a search snippet ending with a dangling connector such as
  // “and.” or “with.” after the word-boundary trim.
  const shortened = value.slice(0, maxLength - 1)
    .replace(/\s+\S*$/, '')
    .replace(/\s+(and|or|with|for|from|to|the|a|an|of|in)$/i, '')
    .replace(/[,:;\-–—]+$/, '')
    .trim();
  return `${shortened}${punctuation}`;
}

export function seoTitle(title: string, suffix = 'YIC') {
  // Search-result titles should end cleanly; a truncation period looks like
  // accidental copy and was appearing on a few long product titles.
  return truncateMeta(`${title} | ${suffix}`, 62, '');
}

function productIntentLabel(product: Product) {
  const labels: Record<string, string> = {
    'for-sale': 'For Sale',
    commercial: 'Commercial',
    rental: 'Rental',
    wholesale: 'Wholesale',
    custom: 'Custom',
    supplier: 'Supplier',
    factory: 'Factory',
    oem: 'OEM',
    odm: 'ODM',
  };
  const suffix = Object.keys(labels).find((intent) => product.productSlug.endsWith(`-${intent}`));
  return suffix === 'commercial' ? 'Commercial Grade' : suffix ? labels[suffix] : '';
}

function productIntentKeyword(product: Product) {
  const name = productDisplayTitle(product).toLowerCase();
  const rawIntent = ['commercial', 'for-sale', 'rental', 'wholesale', 'custom', 'supplier', 'factory', 'oem', 'odm']
    .find((intent) => product.productSlug.endsWith(`-${intent}`));
  if (!rawIntent) return '';
  const cleanName = name.replace(/^(commercial|custom|wholesale)\s+/i, '').trim();
  const forms: Record<string, string> = {
    commercial: `commercial-grade ${cleanName}`,
    'for-sale': `${cleanName} for sale`,
    rental: `${cleanName} rental`,
    wholesale: `wholesale ${cleanName}`,
    custom: `custom ${cleanName}`,
    supplier: `${cleanName} supplier`,
    factory: `${cleanName} factory`,
    oem: `${cleanName} OEM`,
    odm: `${cleanName} ODM`,
  };
  return forms[rawIntent] ?? '';
}

export function productSeoTitle(product: Product) {
  const name = productDisplayTitle(product);
  const intent = productIntentLabel(product);
  const categoryLabel = product.category.replace(/^Inflatable\s+/i, '');
  const suffix = intent || categoryLabel;
  const compactName = truncateMeta(name, 44, '');
  return seoTitle(`${compactName} | ${suffix}`);
}

export function productMetaDescription(product: Product) {
  const detail = productDetailContent(product);
  const variant = productIntentKeyword(product) || productKeywordVariants(product)[0] || `commercial ${product.category.toLowerCase()}`;
  const buyer = detail.primaryBuyer.split(',')[0];
  return truncateMeta(`YIC manufactures commercial inflatables for ${buyer}. Ask about the ${variant} model, OEM/ODM options, and factory pricing.`, 158);
}

export function productKeyFeatures(product: Product) {
  const detail = productDetailContent(product);
  const categoryFeatures: Record<string, string[]> = {
    'Advertising Inflatable': ['Large branded display area', 'Custom logo and campaign artwork', 'Designed for promotions and exhibitions', 'Export-ready packing for event teams'],
    'Bounce House': ['Recognizable jumping attraction', 'Commercial PVC and reinforced seams', 'Rental-friendly setup and storage planning', 'Custom colors, themes, and dimensions'],
    'Bounce House Combo': ['Bounce, slide, and play zones in one unit', 'Clear entry, exit, and supervision planning', 'Custom theme, artwork, and feature layout', 'Built for rental fleets and FEC programs'],
    'Bumper Ball': ['Durable bubble-soccer construction', 'Portable format for group activities', 'Custom colors and team branding', 'Accessory and repair-kit coordination'],
    'Inflatable Games': ['Simple, repeat-play game format', 'Visible activity station for events', 'Custom scoring, artwork, and layout', 'Commercial packing and accessory support'],
    'Inflatable Mechanical Games': ['High-energy operator-led attraction', 'Defined player and operator zones', 'Power and accessory planning support', 'Custom theme and branded graphics'],
    'Inflatable Obstacle Course': ['Start-to-finish group challenge', 'Modular obstacle and lane planning', 'Custom themes, length, and branding', 'Venue, throughput, and transport review'],
    'Inflatable Slide': ['High-visibility slide attraction', 'Dry or water-use configurations', 'Custom height, theme, and landing layout', 'Site, anchoring, and delivery planning'],
    'Inflatable Tent': ['Distinctive branded shelter space', 'Custom doors, windows, and interior layout', 'Artwork for exhibitions and activations', 'Anchoring, lighting, and packing coordination'],
    'Inflatable Theme Park': ['Immersive themed play environment', 'Multi-module guest-flow planning', 'Custom characters, colors, and footprint', 'Project-level production and installation support'],
    'Inflatable Water Park': ['Modular water-play attraction', 'Water depth and anchoring review', 'Custom modules, colors, and branding', 'Seasonal storage and delivery planning'],
  };
  return categoryFeatures[product.category] ?? [detail.purpose, ...detail.customization.slice(0, 3)];
}

export function productTargetBuyers(product: Product) {
  return productDetailContent(product).primaryBuyer.split(/, | and /i).map((item) => item.trim()).filter(Boolean);
}

export function productBatch(product: Product) {
  const position = productCategoryPosition(product);
  return Math.floor(Math.max(0, position) / 10) % 3;
}

const categoryKeywordVariants: Record<string, string[]> = {
  'Advertising Inflatable': ['custom branded inflatable', 'promotional inflatable', 'inflatable advertising display', 'commercial event display inflatable', 'branded inflatable display', 'inflatable display for events', 'custom logo inflatable'],
  'Bounce House': ['commercial bounce house', 'bouncy castle', 'jumping castle', 'commercial bouncy castle', 'bounce house for sale', 'bounce house rental', 'party rental bounce house'],
  'Bounce House Combo': ['bounce house combo', 'commercial bounce house combo', 'bouncy castle combo', 'bounce house with slide', 'combo bounce house for sale', 'bounce house combo rental', 'inflatable slide combo'],
  'Bumper Ball': ['commercial bumper balls', 'inflatable bumper ball', 'bubble soccer balls', 'bumper ball rental', 'bumper balls for sale', 'human bubble ball', 'zorb ball attraction'],
  'Inflatable Games': ['commercial inflatable games', 'interactive inflatable game', 'inflatable carnival games', 'inflatable sports game', 'inflatable game rental', 'inflatable game for sale', 'event inflatable game'],
  'Inflatable Mechanical Games': ['commercial mechanical game', 'mechanical bull rental', 'inflatable wipeout game', 'mechanical ride rental', 'operator-led inflatable attraction', 'commercial mechanical attraction'],
  'Inflatable Obstacle Course': ['commercial inflatable obstacle course', 'obstacle course rental', 'obstacle course for sale', 'inflatable fun run', 'ninja warrior inflatable', 'commercial obstacle course equipment', 'inflatable race course'],
  'Inflatable Slide': ['commercial inflatable slide', 'inflatable slide rental', 'inflatable slide for sale', 'dry inflatable slide', 'commercial water slide', 'party inflatable slide', 'themed inflatable slide'],
  'Inflatable Tent': ['commercial inflatable tent', 'branded inflatable tent', 'event inflatable tent', 'inflatable dome tent', 'exhibition inflatable tent', 'inflatable tent for sale', 'inflatable event shelter'],
  'Inflatable Theme Park': ['commercial inflatable theme park', 'inflatable playground', 'indoor inflatable park', 'adventure inflatable park', 'inflatable amusement park', 'commercial inflatable park', 'themed inflatable playground'],
  'Inflatable Water Park': ['commercial inflatable water park', 'floating water park', 'inflatable water playground', 'water obstacle course', 'commercial water park inflatables', 'floating inflatable obstacle course', 'water park equipment'],
};

export function productKeywordVariants(product: Product) {
  const name = productDisplayTitle(product);
  const lowerName = name.toLowerCase();
  const variants = [...(categoryKeywordVariants[product.category] ?? [])];
  const color = lowerName.match(/\b(white|pink|blue|red|yellow|black|purple|green|rainbow|pastel)\b/)?.[1];
  if (color && /bounce|bouncer|castle|jumping/.test(lowerName)) {
    variants.unshift(`${color} bounce house`, `${color} bouncy castle`, `${color} jumping castle`, `${color} bounce house for sale`, `${color} bounce house rental`);
  }
  if (/wedding/.test(lowerName)) variants.unshift('wedding bouncy house', 'wedding bounce house rental', 'white wedding bounce house');
  if (/tiki bar/.test(lowerName)) variants.unshift('inflatable tiki bar for sale', 'custom inflatable tiki bar', 'inflatable bar for events');
  if (/food truck/.test(lowerName)) variants.unshift('inflatable food truck', 'inflatable food truck display', 'food truck inflatable for events');
  if (/pool bar/.test(lowerName)) variants.unshift('inflatable pool bar', 'floating inflatable bar', 'custom pool bar inflatable');
  if (/panda/.test(lowerName)) variants.unshift('panda inflatable attraction', 'panda slide rental', 'themed panda inflatable');
  if (/pirate/.test(lowerName)) variants.unshift('pirate inflatable attraction', 'pirate slide rental', 'pirate themed inflatable');
  if (/dinosaur/.test(lowerName)) variants.unshift('dinosaur inflatable attraction', 'dinosaur bounce house rental', 'dinosaur themed inflatable');
  if (/water/.test(lowerName) && /slide|park|pool/.test(lowerName)) variants.unshift('inflatable water slide rental', 'commercial water attraction', 'water park inflatable equipment');
  const titleIntent = [`${lowerName} for sale`, `${lowerName} rental`, `custom ${lowerName}`];
  const intentKeyword = productIntentKeyword(product);
  return [...new Set([intentKeyword, ...variants, ...titleIntent, lowerName])].filter((value) => value.length > 2);
}

export function productDisplayTitle(product: Product) {
  let title = product.title.trim();
  title = title.replace(/^diameter.*?(?=inflatable\b)/i, '');
  title = title.replace(/^\d+(?:\.\d+)?mH(?:\s+\d+(?:\.\d+)?mm\s*PVC)?\s*/i, '');
  title = title.replace(/^\d+(?:\.\d+)?\s*dia\s*x.*?mH\s*/i, '');
  title = title.replace(/^\d+(?:\.\d+)?(?:[x×z]\d+(?:\.\d+)?m?){1,3}\s*/i, '');
  title = title.replace(/^\d+(?:\.\d+)?m(?:x\d+(?:\.\d+)?m){1,3}\s*/i, '');
  title = title.replace(/^(?:best|used|buy)\s+/i, '');
  title = title.replace(/\s+(?:for sale|for rent|rental|manufacturer)\b/gi, '');
  title = title.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g, ' ');
  return title ? title.charAt(0).toUpperCase() + title.slice(1) : product.title;
}

const productApplications: Record<string, string> = {
  'Advertising Inflatable': 'brand activations, promotions, and event displays',
  'Bounce House': 'party rental fleets, family events, and community venues',
  'Bounce House Combo': 'party rental fleets and family entertainment centers',
  'Bumper Ball': 'sports activities, team events, and rental operators',
  'Inflatable Games': 'carnivals, family entertainment centers, and team events',
  'Inflatable Mechanical Games': 'high-energy events and operator-led attractions',
  'Inflatable Obstacle Course': 'races, family entertainment centers, schools, and events',
  'Inflatable Slide': 'party rentals, family entertainment centers, and event venues',
  'Inflatable Tent': 'exhibitions, outdoor events, and branded activations',
  'Inflatable Theme Park': 'family entertainment centers, malls, parks, and attractions',
  'Inflatable Water Park': 'water parks, resorts, and seasonal recreation venues',
};

export function productApplication(product: Product) {
  return productApplications[product.category] ?? 'commercial rental, event, and entertainment venues';
}

type DetailTemplate = 'specification' | 'application' | 'custom-project';

type DetailContent = {
  template: DetailTemplate;
  productType: string;
  primaryBuyer: string;
  purpose: string;
  applications: Array<{ title: string; text: string }>;
  planningPoints: string[];
  customization: string[];
  operationNote: string;
  quoteItems: string[];
};

const categoryDetailProfiles: Record<string, Omit<DetailContent, 'template'>> = {
  'Advertising Inflatable': {
    productType: 'advertising inflatable and event display', primaryBuyer: 'brand activation teams, exhibitors, and event operators',
    purpose: 'It gives a campaign, launch, retail promotion, or public event a visible branded focal point.',
    applications: [{ title: 'Brand activations', text: 'Create a recognizable focal point for launches, sampling, and public-facing campaigns.' }, { title: 'Exhibitions', text: 'Use the structure to frame a booth, welcome area, or promotional interaction.' }, { title: 'Outdoor promotions', text: 'Plan artwork and access around the viewing distance, venue, and campaign flow.' }],
    planningPoints: ['Brand guidelines, logo files, and viewing direction', 'Event footprint, access points, and installation surface', 'Expected event duration and weather exposure'],
    customization: ['Printed logos, campaign artwork, and brand colors', 'Footprint, height, entrance, and display features', 'Lighting, accessories, packing, and branding details'],
    operationNote: 'Visibility, placement, entry flow, and weather conditions should be reviewed against the event plan.', quoteItems: ['Campaign artwork or logo files', 'Event location and installation footprint', 'Quantity, target date, and destination'],
  },
  'Bounce House': {
    productType: 'bounce house and bouncy castle', primaryBuyer: 'party rental businesses, family venues, and community event operators',
    purpose: 'It adds a familiar, high-demand jumping attraction to a commercial rental or family entertainment lineup.',
    applications: [{ title: 'Party rental fleets', text: 'Add a recognizable jumping attraction for birthdays, schools, and community events.' }, { title: 'Family venues', text: 'Match the footprint and visual theme to your guest age range and supervised play area.' }, { title: 'Seasonal events', text: 'Build a simple, easy-to-explain attraction into a festival or venue activity plan.' }],
    planningPoints: ['Available footprint, height clearance, and access route', 'Target age group, supervision, anchoring, and local rules', 'Theme, color palette, and rental-fleet positioning'],
    customization: ['Color combinations, banners, and printed artwork', 'Entrance layout, basketball features, and play details', 'Dimensions and commercial accessory package'],
    operationNote: 'Confirm the intended users, supervision plan, anchoring method, and local operating requirements before use.', quoteItems: ['Target age group and venue type', 'Preferred theme, colors, or logo', 'Destination city and required quantity'],
  },
  'Bounce House Combo': {
    productType: 'bounce house combo', primaryBuyer: 'party rental fleets and family entertainment centers',
    purpose: 'It combines jumping, sliding, and additional play features in one higher-value commercial attraction.',
    applications: [{ title: 'Rental packages', text: 'Offer more play variety from one unit for birthdays, events, and repeat rental customers.' }, { title: 'Family entertainment centers', text: 'Plan a clear entry, exit, slide, and supervision flow for a busy indoor or outdoor play area.' }, { title: 'Themed events', text: 'Use the visual theme and multiple play zones as a stronger guest draw.' }],
    planningPoints: ['Entry and exit flow around the bounce, slide, and game areas', 'Footprint, height clearance, supervision, and anchor points', 'Target age group and whether ball-pit or basketball options are required'],
    customization: ['Theme artwork, colors, characters, and printed logos', 'Slide, ball-pit, hoop, and obstacle layout', 'Overall size and accessory configuration'],
    operationNote: 'Confirm the play sequence, operating space, and supervision arrangement for every activity zone.', quoteItems: ['Required play features and target age group', 'Venue dimensions and indoor or outdoor use', 'Artwork reference, quantity, and delivery location'],
  },
  'Bumper Ball': {
    productType: 'bumper ball and bubble-soccer attraction', primaryBuyer: 'sports operators, schools, team-event organizers, and rental businesses',
    purpose: 'It creates an active, social game format for organized group play and supervised events.',
    applications: [{ title: 'Team activities', text: 'Create an energetic activity for schools, company events, and organized groups.' }, { title: 'Sports programs', text: 'Use an open, suitable playing surface with clear participant instructions and supervision.' }, { title: 'Rental events', text: 'Offer a portable game attraction for sports days, festivals, and party packages.' }],
    planningPoints: ['Playing area, surface condition, and participant flow', 'Participant age range, supervision, and session format', 'Storage, inflation, transport, and accessory requirements'],
    customization: ['Ball diameter and color options', 'Logo printing and team color combinations', 'Accessory, repair-kit, and packing requirements'],
    operationNote: 'Use a suitable playing surface and establish participant, supervision, and local safety procedures before operation.', quoteItems: ['Participant age range and intended game format', 'Required ball diameter and quantity', 'Venue surface, destination, and delivery timing'],
  },
  'Inflatable Games': {
    productType: 'interactive inflatable game', primaryBuyer: 'event operators, family entertainment centers, schools, and rental businesses',
    purpose: 'It adds a clear game challenge that can keep guests engaged at carnivals, team events, and entertainment venues.',
    applications: [{ title: 'Carnivals and festivals', text: 'Create a visible activity station with simple guest participation and clear queue flow.' }, { title: 'Team events', text: 'Configure the game format around groups, timed challenges, or friendly competition.' }, { title: 'FEC activity zones', text: 'Add a repeat-play attraction that complements a wider family entertainment offer.' }],
    planningPoints: ['Game rules, participant count, and activity duration', 'Floor space, queue space, power, and supervision', 'Prize, scoring, branding, or event-format requirements'],
    customization: ['Printed game panels, colors, and event branding', 'Scoring, targets, lanes, and activity features', 'Size, accessories, and operational layout'],
    operationNote: 'Confirm the participant flow, game rules, staffing, and site conditions for the selected format.', quoteItems: ['Expected participants and game format', 'Available activity space and event schedule', 'Branding requirements, quantity, and destination'],
  },
  'Inflatable Mechanical Games': {
    productType: 'operator-led mechanical game attraction', primaryBuyer: 'event companies, rental operators, and entertainment venues',
    purpose: 'It adds a high-energy, supervised challenge attraction for events and commercial entertainment programs.',
    applications: [{ title: 'Event entertainment', text: 'Create a headline challenge for festivals, corporate events, and public activations.' }, { title: 'Rental operations', text: 'Build an operator-led attraction into a managed event or party package.' }, { title: 'Entertainment venues', text: 'Use a memorable competitive format to support guest dwell time and repeat play.' }],
    planningPoints: ['Operator position, participant flow, and clear safety perimeter', 'Power, control, accessory, and transport requirements', 'Venue floor, ceiling clearance, and local operating rules'],
    customization: ['Color, theme, and branded graphic treatment', 'Mat, game feature, and operator-area configuration', 'Power, plug, accessory, and packing requirements'],
    operationNote: 'Confirm the operating area, supervision, power specification, participant rules, and site requirements before ordering.', quoteItems: ['Venue type and expected participant flow', 'Power voltage, plug type, and local requirements', 'Theme, quantity, destination, and delivery date'],
  },
  'Inflatable Obstacle Course': {
    productType: 'inflatable obstacle course', primaryBuyer: 'rental companies, schools, races, and family entertainment operators',
    purpose: 'It delivers a start-to-finish group challenge for races, school programs, events, and larger attraction plans.',
    applications: [{ title: 'Races and team events', text: 'Build a visible challenge route with clear starts, exits, and participant throughput.' }, { title: 'Schools and festivals', text: 'Create a group-play activity that can be planned around age range and supervision.' }, { title: 'Rental and FEC programs', text: 'Add a larger-format attraction that gives customers a strong reason to upgrade.' }],
    planningPoints: ['Total length, width, height clearance, and entry-exit direction', 'Participant flow, age range, supervision, and queue space', 'Whether the course is for racing, open play, indoor use, or outdoor events'],
    customization: ['Course length, challenge modules, and lane configuration', 'Colors, themes, logos, and start or finish branding', 'Accessories, packing, and transport requirements'],
    operationNote: 'The final course layout should be reviewed against site dimensions, participant throughput, supervision, and local rules.', quoteItems: ['Venue plan with usable dimensions and height', 'Race, school, rental, or FEC application', 'Preferred obstacles, theme, quantity, and destination'],
  },
  'Inflatable Slide': {
    productType: 'inflatable slide attraction', primaryBuyer: 'party rental businesses, event venues, and family entertainment centers',
    purpose: 'It gives a rental or venue lineup a visually strong slide attraction for parties, events, and seasonal play.',
    applications: [{ title: 'Party rentals', text: 'Add a themed slide that customers can quickly understand and book for celebrations.' }, { title: 'Event venues', text: 'Use a strong visual feature to anchor a supervised activity area at festivals and public events.' }, { title: 'FEC and seasonal play', text: 'Plan the height, landing zone, and guest flow for repeat operation.' }],
    planningPoints: ['Dry, wet, or mixed-use format and the required landing area', 'Overall height, roof or tree clearance, entry, and exit direction', 'Target age group, water connection if applicable, and supervision'],
    customization: ['Theme, color, characters, and printed branding', 'Slide height, lane count, pool, and landing layout', 'Water connection, accessories, and packing details'],
    operationNote: 'Confirm whether the product is intended for dry or water use and review the site, water, supervision, and local requirements.', quoteItems: ['Dry or water-use requirement and site dimensions', 'Preferred theme, slide height, and lane count', 'Target age group, quantity, and destination'],
  },
  'Inflatable Tent': {
    productType: 'inflatable tent and event shelter', primaryBuyer: 'exhibitors, event teams, outdoor operators, and brand activation agencies',
    purpose: 'It creates a distinctive enclosed or covered space for exhibitions, hospitality, outdoor events, and brand experiences.',
    applications: [{ title: 'Exhibitions', text: 'Create a visible branded space for product displays, meetings, or guest hospitality.' }, { title: 'Outdoor events', text: 'Plan access, shelter, lighting, and footprint around the event schedule and site conditions.' }, { title: 'Brand activations', text: 'Use the tent structure as a recognizable destination for customer engagement and campaign visibility.' }],
    planningPoints: ['Footprint, access points, interior use, and installation surface', 'Branding, lighting, weather exposure, and event duration', 'Transport, anchoring, power, and local venue requirements'],
    customization: ['Exterior artwork, colors, logos, and interior branding', 'Doors, windows, tunnels, lighting, and layout details', 'Dimensions, materials, anchoring, and packing configuration'],
    operationNote: 'Review the event footprint, weather conditions, access, anchoring, and venue requirements before finalizing the structure.', quoteItems: ['Venue plan, access requirements, and expected occupancy', 'Branding files, interior use, and event duration', 'Quantity, destination, and required installation date'],
  },
  'Inflatable Theme Park': {
    productType: 'themed inflatable play attraction', primaryBuyer: 'parks, malls, family entertainment centers, and project operators',
    purpose: 'It creates an immersive themed play zone for larger venue projects, attractions, and destination entertainment.',
    applications: [{ title: 'Family entertainment centers', text: 'Plan an immersive activity zone around guest circulation, staffing, and repeat play.' }, { title: 'Malls and parks', text: 'Use a recognizable themed attraction to create a seasonal or permanent visitor destination.' }, { title: 'Project installations', text: 'Coordinate theme artwork, footprint, capacity planning, and site access from the start.' }],
    planningPoints: ['Venue plan, height limits, entry-exit flow, and visitor capacity', 'Indoor or outdoor operation, seasonality, and installation schedule', 'Theme artwork, surrounding attractions, staffing, and local requirements'],
    customization: ['Theme design, characters, colors, and branded visual elements', 'Play modules, footprint, access, and guest-flow configuration', 'Installation details, packing, accessories, and project support'],
    operationNote: 'A themed project should be reviewed against venue planning, visitor flow, installation conditions, staffing, and destination-market requirements.', quoteItems: ['Venue plan, ceiling height, and target visitor capacity', 'Theme brief, renderings, or reference images', 'Project timing, destination, and operating model'],
  },
  'Inflatable Water Park': {
    productType: 'inflatable water attraction', primaryBuyer: 'resorts, water venues, recreation operators, and seasonal rental businesses',
    purpose: 'It helps water venues create an active guest experience through a visible, commercial water-play attraction.',
    applications: [{ title: 'Resorts and recreation venues', text: 'Create a family water-play feature that supports longer stays and seasonal activity.' }, { title: 'Water parks', text: 'Plan the attraction around water depth, access, anchoring, capacity, and operational supervision.' }, { title: 'Seasonal programs', text: 'Use a transportable water attraction for lakes, pools, events, and temporary recreation sites.' }],
    planningPoints: ['Water area, depth, water conditions, access, and anchoring plan', 'Expected capacity, lifeguard or supervision plan, and local rules', 'Seasonal schedule, transport, maintenance, and storage requirements'],
    customization: ['Module combination, colors, logo, and branded water-play details', 'Size, access, slide, pool, and connection configuration', 'Anchoring, accessories, packing, and operational requirements'],
    operationNote: 'Water depth, anchoring, access, supervision, water conditions, and local operating requirements must be confirmed for every installation.', quoteItems: ['Water area, depth, and site photos or plan', 'Expected capacity, operating season, and anchoring conditions', 'Module requirements, destination, and target delivery date'],
  },
};

function productCategoryPosition(product: Product) {
  return rawProducts.filter((item) => item.categorySlug === product.categorySlug).findIndex((item) => item.slug === product.slug);
}

export function productDetailContent(product: Product): DetailContent {
  const profile = categoryDetailProfiles[product.category] ?? {
    productType: product.category.toLowerCase(), primaryBuyer: 'commercial buyers', purpose: `It supports ${productApplication(product)}.`, applications: [], planningPoints: [], customization: [], operationNote: 'Confirm site and operating requirements before production.', quoteItems: [],
  };
  const position = productCategoryPosition(product);
  const templateIndex = Math.max(0, position) % 30;
  const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
  return { ...profile, template };
}

export function productSeoKeywords(product: Product) {
  const content = productDetailContent(product);
  const name = productDisplayTitle(product);
  const core = [name, `${name} for ${content.primaryBuyer}`, ...productKeywordVariants(product), `${product.category} manufacturer`, `commercial ${product.category.toLowerCase()}`, ...content.applications.map((item) => item.title), content.primaryBuyer, 'custom inflatable manufacturer', 'OEM inflatable', 'ODM inflatable', 'YIC Inflatable Sports'];
  return [...new Set(core)].join(', ');
}

export function productCategoryTemplate(product: Product) {
  const index = categories.findIndex((category) => category.slug === product.categorySlug);
  return Math.max(0, index);
}

function cardNameVariant(product: Product) {
  const name = productDisplayTitle(product);
  if (/^Inflatable\s+/i.test(name)) {
    const rest = name.replace(/^Inflatable\s+/i, '').trim();
    return `The ${rest.charAt(0).toLowerCase()}${rest.slice(1)}`;
  }
  return name;
}

function cardVariantIndex(product: Product, count: number) {
  const value = [...product.slug].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return value % count;
}

export function productCardDescription(product: Product) {
  const name = cardNameVariant(product);
  const lowerName = name.replace(/^The /, 'the ');
  const application = productApplication(product);
  const reference = product.dimensions ? `Reference size: ${product.dimensions.trim()}.` : 'Custom dimensions available.';
  const searchable = `${product.title} ${product.sourceName}`.toLowerCase();
  const detectedFeatures: string[] = [];
  const addFeature = (pattern: RegExp, label: string) => { if (pattern.test(searchable) && !detectedFeatures.includes(label)) detectedFeatures.push(label); };
  addFeature(/double slide|dual lane|double lane/, 'dual-lane slide');
  addFeature(/water slide|pool slide|with pool/, 'water-slide or pool layout');
  addFeature(/slide/, 'integrated slide');
  addFeature(/ball pit/, 'ball pit');
  addFeature(/basketball|hoop/, 'basketball hoop');
  addFeature(/obstacle/, 'obstacle-play section');
  addFeature(/climb/, 'climbing feature');
  addFeature(/white|wedding|luxury/, 'neutral event styling');
  addFeature(/small|backyard|compact/, 'compact footprint');
  addFeature(/dinosaur|spider|super mario|mario|princess|dragon|lion|monkey|unicorn|hulk|minion|frozen|barbie|beach|tropical|panda|pirate|mermaid|safari|shark|jungle|race car|construction|medieval|aloha|butterfly|teddy/, 'themed artwork');
  const featureText = detectedFeatures.slice(0, 3).join(', ');
  if (featureText) {
    const buyer = product.category === 'Bounce House Combo' ? 'party rental and FEC buyers' : application;
    return `${name} features ${featureText} for ${buyer}. ${reference}`;
  }
  const variants: Record<string, string[]> = {
    'Advertising Inflatable': [
      `This display gives brand activations and event teams a high-visibility focal point.`,
      `Use ${lowerName} to create a memorable branded space for promotions and public events.`,
      `This display format suits exhibitions, launches, and outdoor campaigns.`,
    ],
    'Bounce House': [
      `This bouncy castle format is a dependable option for ${application}.`,
      `This jump house brings a simple, recognizable play attraction to ${application}.`,
      `This model suits rental operators building a varied bounce attraction lineup.`,
    ],
    'Bounce House Combo': [
      `This model combines bounce-and-slide play for ${application}.`,
      `This combo attraction adds more than one play zone to a rental or FEC lineup.`,
      `The multi-play format gives venues another way to create a stronger guest draw.`,
    ],
    'Bumper Ball': [
      `This bubble-soccer attraction is designed for ${application}.`,
      `Use ${lowerName} for active group play, team events, and supervised rental sessions.`,
      `This product format adds a playful contact-sport activity indoors or outdoors.`,
    ],
    'Inflatable Games': [
      `This interactive game attraction suits ${application}.`,
      `This game format gives event and FEC operators another way to build repeat play.`,
      `Operators can use this activity station for team events, carnivals, and rentals.`,
    ],
    'Inflatable Mechanical Games': [
      `This operator-led attraction brings high-energy play to ${application}.`,
      `This operator-led game gives busy venues a memorable challenge format.`,
      `The format adds a competitive entertainment feature to events and attraction programs.`,
    ],
    'Inflatable Obstacle Course': [
      `This obstacle-course attraction is designed for ${application}.`,
      `This race-ready inflatable creates a clear start-to-finish activity for group events.`,
      `The course format gives rental and FEC operators a larger challenge attraction.`,
    ],
    'Inflatable Slide': [
      `This themed slide attraction is designed for ${application}.`,
      `The design adds a colorful slide feature to a party rental or entertainment lineup.`,
      `Use ${lowerName} as a standout slide attraction for events, FECs, and seasonal rentals.`,
    ],
    'Inflatable Tent': [
      `This design creates a branded shelter or event space for ${application}.`,
      `Use ${lowerName} as a distinctive pop-up venue for exhibitions and outdoor activations.`,
      `The enclosed structure gives event teams practical space with strong visual presence.`,
    ],
    'Inflatable Theme Park': [
      `This themed play attraction suits ${application}.`,
      `This larger-format inflatable helps venues build an immersive play zone for visitors.`,
      `The attraction adds a recognizable theme and multiple play possibilities to a venue plan.`,
    ],
    'Inflatable Water Park': [
      `This floating water attraction is intended for ${application}.`,
      `This water-play format helps resorts and parks create an active guest experience.`,
      `The modular format adds water-play options to a seasonal or permanent recreation program.`,
    ],
  };
  const choices = variants[product.category] ?? [`This model is made for ${application}.`];
  return `${choices[cardVariantIndex(product, choices.length)]} ${reference}`;
}

export function productCardLabel(product: Product) {
  const materialMatch = product.material.match(/\d+(?:\.\d+)?mm/i);
  const material = materialMatch ? `${materialMatch[0]} PVC` : /TPU/i.test(product.material) ? 'Commercial TPU' : product.material;
  const categoryLabels: Record<string, string[]> = {
    'Advertising Inflatable': ['Custom logo & artwork', 'Event display format', 'Brand activation use'],
    'Bounce House': ['Rental fleet format', 'Theme & color options', 'Supervised jump play'],
    'Bounce House Combo': ['Bounce + slide play', 'Multi-feature layout', 'Rental & FEC use'],
    'Bumper Ball': ['Team play & events', 'Group activity format', 'Portable game setup'],
    'Inflatable Games': ['Interactive group play', 'Event game station', 'Repeat-play format'],
    'Inflatable Mechanical Games': ['Operator-led attraction', 'Power & site planning', 'Competitive game format'],
    'Inflatable Obstacle Course': ['Group challenge layout', 'Course & lane options', 'Race-ready activity'],
    'Inflatable Slide': ['Themed slide attraction', 'Dry or wet-use planning', 'Landing-zone options'],
    'Inflatable Tent': ['Branded event space', 'Custom access & layout', 'Exhibition use'],
    'Inflatable Theme Park': ['Multi-play venue project', 'Themed attraction layout', 'Guest-flow planning'],
    'Inflatable Water Park': ['Floating water play', 'Modular water attraction', 'Anchoring & site planning'],
  };
  const labels = categoryLabels[product.category] ?? ['Custom OEM/ODM'];
  return `${material} · ${labels[cardVariantIndex(product, labels.length)]}`;
}

export function productFaqs(product: Product) {
  const name = productDisplayTitle(product);
  const content = productDetailContent(product);
  const dimensions = product.dimensions ? `The listed reference size is ${product.dimensions.trim()}.` : 'No fixed reference size is listed for this model.';
  const applicationNames = content.applications.map((item) => item.title.toLowerCase()).join(', ') || productApplication(product);
  const planning = content.planningPoints.join('; ').toLowerCase();
  const customization = content.customization.join('; ').toLowerCase();
  const categoryQuestions: Record<string, Array<{ question: string; answer: string }>> = {
    'Advertising Inflatable': [
      { question: `What is the main use of the ${name} model?`, answer: `This model is intended for brand activations, exhibitions, launches, retail promotions, and outdoor event displays where a large branded focal point is needed.` },
      { question: `Can the display carry my logo and campaign artwork?`, answer: `Yes. YIC can review logo files, brand colors, viewing direction, printed artwork, and the required display footprint before production.` },
      { question: `How should an advertising inflatable be planned for an event site?`, answer: `Confirm the event footprint, access route, installation surface, viewing distance, expected weather exposure, and operating dates before finalizing the structure.` },
      { question: `Can YIC manufacture a custom version of this promotional inflatable?`, answer: `Yes. Custom size, shape, entrance or display features, lighting, accessories, and branded artwork can be reviewed through an OEM or ODM project brief.` },
    ],
    'Bounce House': [
      { question: `Is this bounce house suitable for a party rental fleet?`, answer: `It is planned for party rental businesses, family venues, and supervised community events. Confirm the age range, site rules, anchoring, and local requirements before operation.` },
      { question: `What space and clearance should I allow for a bounce house?`, answer: `Allow the product footprint plus safe access, anchoring, blower placement, participant flow, and the required height clearance. A site plan helps YIC confirm the configuration.` },
      { question: `Can the jumping castle be customized with a theme or logo?`, answer: `Yes. Colors, banners, characters, artwork, entrance details, overall dimensions, and commercial accessories can be discussed before artwork approval.` },
      { question: `What maintenance details matter for repeated rental use?`, answer: `Plan dry storage, cleaning, seam and anchor checks, blower care, repair-kit availability, and a documented setup and inspection routine for each rental.` },
    ],
    'Bounce House Combo': [
      { question: `What play features can a bounce house combo include?`, answer: `Depending on the model, the layout can include a bounce area, slide, ball pit, basketball hoop, climbing feature, or other supervised play zones.` },
      { question: `How do I plan the entry, exit, and supervision flow?`, answer: `Review the bounce area, slide landing, queue space, anchor points, height clearance, and staff position together so the final layout suits your venue and age group.` },
      { question: `Can the combo be made in a custom theme and size?`, answer: `Yes. YIC can adjust artwork, colors, characters, feature arrangement, overall dimensions, and selected accessories for a rental or FEC project.` },
      { question: `Is a combo attraction a good fit for a rental fleet?`, answer: `The multi-play format can offer more activity variety from one unit. Confirm transport, setup crew, storage, target age group, and expected booking format before ordering.` },
    ],
    'Bumper Ball': [
      { question: `Who typically buys commercial bumper balls?`, answer: `Typical buyers include sports operators, schools, team-event organizers, family venues, and rental businesses running supervised group activities.` },
      { question: `What playing surface is recommended for bubble soccer?`, answer: `Use a suitable, clear playing surface and define participant rules, supervision, session size, and local operating requirements before use.` },
      { question: `Can bumper balls be made in team colors with a logo?`, answer: `Yes. Ball diameter, colors, printed logos, team combinations, accessories, and packing requirements can be reviewed for the intended program.` },
      { question: `How should bumper balls be transported and stored?`, answer: `Confirm the packed quantity, carrying method, inflation equipment, repair kit, cleaning routine, and dry storage conditions for repeat sessions.` },
    ],
    'Inflatable Games': [
      { question: `What types of events use interactive inflatable games?`, answer: `Interactive games can support carnivals, festivals, team-building events, school programs, FEC activity zones, and party rental packages.` },
      { question: `How do I plan queues and staffing for an inflatable game?`, answer: `Confirm the participant count, game rules, activity duration, queue area, power or blower needs, operator position, and supervision plan.` },
      { question: `Can the game artwork and scoring layout be customized?`, answer: `Yes. Printed game panels, colors, event branding, targets, lanes, scoring, size, and accessories can be developed around the event format.` },
      { question: `What helps an inflatable game perform well commercially?`, answer: `A simple game rule, visible branding, repeat-play potential, efficient queue flow, durable construction, and a practical packing and repair plan all support repeat operation.` },
    ],
    'Inflatable Mechanical Games': [
      { question: `What site requirements should I confirm for a mechanical game?`, answer: `Confirm the operating footprint, clear safety perimeter, ceiling height, power voltage and plug type, operator position, access route, and local operating rules.` },
      { question: `Does this attraction require an operator?`, answer: `Operator-led attractions should be planned with a trained operator position, participant rules, supervision, power controls, and a clear activity boundary.` },
      { question: `Can the mechanical game be branded for an event or venue?`, answer: `Yes. Theme, color, branded graphics, mat treatment, operator-area details, accessories, and packing requirements can be specified for the project.` },
      { question: `What should I include in a quotation request?`, answer: `Send the venue type, expected participant flow, power requirements, destination, quantity, theme, access conditions, and target delivery date.` },
    ],
    'Inflatable Obstacle Course': [
      { question: `How do I choose the right obstacle course length and layout?`, answer: `Start with the usable site dimensions, height clearance, entry and exit direction, participant age, desired throughput, and whether the format is racing or open play.` },
      { question: `Can the obstacle modules and lanes be customized?`, answer: `Yes. Course length, challenge modules, lane configuration, start and finish branding, themes, colors, and accessories can be adjusted.` },
      { question: `Which businesses use commercial obstacle courses?`, answer: `Rental companies, schools, races, FECs, festivals, and team-event operators commonly use obstacle courses for group challenges.` },
      { question: `What should be checked before installation?`, answer: `Review the unloading route, setup crew, anchor points, usable length, supervision plan, queue space, storage area, and local operating requirements.` },
    ],
    'Inflatable Slide': [
      { question: `Is this inflatable slide for dry use or water use?`, answer: `Confirm whether the model is intended for dry, wet, or mixed use. Water connections, landing area, drainage, anchoring, and supervision must match the selected configuration.` },
      { question: `What site measurements are important for a commercial slide?`, answer: `Provide the usable footprint, total height, roof or tree clearance, access route, landing zone, queue area, and any water connection details.` },
      { question: `Can the slide be customized with a theme or logo?`, answer: `Yes. Theme, colors, characters, printed branding, slide height, lane count, pool or landing layout, and accessories can be reviewed.` },
      { question: `Who buys commercial inflatable slides?`, answer: `Party rental businesses, FECs, event venues, resorts, and seasonal recreation operators use slides as high-visibility attractions.` },
    ],
    'Inflatable Tent': [
      { question: `What can an inflatable tent be used for?`, answer: `Inflatable tents can create branded spaces for exhibitions, hospitality, outdoor events, product displays, and marketing activations.` },
      { question: `Can the tent include custom doors, windows, or tunnels?`, answer: `Yes. Exterior artwork, logos, doors, windows, tunnels, lighting, interior layout, dimensions, and anchoring details can be specified.` },
      { question: `How should an event shelter be planned for weather and access?`, answer: `Confirm the installation surface, anchoring method, access points, weather exposure, event duration, transport route, and venue requirements before production.` },
      { question: `What information does YIC need for a custom tent quote?`, answer: `Send the venue plan, expected occupancy, interior use, branding files, event dates, quantity, destination, and required installation details.` },
    ],
    'Inflatable Theme Park': [
      { question: `What venues are suitable for a themed inflatable park?`, answer: `Themed inflatable attractions can be planned for FECs, malls, parks, seasonal destinations, and larger project installations.` },
      { question: `Can the theme park layout be developed around a venue plan?`, answer: `Yes. Share the venue plan, height limits, entry and exit flow, visitor capacity, surrounding attractions, and installation schedule for a project review.` },
      { question: `What can be customized in a themed attraction?`, answer: `Theme design, characters, colors, branded visuals, play modules, access points, footprint, guest-flow configuration, and installation details can be customized.` },
      { question: `How are large themed inflatable projects delivered?`, answer: `Project delivery is planned around packed volume, access route, staged installation, staffing, inspection, accessories, storage, and the target opening date.` },
    ],
    'Inflatable Water Park': [
      { question: `Where can an inflatable water park be installed?`, answer: `Water attractions can be planned for resorts, water parks, lakes, pools, recreation venues, and seasonal rental programs after site conditions are confirmed.` },
      { question: `What water and anchoring details must be confirmed?`, answer: `Provide water area, depth, conditions, access, anchoring method, expected capacity, supervision, local rules, and seasonal operating schedule.` },
      { question: `Can water-park modules and colors be customized?`, answer: `Yes. Module combinations, size, access, slides, pools, colors, logos, branded details, anchoring, and accessories can be reviewed.` },
      { question: `How should a floating attraction be stored and maintained?`, answer: `Plan inspection, cleaning, drying, repair-kit access, seasonal removal, packed storage, transport, and a documented maintenance routine before shipment.` },
    ],
  };
  const categoryFaq = categoryQuestions[product.category] ?? [
    { question: `What business setting is best suited to the ${name} model?`, answer: `This model is planned for ${applicationNames}. Share your venue type, guest profile, available space, operating schedule, and supervision plan so the configuration matches the application.` },
    { question: `Can ${name} be developed around my own project brief?`, answer: `Yes. YIC can review your reference images, theme, preferred dimensions, functional changes, and brand files. The production discussion can cover ${customization}.` },
    { question: `Which specifications should I confirm before ordering?`, answer: `${dimensions} Confirm the final footprint, material specification, intended application, accessories, packing information, and destination-market requirements with YIC.` },
    { question: `How should I plan this product for repeated commercial use?`, answer: `Review the site, supervision, storage, cleaning, inspection, transport, and local operating requirements before finalizing the production brief.` },
  ];
  const deliveryFaqs: Record<string, { question: string; answer: string }> = {
    'Advertising Inflatable': { question: `How should ${name} be packed and prepared for an event?`, answer: `Confirm the event date, packed volume, access route, installation surface, artwork approval, and weather exposure. YIC can review the packing and accessory list around the campaign schedule and destination.` },
    'Bounce House': { question: `What setup and storage details matter for ${name}?`, answer: `Plan the blower and anchor points, access route, dry storage, cleaning routine, and setup time for your rental team. The final accessory and packing list should be confirmed with the quotation.` },
    'Bounce House Combo': { question: `How should ${name} be delivered and installed at a busy venue?`, answer: `Confirm the packed size, setup route, blower points, anchor plan, activity-zone supervision, and storage space. YIC can align the accessory and packing details with your venue and delivery schedule.` },
    'Bumper Ball': { question: `What transport and maintenance plan is needed for ${name}?`, answer: `Confirm the packed quantity, carrying method, inflation equipment, repair kit, cleaning routine, and dry storage. These details help a rental or sports operator plan repeat sessions efficiently.` },
    'Inflatable Games': { question: `How can ${name} be prepared for repeated event operation?`, answer: `Confirm the game rules, staffing, power or blower needs, queue layout, packed volume, repair kit, and cleaning plan. YIC can review accessories and packing for your event schedule.` },
    'Inflatable Mechanical Games': { question: `What delivery and power details should I confirm for ${name}?`, answer: `Provide the destination voltage, plug type, access route, floor area, operator position, packed dimensions, and target installation date. The quotation can then confirm the equipment and accessory list.` },
    'Inflatable Obstacle Course': { question: `How do I plan transport and setup for ${name}?`, answer: `Confirm the packed volume, unloading route, setup crew, anchor points, usable length, and storage area. A venue plan helps YIC review the practical delivery and installation sequence.` },
    'Inflatable Slide': { question: `What delivery and installation details are important for ${name}?`, answer: `Confirm dry or water use, access route, blower or water connections, landing area, anchoring, setup crew, packed volume, and target date. The final accessory and packing list should match the site plan.` },
    'Inflatable Tent': { question: `How should ${name} be shipped and installed for an event?`, answer: `Share the venue access, installation surface, anchoring method, event date, weather exposure, packed-volume limits, and branding approval status. YIC can coordinate the structure and accessory details around the schedule.` },
    'Inflatable Theme Park': { question: `What project delivery information is needed for ${name}?`, answer: `Provide the venue plan, access route, installation window, packed-volume limits, staffing plan, and target opening date. A project quotation can then address production, inspection, packing, and staged delivery requirements.` },
    'Inflatable Water Park': { question: `What installation and maintenance details should I confirm for ${name}?`, answer: `Confirm the water access, anchoring method, depth, unloading route, seasonal schedule, storage plan, inspection routine, and local operating requirements. These details are essential before shipment and installation.` },
  };
  const deliveryFaq = deliveryFaqs[product.category] ?? { question: `What delivery details should I confirm for ${name}?`, answer: `Confirm the destination, access route, packed volume, setup plan, storage conditions, target date, and applicable local requirements before shipment.` };
  const featuredApplication = content.applications[cardVariantIndex(product, content.applications.length)] ?? content.applications[0];
  const productSpecificFaqs = [
    {
      question: [
        `Would ${name} suit ${featuredApplication?.title.toLowerCase() || 'my venue'}?`,
        `How can ${name} fit a ${featuredApplication?.title.toLowerCase() || 'commercial'} program?`,
        `Is ${name} a practical choice for ${featuredApplication?.title.toLowerCase() || 'my business'}?`,
      ][productBatch(product)],
      answer: `${featuredApplication?.text ?? content.purpose} ${dimensions} Confirm the space, customer profile, and operating plan before selecting the final configuration.`,
    },
    {
      question: [
        `Which custom options are available for ${name}?`,
        `Can YIC adapt ${name} to my artwork and operating needs?`,
        `How can ${name} be customized for my market?`,
      ][productBatch(product)],
      answer: `YIC can review ${content.customization.join('; ').toLowerCase()}. Share your reference images, preferred dimensions, branding, quantity, and destination so the proposed specification fits your project.`,
    },
    {
      question: [
        `What site details should I confirm before ordering ${name}?`,
        `Which operating requirements affect the setup of ${name}?`,
        `How should I plan the space and operation for ${name}?`,
      ][productBatch(product)],
      answer: `${content.planningPoints.join('; ')}. ${content.operationNote} Confirm final dimensions and local operating requirements with the supplier before purchase.`,
    },
  ];
  return [
    { question: `Which material is specified for the ${name} model?`, answer: `The listed material is ${product.material}. Confirm the final material, reinforcement, seam treatment, and component details for this model against your application, size, and destination market before production.` },
    ...productSpecificFaqs,
    { question: `What should I send for a quote and pre-shipment confirmation for ${name}?`, answer: `Send the model name, estimated quantity, destination country and city, intended use, target delivery date, and these project details: ${content.quoteItems.join('; ').toLowerCase()}. Before shipment, YIC can confirm the approved specification, production checks, inflation or appearance inspection where applicable, packing details, accessories, and applicable product or destination-market documents.` },
    deliveryFaq,
  ];
}

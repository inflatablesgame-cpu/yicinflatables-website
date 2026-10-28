import catalogData from './catalog.json' with { type: 'json' };

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
export const products = rawProducts.map((product) => /bubble tent with balloons/i.test(product.sourceName)
  ? { ...product, images: product.images.map((image) => image.replace(bubbleTentSource, bubbleTentSafe)) }
  : product);

export function publicCategorySlug(slug: string) {
  return slug === 'bounce-house-combo' ? 'bounce-house-combos' : slug;
}

export function categoryPath(category: Pick<Category, 'slug'> | string) {
  const slug = typeof category === 'string' ? category : category.slug;
  return `/products/${publicCategorySlug(slug)}/`;
}

export function productPath(product: Pick<Product, 'categorySlug' | 'productSlug'>) {
  return `${categoryPath(product.categorySlug)}${product.productSlug}/`;
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
  return categories.find((category) => category.slug === slug || publicCategorySlug(category.slug) === slug);
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
  'Inflatable Water Slide': 'Commercial inflatable water slides for party rentals, resorts, water parks, events, and seasonal recreation venues.',
};

export function categorySummary(category: string) {
  return categorySummaries[category] ?? `Commercial ${category.toLowerCase()} for party rental and event businesses.`;
}

export type CategorySeoProfile = {
  title: string;
  description: string;
  keywords?: string;
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
    'Floating aqua parks for lakes and resorts': 'A floating aqua park or floating water park combines connected modules into a visible destination attraction for lakes, resorts, and managed recreation venues. Confirm depth, shore access, anchoring, guest capacity, and supervision before finalizing the module plan.',
    'Commercial inflatable water parks on water': 'A commercial inflatable water park on water can be arranged around slides, climbing, balance, jump, and rest modules. The final layout should match the water area, operating model, local requirements, and approved installation specification.',
    'Inflatable water park slides and challenge modules': 'Inflatable water park slides, water-play connections, and challenge modules let operators build a higher-energy route. Plan entry, exit, circulation, queueing, staff positions, water depth, and compatible modules for the intended audience.',
    'Custom lake, pool, beach, and destination water-park layouts': 'A lake inflatable water park, inflatable water park pool, beach inflatable water park, or destination project can be engineered around the available water site, modules, branding, anchoring, transport, seasonal storage, and operating procedures.',
  },
  'Inflatable Water Slide': {
    'Commercial single-lane water slides': 'A focused wet-use attraction for resorts, pool venues, seasonal rentals, and supervised family recreation.',
    'Multi-lane racing water slides': 'Parallel lanes create a clear race format for higher-throughput water parks, events, and competitive play.',
    'Themed water slides with pools': 'Color, artwork, splash pools, and character styling turn a water slide into a stronger destination attraction.',
    'Custom water-slide layouts for venues': 'Height, lane count, landing, pool, access, and anchoring can be planned around the available water site.',
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
    { title: 'Survey the water site', text: 'For an inflatable water park on water, a lake inflatable water park, or a floating aqua park, confirm water area, verified depth, conditions, shore or dock access, anchoring locations, weather exposure, and operating season.' },
    { title: 'Plan capacity and flow', text: 'Define guest numbers, entry and exit, module circulation, rescue planning, supervision, age groups, spectator separation, and how the floating water park will be controlled during busy sessions.' },
    { title: 'Choose the module mix', text: 'Build a commercial inflatable water park with water park slides, climbing, balancing, jumping, resting, and obstacle modules. Select compatible connections and a route that fits the intended audience and water site.' },
    { title: 'Prepare seasonal handling', text: 'Plan installation, inspection, cleaning, drying, repair, removal, packing, transport, and storage. These details affect both inflatable water park price and whether a project can operate efficiently across seasons.' },
  ],
  'Inflatable Water Slide': [
    { title: 'Confirm wet-use conditions', text: 'Share water depth, supply, drainage, surface, access, and the planned landing or splash-pool area before selecting a model.' },
    { title: 'Choose the slide format', text: 'Compare single-lane, dual-lane, triple-lane, themed, pool, and dry-or-wet configurations around your guest flow.' },
    { title: 'Plan safety and supervision', text: 'Allow queue space, slide landing, operator visibility, anchoring, height clearance, and local venue operating procedures.' },
    { title: 'Prepare seasonal operation', text: 'Review cleaning, drying, inspection, repair, packing, transport, storage, and target opening dates for repeat use.' },
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
  'Inflatable Water Slide': ['Slide height, lane count, landing, pool, and water-flow layout', 'Theme, colors, printed artwork, and logo placement', 'Anchoring, access, queue, supervision, and drainage planning', 'Blower, pump, repair kit, carry bag, packing, and destination requirements'],
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
    title: 'Inflatable Pool Bars, Mascots & Event Displays | YIC',
    description: 'Commercial inflatable poolside bars, tiki bars, food trucks, event mascots, team tunnels, air dancers, and branded displays. OEM factory supply from YIC.',
    keywords: 'inflatable pool bar, blow up pool bar, inflatable pool tiki bar, inflatable tiki bar, inflatable cocktail bar, inflatable dog mascot, inflatable cat mascot manufacturer, football team spirit inflatable tunnel, inflatable air dancer, inflatable food truck',
    h1: 'Inflatable Pool Bars, Mascots & Brand Activation Displays',
    intro: 'YIC manufactures commercial advertising inflatables for exhibitions, retail promotions, resort events, product launches, sampling, and hospitality activations. The range includes poolside inflatable bars, tiki and cocktail counters, food trucks, concession stands, kiosks, air dancers, custom mascots, and sports-team entry tunnels. Confirm your artwork, functional layout, footprint, intended workflow, material, and installation plan with the factory before production.',
    options: ['Poolside inflatable bars, tiki bars, and cocktail counters', 'Inflatable food trucks, concession stands, and kiosk booths', 'Event mascots, team tunnels, air dancers, and promotional displays', 'Custom logo and campaign structures'],
    buyers: [{ title: 'Event and activation agencies', text: 'Create a high-visibility hospitality, sampling, retail, or branded interaction point with customer flow planned around the event footprint.' }, { title: 'Resort, food, and beverage brands', text: 'Develop recognizable tiki bars, cocktail counters, food trucks, kiosks, or air dancers for promotions, launches, seasonal events, and campaign tours.' }, { title: 'Rental and venue operators', text: 'Add visible themed bars, service counters, and promotional structures to festivals, mall events, pool parties, hospitality zones, and repeat rental packages.' }],
    oem: 'Send a logo, product theme, reference image, dimensions, functional brief, intended event use, quantity, and destination. YIC can support 3D layout, printed artwork, custom shapes, accessories, production inspection, and export packing for a campaign-ready advertising inflatable.',
    faq: [{ question: 'Can YIC make an inflatable food truck or concession stand in our brand theme?', answer: 'Yes. YIC can review a reference image or concept and develop the vehicle-style outline, dimensions, colors, printed artwork, roof sign, service opening, display areas, and accessories for the campaign.' }, { question: 'Can an inflatable concession booth be used for food sampling or event service?', answer: 'It can be planned as a branded service, sampling, registration, merchandise, or hospitality frontage. The final scope should confirm included equipment, utility interfaces, hygiene workflow, and applicable venue requirements; imagery alone does not establish food-preparation approvals.' }, { question: 'What information is needed for an inflatable vendor booth quotation?', answer: 'Share the artwork, intended venue, service or display workflow, footprint, quantity, destination, target event date, and requirements for the service opening, counter, accessories, packing, or branding.' }],
    related: ['Inflatable Tent', 'Bounce House', 'Inflatable Games'],
  },
  'Bounce House': {
    title: 'Commercial Bounce Houses | OEM Manufacturer | YIC',
    description: 'Commercial bounce houses, inflatable bounce houses, and bouncy castles from YIC for party rental businesses, FECs, schools, and event operators. Browse bounce house rental and bounce house for sale formats, then request custom OEM production.',
    keywords: 'bounce house, inflatable bounce house, commercial bounce house, bounce house rental, bounce house for sale, bouncy castle, backyard bouncer, white bounce house, themed bounce house, monster truck bounce house, pink bounce house, princess bounce house, unicorn bounce house, wedding bounce house',
    h1: 'Commercial Bounce Houses for Party Rental Businesses',
    intro: 'YIC supplies commercial bounce houses for party rental fleets, family entertainment centers, schools, community venues, and event operators. The range covers classic jump houses, white wedding bouncers, themed castles, sports designs, and custom layouts. Buyers comparing bounce house rental options or a bounce house for sale can review the models below, then send the preferred theme, footprint, quantity, destination, and artwork requirements for a factory quotation.',
    options: ['Classic commercial bounce houses', 'White wedding and luxury bouncers', 'Themed and character jump houses', 'Custom color and artwork designs'],
    buyers: [{ title: 'Party rental companies', text: 'Add a recognizable jumping attraction with a clear footprint and a theme that is easy to sell for birthdays and community events.' }, { title: 'Family entertainment centers', text: 'Plan a supervised play zone around guest age, venue clearance, access, and expected throughput.' }, { title: 'Schools and event operators', text: 'Use a simple, highly visible attraction for fairs, sports days, festivals, and seasonal programs.' }],
    oem: 'YIC supports custom bounce house OEM and ODM projects, including color palettes, banners, characters, basketball hoops, dimensions, accessories, and commercial packing.',
    faq: [{ question: 'What makes a bounce house suitable for commercial rental?', answer: 'Commercial planning considers material selection, reinforced seams, anchoring, blower requirements, access, supervision, packing, and the expected frequency of setup and use.' }, { question: 'Can I order a white bounce house for weddings or luxury events?', answer: 'Yes. White and neutral designs can be developed with clean artwork, refined color accents, and dimensions suited to wedding venues, event planners, and premium rental packages.' }, { question: 'Can the bounce house be customized with our logo or theme?', answer: 'Yes. YIC can review brand colors, printed panels, themed artwork, size, entrance details, and optional play features before production.' }],
    related: ['Bounce House Combo', 'Inflatable Slide', 'Inflatable Obstacle Course'],
  },
  'Bounce House Combo': {
    title: 'Commercial Bounce House Combos | OEM Factory | YIC',
    description: 'Commercial bounce house combos with slides, ball pits, basketball, and themed play features from YIC. Compare bounce house and slide, combo bounce house rental, and custom commercial layouts for rental fleets and FECs.',
    keywords: 'bounce house combo, bounce house combo for sale, commercial bounce house combo, bounce house and slide, combo bounce house rental, bounce house with slide, bouncy castle with slide, commercial bounce house with slide, themed bounce house combo, obstacle course bounce house, paw patrol bounce house, mermaid bounce house, pirate ship bounce house, princess bounce house, unicorn bounce house with slide, toy story bounce house',
    h1: 'Commercial Bounce House Combos for Party Rental & FEC Businesses',
    intro: 'YIC manufactures bounce house combos that combine jumping, sliding, basketball, ball pits, and themed play in one commercial attraction. These multi-activity inflatables cover bounce house and slide formats, combo bounce house rental packages, and custom commercial layouts for party rental companies and family entertainment centers. Review the available layouts, then confirm the play sequence, target age group, dimensions, artwork, and quantity for a factory quote.',
    options: ['Bounce house and slide combos', 'Ball-pit and basketball combos', 'Themed multi-play inflatables', 'Custom combo layouts for venues'],
    buyers: [{ title: 'Party rental fleets', text: 'Offer more than one activity in a single rental package for birthdays, school events, and community celebrations.' }, { title: 'Family entertainment centers', text: 'Balance entry, exit, slide, bounce, and supervision zones for a busy indoor or outdoor venue.' }, { title: 'Distributors', text: 'Build a differentiated catalog with themed artwork, repeatable specifications, and private-label options.' }],
    oem: 'For a custom combo, send the required play features, venue footprint, reference artwork, target age, and preferred dimensions. YIC can develop the layout, confirm materials, and coordinate production and packing.',
    faq: [{ question: 'What features can be combined in one inflatable?', answer: 'Depending on the brief, a combo can include a bounce area, slide, basketball hoop, climbing section, ball pit, obstacle element, or themed play details.' }, { question: 'How do I plan a combo for a rental venue?', answer: 'Confirm the available footprint, ceiling height, access route, user age group, supervision plan, anchoring surface, blower position, and expected event flow.' }, { question: 'Can a combo be made in a custom theme?', answer: 'Yes. YIC can adapt colors, characters, printed panels, slide layout, feature placement, dimensions, and branding for an OEM or ODM project.' }],
    related: ['Bounce House', 'Inflatable Slide', 'Inflatable Games'],
  },
  'Bumper Ball': {
    title: 'Inflatable Bumper Balls & Human Bubble Balls | YIC',
    description: 'Commercial inflatable bumper balls, human bubble balls, and zorb equipment from YIC for bubble soccer operators, schools, events, and rental fleets. Custom TPU sizes, colors, and branding.',
    keywords: 'inflatable bumper balls, human bubble balls, inflatable bubble soccer balls, commercial zorb balls, TPU bumper ball supplier',
    h1: 'Inflatable Bumper Balls for Bubble Soccer and Zorb Activities',
    intro: 'YIC supplies commercial inflatable bumper balls, human bubble balls, and zorb equipment for bubble soccer operators, schools, team-building companies, festivals, and rental businesses. Choose a youth, adult, soccer, or zorb format, then confirm diameter, participant group, playing surface, quantity, storage, transport, team colors, and logo requirements. Custom TPU ball sets can be prepared for repeat sessions and organized group play.',
    options: ['Inflatable bumper ball sets', 'Human bubble balls for adults and kids', 'Zorb soccer and bubble-soccer formats', 'Custom TPU colors, logos, and accessories'],
    buyers: [{ title: 'Sports and activity operators', text: 'Create a portable group attraction for timed sessions, leagues, camps, and supervised recreational play.' }, { title: 'Schools and team events', text: 'Use a clear, social activity format for field days, company events, and community programs.' }, { title: 'Rental businesses', text: 'Package multiple balls with transport, storage, and accessory planning for repeat bookings.' }],
    oem: 'YIC can review ball diameter, quantity, TPU construction, colors, printed logos, accessories, packaging, and intended user group for a custom inflatable bumper ball or human bubble ball set.',
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
    title: 'Commercial Inflatable Obstacle Courses & Fun Runs | YIC',
    description: 'Commercial inflatable obstacle courses for sale: 5K fun runs, Ninja, Army, Jungle, adult, themed, white wedding and race-ready layouts. Custom OEM factory production.',
    keywords: 'inflatable obstacle course, adult inflatable obstacle course, 5k inflatable obstacle course, inflatable obstacle run, ninja inflatable obstacle course, army inflatable obstacle course, jungle obstacle course, white bounce house obstacle course',
    h1: 'Commercial Inflatable Obstacle Courses, Fun Runs & Themed Challenges',
    intro: 'YIC manufactures commercial inflatable obstacle courses for party rental companies, family entertainment centers, schools, races, team events, festivals, and activity operators. The range includes compact themed courses, Jungle and Beach layouts, Tractor and Panda designs, Ninja and Army challenges, adult inflatable obstacle courses, long fun runs, white wedding obstacle formats, and modular 5K-style race sections. Confirm the usable footprint, participant flow, target age, theme, length, quantity, and site conditions; custom obstacle sequences and branded graphics are available for commercial projects.',
    options: ['Compact themed obstacle courses and bounce routes', 'Adult, Ninja, Army, Jungle, and race-ready inflatables', '5K-style fun-run and modular challenge sections', 'Custom modular obstacle sequences with OEM branding'],
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
    title: 'Commercial Inflatable Water Parks & Floating Aqua Parks | YIC',
    description: 'Commercial inflatable water parks, floating aqua parks and lake water attractions from YIC. OEM modules for resorts, water venues and project buyers.',
    keywords: 'inflatable water park, inflatable water park on water, water park with inflatables, floating water park, floating aqua park, commercial inflatable water park, inflatable water park for sale, buy inflatable water park, inflatable aqua park for sale, lake inflatable water park, lakeside inflatable water park, floating water park for sale, inflatable water park price, wipeout water park, giant floating water park, inflatable water park on the water, inflatable water park pool, beach inflatable water park, indoor inflatable water park, outdoor floating water park, commercial water park slides, water park with slide jump',
    h1: 'Commercial Inflatable Water Parks and Floating Aqua Parks',
    intro: 'YIC manufactures commercial inflatable water parks, floating water parks, and modular aqua parks for resorts, lakes, water venues, recreation operators, and destination projects. The collection covers an inflatable water park on water, a lake inflatable water park, floating obstacle modules, climbing and slide sections, water-play routes, and custom connected layouts. Buyers sourcing an inflatable water park for sale can begin with the water area, depth, access route, anchoring locations, guest capacity, operating season, and local requirements; YIC then develops the module mix, colors, branded graphics, packing, and project quotation around the real site.',
    options: ['Floating aqua parks for lakes and resorts', 'Commercial inflatable water parks on water', 'Inflatable water park slides and challenge modules', 'Custom lake, pool, beach, and destination water-park layouts'],
    buyers: [{ title: 'Water parks and resorts', text: 'Build a floating water park or large inflatable water park around water depth, guest circulation, capacity, visibility, rescue planning, and seasonal operations.' }, { title: 'Lake and beach recreation operators', text: 'Plan a lake inflatable water park, beach inflatable water park, or inflatable water park on the water with access, anchoring, entry control, transport, and storage confirmed first.' }, { title: 'Distributors and project buyers', text: 'Source an inflatable water park for sale, commercial water park slides, and a custom module range with private-label colors, packing, documentation, and destination-market planning.' }, { title: 'Pool and indoor water venues', text: 'Review an inflatable water park pool or indoor inflatable water park concept against usable water area, height, access, supervision, local rules, and the approved operating procedure.' }],
    oem: 'For a commercial inflatable water park, share the water-area drawing, depth, water conditions, access point, anchoring approach, desired modules, target guest capacity, operating season, branding, quantity, and destination. YIC can develop a floating aqua park, lake inflatable water park, or custom water-park layout with slides, climbing, balance, jump, rest, and obstacle modules, then coordinate materials, inspection, packing, and export requirements.',
    faq: [
      { question: 'How do I plan a commercial inflatable water park for a lake or resort?', answer: 'Start with the water area, verified depth, shore or dock access, anchoring locations, expected guest capacity, entry and exit route, rescue and supervision plan, weather exposure, operating season, and local rules. These details allow YIC to propose a commercial inflatable water park and connected module layout that suits the actual site.' },
      { question: 'What is the difference between a floating water park and a floating aqua park?', answer: 'Both terms commonly describe a connected inflatable attraction installed on water. A floating water park may emphasize the overall visitor destination, while a floating aqua park often describes the modular water-play layout. For procurement, the key decisions are module mix, water conditions, access, anchoring, capacity, supervision, and the final approved specification.' },
      { question: 'Can I buy an inflatable water park for sale with a custom layout?', answer: 'Yes. Buyers looking to buy an inflatable water park or an inflatable water park for sale can specify slides, climbing, balance, jumping, resting, and obstacle modules; overall footprint; colors; logos; and packed configuration. Send a site plan and target capacity so the layout is matched to the water area rather than selected as a generic package.' },
      { question: 'What affects inflatable water park price?', answer: 'Inflatable water park price depends on the selected modules, overall layout, material and construction specification, accessories, anchoring requirements, branding, quantity, packing, destination, and shipping requirements. A water-area drawing and project brief are more useful for quotation than a price estimate without site details.' },
      { question: 'Can a lake inflatable water park or beach inflatable water park be installed outdoors?', answer: 'A lake inflatable water park, beach inflatable water park, or inflatable water park on the water must be reviewed for water conditions, access, anchoring, weather plan, operating season, supervision, rescue procedures, and local authority or venue requirements. Outdoor use should follow the approved product and site specification, not assumptions based on images alone.' },
      { question: 'Which modules work well in a large inflatable water park or wipeout water park concept?', answer: 'A large inflatable water park can combine water park slides, climbing walls, balance routes, jumping features, obstacle modules, rest areas, and connection sections. A wipeout water park concept should be planned around user flow, staffing, water depth, clear access, supervised activity rules, module compatibility, inspection, cleaning, drying, and seasonal storage.' },
    ],
    related: ['Inflatable Slide', 'Inflatable Theme Park', 'Inflatable Obstacle Course'],
  },
};

categorySeoProfiles['Inflatable Water Slide'] = {
  title: 'Commercial Inflatable Water Slides | OEM Factory | YIC',
  description: 'Commercial inflatable water slides for sale: tropical, jungle, princess, shark, dolphin, rainbow, wet-dry, pool-finish and multi-lane formats for B2B buyers.',
  h1: 'Commercial Inflatable Water Slides for Sale, Rentals and Water Venues',
  intro: 'YIC manufactures commercial inflatable water slides for party-rental fleets, resorts, pool venues, events, and seasonal recreation operators. Browse tropical water slides, palm tree water slides, jungle water slides, princess water slides, shark water slides, dolphin water slides, rainbow water slides, wet dry water slides, pool-finish slides, and dual-lane or triple-lane racing formats. Every project should be matched to the usable footprint, height clearance, water supply, drainage, landing or splash-pool plan, access route, supervision, artwork, quantity, and destination before a factory quotation is confirmed.',
  options: ['Commercial water slides for sale and OEM ranges', 'Tropical, jungle, princess, shark, dolphin, rainbow, and wave themes', 'Wet dry water slides with splash-pool or landing options', 'Double, dual-lane, and triple-lane inflatable water-slide layouts'],
  buyers: [
    { title: 'Water parks and resorts', text: 'Plan a commercial water slide around the landing or pool area, water supply, drainage, guest capacity, queue flow, anchoring, and seasonal operation.' },
    { title: 'Party rental companies', text: 'Build summer rental packages around themed inflatable water slides, wet dry water slides, practical transport, drying, storage, and repair planning.' },
    { title: 'Pool and event operators', text: 'Coordinate pool-finish layout, landing, drainage, supervision, access, and branded artwork for temporary water-slide programs.' },
    { title: 'Distributors and project buyers', text: 'Source commercial water slides for sale with a clear theme, material specification, artwork, packing, destination, and factory-quotation brief.' },
  ],
  oem: 'Send the site plan, usable footprint, height clearance, water supply and drainage details, desired height, lane count, landing or splash-pool format, theme references, logo artwork, quantity, and destination. YIC can review tropical, jungle, princess, palm tree, shark, dolphin, rainbow, wave, wet-dry, single-lane, dual-lane, and triple-lane water-slide concepts, then coordinate layout approval, production inspection, packing, and export requirements.',
  faq: [
    { question: 'What is the difference between a commercial water slide and a dry inflatable slide?', answer: 'A commercial water slide is planned around wet-use water flow, landing or splash-pool layout, drainage, anchoring, supervision, and site conditions. A dry inflatable slide uses a dry landing and does not require the same water infrastructure.' },
    { question: 'How do I choose single-lane, double water slide, or dual lane water slide formats?', answer: 'Review the usable footprint, height clearance, target age group, guest throughput, queue area, landing space, water supply, drainage, and staffing plan. A double water slide or dual lane water slide should be selected only when the real site supports the wider landing and participant flow.' },
    { question: 'Can YIC make a tropical, jungle, palm tree, or princess water slide?', answer: 'Yes. YIC can review themed inflatable water slide artwork, colors, decorative elements, slide height, lane count, splash-pool or landing arrangement, logos, and accessories for a custom OEM project.' },
    { question: 'What is a wet dry water slide?', answer: 'A wet dry water slide is a format discussed for both water-use and dry-use project planning. Confirm the approved slide surface, water-flow arrangement, landing configuration, accessories, and operating procedure for the exact model rather than assuming both uses from a product image.' },
    { question: 'What should rental companies check before buying inflatable water slides for sale?', answer: 'Confirm the route from vehicle to setup area, usable footprint, height clearance, water supply, drainage, landing or pool area, anchoring, blower requirements, cleaning and drying routine, storage, repair-kit access, staffing, and local venue rules.' },
    { question: 'What details are needed for a commercial inflatable water slide quotation?', answer: 'Send the preferred model or theme, usable site plan, target dimensions, lane count, water and drainage plan, landing or pool format, artwork, quantity, destination, and requested delivery date. The factory quotation can then reflect the final configuration and packing requirements.' },
  ],
  related: ['Inflatable Slide', 'Inflatable Water Park', 'Bounce House Combo'],
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
  'Inflatable Water Slide': { question: 'What water, drainage, and anchoring details should I confirm before ordering?', answer: 'Share the water supply, depth, drainage, landing or pool area, surface, anchoring points, access route, expected capacity, supervision plan, and seasonal operating schedule.' },
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
  const obstacleCourse = obstacleCourseProfile(product);
  if (obstacleCourse) {
    return `YIC manufactures ${obstacleCourse.keywords[0]} for ${obstacleCourse.buyer}. This ${product.dimensions.trim()} model is shown as ${obstacleCourse.visual}. ${obstacleCourse.purpose} The listing specifies ${product.material}. Buyers can review ${obstacleCourse.customization}. Related buyer searches include ${obstacleCourse.keywords.slice(1).join(', ')}. Confirm the final site plan, access, anchoring, supervision, artwork, accessories, and event requirements before production.`;
  }
  const advertisingDisplay = advertisingDisplayProfile(product);
  if (advertisingDisplay) {
    return `YIC manufactures ${advertisingDisplay.keywords[0]} for ${advertisingDisplay.buyer}. This ${product.dimensions.trim()} model is shown as ${advertisingDisplay.visual}. ${advertisingDisplay.purpose} The listing specifies ${product.material}. Buyers can review ${advertisingDisplay.options}. Related buyer searches include ${advertisingDisplay.keywords.slice(1).join(', ')}. Confirm the final site plan, artwork, accessories, anchoring, access, supervision, and event requirements before production.`;
  }
  const foodService = foodServiceProfile(product);
  if (foodService && !isAirDancerProfile(product)) {
    return `YIC manufactures ${foodService.keywords[0]} for ${foodService.buyer}. This ${product.dimensions.trim()} model is shown as ${foodService.visual}. ${foodService.purpose} The listing specifies ${product.material}. Buyers can review ${foodService.options}. Related buyer searches include ${foodService.keywords.slice(1).join(', ')}. Confirm the final site plan, service workflow, branded artwork, included equipment, anchoring, and event requirements before production.`;
  }
  if (isAirDancerProfile(product)) {
    const profile = foodServiceProfiles[product.productSlug];
    return 'YIC manufactures ' + profile.keywords[0] + ' for ' + profile.buyer + '. This ' + product.dimensions.trim() + ' model is shown as ' + profile.visual + '. ' + profile.purpose + ' The listing specifies ' + product.material + '. Buyers can review ' + profile.options + '. Related buyer searches include ' + profile.keywords.slice(1).join(', ') + '. Confirm the final site, blower compatibility, electrical setup, secure positioning, weather conditions, artwork, and event requirements before production.';
  }
  const waterSlide = waterSlideProfile(product);
  if (waterSlide) {
    const siteChecks = waterSlide.wetUse === false
      ? 'Confirm the site footprint, access route, clear zones, anchoring, supervision, and final configuration before ordering.'
      : 'Confirm the site footprint, water supply, drainage, landing or pool plan, anchoring, supervision, and final configuration before ordering.';
    return `YIC manufactures ${waterSlide.keywords[0]} for ${waterSlide.buyer}. This ${product.dimensions.trim()} model is shown as ${waterSlide.visual}. ${waterSlide.purpose} The listing specifies ${product.material}. Buyers can review ${waterSlide.options}. Related buying searches include ${waterSlide.keywords.slice(1).join(', ')}. ${siteChecks}`;
  }
  const flyingFish = flyingFishProfile(product);
  if (flyingFish) {
    const planning = flyingFish.isTowable
      ? 'Confirm tow-boat compatibility, water conditions, supervision, tow-point details, and the final configuration before ordering.'
      : 'Confirm the launch area, water conditions, participant access, supervision, equipment details, and final configuration before ordering.';
    return `YIC manufactures ${flyingFish.keywords[0]} for ${flyingFish.buyer}. This ${product.dimensions.trim()} model is shown as ${flyingFish.visual}. ${flyingFish.purpose} The listing specifies ${product.material}. Related searches include ${flyingFish.keywords.slice(1).join(', ')}. ${planning}`;
  }
  const newWaterPark = newWaterParkProfile(product);
  if (newWaterPark) {
    return `YIC manufactures ${newWaterPark.keywords[0]} for ${newWaterPark.buyer}. This ${product.dimensions.trim()} concept is shown as ${newWaterPark.visual}. ${newWaterPark.purpose} The listing specifies ${product.material}. Project options include ${newWaterPark.options}. Related buying searches include ${newWaterPark.keywords.slice(1).join(', ')}. Confirm water depth, site access, supervision, anchoring, operating conditions, and the final configuration before ordering.`;
  }
  const newThemePark = newThemeParkProfile(product);
  if (newThemePark) {
    return `YIC manufactures ${newThemePark.coreKeyword} for ${newThemePark.buyer}. This ${product.dimensions.trim()} attraction is shown as ${newThemePark.visual}. ${newThemePark.purpose} The listing specifies ${product.material}. Custom project options include ${newThemePark.options}. Related buyer searches include ${newThemePark.keywords.slice(1).join(', ')}. Confirm the venue footprint, height clearance, access route, anchoring, staffing, supervision, and final specification before production.`;
  }
  const newTent = newInflatableTentProfile(product);
  if (newTent) {
    const detail = productDetailContent(product);
    return `YIC manufactures ${newTent.keywords[0]} for ${detail.primaryBuyer}. This ${product.dimensions.trim()} design is presented as ${newTent.visual}. ${newTent.purpose} The product is specified in ${product.material}; buyers can discuss dimensions, layout, branding, access, anchoring, and packing for their project. Related searches include ${newTent.keywords.slice(1).join(', ')}. Confirm the final site plan, materials, equipment, and operating requirements before production.`;
  }
  if (product.category === 'Bounce House' || product.category === 'Bounce House Combo') {
    const comboProfile = bounceComboSeoProfile(product);
    if (comboProfile) {
      return `YIC manufactures ${comboProfile.keywords[0]} for ${comboProfile.buyer}. The reference imagery shows ${comboProfile.visual}. ${comboProfile.purpose} This listing specifies ${product.material}. Buyers can discuss OEM or ODM colors, artwork, dimensions, entry and exit layout, play features, accessories, and packing. Related buyer searches include ${comboProfile.keywords.slice(1).join(', ')}. Confirm the final footprint, access route, anchoring, supervision, approved graphic rights, and destination requirements before production.`;
    }
    const core = bounceHouseCoreKeyword(product);
    const detail = productDetailContent(product);
    const variants = productKeywordVariants(product).filter((term) => term !== core).slice(0, 3).join(', ');
    return `YIC manufactures ${core} for ${detail.primaryBuyer}. The product is shown at ${product.dimensions.trim()} in ${product.material}, with a layout matched to the visible theme and play features. Buyers can request OEM or ODM changes to colors, artwork, dimensions, access, feature arrangement, accessories, and packing. Related buyer terms include ${variants}. Confirm the final footprint, user group, anchoring, supervision, and destination requirements before production.`;
  }
  const details = productDetailContent(product);
  const focusedTerms = productSearchTerms(product);
  const searchVariants = (focusedTerms.length ? focusedTerms : productKeywordVariants(product).slice(0, 4)).join(', ');
  const intent = productIntentKeyword(product);
  const intentSentence = intent ? ` This listing is positioned for buyers searching for ${intent}.` : '';
  const name = productDisplayTitle(product);
  const focusedSentence = focusedTerms.length
    ? product.category === 'Bumper Ball'
      ? ` Related product searches include ${focusedTerms.join(', ')}. This model is listed at ${product.dimensions.trim()} and uses ${product.material}; confirm participant fit, intended activity, accessories, and destination-market requirements against the approved specification.`
      : ` This page covers the ${focusedTerms.join(' and ')} search intent; final dimensions and construction are confirmed against the intended application.`
    : '';
  return `YIC Inflatable Sports manufactures commercial inflatables for ${details.primaryBuyer}. This listing features the “${name}” model. ${details.purpose} Custom artwork, colors, layout, and functional details can be developed around your venue, brand, and destination-market requirements.${intentSentence}${focusedSentence || ` Buyers researching this format may also compare terms such as ${searchVariants}.`}`;
}

type NewInflatableTentProfile = { keywords: string[]; visual: string; purpose: string; buyer: string; options: string; use: string };
const newInflatableTentProfiles: Record<string, NewInflatableTentProfile> = {
  'white-large-inflatable-igloo-tent': { keywords: ['large inflatable igloo tent', 'inflatable igloo tent for events', 'commercial dome event shelter', 'white inflatable event dome'], visual: 'a white 10 m igloo-style dome with an extended entry tunnel', purpose: 'The generous dome-and-tunnel arrangement creates a recognizable covered destination for exhibitions, festivals, hospitality, and branded guest experiences.', buyer: 'event producers, exhibition teams, hospitality operators, and activation agencies', options: 'entry-tunnel configuration, interior layout, lighting coordination, artwork, anchoring, and packed format', use: 'large-format event hospitality and visitor reception' },
  'inflatable-maze-for-sale': { keywords: ['inflatable maze for sale', 'commercial inflatable maze', 'portable event maze attraction', 'inflatable maze game for festivals'], visual: 'a 10 × 10 m walk-through maze with contrasting route markers', purpose: 'The marked maze layout gives attractions and event operators a hands-on visitor challenge with a clear footprint to plan around.', buyer: 'family entertainment venues, festival organizers, attraction operators, and rental businesses', options: 'maze route, wall layout, color coding, entrance and exit positions, branded graphics, and supervised guest flow', use: 'interactive walk-through challenges and event entertainment' },
  'commercial-inflatable-tent-for-party': { keywords: ['commercial inflatable party tent', 'inflatable event tent for parties', 'large inflatable party shelter', 'inflatable party marquee for sale'], visual: 'a long white 14 × 6 m event shelter with arched openings and colored structural accents', purpose: 'Its elongated footprint supports guest gathering, event hospitality, and branded party layouts while the openings help organize entry and circulation.', buyer: 'event rental companies, party planners, venue operators, and brand activation teams', options: 'opening positions, interior zoning, event colors, logo placement, lighting coordination, and anchoring', use: 'large parties, receptions, and temporary hospitality spaces' },
  'white-inflatable-dome-tent': { keywords: ['white inflatable dome tent', 'commercial inflatable dome shelter', 'inflatable dome tent with tunnel', 'event dome tent for sale'], visual: 'a 6 m white illuminated dome with a tunnel-style entrance', purpose: 'The rounded profile and defined entrance create a compact focal space for branded displays, guest welcome points, and temporary event use.', buyer: 'event producers, exhibition contractors, hospitality teams, and rental operators', options: 'entrance direction, interior finish, lighting plan, branding, anchoring, and transport configuration', use: 'compact event reception and branded display areas' },
  'white-inflatable-air-cube-tent': { keywords: ['white inflatable air cube tent', 'inflatable cube event tent', 'commercial inflatable exhibition shelter', 'square inflatable event tent for sale'], visual: 'a 6 × 6 m white cube-style shelter with circular windows and a contrasting entrance', purpose: 'The square plan provides a defined exhibition or hospitality footprint, while windows and a distinctive entry give the exterior a clean display-ready appearance.', buyer: 'exhibitors, trade-show teams, event agencies, and branded activation operators', options: 'window and entrance placement, interior plan, logo panels, color accents, lighting, and anchoring', use: 'exhibition booths and square-format branded event spaces' },
  'inflatable-glamping-tent-for-sale': { keywords: ['inflatable glamping tent for sale', 'commercial inflatable glamping shelter', 'inflatable camping tent for hospitality', 'inflatable outdoor accommodation tent'], visual: 'a red-and-silver arched glamping shelter with defined door and window areas', purpose: 'The arched profile and visible openings support a distinctive temporary outdoor-hospitality setup; confirm interior layout, ventilation, and site conditions for the intended guest use.', buyer: 'glamping sites, outdoor hospitality operators, campsite developers, and rental businesses', options: 'sleeping or lounge layout, door and window arrangement, colors, branding, ventilation plan, anchoring, and packing', use: 'glamping displays and managed outdoor hospitality projects' },
  'christmas-inflatable-gingerbread-house': { keywords: ['Christmas inflatable gingerbread house', 'inflatable gingerbread event house', 'holiday inflatable attraction for events', 'commercial Christmas inflatable display'], visual: 'a colorful gingerbread-house themed holiday structure with an adjacent play area shown in the reference imagery', purpose: 'The seasonal confectionery theme creates a photo-friendly focal point for Christmas markets, family events, and holiday attraction zones.', buyer: 'holiday event producers, malls, family venues, and seasonal rental operators', options: 'holiday artwork, color palette, entrance details, adjacent activity zoning, branding, and venue-specific footprint', use: 'Christmas markets, seasonal displays, and family holiday programming' },
  'winter-inflatable-gingerbread-house': { keywords: ['winter inflatable gingerbread house', 'winter themed inflatable event house', 'inflatable holiday cottage attraction', 'commercial winter event inflatable'], visual: 'a snow-themed cottage-style inflatable shown in a winter setting', purpose: 'The cozy winter-house appearance can anchor seasonal photo opportunities, visitor reception, and themed event programming; specify the final decorative treatment to match the approved artwork.', buyer: 'winter festival organizers, shopping centers, family attractions, and seasonal event contractors', options: 'winter or gingerbread artwork, color treatment, entrance layout, interior use, branding, and installation footprint', use: 'winter festivals and seasonal themed visitor experiences' },
  'inflatable-emergency-tent': { keywords: ['inflatable emergency tent', 'rapid-deployment inflatable shelter', 'commercial emergency response tent', 'inflatable relief shelter for sale'], visual: 'a blue-and-white response shelter marked with a medical cross in the supplied image', purpose: 'The visible layout is suited to planning a temporary response, triage, or field-support space; actual emergency, medical, fire, and weather suitability must be verified against the final specification and applicable standards.', buyer: 'emergency-response planners, humanitarian organizations, field teams, and public-sector procurement groups', options: 'interior zones, entry points, identification graphics, power and ventilation planning, anchoring, and transport package', use: 'temporary field support and response-site planning' },
  'inflatable-geodesic-dome': { keywords: ['inflatable geodesic dome', 'geodesic inflatable event dome', 'commercial dome shelter for events', 'inflatable dome venue structure'], visual: 'a cluster of transparent geometric domes in a lakeside hospitality setting', purpose: 'The faceted transparent appearance lends itself to distinctive event, dining, or glamping concepts where visibility and guest experience are central to the site plan.', buyer: 'hospitality venues, glamping developers, event producers, and experiential agencies', options: 'dome diameter, access, transparent panels, connected layout, interior fit-out, anchoring, and branding', use: 'destination hospitality, pop-up dining, and immersive event environments' },
  'inflatable-dome-shelter': { keywords: ['inflatable dome shelter', 'open inflatable dome event shelter', 'commercial inflatable reception shelter', 'inflatable outdoor event pavilion'], visual: 'an open-sided white arched shelter with a spacious covered interior', purpose: 'The open entrance and covered central area create a welcoming transition or gathering space for outdoor events and brand experiences.', buyer: 'event agencies, outdoor venues, exhibition teams, and rental operators', options: 'opening width, side treatment, interior plan, logo placement, lighting, anchoring, and footprint', use: 'open-air reception, hospitality, and event wayfinding' },
  'inflatable-igloo-dome-tent': { keywords: ['inflatable igloo dome tent', 'white inflatable igloo shelter', 'commercial dome tent for events', 'inflatable winter event dome'], visual: 'a white Oxford-fabric igloo dome staged as an outdoor refreshment and rest area', purpose: 'The igloo silhouette creates a memorable sheltered stop for winter festivals, outdoor hospitality, and branded guest areas.', buyer: 'festival producers, hospitality operators, event rental businesses, and destination venues', options: 'service or guest entrance, counter placement, interior furnishings, branded panels, lighting, and anchoring', use: 'festival refreshment points and winter event hospitality' },
  'inflatable-igloo-party-tent': { keywords: ['inflatable igloo party tent', 'commercial inflatable igloo event tent', 'winter party dome tent', 'white inflatable party dome for sale'], visual: 'a white Oxford-fabric igloo dome arranged for a winter market or seasonal gathering', purpose: 'The rounded enclosure offers a distinct visual setting for seasonal gatherings, pop-up hospitality, and photo-ready event programming.', buyer: 'seasonal event organizers, hospitality brands, party rental operators, and festival venues', options: 'entry layout, seasonal graphics, interior seating plan, lighting, logo placement, and anchoring', use: 'winter markets, private parties, and seasonal brand activations' },
  'silver-airdome-inflatable-tents': { keywords: ['silver airdome inflatable tent', 'silver inflatable event dome', 'commercial inflatable exhibition dome', 'branded inflatable airdome shelter'], visual: 'a silver exterior and blue interior arched dome used as a branded exhibition space', purpose: 'The metallic exterior and contrasting interior help create a high-visibility event destination with room to coordinate branded visitor flow.', buyer: 'exhibition contractors, event producers, sports activations, and brand experience agencies', options: 'interior color, access points, logo and graphic placement, lighting, anchoring, and packing', use: 'exhibitions, sponsor activations, and branded event hospitality' },
};

function newInflatableTentProfile(product: Product) {
  return product.category === 'Inflatable Tent' ? newInflatableTentProfiles[product.productSlug] : undefined;
}

// The seven food-service uploads share the Advertising Inflatable category,
// but each page needs its own buyer language, visual interpretation, and
// search intent. Keeping these profiles separate prevents the truck, kiosk,
// booth, and concession keywords from collapsing into duplicate pages.
type FoodServiceProfile = {
  keywords: string[];
  visual: string;
  purpose: string;
  buyer: string;
  application: string;
  options: string;
  faqQuestions: string[];
};

const foodServiceProfiles: Record<string, FoodServiceProfile> = {
  'inflatable-concession-stand': {
    keywords: ['inflatable concession stand', 'inflatable food truck', 'inflatable vendor booth', 'commercial food service inflatable'],
    visual: 'a compact blue-and-white service-truck facade with a striped serving awning, open counter, and a clearly defined front customer zone',
    purpose: 'The compact truck-style frontage gives event operators a recognizable serving, sampling, registration, or branded hospitality point without presenting it as a certified food-preparation facility.',
    buyer: 'event-rental companies, food and beverage brands, festival organizers, catering teams, malls, and promotional agencies',
    application: 'food sampling, event service counters, ticketing, merchandise, registration, and branded hospitality activations',
    options: 'service-window size, awning treatment, food-truck graphics, logo panels, colors, counter layout, entrance position, lighting provision, and packing',
    faqQuestions: ['What is this inflatable concession stand designed for?', 'How should I plan the 3.73 x 2.5 m service footprint?', 'Can this inflatable food truck style stand be used for food sampling or ticketing?', 'Which elements of the inflatable vendor booth can be customized?', 'What operating and site checks should event teams prepare?', 'What should I include in an inflatable concession stand quotation request?'],
  },
  'inflatable-christmas-taco-truck': {
    keywords: ['inflatable christmas taco truck', 'christmas taco truck inflatable', 'inflatable taco truck', 'seasonal inflatable concession stand'],
    visual: 'a green-and-white truck-shaped service booth with a large pizza-style roof sign, striped awning, and front-facing serving counter',
    purpose: 'The truck-shaped display creates a themed seasonal food-service or promotional focal point; final Christmas, taco, pizza, or other campaign artwork should be confirmed from the approved production drawing.',
    buyer: 'Christmas market organizers, seasonal event producers, food-promotion teams, rental businesses, shopping centers, and hospitality agencies',
    application: 'holiday markets, taco or pizza promotions, seasonal sampling, branded food-service counters, and festival activations',
    options: 'seasonal roof sign, taco or pizza artwork, serving-window treatment, colors, printed holiday graphics, logo panels, counter arrangement, and packing',
    faqQuestions: ['What is an inflatable Christmas taco truck intended for?', 'How should I plan the 4.5 x 3 x 3.6 m reference footprint?', 'Can the roof sign and food-service artwork be changed for a Christmas promotion?', 'Which details can be customized for a taco truck inflatable?', 'What should a holiday market operator prepare before installation?', 'What information is needed for an inflatable Christmas taco truck factory quote?'],
  },
  'inflatable-concession-booth': {
    keywords: ['inflatable concession booth', 'inflatable vendor booth', 'inflatable candy shop', 'commercial concession stand'],
    visual: 'a chocolate-and-white candy-shop truck facade with a striped awning, raised themed sign, and broad front service window',
    purpose: 'The confectionery-style visual is suited to creating a memorable service, sampling, or product-display point at family events and branded activations, with the final operating scope matched to the approved layout.',
    buyer: 'candy brands, dessert vendors, party-rental companies, family entertainment venues, malls, and experiential marketing teams',
    application: 'candy sampling, dessert displays, pop-up sales counters, family events, retail promotions, and branded hospitality zones',
    options: 'candy or dessert sign, color palette, striped awning, menu panel, logo graphics, service opening, counter treatment, and export packing',
    faqQuestions: ['What is this inflatable concession booth designed for?', 'How much space should I allow for this 4.5 x 3 x 3.6 m booth?', 'Can the candy-shop artwork be replaced with my brand theme?', 'How can an inflatable vendor booth support sampling or display activity?', 'What repeat-event checks should be included in the operating plan?', 'What should buyers send for an inflatable concession booth quotation?'],
  },
  'blow-up-concession-stand': {
    keywords: ['blow up concession stand', 'inflatable pizza truck', 'blow up food stand', 'inflatable concession booth'],
    visual: 'a green-and-white pizza-truck style counter with a large pizza roof feature, striped serving awning, and an open customer-facing window',
    purpose: 'The pizza-truck visual helps operators create a high-visibility branded serving or promotion station for supervised event use; it does not by itself establish food-safety, electrical, or cooking-equipment approvals.',
    buyer: 'pizza promotions, food-event organizers, rental fleets, shopping centers, festival vendors, and brand-activation agencies',
    application: 'pizza promotions, food festivals, sampling campaigns, outdoor markets, sponsor activations, and temporary service counters',
    options: 'pizza sign or alternative roof feature, artwork, window placement, counter details, menu board area, colors, sponsor logos, and packing',
    faqQuestions: ['What is a blow up concession stand used for?', 'How should I plan space around this pizza-truck style stand?', 'Can the pizza roof feature be changed to another product theme?', 'Which branded elements can be customized on an inflatable concession booth?', 'Does the image confirm cooking or food-safety equipment is included?', 'What should I include when requesting a blow up concession stand quote?'],
  },
  'inflatable-concession-stand-for-sale': {
    keywords: ['inflatable concession stand for sale', 'inflatable snack corner', 'inflatable concession stand rental', 'commercial inflatable food truck'],
    visual: 'a pink-and-white Snack Corner truck booth with a striped service awning, open counter, and bright family-event presentation',
    purpose: 'The snack-counter format provides a recognizable selling, sampling, registration, or hospitality point for commercial events and rental programs, while final equipment and service procedures remain project-specific.',
    buyer: 'party-rental businesses, snack brands, school-event suppliers, family entertainment centers, festival organizers, and event agencies',
    application: 'snack service, family days, school fairs, branded sampling, pop-up hospitality, and commercial rental packages',
    options: 'Snack Corner signage, colors, logo artwork, counter opening, menu-board area, entry layout, accessories, and export packing',
    faqQuestions: ['What is this inflatable concession stand for sale designed for?', 'How much site clearance should I reserve for the Snack Corner format?', 'Can this inflatable concession stand be supplied for a rental program?', 'Can YIC customize the signage, colors, and counter layout?', 'What should a party-rental operator check before each event?', 'What details should I send for a commercial inflatable food truck quote?'],
  },
  'inflatable-kiosk-booth-for-sale': {
    keywords: ['inflatable kiosk booth for sale', 'inflatable kiosk', 'inflatable ice cream truck', 'inflatable vendor booth'],
    visual: 'a white-and-pink ice-cream-truck kiosk with a large ice-cream roof sign, striped serving awning, and open retail counter',
    purpose: 'The ice-cream-truck concept creates a photogenic kiosk and serving focal point for seasonal retail, sampling, and hospitality programs, subject to the approved operating and equipment specification.',
    buyer: 'ice cream brands, resort operators, mall-promotion teams, party-rental companies, food-event producers, and family venues',
    application: 'ice cream promotions, resort kiosks, mall activations, sweet-treat sampling, outdoor events, and branded retail displays',
    options: 'ice-cream roof sign, product graphics, color treatment, service window, menu-board area, brand logos, internal counter plan, and packing',
    faqQuestions: ['What is this inflatable kiosk booth for sale designed for?', 'How should I plan the 4.5 x 3 x 3.6 m ice-cream kiosk footprint?', 'Can the ice-cream-truck theme be adapted for another retail product?', 'What can be customized on an inflatable kiosk?', 'Which site and supervision details should be reviewed before an event?', 'What should buyers provide for an inflatable kiosk booth factory quotation?'],
  },
  'inflatable-vendor-booth': {
    keywords: ['inflatable vendor booth', 'inflatable concession booth', 'inflatable candy shop', 'inflatable food truck display'],
    visual: 'a chocolate-and-white vendor truck with a candy-shop roof sign, striped awning, and a wide serving or display counter',
    purpose: 'The dessert-themed vendor format gives brands and rental operators a visible counter-based display point for supervised customer interaction, sampling, and event hospitality.',
    buyer: 'vendor-market operators, confectionery brands, event-rental companies, retail promoters, hospitality teams, and festival organizers',
    application: 'vendor markets, candy displays, sampling counters, dessert promotions, brand launches, and event hospitality',
    options: 'vendor signage, candy or dessert graphics, awning colors, logo panels, menu display, service opening, counter setup, and packing',
    faqQuestions: ['What is an inflatable vendor booth designed for?', 'How should I plan the 4.5 x 3 x 3.6 m vendor-booth footprint?', 'Can this inflatable candy shop be branded for a different product line?', 'What service or display uses can an inflatable food truck display support?', 'What cleaning, storage, and inspection routine is needed for repeat events?', 'What information is needed for an inflatable vendor booth quotation?'],
  },
  'inflatable-food-truck-for-sale': {
    keywords: ['inflatable food truck for sale', 'inflatable food truck', 'inflatable concession stand', 'commercial inflatable food truck'],
    visual: 'a blue-and-white truck-style event facade with a striped serving awning, front service counter, and a compact, recognizable mobile-food silhouette',
    purpose: 'This purchase-focused inflatable food truck creates a portable branded frontage for supervised promotions, rentals, sampling, ticketing, merchandise, and hospitality, while food preparation equipment and regulatory requirements remain outside the inflatable structure specification.',
    buyer: 'event-rental fleets, experiential marketing agencies, food and beverage brands, festival suppliers, shopping centers, hospitality teams, and commercial event operators',
    application: 'brand sampling, festival service counters, retail launches, registration desks, ticketing, merchandise, sponsor activations, and food-themed promotional displays',
    options: 'food-truck graphics, striped awning colors, logo panels, counter opening, menu or message boards, entrance position, internal layout, lighting provision, and export packing',
    faqQuestions: ['What is this inflatable food truck for sale designed to support?', 'How should buyers plan the 3.73 x 2.5 m reference footprint?', 'Can the blue-and-white inflatable food truck be branded for my campaign?', 'Is food-preparation or cooking equipment included with an inflatable concession stand?', 'What should rental and event teams inspect before each use?', 'What project information helps YIC quote a commercial inflatable food truck?'],
  },
  'inflatable-tiki-bar': {
    keywords: ['inflatable tiki bar', 'inflatable cocktail bar', 'tiki inflatable bar', 'commercial tropical bar'],
    visual: 'a yellow tropical counter with two palm-tree columns, a striped front bar, and an open service window designed around a lively island-party look',
    purpose: 'The palm-and-tropical design creates a recognizable hospitality, drinks-display, sampling, or sponsor counter for supervised resort, pool-party, festival, and event use; included equipment is defined only in the approved order specification.',
    buyer: 'resorts, beach clubs, event-rental fleets, beverage brands, festival organizers, hospitality agencies, and pool-party operators',
    application: 'resort hospitality, tropical parties, branded beverage sampling, festival bars, poolside activations, and themed rental packages',
    options: 'palm-tree details, tropical colors, front-bar graphics, serving-window treatment, logo panels, counter configuration, lighting provision, accessories, and export packing',
    faqQuestions: ['What is this inflatable tiki bar designed for?', 'How should I plan the 4.5 x 3 x 3.6 m tiki-bar footprint?', 'Can the tropical palm-bar graphics be customized for my brand?', 'Can this inflatable cocktail bar be used for beverage display or sampling?', 'What operating checks should a resort or rental team prepare?', 'What should I send for an inflatable tiki bar factory quotation?'],
  },
  'inflatable-cocktail-bar': {
    keywords: ['inflatable cocktail bar', 'tiki inflatable bar', 'inflatable tiki bar', 'commercial cocktail counter'],
    visual: 'a brown bamboo-look cocktail counter with a thatched canopy, three palm-tree features, colorful tiki-mask panels, and a wide front serving area',
    purpose: 'The thatched tropical-bar format gives event teams a polished focal point for a non-cooking hospitality counter, drinks presentation, sampling, reception, or branded guest interaction.',
    buyer: 'cocktail-event planners, resorts, beach venues, promotional agencies, wedding and party-rental companies, beverage brands, and festival operators',
    application: 'cocktail receptions, beach events, tropical wedding parties, beverage launches, resort guest service, and premium event rentals',
    options: 'canopy finish, tiki-mask artwork, bamboo-look panels, colors, logo placement, counter openings, branded menu area, accessories, and packing',
    faqQuestions: ['What is an inflatable cocktail bar used for?', 'How much event space should I reserve for this 4 x 3 x 3 m bar?', 'Can the canopy, tiki masks, and front graphics carry my campaign branding?', 'Does this tiki inflatable bar include drink-making or electrical equipment?', 'How should an event team manage setup and guest flow around the counter?', 'What details are needed for an inflatable cocktail bar quote?'],
  },
  'blow-up-tiki-bar': {
    keywords: ['blow up tiki bar', 'inflatable tiki bar', 'inflatable cocktail bar', 'Oxford fabric tiki bar'],
    visual: 'an orange-canopy tropical bar with palm columns, a bamboo-look front counter, and a printed island-style front emblem',
    purpose: 'The Oxford-fabric blow up tiki bar is positioned as a lightweight visual hospitality and promotional backdrop for temporary events, provided the final specification confirms the intended weather exposure, blower, accessories, and operating setup.',
    buyer: 'party-rental businesses, beach-event organizers, pop-up hospitality teams, resorts, beverage promoters, and event-production companies',
    application: 'temporary tiki bars, beach parties, indoor tropical events, sampling counters, sponsor hospitality, and promotional displays',
    options: 'Oxford-fabric colors, canopy artwork, palm details, printed front emblem, logo panels, counter arrangement, blower interface, accessories, and carry packing',
    faqQuestions: ['What is a blow up tiki bar designed for?', 'How should I use the 4 x 3 x 3 m reference size in an event layout?', 'What is the listed material for this Oxford fabric tiki bar?', 'Can the orange canopy and island-style graphics be changed?', 'Which weather, setup, and storage points should operators confirm?', 'What is needed for a blow up tiki bar factory quotation?'],
  },
  'inflatable-air-dancer-for-sale': {
    keywords: ['inflatable air dancer for sale', 'yellow inflatable air dancer', 'custom air dancer', 'Oxford fabric advertising inflatables'],
    visual: 'a tall yellow Oxford-fabric inflatable air dancer with two arms, a friendly printed face, and a blower-mounted base for high-visibility movement',
    purpose: 'This 5 m promotional air dancer is designed to attract attention to a storefront, roadside event, exhibition, opening, or campaign location; its motion depends on the compatible blower and actual site conditions.',
    buyer: 'retail stores, car dealerships, event-rental businesses, opening-event organizers, roadside promoters, exhibition teams, and advertising agencies',
    application: 'store openings, roadside promotions, retail attention-getters, car-lot advertising, outdoor events, exhibition entrances, and rental inventory',
    options: 'character colors, face artwork, logo printing, height, arm style, tube shape, blower compatibility, carry bag, replacement fabric, and export packing',
    faqQuestions: ['What is this inflatable air dancer for sale designed to do?', 'How should I plan a 5 m air dancer at a retail or event site?', 'What material is listed for this yellow inflatable air dancer?', 'Can the face, colors, logo, and character artwork be customized?', 'Does the air dancer include a blower and what operating checks are needed?', 'What information is required for an inflatable air dancer factory quote?'],
  },
  'blow-up-cocktail-bar': {
    keywords: ['blow up cocktail bar', 'inflatable cocktail bar', 'custom inflatable bar', 'tiki inflatable bar'],
    visual: 'a bamboo-look tropical cocktail counter with a thatched roof, large palm-tree columns, colorful tiki-mask panels, and a broad front service zone',
    purpose: 'The custom-size blow up cocktail bar provides a themed event counter for hospitality, beverage display, sponsor service, and guest interaction, with dimensions and operational details confirmed through the final project brief.',
    buyer: 'custom-event producers, resorts, beach clubs, beverage brands, experiential agencies, rental fleets, and festival hospitality teams',
    application: 'custom resort bars, beach-club activations, cocktail receptions, branded tasting stations, VIP hospitality, and large-format tropical event displays',
    options: 'custom dimensions, roof profile, palm and tiki-mask details, color scheme, logo panels, counter length, service openings, accessories, and export packing',
    faqQuestions: ['What is a blow up cocktail bar designed for?', 'Can this inflatable cocktail bar be made to custom dimensions?', 'How can a custom inflatable bar be branded for a resort or sponsor?', 'Can this tropical counter support drinks display and guest hospitality?', 'What site, weather, and cleaning considerations should operators plan?', 'What should I provide for a custom blow up cocktail bar quotation?'],
  },
  'inflatable-pool-tiki-bar': {
    keywords: ['inflatable pool tiki bar', 'inflatable tiki bar for pool', 'inflatable pool bar', 'poolside tiki bar'],
    visual: 'a yellow-and-white classical pavilion-style bar with red curtains, a raised roof sign, front steps, and a broad covered serving or hospitality counter positioned beside a pool',
    purpose: 'The poolside pavilion format creates a prominent tropical or resort hospitality point for supervised beverage display, guest reception, sponsor service, and themed event use; the product is shown poolside rather than as a floating water unit.',
    buyer: 'resorts, pool clubs, hotel event teams, beach venues, luxury-party planners, beverage brands, and commercial rental operators',
    application: 'poolside hospitality, resort events, tropical parties, beverage sampling, VIP receptions, and branded event counters',
    options: 'pavilion roof sign, curtain colors, column treatment, poolside bar graphics, logo panels, counter arrangement, entry steps, lighting provision, accessories, and export packing',
    faqQuestions: ['What is this inflatable pool tiki bar designed for?', 'How should I plan the 6 x 6 m poolside tiki-bar footprint?', 'Is this inflatable tiki bar for pool use a floating water product?', 'Can the roof sign, curtains, and poolside bar graphics be customized?', 'What poolside installation and hospitality checks should operators prepare?', 'What is needed for an inflatable pool tiki bar factory quotation?'],
  },
  'blow-up-pool-bar': {
    keywords: ['blow up pool bar', 'inflatable pool bar', 'inflatable swim up bar', 'poolside inflatable bar'],
    visual: 'a pink-and-white open pavilion counter with a large BAR roof sign, red curtains, front steps, and a wide service frontage beside a swimming pool',
    purpose: 'The pink poolside bar visual gives venues and event teams a recognizable hospitality, beverage-display, or sponsor-counter focal point without representing the unit as a floating pool float or confirming any included drink-making equipment.',
    buyer: 'pool-party organizers, resorts, event-rental businesses, beverage promoters, hotel venues, birthday-event planners, and activation agencies',
    application: 'pool parties, resort hospitality, beverage launches, branded drink displays, summer events, and rental counter packages',
    options: 'BAR roof lettering, color scheme, curtain treatment, sponsor artwork, service counter, logo panels, entry layout, accessories, and export packing',
    faqQuestions: ['What is a blow up pool bar used for?', 'How should I plan this 6 x 6 m inflatable pool bar at an event?', 'Is this inflatable swim up bar image a floating bar or a poolside structure?', 'Can the pink BAR roof sign and counter branding be changed?', 'What setup, weather, and service-flow checks should a pool-party team make?', 'What details should I send for a blow up pool bar quotation?'],
  },
  'inflatable-pool-bar-commercial': {
    keywords: ['commercial inflatable pool bar', 'inflatable pool bar', 'poolside inflatable bar', 'inflatable cocktail bar for pool parties'],
    visual: 'a white-and-red pavilion-style hospitality bar with a branded roof fascia, red curtains, an open counter, and a 6 x 6 m poolside event footprint',
    purpose: 'This commercial inflatable pool bar provides a clean, architectural backdrop for hotel hospitality, sponsor service, beverage display, and controlled event reception beside a pool; it should not be described as a floating bar unless the final specification says so.',
    buyer: 'hotel and resort operators, corporate-event teams, premium rental fleets, beverage brands, real-estate marketing teams, and destination venues',
    application: 'hotel pool events, corporate receptions, poolside cocktail service, branded hospitality, summer launches, and commercial rental programs',
    options: 'custom dimensions, roof fascia artwork, curtain colors, counter length, logo panels, service opening, branded columns, accessories, and export packing',
    faqQuestions: ['What is a commercial inflatable pool bar designed for?', 'How much space should I reserve for this 6 x 6 m poolside event bar?', 'Can the roof fascia and red-curtain hospitality design be branded?', 'Does this inflatable pool bar float on water?', 'What operational checks matter for hotel and corporate pool events?', 'What information is required for a commercial inflatable pool bar quotation?'],
  },
};

type AdvertisingDisplayProfile = FoodServiceProfile & {
  displayTitle: string;
  kind: 'mascot' | 'tunnel';
  cardSummary: string;
};

const advertisingDisplayProfiles: Record<string, AdvertisingDisplayProfile> = {
  'inflatable-dog-mascot': {
    displayTitle: 'Inflatable Dog Mascot',
    kind: 'mascot',
    keywords: ['inflatable dog mascot', 'giant inflatable dog', 'custom dog mascot inflatable', 'pet event inflatable display'],
    visual: 'a friendly tan-and-white dog mascot with oversized features, sitting paws, a printed collar, and a 3 m event-scale silhouette',
    purpose: 'The dog character creates a memorable photo point, campaign landmark, or family-event display for pet adoption days, veterinary promotions, community events, and branded activations.',
    buyer: 'animal shelters, veterinary brands, pet retailers, event agencies, shopping centers, family venues, and promotional rental companies',
    application: 'pet adoption events, veterinary promotions, animal-brand activations, family days, photo opportunities, and retail displays',
    options: 'dog breed styling, colors, collar, facial expression, logos, sponsor panels, height, base layout, accessories, and export packing',
    faqQuestions: ['What is this inflatable dog mascot designed for?', 'How should I plan the 3 m dog mascot display at an event?', 'Can the dog character be customized for a pet brand or adoption campaign?', 'What material is listed for this giant inflatable dog?', 'What setup and supervision checks should event teams prepare?', 'What should I send for an inflatable dog mascot factory quotation?'],
    cardSummary: '3 m inflatable dog mascot for pet events, adoption campaigns, retail promotions, family days, and branded photo opportunities.',
  },
  'inflatable-cat-mascot-manufacturer': {
    displayTitle: 'Inflatable Cat Mascot Manufacturer',
    kind: 'mascot',
    keywords: ['inflatable cat mascot manufacturer', 'inflatable cat mascot', 'giant inflatable cat', 'custom cat mascot inflatable'],
    visual: 'a large white-and-pink cartoon cat with bright eyes, a sitting pose, oversized paws, printed whiskers, and a 3 m family-event display scale',
    purpose: 'The friendly cat character helps pet brands, retailers, charities, and event teams create an approachable landmark for photo traffic, awareness campaigns, launches, and themed public events.',
    buyer: 'pet-product brands, cat shelters, veterinary groups, mall promoters, event agencies, retailers, and commercial display buyers',
    application: 'cat-adoption campaigns, pet-store launches, retail displays, family events, charity promotions, and brand photo zones',
    options: 'cat colors, breed-inspired markings, facial expression, neckwear, logo printing, sponsor panels, character height, base treatment, accessories, and packing',
    faqQuestions: ['What does an inflatable cat mascot manufacturer supply?', 'How should I plan the 3 m cat mascot at a promotion site?', 'Can a giant inflatable cat be customized for a cat brand or charity?', 'What material is listed for this custom cat mascot inflatable?', 'How should teams manage installation, cleaning, and storage?', 'What details are needed for an inflatable cat mascot manufacturer quote?'],
    cardSummary: '3 m giant inflatable cat mascot for pet retail, adoption campaigns, charity promotions, family events, and custom brand displays.',
  },
  'football-team-spirit-inflatable-tunnel': {
    displayTitle: 'Football Team Spirit Inflatable Tunnel',
    kind: 'tunnel',
    keywords: ['football team spirit inflatable tunnel', 'bulldog inflatable tunnel', 'football team entrance tunnel', 'custom sports inflatable tunnel'],
    visual: 'a blue team-entry tunnel with a large bulldog head, striped football jersey styling, a visible walk-through entrance, and sponsor-ready side panels',
    purpose: 'The bulldog-themed walk-through structure gives teams, schools, stadium events, and sponsors a high-energy player entrance and fan photo landmark built around approved branding and venue access conditions.',
    buyer: 'school athletic departments, football clubs, stadium-event teams, sports marketers, booster organizations, rental companies, and sponsor activation agencies',
    application: 'football player entrances, school spirit events, stadium promotions, team introductions, sponsor activations, and sports photo zones',
    options: 'team mascot, tunnel length, jersey colors, logo panels, sponsor graphics, entry shape, lighting provision, anchoring, accessories, and export packing',
    faqQuestions: ['What is a football team spirit inflatable tunnel designed for?', 'Can this bulldog inflatable tunnel be made to custom dimensions?', 'Can the team mascot, jersey colors, and sponsor graphics be changed?', 'How should a football team entrance tunnel be planned at a stadium or school?', 'What anchoring, access, and supervision checks should teams prepare?', 'What should I send for a custom sports inflatable tunnel quotation?'],
    cardSummary: 'Custom football team spirit inflatable tunnel with bulldog mascot styling for player entrances, school events, sponsor activations, and sports photo zones.',
  },
};

function foodServiceProfile(product: Product) {
  return product.category === 'Advertising Inflatable' ? foodServiceProfiles[product.productSlug] : undefined;
}

function advertisingDisplayProfile(product: Product) {
  return product.category === 'Advertising Inflatable' ? advertisingDisplayProfiles[product.productSlug] : undefined;
}

function isAirDancerProfile(product: Product) {
  return product.productSlug === 'inflatable-air-dancer-for-sale';
}

type NewWaterParkProfile = { keywords: string[]; visual: string; purpose: string; buyer: string; application: string; options: string; faqQuestions: string[]; cardSummary?: string };
const newWaterParkProfiles: Record<string, NewWaterParkProfile> = {
  'inflatable-obstacle-course-in-water': {
    keywords: ['inflatable obstacle course in water', 'water obstacle course', 'obstacle course water park', 'floating obstacle course rental'],
    visual: 'a blue-and-white beach-themed floating lane with a wave arch, palm details, a small slide, and a character-shaped play station inside an indoor lap pool',
    purpose: 'The linear pool arrangement combines recognizable beach graphics with a short sequence of pass-through and slide activities, making the concept easy to position as a supervised pool-session attraction.',
    buyer: 'indoor pool operators, aquatic centers, resorts, swim schools, and event or rental providers',
    application: 'supervised pool events, aquatic-center activity sessions, resort recreation, and temporary water obstacle course rental programs',
    options: 'course length, wave arch and slide placement, beach graphics, colors, pool entry and exit, logo panels, anchoring, and included accessories',
    faqQuestions: ['What obstacles are included in the beach-style inflatable obstacle course in water?', 'How should I plan this water obstacle course for an indoor lap pool?', 'Which PVC specification is listed for this floating course?', 'Can the wave arch, slide, and beach graphics be changed?', 'What pool access and supervision details are needed before installation?', 'What should I provide to request a water obstacle course rental or factory quote?'],
  },
  'pool-inflatable-obstacle-course': {
    keywords: ['pool inflatable obstacle course', 'pool obstacle course', 'obstacle course in pool', 'home pool obstacle course'],
    visual: 'a compact blue-and-white floating pool course with a raised center arch, side rails, palm accents, a two-lane front slide, and a character play island',
    purpose: 'Its clearly defined pool footprint and short play sequence help an aquatic venue plan timed, supervised turns without presenting the unit as a large lake-based aqua park.',
    buyer: 'public and private pool operators, hotel recreation teams, family activity venues, and commercial pool-event planners',
    application: 'indoor swimming pool sessions, hotel pool entertainment, supervised family events, and small-format pool attractions',
    options: 'overall pool footprint, arch clearance, slide count and orientation, character details, pool-edge access, colors, branding, and anchor points',
    faqQuestions: ['What play sequence does this pool inflatable obstacle course show?', 'How can I size the layout for a pool obstacle course?', 'Is this pool obstacle course specified for a particular material?', 'Can the slides and character play island be repositioned?', 'How should operators organize entry, turns, and supervision in a swimming pool?', 'Which project details help price a home pool obstacle course or commercial version?'],
  },
  'swimming-pool-inflatable-obstacle-course': {
    keywords: ['swimming pool inflatable obstacle course', 'swimming pool inflatable course', 'pool obstacle course rentals', 'inflatable swimming pool obstacle course'],
    visual: 'a green, yellow, and brown floating balance-and-crawl obstacle shaped with overhead crossbars, rounded side challenges, and a crocodile head at the finish',
    purpose: 'The jungle-animal silhouette and low-profile sequence make this model a themed swimming-pool challenge where operators can organize supervised turns and control participant flow.',
    buyer: 'swimming pool venues, leisure centers, camps, school activity programs, and commercial aquatic-event operators',
    application: 'pool obstacle sessions, camp recreation, school water days, family leisure programs, and swimming pool inflatable course events',
    options: 'jungle colors, crocodile or animal artwork, obstacle spacing, course length, entry and finish zones, branding, anchors, and packing',
    faqQuestions: ['What challenge features appear on this swimming pool inflatable obstacle course?', 'Can this inflatable swimming pool obstacle course be configured for a venue pool?', 'What material does the catalog list for this aquatic course?', 'Can the crocodile finish and jungle color scheme be customized?', 'What participant flow and supervision plan should a pool operator prepare?', 'What information is needed for pool obstacle course rentals or a purchase quote?'],
  },
  'obstacle-course-swimming-pool': {
    keywords: ['lake obstacle course', 'floating inflatable obstacle course', 'floating lake obstacle course', 'inflatable course on lake'],
    visual: 'a large connected lake-style aqua course with a blue, coral, and white palette, multiple inflatable platforms, arches, climbing and slide stations, and a central unicorn feature',
    purpose: 'The linked modular layout is intended as a destination-scale floating attraction whose routes and components need to be planned against the actual water area, access, anchoring, and supervised operating model.',
    buyer: 'lake operators, destination resorts, beach recreation businesses, aqua parks, and inflatable water-course project buyers',
    application: 'lake recreation, resort aqua parks, beach attractions, seasonal floating obstacle course rental, and destination water activities',
    options: 'module sequence, connection points, floating course footprint, color blocks, themed centerpiece, route and entry design, anchoring, and transport packing',
    faqQuestions: ['What modules are visible in this lake obstacle course concept?', 'How do I plan a floating inflatable obstacle course for a lake site?', 'Which material specification is listed for this modular course?', 'Can the aqua modules and themed centerpiece be rearranged?', 'What water-area, anchoring, and access details should a lake operator confirm?', 'What information should I send when sourcing a floating obstacle course rental or custom build?'],
  },
  'jungle-splash-waterpark': {
    keywords: ['jungle splash waterpark', 'water park with obstacle course', 'water play obstacle course', 'obstacle course aqua park'],
    visual: 'a bright yellow-and-green pool obstacle featuring illustrated aquatic characters, two contrasting overhead arches, a crawl-through section, and a sloped slide',
    purpose: 'Character artwork, color-coded arches, and a compact slide create a story-led splash attraction for aquatic venues that want a defined play sequence rather than a generic floating route.',
    buyer: 'family aquatic centers, hotel and resort pools, leisure clubs, children’s activity venues, and event organizers',
    application: 'jungle-themed splash sessions, resort pool programs, supervised family events, and themed water park activity areas',
    options: 'character artwork, jungle palette, arch and crawl layout, slide orientation, printed panels, dimensions, anchoring, and branded graphics',
    faqQuestions: ['What makes this jungle splash waterpark different from a generic pool course?', 'Where can a water park with obstacle course layout be used?', 'What PVC material is listed for the jungle splash attraction?', 'Can the jungle characters, arches, and slide layout be customized?', 'How should a venue plan supervised use of this water play obstacle course?', 'What should I include in a quote request for a themed aqua park course?'],
  },
  'obstacle-course-in-the-water': {
    keywords: ['obstacle course in the water', 'obstacle courses on water', 'aqua obstacle course', 'floating water obstacle course'],
    visual: 'a pirate-themed pool course with yellow and brown side platforms, a central mast-shaped obstacle, themed character artwork, and opposing sloped climb-and-slide ends',
    purpose: 'The themed end platforms and central mast create a recognizable traverse challenge, while the linear pool configuration supports one-way turns and managed participant flow.',
    buyer: 'aquatic centers, resort and hotel pools, camp operators, water-event organizers, and commercial inflatable attraction buyers',
    application: 'pirate-themed pool sessions, supervised camp activities, resort recreation, event programming, and obstacle courses on water',
    options: 'pirate artwork, mast and side-feature positions, course length, end ramps, colors, entry and exit flow, logo panels, and anchoring',
    faqQuestions: ['What pirate-themed challenges are shown on this obstacle course in the water?', 'Can the linear course fit different pool or water-area layouts?', 'What material is specified for this floating water obstacle course?', 'Can the central mast, end ramps, and artwork be modified?', 'Which entry, exit, and supervision procedures should operators plan?', 'What details are required for an aqua obstacle course project quotation?'],
  },
  'aqua-inflatable-water-park': {
    keywords: ['aqua inflatable water park', 'inflatable water park pool', 'splash and slide water park', 'inflatable water park with slide'],
    visual: 'a pink-and-white 16 × 4 m round splash-pool layout with raised perimeter walls, multiple slide stations, and bear-themed visual details',
    purpose: 'The shallow pool-style layout creates a bright, self-contained water-play focal point for managed summer events, resort programs, and venue activity areas.',
    buyer: 'resorts, water-play venues, holiday parks, event operators, rental businesses, and recreation-project buyers',
    application: 'supervised splash-play programs, seasonal resort activities, family event zones, and temporary water-play installations',
    options: 'pool colorway, slide and entry arrangement, decorative theme, printed branding, overall footprint, blower package, anchoring approach, packing, and accessory set',
    faqQuestions: ['What features are included in this aqua inflatable water park?', 'How much space should I plan for the 16 × 4 m pool layout?', 'Which material is listed for this inflatable water park pool?', 'Can the slides, bear theme, and splash-pool colors be customized?', 'What water, access, and supervision conditions must be confirmed before setup?', 'What project details are needed for a factory quote on this splash and slide water park?'],
  },
  'outdoor-inflatable-water-park': {
    keywords: ['outdoor inflatable water park', 'commercial inflatable water park', 'dual slide inflatable water park', 'water park with slide jump'],
    visual: 'a blue-and-white 16 × 4 m round outdoor water-play pool with multiple slide entries, raised splash walls, and bear-themed exterior artwork',
    purpose: 'The multi-entry pool format gives operators a visible outdoor water attraction that can be planned around guest circulation, timed sessions, and a supervised seasonal program.',
    buyer: 'outdoor recreation venues, water parks, resorts, campsite operators, municipal event teams, and commercial rental fleets',
    application: 'outdoor water-play zones, resort recreation, summer events, campsite programming, and commercial rental packages',
    options: 'slide count and orientation, entrance and exit flow, color palette, printed artwork, water-play layout, branding, anchors, accessories, and export packing',
    faqQuestions: ['What does the outdoor inflatable water park configuration include?', 'How should operators plan the footprint and access around this pool?', 'Which PVC material specification is listed for this commercial inflatable water park?', 'Can the slide arrangement, colors, or exterior artwork be changed?', 'What site and operating checks are needed for outdoor use?', 'What should I send to request a quote for a dual slide inflatable water park?'],
  },
  'inflatable-water-pyramid-slide': {
    keywords: ['inflatable water pyramid slide', 'water pyramid inflatable', 'inflatable water slide pyramid', 'floating water slide', 'water park pyramid slide'],
    cardSummary: 'Pyramid climb-and-slide attraction for supervised lake, resort, and aqua-park sessions. Custom landing layout available.',
    visual: 'a 6.5 × 6.5 × 4 m blue-and-orange pyramid water attraction with opposing climb lanes, a central elevated platform, handrails, a slide descent, and a striped floating landing pad',
    purpose: 'The multi-level pyramid layout combines climbing, a high platform, slide descent, and a separate landing section, giving aquatic venues a focal water challenge instead of a simple flat obstacle.',
    buyer: 'aqua parks, lake and resort operators, beach activity businesses, water-sports rental fleets, and commercial floating-attraction buyers',
    application: 'managed floating water-slide sessions, resort water recreation, lake activity zones, beach attractions, and commercial water park programs',
    options: 'climb and slide orientation, platform access, landing-pad arrangement, color blocks, printed branding, connection points, anchoring plan, accessories, and export packing',
    faqQuestions: ['What activities are shown on this inflatable water pyramid slide?', 'How should an operator plan the 6.5 × 6.5 × 4 m water pyramid inflatable footprint?', 'Which material is listed for this floating water slide?', 'Can the climbing lanes, slide direction, landing pad, and colors be customized?', 'What anchoring, access, and supervision arrangements are needed for a water park pyramid slide?', 'What details should I send for an inflatable water slide pyramid factory quote?'],
  },
  'inflatable-water-iceberg': {
    keywords: ['inflatable water iceberg', 'inflatable iceberg water park', 'iceberg inflatable climbing wall', 'floating iceberg inflatable', 'water iceberg for sale'],
    cardSummary: 'Stepped floating iceberg for supervised climbing and water-park play. Configure colors, handholds, and anchor points.',
    visual: 'a 6 × 4 × 3 m floating iceberg-style climbing attraction with four stacked red-and-yellow cylindrical steps, side climbing frames, grab handles, and green top rails',
    purpose: 'The stepped iceberg silhouette creates a clear climb-and-traverse challenge for supervised water recreation, with multiple visible handhold zones rather than a slide-only activity.',
    buyer: 'water parks, resort pools, lake activity operators, camps, aquatic-event companies, and floating-attraction distributors',
    application: 'supervised iceberg climbing sessions, lake and pool recreation, resort activity schedules, summer camps, and floating water-park programs',
    options: 'step layout, side-frame angle, handle placement, top-rail treatment, colors, printed graphics, anchor points, repair kit, and transport packing',
    faqQuestions: ['What climbing features are visible on this inflatable water iceberg?', 'How can a venue plan the 6 × 4 × 3 m floating iceberg inflatable?', 'What PVC material specification is listed for this iceberg inflatable climbing wall?', 'Can the steps, side climbing frames, handles, and colors be customized?', 'What water-area, anchoring, and supervision checks should operators prepare?', 'What information is needed to quote an inflatable iceberg water park attraction?'],
  },
  'inflatable-water-blob-for-sale': {
    keywords: ['inflatable water blob for sale', 'inflatable water blob', 'giant water blob', 'water blob inflatable', 'inflatable blob water toy'],
    cardSummary: 'Oversized floating water blob for supervised lake, resort, and camp recreation. Custom colors and attachment points.',
    visual: 'a 7 × 3 m striped red, yellow, and blue inflatable water blob with a rounded wedge profile, broad buoyant body, and visible perimeter attachment points',
    purpose: 'The oversized rounded blob format is a stand-alone floating water-play element for a managed aquatic setup. It should be planned around the final anchoring, entry method, water conditions, and approved operating procedure rather than treated as a generic land inflatable.',
    buyer: 'lake recreation operators, resorts, camps, water-activity rental businesses, floating-play suppliers, and commercial aquatic-project buyers',
    application: 'managed water-play zones, resort recreation, camp activity programs, lake attractions, and commercial floating-inflatable rental fleets',
    options: 'blob length and profile, color bands, printed logos, entry or connection details, attachment points, anchoring plan, accessory package, and packing configuration',
    faqQuestions: ['What is this inflatable water blob for sale designed for?', 'How should operators plan the 7 × 3 m giant water blob at a water site?', 'Which material is listed for this water blob inflatable?', 'Can the water blob profile, colors, graphics, and attachment details be customized?', 'What anchoring, water-condition, and supervision procedures should be prepared?', 'What should I include when requesting an inflatable blob water toy factory quotation?'],
  },
};

function newWaterParkProfile(product: Product) {
  return product.category === 'Inflatable Water Park' ? newWaterParkProfiles[product.productSlug] : undefined;
}

type NewThemeParkProfile = {
  coreKeyword: string;
  displayTitle: string;
  keywords: string[];
  visual: string;
  purpose: string;
  buyer: string;
  application: string;
  options: string;
  faqQuestions: string[];
  cardSummary: string;
};

// These image-led profiles keep the folder-name phrase as the canonical
// keyword while giving each new attraction its own factual use case, layout,
// buyer language, and FAQ set. Supporting phrases are descriptive variants,
// not replacement primary keywords.
const newThemeParkProfiles: Record<string, NewThemeParkProfile> = {
  'kids-inflatable-amusement-park': {
    coreKeyword: 'kids inflatable amusement park',
    displayTitle: 'Kids Inflatable Amusement Park',
    keywords: ['kids inflatable amusement park', 'commercial inflatable play park', 'food truck themed inflatable playground', 'inflatable slide and climbing wall combo'],
    visual: 'a 12 × 12 m fenced play park with a yellow food-truck facade, center climbing wall and slide, bounce enclosure, flower arch, and music-character landmark',
    purpose: 'The multi-zone layout combines jumping, climbing, sliding, and open play in one themed footprint, giving venue operators a recognizable small amusement-park attraction rather than a single-feature bouncer.',
    buyer: 'family entertainment centers, indoor playground operators, mall-event teams, parks, and commercial rental companies',
    application: 'indoor play zones, mall promotions, family events, seasonal activity parks, and supervised rental programs',
    options: 'food-truck artwork, climbing-wall and slide position, fence layout, character details, color palette, logo panels, footprint, and guest-flow plan',
    faqQuestions: ['Which play zones are shown in this kids inflatable amusement park?', 'How should a venue plan the 12 × 12 m kids inflatable amusement park footprint?', 'What material is listed for this food-truck themed inflatable playground?', 'Can the food-truck facade, flower arch, and activity layout be customized?', 'How should entry, exit, and supervision be organized for a multi-zone play park?', 'What details are needed for a kids inflatable amusement park factory quote?'],
    cardSummary: 'A commercial kids inflatable amusement park with food-truck artwork, climbing, slide, bounce, and fenced open-play zones.',
  },
  'ocean-bouncy-castle': {
    coreKeyword: 'ocean bouncy castle',
    displayTitle: 'Ocean Bouncy Castle',
    keywords: ['ocean bouncy castle', 'shark inflatable bounce house', 'ocean themed bounce house with slide', 'commercial sea life inflatable playground'],
    visual: 'a 6 × 12 × 5.5 m ocean-play combo with shark, dolphin, whale, and palm-tree details, a front play area, climbing access, and side slide lanes',
    purpose: 'The sea-life scene gives rental and venue buyers an immersive ocean theme while the visible climb-and-slide arrangement adds more activity than a standard bounce-only castle.',
    buyer: 'party rental fleets, family entertainment centers, resorts, aquariums, and seasonal event operators',
    application: 'ocean-themed parties, family events, resort kids programs, indoor play sessions, and supervised commercial rentals',
    options: 'shark and sea-life graphics, slide orientation, climbing route, palm details, colors, logo placement, size, and entrance treatment',
    faqQuestions: ['What ocean features are included in this ocean bouncy castle?', 'How should I plan the 6 × 12 × 5.5 m shark inflatable bounce house footprint?', 'Which PVC construction is listed for this sea-life inflatable playground?', 'Can the shark, dolphin, whale, and palm artwork be changed for a custom project?', 'Is the ocean themed bounce house with slide suitable for rental fleets and venue programs?', 'What should buyers send to request an ocean bouncy castle quotation?'],
    cardSummary: 'Ocean bouncy castle with shark and sea-life artwork, climb access, side slides, and a commercial multi-play layout.',
  },
  'superhero-bounce-house-for-sale': {
    coreKeyword: 'superhero bounce house for sale',
    displayTitle: 'Superhero Bounce House for Sale',
    keywords: ['superhero bounce house for sale', 'hero themed inflatable bounce house', 'superhero bounce house with slide', 'commercial character bounce house combo'],
    visual: 'a 6 × 5 × 3.8 m character-hero combo with illustrated comic-style panels, a front bounce chamber, a large arched entry, and a side climbing-and-slide section',
    purpose: 'The bold comic-inspired visual treatment creates a clear hero-party attraction, while the bounce and slide functions support a higher-value commercial rental or venue package.',
    buyer: 'party rental companies, family entertainment centers, birthday-event suppliers, and commercial play venues',
    application: 'hero-themed parties, birthday rentals, school events, family entertainment zones, and supervised venue sessions',
    options: 'approved character-inspired artwork, panel graphics, entry arch, slide and climb layout, colors, branded banners, dimensions, and accessories',
    faqQuestions: ['What play features are shown on this superhero bounce house for sale?', 'How much room should I allow for the 6 × 5 × 3.8 m hero themed inflatable bounce house?', 'What material is specified for this superhero bounce house with slide?', 'Can I customize the artwork, hero color palette, and banner panels?', 'Which buyers commonly add a commercial character bounce house combo to their rental lineup?', 'What information is required for a superhero bounce house for sale quotation?'],
    cardSummary: 'Superhero bounce house for sale with comic-style panels, bounce space, arched entry, climbing route, and slide.',
  },
  'super-mario-bounce-house': {
    coreKeyword: 'super mario bounce house',
    displayTitle: 'Super Mario Bounce House',
    keywords: ['super mario bounce house', 'character themed bounce house with slide', 'cartoon inflatable bounce house combo', 'commercial kids bouncy castle'],
    visual: 'a 6 × 7 × 5.5 m colorful character-themed combo with a front bounce chamber, animal artwork, a climbing wall, a broad slide, and raised character figures',
    purpose: 'The bright character-led presentation gives operators a familiar game-inspired theme, while the bounce, climb, and slide sequence supports repeat play in commercial party and family-entertainment programs.',
    buyer: 'party rental fleets, family entertainment centers, birthday-event businesses, and indoor play operators',
    application: 'character-themed birthdays, indoor play programs, school celebrations, family events, and commercial rentals',
    options: 'approved character-inspired graphics, climb-and-slide arrangement, animal side panels, colors, entrance design, logo placement, and custom dimensions',
    faqQuestions: ['What activity sequence is shown on this super mario bounce house?', 'How should buyers use the 6 × 7 × 5.5 m reference size when planning a venue?', 'Which material is listed for this cartoon inflatable bounce house combo?', 'Can the character-inspired theme and animal artwork be adapted for a custom order?', 'What supervision and access details should be planned for the climbing wall and slide?', 'What should I send to request a super mario bounce house factory quote?'],
    cardSummary: 'Super Mario bounce house with a character-themed bounce chamber, climbing wall, broad slide, and colorful multi-play facade.',
  },
  'outer-space-bounce-house': {
    coreKeyword: 'outer space bounce house',
    displayTitle: 'Outer Space Bounce House',
    keywords: ['outer space bounce house', 'astronaut inflatable bounce house', 'space themed bouncy castle', 'commercial space obstacle course inflatable'],
    visual: 'a 7 × 6 × 4 m outer-space obstacle play field with astronaut and rocket-tower details, a wide open bounce area, a central tunnel route, and inflated red barriers',
    purpose: 'The astronaut-and-rocket setting creates a strong space destination for children, while the open field and tunnel-style obstacles support active supervised play rather than a basic enclosed bounce unit.',
    buyer: 'party rental businesses, science-center event teams, family entertainment centers, schools, and attraction operators',
    application: 'space-themed parties, STEM or school events, indoor activity zones, mall promotions, and supervised rental programs',
    options: 'astronaut and rocket artwork, obstacle route, tunnel openings, barrier layout, colors, custom graphics, logo panels, and footprint',
    faqQuestions: ['What obstacle features are shown in this outer space bounce house?', 'How should I plan the 7 × 6 × 4 m astronaut inflatable bounce house footprint?', 'What material is specified for this space themed bouncy castle?', 'Can the astronaut, rocket towers, and tunnel route be customized?', 'Which venues suit a commercial space obstacle course inflatable?', 'What project information is needed for an outer space bounce house quote?'],
    cardSummary: 'Outer space bounce house with astronaut and rocket details, an open bounce field, tunnel route, and inflatable obstacle barriers.',
  },
};

function newThemeParkProfile(product: Product) {
  return product.category === 'Inflatable Theme Park' ? newThemeParkProfiles[product.productSlug] : undefined;
}

type WaterSlideProfile = {
  keywords: string[];
  wetUse?: boolean;
  visual: string;
  purpose: string;
  buyer: string;
  application: string;
  options: string;
  customizationFocus: string;
  faqQuestions?: string[];
  cardSummary: string;
};

// These profiles follow the supplied image set rather than the legacy folder
// wording. Each page receives one distinct core keyword and a topic-specific
// supporting set so tropical, princess, jungle, pool, and lane intent do not
// collapse into one repeated water-slide page.
const waterSlideProfiles: Record<string, WaterSlideProfile> = {
  'super-mario-inflatable-slide': {
    keywords: ['mario inflatable slide', 'inflatable dry slide', 'commercial inflatable slide', 'giant inflatable slide', 'bounce n slide'],
    wetUse: false,
    visual: 'a tall red-and-blue character-themed inflatable slide with three narrow slide lanes, a bright front activity area, a striped entry arch, and game-inspired character figures above the slide',
    purpose: 'The tall three-lane format and colorful game-inspired facade create a high-visibility dry-slide attraction for commercial party rentals, family events, and supervised venue programs.',
    buyer: 'party-rental companies, family entertainment centers, event agencies, schools, and commercial inflatable distributors',
    application: 'character-themed birthday events, school activity days, family entertainment venues, outdoor celebrations, and commercial rental programs',
    options: 'approved character-inspired artwork, slide-lane count, front activity area, color palette, entry arch, logo panels, access route, blower package, and export packing',
    customizationFocus: 'approved character-inspired graphics, triple-slide layout, color treatment, front play area, branded panels, access direction, and commercial accessories',
    faqQuestions: ['What features are included in this mario inflatable slide?', 'How should a venue plan the 13 x 5 x 9 m mario slide footprint and overhead clearance?', 'Which material is specified for this commercial inflatable slide?', 'Can the character-inspired artwork, three slide lanes, and front activity area be customized?', 'What dry-slide access, queue, anchoring, and supervision checks should operators prepare?', 'What information is needed for a mario inflatable slide factory quotation?'],
    cardSummary: 'Mario inflatable slide with a tall three-lane dry slide, colorful game-inspired figures, striped entry arch, and front activity area.',
  },
  'giant-inflatable-pirate-ship-slide': {
    keywords: ['pirate inflatable slide', 'pirate ship slide', 'pirate bounce house with slide', 'dual slide bounce house', 'jump n slide'],
    wetUse: false,
    visual: 'a pirate-themed inflatable with a large camouflage-print arch, pirate captain figure, ship-and-cannon artwork, a raised climb section, and two red slide lanes',
    purpose: 'The ship, captain, cannon, and dual-slide details give rental fleets and event venues a recognizable pirate attraction with two visible descent lanes for supervised group play.',
    buyer: 'party-rental businesses, family entertainment centers, event operators, schools, resorts, and commercial inflatable distributors',
    application: 'pirate-themed parties, family festivals, school events, resort kids programs, indoor play venues, and rental packages',
    options: 'pirate captain and ship artwork, camouflage arch treatment, dual-slide configuration, climb route, colors, logo panels, anchoring, accessories, and export packing',
    customizationFocus: 'pirate ship graphics, captain and cannon details, dual-slide arrangement, branded artwork panels, colorway, climb route, and commercial accessories',
    faqQuestions: ['What is included in this pirate inflatable slide?', 'How should buyers plan the 8 x 4.5 x 6 m pirate ship slide footprint?', 'Which material is specified for this pirate bounce house with slide?', 'Can the pirate captain, ship artwork, camouflage arch, and dual-slide layout be customized?', 'What entry, run-out, queue, anchoring, and supervision checks are needed for a dual slide bounce house?', 'What should buyers send for a pirate inflatable slide factory quote?'],
    cardSummary: 'Pirate inflatable slide with captain and ship artwork, a camouflage arch, climbing access, and two red slide lanes.',
  },
  'inflatable-pirate-ship-slide-commercial': {
    keywords: ['inflatable pirate ship slide', 'pirate ship slide', 'pirate slide', 'inflatable slide rental', 'jump and slide'],
    wetUse: false,
    visual: 'an orange pirate-ship slide with a raised mast, skull-and-crossbones artwork, ship windows, and a front slide lane',
    purpose: 'The pirate-ship structure gives rental fleets and family venues a recognizable dry-slide attraction with strong visual merchandising and a clear climb-to-slide route.',
    buyer: 'party-rental businesses, family entertainment centers, event operators, and commercial inflatable distributors',
    application: 'pirate-themed birthday rentals, indoor play venues, community events, and supervised family recreation',
    options: 'pirate artwork, mast and ship details, slide height, colors, logo panels, access route, anchoring, blower package, and export packing',
    customizationFocus: 'pirate graphics, ship colors, mast details, slide profile, logo placement, access layout, and commercial accessories',
    faqQuestions: ['What is this inflatable pirate ship slide designed for?', 'How should a venue plan the 10 x 4 x 5 m pirate slide footprint?', 'Which material is listed for this pirate ship slide?', 'Can the pirate artwork, ship details, and layout be customized?', 'What setup and supervision checks should operators prepare?', 'What information is needed for an inflatable pirate ship slide quotation?'],
    cardSummary: 'Inflatable pirate ship slide with a raised mast, nautical artwork, and a commercial climb-to-slide route.',
  },
  'pirate-ship-jumping-castle': {
    keywords: ['pirate ship jumping castle', 'pirate ship slide', 'jumping castle with slide', 'bounce house with slide', 'jump and slide'],
    wetUse: false,
    visual: 'a large orange pirate ship jumping castle with a climbing wall, yellow slide lanes, mast, pirate character, and ship bow artwork',
    purpose: 'This pirate ship jumping castle combines enclosed bounce space with a climb-and-slide layout for themed rental inventory and family entertainment programs.',
    buyer: 'bounce-house rental companies, family entertainment centers, event planners, and wholesale inflatable buyers',
    application: 'pirate birthday parties, school fairs, indoor play programs, resort kids activities, and supervised event rentals',
    options: 'bounce chamber, pirate ship artwork, climbing route, slide lanes, mast and bow details, colors, logos, anchoring, and packing',
    customizationFocus: 'pirate ship graphics, jumping-castle layout, slide and climb arrangement, printed branding, color palette, and accessories',
    faqQuestions: ['What is this pirate ship jumping castle designed for?', 'How should buyers plan the 10 x 4 x 5 m jumping castle footprint?', 'Which material is listed for this pirate ship jumping castle?', 'Can the pirate ship artwork, bounce area, and slide layout be customized?', 'What access, anchoring, and supervision details should be confirmed?', 'What should I send for a pirate ship jumping castle factory quote?'],
    cardSummary: 'Pirate ship jumping castle with bounce space, climbing access, and bright yellow slide lanes.',
  },
  'giant-pirate-ship-inflatable': {
    keywords: ['giant pirate ship inflatable', 'pirate ship slide', 'giant inflatable slide rental', 'inflatable slide rental', 'big inflatable slide rental'],
    wetUse: false,
    visual: 'a giant red, blue, and yellow pirate-ship inflatable with multiple slide lanes, cannons, ship windows, and a raised bow',
    purpose: 'The giant pirate-ship format is a high-visibility commercial attraction for operators that need a larger themed footprint and multiple participant routes.',
    buyer: 'large rental fleets, family entertainment centers, resorts, event operators, and commercial inflatable dealers',
    application: 'large birthday events, family festivals, resort recreation, indoor play centers, and high-throughput rental packages',
    options: 'lane count, ship silhouette, cannon and window details, climbing access, colors, logo panels, anchoring, blower package, and export packing',
    customizationFocus: 'large-format pirate artwork, lane arrangement, ship details, branded panels, access direction, and commercial accessories',
    faqQuestions: ['What is this giant pirate ship inflatable designed for?', 'How should a venue plan the 10 x 5 x 6.24 m giant slide footprint?', 'Which material is listed for this giant pirate ship inflatable?', 'Can the slide lanes, ship artwork, and branding be changed?', 'What installation, queue, and supervision planning is required?', 'What details help quote a giant inflatable slide rental project?'],
    cardSummary: 'Giant pirate ship inflatable with multiple slide routes, ship details, and a high-visibility commercial footprint.',
  },
  'inflatable-soccer-slide': {
    keywords: ['inflatable soccer slide', 'bounce and slide', 'inflatable slide rental', 'jump and slide', 'soccer theme inflatable slide'],
    wetUse: false,
    visual: 'a green soccer-themed inflatable with a tall climb-and-slide face, football graphics, goal-style panels, and a contained play base',
    purpose: 'The soccer theme turns a standard inflatable slide into a sports-led attraction for clubs, schools, rental fleets, and event programs.',
    buyer: 'party-rental businesses, sports clubs, schools, family venues, and commercial inflatable distributors',
    application: 'soccer tournaments, school carnivals, sports festivals, birthday rentals, and supervised family events',
    options: 'soccer artwork, ball graphics, climb and slide arrangement, color palette, logo panels, access route, anchoring, and packing',
    customizationFocus: 'soccer graphics, team colors, goal or ball artwork, slide profile, sponsor panels, and event accessories',
    faqQuestions: ['What is this inflatable soccer slide designed for?', 'How should buyers plan the 10 x 7 x 6.5 m soccer slide footprint?', 'Which material is listed for this soccer theme inflatable slide?', 'Can team colors, football artwork, and sponsor panels be customized?', 'What access, anchoring, and supervision checks matter for sports events?', 'What information is needed for an inflatable soccer slide quote?'],
    cardSummary: 'Inflatable soccer slide with football graphics, a tall climb route, and a sports-event-ready layout.',
  },
  'obstacle-course-bounce-house-with-slide': {
    keywords: ['obstacle course bounce house with slide', 'bounce house and slide', 'bounce house with slide', 'jump and slide', 'inflatable slide rental'],
    wetUse: false,
    visual: 'a black-and-yellow obstacle-style inflatable with a steep climb, safety netting, slide lane, and side challenge sections',
    purpose: 'This obstacle course bounce house with slide combines challenge movement and a finishing slide for supervised rental sessions and active event programming.',
    buyer: 'commercial rental fleets, family entertainment centers, school event planners, and inflatable wholesalers',
    application: 'team challenges, school fairs, active birthday parties, indoor play programs, and commercial rental bookings',
    options: 'obstacle sequence, climb angle, slide lane, netting, colors, printed branding, entry and exit, anchoring, and packing',
    customizationFocus: 'obstacle layout, black-yellow artwork, slide finish, branded panels, participant flow, and commercial accessories',
    faqQuestions: ['What is this obstacle course bounce house with slide designed for?', 'How should buyers plan the 12 x 3.4 x 5.8 m obstacle footprint?', 'Which material is listed for this obstacle course bounce house with slide?', 'Can the obstacles, slide, colors, and branding be customized?', 'What participant flow, anchoring, and supervision checks are needed?', 'What should I send for an obstacle course bounce house with slide quotation?'],
    cardSummary: 'Obstacle course bounce house with slide, climbing challenge, safety netting, and commercial event flow.',
  },
  'inflatable-jungle-slide-commercial': {
    keywords: ['inflatable jungle slide', 'giant inflatable slide rental', 'inflatable slide rental', 'bounce and slide', 'jungle theme inflatable slide'],
    wetUse: false,
    visual: 'a giant jungle inflatable with a leopard-themed slide face, palm details, monkey figures, and a large enclosed play base',
    purpose: 'The giant jungle theme gives resorts, rental operators, and family venues a high-impact animal attraction with a clear climb-to-slide route.',
    buyer: 'commercial rental businesses, resorts, family entertainment centers, event operators, and inflatable distributors',
    application: 'jungle parties, resort children activities, family festivals, indoor play centers, and large rental packages',
    options: 'jungle artwork, animal figures, palm details, slide height, play-base layout, logo panels, anchoring, and export packing',
    customizationFocus: 'leopard and jungle graphics, animal sculptures, palm accents, slide profile, branded panels, and venue-specific layout',
    faqQuestions: ['What is this inflatable jungle slide designed for?', 'How should a venue plan the 17 x 6.5 x 10 m jungle slide footprint?', 'Which material is listed for this giant inflatable slide?', 'Can the jungle animals, artwork, colors, and slide layout be customized?', 'What large-site access, anchoring, and supervision planning is required?', 'What information is needed for a giant inflatable slide rental quote?'],
    cardSummary: 'Giant inflatable jungle slide with leopard artwork, animal figures, palm details, and a large play base.',
  },
  'safari-bouncy-castle': {
    keywords: ['safari bouncy castle', 'jumping castle with slide', 'bounce house with slide', 'party slide', 'inflatable slide rental'],
    wetUse: false,
    visual: 'a green safari bouncy castle with elephant, giraffe, lion, palm-tree artwork, and bright yellow slide lanes',
    purpose: 'The safari bouncy castle creates an animal-themed bounce-and-slide attraction for family events, rental catalogs, and supervised venue play.',
    buyer: 'party-rental companies, schools, family entertainment centers, resorts, and commercial inflatable suppliers',
    application: 'safari birthday parties, school fairs, community events, resort kids programs, and indoor family play',
    options: 'safari animals, palm artwork, bounce chamber, slide lanes, colors, logo panels, access, anchoring, and packing',
    customizationFocus: 'animal artwork, safari color palette, bounce and slide arrangement, printed branding, access layout, and accessories',
    faqQuestions: ['What is this safari bouncy castle designed for?', 'How should buyers plan the 7 x 4 x 5.5 m safari footprint?', 'Which material is listed for this safari bouncy castle?', 'Can the safari animals, palm details, and slide layout be customized?', 'What indoor or outdoor access, anchoring, and supervision checks matter?', 'What should I include in a safari bouncy castle quotation request?'],
    cardSummary: 'Safari bouncy castle with elephant, giraffe, lion, palm artwork, and bright slide lanes.',
  },
  'candy-bounce-house': {
    keywords: ['candy bounce house', 'bounce and slide', 'jump and slide', 'party slide', 'inflatable slide rental'],
    wetUse: false,
    visual: 'a candy-themed inflatable with pastel pink, orange, and cream slide lanes, lollipop details, and a rounded front play area',
    purpose: 'The candy theme provides a colorful, photo-friendly bounce-and-slide attraction for birthday rentals, family venues, and event packages.',
    buyer: 'party-rental fleets, family entertainment centers, event planners, resorts, and commercial inflatable distributors',
    application: 'candy-themed birthdays, dessert events, indoor play programs, family festivals, and supervised rental sessions',
    options: 'candy graphics, lollipop and sweet details, slide lanes, bounce area, colors, branding, access, anchoring, and packing',
    customizationFocus: 'candy artwork, pastel palette, slide and bounce layout, printed logos, photo points, and commercial accessories',
    faqQuestions: ['What is this candy bounce house designed for?', 'How should a venue plan the 7 x 4 x 6 m candy bounce house footprint?', 'Which material is listed for this candy bounce house?', 'Can the candy artwork, colors, bounce area, and slide lanes be customized?', 'What event access, anchoring, and supervision checks should be prepared?', 'What information is needed for a candy bounce house factory quote?'],
    cardSummary: 'Candy bounce house with pastel slide lanes, sweet-themed artwork, and a colorful event-ready play base.',
  },
  'spiderman-inflatable-water-slide': {
    keywords: ['spiderman inflatable water slide', 'spiderman bounce house with slide', 'spiderman bouncy castle with slide', 'inflatable slide rental', 'bounce house with slide'],
    visual: 'a red-and-blue superhero-themed inflatable with a Spider-Man figure, comic-style character panels, central climb, and slide lanes',
    purpose: 'The superhero artwork gives rental fleets and family venues a recognizable character-led slide attraction; the final wet or dry configuration should follow the approved specification.',
    buyer: 'party-rental businesses, family entertainment centers, resorts, event planners, and commercial inflatable dealers',
    application: 'superhero birthday parties, comic-themed events, indoor play programs, resort kids activities, and supervised rentals',
    options: 'superhero artwork, character panels, climb and slide arrangement, approved wet or dry finish, colors, logos, anchoring, and packing',
    customizationFocus: 'superhero graphics, red-blue colorway, character panels, slide profile, branding, wet or dry specification, and accessories',
    faqQuestions: ['What is this spiderman inflatable water slide designed for?', 'How should buyers plan the 7 x 4 x 6 m superhero slide footprint?', 'Which material is listed for this spiderman inflatable water slide?', 'Can the superhero artwork, character panels, and slide layout be customized?', 'What wet or dry setup, access, and supervision checks should be confirmed?', 'What should I send for a spiderman inflatable water slide quotation?'],
    cardSummary: 'Spiderman inflatable water slide with red-blue superhero artwork, central climb, and slide lanes.',
  },
  'patriotic-water-slide': {
    keywords: ['patriotic water slide', 'commercial water slide', 'inflatable water slide for sale', 'red white blue water slide', 'summer inflatable water slides'],
    visual: 'a long red, white, and blue single-lane slide with a patriotic stars-and-stripes style finish and a defined run-out lane',
    purpose: 'The long patriotic colorway creates a high-visibility wet-play attraction for seasonal U.S.-themed events, resort programs, and supervised rental inventory.',
    buyer: 'party-rental businesses, holiday-event organizers, resorts, parks, and commercial inflatable distributors',
    application: 'Fourth of July programming, summer community events, resort recreation, and supervised wet-slide rental packages',
    options: 'slide length, red-white-blue artwork, logo panels, water-flow connection, landing treatment, access direction, anchoring, repair kit, and export packing',
    customizationFocus: 'patriotic color blocking, star graphics, logo placement, slide length, landing or pool treatment, and accessory package',
    faqQuestions: ['What is this patriotic water slide designed for?', 'How should a venue plan the 15 × 3 × 7 m patriotic slide footprint?', 'Which material is listed for this commercial water slide?', 'Can the red, white, and blue artwork be customized?', 'What wet-use and event-operation checks should be prepared?', 'What should I send for a patriotic water slide factory quotation?'],
    cardSummary: 'Patriotic red, white, and blue water slide for summer events and commercial rental fleets.',
  },
  'inflatable-tropical-wet-dry-slide-manufacturer': {
    keywords: ['wet dry water slide', 'tropical water slide', 'inflatable water slide with pool', 'commercial water slide', 'wet dry inflatable slide'],
    visual: 'a compact tropical slide with palm-tree artwork, a single slide lane, and a small integrated pool finish',
    purpose: 'The compact palm-tree format gives rental businesses and venue operators a theme-led slide-and-pool attraction for managed seasonal recreation.',
    buyer: 'party-rental fleets, hotels, pool venues, family entertainment operators, and inflatable wholesalers',
    application: 'backyard-scale rental packages, hotel activity areas, poolside events, and supervised summer play',
    options: 'wet or dry project configuration, palm artwork, splash-pool layout, colors, printed logos, water inlet, anchoring, blower package, and packing',
    customizationFocus: 'tropical palm graphics, pool-finish geometry, water-flow connection, colors, logo panels, and transport accessories',
    faqQuestions: ['What is this wet dry water slide designed for?', 'How should buyers use the 6.2 × 2.8 × 4 m reference size when planning a site?', 'Which material is listed for this tropical water slide?', 'Can the palm-tree artwork and splash-pool layout be customized?', 'What should operators confirm for wet-use and dry-use planning?', 'What information is needed for a wet dry inflatable slide quotation?'],
    cardSummary: 'Compact tropical wet dry water slide with palm artwork and an integrated pool finish.',
  },
  'inflatable-frozen-princess-slide-combo': {
    keywords: ['princess water slide', 'inflatable princess water slide', 'frozen princess slide combo', 'commercial water slides for sale', 'inflatable water slide with pool'],
    visual: 'an ice-blue princess castle slide combo with a central slide, enclosed play structure, and pool-finish area',
    purpose: 'The ice-princess castle appearance combines a recognizable themed attraction with a slide-and-pool layout for supervised family entertainment and rental programs.',
    buyer: 'party-rental companies, family entertainment centers, resorts, event planners, and commercial inflatable dealers',
    application: 'princess parties, family events, summer rentals, resort kids programs, and supervised venue play',
    options: 'approved princess artwork, castle towers, slide and pool arrangement, colors, logo panels, entry layout, accessories, and packing',
    customizationFocus: 'princess theme artwork, castle details, color palette, logo printing, entry and slide layout, and pool treatment',
    faqQuestions: ['What is this princess water slide combo designed for?', 'How should a venue plan the 6.3 × 5.7 × 5 m princess slide footprint?', 'Which material is listed for this inflatable princess water slide?', 'Can the ice-princess artwork and castle layout be customized?', 'What supervision and wet-play checks should be considered?', 'What should buyers include in a frozen princess slide combo quotation request?'],
    cardSummary: 'Ice-princess water slide combo with castle styling, enclosed play space, and pool finish.',
  },
  'commercial-grade-inflatable-jungle-waterslide': {
    keywords: ['inflatable jungle water slide', 'jungle water slide', 'commercial water slide', 'palm tree inflatable water slide', 'inflatable water slide with pool'],
    visual: 'a green jungle-themed single-lane water slide with palm-tree details, leafy side artwork, and a pool finish',
    purpose: 'The jungle-and-palm visual treatment creates a nature-themed water-slide option for buyers who need a distinct alternative to generic bright-color rental units.',
    buyer: 'commercial rental companies, resorts, jungle-themed event planners, family venues, and inflatable distributors',
    application: 'jungle parties, resort children’s activities, seasonal rental packages, poolside events, and family entertainment venues',
    options: 'jungle graphics, palm-tree details, slide height, pool or landing finish, colors, logo panels, water inlet, anchoring, and export packing',
    customizationFocus: 'jungle leaves, palm details, green color treatment, printed branding, slide configuration, pool finish, and accessories',
    faqQuestions: ['What is this inflatable jungle water slide designed for?', 'How should buyers plan the 6.4 × 3 × 4 m jungle water-slide layout?', 'Which material is listed for this commercial jungle water slide?', 'Can the palm-tree and jungle artwork be customized?', 'What water, drainage, and inspection details should be checked?', 'What should I include in an inflatable jungle water slide quote request?'],
    cardSummary: 'Commercial jungle water slide with palm-tree artwork, single lane, and pool finish.',
  },
  'summer-water-park-inflatable': {
    keywords: ['summer inflatable water slides', 'dual lane water slide', 'double water slide', 'commercial water slide', 'inflatable water slide with pool'],
    visual: 'a tall blue-and-gray dual-slide attraction with two parallel lanes and a round pool landing area',
    purpose: 'The two-lane configuration is designed for visible side-by-side slide sessions where the actual site can support separate rider flow and a shared pool landing.',
    buyer: 'resorts, event operators, commercial rental fleets, water-activity suppliers, and seasonal recreation venues',
    application: 'summer event programs, resort recreation, dual-lane rental packages, and supervised poolside attractions',
    options: 'lane count, slide height, pool geometry, colors, logo panels, water-flow routing, access stairs, anchoring, and export packing',
    customizationFocus: 'dual-lane layout, pool finish, blue-gray colorway, logo graphics, access route, and operational accessory package',
    faqQuestions: ['What is this summer inflatable water slide designed for?', 'Does the 8 × 4.3 × 6 m layout suit a dual lane water slide site?', 'Which material is listed for this double water slide?', 'Can the two slide lanes and pool finish be customized?', 'What guest-flow and wet-operation planning is needed?', 'What should a buyer provide for a summer inflatable water slide quotation?'],
    cardSummary: 'Tall dual-lane summer water slide with two racing lanes and a round pool landing.',
  },
  'inflatable-tropical-multi-lane-water-slide-for-sale': {
    keywords: ['tropical multi-lane water slide', 'double water slide', 'tropical water slide', 'commercial water slides for sale', 'inflatable water slide with pool'],
    visual: 'a wide tropical palm-tree slide with multiple visible lanes, bright blue-and-yellow accents, and a pool-finish area',
    purpose: 'The wide tropical layout is intended for operators that want a multi-lane water-slide focal point and have enough site width for managed participant flow.',
    buyer: 'commercial water-slide rental businesses, resorts, water venues, event operators, and wholesale inflatable buyers',
    application: 'tropical event packages, multi-lane summer rentals, resort activity zones, and supervised outdoor water recreation',
    options: 'lane configuration, palm-tree artwork, colors, pool or landing geometry, logo printing, water routing, stair position, anchoring, and packing',
    customizationFocus: 'multi-lane race format, tropical palms, color palette, pool finish, branded panels, and commercial accessories',
    faqQuestions: ['What is this tropical multi-lane water slide designed for?', 'How should buyers assess the 8 × 5.1 × 5 m footprint for a double water slide?', 'Which material is listed for this tropical water slide?', 'Can the palm-tree graphics and lane configuration be customized?', 'What should operators plan for multi-lane participant flow?', 'What information is needed to quote tropical commercial water slides for sale?'],
    cardSummary: 'Wide tropical multi-lane water slide with palm artwork and a pool-finish layout.',
  },
  'blue-tropical-theme-water-slide-with-pool': {
    keywords: ['blue inflatable water slide', 'inflatable water slide with pool', 'tropical water slide', 'commercial water slide', 'blue tropical water slide with pool'],
    visual: 'a blue tropical single-lane water slide with palm accents, a raised climbing entry, and a pool finish',
    purpose: 'The blue tropical format is a compact themed wet-play attraction for operators looking for a low-competition blue inflatable water slide search focus without losing pool and palm relevance.',
    buyer: 'party-rental operators, resorts, pool venues, event companies, and commercial inflatable suppliers',
    application: 'poolside rentals, blue tropical party packages, resort kids activities, and supervised seasonal events',
    options: 'blue colorway, tropical palms, pool finish, slide height, printed logos, water inlet, anchoring, repair kit, and packing',
    customizationFocus: 'blue tropical artwork, palm accents, pool layout, logo panels, access geometry, and water-flow interface',
    faqQuestions: ['What is this blue inflatable water slide designed for?', 'How should a venue plan the 9 × 3 × 5.5 m blue tropical slide footprint?', 'Which material is listed for this inflatable water slide with pool?', 'Can the blue tropical artwork and pool finish be customized?', 'What water supply, drainage, and supervision checks matter?', 'What should I send for a blue inflatable water slide factory quote?'],
    cardSummary: 'Blue tropical water slide with palm accents, raised entry, and integrated pool finish.',
  },
  'palm-tree-inflatable-water-slide-with-pool': {
    keywords: ['palm tree water slide', 'palm tree inflatable water slide', 'inflatable water slide with pool', 'commercial water slides for sale', 'tropical water slide'],
    visual: 'a palm-tree themed single-lane slide with tropical decorative panels, a tall central climb, and a pool finish',
    purpose: 'The palm-tree theme provides a clear tropical visual for rental catalogs, resort activity areas, and buyers seeking a recognizable themed water-slide format.',
    buyer: 'party-rental fleets, beach and resort operators, pool venues, tropical-event planners, and commercial distributors',
    application: 'tropical party rentals, resort recreation, beach-club programs, poolside events, and seasonal family entertainment',
    options: 'palm-tree styling, tropical colors, pool layout, slide height, printed logos, water-flow connection, anchoring, and export packing',
    customizationFocus: 'palm-tree decorations, tropical colors, logo treatment, slide and pool layout, water inlet, and accessory selection',
    faqQuestions: ['What is this palm tree water slide designed for?', 'How should operators plan the 9 × 3 × 5.5 m palm-tree slide footprint?', 'Which material is listed for this palm tree inflatable water slide?', 'Can the palm-tree decorations and tropical artwork be customized?', 'What wet-use setup and storage checks should rental fleets make?', 'What information is needed for a palm tree water slide quotation?'],
    cardSummary: 'Palm tree water slide with tropical panels, tall climb, and a pool-finish layout.',
  },
  'tropical-blow-up-water-slide': {
    keywords: ['tropical blow up water slide', 'blow up water slide', 'commercial water slide', 'inflatable water slide with pool', 'tropical water slide'],
    visual: 'a blue-and-green tropical slide with a long single lane, palm-inspired side decoration, and a defined pool finish',
    purpose: 'The elongated tropical configuration gives commercial buyers a recognizable blow up water slide format for managed rental, resort, and event use.',
    buyer: 'water-slide rental businesses, resorts, event companies, pool operators, and inflatable wholesale buyers',
    application: 'summer rentals, tropical-themed events, resort recreation, poolside activity programs, and supervised outdoor play',
    options: 'tropical color scheme, pool finish, slide profile, palm details, logo printing, water connection, anchoring, repair kit, and packing',
    customizationFocus: 'blue-green tropical artwork, slide profile, pool or landing design, logos, water inlet, and commercial accessory package',
    faqQuestions: ['What is this tropical blow up water slide designed for?', 'How should buyers use the 9 × 4 × 5 m reference footprint when planning?', 'Which material is listed for this commercial blow up water slide?', 'Can the tropical colors, palm details, and pool finish be customized?', 'What wet-use operation and maintenance checks are important?', 'What should I include in a tropical blow up water slide quotation request?'],
    cardSummary: 'Blue-green tropical blow up water slide with a long lane and pool finish.',
  },
  'tropical-theme-inflatable-water-slide': {
    keywords: ['tropical water slide', 'tropical theme inflatable water slide', 'commercial water slide', 'inflatable water slide with pool', 'blow up water slide'],
    visual: 'a red-and-yellow tropical single-lane slide with palm-inspired accents, a tall slide face, and a pool finish',
    purpose: 'The red-and-yellow tropical format gives a rental or venue catalog a warm-color alternative with a distinct theme-led visual identity.',
    buyer: 'commercial rental companies, resorts, pool venues, themed-event planners, and inflatable equipment distributors',
    application: 'tropical party packages, resort recreation, summer event rentals, poolside attractions, and supervised family play',
    options: 'red-yellow tropical artwork, palm accents, slide height, pool finish, logo panels, water routing, anchoring, and export packing',
    customizationFocus: 'warm tropical palette, palm artwork, logo panels, slide and pool treatment, water-flow layout, and accessories',
    faqQuestions: ['What is this tropical water slide designed for?', 'How should a buyer plan the 9 × 4 × 5 m tropical theme slide footprint?', 'Which material is listed for this tropical theme inflatable water slide?', 'Can the red-yellow tropical artwork and pool finish be customized?', 'What site, drainage, and operating details should be confirmed?', 'What information is needed for a tropical water slide factory quotation?'],
    cardSummary: 'Red-yellow tropical water slide with palm-inspired accents and integrated pool finish.',
  },
};

// Earlier published water-slide pages use their own image-led profiles. Do not
// reuse the 10 newly released product keywords above: each legacy page keeps a
// distinct core phrase, while the supporting terms retain the actual visual
// theme and factory/OEM purchase context.
const legacyWaterSlideProfiles: Record<string, WaterSlideProfile> = {
  'commercial-inflatable-pools-for-sale': {
    keywords: ['commercial water slide pool', 'inflatable water slide with pool', 'water slide splash pool', 'water slide pool for sale', 'commercial inflatable pool for water slides'],
    visual: 'a low-profile white rectangular inflatable pool with wide perimeter walls and a shallow open interior',
    purpose: 'The visible product is a commercial inflatable pool component for a water-slide landing, supervised splash area, or custom water-play layout rather than a stand-alone slide.',
    buyer: 'water-slide rental companies, resorts, pool-event operators, commercial water-play suppliers, and OEM buyers',
    application: 'water-slide pool finishes, managed splash areas, resort activity layouts, and commercial event water-play projects',
    options: 'pool length and depth, wall profile, water-slide interface, colors, logo panels, inlet or drainage details, anchoring, and packing',
    customizationFocus: 'pool footprint, water-slide landing interface, wall height, colors, branding, inlet and drainage layout, and accessories',
    cardSummary: 'Commercial inflatable splash pool for water-slide landings and supervised water-play layouts.',
  },
  'dual-lane-inflatable-slip-and-slide-rental': {
    keywords: ['castle water slide inflatable', 'dual lane water slide rental', 'inflatable water slide rental', 'bounce house with water slide', 'water slide splash and slide'],
    visual: 'a blue castle-themed inflatable with bright yellow-red towers, a central slide feature, and a contained pool-style front area',
    purpose: 'The castle silhouette is a themed wet-play combo for supervised rental programs and family venues; the final slide, pool, and play-area scope should follow the approved specification.',
    buyer: 'party-rental companies, family entertainment venues, event operators, and commercial inflatable distributors',
    application: 'castle-themed party rentals, family events, supervised summer play, and venue activity programs',
    options: 'castle towers, lane or slide arrangement, pool finish, colors, logo artwork, entry layout, water connection, and packing',
    customizationFocus: 'castle-theme graphics, tower colors, slide and pool layout, logo panels, water-flow interface, and accessory package',
    cardSummary: 'Castle water-slide inflatable with colorful towers and a contained wet-play finish.',
  },
  'tropical-inflatable-water-slide-commercial': {
    keywords: ['inflatable water slide tropical', 'tropical water slide', 'commercial water slide', 'tropical splash water slide', 'inflatable water slide with pool'],
    visual: 'a green-and-yellow tropical single-lane slide with palm-tree decoration and a broad pool-finish area',
    purpose: 'The bright palm-led layout gives commercial buyers a recognizable tropical water-slide option for managed rental and resort programs.',
    buyer: 'commercial rental fleets, resorts, pool venues, themed-event planners, and inflatable wholesalers',
    application: 'tropical party packages, resort kids activities, seasonal water-slide rentals, and supervised poolside events',
    options: 'tropical palm graphics, slide profile, pool finish, colors, logos, water inlet, anchoring, and export packing',
    customizationFocus: 'palm-tree decoration, tropical color palette, slide height, pool treatment, logos, and wet-use accessories',
    cardSummary: 'Tropical inflatable water slide with palm styling, single lane, and broad pool finish.',
  },
  'tropical-inflatable-water-slide-for-sale': {
    keywords: ['dual water slide', 'commercial water slides for sale', 'tropical splash water slide', 'inflatable water slide with pool', 'tropical double lane water slide'],
    visual: 'a green tropical slide with two parallel slide lanes, palm-tree details, and a shared pool landing',
    purpose: 'The image shows a tropical dual-lane attraction for sites that can support side-by-side rider flow, a wider landing area, and supervised wet operation.',
    buyer: 'resorts, commercial water-slide rental businesses, event operators, pool venues, and wholesale buyers',
    application: 'dual-lane summer rentals, tropical resort recreation, outdoor events, and supervised family water play',
    options: 'dual-lane configuration, palm artwork, pool geometry, colors, logo printing, water routing, anchoring, and packing',
    customizationFocus: 'lane count, palm-tree visuals, tropical colors, shared pool finish, branded panels, and water-flow design',
    cardSummary: 'Tropical double-lane water slide with palm details and shared pool landing.',
  },
  'water-slide-red-and-yellow': {
    keywords: ['blow up water slide for sale', 'commercial water slide', 'water slide splash pool', 'inflatable water slide with pool', 'red and yellow inflatable water slide'],
    visual: 'a red-and-yellow slide with a tall central climb, curved bright-color sidewalls, and a front pool finish',
    purpose: 'The warm red-and-yellow visual creates a distinct bright-color water-slide choice for commercial summer rentals and supervised event play.',
    buyer: 'party-rental operators, water venues, resorts, event companies, and commercial inflatable dealers',
    application: 'summer party rentals, community events, resort recreation, and managed outdoor wet-play sessions',
    options: 'red-yellow colorway, slide height, pool finish, logo panels, water inlet, access direction, anchoring, and export packing',
    customizationFocus: 'bright red-yellow artwork, slide profile, pool layout, logo printing, water-flow connection, and accessories',
    cardSummary: 'Red-and-yellow inflatable water slide with tall climb and a front splash-pool finish.',
  },
  'heavy-duty-inflatable-water-slide': {
    keywords: ['heavy duty inflatable water slide', 'heavy duty water slide', 'commercial water slide', 'double water slide', 'inflatable water slide with pool'],
    visual: 'a tall blue-and-yellow two-lane slide with a broad blue landing and visible commercial-scale sidewalls',
    purpose: 'The large dual-lane profile is suited to commercial water-slide programs that need a substantial visual attraction and an approved wet-use operating plan.',
    buyer: 'commercial rental fleets, resorts, water venues, event operators, and wholesale inflatable suppliers',
    application: 'high-visibility summer rentals, resort programs, managed event attractions, and dual-lane water-slide packages',
    options: 'lane arrangement, slide height, landing treatment, colorway, logos, water routing, reinforcement specification, and packing',
    customizationFocus: 'dual-lane layout, blue-yellow color treatment, slide and landing profile, branding, and commercial accessory package',
    cardSummary: 'Heavy-duty dual-lane inflatable water slide with tall blue-yellow slide profile.',
  },
  'inflatable-pastel-multi-lane-water-slide': {
    keywords: ['pastel triple lane water slide', 'triple lane water slide', 'double water slide', 'inflatable water slide with pool', 'commercial water slides for sale'],
    visual: 'a soft pastel multi-lane slide with pink, yellow, and blue lanes leading into a large white pool base',
    purpose: 'The pastel triple-lane format is a color-led racing attraction for operators planning wider participant flow and a clearly defined pool landing.',
    buyer: 'party-rental fleets, resorts, event planners, family venues, and commercial inflatable distributors',
    application: 'pastel-themed events, multi-lane summer rentals, resort kids programs, and supervised water-slide racing',
    options: 'lane count, pastel palette, pool geometry, logo panels, water connection, access stairs, anchoring, and packing',
    customizationFocus: 'pastel colors, multi-lane arrangement, wide pool finish, printed graphics, water-flow routing, and accessories',
    cardSummary: 'Pastel triple-lane water slide with pink, yellow, and blue racing lanes.',
  },
  'inflatable-dolphin-water-slide': {
    keywords: ['dolphin water slide', 'dolphin inflatable water slide', 'dolphin water slide inflatable', 'commercial water slide', 'inflatable water slide with pool'],
    visual: 'a yellow-and-blue water slide with a large dolphin feature, bright marine artwork, and a pool landing',
    purpose: 'The dolphin feature gives the product a clear marine theme for buyers needing a visual alternative to generic tropical or plain-color water slides.',
    buyer: 'resorts, party-rental companies, water venues, marine-themed event planners, and commercial inflatable suppliers',
    application: 'marine-themed parties, resort water activities, summer rental packages, and supervised family wet play',
    options: 'dolphin sculpture, marine graphics, color treatment, slide and pool arrangement, logos, water inlet, anchoring, and packing',
    customizationFocus: 'dolphin artwork, marine color palette, logo panels, slide profile, pool finish, and water-use accessories',
    cardSummary: 'Dolphin water slide with bright marine artwork and pool-finish layout.',
  },
  'inflatable-double-water-slide-with-splash-pool': {
    keywords: ['double water slide with splash pool', 'double splash water slide', 'dual water slide', 'commercial water slide', 'inflatable water slide with pool'],
    visual: 'a blue-and-red double slide with two parallel lanes and a rounded splash-pool landing',
    purpose: 'The visible two-lane configuration supports side-by-side wet-play sessions when the venue has adequate width, water supply, drainage, and staff supervision.',
    buyer: 'commercial rental companies, resorts, pool venues, event operators, and inflatable wholesalers',
    application: 'double-lane rental packages, resort recreation, summer events, and supervised water-slide races',
    options: 'double-lane width, splash-pool finish, colors, logos, water routing, entry access, anchoring, and export packing',
    customizationFocus: 'two-lane arrangement, rounded splash pool, color graphics, logo panels, water-flow routing, and accessories',
    cardSummary: 'Double water slide with two lanes and a rounded splash-pool landing.',
  },
  'pink-inflatable-pool-slide': {
    keywords: ['pink water slide', 'pink inflatable water slide', 'double water slide', 'inflatable water slide with pool', 'commercial water slide'],
    visual: 'a pink-and-white dual-slide structure with matching pool-style landing areas and a soft color palette',
    purpose: 'The pink colorway offers a targeted visual theme for rental catalogs, themed events, and supervised venue water-play programs.',
    buyer: 'party-rental companies, event stylists, resorts, family venues, and commercial inflatable distributors',
    application: 'pink-themed parties, resort kids events, summer rentals, and supervised poolside attractions',
    options: 'pink color palette, lane arrangement, pool finish, logo panels, water inlet, access steps, anchoring, and packing',
    customizationFocus: 'pink and white artwork, two-lane profile, pool layout, printed branding, water connections, and accessory package',
    cardSummary: 'Pink inflatable water slide with a soft color palette and dual-slide pool finish.',
  },
  'luxury-white-dry-and-wet-slide-with-pool': {
    keywords: ['white inflatable water slide', 'white dry and wet slide with pool', 'dry water slide', 'wet water slide', 'commercial water slide'],
    visual: 'a clean white dual-slide structure with neutral sidewalls, paired lanes, and an open landing area',
    purpose: 'The minimal white appearance supports neutral wedding, luxury-event, and branded venue concepts, subject to an approved wet or dry configuration for the exact model.',
    buyer: 'event-rental companies, wedding planners, resorts, premium party venues, and commercial inflatable buyers',
    application: 'white-event rentals, premium party packages, resort programs, and supervised wet or dry project planning',
    options: 'white finish, lane count, approved wet or dry configuration, landing treatment, logo panels, access, anchoring, and packing',
    customizationFocus: 'neutral white palette, lane arrangement, wet or dry project specification, landing treatment, branding, and accessories',
    cardSummary: 'White dry-and-wet project slide with neutral styling and paired slide lanes.',
  },
  'princess-inflatable-water-slide': {
    keywords: ['princess water slide', 'pink inflatable water slide', 'inflatable water slide with pool', 'commercial water slides for sale', 'pink princess water slide'],
    visual: 'a bright pink princess-style slide with castle-like peaks, a tall central lane, and a pool-finish base',
    purpose: 'The visible pink castle form supports princess-themed rental and family-event programs, with the final decorative treatment confirmed from approved artwork.',
    buyer: 'party-rental operators, princess-event planners, resorts, family venues, and commercial inflatable distributors',
    application: 'princess parties, family events, resort kids programs, summer rentals, and supervised wet play',
    options: 'princess artwork, castle peaks, pink color palette, slide and pool format, logo panels, water inlet, and packing',
    customizationFocus: 'pink princess graphics, castle details, pool finish, printed logos, slide layout, and water-use accessories',
    cardSummary: 'Pink princess water slide with castle-style peaks and pool-finish base.',
  },
  'white-bounce-house-double-slide': {
    keywords: ['bounce house with water slide and air blower', 'commercial water slide', 'inflatable water slide with pool', 'white double water slide', 'white bounce house water slide'],
    visual: 'a white bounce-and-slide structure with two tall slide lanes, a broad central climbing entry, and a neutral event-ready finish',
    purpose: 'The all-white bounce-and-slide layout is suited to event-rental buyers seeking a neutral design that can be aligned with approved wet-use or dry-use specifications.',
    buyer: 'wedding-rental companies, event planners, premium party venues, resorts, and commercial inflatable distributors',
    application: 'white-event rentals, branded party packages, wedding-adjacent events, and supervised bounce-and-slide programs',
    options: 'bounce area, double-slide layout, approved wet or dry use, white finish, logos, landing treatment, accessories, and packing',
    customizationFocus: 'neutral white styling, bounce area, dual slides, logo panels, landing configuration, and operating accessories',
    cardSummary: 'White bounce-house water slide with neutral styling and tall double-slide layout.',
  },
  'commercial-inflatable-water-slide-manufacturer': {
    keywords: ['commercial water slides for sale', 'commercial water slide', 'commercial inflatable water slides', 'wholesale commercial water slides', 'inflatable water slide with pool'],
    visual: 'a tall all-white commercial water slide with a wide central climb, two slide paths, and a clear front landing zone',
    purpose: 'The clean commercial-scale structure is presented for B2B buyers building a white-label, venue, or rental water-slide range with project-specific specifications.',
    buyer: 'commercial rental fleets, distributors, resorts, venue operators, and OEM or wholesale inflatable buyers',
    application: 'commercial water-slide fleets, white-label projects, resort recreation, and supervised seasonal venue programs',
    options: 'height and lane layout, white or custom colors, landing or pool configuration, logos, water routing, anchoring, and export packing',
    customizationFocus: 'commercial slide dimensions, lane configuration, neutral or branded colors, landing layout, logos, and factory accessory package',
    cardSummary: 'Commercial white water slide for B2B fleets, wholesale projects, and custom branding.',
  },
  'triple-lane-inflatable-water-slide': {
    keywords: ['triple lane water slide', 'triple slide water slide', 'inflatable triple water slide', 'commercial water slide', 'inflatable water slide with pool'],
    visual: 'a yellow-and-white triple-lane slide with three parallel racing routes and a wide low landing base',
    purpose: 'The three-lane format is designed for managed racing-style wet-play sessions where the venue can accommodate broader participant flow and a shared landing zone.',
    buyer: 'commercial rental businesses, resorts, event operators, water venues, and wholesale inflatable suppliers',
    application: 'triple-lane summer rentals, resort activities, event races, and supervised family water-slide programs',
    options: 'three-lane configuration, slide height, landing or pool finish, colors, logos, water routing, access stairs, and packing',
    customizationFocus: 'triple-lane race layout, yellow-white color treatment, landing configuration, branded panels, and operational accessories',
    cardSummary: 'Triple-lane water slide with three racing routes and a wide landing base.',
  },
  'inflatable-tropical-water-slide': {
    keywords: ['tropical splash water slide', 'tropical waterslide', 'inflatable water slide tropical', 'commercial water slide', 'inflatable water slide with pool'],
    visual: 'a large tropical slide with green-and-blue palm elements, twin slide surfaces, and a blue pool-finish section',
    purpose: 'The tropical splash layout combines a palm-led visual with a broad water-play finish for supervised resort, event, and rental use.',
    buyer: 'resorts, commercial rental fleets, pool venues, themed-event operators, and inflatable distributors',
    application: 'tropical resort activities, splash-focused summer rentals, supervised family events, and outdoor water-play zones',
    options: 'palm-tree artwork, slide surfaces, splash-pool layout, colors, logos, water inlet, anchoring, and export packing',
    customizationFocus: 'tropical palms, splash-pool geometry, colors, slide treatment, printed branding, and accessories',
    cardSummary: 'Tropical splash water slide with palm visuals, twin slide surfaces, and blue pool finish.',
  },
  'tropical-inflatable-water-slide-rental': {
    keywords: ['tropical water slide rental', 'palm tree water slide rental', 'commercial water slide', 'inflatable water slide with pool', 'tropical rental water slide'],
    visual: 'a tall green tropical water slide with a dark blue pool finish, palm accents, and a long central slide route',
    purpose: 'The tropical silhouette supports seasonal rental and resort water-play programs, while factory buyers can specify their own commercial graphics and packing requirements.',
    buyer: 'rental businesses, resorts, water venues, event operators, and commercial inflatable wholesalers',
    application: 'tropical rental packages, resort recreation, summer events, and supervised outdoor water-slide sessions',
    options: 'palm decoration, slide length, pool finish, colors, logos, water routing, anchoring, repair kit, and packing',
    customizationFocus: 'tropical green-blue artwork, palm details, slide and pool configuration, rental branding, and accessories',
    cardSummary: 'Tall tropical rental water slide with palm accents and blue pool finish.',
  },
  'inflatable-jungle-water-slide': {
    keywords: ['inflatable jungle water slide', 'commercial water slide', 'inflatable water slide with pool', 'tropical splash water slide', 'jungle water slide commercial'],
    visual: 'a blue-and-green jungle-themed water slide with leafy decorative panels, an elevated slide route, and a large pool finish',
    purpose: 'The jungle visual delivers an image-specific commercial alternative for venues and rental fleets that want themed water-slide inventory instead of generic color-only units.',
    buyer: 'commercial rental companies, resorts, family venues, jungle-theme event planners, and inflatable distributors',
    application: 'jungle parties, resort activities, themed rentals, poolside events, and supervised family wet play',
    options: 'jungle graphics, leafy panels, slide height, pool finish, colors, logo printing, water inlet, anchoring, and packing',
    customizationFocus: 'jungle artwork, leaf decoration, blue-green colors, slide configuration, pool treatment, and branded panels',
    cardSummary: 'Jungle-themed commercial water slide with leafy panels and large pool finish.',
  },
  'inflatable-wave-water-slide': {
    keywords: ['tropical wave water slide', 'commercial water slide', 'inflatable water slide with pool', 'water slide splash pool', 'wave theme inflatable water slide'],
    visual: 'a white-and-blue wave-themed slide with sculpted surf-style sidewalls and a large blue pool landing',
    purpose: 'The wave-shaped construction creates a distinct marine-surf visual for water venues, resort programs, and themed commercial rentals.',
    buyer: 'resorts, water venues, commercial rental fleets, beach-theme event operators, and inflatable wholesalers',
    application: 'surf-themed events, resort recreation, marine water-play programs, and supervised summer rentals',
    options: 'wave sidewalls, blue-white color palette, slide profile, pool landing, logo panels, water connection, anchoring, and packing',
    customizationFocus: 'wave theme, surf color treatment, slide and pool profile, printed logos, water routing, and accessories',
    cardSummary: 'Wave-theme inflatable water slide with sculpted surf sidewalls and blue pool landing.',
  },
  'shark-inflatable-water-slide-with-pool': {
    keywords: ['shark water slide', 'shark inflatable water slide rental', 'shark inflatable water slide', 'shark blow up water slide', 'inflatable water slide with pool'],
    visual: 'a large shark-head water slide with open mouth entry, blue wave styling, a long slide route, and a front pool finish',
    purpose: 'The shark visual is the defining product feature and should lead the page’s search intent for commercial marine-themed rentals and supervised water-play venues.',
    buyer: 'water parks, resorts, party-rental businesses, marine-theme event operators, and commercial inflatable suppliers',
    application: 'shark-themed party rentals, resort water activities, marine events, and supervised summer family play',
    options: 'shark head artwork, wave panels, slide profile, pool finish, colors, logos, water inlet, anchoring, and export packing',
    customizationFocus: 'shark face and mouth design, marine graphics, blue color treatment, slide and pool layout, branding, and accessories',
    cardSummary: 'Shark water slide with open-mouth entry, wave styling, and pool-finish layout.',
  },
  'backyard-water-slide-for-kids': {
    keywords: ['backyard inflatable water slide', 'kids inflatable water slide', 'water slide for backyard pool', 'commercial water slide', 'backyard water slide for kids'],
    visual: 'a purple-and-white themed water slide with palm details, a tall single lane, and a pool-style front finish',
    purpose: 'The visible single-lane format can be positioned for managed family and backyard-style recreation, while commercial buyers should still confirm the approved footprint, operating conditions, and final specification.',
    buyer: 'party-rental operators, family venues, resorts, event companies, and commercial inflatable distributors',
    application: 'family party packages, supervised kids activities, resort programs, and seasonal water-slide rentals',
    options: 'theme colors, palm details, slide height, pool finish, logo panels, water inlet, anchoring, and packing',
    customizationFocus: 'family-friendly artwork, color palette, slide and pool layout, branding, water-flow interface, and accessories',
    cardSummary: 'Family water slide with palm details, tall single lane, and front pool finish.',
  },
  'inflatable-rainbow-water-slide': {
    keywords: ['rainbow water slide', 'rainbow inflatable water slide', 'rainbow slip n slide', 'commercial water slide', 'inflatable water slide with pool'],
    visual: 'a turquoise and pink rainbow-themed water slide with a visible rainbow arch, cloud details, and a rounded pool finish',
    purpose: 'The rainbow-and-cloud theme creates a high-recognition option for colorful family events, resort programs, and commercial rental inventory.',
    buyer: 'party-rental companies, event stylists, resorts, family entertainment venues, and commercial inflatable suppliers',
    application: 'rainbow parties, family water-play events, summer rentals, resort kids programs, and supervised poolside activity',
    options: 'rainbow arch, cloud details, color palette, pool finish, logos, water routing, anchoring, and export packing',
    customizationFocus: 'rainbow and cloud artwork, turquoise-pink colors, slide profile, pool layout, logos, and wet-use accessories',
    cardSummary: 'Rainbow water slide with cloud details, colorful arch, and rounded pool finish.',
  },
  'inflatable-water-slide-hawaii': {
    keywords: ['tiki water slide', 'tropical water slide', 'tropical splash water slide', 'commercial water slide', 'Hawaii theme inflatable water slide'],
    visual: 'a green-and-blue Hawaii-inspired multi-level water slide with palm-tree decoration, colorful tropical panels, and a wide pool finish',
    purpose: 'The visible Hawaii-inspired tropical treatment creates a theme-specific product page for commercial buyers, without relying on a generic non-themed water-slide description.',
    buyer: 'resorts, beach clubs, party-rental fleets, tropical-event operators, and commercial inflatable distributors',
    application: 'Hawaii-themed events, beach-club recreation, resort activity programs, and supervised tropical water-slide rentals',
    options: 'Hawaii or tropical artwork, palm trees, tiki-inspired details, slide layout, pool finish, logos, water inlet, and packing',
    customizationFocus: 'Hawaii-themed colors, palm and tiki details, multi-level slide layout, pool treatment, branded artwork, and accessories',
    cardSummary: 'Hawaii-theme inflatable water slide with palms, tropical colors, and broad pool finish.',
  },
};

function waterSlideProfile(product: Product) {
  return product.category === 'Inflatable Water Slide' || product.category === 'Inflatable Slide'
    ? waterSlideProfiles[product.productSlug] ?? legacyWaterSlideProfiles[product.productSlug]
    : undefined;
}

type FlyingFishProfile = {
  keywords: string[];
  seoSuffix: string;
  isTowable: boolean;
  visual: string;
  purpose: string;
  buyer: string;
  application: string;
  options: string;
  customizationFocus: string;
  faqQuestions: string[];
};

// The source folder names contain several "fly fishing" phrases, but the
// supplied images show two different product intents: a true belly boat and
// flying-fish towables. Keep the search language aligned with the visible form.
const flyingFishProfiles: Record<string, FlyingFishProfile> = {
  'fly-fishing-belly-boat': {
    keywords: ['fly fishing belly boat', 'fly fishing inflatable boat', 'fly fishing boat for sale', 'fly fishing kick boat', 'fly fishing rod holder boat'],
    seoSuffix: 'Commercial Fly Fishing Boat',
    isTowable: false,
    visual: 'a red two-pontoon belly boat with a low central seat, footwell, backrest, grab lines, and black anti-slip panels',
    purpose: 'The compact belly-boat layout is intended for controlled angling sessions where the operator needs a stable, portable fishing platform rather than a towable amusement ride.',
    buyer: 'fly-fishing outfitters, fishing guides, outdoor retailers, lake operators, and commercial inflatable distributors',
    application: 'fly-fishing programs, guided lake sessions, fishing-gear rental, and specialty outdoor retail',
    options: 'pontoon length, seat and backrest layout, fin or kick position, rod-holder details, color, logo panels, repair kit, and carrying package',
    customizationFocus: 'seat position, pontoon geometry, storage or rod-holder details, colors, branding, valves, and transport accessories',
    faqQuestions: ['What is this fly fishing belly boat designed for?', 'How should a buyer plan the water and access area for the belly boat?', 'Which material and reference size are listed for this fly fishing inflatable boat?', 'Can the seat, rod-holder layout, and branding be customized?', 'What inspection and operating checks matter for guided fishing sessions?', 'What information should I send for a fly fishing boat quotation?'],
  },
  'inflatable-flying-fish-commercial': {
    keywords: ['inflatable flying fish', 'flying fish towable', 'inflatable flying fish towable', 'flying fish boat', 'banana boat flying fish'],
    seoSuffix: 'Commercial Water Towable',
    isTowable: true,
    visual: 'an orange flying-fish towable with two longitudinal rider pontoons, grab handles, and a raised wing-shaped nose',
    purpose: 'The flying-fish silhouette is built for supervised boat-towed recreation, with multiple rider positions and a high-visibility shape for commercial water-activity programs.',
    buyer: 'water parks, beach activity operators, resorts, tow-sports rental businesses, and inflatable attraction distributors',
    application: 'boat-towed rides, resort water activities, beach rentals, and seasonal recreation programs',
    options: 'rider capacity, tow point, handle layout, color blocks, printed graphics, dimensions, repair kit, and packing configuration',
    customizationFocus: 'tow-point reinforcement, rider positions, grab-handle spacing, colorway, logo printing, and accessory package',
    faqQuestions: ['What is this inflatable flying fish used for?', 'How should an operator plan the tow boat, water area, and rider flow?', 'Which PVC specification and size are listed for this flying fish towable?', 'Can the tow point, handles, colors, and artwork be customized?', 'What pre-ride inspection and supervision procedures should be used?', 'What details are needed for an inflatable flying fish quotation?'],
  },
  'fly-fishing-inflatable-boat': {
    keywords: ['flying fish towable', 'flying fish boat', 'inflatable flying fish boat', 'flying fish yacht', 'inflatable flying fish towable'],
    seoSuffix: 'Commercial Water Towable',
    isTowable: true,
    visual: 'a large orange-and-black wing-shaped flying-fish towable with two internal rider tubes and a central raised nose',
    purpose: 'Despite the legacy folder name, the image shows a flying-fish towable rather than a fishing boat. Its broad wing profile is suited to supervised boat-towed group play.',
    buyer: 'resort water-sports teams, beach recreation operators, towable-rental fleets, and commercial water-attraction suppliers',
    application: 'high-visibility towable rides, resort activity schedules, beach clubs, and seasonal water-sports rentals',
    options: 'tow point, rider tube arrangement, handles, color graphics, overall footprint, reinforcement, repair kit, and export packing',
    customizationFocus: 'rider layout, tow hardware reinforcement, handle positions, graphic panels, colors, and commercial accessory package',
    faqQuestions: ['Is this fly fishing inflatable boat a fishing platform or a flying-fish towable?', 'What water area and tow-boat details should be checked before use?', 'What material and reference dimensions are listed for this flying fish boat?', 'Can the rider positions and towable artwork be customized?', 'How should staff inspect and supervise a flying fish towable session?', 'What information helps quote this inflatable flying fish boat?'],
  },
  'boat-fishing-fly': {
    keywords: ['flying fish boat', 'flying fish towable', 'banana boat flying fish', 'inflatable flying fish towable', 'towable banana boat'],
    seoSuffix: 'Commercial Water Towable',
    isTowable: true,
    visual: 'a yellow-and-blue three-rider flying-fish towable with individual front pontoons, grip handles, and a broad wing-shaped top tube',
    purpose: 'The visible three-rider towable format is designed for boat-led group recreation and a clear, colorful attraction profile at managed water venues.',
    buyer: 'water-sports centers, resort beaches, lake attractions, towable-rental fleets, and wholesale inflatable suppliers',
    application: 'three-person towable rides, family water activities, beach clubs, and commercial summer-rental programs',
    options: 'rider count, tow point, handle pattern, color combination, printed branding, footprint, repair kit, and storage bag',
    customizationFocus: 'rider capacity, tow-point reinforcement, handle spacing, color scheme, logo panels, and packing accessories',
    faqQuestions: ['What type of attraction is this flying fish boat?', 'How should a venue plan the tow boat, water lane, and participant access?', 'Which material and size are listed for this flying fish towable?', 'Can the three-rider layout and yellow-blue artwork be changed?', 'What operating checks are needed before each towable session?', 'What should a buyer include in a flying fish boat quote request?'],
  },
  'flying-fish-towable': {
    keywords: ['flying fish towable', 'towable banana boat', 'towable banana boat tube', 'flying fish boat', 'banana towable tube'],
    seoSuffix: 'Commercial Water Towable',
    isTowable: true,
    visual: 'a yellow-and-blue three-rider flying-fish towable with raised nose tubes, blue rider pads, and multiple grab handles',
    purpose: 'This commercial towable creates a recognizable group ride for supervised boat operations, beach activity centers, and resort recreation programs.',
    buyer: 'tow-sports operators, resorts, water parks, beach clubs, rental companies, and inflatable-equipment distributors',
    application: 'group towable rides, resort water recreation, beach attractions, and repeat summer rental sessions',
    options: 'tow point, rider positions, handle layout, colorway, printed graphics, dimensions, reinforcement, and packing',
    customizationFocus: 'tow hardware, passenger arrangement, grip layout, color and logo artwork, repair kit, and carrying bags',
    faqQuestions: ['What makes this flying fish towable suitable for commercial water activities?', 'How should the tow boat and riding lane be planned?', 'What PVC and reference size are specified for this towable banana boat?', 'Can the rider layout, handles, colors, and logos be customized?', 'Which inspection and supervision steps should operators follow?', 'What details are needed for a towable banana boat quotation?'],
  },
  'inflatable-flying-fish-for-sale': {
    keywords: ['inflatable flying fish', 'flying fish towable', 'inflatable flying fish boat', 'flying fish boat', 'inflatable flying fish for sale'],
    seoSuffix: 'Commercial Water Towable',
    isTowable: true,
    visual: 'a black-and-red three-rider flying-fish towable with contrasting grip pads, individual rider tubes, and a raised wing-shaped front tube',
    purpose: 'The bold three-rider flying-fish form gives water-sports operators a visible towable attraction for supervised sessions and commercial rental inventory.',
    buyer: 'water parks, beach clubs, resort activity teams, towable-rental businesses, and wholesale water-toy suppliers',
    application: 'commercial flying-fish rides, boat-towed recreation, resort programs, and inflatable towable rental fleets',
    options: 'rider capacity, tow point, handle configuration, color palette, printed graphics, dimensions, valves, and packing',
    customizationFocus: 'rider positions, tow-point reinforcement, handle spacing, black-red artwork, logos, and accessory package',
    faqQuestions: ['What is this inflatable flying fish for sale intended to do?', 'How should a rental operator plan boat compatibility and water access?', 'Which material and dimensions are listed for this flying fish towable?', 'Can the rider count, handles, colors, and branding be customized?', 'What inspection, inflation, and supervision checks are required?', 'What information should I send to price an inflatable flying fish boat?'],
  },
  'inflatable-flying-fish-boat': {
    keywords: ['inflatable flying fish boat', 'flying fish boat', 'flying fish towable', 'banana boat flying fish', 'giant inflatable flying fish'],
    seoSuffix: 'Commercial Water Towable',
    isTowable: true,
    visual: 'an orange-and-blue three-rider flying-fish towable with three front pontoons, grab handles, and a broad raised top tube',
    purpose: 'The image shows a three-rider flying-fish towable, not a fishing craft. It is planned for supervised boat-towed recreation and high-visibility water-activity packages.',
    buyer: 'resort water-sports operators, beach activity businesses, water parks, towable-rental fleets, and commercial distributors',
    application: 'group towable rides, family water recreation, beach-club programs, and seasonal rental packages',
    options: 'rider layout, tow point, handle positions, color and print treatment, footprint, reinforcement, repair kit, and export packing',
    customizationFocus: 'three-rider configuration, tow hardware, grip handles, color blocks, brand graphics, and commercial accessories',
    faqQuestions: ['Is this inflatable flying fish boat designed for fishing?', 'What water-site and tow-boat information should be confirmed?', 'Which PVC grade and reference size are listed for this flying fish towable?', 'Can the three-rider arrangement and printed artwork be customized?', 'How should an operator inspect and supervise this towable?', 'What should a buyer provide for an inflatable flying fish boat quote?'],
  },
  'blow-up-banana': {
    keywords: ['blow up banana', 'inflatable banana boat', 'giant inflatable banana', 'big inflatable banana', 'banana towable tube', 'towable banana boat'],
    seoSuffix: 'Commercial Water Towable',
    isTowable: true,
    visual: 'a long yellow banana-shaped towable with blue rider pads, repeated grab handles, side pontoons, and a pointed front nose',
    purpose: 'The elongated banana-boat layout is made for multiple riders behind a tow boat, giving resorts and rental operators a familiar group water attraction.',
    buyer: 'banana-boat operators, resorts, beach clubs, water parks, tow-sports rental fleets, and commercial inflatable suppliers',
    application: 'banana boat rides, resort recreation, beach attractions, group water activities, and seasonal towable rentals',
    options: 'rider capacity, tow point, seat and handle spacing, banana length, colorway, logo panels, reinforcement, and packing accessories',
    customizationFocus: 'rider count, tow-point reinforcement, grip spacing, banana profile, color and logo artwork, repair kit, and carrying bags',
    faqQuestions: ['What is this blow up banana designed for?', 'How should a venue plan the tow boat, riding lane, and rider access?', 'Which PVC specification and reference size are listed for this inflatable banana boat?', 'Can the rider capacity, handle spacing, colors, and branding be customized?', 'What inspection and supervision procedures belong in each banana-boat session?', 'What details should I send for a giant inflatable banana quotation?'],
  },
};

function flyingFishProfile(product: Product) {
  return product.category === 'Inflatable Water Park' ? flyingFishProfiles[product.productSlug] : undefined;
}

// Each newly published action-sports product owns a separate keyword set. This
// keeps related landing-airbag phrases differentiated across product pages.
const landingKeywordSets: Record<string, string[]> = {
  'bmx-airbag-landing': ['bmx airbag landing', 'inflatable bmx ramp'],
  'inflatable-airbag-landing': ['inflatable airbag landing', 'inflatable landing airbag'],
  'inflatable-bmx-landing-ramp': ['inflatable bmx landing ramp'],
  'freestyle-airbag-landing': ['freestyle airbag landing'],
  'airbag-landing-ramp-for-sale': ['airbag landing ramp for sale'],
  'fmx-landing-ramp': ['fmx landing ramp', 'fmx landing airbag'],
  'fmx-airbag-landing': ['fmx airbag landing', 'fmx airbag landing for sale', 'fmx airbag landing price'],
  'inflatable-landing-ramp': ['inflatable landing ramp'],
};

const climbingKeywordSets: Record<string, string[]> = {
  'blow-up-rock-climbing-wall': ['blow up rock climbing wall', 'blow up rock wall'],
  'inflatable-rock-climbing-wall-for-sale': ['inflatable rock climbing'],
  'commercial-mario-kart-theme-inflatable-slide-and-climb-for-sale': ['inflatable rock climbing wall for sale'],
  'commercial-rock-climbing-wall-for-sale': ['inflatable rock wall'],
  'inflatable-climbing-wall': ['inflatable climbing wall'],
  'inflatable-climbing-wall-and-slide': ['inflatable climbing wall and slide', 'rock climbing bounce house'],
  'rock-climbing-wall-inflatable': ['rock climbing wall inflatable'],
  'bounce-house-climbing-wall': ['bounce house climbing wall', 'bouncy castle climbing wall'],
  'inflatable-rock-climbing-wall': ['inflatable rock climbing wall', 'inflatable rock climbing wall for water'],
  'inflatable-climbing-tower': ['inflatable climbing tower', 'blow up climbing wall'],
  'inflatable-climbing-tower-commercial': ['commercial inflatable climbing tower', 'inflatable climbing tower for sale', 'portable inflatable climbing tower', 'custom inflatable climbing tower'],
};

const foamKeywordSets: Record<string, string[]> = {
  'foam-party-inflatable': ['foam party pit', 'foam party rental', 'foam party rental near me', 'foam party inflatable'],
  'inflatable-foam-pit-for-sale': ['foam pit', 'foam pit for sale', 'inflatable foam pit for sale', 'giant foam pit'],
  'inflatable-foam-pit': ['inflatable foam pit', 'foam pit rental', 'foam pit rental near me', 'portable foam pit'],
  'inflatable-rainbow-arch-bubble-foam-pit': ['bubble foam pit', 'bubble foam pit rental', 'bubble pit', 'bubble pit rental'],
  'inflatable-candy-land-bubble-foam-pit-rental': ['foam party pit for sale', 'inflatable foam pit rental', 'inflatable foam pit rental near me', 'party foam pit'],
  'inflatable-foam-pit-rental': ['backyard foam pit', 'foam machine pit', 'foam pit bounce house', 'soap foam pit'],
};

const volleyballKeywordSets: Record<string, string[]> = {
  'inflatable-water-volleyball-court': ['inflatable water volleyball court', 'blow up water volleyball court', 'giant inflatable water volleyball court', 'water volleyball inflatable court'],
  'inflatable-volleyball-court-for-sale': ['inflatable volleyball court for sale', 'commercial inflatable volleyball pool', 'giant inflatable pool volleyball court', 'inflatable pool volleyball court'],
  'inflatable-volleyball-court': ['inflatable volleyball court', 'blow up volleyball court', 'commercial inflatable volleyball court', 'inflatable outdoor volleyball court'],
  'water-inflatable-volleyball-court': ['water inflatable volleyball court', 'inflatable volleyball water court', 'commercial inflatable volleyball pool court', 'blow up volleyball pool court'],
  'inflatable-volleyball-field': ['inflatable volleyball field', 'big inflatable volleyball court', 'giant inflatable volleyball court', 'inflatable beach volleyball court'],
};

const billiardsKeywordSets: Record<string, string[]> = {
  'human-billiards-inflatable-commercial': ['human billiards inflatable', 'inflatable soccer billiards', 'inflatable soccer pool table', 'inflatable billiards'],
  'inflatable-billiards-pool-table': ['inflatable billiards pool table', 'inflatable pool table', 'blow up pool table', 'giant inflatable pool table'],
  'inflatable-billiards-table': ['inflatable billiards table', 'inflatable outdoor pool table', 'outdoor inflatable pool table', 'inflatable snooker table'],
};

const soccerFieldKeywordSets: Record<string, string[]> = {
  'inflatable-soccer-field-for-rent': ['inflatable soccer field to rent', 'inflatable soccer field for rent', 'rent inflatable soccer field', 'inflatable soccer field hire'],
  'human-foosball-game-for-sale': ['human foosball game for sale', 'human foosball game', 'human foosball table', 'inflatable foosball game'],
  'inflatable-soccer-arena': ['inflatable soccer arena', 'inflatable soccer field', 'inflatable soccer court', 'soccer field inflatable'],
  'inflatable-soap-football-field': ['inflatable soap football field', 'inflatable soap soccer field', 'soap soccer field', 'inflatable soap soccer field for events'],
  'inflatable-human-foosball-court': ['inflatable human foosball court', 'human foosball field game', 'human foosball inflatable court', 'human foosball court for sale'],
  'inflatable-soccer-field-slip-and-slide': ['inflatable soccer field slip and slide', 'inflatable soccer field slip and slide rental', 'inflatable slip soccer field', 'soccer slide field inflatable'],
  'inflatable-water-soccer-field': ['inflatable water soccer field', 'water inflatable soccer field', 'inflatable soccer field water', 'inflatable water soccer field for rent'],
  'slip-and-slide-soccer-field-rent': ['slip and slide soccer field rent', 'soccer field slip and slide rental', 'inflatable wet soccer field', 'slip and slide soccer field rental'],
  'human-foosball-inflatable-rental': ['human foosball inflatable rental', 'human foosball game rental', 'large human foosball rental attraction', 'commercial human foosball inflatable'],
  'large-inflatable-soccer-field': ['large inflatable soccer field', 'large soccer pitch inflatable', 'commercial large inflatable soccer field', 'portable large soccer field inflatable'],
  'soccer-blow-up-field': ['soccer blow up field', 'soccer field blow up', 'blow up soccer field', 'inflatable soccer field for sale'],
  'blow-up-soccer-field': ['custom-size inflatable soccer field', 'portable inflatable soccer field', 'commercial inflatable soccer field', 'modular inflatable soccer pitch'],
  'giant-inflatable-soccer-field': ['giant inflatable soccer field', 'inflatable soccer field for adults', 'inflatable soccer pitch', 'inflatable indoor soccer field'],
};

const axeThrowingKeywordSets: Record<string, string[]> = {
  'dual-target-axe-throwing-inflatable': ['inflatable axe throw', 'inflatable lumberjack', 'lumberjack throw inflatable', 'blow up axe'],
  'inflatable-axe-throw': ['inflatable axe throwing rental', 'axe throwing inflatable', 'inflatable ax throwing game', 'axe throwing blow up'],
  'inflatable-axe-throwing-game': ['inflatable axe throwing game', 'inflatable axe throwing for sale', 'inflatable ax throwing', 'blow up axe throwing game'],
};

const ringTossKeywordSets: Record<string, string[]> = {
  'commercial-inflatable-ring-toss-games': ['inflatable ring toss', 'blow up ring toss', 'inflatable toss game', 'ring toss inflatable', 'target inflatable ring'],
};

const battingCageKeywordSets: Record<string, string[]> = {
  'commercial-inflatable-batting-cage-commercial': ['inflatable batting cage', 'blow up hitting cage', 'commercial baseball batting tunnel', 'netted inflatable batting lane'],
  'inflatable-batting-tunnels': ['blow up batting cage', 'inflatable batting turtle', 'portable baseball hitting tunnel', 'enclosed inflatable practice lane'],
  'baseball-inflatable-batting-cage': ['inflatable hitting cage', 'blow up baseball cage', 'indoor inflatable baseball cage', 'commercial softball hitting tunnel'],
  'commercial-inflatable-batting-cage-for-sale': ['inflatable baseball batting cage', 'commercial baseball batting cage for sale', 'inflatable pitching practice cage', 'black netted baseball enclosure'],
  'inflatable-batting-cages-for-sale': ['inflatable batting cages for sale', 'portable inflatable batting cage', 'inflatable batting tunnel', 'inflatable batting cage for baseball'],
};

type BattingCageProfile = {
  productType: string;
  visibleLayout: string;
  trainingUse: string;
  planningFocus: string;
  customizationFocus: string;
};

const battingCageProfiles: Record<string, BattingCageProfile> = {
  'commercial-inflatable-batting-cage-commercial': {
    productType: 'tall arched inflatable batting cage',
    visibleLayout: 'a 10 m arched black enclosure with a broad side-mesh practice lane',
    trainingUse: 'batting-practice rentals, school baseball sessions, and club skill stations',
    planningFocus: 'the tall arched profile, wide side mesh, batter entry, pitching end, and a separated queue line',
    customizationFocus: 'the arched shell, side-net layout, striking position, baseball graphics, and sponsor panels',
  },
  'inflatable-batting-tunnels': {
    productType: 'long inflatable batting tunnel',
    visibleLayout: 'an 11 m exterior-facing black netted lane with an extended tunnel run',
    trainingUse: 'portable baseball practice, coach-led hitting sessions, and mobile sports events',
    planningFocus: 'the longer tunnel run, end clearance, exterior-facing netting, pitching-machine position, and player circulation',
    customizationFocus: 'tunnel length, exterior mesh panels, entry direction, pitching end, and training-station branding',
  },
  'baseball-inflatable-batting-cage': {
    productType: 'full-length inflatable hitting cage',
    visibleLayout: 'a 12 m enclosed black training lane with repeated side openings and an end-net zone',
    trainingUse: 'baseball and softball drills, indoor sports programs, and supervised event challenges',
    planningFocus: 'the full-length lane, repeated side openings, batting end, equipment zone, and indoor ceiling clearance',
    customizationFocus: 'the side-opening pattern, ball-return or target arrangement, indoor layout, and baseball or softball graphics',
  },
  'commercial-inflatable-batting-cage-for-sale': {
    productType: 'compact arched inflatable baseball batting cage',
    visibleLayout: 'a compact 6 m black netted enclosure with a taller arched training profile',
    trainingUse: 'compact venue training, sports activations, and commercial rental packages',
    planningFocus: 'the compact footprint, taller arch, batter access, staff position, and clear buffer around the enclosure',
    customizationFocus: 'the compact enclosure dimensions, arched entrance, netting configuration, logo panels, and packing package',
  },
  'inflatable-batting-cages-for-sale': {
    productType: 'enclosed inflatable batting tunnel',
    visibleLayout: 'a 12 m black mesh tunnel with a contained practice lane and end-net structure',
    trainingUse: 'baseball and softball facility training, rental fleets, and branded skills challenges',
    planningFocus: 'the tunnel footprint, equipment end, side clearance, entry-exit flow, and spectator separation',
    customizationFocus: 'the tunnel dimensions, entry placement, netting arrangement, branded graphics, and accessory package',
  },
};

const waterWalkingBallKeywordSets: Record<string, string[]> = {
  'inflatable-water-walking-ball': ['inflatable water walking ball', 'water walking roll ball', 'water walking zorb', 'water zorbing price'],
  'water-walking-ball': ['2m water walking ball', 'walking ball', 'human hamster ball pool', 'water walking roll ball'],
  'human-water-walking-ball': ['human water walking ball', 'human hamster ball water', 'human sized hamster ball for water', 'water walking ball for humans'],
  'inflatable-walking-water-ball': ['inflatable walking water ball', 'walking water ball', 'water walking zorb', 'water walking ball inflatable'],
  'zorb-water-ball': ['zorb water ball', 'giant water hamster ball', 'water walking zorb ball', 'water zorbing price'],
};

type WaterWalkingBallProfile = { purpose: string; buyer: string; application: string; faqQuestions: string[] };
const waterWalkingBallProfiles: Record<string, WaterWalkingBallProfile> = {
  'inflatable-water-walking-ball': {
    purpose: 'This inflatable water walking ball is a transparent TPU sphere for supervised walking or rolling on a managed water surface. Confirm the operating area, water conditions, participant format, and emergency access with the venue before use.',
    buyer: 'water parks, aquatic recreation centers, resorts, event operators, and commercial inflatable rental businesses',
    application: 'a supervised water-walking activity for aquatic venues, events, and commercial rental programs',
    faqQuestions: ['What is an inflatable water walking ball used for?', 'How should an operator plan the water area for a walking ball?', 'Which material and size are listed for this model?', 'Can the inflatable water walking ball be customized?', 'What supervision and rescue procedures should a venue prepare?', 'What information should I send for a water walking ball quote?'],
  },
  'water-walking-ball': {
    purpose: 'This 2 m water walking ball lets one participant walk or roll inside a transparent TPU sphere on a managed water surface. Plan the water area, session flow, access, and recovery procedures with the venue before purchase.',
    buyer: 'water parks, aquatic centers, resort activity teams, family entertainment venues, and commercial rental operators',
    application: 'a timed water-walking attraction for supervised pool events, resort recreation, and seasonal rental programs',
    faqQuestions: ['What is the 2m water walking ball designed for?', 'How much pool clearance should I plan around a 2 m walking ball?', 'Which TPU specification is listed for this walking ball?', 'Can I order a 2m water walking ball for a rental or water park?', 'What operating and rescue plan should a venue prepare?', 'What details are needed for a factory quote on a water walking roll ball?'],
  },
  'human-water-walking-ball': {
    purpose: 'This human water walking ball is a transparent, 2 m TPU sphere for a participant to walk or roll inside during a controlled aquatic session. Operators should define participant eligibility, water conditions, staffing, and emergency access before use.',
    buyer: 'aquatic recreation venues, family entertainment centers, resort pools, event companies, and inflatable-equipment distributors',
    application: 'a human-scale water activity for supervised aquatic events, venue programs, and commercial rental inventories',
    faqQuestions: ['How does a human water walking ball activity work?', 'Is this human-sized hamster ball intended for a pool or open water?', 'What material and diameter are specified for the human water walking ball?', 'Can the TPU ball be branded for an aquatic venue?', 'How should staff manage participant turns and emergency access?', 'What should buyers include when requesting a human water walking ball quotation?'],
  },
  'inflatable-walking-water-ball': {
    purpose: 'The inflatable walking water ball creates a contained, single-participant rolling activity on a managed water surface. Its listed 2 m diameter and 1.0 TPU material should be reviewed alongside venue access, inflation equipment, water conditions, and session procedures.',
    buyer: 'water-play operators, leisure resorts, pool venues, party and event rental companies, and aquatic attraction suppliers',
    application: 'a portable inflatable water activity for supervised pool sessions, summer events, and rental packages',
    faqQuestions: ['Where can an inflatable walking water ball be used?', 'What site measurements matter for a water walking zorb?', 'Does the catalog specify TPU for this inflatable water ball?', 'Can I customize the ball color, branding, or packing?', 'What inspection and supervision steps belong in each session?', 'How can a buyer request pricing for an inflatable walking water ball?'],
  },
  'zorb-water-ball': {
    purpose: 'This 2 m zorb water ball is a transparent TPU sphere for supervised walking or rolling on a managed water area. It can be considered for aquatic recreation programs after the operator confirms the participant format, water conditions, supervision, and rescue plan.',
    buyer: 'water parks, resort recreation departments, aquatic event organizers, rental fleets, and commercial inflatable distributors',
    application: 'a water-zorbing session attraction for managed pool events, resort activities, and seasonal commercial rentals',
    faqQuestions: ['What makes this zorb water ball different from a land zorb?', 'What water-space and access checks are needed for a giant water hamster ball?', 'What material is used for the 2 m zorb water ball?', 'Can this water zorbing ball be customized for a rental fleet?', 'What safety procedures should operators confirm before each session?', 'Which project information affects a water zorbing price quotation?'],
  },
};

function waterWalkingBallProfile(product: Product) {
  return waterWalkingBallProfiles[product.productSlug];
}

const connectFourBasketballKeywordSets: Record<string, string[]> = {
  'inflatable-connect-4-basketball': ['inflatable connect 4 basketball', 'basketball connect 4 inflatable', 'connect 4 basketball inflatable', 'inflatable basketball connect 4'],
  'connect-four-basketball-inflatable': ['connect four basketball inflatable', 'connect 4 basketball game for events', 'commercial basketball connect four', 'custom basketball connect four'],
};

const airHockeyKeywordSets: Record<string, string[]> = {
  'inflatable-air-hockey': ['inflatable air hockey', 'inflatable air hockey game', 'commercial inflatable air hockey', 'inflatable air hockey for events'],
  'inflatable-air-hockey-table': ['inflatable air hockey table', 'inflatable air hockey table for sale', 'portable inflatable air hockey', 'inflatable air hockey game rental'],
};

const hungryHippoKeywordSets: Record<string, string[]> = {
  'human-hungry-hippo-inflatable': ['human hungry hippo inflatable', 'hungry hippo party game', 'giant hungry hippo game', 'hungry hippo inflatable rental'],
};

const halloweenMazeKeywordSets: Record<string, string[]> = {
  'inflatable-halloween-maze': ['inflatable halloween maze', 'inflatable haunted house maze', 'halloween maze bounce house', 'haunted maze inflatable'],
};

const bungeeRunKeywordSets: Record<string, string[]> = {
  'inflatable-bungee-run': ['inflatable bungee run', 'bungee run inflatable rental', 'bungee fun run', 'bungee race'],
  '2-lane-bungee-run': ['2 lane bungee run', 'bungee run for sale', 'bungee run inflatable for sale', 'bungee run rental'],
  'blow-up-bungee-run': ['blow up bungee run', 'bungee run', 'bounce house bungee run', 'bouncy castle bungee run'],
};

// Bumper Ball keywords are assigned at product level so closely related
// youth, adult, soccer, suit, and zorb listings do not compete with the same
// exact phrases. High-volume generic terms are used where they match the
// product, while low-competition long-tail terms are reserved for the most
// specific listing or supporting copy.
const bumperBallKeywordSets: Record<string, string[]> = {
  'best-bumper-balls-for-kids': ['small bubble ball', 'mini zorb ball', 'bubble ball set', 'fun bubble ball'],
  'inflatable-kids-bumper-balls': ['inflatable bumper ball', 'buddy bumper balls', 'bouncy bubble ball', 'bubble ball party'],
  'best-inflatable-bumper-balls-for-kids': ['best bumper balls', 'inflatable bubble ball', 'bounce bubble ball', 'bubble ball inflatable fun'],
  'human-bubble-ball-for-kids': ['human bubble ball', 'body bubble ball', 'bubble ball you can get inside', 'human inside bubble'],
  'kids-blow-up-bumper-balls': ['inflatable bumper', 'inflatable bubbles for humans', 'bubble ball to go inside', 'bubble ball for people'],
  'tpu-soccer-balls': ['human soccer ball', 'zorb ball football', 'bubble ball football', 'bumper ball football'],
  'zorb-balls-for-kids': ['zorb ball party', 'zorb bubble ball', 'small zorb ball', 'zorb ball sport'],
  'inflatable-bubble-soccer-ball-manufacturer': ['inflatable bubble soccer ball', 'inflatable ball suits', 'bubble soccer purchase', 'bubble soccer balls for sale'],
  'buy-human-bubble-ball': ['buy zorb ball', 'human bubble for sale', 'bubble football to buy', 'body bubble suit'],
  'human-bubble-ball-for-adults': ['bumper balls for adults', 'adult bubble ball', 'adult inflatable bubble', 'adult zorb ball'],
  'human-bubble-ball-rental': ['rent zorb balls', 'zorb ball hire', 'bubble ball price', 'zorb ball purchase'],
  'inflatable-bumper-balls-for-adults-rental': ['inflatable bumper ball for adults', 'adult inflatable bumper ball', 'body bumper ball for adults', 'bumper balls adults'],
  'inflatable-human-bubble-balls': ['human bumper ball', 'human ball bubble', 'human inflatable bubble ball', 'human sized bubble'],
  'large-human-bubble-ball-for-adults': ['large bubble ball', 'big bubble ball for humans', 'giant bubble for human', 'large inflatable bubble ball'],
  'inflatable-bumper-balls-for-adults': ['bumper suits for adults', 'inflatable bumper ball for adults rental', 'body bumper ball', 'adult zorb'],
  'bubble-soccer-football-inflatable': ['inflatable soccer bubble', 'bumper soccer', 'bumper ball soccer', 'zorb ball soccer'],
  'commercial-bumper-balls': ['bumper ball inflatable', 'bumper bubble soccer', 'bubble soccer suit', 'bumper ball set'],
  'inflatable-bumper-ball-human': ['inflatable body bumper ball', 'body balls bumper', 'full body bubble ball', 'body bumper bubble'],
  'soccer-inflatable-bubble': ['soccer inflatable bubble', 'air bubble soccer', 'giant bubble soccer', 'soccer bubble ball'],
  'bubble-soccer-suits-for-sale': ['bubble soccer suits for sale', 'bubble suit soccer', 'inflatable bumper suits', 'bubble bumper suit'],
  'commercial-zorb-balls': ['inflatable zorb balls', 'zorb ball', 'zorb ball inflatable', 'zorb bumper balls'],
  'inflatable-bubble-suit-for-adults': ['human bubble suit', 'bubble ball suit', 'inflatable bubble ball for adults', 'full body bubble suit'],
  'inflatable-soccer-ball-suit': ['inflatable soccer ball suit', 'inflatable ball suit soccer', 'inflatable ball soccer', 'soccer suit bubble'],
  'inflatable-soccer-bubbles': ['inflatable soccer bubbles', 'inflatable bumper soccer', 'bumper bubble soccer balls', 'indoor soccer bubble ball'],
  'inflatable-soccer-bumper': ['bubble football for sale', 'bumper soccer near me', 'inflatable bumper soccer ball', 'football bubble ball'],
  'inflatable-zorb-ball': ['inflatable zorb', 'inflatable zorb ball for sale', 'blow up zorb ball', 'giant zorb ball'],
  'kid-inflatable-soccer-ball': ['best inflatable bumper ball', 'human soccer ball bubble', 'bubble soccer cost', 'soccer ball bubble'],
  'inflatable-bumper-ball-cheap': ['cheap bumper balls', 'cheap zorb ball', 'human bubble ball cheap', 'cheap bubble soccer balls'],
  'inflatable-bumper-balls-for-sale': ['inflatable bumper balls for sale', 'bumper balls for sale', 'bubble ball for sale', 'zorbs for sale'],
  'inflatable-bumper-balls-commercial': ['commercial inflatable bumper balls', 'inflatable bumper balls for sale', 'youth bubble soccer balls', 'TPU bumper ball set'],
};

type ObstacleCourseProfile = {
  displayTitle: string;
  keywords: string[];
  visual: string;
  purpose: string;
  buyer: string;
  application: string;
  customization: string;
  cardSummary: string;
  faqQuestions: string[];
};

const obstacleCourseProfiles: Record<string, ObstacleCourseProfile> = {
  'red-and-yellow-obstacle-course': { displayTitle: 'Obstacle Course Bounce House with Slide', keywords: ['obstacle course bounce house with slide', 'obstacle course bounce house', 'obstacle course with slide', 'bounce obstacle course'], visual: 'a red-and-yellow linear obstacle course with a tall rear climbing-and-slide section, low pop-up barriers, a central bounce-and-pass-through area, and circular front openings', purpose: 'The visible climb, bounce, barrier, and slide sequence creates a clear all-in-one obstacle attraction for rental fleets, school activity days, and family-event operators.', buyer: 'party-rental companies, schools, family entertainment centers, event agencies, and inflatable distributors', application: 'school field days, birthday events, community activities, family entertainment, and commercial rental programs', customization: 'color layout, slide height, barrier sequence, circular openings, logo panels, dimensions, accessories, and export packing', cardSummary: 'Obstacle course bounce house with slide, red-and-yellow barriers, a central bounce route, and a tall slide for rental and event programs.', faqQuestions: ['What features are included in this obstacle course bounce house with slide?', 'How should I plan space for the red-and-yellow obstacle course bounce house?', 'Can the slide, barrier route, and printed branding be customized?', 'What PVC material is specified for this obstacle course with slide?', 'What operating checks are needed for a bounce-and-slide obstacle course?', 'What details are needed for an obstacle course bounce house with slide quotation?'] },
  'wipeout-inflatable-obstacle-course-for-sale': { displayTitle: 'Inflatable Challenge Course', keywords: ['inflatable challenge course', 'inflatable wipeout course', 'interactive obstacle course', 'obstacle course party'], visual: 'a colorful green, orange, blue, and yellow challenge course with four oversized round obstacles, an entry arch, a dual-lane climb, and two slide exits', purpose: 'The oversized ball obstacles and twin-slide finish create a visual challenge format for supervised group events, party-rental packages, and family activity programs.', buyer: 'party-rental operators, family entertainment centers, schools, camps, event companies, and distributors', application: 'obstacle course parties, school activity days, camps, family venues, and commercial rental events', customization: 'ball-obstacle count, color palette, dual-slide configuration, arch details, logo panels, dimensions, accessories, and packing', cardSummary: 'Inflatable challenge course with oversized ball obstacles, an entry arch, a climb section, and dual slides for group events.', faqQuestions: ['What makes this an inflatable challenge course?', 'How should I plan the 15.2 m challenge-course footprint and dual slide exits?', 'Can the oversized ball obstacles and color layout be customized?', 'Is this inflatable wipeout course suitable for obstacle course parties?', 'How should operators manage entry, exit, and supervision for the ball-obstacle route?', 'What information is needed for an inflatable challenge course factory quote?'] },
  'fun-run-obstacle-inflatable': { displayTitle: 'Fun Run Obstacle Course', keywords: ['fun run obstacle course', 'inflatable obstacle course run', 'inflatable race course', 'field day obstacle course'], visual: 'a red-and-blue linear obstacle course with a long pass-through route, circular front openings, mesh side walls, climbing elements, and a slide finish', purpose: 'The long, linear layout supports organized participant flow for fun runs, school field days, corporate activity sessions, and repeat-use rental events.', buyer: 'event organizers, school activity teams, party-rental businesses, corporate event agencies, and family entertainment operators', application: 'fun runs, school field days, community festivals, corporate team activities, and rental programs', customization: 'race-route length, colors, obstacle sequence, start and finish graphics, logo panels, slide treatment, accessories, and export packing', cardSummary: 'Fun run obstacle course with a long red-and-blue pass-through route, climbing challenges, and a slide finish for organized events.', faqQuestions: ['What activities suit this fun run obstacle course?', 'How should I plan the linear inflatable obstacle course run and participant flow?', 'Can the colors, start-and-finish graphics, and obstacle sequence be customized?', 'What material is listed for this inflatable race course?', 'What queue, staffing, and supervision plan is recommended for a field day obstacle course?', 'What should I include in a fun run obstacle course quote request?'] },
  'jungle-obstacle-course-inflatable': { displayTitle: 'Jungle Obstacle Course', keywords: ['jungle obstacle course', 'jungle inflatable obstacle course', 'safari obstacle course', 'large inflatable obstacle course'], visual: 'a long jungle-themed course with palm-tree columns, striped bridge details, multiple climbing slopes, a central obstacle route, and tall slide sections', purpose: 'The palm and safari-style visual treatment turns a long challenge layout into a recognizable jungle attraction for resorts, rental fleets, school events, and family venues.', buyer: 'commercial rental fleets, resorts, family entertainment centers, schools, event agencies, and inflatable distributors', application: 'jungle parties, safari-themed events, resort recreation, school fun days, and commercial rental programs', customization: 'palm-tree treatment, safari graphics, course length, slide configuration, colors, logo panels, obstacle modules, and accessories', cardSummary: 'Jungle obstacle course with palm-tree columns, multiple climbing slopes, safari styling, and slide sections for commercial events.', faqQuestions: ['What features are shown on this jungle obstacle course?', 'How should buyers plan the 18.3 m jungle inflatable obstacle course footprint?', 'Can the palm trees, safari graphics, and slide sections be customized?', 'Is this large jungle course suitable for resort and rental programs?', 'What setup and supervision checks matter for a long safari obstacle course?', 'What should I send for a jungle obstacle course factory quotation?'] },
  'tropical-bounce-house-obstacle-course': { displayTitle: 'Tropical Obstacle Course', keywords: ['tropical obstacle course', 'tropical bounce obstacle course', 'inflatable obstacle course with slide', 'outdoor inflatable course'], visual: 'a compact tropical course with palm-tree columns, a covered bounce-and-obstacle area, a front entry, and a tall blue slide with bright yellow and orange trim', purpose: 'The compact tropical theme combines bounce play, obstacles, and a visible slide for resort packages, backyard-style event layouts, and commercial rentals where a shorter footprint is preferred.', buyer: 'party-rental companies, resorts, schools, family entertainment venues, event agencies, and distributors', application: 'tropical parties, resort recreation, school events, family celebrations, and outdoor rental programs', customization: 'palm graphics, colorway, slide finish, logo panels, route features, dimensions, accessories, and export packing', cardSummary: 'Tropical obstacle course with palm-tree styling, a bounce-and-obstacle area, and a tall slide for resort and party events.', faqQuestions: ['What is included in this tropical obstacle course?', 'How should I plan the compact tropical bounce obstacle course footprint?', 'Can the palm-tree graphics, colors, and slide treatment be customized?', 'Does this inflatable obstacle course with slide suit outdoor rental events?', 'What pre-use inspection and weather checks should operators complete?', 'What information is needed for a tropical obstacle course quotation?'] },
  'red-and-blue-obstacle-course': { displayTitle: 'Inflatable Obstacle Course Party', keywords: ['inflatable obstacle course party', 'obstacle course birthday party', 'obstacle course moon bounce', 'indoor inflatable obstacle course'], visual: 'a compact blue, red, yellow, and green castle-style course with tall pointed towers, rounded entry arches, mesh bounce sections, and a short slide', purpose: 'The compact castle-style layout gives party operators a bright obstacle-and-bounce attraction for birthday packages, school events, indoor venues, and family celebrations.', buyer: 'party-rental companies, birthday-event operators, schools, indoor play venues, family entertainment centers, and distributors', application: 'obstacle course parties, birthday celebrations, school fun days, indoor events, and commercial rentals', customization: 'tower accents, color layout, logo panels, obstacle features, slide treatment, dimensions, accessories, and packing', cardSummary: 'Inflatable obstacle course party unit with castle towers, bounce sections, rounded arches, and a compact slide for birthday events.', faqQuestions: ['What is this inflatable obstacle course party unit designed for?', 'How should I plan the compact obstacle course birthday party footprint?', 'Can the castle towers, colors, and printed branding be customized?', 'Does the layout include a bounce area, obstacles, and a slide?', 'Is this obstacle course moon bounce suitable for indoor event venues?', 'What should I include in an inflatable obstacle course party quotation?'] },
  'ninja-warrior-kids-obstacle-course': { displayTitle: 'Ninja Warrior Blow Up Course', keywords: ['ninja warrior blow up course', 'ninja warrior inflatable course', 'ninja inflatable obstacle course', 'inflatable ninja course'], visual: 'a compact blue, red, yellow, and green course with oversized rounded arches, mesh-sided play zones, bounce activity, pass-through obstacles, and a short slide', purpose: 'The arch-led route provides a compact ninja-style challenge format for supervised school events, parties, indoor venues, and rental packages without claiming affiliation with any television program or brand.', buyer: 'party-rental operators, schools, camps, family entertainment centers, indoor venues, and event agencies', application: 'ninja-style challenges, school activity days, birthday parties, camps, indoor events, and rental programs', customization: 'arch layout, color palette, logo panels, obstacle route, slide details, dimensions, accessories, and export packing', cardSummary: 'Ninja warrior blow up course with oversized arches, bounce-and-obstacle play zones, mesh sides, and a compact slide.', faqQuestions: ['What is included in this ninja warrior blow up course?', 'How should I plan the compact ninja warrior inflatable course footprint?', 'Can the arch layout, colors, and course modules be customized?', 'Does this product claim affiliation with a ninja television program or brand?', 'What supervision and participant-flow controls should be used for a ninja inflatable obstacle course?', 'What should I send for a ninja warrior blow up course factory quotation?'] },
  'beach-themed-bouncy-castle': { displayTitle: 'Beach Themed Inflatable Obstacle Course', keywords: ['beach inflatable obstacle course', 'beach themed bouncy castle', 'tropical obstacle course', 'inflatable obstacle course with slide'], visual: 'a blue, yellow, and orange beach-style obstacle course with palm-tree columns, a front surfboard detail, climbing access, and a slide', purpose: 'The beach graphics and slide-led layout create a sunny themed attraction for resort events, seaside promotions, family days, and rental packages.', buyer: 'party-rental companies, resorts, family entertainment centers, beach-event organizers, and distributors', application: 'beach parties, resort recreation, tropical events, family days, and commercial rental programs', customization: 'palm or surf artwork, colors, slide treatment, logo panels, lane layout, dimensions, accessories, and export packing', cardSummary: 'Beach inflatable obstacle course with palms, surfboard styling, climbing play, and a slide for resort, party, and rental programs.', faqQuestions: ['What is this beach inflatable obstacle course designed for?', 'How should I plan the beach-themed bouncy castle footprint?', 'Can the palm, surfboard, and slide artwork be customized?', 'Which PVC specification is listed for this tropical obstacle course?', 'What setup and supervision checks are needed for beach or resort events?', 'What should I send for a beach inflatable obstacle course quotation?'] },
  'jungle-island-obstacle-course': { displayTitle: 'Jungle Island Obstacle Course', keywords: ['jungle island obstacle course', 'jungle obstacle course', 'tropical obstacle course', 'inflatable obstacle course with slide'], visual: 'a compact jungle-island course with palm trees, a hut-style peak, crawl-through obstacles, and a short slide', purpose: 'The island theme combines recognizable jungle scenery with a compact run-and-slide sequence for family events and tropical rental packages.', buyer: 'party-rental operators, resorts, schools, family venues, and event companies', application: 'tropical parties, resort recreation, school events, family entertainment, and rental programs', customization: 'jungle graphics, palm details, hut peak, colors, logo panels, route elements, accessories, and packing', cardSummary: 'Jungle island obstacle course with palm details, hut styling, crawl-through challenges, and a compact slide.', faqQuestions: ['What features are shown on this jungle island obstacle course?', 'How much room should I allow for the listed jungle course?', 'Can the palm trees, hut design, and printed artwork be changed?', 'Is this jungle obstacle course suitable for commercial rental?', 'How should operators manage entry, exit, and child supervision?', 'What information is needed for a jungle island obstacle course factory quote?'] },
  'jungle-inflatable-obstacle-course': { displayTitle: 'Jungle Inflatable Obstacle Course', keywords: ['jungle inflatable obstacle course', 'jungle obstacle course', 'inflatable obstacle course for sale', 'tropical inflatable obstacle course'], visual: 'a palm-tree jungle obstacle course with a central climbing section, bright striped pillars, and a green slide finish', purpose: 'The palm-tree structure gives rental fleets and family venues a recognizable tropical challenge route with climbing, passing, and sliding activity.', buyer: 'commercial rental fleets, family entertainment centers, resorts, schools, and event agencies', application: 'jungle parties, tropical events, school fun days, resort programs, and inflatable rentals', customization: 'palm-tree layout, animal or jungle graphics, colors, slide position, logo printing, route modules, and accessories', cardSummary: 'Jungle inflatable obstacle course with palm columns, climbing activity, pass-through challenges, and a slide finish.', faqQuestions: ['What is included in this jungle inflatable obstacle course?', 'How should buyers plan the 12 x 4 m jungle course footprint?', 'Can this tropical obstacle course be branded for a rental fleet?', 'What material is specified for the inflatable jungle course?', 'What operational checks matter for repeat jungle-course rentals?', 'What should buyers include in a jungle inflatable obstacle course inquiry?'] },
  'western-bounce-obstacle-course': { displayTitle: 'Western Bounce Obstacle Course', keywords: ['western bounce obstacle course', 'cowboy inflatable obstacle course', 'western themed obstacle course', 'inflatable obstacle course for sale'], visual: 'a western-style bounce obstacle course with tall cowboy-themed decorative columns, a run-through route, and a slide', purpose: 'The western styling gives rodeo-themed parties, ranch events, and rental operators a recognizable themed challenge attraction with a clear entry-to-slide flow.', buyer: 'party-rental companies, rodeo-event organizers, family venues, schools, and themed-event agencies', application: 'western parties, rodeo events, school fairs, family days, and commercial rentals', customization: 'western or cowboy artwork, colors, route length, slide layout, logo panels, accessories, and export packing', cardSummary: 'Western bounce obstacle course with cowboy-themed details, run-through play, and a slide for rodeo and party events.', faqQuestions: ['What events suit this western bounce obstacle course?', 'How should I plan the western obstacle course footprint and slide exit?', 'Can cowboy graphics and brand panels be customized?', 'Does this course combine bounce, obstacles, and a slide?', 'What staffing and inspection routine is recommended for rental use?', 'What should I include in a western themed obstacle course quote request?'] },
  'tractor-obstacle-course': { displayTitle: 'Tractor Inflatable Obstacle Course', keywords: ['tractor obstacle course', 'farm inflatable obstacle course', 'tractor themed inflatable', 'inflatable obstacle course for sale'], visual: 'a green tractor-style obstacle course with oversized tire arches, a tractor cab facade, a tunnel route, and a slide', purpose: 'The tractor silhouette turns a standard challenge course into a farm-theme attraction for harvest events, rural venues, family days, and themed rental packages.', buyer: 'party-rental fleets, farm attractions, schools, rural event organizers, and family entertainment venues', application: 'farm festivals, harvest events, tractor parties, school fun days, and rental programs', customization: 'tractor colors, tire or cab styling, farm graphics, logo panels, route layout, slide finish, and accessories', cardSummary: 'Tractor inflatable obstacle course with giant tire arches, cab styling, a tunnel route, and slide-led farm-theme play.', faqQuestions: ['What is the tractor obstacle course designed for?', 'How should I plan space for the tractor-themed inflatable?', 'Can the tractor cab, tires, and farm artwork be customized?', 'What material is listed for this farm inflatable obstacle course?', 'What setup checks should rental operators complete before use?', 'What details are needed for a tractor obstacle course factory quotation?'] },
  'jungle-inflatable-obstacle-course-manufacturer': { displayTitle: 'Commercial Jungle Inflatable Obstacle Course', keywords: ['commercial jungle inflatable obstacle course', 'jungle obstacle course manufacturer', 'large jungle obstacle course', 'inflatable obstacle course for sale'], visual: 'a long palm-tree jungle course with multiple climbing and slide sections, striped columns, and animal-themed printed panels', purpose: 'This longer jungle layout is designed for commercial operators who need a prominent tropical challenge route with more visible climbing, passing, and slide activity.', buyer: 'rental businesses, resorts, parks, schools, family entertainment centers, and inflatable distributors', application: 'commercial rental fleets, tropical event zones, school field days, resort recreation, and family venues', customization: 'course length, palm or animal graphics, slide configuration, colors, logo panels, obstacle sequence, accessories, and packing', cardSummary: 'Commercial jungle obstacle course with a long palm-lined route, multiple challenges, and a slide configuration for rental fleets.', faqQuestions: ['Why is this a commercial jungle inflatable obstacle course?', 'How should buyers plan the long jungle route and clear zones?', 'Can the jungle graphics and obstacle sequence be customized?', 'Which material and construction points should be confirmed before production?', 'How should a rental fleet operate and store a large jungle course?', 'What should I send to a jungle obstacle course manufacturer for a quote?'] },
  'extreme-inflatable-obstacle-course': { displayTitle: 'Extreme Inflatable Obstacle Course', keywords: ['extreme inflatable obstacle course', 'giant inflatable obstacle course', 'large inflatable obstacle course', 'adult inflatable obstacle course'], visual: 'a large red-and-blue multi-lane challenge layout with tall slides, climb walls, tunnels, and parallel obstacle sections', purpose: 'The wide multi-section format creates a high-visibility race attraction for larger event footprints, adult group challenges, and commercial rental programs.', buyer: 'event companies, large rental fleets, sports-day organizers, parks, corporate team-building providers, and FECs', application: 'large events, adult challenges, corporate team building, school field days, and commercial rentals', customization: 'lane count, obstacle modules, colors, logo panels, slide height, course length, start and finish details, and accessories', cardSummary: 'Extreme inflatable obstacle course with a wide red-and-blue race layout, multiple challenge zones, tall slides, and parallel lanes.', faqQuestions: ['What makes this an extreme inflatable obstacle course?', 'How much event space is required for the 23 m multi-lane course?', 'Can the lanes, slide sections, and logos be customized?', 'Is this large inflatable obstacle course suitable for adult challenges?', 'What supervision and player-flow plan should be used for a wide course?', 'What details are needed for an extreme obstacle course factory quotation?'] },
  'army-inflatable-obstacle-course': { displayTitle: 'Army Inflatable Obstacle Course', keywords: ['army inflatable obstacle course', 'army obstacle course bouncy castle', 'military inflatable obstacle course', 'boot camp inflatable obstacle course'], visual: 'a camouflage obstacle course with a central climb-and-slide section, military-style graphics, and a long challenge route', purpose: 'The camouflage theme supports boot-camp, army-style, and team challenge events without making claims about military training or official use.', buyer: 'event companies, party-rental businesses, schools, team-building organizers, sports venues, and outdoor attractions', application: 'boot-camp events, team challenges, school field days, themed parties, and rental programs', customization: 'camouflage treatment, colors, challenge route, logo panels, slide layout, dimensions, accessories, and export packing', cardSummary: 'Army inflatable obstacle course with camouflage graphics, climb-and-slide action, and a long boot-camp-style challenge route.', faqQuestions: ['What events suit this army inflatable obstacle course?', 'How should I plan the 25 m boot-camp obstacle route?', 'Can the camouflage colors and challenge modules be customized?', 'Is this army obstacle course intended for official military training?', 'What operating checks matter for a long outdoor challenge course?', 'What should I include in an army inflatable obstacle course quotation?'] },
  'adult-inflatable-obstacle-course': { displayTitle: 'Adult Inflatable Obstacle Course', keywords: ['adult inflatable obstacle course', 'adult size obstacle course', 'blow up obstacle course for adults', 'large inflatable obstacle course'], visual: 'a 28 m gray, black, and red obstacle course with repeated arches, climbing sections, crawl-through elements, and a slide finish', purpose: 'The extended 28 m route is positioned for adult-oriented event challenges, corporate activity days, and larger rental programs where a longer race sequence is required.', buyer: 'corporate event agencies, adult party-rental fleets, team-building providers, sports organizers, and large venues', application: 'corporate team building, adult parties, sports days, large rental events, and challenge programs', customization: 'course length, color accents, logo panels, route elements, arch sequence, slide layout, accessories, and packing', cardSummary: 'Adult inflatable obstacle course with a 28 m gray-and-red challenge route, repeated arches, climbing elements, and a slide finish.', faqQuestions: ['What is this adult inflatable obstacle course designed for?', 'How should I plan the 28 m adult challenge route?', 'Can the course colors, branded panels, and obstacle sequence be customized?', 'Is this large obstacle course appropriate for mixed adult event groups?', 'What player rotation and supervision checks should operators prepare?', 'What information is required for an adult inflatable obstacle course quote?'] },
  'fun-obstacle-course-for-adults': { displayTitle: 'Fun Obstacle Course for Adults', keywords: ['fun obstacle course for adults', 'adult bouncy obstacle course', 'adult inflatable course', 'inflatable fun run'], visual: 'a 28 m pink, gray, and black adult challenge course with high arches, climbing elements, pass-through obstacles, and a slide', purpose: 'The bright color treatment gives adult events and rental fleets a more playful long-format challenge course for social races, team days, and mixed-age activity programs.', buyer: 'event agencies, adult rental operators, corporate team-building teams, schools, community venues, and entertainment parks', application: 'adult fun runs, corporate events, community festivals, team challenges, and rental programs', customization: 'color palette, arch design, route sequence, logo panels, slide treatment, accessories, and export packing', cardSummary: 'Fun obstacle course for adults with a playful pink-and-gray 28 m route, arches, climb-through challenges, and a slide.', faqQuestions: ['What is this fun obstacle course for adults designed for?', 'How should I use the 28 m course for a fun run or team event?', 'Can the bright colors and logo panels be customized?', 'What is the difference between this and a youth obstacle course?', 'How should operators manage races, queues, and supervision?', 'What should I provide for an adult fun obstacle course factory quote?'] },
  'inflatable-obstacle-run': { displayTitle: 'Inflatable Obstacle Run', keywords: ['inflatable obstacle run', 'inflatable obstacle course run', 'fun run obstacle course', 'inflatable race course'], visual: 'a blue and green 28 m race-style obstacle course with repeated arches, climbing sections, barriers, and a slide finish', purpose: 'The repeating arch layout is designed around a clear start-to-finish obstacle-run format for event races, field days, rental fleets, and organized group challenges.', buyer: 'event organizers, school activity teams, rental companies, sports promoters, and corporate team-building providers', application: 'fun runs, field days, obstacle races, school programs, and commercial rental events', customization: 'course length, colors, start and finish graphics, obstacle sequence, logo panels, lane arrangement, accessories, and packing', cardSummary: 'Inflatable obstacle run with a blue-and-green 28 m race route, repeated arches, barriers, climbing activity, and a slide finish.', faqQuestions: ['What is an inflatable obstacle run used for?', 'How should I plan a start-to-finish inflatable race course?', 'Can the arch sequence, colors, and event branding be customized?', 'Is this inflatable obstacle run suitable for field days?', 'What safety and flow controls should be used for timed races?', 'What information is needed for an inflatable obstacle course run quotation?'] },
  'ninja-challenge-obstacle-course-inflatable': { displayTitle: 'Ninja Challenge Inflatable Obstacle Course', keywords: ['ninja challenge obstacle course inflatable', 'inflatable ninja obstacle course', 'ninja warrior inflatable course', 'ninja inflatable obstacle course'], visual: 'a yellow, blue, and pink obstacle course with tall ninja-style arches, climbing sections, tunnel obstacles, and a slide', purpose: 'The colorful ninja challenge layout gives schools, party rentals, and event operators a recognizable climb, pass-through, and slide sequence without implying affiliation with any show or brand.', buyer: 'party-rental companies, schools, sports-day organizers, family entertainment centers, and event agencies', application: 'ninja challenges, school field days, birthday events, family venues, and rental programs', customization: 'ninja-style colors, obstacle route, arch layout, logo panels, slide configuration, dimensions, accessories, and packing', cardSummary: 'Ninja challenge inflatable obstacle course with tall arches, climb-through obstacles, tunnels, and a slide for school and rental events.', faqQuestions: ['What is included in this ninja challenge inflatable obstacle course?', 'How should I plan the 28 m ninja course footprint?', 'Can the ninja-style arches, colors, and course modules be customized?', 'Does the product claim affiliation with a ninja television program?', 'What supervision and player separation should be used for ninja challenges?', 'What should I send for a ninja inflatable obstacle course quotation?'] },
  '5k-inflatable-obstacle-course': { displayTitle: '5K Inflatable Obstacle Course', keywords: ['5k inflatable obstacle course', '5k obstacle course', '5k inflatable run', 'inflatable 5k course'], visual: 'a long white obstacle-run course with multiple arches, climbing and slide sections, and a race-oriented linear layout', purpose: 'The long linear design supports organizers planning modular 5K-style inflatable race routes; the listed 38 m section is one obstacle-course unit rather than a complete 5 km event by itself.', buyer: 'race organizers, event agencies, sports promoters, municipal activity teams, large rental fleets, and corporate-event providers', application: '5K-style races, fun runs, obstacle events, sports days, and large group challenges', customization: 'route modules, colors, start and finish branding, obstacle sequence, sponsor panels, dimensions, accessories, and packing', cardSummary: '5K inflatable obstacle course module with a long white race layout, arches, climbing sections, and a slide; ideal for modular fun-run events.', faqQuestions: ['Is this 5K inflatable obstacle course a complete 5 km race?', 'How should organizers use the 38 m obstacle section in a 5K-style event?', 'Can the race route, colors, and sponsor graphics be customized?', 'What surface, access, and participant-flow plan is needed for an inflatable 5K run?', 'What operational checks matter for modular race-course installations?', 'What should I send for a 5K inflatable obstacle course quotation?'] },
  'obstacle-course-car-parking': { displayTitle: 'Car Park Inflatable Obstacle Course', keywords: ['car park inflatable obstacle course', 'outdoor inflatable obstacle course', 'inflatable race course', 'commercial inflatable obstacle course'], visual: 'a long colorful obstacle course with arches, a climbing-and-slide section, and a compact linear footprint suited to open event surfaces', purpose: 'The supplied layout can be planned for open car-park event space, outdoor promotions, and temporary activity zones when surface, access, clearance, and venue permissions are confirmed.', buyer: 'event agencies, shopping centers, parking-lot event organizers, rental businesses, schools, and outdoor venues', application: 'car-park events, outdoor promotions, school activities, pop-up challenge zones, and rentals', customization: 'course length, colors, logo panels, obstacle route, slide design, entry and exit layout, accessories, and packing', cardSummary: 'Car park inflatable obstacle course with a compact colorful race layout for outdoor promotions, open event surfaces, and rental programs.', faqQuestions: ['What is a car park inflatable obstacle course designed for?', 'How should I plan an outdoor obstacle course on a car-park event site?', 'Can the course colors, branding, and route be customized?', 'What site permissions and surface checks should be completed before setup?', 'How should operators manage access, queues, and traffic separation?', 'What details are needed for a car park inflatable obstacle course quote?'] },
  'white-bounce-house-obstacle-course': { displayTitle: 'White Bounce House Obstacle Course', keywords: ['white bounce house obstacle course', 'white inflatable obstacle course', 'wedding obstacle course inflatable', 'white bouncy castle obstacle course'], visual: 'a compact all-white obstacle course with a clean bounce-style entry, upright pillars, pass-through features, and a short slide', purpose: 'The neutral all-white finish gives event planners a refined obstacle format for weddings, luxury parties, brand activations, and upscale rental packages.', buyer: 'wedding-rental companies, event planners, luxury party operators, venues, and commercial rental fleets', application: 'weddings, white-party events, luxury rentals, brand activations, and family celebrations', customization: 'white or neutral palette, logo panels, route features, slide detail, dimensions, accessories, and packing', cardSummary: 'White bounce house obstacle course with a clean neutral finish, compact obstacles, and a slide for wedding and luxury-rental events.', faqQuestions: ['What events suit a white bounce house obstacle course?', 'How should I plan the compact white obstacle course footprint?', 'Can the white finish, logo panels, and slide details be customized?', 'Is this white inflatable obstacle course appropriate for wedding rentals?', 'What cleaning and presentation checks are important for white event inflatables?', 'What should I include in a white bouncy castle obstacle course inquiry?'] },
  'panda-bounce-house-obstacle-course': { displayTitle: 'Panda Bounce House Obstacle Course', keywords: ['panda bounce house obstacle course', 'panda inflatable obstacle course', 'animal themed obstacle course', 'bounce house obstacle course'], visual: 'a compact green, black, and yellow panda-themed obstacle course with printed panda panels, a bounce-and-pass-through route, and a slide', purpose: 'The panda artwork provides a friendly animal theme for birthdays, school programs, zoo-style events, and rental packages with a short obstacle sequence.', buyer: 'party-rental businesses, schools, family entertainment centers, zoos, event companies, and distributors', application: 'panda parties, animal-themed events, school days, family venues, and commercial rentals', customization: 'panda or animal artwork, colors, logo panels, obstacle elements, slide treatment, accessories, and export packing', cardSummary: 'Panda bounce house obstacle course with animal artwork, a compact bounce-and-obstacle route, and a slide for family events.', faqQuestions: ['What is the panda bounce house obstacle course designed for?', 'How should I plan the compact panda obstacle-course footprint?', 'Can the panda artwork and animal-theme graphics be customized?', 'Does this model combine bounce play, obstacles, and a slide?', 'What supervision is recommended for children using a compact animal course?', 'What information is needed for a panda inflatable obstacle course quotation?'] },
};

const boxingRingKeywordSets: Record<string, string[]> = {
  'inflatable-boxing-ring-rental': ['inflatable boxing ring rental', 'inflatable boxing ring rental near me', 'blow up boxing ring rental', 'boxing inflatable rentals'],
  'inflatable-boxing-ring-for-sale': ['inflatable boxing ring for sale', 'inflatable boxing ring for adults', 'inflatable boxing ring and gloves', 'boxing ring bounce house for sale'],
  'boxing-ring-inflatable-rentals': ['boxing ring inflatable rentals', 'bouncy boxing ring rental', 'boxing ring with giant gloves', 'inflatable boxing ring for adults rental'],
  'inflatable-boxing-area': ['inflatable boxing arena', 'inflatable fighting ring', 'blow up fighting ring', 'boxing ring bouncer'],
};

const soccerDartKeywordSets: Record<string, string[]> = {
  'inflatable-soccer-dart-board': ['inflatable soccer dart board', 'soccer dart board', 'soccer dart game', 'blow up soccer dart board'],
  'inflatable-football-dart-game': ['football darts', 'football dart board', 'inflatable football darts', 'inflatable football dartboard'],
  'velcro-football-dart-board': ['football velcro darts', 'velcro football dart board', 'giant velcro darts', 'velcro soccer ball dart board'],
  'inflatable-soccer-dart-board-for-sale': ['inflatable soccer dart board rental', 'soccer dart board rental', 'inflatable dart board rental', 'inflatable dart board rental near me'],
  'giant-soccer-dart-board-for-sale': ['giant soccer dart board', 'giant soccer darts', 'giant inflatable soccer dart board', 'giant inflatable dart board football'],
  'velcro-soccer-darts-for-sale': ['giant velcro soccer dart board', 'soccer velcro dart board', 'inflatable velcro soccer dart board', 'giant inflatable darts'],
  'inflatable-soccer-dart-game': ['inflatable soccer dart game', 'soccer darts inflatable game', 'inflatable dart soccer', 'soccer dartboard'],
  'inflatable-football-darts-for-sale': ['inflatable football darts for sale', 'football darts for sale', 'inflatable dart board football', 'football dart board inflatable'],
};

type InteractiveGameProfile = {
  keywords: string[];
  productType: string;
  visibleLayout: string;
  gameMechanic: string;
  primaryBuyer: string;
  application: string;
  customizationFocus: string;
};

type BubbleTentProfile = {
  keywords: string[];
  productType: string;
  visibleLayout: string;
  primaryBuyer: string;
  application: string;
  customizationFocus: string;
};

type CampingTentProfile = {
  keywords: string[];
  productType: string;
  visibleLayout: string;
  primaryBuyer: string;
  application: string;
  customizationFocus: string;
};

type NightclubTentProfile = {
  keywords: string[];
  productType: string;
  visibleLayout: string;
  primaryBuyer: string;
  application: string;
  customizationFocus: string;
};

type WeddingTentProfile = {
  keywords: string[];
  productType: string;
  visibleLayout: string;
  primaryBuyer: string;
  application: string;
  customizationFocus: string;
};

// Transparent tent uploads are deliberately profiled one by one. Their
// individual keywords, visible form, and buyer intent stay distinct instead
// of competing with a single generic bubble-tent page.
const bubbleTentProfiles: Record<string, BubbleTentProfile> = {
  'tunnel-inflatable-transparent-dome-tent': {
    keywords: ['inflatable transparent dome tent', 'clear inflatable dome tent', '3m bubble tent', 'inflatable clear dome'],
    productType: 'transparent tunnel-entry inflatable dome tent',
    visibleLayout: 'a clear 3 m dome with a 2.6 m tunnel-style entrance for a defined guest approach and enclosed display area',
    primaryBuyer: 'event agencies, exhibition contractors, hospitality venues, glamping operators, and branded-activation teams',
    application: 'compact exhibitions, VIP lounges, product displays, photo moments, and outdoor hospitality installations',
    customizationFocus: 'dome and tunnel dimensions, door position, clear-panel arrangement, printed graphics, lighting points, anchoring, and accessory package',
  },
  'commercial-pink-inflatable-bubble-house': {
    keywords: ['bubble house inflatable', 'pink inflatable bubble house', 'bubble tent party', 'inflatable bubble house tent'],
    productType: 'commercial pink inflatable bubble house',
    visibleLayout: 'a clear round party enclosure framed by a pink inflatable base and arch structure, with room for balloons and themed interior decor',
    primaryBuyer: 'party-rental companies, event stylists, balloon decorators, family venues, and celebration planners',
    application: 'birthday parties, baby showers, wedding displays, retail photo areas, and styled rental packages',
    customizationFocus: 'pink or custom colorway, balloon-entry arrangement, diameter, door layout, printed logo panels, interior decor attachment points, anchoring, and packing',
  },
  'bubble-house-inflatable': {
    keywords: ['inflatable bubble house', 'bubble balloon house', 'bubble house inflatable tent', 'clear inflatable bubble house'],
    productType: 'clear commercial inflatable bubble house',
    visibleLayout: 'a transparent round event enclosure with an inflatable perimeter frame and a clear interior designed for balloon-filled or styled displays',
    primaryBuyer: 'party-rental fleets, balloon businesses, event agencies, family entertainment venues, and retail marketers',
    application: 'balloon installations, celebration photo areas, mall promotions, product launches, and event-rental inventory',
    customizationFocus: 'overall diameter, clear-wall layout, balloon access, entrance position, colors, logo printing, lighting coordination, anchoring, and export packing',
  },
  'blow-up-bubble-tent': {
    keywords: ['blow up bubble tent', 'clear blow up tent', 'blow up clear bubble tent', 'outdoor inflatable bubble tent'],
    productType: 'clear outdoor blow-up bubble tent',
    visibleLayout: 'a transparent inflatable tent enclosure with a clear curved shell and a protected entry for temporary event use',
    primaryBuyer: 'event rental companies, resort operators, exhibition teams, glamping businesses, and outdoor hospitality planners',
    application: 'outdoor events, compact display spaces, seasonal hospitality, branded pop-ups, and guest photo installations',
    customizationFocus: 'footprint, doorway style, clear-shell configuration, ventilation arrangement, lighting access, branding, anchoring, blower specification, and transport packing',
  },
  'commercial-inflatable-bubble-dome': {
    keywords: ['inflatable bubble dome', 'clear inflatable bubble dome', 'outdoor inflatable bubble dome', 'inflatable bubble dome tent'],
    productType: 'commercial clear inflatable bubble dome',
    visibleLayout: 'a clear igloo-style dome with a reinforced inflatable base, a rounded viewing profile, and a configurable event entrance',
    primaryBuyer: 'exhibition builders, event agencies, resorts, hospitality venues, and commercial rental operators',
    application: 'brand activations, exhibition lounges, venue hospitality, outdoor displays, and temporary event shelters',
    customizationFocus: 'dome diameter, entrance or tunnel, clear-panel configuration, brand graphics, lighting points, anchoring, blower, weather-planning accessories, and packing',
  },
  'inflatable-bubble-balloon-house': {
    keywords: ['inflatable bubble balloon house', 'bubble bounce house', 'bounce house with bubbles', 'blow up bubble ball house'],
    productType: 'balloon-ready inflatable bubble event house',
    visibleLayout: 'a clear inflatable house-style enclosure with a rounded transparent chamber and a decorated balloon-display interior',
    primaryBuyer: 'balloon stylists, party-rental operators, event planners, family venues, and retail activation teams',
    application: 'balloon backdrops, celebration displays, party rental packages, family-event photo zones, and promotional installations',
    customizationFocus: 'balloon-access point, interior layout, overall size, color accents, door placement, custom branding, decor interfaces, anchoring, and accessory packing',
  },
  'inflatable-bubble-tent-for-sale': {
    keywords: ['inflatable bubble tent for sale', 'bubble tent for sale', 'best inflatable bubble tent', 'portable bubble tent'],
    productType: 'portable commercial inflatable bubble tent',
    visibleLayout: 'a transparent portable event tent with a rounded clear enclosure and a compact inflatable support structure for temporary installations',
    primaryBuyer: 'commercial rental businesses, event operators, glamping providers, hospitality venues, and inflatable-equipment distributors',
    application: 'rental fleets, outdoor guest experiences, promotional displays, pop-up lounges, and mobile event programs',
    customizationFocus: 'portable footprint, entry arrangement, clear-panel layout, branding, lighting access, blower and anchoring package, carry bags, repair kit, and export packing',
  },
  'blow-up-bubble-house': {
    keywords: ['blow up bubble house', 'outdoor inflatable bubble', 'clear inflatable tent', 'waterproof bubble tent'],
    productType: 'commercial blow-up clear bubble house',
    visibleLayout: 'a clear house-style inflatable enclosure with a rounded viewing chamber, colored base details, and an event-ready entrance',
    primaryBuyer: 'party-rental companies, outdoor event agencies, resorts, retail venues, and commercial display operators',
    application: 'outdoor party displays, branded event enclosures, photo installations, hospitality lounges, and seasonal activations',
    customizationFocus: 'clear-shell structure, entrance, footprint, color accents, logo panels, lighting setup, anchoring, blower package, packed configuration, and destination requirements',
  },
};

// Camping-tent uploads use distinct purchase-intent terms and visible layouts
// so nearby products do not compete for the same search answer.
const campingTentProfiles: Record<string, CampingTentProfile> = {
  'blowup-camping-tent': {
    keywords: ['inflatable camping tent', 'blow up camping tent', 'air tent for camping', 'inflatable camping shelter'],
    productType: 'commercial black inflatable camping tent',
    visibleLayout: 'a 6 m diameter black dome shelter with a wide zip entry, window panel, and inflated structural tubes shown in a mountain campsite setting',
    primaryBuyer: 'glamping operators, outdoor-event suppliers, commercial rental fleets, resorts, campsites, and expedition-support providers',
    application: 'glamping camps, outdoor hospitality, equipment rental, base-camp shelter, branded overnight programs, and managed outdoor events',
    customizationFocus: 'dome diameter, door and window layout, color, printed logo panels, ventilation, floor configuration, anchoring, blower or pump package, and export packing',
  },
  'yellow-and-blue-inflatable-camping-tent': {
    keywords: ['inflatable family tent', 'inflatable camping house', 'air beam tent', 'outdoor inflatable tent'],
    productType: 'commercial yellow-and-blue inflatable family tent',
    visibleLayout: 'a 6 m diameter yellow-and-blue round camping shelter with a front door, side window, inflated air-beam frame, and family campsite arrangement',
    primaryBuyer: 'family-camp operators, holiday parks, outdoor-rental suppliers, youth-camp organizers, resorts, and glamping businesses',
    application: 'family glamping, campsite accommodation, outdoor hospitality, youth-camp programs, rental inventory, and seasonal event shelter',
    customizationFocus: 'color blocking, diameter, air-beam arrangement, doorway and window positions, logo panels, floor and interior layout, ventilation, anchoring, inflation package, and export packing',
  },
};

const nightclubTentProfiles: Record<string, NightclubTentProfile> = {
  'inflatable-night-club-tent': {
    keywords: ['inflatable nightclub', 'inflatable nightclub tent', 'inflatable nightclub for sale', 'inflatable nightclub rental'],
    productType: 'commercial 10 x 10 m inflatable nightclub tent',
    visibleLayout: 'a black quilted 10 x 10 m event tent with a peaked roof, illuminated interior, serving window, and wide entrance shown in a garden party setting',
    primaryBuyer: 'event-rental companies, nightclub promoters, festivals, resorts, wedding planners, and branded activation agencies',
    application: 'night events, VIP lounges, pop-up bars, wedding receptions, festivals, corporate parties, and hospitality programs',
    customizationFocus: '10 x 10 m layout, entrance and window positions, bar or lounge configuration, lighting interfaces, black or custom colors, printed branding, anchoring, ventilation, and export packing',
  },
  'black-inflatable-party-tent': {
    keywords: ['black inflatable party tent', 'black party tent', 'vip inflatable nightclub', 'party tent black'],
    productType: 'commercial black inflatable party tent',
    visibleLayout: 'a compact black quilted event tent with a peaked roof, front entry, side window, and dark interior shown in a warehouse setup',
    primaryBuyer: 'party-rental operators, wedding suppliers, event planners, hospitality venues, product-launch teams, and mobile bar businesses',
    application: 'private parties, VIP receptions, wedding lounges, product launches, pop-up bars, photo areas, and indoor or outdoor event packages',
    customizationFocus: '4.5 x 4.5 x 3.5 m footprint, entry and window layout, interior service plan, color, logo panels, lighting, anchoring, ventilation, blower package, and transport packing',
  },
  'inflatable-night-club': {
    keywords: ['inflatable night club', 'inflatable dance club', 'portable inflatable nightclub', 'inflatable nightclub inside'],
    productType: 'commercial 9 x 6 m inflatable night club',
    visibleLayout: 'a long black 9 x 6 m inflatable event enclosure with quilted walls, a side entry, and a spacious interior footprint for programmed nightlife use',
    primaryBuyer: 'festival organizers, club promoters, event-rental fleets, resorts, exhibition contractors, and corporate event agencies',
    application: 'dance events, festival nightlife, mobile club programs, sponsor lounges, exhibition after-parties, and temporary hospitality spaces',
    customizationFocus: '9 x 6 m floor plan, entrance and egress, dance-floor or bar zoning, lighting and sound interfaces, colors, sponsor graphics, anchoring, ventilation, and export packing',
  },
};

const weddingTentProfiles: Record<string, WeddingTentProfile> = {
  'white-tents-for-parties': {
    keywords: ['white tents for parties', 'white canopy tent wedding', 'white wedding canopy', 'outdoor white tent wedding'],
    productType: 'commercial 14 x 6 x 4.7 m white inflatable party tent',
    visibleLayout: 'a long white peaked event tent with repeated arch windows, wide sidewall panels, and interior-ready open space shown in a production setting',
    primaryBuyer: 'party-rental companies, wedding planners, catering venues, resorts, event agencies, and hospitality operators',
    application: 'garden parties, wedding ceremonies, receptions, catered celebrations, VIP lounges, and temporary event shelter',
    customizationFocus: '14 x 6 x 4.7 m layout, sidewall and window panels, entrance position, white or custom color treatment, branding, lighting interfaces, anchoring, and packing',
  },
  'large-white-tents-for-weddings': {
    keywords: ['large white tents for weddings', 'white wedding tent', 'large white wedding tent', 'white tents for wedding receptions'],
    productType: 'commercial 14 x 6 x 5 m large white wedding tent',
    visibleLayout: 'a white peaked inflatable reception tent with illuminated structural columns, arch windows, and a wedding-ready entrance shown in an outdoor garden setting',
    primaryBuyer: 'wedding-rental companies, bridal venues, event planners, resorts, caterers, and outdoor-hospitality operators',
    application: 'wedding receptions, ceremony overflow, banquet service, bridal lounges, garden celebrations, and managed outdoor hospitality',
    customizationFocus: '14 x 6 x 5 m footprint, wedding entrance, window configuration, interior reception layout, lighting interfaces, color accents, logo panels, anchoring, and export packing',
  },
  'large-white-event-tent': {
    keywords: ['large white event tent', 'large inflatable marquee', 'white outdoor tent wedding', 'big white tents for weddings'],
    productType: 'commercial 17 x 8.5 x 5 m large white event tent',
    visibleLayout: 'an extended white marquee-style inflatable tent with a long rectangular footprint, repeated arch windows, broad sidewalls, and multiple event zones',
    primaryBuyer: 'large-event contractors, wedding-rental fleets, festival suppliers, exhibition teams, catering companies, and hospitality venues',
    application: 'large wedding receptions, festivals, exhibitions, corporate hospitality, banquets, and multi-zone outdoor events',
    customizationFocus: '17 x 8.5 x 5 m footprint, zone layout, entrances and egress, window and sidewall arrangement, lighting interfaces, branding, anchoring, and transport packing',
  },
  'night-party-wedding-inflatable-tent': {
    keywords: ['wedding inflatable tent', 'white wedding tents for sale', 'wedding white tent', 'white tent wedding reception'],
    productType: 'commercial 6 x 6 m illuminated wedding inflatable tent',
    visibleLayout: 'a compact white peaked inflatable tent with arched windows, a central entrance, and colored night lighting shown as a hosted outdoor party space',
    primaryBuyer: 'wedding planners, party-rental companies, mobile-bar suppliers, resorts, event stylists, and hospitality venues',
    application: 'night weddings, private receptions, after-parties, intimate garden events, illuminated lounges, and rental packages',
    customizationFocus: '6 x 6 m footprint, lighting treatment, entry and window positions, color accents, interior lounge or dining layout, logo panels, anchoring, and packing',
  },
  'led-inflatable-marquee-for-sale': {
    keywords: ['inflatable marquee for sale', 'inflatable cube marquee', 'inflatable dome marquee', 'inflatable party marquee'],
    productType: 'commercial 8 x 6 m LED inflatable marquee',
    visibleLayout: 'a broad white cube-style inflatable marquee with a peaked roof, side entry, and LED-lit exterior shown as a festival VIP lounge at night',
    primaryBuyer: 'festival organizers, event-rental fleets, brand-activation agencies, resorts, exhibition contractors, and hospitality operators',
    application: 'festival VIP lounges, LED-lit parties, product launches, branded activations, mobile bars, and temporary event spaces',
    customizationFocus: '8 x 6 m layout, LED color treatment, entry and egress, interior bar or lounge zoning, sponsor graphics, lighting interfaces, anchoring, and export packing',
  },
};

// These newly added Inflatable Games each use a product-specific profile. The
// profiles keep similar attractions from competing for the same wording while
// making their visible play mechanism explicit for search and AI answers.
const interactiveGameProfiles: Record<string, InteractiveGameProfile> = {
  'inflatable-carnival-game': {
    keywords: ['inflatable carnival game', 'mini carnival booth inflatable', 'compact target game rental', 'inflatable fair game for sale'],
    productType: 'compact inflatable carnival target game',
    visibleLayout: 'a compact 1.5 x 1.5 x 2 m game booth with a front target panel and a covered inflatable frame',
    gameMechanic: 'a quick, score-based target challenge with a defined throwing or shooting line',
    primaryBuyer: 'party-rental companies, schools, carnival operators, event agencies, and family entertainment venues',
    application: 'small carnival stations, school fundraisers, prize booths, and compact event activity zones',
    customizationFocus: 'target artwork, scoring zones, colors, sponsor panels, game accessories, and event messaging',
  },
  '4-in-1-inflatable-interactive-sports-game-with-blower': {
    keywords: ['4 in 1 inflatable interactive sports game', 'inflatable baseball basketball dart game', 'multi sport inflatable challenge', 'sports carnival game rental'],
    productType: 'four-station inflatable sports challenge',
    visibleLayout: 'a 3 x 3 x 3 m open sports booth with baseball, basketball, football, and dart-style target panels',
    gameMechanic: 'four visible skill stations that can run as rotating attempts, timed challenges, or head-to-head scoring',
    primaryBuyer: 'sports-event operators, rental fleets, schools, camps, malls, and family entertainment centers',
    application: 'sports days, team events, fan zones, school programs, and multi-activity rental packages',
    customizationFocus: 'sport-panel selection, target faces, ball or projectile set, score rules, team colors, and sponsor graphics',
  },
  'heavy-duty-4-in-1-sports-interactive-game': {
    keywords: ['heavy duty 4-in-1 sports interactive game', 'commercial inflatable sports booth', 'four station sports challenge', 'all-in-one inflatable skill game'],
    productType: 'heavy-duty four-in-one inflatable sports booth',
    visibleLayout: 'a long 6 x 2.6 x 2.6 m commercial game structure with multiple illustrated sports targets and separate participant stations',
    gameMechanic: 'parallel throwing, kicking, or shooting stations that support individual scores and quick event rotation',
    primaryBuyer: 'commercial rental operators, sports marketers, schools, event companies, and indoor entertainment venues',
    application: 'sports promotions, larger school events, branded fan experiences, and repeat-use rental programs',
    customizationFocus: 'station count, sport graphics, ball set, target layout, score display, logo panels, and packing package',
  },
  'blow-up-soccer-dart-board': {
    keywords: ['blow up soccer dart board', 'inflatable football dart target', 'kick dart board rental', 'soccer scoring inflatable for sale'],
    productType: 'inflatable football dart target game',
    visibleLayout: 'a freestanding inflatable target format designed around a large dartboard-style kicking face',
    gameMechanic: 'players kick compatible balls from a marked line toward scored dartboard zones',
    primaryBuyer: 'soccer clubs, party-rental businesses, schools, fan-zone operators, and event agencies',
    application: 'football fan zones, school sports days, soccer camps, festival games, and rental event packages',
    customizationFocus: 'target face, scoring rings, ball compatibility, kicking line, team colors, sponsor logos, and artwork',
  },
  'commercial-inflatable-human-whack-a-mole-arena': {
    keywords: ['commercial inflatable human whack-a-mole arena', 'human whack a mole game', 'inflatable mole team challenge', 'whack a mole rental attraction'],
    productType: 'commercial human whack-a-mole arena',
    visibleLayout: 'a round black-and-yellow hazard-style arena with several participant openings and a central padded player zone',
    gameMechanic: 'a supervised team challenge in which participants pop up through openings while the central player follows approved soft-play rules',
    primaryBuyer: 'team-building providers, event companies, rental fleets, family entertainment centers, and schools',
    application: 'team challenges, corporate days, indoor event programs, festivals, and supervised group entertainment',
    customizationFocus: 'arena diameter, opening count, central play zone, soft-play accessories, colors, branding, and rule signage',
  },
  'inflatable-axe-throwing-commercial': {
    keywords: ['inflatable axe throwing for sale', 'commercial axe throw game', 'soft axe target rental', 'lumberjack inflatable challenge'],
    productType: 'commercial inflatable axe-throwing target game',
    visibleLayout: 'an inflatable target-game format with a visible throwing lane and soft-play target arrangement',
    gameMechanic: 'supervised score play using compatible soft projectiles rather than real axes',
    primaryBuyer: 'rental operators, bars and entertainment venues, event agencies, team-building providers, and festivals',
    application: 'lumberjack themes, corporate challenges, festival booths, party rentals, and branded event programs',
    customizationFocus: 'target artwork, scoring zones, soft projectile type, throwing distance, theme graphics, logos, and accessory set',
  },
  'inflatable-carnival-games-for-sale': {
    keywords: ['inflatable carnival games for sale', 'commercial fairground game package', 'event target game supplier', 'carnival booth inflatable wholesale'],
    productType: 'commercial inflatable carnival game station',
    visibleLayout: 'a made-to-order carnival-style activity setup configured around visible target or score-play elements',
    gameMechanic: 'short, easy-to-explain skill rounds that support prizes, event queues, and repeat player turns',
    primaryBuyer: 'carnival operators, rental companies, schools, community-event organizers, and entertainment venues',
    application: 'fairgrounds, school carnivals, community events, prize booths, and rental equipment packages',
    customizationFocus: 'game modules, target panels, scoring rules, prize integration, colors, logo printing, and packed configuration',
  },
  'inflatable-electronic-target-toss-game': {
    keywords: ['inflatable electronic target toss game', 'digital score target game', 'interactive ball toss attraction', 'electronic carnival game rental'],
    productType: 'inflatable electronic target toss attraction',
    visibleLayout: 'a black enclosed target booth with a multi-target face and a separate electronic score-console position',
    gameMechanic: 'players throw compatible balls at illuminated or scored targets while the specified electronic system records the result',
    primaryBuyer: 'event agencies, rental businesses, sports-marketing teams, shopping venues, and family entertainment centers',
    application: 'brand activations, competitive event stations, sports promotions, indoor entertainment, and prize games',
    customizationFocus: 'target-face layout, compatible ball set, score display, game timer, colors, sponsor artwork, and electrical specification',
  },
  'inflatable-horse-racing-game': {
    keywords: ['inflatable horse racing game', 'fun derby inflatable race', 'four lane horse derby game', 'inflatable pony race rental'],
    productType: 'four-lane inflatable horse-racing game',
    visibleLayout: 'a Fun Derby race lane with a large entry arch, four marked lanes, and inflatable ride-on horse figures',
    gameMechanic: 'a supervised multi-player derby race with defined lanes, a start line, and event-approved finish rules',
    primaryBuyer: 'party-rental companies, schools, fairs, family entertainment venues, and team-event operators',
    application: 'fun fairs, school field days, western themes, family events, and multi-player rental packages',
    customizationFocus: 'lane count, horse figures, start-finish graphics, colors, sponsor panels, race rules, and accessory package',
  },
  'interactive-whack-a-mole-challenge': {
    keywords: ['interactive whack a mole challenge', 'giant inflatable mole game', 'team pop up challenge', 'inflatable hole game rental'],
    productType: 'large interactive inflatable mole challenge',
    visibleLayout: 'a wide pink-and-purple multi-opening game field with individual player holes and a central challenge area',
    gameMechanic: 'a fast-turn group activity built around pop-up positions, team coordination, and approved soft-play rules',
    primaryBuyer: 'corporate-event planners, team-building providers, schools, festivals, and commercial rental operators',
    application: 'large team-building games, company family days, school activities, festivals, and high-throughput event play',
    customizationFocus: 'opening grid, player count, colorway, soft-play pieces, score rules, sponsor graphics, and carrying configuration',
  },
  'inflatable-bumper-car-track': {
    keywords: ['inflatable bumper car track', 'portable bumper car arena', 'inflatable dodgem track', 'electric bumper car event enclosure'],
    productType: 'portable inflatable bumper-car track enclosure',
    visibleLayout: 'a large rounded inflatable boundary that defines a contained driving arena for compatible bumper cars',
    gameMechanic: 'a managed driving attraction where the track boundary, entry, operator position, vehicle count, and ride rules are planned together',
    primaryBuyer: 'mall operators, amusement providers, event companies, rental fleets, and family entertainment centers',
    application: 'shopping-mall promotions, indoor entertainment, fairs, temporary amusement zones, and operator-led events',
    customizationFocus: 'track footprint, wall height, entry gate, colors, logo panels, vehicle capacity, flooring interface, and packed layout',
  },
  'inflatable-hover-ball-floating-air-transfer-game': {
    keywords: ['inflatable hover ball game', 'floating ball air game', 'inflatable air transfer challenge', 'cone target hover game'],
    productType: 'inflatable hover-ball transfer game',
    visibleLayout: 'a long game table with colorful upright cone targets, two end collection rings, and a central ball-transfer lane',
    gameMechanic: 'players guide lightweight balls through the lane toward targets or collection zones using the approved air-transfer format',
    primaryBuyer: 'schools, science-event organizers, rental businesses, family entertainment centers, and team-event agencies',
    application: 'STEM activity zones, school carnivals, indoor family events, skill challenges, and rental game packages',
    customizationFocus: 'cone layout, lane length, ball set, target rings, game rules, color palette, branded panels, and accessory package',
  },
  'inflatable-jousting-arena': {
    keywords: ['inflatable jousting arena', 'gladiator joust inflatable', 'pedestal jousting challenge', 'pugil stick arena rental'],
    productType: 'inflatable gladiator jousting arena',
    visibleLayout: 'a square enclosed arena with opposing raised pedestals, an inflatable landing floor, and padded boundary rails',
    gameMechanic: 'two participants use approved soft-play accessories in a supervised balance-and-challenge format',
    primaryBuyer: 'rental companies, event operators, team-building providers, schools, and family entertainment centers',
    application: 'gladiator challenges, company events, sports days, party rentals, and supervised festival attractions',
    customizationFocus: 'pedestal placement, arena size, soft-play accessories, colors, logos, rule panels, and packing accessories',
  },
  'inflatable-sports-dome': {
    keywords: ['inflatable sports dome', 'inflatable football training dome', 'portable soccer dome', 'covered inflatable sports hall'],
    productType: 'covered inflatable sports training dome',
    visibleLayout: 'a large green arched enclosure with a covered roof, side openings, and a football-training field environment',
    gameMechanic: 'a covered space for managed sports practice, skills stations, or event activity rather than an unsupervised play device',
    primaryBuyer: 'football clubs, schools, sports academies, event operators, municipalities, and recreation venues',
    application: 'soccer practice, weather-protected training, youth sports programs, temporary sports halls, and club events',
    customizationFocus: 'dome footprint, roof height, door and side openings, sports markings, colors, branding, anchoring, and ventilation details',
  },
  'inflatable-wonder-challenge-tyre-obstacle-run': {
    keywords: ['inflatable tyre obstacle run', 'wonder challenge team game', 'giant tire toss challenge', 'inflatable group puzzle arena'],
    productType: 'large inflatable tyre obstacle challenge',
    visibleLayout: 'a wide multi-opening challenge field with a grid of large tyre-style holes for group play and team movement',
    gameMechanic: 'participants navigate or use the opening grid under event-approved challenge rules with controlled player rotation',
    primaryBuyer: 'team-building companies, schools, festivals, corporate-event planners, and rental operators',
    application: 'team competitions, obstacle challenges, company days, school events, and interactive festival zones',
    customizationFocus: 'opening pattern, game rules, target balls or props, colors, team branding, instruction panels, and packing layout',
  },
  'inflatable-interactive-game': {
    keywords: ['inflatable interactive game', 'four lane carnival skill game', 'inflatable baseball toss booth', 'multi player target challenge'],
    productType: 'four-lane inflatable interactive target game',
    visibleLayout: 'a row of four illustrated baseball-style target booths with individual throwing lanes and front collection areas',
    gameMechanic: 'simultaneous player lanes for ball-toss scores, timed rounds, or prize-based carnival play',
    primaryBuyer: 'carnival operators, rental businesses, schools, sports-event agencies, and family entertainment venues',
    application: 'baseball themes, fairs, school carnivals, player-versus-player events, and event-rental lineups',
    customizationFocus: 'lane count, printed target panels, ball set, score rules, baseball graphics, sponsor logos, and prize integration',
  },
  'football-dart-board-inflatable': {
    keywords: ['football dart board inflatable', 'giant football dart target', 'inflatable dartboard soccer game', 'kick dartboard game for sale'],
    productType: 'freestanding football dartboard target game',
    visibleLayout: 'a 1.3 x 2.5 x 2.9 m black dartboard-style target with a numbered face, a central bullseye, and a stabilizing inflatable base',
    gameMechanic: 'players kick compatible balls from a defined line toward numbered score zones on the upright dartboard face',
    primaryBuyer: 'soccer clubs, party-rental companies, schools, sports bars, fan-zone operators, and event agencies',
    application: 'football fan zones, sports-day target challenges, soccer camps, indoor activity stations, and compact rental packages',
    customizationFocus: 'dartboard face, score zones, compatible ball type, kicking line, base shape, team colors, sponsor graphics, and event rules',
  },
  'inflatable-trampoline-for-sale': {
    keywords: ['inflatable trampoline for sale', 'commercial inflatable bouncer', 'round inflatable jumping pad', 'portable event trampoline rental'],
    productType: 'round commercial inflatable trampoline',
    visibleLayout: 'a 1.8 m diameter low-profile round jumping pad with a central black bounce surface and pink-and-white perimeter air chambers',
    gameMechanic: 'a supervised single-user or controlled-turn jumping activity using the specified central bounce surface',
    primaryBuyer: 'party-rental businesses, family entertainment centers, schools, indoor play venues, and event operators',
    application: 'compact party activities, indoor play programs, school events, supervised rental packages, and family entertainment zones',
    customizationFocus: 'diameter, bounce-surface specification, perimeter colorway, logo panels, capacity guidance, accessories, anchoring approach, and packing',
  },
  'inflatable-water-teeter-totter': {
    keywords: ['inflatable water teeter totter', 'commercial water seesaw', 'floating balance game', 'water park teeter board'],
    productType: 'commercial inflatable water teeter-totter',
    visibleLayout: 'a 3 m green-and-white floating balance board with raised end tubes, a central rocker profile, and integrated grab handles',
    gameMechanic: 'participants balance and shift weight on the floating rocker under a venue-approved aquatic operating plan',
    primaryBuyer: 'water parks, resorts, pool venues, lakeside recreation operators, summer camps, and aquatic-event suppliers',
    application: 'managed pool games, resort recreation, floating water-play zones, summer camps, and supervised aquatic challenges',
    customizationFocus: 'board length, buoyancy layout, handle positions, color scheme, branding, connection or anchoring points, repair kit, and storage package',
  },
  'inflatable-shooting-gallery': {
    keywords: ['inflatable shooting gallery', 'sports target shooting game', 'inflatable cone target booth', 'commercial carnival shooting game'],
    productType: 'commercial inflatable shooting-gallery target game',
    visibleLayout: 'a 3 x 2 x 2.5 m enclosed black event booth with a front counter, a horizontal target lane, and a row of visible cone-style targets',
    gameMechanic: 'players use the approved soft-play projectile or game accessory to hit the designated targets from the operator-defined shooting line',
    primaryBuyer: 'event agencies, party-rental operators, sports-marketing teams, schools, family entertainment centers, and carnival suppliers',
    application: 'sports activations, prize-game booths, school fairs, indoor event challenges, brand promotions, and rental lineups',
    customizationFocus: 'target arrangement, compatible projectile system, throwing or shooting distance, counter graphics, colors, logo panels, score rules, and accessory set',
  },
  '3-in-1-inflatable-carnival-booth': {
    keywords: ['3 in 1 inflatable carnival booth', 'inflatable ball toss booth', 'three game carnival station', 'multi target fair game rental'],
    productType: 'three-in-one inflatable carnival game booth',
    visibleLayout: 'a 3 x 3 x 3 m red-and-yellow carnival booth with three circular target openings and three colored throw lanes on the front face',
    gameMechanic: 'three player positions support short ball-toss rounds toward separate target openings for scoring, prizes, or team rotation',
    primaryBuyer: 'carnival operators, party-rental companies, schools, community-event organizers, family entertainment centers, and marketing agencies',
    application: 'school fundraisers, fairground prize booths, family days, three-player competitions, festivals, and compact event activity zones',
    customizationFocus: 'opening size, lane colors, target panels, ball set, prize or score rules, carnival graphics, sponsor logos, and packing configuration',
  },
  'inflatable-sports-games-rentals': {
    keywords: ['inflatable sports games rentals', 'multi sport inflatable challenge', 'basketball football target game', 'commercial sports carnival booth'],
    productType: 'multi-station inflatable sports challenge',
    visibleLayout: 'a 6 x 2.2 x 2.6 m open sports booth with basketball, football, and target-style activity zones arranged along the front',
    gameMechanic: 'participants rotate through visible ball-skill stations for timed attempts, score comparisons, or supervised group challenges',
    primaryBuyer: 'sports-event companies, rental fleets, schools, camps, shopping venues, football clubs, and family entertainment centers',
    application: 'sports days, fan experiences, corporate activity zones, school programs, mall promotions, and repeat-use rental events',
    customizationFocus: 'sport-station mix, target faces, compatible ball set, score display, lane sequence, sponsor branding, colors, and accessory package',
  },
  'inflatable-soccer-kick-game': {
    keywords: ['inflatable soccer kick game', 'soccer goal target challenge', 'football accuracy game inflatable', 'kick target rental attraction'],
    productType: 'inflatable soccer kick-target game',
    visibleLayout: 'a 6 x 3 x 2.7 m football-themed goal structure with an illustrated goalkeeper face and multiple circular scoring targets',
    gameMechanic: 'players kick compatible footballs from a marked line into selected target holes for an accuracy-based score challenge',
    primaryBuyer: 'soccer clubs, rental businesses, schools, camps, sports-brand activators, family entertainment venues, and event agencies',
    application: 'football festivals, training-day skill stations, school sports programs, fan-zone promotions, camps, and tournament side activities',
    customizationFocus: 'goal dimensions, target-hole pattern, goalkeeper artwork, ball compatibility, kicking distance, scoring rules, team colors, sponsor graphics, and accessories',
  },
  'inflatable-jacobs-ladder': {
    keywords: ['inflatable jacobs ladder', 'inflatable balance ladder challenge', 'two player climbing game', 'jacobs ladder rental game'],
    productType: 'two-player inflatable Jacob\'s Ladder balance challenge',
    visibleLayout: 'a 7 x 4.5 x 4 m red-and-yellow climbing challenge with two suspended rope-ladder lanes above a wide inflatable landing area',
    gameMechanic: 'two participants climb the flexible ladder lanes under supervised rules, using the inflatable base as the defined landing and recovery zone',
    primaryBuyer: 'party-rental companies, team-building providers, schools, camps, adventure-event operators, and family entertainment centers',
    application: 'team challenges, school field days, camp programs, festival attractions, active party rentals, and supervised competition zones',
    customizationFocus: 'ladder-lane count, climbing height, landing-area design, colorway, printed logos, participant rules, accessory package, anchoring, and packed format',
  },
};

function landingKeywordSet(product: Product) {
  return landingKeywordSets[product.productSlug] ?? [];
}

function climbingKeywordSet(product: Product) {
  return climbingKeywordSets[product.productSlug] ?? [];
}

function foamKeywordSet(product: Product) {
  return foamKeywordSets[product.productSlug] ?? [];
}

function volleyballKeywordSet(product: Product) {
  return volleyballKeywordSets[product.productSlug] ?? [];
}

function billiardsKeywordSet(product: Product) {
  const source = product.sourceName.toLowerCase();
  if (/4x7x1\.25m.*human billiards inflatable/.test(source)) return billiardsKeywordSets['human-billiards-inflatable-commercial'];
  if (/4x7x1\.25m.*inflatable billiards pool table/.test(source)) return billiardsKeywordSets['inflatable-billiards-pool-table'];
  if (/尺寸定制.*inflatable billiards table/u.test(source)) return billiardsKeywordSets['inflatable-billiards-table'];
  return billiardsKeywordSets[product.productSlug] ?? [];
}

function soccerFieldKeywordSet(product: Product) {
  return soccerFieldKeywordSets[product.productSlug] ?? [];
}

function axeThrowingKeywordSet(product: Product) {
  return axeThrowingKeywordSets[product.productSlug] ?? [];
}

function ringTossKeywordSet(product: Product) {
  return ringTossKeywordSets[product.productSlug] ?? [];
}

const mechanicalGameProfiles: Record<string, InteractiveGameProfile> = {
  'commercial-mechanical-bull-for-sale': mechanicalBullProfile('commercial mechanical bull for sale', 'commercial mechanical bull', 'inflatable bull ride', 'bucking bulls for sale'),
  'commercial-mechanical-bull': mechanicalBullProfile('commercial mechanical bull', 'mechanical bull riding', 'bull ride machine', 'rodeo bull'),
  'commercial-inflatable-mechanical-bull': mechanicalBullProfile('commercial inflatable mechanical bull', 'inflatable mechanical bull', 'mechanical bull riding machine', 'inflatable rodeo bull'),
  'wipeout-game-inflatable-commercial': sweeperGameProfile('wipeout game inflatable for sale', 'inflatable wipeout game', 'rotating sweeper challenge', 'commercial wipeout arena'),
  'inflatable-mechanical-meltdown-game': sweeperGameProfile('inflatable mechanical meltdown game', 'mechanical meltdown game', 'inflatable sweeper game', 'rotating arm challenge'),
  'wipeout-game-inflatable-for-sale': sweeperGameProfile('large wipeout game inflatable for sale', 'inflatable wipeout game', 'commercial sweeper game', 'rotating obstacle challenge'),
  'inflatable-wipeout-sweeper': sweeperGameProfile('inflatable wipeout sweeper', 'wipeout sweeper game', 'rotating inflatable sweeper', 'operator-led challenge game'),
  'blow-up-bull-riding-machine': mechanicalBullProfile('blow up bull riding machine', 'inflatable bull ride', 'bull riding machine', 'mechanical bull riding'),
  'blow-up-mechanical-bull': mechanicalBullProfile('blow up mechanical bull', 'inflatable mechanical bull', 'mechanical bull', 'blow up bull ride'),
  'inflatable-mechanical-bull-for-sale': mechanicalBullProfile('inflatable mechanical bull for sale', 'commercial mechanical bull', 'electric bull for sale', 'mechanical bull riding machine'),
  'blow-up-mechanical-bull-for-sale': mechanicalBullProfile('blow up mechanical bull for sale', 'inflatable rodeo bull', 'bucking bulls for sale', 'portable mechanical bull'),
  'blow-up-riding-bull': mechanicalBullProfile('blow up riding bull', 'inflatable bull ride', 'rodeo bull riding', 'bull ride machine'),
  'inflatable-pink-pig-mechanical-riding-ride': themedRideProfile('inflatable pink pig mechanical riding ride', 'pink pig mechanical ride', 'inflatable animal riding ride', 'commercial themed ride', 'a pink pig ride figure set inside a circular inflatable safety arena', 'a controlled mechanical-riding attraction with a playful farm-animal visual theme', 'party-rental companies, farm-theme event suppliers, family entertainment centers, and mall activation teams', 'birthday rentals, farm-themed parties, family entertainment programs, seasonal events, and indoor play sessions'),
  'ride-a-bull-inflatable': mechanicalBullProfile('ride a bull inflatable', 'inflatable bull ride', 'rodeo bull', 'mechanical bull for parties'),
  'commercial-mechanical-bull-commercial': mechanicalBullProfile('commercial mechanical bull riding inflatable', 'commercial bull ride machine', 'mechanical bull riding inflatable', 'inflatable mechanical bull'),
  'inflatable-bull-ride-for-sale': mechanicalBullProfile('inflatable bull ride for sale', 'inflatable rodeo bull', 'mechanical bull riding', 'bull riding equipment'),
  'inflatable-bull-riding-machine': mechanicalBullProfile('inflatable bull riding machine', 'bull ride machine', 'mechanical bull riding machine', 'electric bull riding'),
  'inflatable-rodeo-bull-for-sale': mechanicalBullProfile('inflatable rodeo bull for sale', 'rodeo bull', 'inflatable bull ride', 'bucking bull machine'),
  'mechanical-bull-blow-up': mechanicalBullProfile('mechanical bull blow up', 'blow up mechanical bull', 'mechanical rodeo bull', 'portable mechanical bull'),
  'inflatable-mechanical-surfboard': themedRideProfile('inflatable mechanical surfboard', 'mechanical surfboard ride', 'surf simulator inflatable', 'commercial surfboard challenge', 'a surfboard-style ride platform surrounded by an inflatable safety bed', 'a balance-and-riding challenge that simulates changing surfboard movement for supervised participant turns', 'resort activity providers, surf-theme event operators, party-rental companies, FECs, and brand-activation agencies', 'beach parties, surf festivals, resort entertainment, corporate events, and supervised rental programs'),
  'wipeout-inflatable-for-sale': sweeperGameProfile('wipeout inflatable for sale', 'commercial wipeout game', 'inflatable sweeper game', 'rotating obstacle challenge'),
  'blow-up-wipeout-course': sweeperGameProfile('blow up wipeout course', 'inflatable wipeout course', 'sweeper obstacle course', 'rotating arm game'),
  'inflatable-wipeout-obstacle-course-rental': sweeperGameProfile('inflatable wipeout obstacle course rental', 'commercial wipeout obstacle course', 'inflatable sweeper rental', 'rotating challenge arena'),
  'inflatable-sweeper-game': sweeperGameProfile('inflatable sweeper game', 'inflatable wipeout sweeper', 'commercial sweeper game', 'rotating obstacle game'),
  'inflatable-unicorn-mechanical-ride-manufacturer': themedRideProfile('inflatable unicorn mechanical ride manufacturer', 'unicorn mechanical ride', 'inflatable unicorn ride', 'commercial themed ride', 'a unicorn ride figure positioned inside a padded inflatable safety arena', 'a controlled riding attraction with a unicorn visual theme and an operator-led movement program', 'party-rental companies, unicorn-theme event suppliers, family entertainment centers, resorts, and mall activation teams', 'unicorn parties, family entertainment venues, seasonal events, birthday rentals, and resort activity programs'),
  'commercial-grade-interactive-unicorn-challenge-game': themedRideProfile('commercial grade interactive unicorn challenge game', 'unicorn interactive challenge game', 'inflatable unicorn challenge', 'commercial themed game', 'a unicorn-themed interactive ride or challenge format with a protective inflatable perimeter', 'an operator-led unicorn challenge that can be configured around the approved ride or game mechanism', 'family entertainment centers, party-rental businesses, branded-event agencies, schools, and resorts', 'unicorn-themed events, family days, shopping-mall activations, birthday rentals, and supervised entertainment programs'),
  'commercial-grade-interactive-shark-challenge-game': themedRideProfile('commercial grade interactive shark challenge game', 'shark mechanical ride', 'inflatable shark challenge game', 'commercial themed game', 'a shark-themed ride figure or challenge station inside a padded inflatable safety area', 'an operator-led shark challenge designed for themed event play and controlled participant turns', 'aquarium-themed venues, resort operators, party-rental businesses, family entertainment centers, and event agencies', 'beach themes, ocean-themed parties, resort activities, mall promotions, and supervised event entertainment'),
  'inflatable-unicorn-mechanical-riding-ride': themedRideProfile('inflatable unicorn mechanical riding ride', 'unicorn mechanical riding ride', 'inflatable unicorn ride', 'commercial unicorn ride', 'a mechanical unicorn riding figure surrounded by an inflatable safety bed', 'a supervised mechanical-riding experience with a themed unicorn figure and controlled participant turns', 'party-rental companies, family entertainment centers, themed-event planners, resorts, and indoor play venues', 'birthday rentals, unicorn-theme parties, FEC programs, school events, and operator-led seasonal attractions'),
  'mechanical-bull-riding-inflatable': mechanicalBullProfile('mechanical bull riding inflatable', 'inflatable mechanical bull', 'mechanical bull riding', 'portable mechanical bull'),
};

function mechanicalBullProfile(primary: string, second: string, third: string, fourth: string): InteractiveGameProfile {
  return {
    keywords: [primary, second, third, fourth],
    productType: 'commercial mechanical bull riding attraction',
    visibleLayout: 'a rodeo-style bull-riding figure centered in a circular inflatable safety arena',
    gameMechanic: 'an operator-led riding cycle with the approved bull unit, control system, padded inflatable arena, participant rules, and controlled turn rotation',
    primaryBuyer: 'party-rental companies, rodeo-event suppliers, family entertainment centers, resorts, festivals, and corporate-event agencies',
    application: 'western-theme events, party rentals, rodeo activations, resort entertainment, festivals, and supervised corporate challenges',
    customizationFocus: 'arena diameter, bull cover or theme, entry opening, control position, colors, printed branding, safety perimeter, blower package, packing, and export accessories',
  };
}

function sweeperGameProfile(primary: string, second: string, third: string, fourth: string): InteractiveGameProfile {
  return {
    keywords: [primary, second, third, fourth],
    productType: 'commercial rotating sweeper and wipeout challenge game',
    visibleLayout: 'a circular inflatable player arena with a central rotating-arm mechanism and designated participant positions',
    gameMechanic: 'participants time their jumps or ducking movements around an operator-controlled rotating arm in a supervised challenge format',
    primaryBuyer: 'event-rental companies, team-building providers, family entertainment centers, schools, festivals, and resort activity operators',
    application: 'team challenges, school events, festivals, family days, indoor entertainment, and high-throughput rental programs',
    customizationFocus: 'arena diameter, player stations, arm configuration, operator position, colors, sponsor graphics, entrance layout, blower package, packing, and event branding',
  };
}

function themedRideProfile(primary: string, second: string, third: string, fourth: string, visibleLayout: string, gameMechanic: string, primaryBuyer: string, application: string): InteractiveGameProfile {
  return {
    keywords: [primary, second, third, fourth],
    productType: 'commercial themed mechanical riding attraction',
    visibleLayout,
    gameMechanic,
    primaryBuyer,
    application,
    customizationFocus: 'theme figure, arena footprint, entry opening, ride or challenge settings, colors, printed artwork, logo panels, operator position, blower package, packing, and export accessories',
  };
}

function interactiveGameProfile(product: Product) {
  return mechanicalGameProfiles[product.productSlug] ?? interactiveGameProfiles[product.productSlug];
}

function bubbleTentProfile(product: Product) {
  return bubbleTentProfiles[product.productSlug];
}

function campingTentProfile(product: Product) {
  return campingTentProfiles[product.productSlug];
}

function nightclubTentProfile(product: Product) {
  return nightclubTentProfiles[product.productSlug];
}

function weddingTentProfile(product: Product) {
  return weddingTentProfiles[product.productSlug];
}

function battingCageKeywordSet(product: Product) {
  return battingCageKeywordSets[product.productSlug] ?? [];
}

function battingCageProfile(product: Product): BattingCageProfile | undefined {
  return battingCageProfiles[product.productSlug];
}

function waterWalkingBallKeywordSet(product: Product) {
  return waterWalkingBallKeywordSets[product.productSlug] ?? [];
}

function connectFourBasketballKeywordSet(product: Product) {
  return connectFourBasketballKeywordSets[product.productSlug] ?? [];
}

function airHockeyKeywordSet(product: Product) {
  return airHockeyKeywordSets[product.productSlug] ?? [];
}

function hungryHippoKeywordSet(product: Product) {
  return hungryHippoKeywordSets[product.productSlug] ?? [];
}

function halloweenMazeKeywordSet(product: Product) {
  return halloweenMazeKeywordSets[product.productSlug] ?? [];
}

function isNewBilliardsProduct(product: Product) {
  return /^(?:4x7x1\.25m\s+human billiards inflatable|4x7x1\.25m\s+inflatable billiards pool table|尺寸定制\s+inflatable billiards table)$/iu.test(product.sourceName);
}

function bungeeRunKeywordSet(product: Product) {
  return bungeeRunKeywordSets[product.productSlug] ?? [];
}

function boxingRingKeywordSet(product: Product) {
  return boxingRingKeywordSets[product.productSlug] ?? [];
}

function soccerDartKeywordSet(product: Product) {
  return soccerDartKeywordSets[product.productSlug] ?? [];
}

function bumperBallKeywordSet(product: Product) {
  return bumperBallKeywordSets[product.productSlug] ?? [];
}

function obstacleCourseProfile(product: Product) {
  return product.category === 'Inflatable Obstacle Course' ? obstacleCourseProfiles[product.productSlug] : undefined;
}

function productSearchTerms(product: Product) {
  if (obstacleCourseProfile(product)) return obstacleCourseProfile(product)!.keywords;
  if (advertisingDisplayProfile(product)) return advertisingDisplayProfile(product)!.keywords;
  if (foodServiceProfile(product)) return foodServiceProfile(product)!.keywords;
  if (waterSlideProfile(product)) return waterSlideProfile(product)!.keywords;
  if (product.category === 'Bumper Ball') return bumperBallKeywordSet(product);
  if (landingKeywordSet(product).length) return landingKeywordSet(product);
  if (climbingKeywordSet(product).length) return climbingKeywordSet(product);
  if (foamKeywordSet(product).length) return foamKeywordSet(product);
  if (volleyballKeywordSet(product).length) return volleyballKeywordSet(product);
  if (bungeeRunKeywordSet(product).length) return bungeeRunKeywordSet(product);
  if (billiardsKeywordSet(product).length) return billiardsKeywordSet(product);
  if (soccerFieldKeywordSet(product).length) return soccerFieldKeywordSet(product);
  if (axeThrowingKeywordSet(product).length) return axeThrowingKeywordSet(product);
  if (ringTossKeywordSet(product).length) return ringTossKeywordSet(product);
  if (interactiveGameProfile(product)) return interactiveGameProfile(product)!.keywords;
  if (battingCageKeywordSet(product).length) return battingCageKeywordSet(product);
  if (waterWalkingBallKeywordSet(product).length) return waterWalkingBallKeywordSet(product);
  if (flyingFishProfile(product)) return flyingFishProfile(product)!.keywords;
  if (connectFourBasketballKeywordSet(product).length) return connectFourBasketballKeywordSet(product);
  if (airHockeyKeywordSet(product).length) return airHockeyKeywordSet(product);
  if (hungryHippoKeywordSet(product).length) return hungryHippoKeywordSet(product);
  if (halloweenMazeKeywordSet(product).length) return halloweenMazeKeywordSet(product);
  if (boxingRingKeywordSet(product).length) return boxingRingKeywordSet(product);
  return soccerDartKeywordSet(product);
}

function truncateMeta(value: string, maxLength: number, punctuation = '.') {
  if (value.length <= maxLength) return value;
  // Never leave a search snippet ending with a dangling connector such as
  // “and.” or “with.” after the word-boundary trim.
  const shortened = value.slice(0, maxLength - 1)
    .replace(/\s+\S*$/, '')
    .replace(/\s+(and|or|with|for|from|to|the|a|an|of|in)$/i, '')
    .replace(/[,:;\-–—.]+$/, '')
    .trim();
  return `${shortened}${punctuation}`;
}

export function seoTitle(title: string, suffix = 'YIC') {
  // Search-result titles should end cleanly; a truncation period looks like
  // accidental copy and was appearing on a few long product titles.
  return truncateMeta(`${title} | ${suffix}`, 62, '').replace(/\s*\|\s*$/u, '').trim();
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
  const obstacleCourse = obstacleCourseProfile(product);
  if (obstacleCourse) return seoTitle(`${obstacleCourse.keywords[0]} | Commercial Course`);
  const advertisingDisplay = advertisingDisplayProfile(product);
  if (advertisingDisplay) {
    const suffix = advertisingDisplay.kind === 'tunnel' ? 'Custom Sports Tunnel' : 'Custom Mascot Display';
    return seoTitle(`${advertisingDisplay.keywords[0]} | ${suffix}`);
  }
  const foodService = foodServiceProfile(product);
  if (foodService && !isAirDancerProfile(product)) return seoTitle(`${foodService.keywords[0]} | Commercial Event Bar`);
  if (isAirDancerProfile(product)) return seoTitle('Inflatable Air Dancer for Sale | Event Display');
  const waterSlide = waterSlideProfile(product);
  if (waterSlide) {
    if (waterSlide.keywords[0] === 'commercial inflatable pool for water slides') return seoTitle('Commercial Inflatable Water Slide Pool');
    const slideLabel = product.category === 'Inflatable Slide' ? 'Inflatable Slide' : 'Water Slide';
    return seoTitle(`${waterSlide.keywords[0]} | ${slideLabel}`);
  }
  const flyingFish = flyingFishProfile(product);
  if (flyingFish) return seoTitle(`${flyingFish.keywords[0]} | ${flyingFish.seoSuffix}`);
  const newWaterPark = newWaterParkProfile(product);
  if (newWaterPark) return seoTitle(`${newWaterPark.keywords[0]} | Water Park`);
  const newThemePark = newThemeParkProfile(product);
  if (newThemePark) return seoTitle(`${newThemePark.coreKeyword} | Commercial Theme Park`);
  const newTent = newInflatableTentProfile(product);
  if (newTent) return seoTitle(`${newTent.keywords[0]} | Commercial Inflatable Tent`);
  const interactiveProfile = interactiveGameProfile(product);
  if (interactiveProfile) return seoTitle(`${interactiveProfile.keywords[0]} | Commercial Inflatable Game`);
  const bubbleTent = bubbleTentProfile(product);
  if (bubbleTent) return seoTitle(`${bubbleTent.keywords[0]} | Commercial Event Tent`);
  const campingTent = campingTentProfile(product);
  if (campingTent) return seoTitle(`${campingTent.keywords[0]} | Commercial Air Tent`);
  const nightclubTent = nightclubTentProfile(product);
  if (nightclubTent) return seoTitle(`${nightclubTent.keywords[0]} | Commercial Event Tent`);
  const weddingTent = weddingTentProfile(product);
  if (weddingTent) return seoTitle(`${weddingTent.keywords[0]} | Commercial Wedding Tent`);
  if (product.category === 'Bounce House' || product.category === 'Bounce House Combo') {
    return seoTitle(`${bounceHouseCoreKeyword(product)} | ${product.category}`);
  }
  if (product.category === 'Bumper Ball') {
    if (product.productSlug === 'inflatable-bumper-balls-commercial') return seoTitle('Commercial Inflatable Bumper Balls | Youth Sets');
    const primary = bumperBallKeywordSet(product)[0] || 'inflatable bumper ball';
    return seoTitle(`${primary} | Commercial Bubble Soccer`);
  }
  if (battingCageKeywordSet(product).length) {
    return seoTitle(`${battingCageKeywordSet(product)[0]} | Commercial Baseball Training`);
  }
  if (ringTossKeywordSet(product).length) {
    return seoTitle(`${ringTossKeywordSet(product)[0]} | Commercial Carnival Game`);
  }
  const intent = productIntentLabel(product);
  const categoryLabel = product.category.replace(/^Inflatable\s+/i, '');
  const suffix = intent || categoryLabel;
  const compactName = truncateMeta(name, 44, '');
  return seoTitle(`${compactName} | ${suffix}`);
}

export function productMetaDescription(product: Product) {
  const detail = productDetailContent(product);
  const obstacleCourse = obstacleCourseProfile(product);
  if (obstacleCourse) return truncateMeta(`YIC manufactures ${obstacleCourse.keywords[0]} for ${obstacleCourse.application}. ${product.dimensions.trim()}, ${product.material}. Custom artwork and factory quote.`, 158);
  const advertisingDisplay = advertisingDisplayProfile(product);
  if (advertisingDisplay) return truncateMeta(`YIC manufactures ${advertisingDisplay.keywords[0]} for commercial events. ${product.dimensions.trim()}. Custom artwork, branding, and factory quotation.`, 158);
  const foodService = foodServiceProfile(product);
  if (foodService && !isAirDancerProfile(product)) return truncateMeta(`YIC manufactures ${foodService.keywords[0]} for commercial poolside events. ${product.dimensions.trim()}. Custom branding and factory quotation.`, 158);
  if (isAirDancerProfile(product)) {
    const profile = foodServiceProfiles[product.productSlug];
    return truncateMeta('YIC makes ' + profile.keywords[0] + ' for ' + profile.application + '. ' + product.dimensions.trim() + ', ' + product.material + '. Custom artwork and factory quote.', 158);
  }
  const waterSlide = waterSlideProfile(product);
  if (waterSlide) return truncateMeta(`YIC makes ${waterSlide.keywords[0]} for ${waterSlide.application}. ${product.dimensions.trim()}, ${product.material}. Custom ${waterSlide.customizationFocus} and factory quote.`, 158);
  const flyingFish = flyingFishProfile(product);
  if (flyingFish) return truncateMeta(`YIC makes ${flyingFish.keywords[0]} for ${flyingFish.application}. ${product.dimensions.trim()}, ${product.material}. Custom ${flyingFish.customizationFocus} and factory quote.`, 158);
  const waterWalkingKeywords = waterWalkingBallKeywordSet(product);
  if (waterWalkingKeywords.length) {
    const profile = waterWalkingBallProfile(product)!;
    return truncateMeta(`YIC supplies ${waterWalkingKeywords[0]} for ${profile.application}. 2 m diameter, ${product.material}. OEM branding and factory quotes for aquatic venues and rental operators.`, 158);
  }
  const newWaterPark = newWaterParkProfile(product);
  if (newWaterPark) return truncateMeta(`YIC makes ${newWaterPark.keywords[0]} for ${newWaterPark.application}. ${product.dimensions.trim()} · ${product.material}. Custom slides, colors, branding, and factory quotation.`, 158);
  const newThemePark = newThemeParkProfile(product);
  if (newThemePark) return truncateMeta(`YIC makes ${newThemePark.coreKeyword} for ${newThemePark.application}. ${product.dimensions.trim()} · ${product.material}. OEM artwork, layout, branding, and factory quote.`, 158);
  const newTent = newInflatableTentProfile(product);
  if (newTent) return truncateMeta(`YIC manufactures ${newTent.keywords[0]} for ${newTent.use}. ${product.dimensions.trim()}, ${product.material}. OEM layout, branding, anchoring, and project quote.`, 158);
  const interactiveProfile = interactiveGameProfile(product);
  const bubbleTent = bubbleTentProfile(product);
  const campingTent = campingTentProfile(product);
  const nightclubTent = nightclubTentProfile(product);
  const weddingTent = weddingTentProfile(product);
  if (interactiveProfile) {
    return truncateMeta(`Commercial ${interactiveProfile.keywords[0]} for ${interactiveProfile.application}. Confirm ${interactiveProfile.keywords[1]}, OEM branding, layout, and factory quote.`, 158);
  }
  if (bubbleTent) {
    return truncateMeta(`YIC makes ${bubbleTent.keywords[0]} with OEM size, clear layout, branding, blower, and anchoring for commercial events, rentals, and hospitality.`, 158);
  }
  if (campingTent) {
    return truncateMeta(`YIC makes ${campingTent.keywords[0]} for commercial camping, glamping, rentals, and outdoor hospitality. OEM layout, branding, anchoring, and inflation packages.`, 158);
  }
  if (nightclubTent) {
    return truncateMeta(`YIC makes ${nightclubTent.keywords[0]} for events, nightlife, rentals, and hospitality. OEM floor plan, branding, lighting, anchoring, and factory quotes.`, 158);
  }
  if (weddingTent) {
    return truncateMeta(`YIC makes ${weddingTent.keywords[0]} for weddings, events, rentals, and hospitality. OEM layout, lighting, branding, anchoring, and factory quotes.`, 158);
  }
  if (product.category === 'Bounce House' || product.category === 'Bounce House Combo') {
    const core = bounceHouseCoreKeyword(product);
    const comboProfile = bounceComboSeoProfile(product);
    if (comboProfile) return truncateMeta(`YIC manufactures ${comboProfile.keywords[0]} for ${comboProfile.application}. ${product.material}. OEM layout, artwork, and factory quote.`, 158);
    const use = product.category === 'Bounce House Combo' ? 'party rental fleets and family entertainment centers' : 'party rental businesses, family venues, and community events';
    return truncateMeta(`YIC manufactures ${core} for ${use}. ${product.dimensions.trim()}, ${product.material}. Custom artwork, layout, accessories, and factory quotation available.`, 158);
  }
  if (product.category === 'Bumper Ball') {
    if (product.productSlug === 'inflatable-bumper-balls-commercial') {
      return 'YIC manufactures commercial inflatable bumper balls for youth bubble-soccer programs. 1.25m commercial TPU, OEM colors, logos, accessories, and factory quote.';
    }
    const terms = bumperBallKeywordSet(product).slice(0, 2).join(' and ');
    return truncateMeta(`YIC supplies ${terms} in ${product.dimensions.trim()} ${product.material} for bubble-soccer operators, schools, events, and rental fleets. Request OEM colors, logos, accessories, and factory pricing.`, 158);
  }
  if (battingCageKeywordSet(product).length) {
    const terms = battingCageKeywordSet(product);
    return truncateMeta(`YIC manufactures ${terms[0]} for baseball and softball training. Specify the ${terms[1]} layout, netting, OEM branding, and factory quote.`, 158);
  }
  if (ringTossKeywordSet(product).length) {
    const terms = ringTossKeywordSet(product);
    return truncateMeta(`Commercial ${terms[0]} for carnivals, school events, rentals, and branded activations. Plan the ${terms[1]} layout, scoring targets, OEM colors, and factory quote.`, 158);
  }
  const variant = productIntentKeyword(product) || productKeywordVariants(product)[0] || `commercial ${product.category.toLowerCase()}`;
  const buyer = detail.primaryBuyer.split(',')[0];
  return truncateMeta(`YIC manufactures commercial inflatables for ${buyer}. Ask about the ${variant} model, OEM/ODM options, and factory pricing.`, 158);
}

export function productKeyFeatures(product: Product) {
  const detail = productDetailContent(product);
  const searchable = `${product.title} ${product.sourceName}`.toLowerCase();
  const obstacleCourse = obstacleCourseProfile(product);
  if (obstacleCourse) return [
    `Visible layout: ${obstacleCourse.visual}`,
    `Reference construction: ${product.dimensions.trim()} · ${product.material}`,
    `Commercial application: ${obstacleCourse.application}`,
    `Customize ${obstacleCourse.customization} before production`,
  ];
  const advertisingDisplay = advertisingDisplayProfile(product);
  if (advertisingDisplay) return [
    `Visible format: ${advertisingDisplay.visual}`,
    `Reference construction: ${product.dimensions.trim()} · ${product.material}`,
    `Commercial application: ${advertisingDisplay.application}`,
    `Customize ${advertisingDisplay.options} before production`,
  ];
  const foodService = foodServiceProfile(product);
  if (foodService && !isAirDancerProfile(product)) return [
    `Visible format: ${foodService.visual}`,
    `Reference construction: ${product.dimensions.trim()} · ${product.material}`,
    `Commercial application: ${foodService.application}`,
    `Customize ${foodService.options} before production`,
  ];
  if (isAirDancerProfile(product)) {
    const profile = foodServiceProfiles[product.productSlug];
    return [
      'Visible format: ' + profile.visual,
      'Reference construction: ' + product.dimensions.trim() + ' · ' + product.material,
      'Commercial application: ' + profile.application,
      'Customize ' + profile.options + ' before production',
    ];
  }
  const waterSlide = waterSlideProfile(product);
  if (waterSlide) return [
    `Visible layout: ${waterSlide.visual}`,
    `Reference construction: ${product.dimensions.trim()} · ${product.material}`,
    `Commercial application: ${waterSlide.application}`,
    `Customize ${waterSlide.customizationFocus} before production`,
  ];
  const flyingFish = flyingFishProfile(product);
  if (flyingFish) return [
    `Visible format: ${flyingFish.visual}`,
    `Reference construction: ${product.dimensions.trim()} · ${product.material}`,
    `Commercial use: ${flyingFish.application}`,
    `Customize ${flyingFish.customizationFocus} before production`,
  ];
  const newWaterPark = newWaterParkProfile(product);
  if (newWaterPark) return [
    `Visible layout: ${newWaterPark.visual}`,
    `Commercial application: ${newWaterPark.application}`,
    `Typical project buyers: ${newWaterPark.buyer}`,
    `Customization: ${newWaterPark.options}`,
  ];
  const newThemePark = newThemeParkProfile(product);
  if (newThemePark) return [
    `Core product: ${newThemePark.coreKeyword}`,
    `Visible layout: ${newThemePark.visual}`,
    `Commercial application: ${newThemePark.application}`,
    `Customization: ${newThemePark.options}`,
  ];
  const newTent = newInflatableTentProfile(product);
  if (newTent) return [
    `Visual format: ${newTent.visual}`,
    `Reference dimensions: ${product.dimensions.trim()}`,
    `Listed construction: ${product.material}`,
    `Project planning: ${newTent.options}`,
  ];
  if (product.category === 'Bounce House' || product.category === 'Bounce House Combo') {
    const core = bounceHouseCoreKeyword(product);
    const comboProfile = bounceComboSeoProfile(product);
    if (comboProfile) return [
      `Core buyer search: ${comboProfile.keywords[0]}`,
      `Visible layout: ${comboProfile.visual}`,
      `Commercial application: ${comboProfile.application}`,
      `Customize colors, artwork, layout, dimensions, accessories, and packing before production`,
    ];
    return [
      `Core buyer search: ${core}`,
      `Visible layout: ${product.dimensions.trim()} theme and play format`,
      `Commercial use: ${product.category === 'Bounce House Combo' ? 'party rental fleets and family entertainment centers' : 'party rental businesses, family venues, and community events'}`,
      `Customize ${core} with approved colors, artwork, dimensions, access, accessories, and packing`,
    ];
  }
  const interactiveProfile = interactiveGameProfile(product);
  if (interactiveProfile) return [
    `Format shown: ${interactiveProfile.visibleLayout}`,
    `Play concept: ${interactiveProfile.gameMechanic}`,
    'Commercial grade 0.55mm (1000D, 18 OZ) PVC listed for this model',
    `Specify ${interactiveProfile.customizationFocus} before production`,
  ];
  const bubbleTent = bubbleTentProfile(product);
  if (bubbleTent) return [
    `Format shown: ${bubbleTent.visibleLayout}`,
    `${product.material} listed for this model`,
    `Commercial applications: ${bubbleTent.application}`,
    `Specify ${bubbleTent.customizationFocus} before production`,
  ];
  const campingTent = campingTentProfile(product);
  if (campingTent) return [
    `Format shown: ${campingTent.visibleLayout}`,
    `${product.material} listed for this model`,
    `Commercial applications: ${campingTent.application}`,
    `Specify ${campingTent.customizationFocus} before production`,
  ];
  const nightclubTent = nightclubTentProfile(product);
  if (nightclubTent) return [
    `Format shown: ${nightclubTent.visibleLayout}`,
    `${product.material} listed for this model`,
    `Commercial applications: ${nightclubTent.application}`,
    `Specify ${nightclubTent.customizationFocus} before production`,
  ];
  const weddingTent = weddingTentProfile(product);
  if (weddingTent) return [
    `Format shown: ${weddingTent.visibleLayout}`,
    `${product.material} listed for this model`,
    `Commercial applications: ${weddingTent.application}`,
    `Specify ${weddingTent.customizationFocus} before production`,
  ];
  if (product.category === 'Inflatable Games' && battingCageKeywordSet(product).length) return [
    `Reference training enclosure: ${product.dimensions.trim()}`,
    `${battingCageProfile(product)?.visibleLayout ?? 'Enclosed batting tunnel with a protected striking lane and end-net structure'}`,
    `${product.material} listed for this model`,
    'Confirm ball, bat, pitching-machine compatibility, anchoring, clearances, and supervised operation before production',
  ];
  if (product.category === 'Inflatable Games' && ringTossKeywordSet(product).length) return [
    `Reference footprint: ${product.dimensions.trim()}`,
    'Multi-target ring-toss layout with numbered scoring columns and throwing rings',
    'Commercial grade 0.55mm (1000D, 18 OZ) PVC listed for this model',
    'Confirm throwing line, rings, scoring rules, player rotation, anchoring, and supervised event use before production',
  ];
  if (product.category === 'Inflatable Games' && halloweenMazeKeywordSet(product).length) return [
    'Made-to-order inflatable maze footprint and route layout',
    'Halloween or haunted-house theme with custom graphics and wayfinding',
    'Commercial grade 0.55mm (1000D, 18 OZ) PVC listed for this model',
    'Plan entrance, exit, capacity, queue, staffing, anchoring, and emergency access before production',
  ];
  if (product.category === 'Inflatable Games' && hungryHippoKeywordSet(product).length) return [
    `Reference diameter: ${product.dimensions.trim()}`,
    'Human-scale team game built around a central play area and fast participant turns',
    'Commercial grade 0.55mm (1000D, 18 OZ) PVC listed for this model',
    'Confirm player format, harness or attachment details, staffing, anchoring, and clear operating area before production',
  ];
  if (product.category === 'Inflatable Games' && airHockeyKeywordSet(product).length) return [
    /air hockey table/.test(searchable) ? `Reference footprint: ${product.dimensions.trim()}` : 'Compact inflatable air hockey game format for event and rental programs',
    'Two-player puck game with table-style play surface and visible side rails',
    'Commercial grade 0.55mm (1000D, 18 OZ) PVC listed for this model',
    'Confirm blower, puck compatibility, power, operator position, queue, and anchoring before production',
  ];
  if (product.category === 'Inflatable Games' && connectFourBasketballKeywordSet(product).length) return [
    /custom dimensions available/.test(product.dimensions) ? 'Made-to-order Connect Four basketball layout for venue projects' : `Reference footprint: ${product.dimensions.trim()}`,
    'Oversized Connect Four target grid combined with basketball shooting play',
    'Commercial grade 0.55mm (1000D, 18 OZ) PVC listed for this model',
    'Confirm ball size, hoop height, scoring rules, player rotation, anchoring, and queue layout before production',
  ];
  if (waterWalkingBallKeywordSet(product).length) return [
    `Activity format: ${waterWalkingBallKeywordSet(product)[0]} for a managed water session`,
    'Transparent spherical design lets operators monitor the participant during a supervised turn',
    `Commercial use: ${waterWalkingBallProfile(product)!.application}`,
    'Plan participant flow, access, recovery procedures, and venue rules before operation',
  ];
  if (product.category === 'Inflatable Games' && axeThrowingKeywordSet(product).length) return [
    /dual target/.test(searchable) ? 'Dual target faces for head-to-head throwing turns' : 'Inflatable target wall designed for supervised axe-style throwing games',
    'Custom footprint, target layout, scoring zones, and event artwork',
    'Commercial grade 0.55mm (1000D, 18 OZ) PVC listed for this model',
    'Plan compatible soft-play projectiles, throwing line, anchoring, blower, and operator position before production',
  ];
  if (product.category === 'Inflatable Games' && soccerFieldKeywordSet(product).length) {
    if (/human foosball/.test(searchable)) return ['Human-player foosball format with fixed play lanes', `Reference footprint: ${product.dimensions.trim()}`, 'Team, lane, goal, color, and branded-graphic options', 'Commercial PVC with anchoring, blower, packing, and accessory planning'];
    if (/soap|slip and slide/.test(searchable)) return ['Wet-play soccer layout with a defined field boundary', `Reference footprint: ${product.dimensions.trim()}`, 'Wet-use material specification and water-flow setup confirmation', 'Drainage, anchoring, supervision, cleaning, and dry-storage planning'];
    if (/water soccer/.test(searchable)) return ['Water-based soccer play area with perimeter boundaries and goals', `Reference footprint: ${product.dimensions.trim()}`, '0.65 mm PVC specification listed for this model', 'Water-area, depth, anchoring, access, and supervision review'];
    if (/arena/.test(searchable)) return ['Enclosed soccer arena with goals and a contained play area', `Reference footprint: ${product.dimensions.trim()}`, 'Custom colors, goals, markings, and venue branding', 'Surface, anchoring, access, and participant-flow planning'];
    if (/(?:large|giant) inflatable soccer field/.test(searchable) && !/custom dimensions available/.test(product.dimensions)) return ['Large-format field boundary for organized group play', `Reference footprint: ${product.dimensions.trim()}`, 'Commercial PVC specification listed for this model', 'Site access, anchoring, ground preparation, and installation review'];
    if (/custom dimensions available/.test(product.dimensions)) return ['Made-to-order field dimensions based on a venue plan', 'Custom boundary, goal, entry, and field-marking configuration', 'Brand colors, logos, and event graphics available for review', 'Commercial material, blower, anchoring, packing, and accessories confirmed by quote'];
    return ['Portable inflatable soccer field with defined perimeter boundaries', `Reference footprint: ${product.dimensions.trim()}`, 'Custom field markings, colors, goals, and branding', 'Commercial setup, anchoring, packing, and storage planning'];
  }
  if (product.category === 'Inflatable Games' && isNewBilliardsProduct(product) && /billiard|pool table|snooker/.test(searchable)) {
    const isHuman = /human billiards|soccer billiards/.test(searchable);
    const isCustom = /尺寸定制|custom dimensions available/.test(searchable);
    return isHuman
      ? ['Human-scale soccer-billiards play format with an enclosed field', '4 x 7 x 1.25 m reference footprint for event and FEC planning', 'Custom colors, play layout, branding, and project dimensions', 'Commercial PVC construction with packing and accessory coordination']
      : isCustom
        ? ['Made-to-order inflatable billiards layout without a fixed listed size', 'Color and table-zone planning around the venue footprint', 'Custom artwork, branding, and pool or snooker-style play details', 'Commercial material, packing, and accessory options confirmed by quote']
        : ['4 x 7 x 1.25 m inflatable billiards pool-table format', 'Open play area with raised inflatable perimeter walls', 'Outdoor or indoor event configuration subject to site review', 'Custom colors, logo, packing, and commercial order options'];
  }
  if (product.category === 'Inflatable Games' && /soccer dart|football dart|football darts|soccer darts|velcro soccer/.test(searchable)) {
    const isVelcro = /velcro/.test(searchable);
    const isFootball = /football/.test(searchable);
    return [
      `${isVelcro ? 'Hook-and-loop target face' : 'Numbered inflatable dartboard target'} for ${isFootball ? 'football' : 'soccer'}-ball kicking games`,
      'Defined kicking line, player turn, scoring, and spectator zones',
      'Custom target size, colors, scoring layout, logos, and event artwork',
      'Commercial blower, anchoring, ball/accessory, packing, and storage coordination',
    ];
  }
  if (product.category === 'Inflatable Games' && /boxing ring|boxing area|boxing arena|fighting ring/.test(searchable)) {
    const isArena = /arena|area|fighting/.test(searchable);
    const isSale = /for sale/.test(searchable);
    return isArena
      ? ['Open boxing and fighting-ring layout for supervised events', 'Clear ropes, corner, entry, and spectator-zone planning', 'Custom dimensions, branding, graphics, and venue artwork', 'Commercial setup, anchoring, storage, and repair support']
      : isSale
        ? ['Commercial boxing ring format for purchase and repeat use', 'Ropes, corner posts, entry, and glove-zone planning', 'Custom colors, logos, gloves, and promotional artwork', 'Export packing, inspection, accessories, and storage coordination']
        : ['Rental-ready inflatable boxing ring layout', 'Defined ropes, corners, entry, and participant zones', 'Custom dimensions, colors, logos, and giant-glove accessories', 'Setup, cleaning, storage, and repeat-event planning'];
  }
  if (product.category === 'Inflatable Games' && /bungee run/.test(searchable)) {
    const isTwoLane = /2 lane/.test(searchable);
    return isTwoLane
      ? ['Two-lane head-to-head bungee race format', 'Commercial elastic-line and lane layout planning', 'Custom colors, logos, race graphics, and dimensions', 'Rental-friendly packing, anchoring, and repair support']
      : ['Competitive bungee fun-run layout for group events', 'Clear start, finish, lane, and spectator zones', 'Custom branding, colors, artwork, and lane configuration', 'Commercial setup, storage, and repeat-rental planning'];
  }
  if (product.category === 'Inflatable Games' && /volleyball/.test(searchable)) {
    const isWater = /water|pool/.test(searchable);
    const isField = /field/.test(searchable);
    return isWater
      ? ['Floating court and boundary layout for pool or water venues', 'Net, player-zone, and spectator-flow planning', 'Commercial PVC options with custom colors and branding', 'Anchoring, cleaning, drying, storage, and seasonal-use coordination']
      : isField
        ? ['Portable volleyball field layout for team and event programs', 'Court boundary, net, and player-flow planning', 'Custom dimensions, team colors, logos, and sponsor artwork', 'Packing, anchoring, repair-kit, and rental-fleet coordination']
        : ['Commercial court layout for team play, tournaments, and rentals', 'Net, boundary, access, and spectator-zone planning', 'Custom dimensions, colors, logos, and event artwork', 'Commercial packing, anchoring, cleaning, and storage support'];
  }
  if (product.category === 'Inflatable Games' && /airbag|landing ramp|landing/.test(searchable)) {
    return [
      'Controlled landing zone for BMX, FMX, or freestyle training',
      'Impact-zone and ramp interface planning',
      'Custom dimensions, artwork, and sponsor branding',
      'Blower, anchoring, repair-kit, and carry-bag coordination',
    ];
  }
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

type BounceComboSeoProfile = {
  displayTitle: string;
  keywords: string[];
  visual: string;
  purpose: string;
  buyer: string;
  application: string;
  cardSummary: string;
  faqQuestions: string[];
};

// These eight combo pages have user-selected core terms. The supporting terms
// stay tied to what is visible in their supplied product images, so titles,
// metadata, image alt text, body copy, cards, and FAQs do not drift apart.
const bounceComboSeoProfiles: Record<string, BounceComboSeoProfile> = {
  'dual-lane-slide-bounce-house-commercial': {
    displayTitle: 'Dual Slide Bounce House',
    keywords: ['dual slide bounce house', 'double slide bounce house', 'bounce house with two slides', 'commercial bounce house combo'],
    visual: 'a castle-style commercial combo with two side slides, a central climb, and a front bounce entry',
    purpose: 'Its two slide exits and central climbing route give rental fleets a high-visibility multi-activity attraction for supervised party and venue programs.',
    buyer: 'party-rental companies, family entertainment centers, event operators, and inflatable distributors',
    application: 'birthday rentals, school activity days, family venues, and commercial event packages',
    cardSummary: 'Dual slide bounce house with two side slides, a central climb, and a front bounce zone for rental fleets and family venues.',
    faqQuestions: ['What play features are visible on this dual slide bounce house?', 'How should I plan space for a bounce house with two slides?', 'Can the double slide bounce house colors and artwork be customized?', 'Which construction details should I confirm for this commercial bounce house combo?', 'What supervision checks matter for two-slide play?', 'What should I send for a dual slide bounce house factory quote?'],
  },
  'white-luxury-bouncy-castle': {
    displayTitle: 'Luxury Bounce House for Sale',
    keywords: ['luxury bounce house for sale', 'white luxury bouncy castle', 'white wedding bounce house', 'white event bounce house'],
    visual: 'an all-white castle-style combo with tall turret details, an enclosed bounce area, and a side slide',
    purpose: 'The all-white castle presentation supports premium wedding, celebration, and upscale-event rental packages where a neutral visual treatment matters.',
    buyer: 'wedding-rental businesses, premium party-rental companies, event stylists, and family entertainment operators',
    application: 'weddings, showers, luxury birthdays, event styling packages, and premium rental programs',
    cardSummary: 'Luxury bounce house for sale with an all-white castle profile, enclosed bounce area, and side slide for premium event packages.',
    faqQuestions: ['Why is this model positioned as a luxury bounce house for sale?', 'How should a white wedding bounce house be planned for an event site?', 'Can the white luxury bouncy castle be customized for an event brand?', 'Which materials and production details should be confirmed?', 'How should operators protect and maintain an all-white event bounce house?', 'What is needed for a luxury bounce house factory quotation?'],
  },
  'minion-bounce-house-with-slide': {
    displayTitle: 'The Minions Playground Bounce House',
    keywords: ['the minions playground bounce house', 'minion bounce house with slide', 'character themed bounce house', 'kids bounce house slide combo'],
    visual: 'a yellow-and-blue character-inspired bounce house with a large front character facade and a side slide',
    purpose: 'The large character-inspired frontage makes the unit easy to merchandise for children’s party rentals while combining bouncing and sliding in one compact attraction.',
    buyer: 'children’s party-rental companies, family entertainment centers, event operators, and distributors',
    application: 'children’s birthdays, themed party rentals, family entertainment programs, and supervised events',
    cardSummary: 'The Minions playground bounce house features a bold yellow-and-blue character-style facade, bounce area, and side slide for kids’ party rentals.',
    faqQuestions: ['What play features are shown on the Minions playground bounce house?', 'How should I plan clearance for the character-themed bounce house and slide?', 'Can artwork or colors be changed for a custom character-style bounce house?', 'Does this listing claim an official Minions license?', 'What supervision and inspection checks suit a kids bounce house slide combo?', 'What should I include in a Minions playground bounce house quotation?'],
  },
  'pink-and-purple-bounce-house-combo': {
    displayTitle: 'Pink Castle Bounce House',
    keywords: ['pink castle bounce house', 'pink and purple bounce house', 'princess bounce house combo', 'girls party bounce house'],
    visual: 'a pink-and-purple castle bounce house with turret styling, printed princess-themed panels, and a rear slide section',
    purpose: 'Its bright castle silhouette and pink-and-purple finish create a strong themed option for children’s celebrations and party-rental lineups.',
    buyer: 'party-rental businesses, children’s event operators, family entertainment venues, and distributors',
    application: 'princess-style birthdays, girls party rentals, school celebrations, and family entertainment events',
    cardSummary: 'Pink castle bounce house in a pink-and-purple princess-style layout for children’s party rentals and family events.',
    faqQuestions: ['What is included in the pink castle bounce house layout?', 'How should I plan the footprint for a pink and purple bounce house?', 'Can the princess-style artwork and colors be customized?', 'Which material details should be confirmed for a girls party bounce house?', 'How should a rental operator manage entry, exit, and supervision?', 'What information is needed for a pink castle bounce house quote?'],
  },
  'white-bounce-house-with-double-slide': {
    displayTitle: 'White Bounce House with Slide and Ball Pit',
    keywords: ['white bounce house with slide and ball pit', 'white bounce house with double slide', 'white ball pit bounce house', 'white wedding bounce house'],
    visual: 'an all-white bounce house with a central climbing wall and two visible side slides',
    purpose: 'The neutral white colorway and dual-slide layout give event and rental buyers a clean base for weddings, celebrations, and custom-branded programs.',
    buyer: 'wedding-rental companies, party-rental fleets, event stylists, and family entertainment operators',
    application: 'white-theme events, weddings, premium birthdays, rental packages, and family venues',
    cardSummary: 'White bounce house with slide and ball pit search intent, shown as an all-white double-slide combo for premium event and rental programs.',
    faqQuestions: ['What play features are visible on this white bounce house with slide and ball pit search listing?', 'Does the shown white bounce house include a ball pit?', 'How should I plan a white bounce house with double slide at an event site?', 'Can a ball pit, white finish, or custom branding be specified?', 'Which material and maintenance details should be confirmed for white event use?', 'What should I provide for a white bounce house with slide and ball pit quote?'],
  },
  'bouncer-slide-combo-for-sale': {
    displayTitle: 'Bounce House Slide Combo for Sale',
    keywords: ['bounce house slide combo for sale', 'commercial bounce house with slide', 'inflatable bouncer with slide', 'bounce house combo for rental'],
    visual: 'a multicolor castle-style bouncer with an enclosed jump area and a tall front slide lane',
    purpose: 'The straightforward bounce-and-slide arrangement gives commercial buyers a versatile model for rentals, school events, and family entertainment programs.',
    buyer: 'party-rental companies, schools, family entertainment centers, event agencies, and distributors',
    application: 'birthday packages, school events, commercial rentals, and family entertainment venues',
    cardSummary: 'Bounce house slide combo for sale with a castle bounce zone and tall front slide for commercial rental and event programs.',
    faqQuestions: ['What features are included in this bounce house slide combo for sale?', 'How should I plan the site for a commercial bounce house with slide?', 'Can the inflatable bouncer with slide be customized for a rental fleet?', 'Which construction details should I confirm before buying?', 'What supervision and maintenance checks matter for a bounce-and-slide combo?', 'What details are needed for a bounce house slide combo factory quote?'],
  },
  'beach-themed-bounce-house': {
    displayTitle: 'Beach Bounce House',
    keywords: ['beach bounce house', 'beach themed bounce house', 'tropical bounce house', 'palm tree bounce house with slide'],
    visual: 'a tropical beach-style combo with palm trees, a sunglasses-wearing sun, two front sections, and internal slide-and-climb features',
    purpose: 'The palm-tree and beach graphics create an instantly recognizable tropical attraction for summer events, resort programs, and party-rental menus.',
    buyer: 'party-rental companies, resorts, family entertainment venues, event agencies, and distributors',
    application: 'beach parties, tropical events, resort activity programs, summer festivals, and rental packages',
    cardSummary: 'Beach bounce house with palm trees, tropical graphics, two front play sections, and internal slide-and-climb features for summer events.',
    faqQuestions: ['What visual features make this a beach bounce house?', 'How should I plan the footprint for a tropical bounce house?', 'Can the palm tree graphics and beach colors be customized?', 'Which material and construction details should be confirmed?', 'How should operators manage a beach party bounce house at an event?', 'What should I send for a beach bounce house factory quote?'],
  },
  'hulk-inflatable-bounce-house-with-slide': {
    displayTitle: 'Hulk Bounce House',
    keywords: ['hulk bounce house', 'hulk bounce house with slide', 'superhero bounce house', 'superhero bounce house with slide'],
    visual: 'a green-and-purple superhero-style bounce house with a large front character graphic, a bounce zone, and a side slide',
    purpose: 'The bold superhero-style front graphic creates a headline kids attraction for themed rentals and supervised event programs.',
    buyer: 'party-rental companies, children’s event operators, family entertainment centers, and distributors',
    application: 'superhero parties, children’s birthdays, themed rental packages, and family entertainment events',
    cardSummary: 'Hulk bounce house with a large green superhero-style facade, bounce area, and side slide for themed children’s events.',
    faqQuestions: ['What features are visible on this Hulk bounce house?', 'How should I plan site clearance for a superhero bounce house with slide?', 'Can the superhero-style colors, layout, or graphics be customized?', 'Does this product page claim an official Hulk license?', 'What supervision and maintenance checks are needed for themed rental use?', 'What should I provide for a Hulk bounce house factory quote?'],
  },
  'blue-bounce-house-with-ball-pit-for-sale': {
    displayTitle: 'Indoor Bounce House with Ball Pit',
    keywords: ['indoor bounce house with ball pit', 'blue bounce house with ball pit', 'compact indoor bounce house', 'blue bounce house combo with slide'],
    visual: 'a compact blue bounce house with a mesh-enclosed jumping area, a curved side slide, and a shallow front extension',
    purpose: 'This compact blue combo can be evaluated for indoor entertainment venues when the usable footprint, ceiling clearance, access route, anchoring, and operating rules suit the site.',
    buyer: 'indoor play centers, party-rental companies, family entertainment venues, and inflatable distributors',
    application: 'indoor play areas, supervised birthday events, family entertainment venues, and commercial rental programs',
    cardSummary: 'Indoor bounce house with ball pit search focus, shown as a compact blue bounce-and-slide combo for supervised venues and rentals.',
    faqQuestions: ['What features are visible on this indoor bounce house with ball pit?', 'Can this blue bounce house with ball pit be installed indoors?', 'Does the pictured unit include play balls in the front extension?', 'What site measurements are needed before ordering this compact indoor bounce house?', 'Can the blue bounce house combo with slide be customized?', 'What information should I send for a factory quotation?'],
  },
};

function bounceComboSeoProfile(product: Product) {
  return bounceComboSeoProfiles[product.productSlug];
}

// Core terms selected from the supplied bounce-house keyword research. Each
// current model gets a distinct theme or buying-intent phrase so the catalog
// does not make every product compete for the same generic query.
const bounceHouseCoreKeywords: Record<string, string> = {
  'modern-white-bounce-houses': 'white bounce house',
  'backyard-jump-house': 'backyard bouncer',
  'commercial-grade-white-bounce-house': 'commercial bounce house for sale',
  'solid-blue-bounce-house': 'blue bounce house',
  'palm-tree-bouncy-castle': 'palm tree bouncy castle',
  'bounce-house-with-basketball-hoop-inside': 'bounce house with basketball hoop',
  'disco-dome-bounce-house-for-sale': 'disco dome bounce house for sale',
  'heavy-duty-inflatable-bounce-house': 'heavy duty inflatable bounce house',
  'white-wedding-bounce-house': 'white wedding bounce house',
  'pink-castle-bouncer': 'pink bounce house',
  'commercial-white-bounce-house-for-sale': 'white bounce house for sale',
  'shell-bounce-house': 'shell themed bounce house',
  'poke-mon-bouncy-castle': 'pokemon bounce house',
  'rooster-bounce-house': 'rooster themed bounce house',
  'pastel-yellow-bounce-house': 'pastel bouncy castle',
  'barbie-bounce-house-for-sale': 'barbie bounce house',
  'minion-inflatable-bounce-house': 'minion bounce house',
  'tiktok-bounce-house': 'tiktok bounce house',
  'white-jumping-castle': 'white jumping castle for sale',
  'intex-dinosaur-inflatable-play-center-with-slide': 'dinosaur bounce house with slide',
  'blue-bounce-house-with-ball-pit-commercial': 'blue bounce house with ball pit',
  'small-bounce-house-with-ball-pit': 'small bounce house with ball pit',
  'small-white-bounce-house-with-ball-pit': 'small white bounce house with ball pit',
  'black-bounce-house': 'black themed bounce house',
  'small-backyard-bounce-house': 'small bounce house',
  'blue-bounce-house-with-ball-pit-for-sale': 'indoor bounce house with ball pit',
  'pink-bounce-house-with-slide-and-ball-pit-commercial': 'pink bounce house with slide',
  'all-white-bounce-house-with-slide': 'white bounce house with slide',
  'paint-splatter-bounce-house-combo': 'paint splatter bounce house combo',
  'spiderman-inflatable-bounce-house-with-slide': 'spiderman bounce house with slide',
  'lion-king-bounce-house': 'lion king bounce house',
  'pink-bounce-house-with-slide-and-ball-pit-for-sale': 'pink bounce house with slide and ball pit',
  'graffiti-inflatable-bounce': 'graffiti bounce house',
  'iron-man-bounce-house': 'iron man bounce house',
  'inflatable-bouncer-slide-combo': 'bounce and slide',
  'race-car-theme-bounce-house': 'racing bounce house',
  'monkey-bounce-house-with-slide': 'monkey bounce house with slide',
  'construction-bounce-house-for-sale': 'construction bounce house for sale',
  'inflatable-medieval-castle': 'castle bounce house',
  'white-jumping-castle-with-slide-and-ball-pit': 'bouncy castle with slide and ball pit',
  'aloha-bounce-house': 'aloha bounce house',
  'dragon-bounce-house-for-sale': 'dragon bounce house',
  'rocket-bounce-house-rental': 'rocket bounce house rental',
  'frozen-combo-bounce-house': 'frozen combo bounce house',
  'commercial-frozen-bounce-house': 'commercial frozen bounce house',
  'commercial-obstacle-course-bounce-house': 'obstacle course bounce house',
  'pastel-bounce-house-slide': 'pastel bounce house slide',
  'dinosaur-bounce-house-slide-combo': 'dinosaur bounce house slide',
  'hot-air-balloon-slide-and-hoop-bouncer': 'hot air balloon slide and hoop bouncer',
  'building-block-bounce-house': 'building block bounce house',
  'hot-air-balloon-combo-bounce-house': 'hot air balloon bounce house',
  'dual-lane-slide-bounce-house-commercial': 'dual slide bounce house',
  'white-castle-bounce-house-with-slide-and-ball-pit': 'white castle bounce house with slide',
  'white-luxury-bouncy-castle': 'luxury bounce house for sale',
  'commercial-princess-bouncy-castle': 'princess bouncy castle',
  'minion-bounce-house-with-slide': 'the minions playground bounce house',
  'pink-and-purple-bounce-house-combo': 'pink castle bounce house',
  'white-bounce-house-with-double-slide': 'white bounce house with slide and ball pit',
  'bouncer-slide-combo-for-sale': 'bounce house slide combo for sale',
  'commercial-grade-bounce-house-and-slide': 'commercial bounce house with slide',
  'slide-bounce-house-combo': 'slide bounce house combo',
  'combo-commercial-bounce-house': 'commercial combo bounce house',
  'beach-themed-bounce-house': 'beach bounce house',
  'hulk-inflatable-bounce-house-with-slide': 'hulk bounce house',
  'unicorn-bouncer-with-slide': 'unicorn bounce house rental',
  'tropical-themed-bounce-house': 'tropical bounce house',
  'commercial-bouncy-castle-with-slide': 'bouncy castle with slide rental',
  'inflatable-bounce-house-water-slide': 'bounce house with water slide',
  'white-castle-wedding-bounce-house': 'wedding bounce house',
  'castle-slide-combo-bounce-house': 'castle combo bounce house',
  'inflatable-bounce-house-with-slide-and-basketball-hoop': 'bounce house with slide and basketball hoop',
  'butterfly-bounce-house-combo': 'butterfly bounce house combo',
  'inflatable-spiderman-bounce-house': 'spiderman inflatable bounce house',
  'dual-lane-slide-bounce-house-for-sale': 'dual lane slide bounce house for sale',
  // New Bounce House products from the October 2026 source folders. These
  // terms are theme-specific where the supplied research supports them, with
  // clear commercial variants for themes not listed verbatim in the sheet.
  'inflatable-light-pink-bounce-house': 'light pink bounce house',
  'small-wedding-bounce-house': 'wedding bouncy castle rental',
  'inflatable-hippo-bounce-house': 'hippo bounce house',
  'inflatable-light-blue-bounce-house-for-sale': 'light blue bounce house',
  'inflatable-classic-castle-bounce-house': 'castle bounce house',
  'inflatable-monster-truck-bounce-house': 'monster truck bounce house rental',
  'wedding-jumping-castle-for-rent': 'wedding bouncy castle hire',
  'classic-fairytale-jumping-castle-for-sale': 'princess bouncy castle',
  'inflatable-mario-bounce-house': 'mario bouncy castle',
  'pink-and-blue-castle-bounce-house': 'pink bounce house',
  'primary-colors-jumping-castle-for-rent': 'commercial bouncers',
  'pink-and-purple-princess-bounce-house': 'pink and purple bounce house',
  'inflatable-white-wedding-gazebo-bounce-house': 'white wedding bounce house',
  'mermaid-bounce-house-slide-combo': 'mermaid bounce house rental',
  'inflatable-paw-patrol-bounce-house': 'paw patrol bouncy castle',
  'inflatable-paw-patrol-bouncer-manufacturer': 'paw patrol bounce house rental',
  'superhero-inflatable-bounce-house': 'superhero bounce house',
  'pirate-ship-bouncer-inflatable': 'pirate ship bounce house',
  'car-themed-bounce-house-rental': 'firetruck bounce house',
  'inflatable-bouncer-paw-patrol': 'paw patrol bounce house for rent',
  'inflatable-pastel-macaron-wedding-bounce-house': 'wedding bounce house',
  'paw-patrol-theme-bounce-house-and-slide-combo': 'paw patrol bouncy castle hire',
  'inflatable-toy-story-bounce-house-and-slide': 'toy story bouncy castle hire',
  'inflatable-stitch-jumping-house': 'stitch bouncy castle',
  'stitch-inflatable-bounce-house': 'lilo and stitch bouncy castle',
  'heavy-duty-football-jumping-castle-with-slide': 'sports combo bounce house',
  'heavy-duty-princess-jumping-castle-with-slide': 'princess bounce house rental',
  'princess-castle-inflatable-combo': 'pink princess bounce house',
  'unicorn-inflatable-bounce-house-rental': 'rainbow unicorn bounce house',
  'pokemon-theme-bounce-house': 'pokemon bouncy castle',
  'primary-color-jumping-castle-with-slide': 'combo bounce house',
  'inflatable-giraffe-bounce-house-and-slide-combo': 'giraffe bouncy castle',
  'pirate-ship-jumping-castle-with-slide': 'pirate ship bounce house rental',
  'super-mario-bounce-house-for-sale': 'super mario bounce house',
  'disney-princess-inflatable-bounce-house': 'disney princess bouncy castle hire',
  'inflatable-princess-castle-combo-manufacturer': 'princess castle bounce house',
  'inflatable-royal-princess-castle-bounce-house': 'princess castle bounce house rental',
  'hello-kitty-inflatable-bounce-house': 'hello kitty bounce house rental',
  'inflatable-unicorn-and-rainbow-bounce-house-combo': 'unicorn bounce house with slide',
  'commercial-castle-bounce-house-with-slide': 'commercial bounce house with slide',
  'space-galaxy-bounce-house': 'space themed bouncy castle',
  'summer-luau-theme-bouncing-water-slide': 'tropical combo bounce house',
  'tropical-rainforest-water-slide-combo': 'tropical bouncy castle',
};

function bounceHouseCoreKeyword(product: Product) {
  const mapped = bounceHouseCoreKeywords[product.productSlug];
  if (mapped) return mapped;
  const source = product.sourceName.toLowerCase().replace(/^\d[\dx.\sxm]+/i, '').trim();
  const suffix = product.category === 'Bounce House Combo' ? 'bounce house combo' : 'bounce house';
  return source.includes('bounce') || source.includes('castle') ? source : `${source} ${suffix}`;
}

// Keep the canonical phrase consistent across visible headings and image labels.
export function productPrimaryKeyword(product: Product) {
  if (product.category === 'Bounce House' || product.category === 'Bounce House Combo') {
    return bounceHouseCoreKeyword(product);
  }
  const waterSlide = waterSlideProfile(product);
  if (waterSlide) return waterSlide.keywords[0];
  const newThemePark = newThemeParkProfile(product);
  if (newThemePark) return newThemePark.coreKeyword;
  return productKeywordVariants(product)[0] ?? productDisplayTitle(product);
}

export function productKeywordVariants(product: Product) {
  const name = productDisplayTitle(product);
  const lowerName = name.toLowerCase();
  const searchable = `${lowerName} ${product.sourceName.toLowerCase()}`;
  const variants: string[] = [];
  const add = (...values: string[]) => values.forEach((value) => {
    const normalized = value.replace(/\s+/g, ' ').trim();
    // Do not publish awkward phrases created by joining a theme/color that is
    // already present in the product name (for example, "dolphin inflatable
    // dolphin water slide"). Also keep adjacent duplicate words out of the
    // keyword set so every variant reads like a real buyer search.
    const words = normalized.toLowerCase().split(' ');
    const hasAdjacentDuplicate = words.some((word, index) => index > 0 && word === words[index - 1]);
    if (normalized.length > 2 && !hasAdjacentDuplicate && !variants.includes(normalized)) variants.push(normalized);
  });
  const color = lowerName.match(/\b(white|pink|blue|red|yellow|black|purple|green|rainbow|pastel)\b/)?.[1];
  const theme = lowerName.match(/\b(tropical|hawaii|princess|dolphin|shark|jungle|pirate|dinosaur|rainbow|pastel|luxury|wedding|sport|soccer|mario|barbie|unicorn|dragon|construction|medieval|aloha|butterfly|teddy|tiki|honeycomb)\b/)?.[1];
  const base = lowerName.replace(/\b(commercial|for sale|rental|manufacturer|supplier|factory|custom|wholesale)\b/g, '').replace(/\s+/g, ' ').trim();
  const intentKeyword = productIntentKeyword(product);

  if (product.category === 'Bounce House' || product.category === 'Bounce House Combo') {
    const core = bounceHouseCoreKeyword(product);
    const comboProfile = bounceComboSeoProfile(product);
    if (comboProfile) add(...comboProfile.keywords);
    add(core, `${core} manufacturer`, `custom ${core}`, `${core} for rental`);
    if (/commercial|supplier|factory/i.test(product.productSlug) && !/\bfor sale\b/i.test(core)) add(`${core} for sale`);
    return [...new Set([core, intentKeyword, ...variants, lowerName])]
      .filter((value) => value.length > 2)
      .filter((value) => !/\bfor sale\b.*\bfor sale\b/i.test(value));
  }

  if (waterSlideProfile(product)) {
    add(...waterSlideProfile(product)!.keywords);
    add(`commercial ${base}`, `${base} for sale`, `custom ${base}`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }

  const newThemePark = newThemeParkProfile(product);
  if (newThemePark) {
    add(...newThemePark.keywords);
    add(`commercial ${newThemePark.coreKeyword}`, `${newThemePark.coreKeyword} for rental`, `custom ${newThemePark.coreKeyword}`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }

  if (flyingFishProfile(product)) {
    add(...flyingFishProfile(product)!.keywords);
    add(`${base} for sale`, `${base} rental`, `commercial ${base}`, `custom ${base}`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }

  if (interactiveGameProfile(product)) {
    add(...interactiveGameProfile(product)!.keywords);
    add(`commercial ${base}`, `${base} for events`, `custom ${base}`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }

  if (bubbleTentProfile(product)) {
    add(...bubbleTentProfile(product)!.keywords);
    add(`commercial ${base}`, `${base} for events`, `custom ${base}`);
    return [...new Set(variants)].filter((value) => value.length > 2);
  }

  if (campingTentProfile(product)) {
    add(...campingTentProfile(product)!.keywords);
    add(`commercial ${base}`, `${base} for sale`, `custom ${base}`);
    return [...new Set(variants)].filter((value) => value.length > 2);
  }

  if (nightclubTentProfile(product)) {
    add(...nightclubTentProfile(product)!.keywords);
    add(`commercial ${base}`, `${base} for rental`, `custom ${base}`);
    return [...new Set(variants)].filter((value) => value.length > 2);
  }

  if (weddingTentProfile(product)) {
    add(...weddingTentProfile(product)!.keywords);
    add(`commercial ${base}`, `${base} for sale`, `custom ${base}`);
    return [...new Set(variants)].filter((value) => value.length > 2);
  }

  if (battingCageKeywordSet(product).length) {
    add(...battingCageKeywordSet(product));
    return [...new Set(variants)].filter((value) => value.length > 2);
  }

  if (ringTossKeywordSet(product).length) {
    add(...ringTossKeywordSet(product));
    add('commercial inflatable ring game', 'carnival ring toss game', 'inflatable target game for events');
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }

  if (halloweenMazeKeywordSet(product).length) {
    add(...halloweenMazeKeywordSet(product));
    add('commercial inflatable haunted maze', 'custom inflatable Halloween maze', 'inflatable maze for events');
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }

  if (hungryHippoKeywordSet(product).length) {
    add(...hungryHippoKeywordSet(product));
    add(`${base} for events`, `commercial ${base}`, `custom ${base}`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }

  if (airHockeyKeywordSet(product).length) {
    add(...airHockeyKeywordSet(product));
    add(`${base} for events`, `commercial ${base}`, `custom ${base}`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }

  if (connectFourBasketballKeywordSet(product).length) {
    add(...connectFourBasketballKeywordSet(product));
    add(`${base} for events`, `commercial ${base}`, `custom ${base}`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }

  if (waterWalkingBallKeywordSet(product).length) {
    add(...waterWalkingBallKeywordSet(product));
    add('commercial inflatable water walking ball', 'custom water walking ball', 'water walking ball for events');
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }

  if (axeThrowingKeywordSet(product).length) {
    add(...axeThrowingKeywordSet(product));
    add(`${base} for events`, `commercial ${base}`, `custom ${base}`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }

  if (soccerFieldKeywordSet(product).length) {
    add(...soccerFieldKeywordSet(product));
    add(`${base} for events`, `commercial ${base}`, `custom ${base}`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }

  if (isNewBilliardsProduct(product) && /billiard|pool table|snooker/.test(searchable)) {
    add(...billiardsKeywordSet(product));
    add(`${base} for events`, `commercial ${base}`, `custom ${base}`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }

  // Landing airbags are a distinct action-sports product family. Keep their
  // search language specific to BMX/FMX/freestyle use instead of applying the
  // generic inflatable-games keyword set to every model.
  if (/airbag|landing ramp|landing/.test(searchable)) {
    add(...landingKeywordSet(product));
    add(`${base} for training`, `${base} for rental`, `custom ${base}`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }
  if (/climb|rock wall|climbing wall|climbing tower/.test(searchable)) {
    add(...climbingKeywordSet(product));
    add(`${base} for rental`, `custom ${base}`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }
  if (/foam|bubble/.test(searchable)) {
    add(...foamKeywordSet(product));
    add(`${base} for events`, `${base} for rental`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }
  if (/volleyball/.test(searchable)) {
    add(...volleyballKeywordSet(product));
    add(`${base} for rental`, `custom ${base}`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }
  if (/bungee run/.test(searchable)) {
    add(...bungeeRunKeywordSet(product));
    add(`${base} for events`, `commercial ${base}`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }
  if (/boxing ring|boxing area|boxing arena|fighting ring/.test(searchable)) {
    add(...boxingRingKeywordSet(product));
    add(`${base} for events`, `commercial ${base}`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }
  if (/soccer dart|football dart|football darts|soccer darts|velcro soccer/.test(searchable)) {
    add(...soccerDartKeywordSet(product));
    add(`${base} for events`, `commercial ${base}`);
    return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
  }

  // Build phrases from the actual product entity and visible features. The
  // category list is deliberately not copied into every product page.
  add(base, `${base} for sale`, `${base} rental`, `custom ${base}`);
  if (/bounce house|bouncer|bouncy castle|jumping castle|jump house/.test(searchable)) {
    add(`${color ? `${color} ` : ''}bounce house`, `${color ? `${color} ` : ''}bouncy castle`, `${color ? `${color} ` : ''}jumping castle`, `${base} for party rental`);
  }
  if (/water slide|pool slide|slip and slide/.test(searchable)) {
    add(`commercial ${base}`, 'inflatable water slide supplier', `${base} for water parks`, `${base} for resorts`);
    if (/dual lane|double|triple|multi-lane/.test(searchable)) add('multi lane inflatable water slide', 'racing water slide', 'dual lane water slide rental');
    if (/pool|splash/.test(searchable)) add('inflatable water slide with pool', 'water slide splash pool', 'pool slide inflatable');
    if (/dry and wet|wet and dry/.test(searchable)) add('dry and wet inflatable slide', 'dual use inflatable slide');
  }
  if (/obstacle course|fun run|ninja/.test(searchable)) add('inflatable obstacle course rental', 'commercial inflatable fun run', 'ninja obstacle course inflatable');
  if (/bumper|bubble soccer|zorb/.test(searchable)) add('bumper ball rental', 'bubble soccer equipment', 'commercial bubble ball supplier');
  if (/tiki bar|pool bar|bar/.test(searchable)) add('inflatable bar for events', 'custom inflatable bar', `${base} for brand activations`);
  if (/food truck/.test(searchable)) add('inflatable food truck display', 'food truck inflatable for events', 'branded inflatable food truck');
  if (/tent|marquee|shelter|canopy|dome/.test(searchable)) add('commercial event tent inflatable', 'branded inflatable shelter', `${base} for exhibitions`);
  if (/game|dart|foosball|batting|boxing|carnival|whack|billiard/.test(searchable)) add('commercial inflatable game', `${base} for events`, 'interactive inflatable game rental');
  if (/mechanical bull|wipeout|sweeper|meltdown/.test(searchable)) add('mechanical ride rental', 'operator led inflatable attraction', 'commercial mechanical game supplier');
  if (/water park|floating island|paddle boat/.test(searchable)) add('commercial water park equipment', 'floating inflatable attraction', `${base} for resorts`);
  if (theme) {
    add(`${theme} themed inflatable`, `${theme} inflatable attraction`);
    if (!new RegExp(`\\b${theme}\\b`).test(base)) add(`${theme} ${base}`);
  }
  if (color && !new RegExp(`\\b${color}\\b`).test(base)) add(`${color} ${base}`);
  if (/wedding/.test(searchable)) add('wedding inflatable rental', 'white wedding bounce house');
  if (/wholesale|supplier|manufacturer/.test(searchable) || product.category.includes('Water')) add(`wholesale ${base}`, `${base} manufacturer`, `${base} OEM supplier`);
  return [...new Set([intentKeyword, ...variants, lowerName])].filter((value) => value.length > 2);
}

export function productDisplayTitle(product: Product) {
  if (isAirDancerProfile(product)) return 'Inflatable Air Dancer for Sale';
  const obstacleCourse = obstacleCourseProfile(product);
  if (obstacleCourse) return obstacleCourse.displayTitle;
  if (product.productSlug === 'inflatable-pool-tiki-bar') return 'Inflatable Pool Tiki Bar';
  if (product.productSlug === 'blow-up-pool-bar') return 'Blow Up Pool Bar';
  if (product.productSlug === 'inflatable-pool-bar-commercial') return 'Commercial Inflatable Pool Bar';
  const advertisingDisplay = advertisingDisplayProfile(product);
  if (advertisingDisplay) return advertisingDisplay.displayTitle;
  const comboProfile = bounceComboSeoProfile(product);
  if (comboProfile) return comboProfile.displayTitle;
  let title = product.title.trim();
  title = title.replace(/^diameter.*?(?=inflatable\b)/i, '');
  title = title.replace(/^\d+(?:\.\d+)?mH(?:\s+\d+(?:\.\d+)?mm\s*PVC)?\s*/i, '');
  title = title.replace(/^\d+(?:\.\d+)?\s*dia\s*x.*?mH\s*/i, '');
  title = title.replace(/^\d+(?:\.\d+)?(?:[x×z]\d+(?:\.\d+)?m?){1,3}\s*/i, '');
  title = title.replace(/^\d+(?:\.\d+)?m(?:x\d+(?:\.\d+)?m){1,3}\s*/i, '');
  title = title.replace(/^(?:best|used|buy)\s+/i, '');
  title = title.replace(/\s+(?:for sale|for rent|rental|manufacturer)\b/gi, '');
  title = title.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g, ' ');
  const primaryFlyingFishKeyword = flyingFishProfile(product)?.keywords[0];
  if (primaryFlyingFishKeyword) return primaryFlyingFishKeyword.charAt(0).toUpperCase() + primaryFlyingFishKeyword.slice(1);
  const primaryWaterSlideKeyword = waterSlideProfile(product)?.keywords[0];
  if (primaryWaterSlideKeyword) return primaryWaterSlideKeyword.charAt(0).toUpperCase() + primaryWaterSlideKeyword.slice(1);
  const primaryThemeParkKeyword = newThemeParkProfile(product)?.displayTitle;
  if (primaryThemeParkKeyword) return primaryThemeParkKeyword;
  const primaryInteractiveKeyword = interactiveGameProfile(product)?.keywords[0];
  if (primaryInteractiveKeyword) return primaryInteractiveKeyword.charAt(0).toUpperCase() + primaryInteractiveKeyword.slice(1);
  const primaryBubbleTentKeyword = bubbleTentProfile(product)?.keywords[0];
  if (primaryBubbleTentKeyword) return primaryBubbleTentKeyword.charAt(0).toUpperCase() + primaryBubbleTentKeyword.slice(1);
  const primaryCampingTentKeyword = campingTentProfile(product)?.keywords[0];
  if (primaryCampingTentKeyword) return primaryCampingTentKeyword.charAt(0).toUpperCase() + primaryCampingTentKeyword.slice(1);
  const primaryNightclubKeyword = nightclubTentProfile(product)?.keywords[0];
  if (primaryNightclubKeyword) return primaryNightclubKeyword.charAt(0).toUpperCase() + primaryNightclubKeyword.slice(1);
  const primaryWeddingKeyword = weddingTentProfile(product)?.keywords[0];
  if (primaryWeddingKeyword) return primaryWeddingKeyword.charAt(0).toUpperCase() + primaryWeddingKeyword.slice(1);
  const primaryRingTossKeyword = ringTossKeywordSet(product)[0];
  if (primaryRingTossKeyword) return primaryRingTossKeyword.charAt(0).toUpperCase() + primaryRingTossKeyword.slice(1);
  const primaryBumperKeyword = product.category === 'Bumper Ball' ? bumperBallKeywordSet(product)[0] : '';
  if (primaryBumperKeyword) return primaryBumperKeyword.charAt(0).toUpperCase() + primaryBumperKeyword.slice(1);
  return title ? title.charAt(0).toUpperCase() + title.slice(1) : product.title;
}

/**
 * Shared visible title for product cards and detail pages.
 * Keep the display/core phrase intact; only short labels receive a buying
 * intent suffix so the visible title remains useful and unambiguous.
 */
export function productHeadingTitle(product: Product) {
  const isBounceProduct = product.category === 'Bounce House' || product.category === 'Bounce House Combo';
  const baseTitle = isBounceProduct
    ? productPrimaryKeyword(product).replace(/^\s+|\s+$/g, '')
    : productDisplayTitle(product).trim();
  const title = baseTitle ? baseTitle.charAt(0).toUpperCase() + baseTitle.slice(1) : productDisplayTitle(product).trim();
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length >= 3) return title;

  const preferredIntent = productIntentLabel(product) || 'For Sale';
  const intent = title.toLowerCase().includes(preferredIntent.toLowerCase())
    || (preferredIntent === 'Commercial Grade' && /\bcommercial\b/i.test(title))
    ? 'For Sale'
    : preferredIntent;
  return `${title} ${intent}`;
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
  'Inflatable Water Slide': 'water parks, resorts, pool venues, party rental fleets, and seasonal recreation operators',
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
  'Inflatable Water Slide': {
    productType: 'commercial inflatable water slide', primaryBuyer: 'water parks, resorts, pool venues, party rental fleets, and seasonal recreation operators',
    purpose: 'It creates a visible wet-use attraction that combines sliding, splash play, and repeat guest activity around a managed water site.',
    applications: [{ title: 'Resorts and water parks', text: 'Add a high-visibility water attraction planned around guest capacity, water depth, anchoring, and queue flow.' }, { title: 'Party rental fleets', text: 'Offer a summer water-slide package with practical setup, drying, transport, storage, and repair planning.' }, { title: 'Pool and event venues', text: 'Coordinate landing, drainage, supervision, access, and themed artwork for a temporary or permanent water program.' }],
    planningPoints: ['Water supply, depth, drainage, landing, and splash-pool conditions', 'Height clearance, footprint, access route, queue, anchoring, and supervision', 'Target age group, throughput, seasonal schedule, and local venue requirements'],
    customization: ['Slide height, lane count, pool, landing, and water-flow layout', 'Theme, colors, characters, printed artwork, and logo placement', 'Anchoring, access, queue, pump or blower, repair kit, carry bag, and packing'],
    operationNote: 'Confirm wet-use conditions, water flow, drainage, anchoring, supervision, cleaning, drying, and local operating procedures before use.', quoteItems: ['Water-area plan, depth, supply, and drainage details', 'Preferred height, lane count, landing or pool format, and theme', 'Quantity, destination, operating season, and target delivery date'],
  },
};

function productCategoryPosition(product: Product) {
  return rawProducts.filter((item) => item.categorySlug === product.categorySlug).findIndex((item) => item.slug === product.slug);
}

export function productDetailContent(product: Product): DetailContent {
  const searchable = `${product.title} ${product.sourceName}`.toLowerCase();
  const obstacleCourse = obstacleCourseProfile(product);
  if (obstacleCourse) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    const isRace = /5k|run|race|adult|extreme|army|ninja/.test(obstacleCourse.keywords.join(' '));
    return {
      template,
      productType: obstacleCourse.keywords[0],
      primaryBuyer: obstacleCourse.buyer,
      purpose: obstacleCourse.purpose,
      applications: [
        { title: obstacleCourse.application, text: `${obstacleCourse.purpose} Match the final installation to the actual footprint, entry and exit direction, guest flow, and approved event plan.` },
        { title: isRace ? 'Races, challenges, and organized group play' : 'Family events and themed rental programs', text: isRace ? 'Plan the starting order, lane or route flow, participant rotation, timing, clear zones, staff positions, and spectator separation for each session.' : 'Plan age-appropriate participant flow, entry and exit, queue control, clear zones, staff position, and supervised use around the actual venue.' },
        { title: 'Commercial rental and repeat-event operation', text: `Review inflation, anchoring, seams, cleaning, drying, inspection, transport, storage, artwork approval, and repeat-event handover before adding this ${obstacleCourse.keywords[0]} to a commercial program.` },
      ],
      planningPoints: [
        `Confirm the listed ${product.dimensions.trim()} reference footprint plus entrance, exit, queue, blower position, anchoring surface, clear run-off, operator position, and spectator separation`,
        'Define the participant age and activity format, expected throughput, indoor or outdoor site, weather plan, access route, staffing, supervision, local venue rules, and emergency access',
        `Review the final obstacle order, slide or climb layout, artwork, logo panels, material, accessories, packing, and operating instructions against the approved specification (${product.material})`,
      ],
      customization: [
        obstacleCourse.customization,
        'Theme-specific colors, printed sponsor or logo panels, start and finish graphics, event instructions, and coordinated campaign artwork',
        'Approved blower, anchoring, repair kit, carry or storage bags, accessories, export packing, and destination-specific requirements',
      ],
      operationNote: 'Operate only after the site, access route, surface, anchoring, blower and electrical arrangements, weather conditions, inspection routine, participant rules, supervision plan, and local venue requirements have been reviewed. Images do not establish a wind rating, capacity, blower inclusion, or unattended-operation permission.',
      quoteItems: [
        `Intended use: ${obstacleCourse.application}; share the venue type, target participant group, event schedule, expected throughput, and site plan`,
        'Target dimensions, reference artwork, preferred colors, logo files, obstacle sequence, slide or climb preference, anchoring and accessory requirements, and venue restrictions',
        'Quantity, destination, packing needs, and requested delivery schedule',
      ],
    };
  }
  const advertisingDisplay = advertisingDisplayProfile(product);
  if (advertisingDisplay) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    const isTunnel = advertisingDisplay.kind === 'tunnel';
    const planningLead = isTunnel
      ? 'Confirm the player entrance route, venue access, overhead clearance, spectator separation, blower position, anchoring surface, and emergency egress around the actual stadium or school site'
      : 'Confirm the listed display footprint, viewing direction, access route, overhead clearance, blower position, anchoring surface, visitor separation, and photo-queue area';
    return {
      template,
      productType: advertisingDisplay.keywords[0],
      primaryBuyer: advertisingDisplay.buyer,
      purpose: advertisingDisplay.purpose,
      applications: [
        { title: advertisingDisplay.application, text: `${advertisingDisplay.purpose} Match the final installation to the venue plan, approved artwork, and supervised guest or player flow.` },
        { title: isTunnel ? 'Team entrances and sponsor activations' : 'Campaign visibility and photo traffic', text: isTunnel ? 'Plan the entry orientation, tunnel length, team timing, venue clearance, sponsor visibility, and controlled athlete and spectator access before each use.' : 'Use the character silhouette as an approachable landmark for photo traffic, retail visibility, campaigns, and family events after reviewing the actual site conditions.' },
        { title: 'Commercial rental and repeat-event operations', text: `Review inflation, anchoring, inspection, cleaning, drying, transport, storage, artwork approval, and repeat-event handover before adding this ${advertisingDisplay.keywords[0]} to an operating fleet.` },
      ],
      planningPoints: [
        planningLead,
        `Define the intended campaign, event, or team use together with operating hours, weather plan, staff supervision, approved branding, local venue rules, and audience management`,
        `Review the final artwork, fabric, seams, base treatment, blower interface, accessories, packing, and operating instructions against the approved specification (${product.material})`,
      ],
      customization: [
        advertisingDisplay.options,
        isTunnel ? 'Team-specific colors, mascot artwork, jersey or crest graphics, sponsor panels, entry orientation, and coordinated stadium-event graphics' : 'Campaign-specific colors, character details, printed logos, sponsor panels, photo-backdrop graphics, and coordinated promotional-display artwork',
        'Approved blower or inflation equipment, anchoring, repair kit, carry or storage bags, accessories, and export packing',
      ],
      operationNote: isTunnel
        ? 'Operate only after the player route, venue access, anchoring, blower and electrical arrangements, weather conditions, spectator separation, inspection routine, and local stadium or school requirements have been reviewed. Images do not establish a wind rating, capacity, blower inclusion, or unattended-operation permission.'
        : 'Operate only after the installation site, viewing direction, weather conditions, compatible blower, secure positioning, access separation, inspection routine, and local event requirements have been reviewed. Images do not establish a wind rating, blower inclusion, electrical approval, or unattended-operation permission.',
      quoteItems: [
        `Intended use: ${advertisingDisplay.application}; share the event or venue type, audience, campaign or team objective, and required installation timing`,
        'Target dimensions, reference artwork, logo files, preferred colors, branding, accessories, blower and anchoring requirements, and any venue restrictions',
        'Quantity, destination, packing requirements, and requested delivery schedule',
      ],
    };
  }
  const foodService = foodServiceProfile(product);
  if (foodService) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: foodService.keywords[0],
      primaryBuyer: foodService.buyer,
      purpose: foodService.purpose,
      applications: [
        { title: foodService.application, text: `${foodService.purpose} Plan the customer approach, service window, staff position, branded presentation, and the final operating scope around the actual venue.` },
        { title: 'Events and temporary retail', text: `Use this ${foodService.keywords[0]} for supervised event service or display after confirming the footprint, access, queue management, included equipment, and local venue requirements.` },
        { title: 'Commercial rental and brand activations', text: `Review inflation, anchoring, cleaning, drying, inspection, transport, storage, artwork approval, and repeat-event handling before adding the unit to a rental or activation program.` },
      ],
      planningPoints: [
        `Confirm the listed ${product.dimensions.trim()} reference footprint plus serving-side access, customer queue, staff space, entry and exit, blower position, anchoring surface, and spectator separation`,
        'Define the intended role—sampling, display, registration, merchandise, or food-service frontage—along with compatible equipment, utility needs, hygiene workflow, staffing, weather plan, and local approvals',
        `Review the final service opening, artwork, roof sign, counter arrangement, accessories, material, and packing against the approved specification (${product.material})`,
      ],
      customization: [
        foodService.options,
        `Theme-specific colors, printed logos, campaign panels, menu-display area, and coordinated ${foodService.keywords[0]} product-family graphics`,
        'Approved blower or inflation equipment, anchoring, lighting provision, repair kit, carry or storage bags, accessories, and export packing',
      ],
      operationNote: 'Use only after the site, access and queue plan, anchoring, weather plan, staffing, cleaning routine, equipment interface, and local venue requirements have been reviewed. Product imagery does not establish food-safety certification, cooking equipment, electrical approval, capacity, or weather rating.',
      quoteItems: [
        `Intended use: ${foodService.application}; share the venue type, service or display workflow, target customer group, and event schedule`,
        'Required footprint, service-window and counter preference, roof-sign or artwork concept, branding, material, accessories, and any required equipment interfaces',
        'Quantity, destination, packing requirements, and requested delivery schedule',
      ],
    };
  }
  if (isAirDancerProfile(product)) {
    const profile = foodServiceProfiles[product.productSlug];
    return {
      template: 'application',
      productType: profile.keywords[0],
      primaryBuyer: profile.buyer,
      purpose: profile.purpose,
      applications: [
        { title: profile.application, text: 'Place this ' + profile.keywords[0] + ' where it can be seen safely from the intended approach. Confirm the viewing direction, blower position, access route, and local sign or event requirements.' },
        { title: 'Retail and opening-event visibility', text: 'Use the tall moving display to call attention to a launch, roadside business, showroom, car lot, or campaign entrance after checking wind exposure, secure positioning, and supervision.' },
        { title: 'Rental and campaign operations', text: 'Plan blower compatibility, inflation, inspection, cleaning, drying, transport, storage, artwork approval, and repeat-event handover for the commercial operating routine.' },
      ],
      planningPoints: [
        'Confirm the listed ' + product.dimensions.trim() + ' reference height, overhead clearance, viewing direction, ground space, blower position, electrical source, cable protection, secure placement, and visitor separation',
        'Define the campaign location, expected wind and weather exposure, operating hours, retail or event rules, staff supervision, emergency shutdown plan, and local advertising requirements',
        'Review the final fabric, character artwork, printed logo, blower interface, accessories, packing, and operating instructions against the approved specification (' + product.material + ')',
      ],
      customization: [
        profile.options,
        'Campaign-specific colors, printed logos, mascot artwork, character features, sponsor panels, and coordinated promotional-display graphics',
        'Compatible blower, cable and base arrangement, repair kit, carry or storage bag, accessories, replacement fabric options, and export packing',
      ],
      operationNote: 'Operate only after the site, viewing direction, weather conditions, compatible blower, electrical connection, cable protection, secure positioning, access separation, inspection routine, and local event or advertising requirements have been reviewed. Images do not establish a wind rating, blower inclusion, electrical approval, or unattended-operation permission.',
      quoteItems: [
        'Intended use: ' + profile.application + '; share the retail, roadside, exhibition, or event location and campaign timing',
        'Required height, character or logo artwork, colors, blower preference, electrical details, site exposure, material, accessories, and packing requirements',
        'Quantity, destination, packing needs, and requested delivery schedule',
      ],
    };
  }
  const waterSlide = waterSlideProfile(product);
  if (waterSlide) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    const footprint = `the listed ${product.dimensions.trim()} reference footprint`;
    const isWetSlide = waterSlide.wetUse !== false;
    return {
      template,
      productType: waterSlide.keywords[0],
      primaryBuyer: waterSlide.buyer,
      purpose: waterSlide.purpose,
      applications: [
        { title: waterSlide.application, text: `${waterSlide.purpose} Plan ${footprint}, guest access, staffing, and a supervised ${isWetSlide ? 'wet-play' : 'slide'} flow around the actual venue.` },
        { title: 'Rental and seasonal recreation', text: `Use the ${waterSlide.keywords[0]} format for a managed rental or recreation program after confirming ${isWetSlide ? 'water supply, drainage, transport, setup, drying, and storage' : 'transport, setup, clear zones, cleaning, drying, and storage'}.` },
        { title: 'Custom commercial projects', text: `Develop the slide around approved artwork, lane and landing treatment, brand visibility, access direction, venue logistics, and the final operating plan.` },
      ],
      planningPoints: [
        `${footprint}, plus height clearance, entry and exit, queue space, landing or pool area, blower position, anchoring surface, and surrounding clear zone`,
        isWetSlide ? 'Water supply, water-flow routing, drainage, user group, expected throughput, supervision, cleaning and drying procedure, weather plan, and local venue requirements' : 'User group, expected throughput, access, anchoring, supervision, cleaning and drying procedure, weather plan, and local venue requirements',
        `Final slide, lane, landing or pool configuration, artwork, accessories, material, and packing against the approved specification (${product.material})`,
      ],
      customization: [
        waterSlide.options,
        `Theme-specific artwork, colors, printed logo panels, and coordinated ${waterSlide.keywords[0]} product-family graphics`,
        'Approved blower or inflation equipment, anchoring, water connection, repair kit, carry or storage bags, accessories, and export packing',
      ],
      operationNote: isWetSlide ? 'Operate only after the site, water supply and drainage, landing or pool layout, anchoring, participant rules, inspection routine, supervision, and local requirements are approved. Images do not establish a certified capacity, water-depth range, or weather rating.' : 'Operate only after the site, access route, clear zones, anchoring, participant rules, inspection routine, supervision, and local requirements are approved. Images do not establish a certified capacity or weather rating.',
      quoteItems: [
        `Intended use: ${waterSlide.application}; share the site plan, operating season, target user group, and venue type`,
        isWetSlide ? 'Required footprint, height, lane count, water and drainage plan, landing or pool format, theme artwork, branding, material, and accessories' : 'Required footprint, height, lane count, access and clear-zone plan, theme artwork, branding, material, and accessories',
        'Quantity, destination, packing requirements, and requested delivery schedule',
      ],
    };
  }
  const flyingFish = flyingFishProfile(product);
  if (flyingFish) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    const footprint = /custom dimensions available/i.test(product.dimensions) ? 'a made-to-order footprint based on the water-site plan' : `the listed ${product.dimensions.trim()} footprint`;
    const siteInterface = flyingFish.isTowable
      ? 'tow-boat interface, water lane, launch and recovery access, rider queue, and spectator clearance'
      : 'launch and recovery access, shoreline entry, the controlled fishing area, participant briefing, and rescue access';
    const accessoryFocus = flyingFish.isTowable
      ? 'Tow-point reinforcement, handles, repair kit, carry or storage bags, accessories, and export packing'
      : 'Seat, rod-holder, repair kit, carry or storage bag, accessories, and export packing';
    const operationNote = flyingFish.isTowable
      ? 'Operate only with a compatible tow boat, approved tow point, trained staff, participant briefing, pre-use inspection, suitable water conditions, and the final manufacturer instructions. The image does not establish a certified capacity, speed, or weather rating.'
      : 'Use only in a suitable controlled water area with trained supervision, participant briefing, pre-use inspection, suitable conditions, and the final manufacturer instructions. The image does not establish a certified load, weather, or operating rating.';
    return {
      template,
      productType: flyingFish.keywords[0],
      primaryBuyer: flyingFish.buyer,
      purpose: flyingFish.purpose,
      applications: [
        { title: flyingFish.application, text: `Plan ${footprint} around ${flyingFish.isTowable ? 'tow-boat compatibility, rider access, water conditions, and supervised session flow' : 'shoreline access, participant use, water conditions, and supervised session flow'}.` },
        { title: flyingFish.isTowable ? 'Resort and beach recreation' : 'Guided fishing and outdoor recreation', text: `Use the ${flyingFish.keywords[0]} format for managed activity sessions after reviewing the water area, staff position, rescue access, and operating schedule.` },
        { title: 'Commercial rental inventory', text: `Review inflation, ${flyingFish.isTowable ? 'tow-point hardware' : 'seat and pontoon hardware'}, cleaning, drying, inspection, transport, repair support, and storage for repeat bookings.` },
      ],
      planningPoints: [
        `${footprint}, ${siteInterface}`,
        flyingFish.isTowable ? 'Participant count, age or ability rules, tow speed limits, supervision, rescue plan, weather conditions, and local water-activity requirements' : 'Participant ability rules, water-entry practice, supervision, rescue plan, weather conditions, and local water-access requirements',
        `Final ${flyingFish.isTowable ? 'rider layout' : 'seat and storage layout'}, valves, reinforcement, accessories, material, and packing against the approved specification (${product.material})`,
      ],
      customization: [flyingFish.options, `Colors, printed graphics, logos, ${flyingFish.isTowable ? 'rider instructions and coordinated towable product-family artwork' : 'equipment details and outdoor-product-family artwork'}`, accessoryFocus],
      operationNote,
      quoteItems: [flyingFish.isTowable ? `Intended use: ${flyingFish.application}; share the water venue, tow boat, operating season, and target rider group` : `Intended use: ${flyingFish.application}; share the water venue, access plan, operating season, and target user group`, flyingFish.isTowable ? 'Required footprint, rider capacity, tow-point and handle layout, colors, branding, material, and accessories' : 'Required footprint, seat and rod-holder layout, colors, branding, material, and accessories', 'Quantity, destination, packing requirements, and requested delivery schedule'],
    };
  }
  const newWaterPark = newWaterParkProfile(product);
  if (newWaterPark) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: newWaterPark.keywords[0],
      primaryBuyer: newWaterPark.buyer,
      purpose: newWaterPark.purpose,
      applications: [
        { title: newWaterPark.application, text: `${newWaterPark.purpose} Match sessions, guest movement, and supervision to the actual venue plan.` },
        { title: 'Seasonal aquatic events', text: `Position this ${newWaterPark.keywords[0]} for a managed seasonal program after confirming the site, water conditions, access, and operating dates.` },
        { title: 'Commercial venue and rental planning', text: 'Review setup crew, compatible inflation equipment, anchoring, cleaning, drying, storage, and repeat-use needs before adding the unit to a venue or rental program.' },
      ],
      planningPoints: [
        `Confirm the ${product.dimensions.trim()} reference footprint, available water area, depth, access, entry and exit, and surrounding clear zone`,
        'Plan user group, session capacity, supervision, rescue arrangements, water quality, anchoring, weather limits, and local operating rules',
        `Review the final slide and pool configuration, accessories, material, and packing against the approved project specification (${product.material})`,
      ],
      customization: [newWaterPark.options, 'Theme, color palette, logo placement, printed graphics, and coordinated product-family artwork', 'Approved inflation equipment, anchoring, repair kit, carrying or storage bags, accessories, and export packing'],
      operationNote: 'Operate only after the site and water conditions, anchoring plan, supervision and rescue procedures, participant rules, inspection, and local requirements are approved. Images do not establish a certified capacity, water-depth range, or weather rating.',
      quoteItems: [`Intended application: ${newWaterPark.application}; share the venue type, water area, depth, and target season`, `Required footprint, slide and entry layout, theme, branding, material, anchoring, and accessories`, 'Quantity, destination, packing requirements, and requested delivery schedule'],
    };
  }
  const newThemePark = newThemeParkProfile(product);
  if (newThemePark) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    const footprint = `the listed ${product.dimensions.trim()} reference footprint`;
    return {
      template,
      productType: newThemePark.coreKeyword,
      primaryBuyer: newThemePark.buyer,
      purpose: newThemePark.purpose,
      applications: [
        { title: 'Commercial themed play', text: `Use ${footprint} for ${newThemePark.application}, with a defined entry, exit, staff position, guest circulation, and supervision plan.` },
        { title: 'Rental and venue programs', text: `Plan the themed attraction around the visible features, venue clearance, access route, setup schedule, inspection routine, cleaning, drying, transport, and storage.` },
        { title: 'OEM/ODM theme projects', text: `Coordinate the final play layout, artwork, colors, branding, modules, dimensions, accessory package, and destination requirements before production.` },
      ],
      planningPoints: [
        `${footprint}, height clearance, entry and exit direction, blower position, anchoring surface, operator position, queue, and spectator separation`,
        'Target age group, expected throughput, venue type, indoor or outdoor setting, access route, staffing, supervision, cleaning, repair-kit access, transport, and dry storage',
        `Final themed artwork, play features, material, accessories, dimensions, packing, and destination-market requirements against the approved specification (${product.material})`,
      ],
      customization: [
        newThemePark.options,
        'Commercial colors, custom theme panels, approved character-inspired artwork, printed logos, sponsor graphics, entry signage, and player-facing instructions',
        'Blower package, anchoring, repair kit, carry bags, export packing, and project-specific accessories',
      ],
      operationNote: `Operate the ${newThemePark.coreKeyword} only after the site, access, clear areas, anchoring, inflation checks, participant rules, staffing, supervision, and local requirements are confirmed in the approved specification. Images do not establish an unlisted capacity, certification, or weather rating.`,
      quoteItems: [
        `Intended use: ${newThemePark.application}; share the venue type, usable footprint, height clearance, target age range, and planned operating schedule`,
        'Preferred theme, visual references, activity layout, colors, logos, dimensions, accessories, packing, and any entry, exit, or guest-flow requirements',
        'Quantity, destination, target delivery date, blower, anchoring, installation, storage, and project documentation needs',
      ],
    };
  }
  const newTent = newInflatableTentProfile(product);
  if (newTent) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: newTent.keywords[0],
      primaryBuyer: newTent.buyer,
      purpose: newTent.purpose,
      applications: [
        { title: newTent.use, text: `${newTent.purpose} Plan visitor flow, access, staffing, and the operating footprint around the event brief.` },
        { title: 'Branded event environments', text: `Develop ${newTent.keywords[0]} around the audience journey, venue plan, approved visual identity, and intended event schedule.` },
        { title: 'Rental and temporary installations', text: 'Review setup crew, power or blower location, anchoring, packing, cleaning, storage, and repeat-use procedures before deployment.' },
      ],
      planningPoints: [
        `Confirm the ${product.dimensions.trim()} reference, site footprint, height clearance, access route, entrance and exit, and guest circulation`,
        'Review installation surface, anchoring method, power and blower placement, weather exposure, occupancy plan, and local venue requirements',
        `Align the final material and project configuration with ${product.material}, the intended use, and destination-market requirements`,
      ],
      customization: [newTent.options, 'Colors, printed graphics, logo files, interior treatment, accessories, and export packing', 'Final size, material, seams, blower or inflation arrangement, anchoring, and operating details confirmed in the approved specification'],
      operationNote: `Before operation, follow the final manufacturer specification and venue procedures for inflation, access, occupancy, anchoring, weather monitoring, supervision, inspection, and shutdown. The pictured concept does not by itself establish a safety rating or weather certification.`,
      quoteItems: [`Project use: ${newTent.use}; share the site plan, surface, indoor or outdoor setting, and target dates`, `Requested footprint, height, access layout, material, branding artwork, options, and operating requirements`, 'Quantity, destination country, installation or packing needs, and requested delivery schedule'],
    };
  }
  const interactiveProfile = interactiveGameProfile(product);
  const bubbleTent = bubbleTentProfile(product);
  const campingTent = campingTentProfile(product);
  const nightclubTent = nightclubTentProfile(product);
  const weddingTent = weddingTentProfile(product);
  if (interactiveProfile) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    const footprint = /custom dimensions available/i.test(product.dimensions) ? 'a made-to-order footprint based on the venue plan' : `the listed ${product.dimensions.trim()} footprint`;
    return {
      template,
      productType: interactiveProfile.productType,
      primaryBuyer: interactiveProfile.primaryBuyer,
      purpose: `This ${interactiveProfile.productType} is shown as ${interactiveProfile.visibleLayout}. It supports ${interactiveProfile.gameMechanic} for ${interactiveProfile.application}.`,
      applications: [
        { title: 'Commercial event play', text: `Use the format for ${interactiveProfile.application}, with a clear operator position, guest queue, and approved participation rules.` },
        { title: 'Rental and venue programs', text: `Plan ${footprint}, access, setup, turnover, and storage around the expected audience and repeat-use schedule.` },
        { title: 'Branded challenges', text: `Build the visible game format around sponsor artwork, score or prize rules, and a player flow that fits the event brief.` },
      ],
      planningPoints: [
        `${footprint}, plus player approach, entry and exit, blower placement, anchoring, queue space, operator position, and spectator separation`,
        `${interactiveProfile.gameMechanic}; confirm compatible accessories, participant age range, game duration, scoring, rotation, and supervised operating rules`,
        'Level surface, power, access route, weather exposure where relevant, setup procedure, cleaning, repair kit, transport, and dry storage',
      ],
      customization: [
        interactiveProfile.customizationFocus,
        'Commercial color scheme, printed logo panels, sponsor artwork, event instructions, and branded player-facing graphics',
        'Blower package, anchoring, compatible game accessories, repair kit, carry bags, export packing, and project-specific requirements',
      ],
      operationNote: `Operate the ${interactiveProfile.productType} only with the compatible accessories, participant rules, staffing, inflation checks, anchoring, and site conditions confirmed in the approved specification. The venue operator must assess weather, power, surface, access, supervision, and local requirements before each session.`,
      quoteItems: [
        'Venue type, usable footprint, indoor or outdoor setting, participant age range, expected throughput, and planned game format',
        'Requested target, lane, opening, score, vehicle, ball, soft-play, or accessory specification as applicable to the selected game',
        'Artwork, logo files, quantity, destination, target delivery date, blower and anchoring needs, packing, and storage requirements',
      ],
    };
  }
  if (bubbleTent) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    const footprint = /custom dimensions available/i.test(product.dimensions)
      ? 'a made-to-order footprint based on the venue plan'
      : `the listed ${product.dimensions.trim()} footprint`;
    return {
      template,
      productType: bubbleTent.productType,
      primaryBuyer: bubbleTent.primaryBuyer,
      purpose: `This ${bubbleTent.productType} is shown as ${bubbleTent.visibleLayout}. It is planned for ${bubbleTent.application}.`,
      applications: [
        { title: 'Event displays and hospitality', text: `Use ${footprint} for ${bubbleTent.application}, with an approved access route, blower position, and guest circulation plan.` },
        { title: 'Rental and temporary installations', text: 'Review the surface, anchoring, power, weather exposure, setup crew, cleaning, drying, and packed storage before operating on repeat events.' },
        { title: 'Branded projects', text: 'Plan the transparent enclosure around artwork, lighting, decor, sponsor visibility, entry flow, and the intended interior use.' },
      ],
      planningPoints: [
        `${footprint}, height clearance, entry and exit direction, blower position, power route, anchoring surface, and guest circulation`,
        'Venue weather plan, ventilation, event duration, operating supervision, access for setup and packing, and local site requirements',
        'Commercial PVC specification, cleaning and drying procedure, repair-kit access, transport, and dry storage between installations',
      ],
      customization: [
        bubbleTent.customizationFocus,
        'Commercial colors, print-ready logo panels, sponsor graphics, interior display treatment, and event messaging',
        'Blower, anchoring, lighting interfaces, repair kit, carry bags, export packing, and destination-specific requirements',
      ],
      operationNote: `Use the ${bubbleTent.productType} only on a suitable site with the specified blower, anchoring, access, and ventilation arrangement. The venue operator must assess weather, occupancy, power, supervision, cleaning, drying, and local requirements before each installation.`,
      quoteItems: [
        'Venue type, usable footprint, ceiling or outdoor height clearance, access route, surface, installation duration, and expected guest flow',
        'Required entrance, tunnel, clear-panel, balloon or decor layout, lighting preference, artwork files, and branding brief',
        'Quantity, destination, target delivery date, blower and anchoring requirements, packing, storage, and custom dimensions if needed',
      ],
    };
  }
  if (campingTent) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    const footprint = `the listed ${product.dimensions.trim()} footprint`;
    return {
      template,
      productType: campingTent.productType,
      primaryBuyer: campingTent.primaryBuyer,
      purpose: `This ${campingTent.productType} is shown as ${campingTent.visibleLayout}. It is planned for ${campingTent.application}.`,
      applications: [
        { title: 'Commercial camping and glamping', text: `Use ${footprint} for ${campingTent.application}, with a confirmed access route, installation area, inflation equipment, anchoring plan, and guest circulation.` },
        { title: 'Rental and seasonal programs', text: 'Review the ground condition, power or inflation equipment, weather plan, setup crew, cleaning, drying, repair-kit access, transport, and dry storage before repeat use.' },
        { title: 'Branded outdoor hospitality', text: 'Plan the shelter around the intended interior use, entrance flow, sleeping or lounge layout, lighting, artwork, logo visibility, ventilation, and approved site requirements.' },
      ],
      planningPoints: [
        `${footprint}, height clearance, entrance direction, inflation position, anchoring surface, interior layout, access route, and guest circulation`,
        'Venue weather plan, ventilation, occupancy, overnight or event duration, operating supervision, campsite rules, and local site requirements',
        'Commercial PVC specification, cleaning and drying procedure, repair-kit access, transport, and dry storage between installations',
      ],
      customization: [
        campingTent.customizationFocus,
        'Commercial color scheme, print-ready logo panels, branded entry graphics, interior treatment, and event messaging',
        'Blower or pump package, anchoring, repair kit, carry bags, export packing, and destination-specific requirements',
      ],
      operationNote: `Use the ${campingTent.productType} only on a suitable site with the specified inflation equipment, anchoring, access, and ventilation arrangement. The operator must assess weather, occupancy, power, supervision, cleaning, drying, and local requirements before each installation.`,
      quoteItems: [
        'Campsite, resort, rental, or event use; usable footprint; height clearance; access route; surface; installation duration; and expected occupancy',
        'Required entrance, window, ventilation, interior layout, floor, lighting, color, logo, and branding brief',
        'Quantity, destination, target delivery date, blower or pump, anchoring, packing, storage, and custom-size requirements',
      ],
    };
  }
  if (nightclubTent) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    const footprint = `the listed ${product.dimensions.trim()} footprint`;
    return {
      template,
      productType: nightclubTent.productType,
      primaryBuyer: nightclubTent.primaryBuyer,
      purpose: `This ${nightclubTent.productType} is shown as ${nightclubTent.visibleLayout}. It is planned for ${nightclubTent.application}.`,
      applications: [
        { title: 'Nightlife and event programs', text: `Use ${footprint} for ${nightclubTent.application}, with a planned entrance, egress, lighting or sound route, service position, and guest circulation.` },
        { title: 'Rental and temporary venues', text: 'Review the ground or floor condition, anchoring, power, lighting, sound, weather exposure, setup crew, cleaning, drying, transport, and dry storage before repeat events.' },
        { title: 'Branded hospitality', text: 'Plan the enclosure around bar or lounge zoning, sponsor visibility, artwork, lighting, signage, queue flow, ventilation, and the approved venue brief.' },
      ],
      planningPoints: [
        `${footprint}, height clearance, entry and egress direction, anchoring surface, service route, lighting and sound interfaces, and guest circulation`,
        'Venue weather plan, ventilation, occupancy, event duration, operating supervision, power, fire or local venue rules, and access for setup and packing',
        `${product.material} specification, cleaning and drying procedure, repair-kit access, transport, and dry storage between installations`,
      ],
      customization: [
        nightclubTent.customizationFocus,
        'Commercial color scheme, print-ready logo panels, sponsor graphics, menu or event signage, and guest-facing interior treatment',
        'Blower, anchoring, lighting and sound interfaces, repair kit, carry bags, export packing, and destination-specific requirements',
      ],
      operationNote: `Use the ${nightclubTent.productType} only on a suitable site with the specified anchoring, access, ventilation, power, and event equipment arrangement. The operator must assess weather, occupancy, supervision, cleaning, drying, fire or venue rules, and local requirements before each installation.`,
      quoteItems: [
        'Venue type, usable footprint, height clearance, access route, floor or ground surface, installation duration, and expected guest flow',
        'Required entrance and egress, bar or dance-floor zoning, lighting or sound interfaces, artwork, sponsor graphics, and event brief',
        'Quantity, destination, target delivery date, blower and anchoring requirements, packing, storage, and custom layout needs',
      ],
    };
  }
  if (weddingTent) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    const footprint = `the listed ${product.dimensions.trim()} footprint`;
    return {
      template,
      productType: weddingTent.productType,
      primaryBuyer: weddingTent.primaryBuyer,
      purpose: `This ${weddingTent.productType} is shown as ${weddingTent.visibleLayout}. It is planned for ${weddingTent.application}.`,
      applications: [
        { title: 'Weddings and hosted celebrations', text: `Use ${footprint} for ${weddingTent.application}, with a confirmed entrance, egress, ceremony or reception layout, catering route, and guest circulation plan.` },
        { title: 'Rental and seasonal event programs', text: 'Review the ground or floor condition, anchoring, power, lighting, weather exposure, setup crew, cleaning, drying, transport, and dry storage before repeat events.' },
        { title: 'Branded hospitality', text: 'Plan the enclosure around decor, floral or furniture placement, sponsor visibility, lighting, signage, guest flow, ventilation, and the approved venue brief.' },
      ],
      planningPoints: [
        `${footprint}, height clearance, entrance and egress direction, anchoring surface, ceremony or reception zoning, service route, and guest circulation`,
        'Venue weather plan, ventilation, occupancy, event duration, operating supervision, power, lighting, fire or venue rules, and access for setup and packing',
        `${product.material} specification, cleaning and drying procedure, repair-kit access, transport, and dry storage between installations`,
      ],
      customization: [
        weddingTent.customizationFocus,
        'Commercial white or custom color scheme, print-ready logo panels, event or sponsor graphics, lighting treatment, and guest-facing interior decor',
        'Blower, anchoring, lighting interfaces, repair kit, carry bags, export packing, and destination-specific requirements',
      ],
      operationNote: `Use the ${weddingTent.productType} only on a suitable site with the specified anchoring, access, ventilation, power, and event-equipment arrangement. The operator must assess weather, occupancy, supervision, cleaning, drying, fire or venue rules, and local requirements before each installation.`,
      quoteItems: [
        'Venue type, usable footprint, height clearance, access route, floor or ground surface, installation duration, and expected guest flow',
        'Required entrance and egress, ceremony or reception zoning, catering route, lighting treatment, decor, artwork, and event brief',
        'Quantity, destination, target delivery date, blower and anchoring requirements, packing, storage, and custom layout needs',
      ],
    };
  }
  if (product.category === 'Bumper Ball') {
    const isYouth = /kid|kids|child/.test(searchable) || /1\.25m/.test(product.dimensions);
    const isZorb = /zorb/.test(searchable);
    const isSuit = /suit/.test(searchable);
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: isZorb ? 'commercial inflatable zorb ball' : isSuit ? 'inflatable bubble-soccer suit' : 'commercial inflatable bumper ball',
      primaryBuyer: 'bubble-soccer operators, sports venues, schools, event companies, rental businesses, and inflatable-equipment distributors',
      purpose: isYouth
        ? `The ${product.dimensions.trim()} ${product.material} model is listed for youth-oriented group activities. Confirm participant fit, game format, playing surface, and supervision requirements before selecting a set.`
        : isZorb
          ? `The ${product.dimensions.trim()} ${product.material} model is listed as a zorb-style ball for operator-led recreation and event programs. Confirm the intended activity, user fit, venue conditions, and operating plan before ordering.`
          : `The ${product.dimensions.trim()} ${product.material} model is listed for adult or mixed-group bubble-soccer activities. Confirm participant fit, playing area, supervision, and local operating rules before use.`,
      applications: [
        { title: 'Bubble-soccer programs', text: 'Plan team sessions around ball diameter, participant group, suitable surface, session length, and supervised player rotation.' },
        { title: isYouth ? 'Youth sports and school events' : 'Adult group events', text: 'Confirm participant fit, available space, event format, and supervision before adding the product to a school, venue, or event program.' },
        { title: 'Rental and entertainment venues', text: 'Review quantity, transport, cleaning, inspection, storage, and accessory requirements for repeat commercial sessions.' },
      ],
      planningPoints: [
        `Reference diameter ${product.dimensions.trim()}, participant age and fit, and intended activity format`,
        'Clear playing area, surface suitability, access, participant rotation, supervision, and venue rules',
        'Commercial TPU specification, quantity, inflation equipment, cleaning, dry storage, and transport plan',
      ],
      customization: [
        'Ball diameter and participant-group configuration',
        'Color combinations, team identification, and suitable printed branding',
        'Quantity, accessory package, repair support, carrying and packing requirements',
      ],
      operationNote: 'Use bumper or bubble balls only in an appropriate supervised activity with a suitable surface, clear play area, participant instructions, inspection routine, and venue-approved operating rules.',
      quoteItems: [
        'Participant age range, intended activity, reference diameter, and expected quantity',
        'Playing surface, venue dimensions, session format, and supervision plan',
        'Color or logo brief, accessory preference, destination, and target delivery date',
      ],
    };
  }
  if (product.category === 'Inflatable Games' && ringTossKeywordSet(product).length) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: 'commercial inflatable ring toss target game',
      primaryBuyer: 'party rental businesses, carnival operators, family entertainment centers, schools, event agencies, and branded-activation teams',
      purpose: `This ${product.dimensions.trim()} inflatable ring toss combines a bright multi-column target, numbered scoring zones, and throw rings in one supervised carnival game station. It is designed for quick player turns, visible spectator appeal, and repeat play at events or commercial venues.`,
      applications: [
        { title: 'Carnivals and family events', text: 'Create a familiar ring-toss challenge with simple turn-taking, visible scores, and a compact activity footprint.' },
        { title: 'School, camp, and team programs', text: 'Use the numbered targets for skill challenges, team rotations, field days, and supervised group activities.' },
        { title: 'Rental and branded activations', text: 'Build a colorful game station around queue flow, prize rules, sponsor graphics, and fast event changeovers.' },
      ],
      planningPoints: [
        `Reference footprint ${product.dimensions.trim()}, plus a marked throwing line, player approach, access route, blower position, and clear spectator buffer`,
        'Ring quantity and diameter, scoring values, prize or game rules, participant age range, staffing, turn duration, and player rotation',
        'Level surface, anchoring, power, weather exposure, inflation checks, cleaning, repair kit, transport, and dry storage plan',
      ],
      customization: [
        'Target-column count, height, scoring values, ring quantity, throwing-line distance, and overall game footprint',
        'Colors, logo panels, sponsor graphics, carnival artwork, themed scoring zones, and printed event messaging',
        'Blower package, anchoring, rings and accessory set, repair kit, carry bags, export packing, and project-specific requirements',
      ],
      operationNote: 'Operate the inflatable ring toss with compatible soft rings, a clearly marked throwing line, secured anchoring, supervised turns, separated spectators, routine inflation checks, and venue-approved game and prize rules.',
      quoteItems: [
        'Venue type, usable footprint, indoor or outdoor surface, throwing distance, participant age range, and expected throughput',
        'Target layout, scoring values, ring quantity and material, colors, branding, prizes or event rules, and accessory preferences',
        'Quantity, destination, target delivery date, blower or anchoring needs, packing, storage, and rental or activation requirements',
      ],
    };
  }
  if (product.category === 'Inflatable Games' && battingCageKeywordSet(product).length) {
    const profile = battingCageProfile(product)!;
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: profile.productType,
      primaryBuyer: 'baseball and softball training facilities, schools, sports clubs, event-rental companies, family entertainment centers, and sports-equipment distributors',
      purpose: `This ${product.dimensions.trim()} ${profile.productType} is configured around ${profile.visibleLayout}. It supports ${profile.trainingUse} when the approved ball, bat, pitching-machine arrangement, player flow, and venue operating plan are confirmed.`,
      applications: [
        { title: 'Baseball and softball training', text: `Plan ${profile.trainingUse} around the approved ball, bat, pitching equipment, player group, and clear operating space.` },
        { title: 'Event and rental programs', text: `Use ${profile.visibleLayout} for a supervised baseball challenge or practice station with defined entry, queue, staff, and spectator positions.` },
        { title: 'Venue activations', text: `Configure ${profile.customizationFocus} for branded skills challenges, sponsor events, clubs, academies, or mobile sports programs.` },
      ],
      planningPoints: [
        `Reference footprint ${product.dimensions.trim()}, plus ${profile.planningFocus}`,
        'Approved baseball or softball, bat, pitching-machine setup, netting specification, player age group, staff position, and session format',
        'Level site, anchoring plan, power, weather exposure, lighting, inflation checks, cleaning, transport, repair kit, and dry storage',
      ],
      customization: [
        profile.customizationFocus,
        'Color scheme, printed logos, baseball or softball graphics, sponsor panels, and branded training-station artwork',
        'Blower package, anchoring, ball or target accessories, pitching-machine interface, repair kit, carry bags, and export packing',
      ],
      operationNote: 'Use the batting cage only with the balls, bats, pitching equipment, participant limits, and game or training procedures confirmed in the approved specification. The operator must assess the site, anchoring, wind and weather, lighting, player separation, supervision, and local venue requirements before each session.',
      quoteItems: [
        'Baseball, softball, or event-challenge use; approved ball, bat, pitching-machine, and netting requirements',
        'Usable site dimensions, height clearance, access route, indoor or outdoor setting, anchoring, power, and weather plan',
        'Reference or custom tunnel dimensions, branding, quantity, destination, required delivery date, accessory package, and storage needs',
      ],
    };
  }
  if (product.category === 'Inflatable Games' && halloweenMazeKeywordSet(product).length) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: 'custom inflatable Halloween maze and haunted-house attraction',
      primaryBuyer: 'haunted attractions, family entertainment centers, seasonal event operators, party rental companies, festivals, and themed-attraction distributors',
      purpose: 'This made-to-order inflatable maze creates a walk-through Halloween attraction with an enclosed route, themed visual treatment, and configurable entrance and exit. The layout should be designed around the venue footprint, visitor flow, age group, staffing, and emergency access rather than treated as a fixed-size product.',
      applications: [
        { title: 'Haunted attractions and Halloween events', text: 'Build a seasonal walk-through route with themed scenes, controlled entry, managed throughput, and clear staff positions.' },
        { title: 'FECs and family venues', text: 'Add a family-oriented maze experience with sight lines, age-appropriate theming, and predictable visitor circulation.' },
        { title: 'Festivals and temporary activations', text: 'Create a branded attraction planned around loading access, queue footprint, event dates, power, and strike or storage requirements.' },
      ],
      planningPoints: [
        'Available footprint, maze route length, corridor width, overall height, entrance and exit, queue, and accessible circulation',
        'Target age group, visitor capacity, throughput, staffing positions, lighting or sound needs, and emergency egress',
        'Indoor or outdoor surface, anchoring, blower position, power, weather exposure, cleaning, and storage',
      ],
      customization: [
        'Maze footprint, route configuration, corridor width, wall height, entrances, exits, and scene openings',
        'Halloween, haunted-house, or family-friendly theme, colors, printed artwork, logos, and sponsor panels',
        'Lighting or sound provisions, blower package, anchoring, repair kit, carry bags, and packing format',
      ],
      operationNote: 'Before opening, review the maze route for unobstructed emergency egress, accessible circulation, appropriate visibility, visitor capacity, fire and venue rules, staffing, anchoring, inflation checks, and queue control. Final operating procedures and occupancy limits must be set by the venue operator and local authorities.',
      quoteItems: [
        'Venue plan, usable footprint, ceiling height, access route, and indoor or outdoor installation conditions',
        'Maze route concept, corridor widths, visitor age group, throughput target, entrances, exits, and egress plan',
        'Theme references, artwork, quantity, destination, opening date, lighting or sound, packing, and storage needs',
      ],
    };
  }
  if (product.category === 'Inflatable Games' && hungryHippoKeywordSet(product).length) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: 'human-scale inflatable Hungry Hippo team game',
      primaryBuyer: 'party rental operators, family entertainment centers, schools, corporate event planners, festivals, and interactive-game distributors',
      purpose: 'This 8 m diameter attraction translates a familiar hungry-hippo-style game into a human-scale team challenge. Players enter the defined play area and compete to collect or retrieve game pieces under staff direction; confirm the exact play mechanism, participant arrangement, and included accessories in the approved specification.',
      applications: [
        { title: 'Party rental and FEC programs', text: 'Offer a recognizable team activity with short rounds, clear turn-taking, and an engaging central play area.' },
        { title: 'Schools and youth events', text: 'Use the group format for field days, camps, recreation programs, and supervised team competitions.' },
        { title: 'Corporate events and festivals', text: 'Build a high-participation station around team rotation, a staffed play zone, queue flow, and event branding.' },
      ],
      planningPoints: [
        `8 m reference diameter, clear perimeter, entrance and exit, queue, spectator buffer, and access route`,
        'Participant count, team arrangement, age group, game-piece handling, round duration, and operator position',
        'Playing surface, anchoring, blower placement, inflation checks, cleaning, transport, and dry storage',
      ],
      customization: [
        'Overall diameter, wall or boundary height, entry points, and central play-area arrangement',
        'Team colors, game-piece design, printed graphics, logos, and event theme artwork',
        'Blower package, anchoring, repair kit, carry bags, packing format, and project-specific accessories',
      ],
      operationNote: 'Operate this human-scale group game with a documented play format, trained supervision, defined participant limits, clear entry and exit, secure anchoring, inflation checks, and separated spectator and queue areas. Confirm all player-contact or game-piece mechanisms in the approved specification and follow venue rules.',
      quoteItems: [
        'Venue type, usable footprint, access route, and clearance around the 8 m diameter reference size',
        'Participant and team format, age group, game-piece mechanism, round duration, and supervision plan',
        'Quantity, branding, destination, target delivery date, blower or accessory needs, packing, and storage',
      ],
    };
  }
  if (product.category === 'Inflatable Games' && airHockeyKeywordSet(product).length) {
    const isTable = /air hockey table/.test(searchable);
    const isCustom = /custom dimensions available/.test(product.dimensions);
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: isTable ? 'inflatable air hockey table game' : 'commercial inflatable air hockey attraction',
      primaryBuyer: 'party rental businesses, family entertainment centers, schools, corporate event planners, festivals, and interactive-game distributors',
      purpose: isTable
        ? 'This table-style inflatable air hockey attraction brings a familiar head-to-head puck game into a portable event format. Confirm the playing surface, puck behavior, blower arrangement, and operating rules during specification review.'
        : 'This compact inflatable air hockey game creates a recognizable two-player challenge for supervised event play, rental packages, and family entertainment programs, with setup and equipment details confirmed for the venue.',
      applications: [
        { title: 'Party rentals and FECs', text: 'Offer a familiar, fast-turn game that fits alongside other interactive attractions and supports repeat play.' },
        { title: 'Schools and youth programs', text: 'Use short head-to-head rounds for camps, field days, recreation programs, and supervised indoor events.' },
        { title: 'Corporate events and festivals', text: 'Build a branded competition around match rules, player rotation, queue space, and a staffed game station.' },
      ],
      planningPoints: [
        isCustom ? 'Target playing-surface dimensions, rail height, player access, blower space, queue, and spectator clearance' : `Reference size ${product.dimensions.trim()}, plus access, blower placement, queue, and spectator clearance`,
        'Puck and striker material, surface finish, play speed, match rules, player age range, and operator position',
        'Ground or floor surface, anchoring, power supply, inflation checks, cleaning, transport, and storage',
      ],
      customization: [
        'Overall footprint, playing area, rail height, player positions, and entry or access layout',
        'Team colors, printed graphics, logo placement, sponsor panels, and event branding',
        'Puck and striker package, blower requirements, anchoring, repair kit, carry bag, and packing format',
      ],
      operationNote: 'Before operation, confirm the game is used with compatible soft-play pucks and strikers specified for the product. Establish clear participant rules, stable placement, anchoring where required, supervised turns, blower and power arrangements, cleaning, inflation checks, and dry storage.',
      quoteItems: [
        'Venue type, usable floor area, access route, expected player throughput, and indoor or outdoor use',
        'Reference or custom size, playing-surface layout, puck and striker requirements, artwork, and colors',
        'Quantity, destination, required delivery date, blower and accessory needs, packing, and storage',
      ],
    };
  }
  if (product.category === 'Inflatable Games' && connectFourBasketballKeywordSet(product).length) {
    const isCustom = /custom dimensions available/.test(product.dimensions);
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: 'inflatable Connect Four basketball game',
      primaryBuyer: 'party rental businesses, family entertainment centers, schools, festivals, corporate event planners, and interactive-game distributors',
      purpose: isCustom
        ? 'It gives venues a made-to-order basketball target game that combines shooting accuracy with a giant Connect Four grid, sized around the available footprint and event format.'
        : 'It combines basketball shooting with an oversized Connect Four target grid, creating a quick-to-understand competitive game for supervised events and repeat rental programs.',
      applications: [
        { title: 'Party rental and FEC programs', text: 'Add a visually clear shooting game with short turns, easy team rotation, and strong repeat-play potential.' },
        { title: 'Schools and sports events', text: 'Use the grid-and-shot format for field days, camps, basketball skills activities, and supervised group challenges.' },
        { title: 'Corporate events and festivals', text: 'Create a branded competition around team colors, score rules, queue flow, and sponsor artwork.' },
      ],
      planningPoints: [
        isCustom ? 'Target width and height, hoop position, grid layout, throwing or shooting line, access, queue, and spectator clearance' : `Reference size ${product.dimensions.trim()}, plus shooting distance, access route, queue, and spectator clearance`,
        'Basketball size, hoop height, scoring rules, player age range, turn duration, team rotation, and operator position',
        'Surface, anchoring, blower placement, weather exposure, cleaning, transport, and dry storage',
      ],
      customization: [
        'Overall dimensions, grid size, hoop count and height, shooting line, entry points, and player flow',
        'Team colors, printed grid graphics, logos, sponsor panels, and event artwork',
        'Basketball specification, blower package, anchoring, repair kit, carry bag, packing, and custom venue details',
      ],
      operationNote: 'Operate the game with a marked shooting line, compatible basketballs, secure anchoring, clear participant and spectator zones, supervised turns, regular inflation checks, and a cleaning and dry-storage routine.',
      quoteItems: [
        'Venue type, available footprint, height clearance, shooting distance, and intended player capacity',
        'Fixed or custom dimensions, grid and hoop layout, ball size, scoring rules, artwork, and team colors',
        'Quantity, destination, target delivery date, blower and accessory needs, packing, and storage requirements',
      ],
    };
  }
  if (waterWalkingBallKeywordSet(product).length) {
    const ballProfile = waterWalkingBallProfile(product)!;
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: waterWalkingBallKeywordSet(product)[0],
      primaryBuyer: ballProfile.buyer,
      purpose: ballProfile.purpose,
      applications: [
        { title: ballProfile.application, text: `${ballProfile.purpose} Confirm water conditions, access, session flow, and supervision with the venue operator.` },
        { title: 'Aquatic events and festivals', text: `Use ${waterWalkingBallKeywordSet(product)[1]} as a managed session activity with a controlled queue, trained staff, participant briefing, and defined water-area boundaries.` },
        { title: 'Commercial rental programs', text: 'Evaluate transport, inflation equipment, session turnover, cleaning, inspection, and dry storage before adding the attraction to a rental fleet.' },
      ],
      planningPoints: [
        '2 m ball diameter, operating water area, water depth, access and exit method, clear perimeter, and participant recovery space',
        'Participant age and capacity, session duration, trained supervision, rescue access, and venue emergency procedures',
        'TPU specification, inflation equipment, inspection routine, cleaning, drying, transport, and storage conditions',
      ],
      customization: [
        'Ball diameter, color, printed branding, and visibility details',
        'Inflation valve, blower or pump compatibility, accessory package, and carry or packing format',
        'Quantity, replacement parts, repair kit, and project-specific labeling requirements',
      ],
      operationNote: 'Water walking balls require active, trained supervision and a venue-approved aquatic operating plan. Confirm participant eligibility, session limits, water depth, access and rescue procedures, equipment inspection, inflation, and local regulations with the site operator. Do not treat the product as a life-saving device.',
      quoteItems: [
        'Water venue type, usable water area, depth, access and rescue plan, and operating schedule',
        'Participant eligibility and capacity, session format, supervision plan, and 2 m reference diameter',
        'Quantity, branding, inflation equipment, destination, target delivery date, and storage requirements',
      ],
    };
  }
  if (product.category === 'Inflatable Games' && axeThrowingKeywordSet(product).length) {
    const isDualTarget = /dual target/.test(searchable);
    const isGame = /throwing game/.test(searchable);
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: isDualTarget ? 'dual-target inflatable axe-throwing attraction' : isGame ? 'custom inflatable axe-throwing target game' : 'custom inflatable axe-throw target game',
      primaryBuyer: 'party rental operators, family entertainment centers, festivals, corporate event planners, schools, and interactive game suppliers',
      purpose: isDualTarget
        ? 'It creates a head-to-head target challenge with two throwing faces, helping event operators keep turns visible and organize participant rotation around a shared activity station.'
        : isGame
          ? 'It provides a customizable target-game format for commercial events, with scoring, throwing distance, projectile compatibility, and operator flow specified for the intended audience.'
          : 'It turns axe-throwing into a supervised inflatable target activity that can be branded and configured around the venue footprint, participant flow, and event format.',
      applications: [
        { title: 'Party rental and FEC programs', text: 'Add a distinctive target challenge to game packages, indoor activity zones, festivals, and repeat event inventory.' },
        { title: 'Corporate events and team challenges', text: 'Use turn-based scoring and clear target visibility for facilitated team competitions, subject to the chosen soft-play equipment and operating rules.' },
        { title: 'Festivals and branded activations', text: 'Plan a visible game station around sponsor artwork, a marked throwing line, queue flow, and a staffed participant area.' },
      ],
      planningPoints: [
        'Custom footprint, overall height, access opening, throwing-line distance, clear approach, queue, and spectator boundary',
        'Target count, scoring layout, age group, approved soft-play projectile type, turn rules, and operator position',
        'Ground surface, anchoring, blower placement, power access, indoor or outdoor conditions, cleaning, and storage',
      ],
      customization: [
        'Target count, face layout, scoring zones, target height, throwing-line distance, and entry or return arrangement',
        'Lumberjack theme, colors, printed graphics, logos, sponsor panels, and event-specific artwork',
        'Compatible soft-play projectiles, blower package, anchoring, repair kit, carry bag, packing, and custom dimensions',
      ],
      operationNote: 'This is a supervised target-game concept, not a substitute for a hard-axe venue. Confirm soft-play projectile compatibility, participant age and rules, throwing-line distance, trained staffing, anchoring, clear zones, inflation checks, cleaning, and local venue requirements before operation.',
      quoteItems: [
        'Venue type, intended audience, available footprint, ceiling or height clearance, and throwing-line distance',
        'Single or dual target, scoring layout, compatible soft-play projectile, artwork, colors, and accessory needs',
        'Quantity, destination, target delivery date, event or rental use, packing, and storage requirements',
      ],
    };
  }
  if (product.category === 'Inflatable Games' && soccerFieldKeywordSet(product).length) {
    const isFoosball = /human foosball/.test(searchable);
    const isSoap = /soap/.test(searchable);
    const isSlipSlide = /slip and slide/.test(searchable);
    const isWater = /water soccer/.test(searchable);
    const isArena = /arena/.test(searchable);
    const isLarge = /(?:large|giant) inflatable soccer field/.test(searchable);
    const isCustom = /custom dimensions available/.test(product.dimensions);
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    const fieldType = isFoosball ? 'human foosball inflatable field' : isSoap ? 'soap soccer field' : isSlipSlide ? 'slip-and-slide soccer field' : isWater ? 'water soccer field' : isArena ? 'inflatable soccer arena' : isLarge && !isCustom ? 'large inflatable soccer field' : isCustom ? 'custom-size inflatable soccer field' : 'inflatable soccer field';
    const buyers = isFoosball
      ? 'party rental companies, team-building providers, family entertainment centers, schools, corporate event planners, and sports venues'
      : isWater || isSlipSlide || isSoap
        ? 'water parks, resorts, summer-event operators, party rental businesses, camps, and family entertainment centers'
        : 'sports clubs, schools, event operators, party rental businesses, recreation venues, and inflatable-equipment distributors';
    return {
      template,
      productType: fieldType,
      primaryBuyer: buyers,
      purpose: isFoosball
        ? 'It turns soccer into a human-scale foosball match, with players assigned to lanes so the activity is easy to explain, spectate, and run as a team event.'
        : isSoap
          ? 'It creates a contained soap-football activity area for supervised wet-play events, where surface treatment, water supply, drainage, and operating rules must be planned together.'
          : isSlipSlide
            ? 'It combines soccer play with a wet, slippery field surface for seasonal events that need a high-energy group activity and a defined water-management plan.'
            : isWater
              ? 'It provides a bounded soccer play area intended for water-based recreation, with site depth, anchoring, access, and supervision confirmed before production.'
              : isArena
                ? 'It creates a contained soccer play zone with goals and visible boundaries for small-sided matches, event activations, and supervised recreation.'
                : isLarge && !isCustom
                  ? 'It provides a large-format inflatable soccer boundary for organized play, temporary sports events, and recreation projects that need a portable field perimeter.'
                  : isCustom
                    ? 'It gives buyers a made-to-order inflatable soccer field that can be sized and configured around a venue plan, intended format, and access conditions.'
                    : 'It creates a portable, clearly bounded soccer play area for events, school programs, clubs, and rental packages that need a field with defined edges and goals.',
      applications: isFoosball ? [
        { title: 'Team-building and corporate events', text: 'Use fixed player lanes to create a cooperative, spectator-friendly match format for company events and group challenges.' },
        { title: 'Party rental and FEC programs', text: 'Offer a recognizable team game for birthdays, festivals, school events, and repeat rental packages.' },
        { title: 'Schools and sports clubs', text: 'Add a supervised activity for field days, camps, club socials, and community programs.' },
      ] : isWater || isSlipSlide || isSoap ? [
        { title: 'Water parks and resort programs', text: 'Plan a seasonal soccer activity around water depth or supply, drainage, anchoring, supervision, and guest circulation.' },
        { title: 'Summer events and festivals', text: 'Create a high-visibility wet-play station with a defined queue, operator position, water-management plan, and spectator boundary.' },
        { title: 'Rental and camp activities', text: 'Build a wet-play package around transport, setup, cleaning, drying, storage, and participant rules.' },
      ] : [
        { title: 'Schools and sports clubs', text: 'Use a contained pitch for small-sided matches, training games, sports days, camps, and supervised club activities.' },
        { title: 'Party rental and event operators', text: 'Add a simple-to-understand soccer activity to festivals, corporate events, family days, and repeat rental inventory.' },
        { title: 'Recreation venues and distributors', text: 'Specify field dimensions, goals, access, branding, packing, and project quantities for a venue or resale program.' },
      ],
      planningPoints: [
        isCustom ? 'Target field length and width, perimeter height, goal openings, access gates, surface, and clearance from nearby structures' : `Reference size ${product.dimensions.trim()}, plus perimeter clearance, entry points, access route, queue, and spectator space`,
        isFoosball ? 'Player count, lane arrangement, team zones, match rules, ball size, supervision, and participant rotation' : 'Intended soccer format, age group, goal dimensions, player capacity, ball choice, and operator or supervision position',
        isWater || isSlipSlide || isSoap ? 'Water source or water depth, drainage, non-slip operating rules, surface, anchoring, cleaning, drying, and local wet-play requirements' : 'Ground preparation, anchoring, blower position, inflation checks, weather exposure, transport, and dry storage',
      ],
      customization: [
        'Field dimensions, wall height, goal count and size, entry openings, lane configuration, and perimeter layout',
        'Field markings, team colors, printed artwork, sponsor logos, and event or venue branding',
        'Wet-use details where applicable, blower package, anchoring, repair kit, carry bags, packing, and accessory list',
      ],
      operationNote: isWater || isSlipSlide || isSoap
        ? 'Wet-play soccer products require a confirmed water plan, drainage, suitable surface, anchoring, clear player rules, trained supervision, regular checks, cleaning, complete drying, and compliance with local venue requirements.'
        : 'A commercial inflatable soccer field should be operated with a suitable surface, secure anchoring, clear entry and exit, defined player and spectator zones, inflation checks, supervised play, and a documented cleaning and storage routine.',
      quoteItems: [
        'Venue type, ground or water setting, site plan, available footprint, and target player capacity',
        'Field format, dimensions, goal and entry layout, markings, branding, material, and accessory requirements',
        'Quantity, destination, target delivery date, season or event schedule, packing, and storage needs',
      ],
    };
  }
  if (product.category === 'Inflatable Games' && isNewBilliardsProduct(product) && /billiard|pool table|snooker/.test(searchable)) {
    const isHuman = /human billiards|soccer billiards/.test(searchable);
    const isCustom = /尺寸定制|custom dimensions available/.test(searchable);
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: isHuman ? 'human-scale inflatable soccer-billiards game' : isCustom ? 'custom-size inflatable billiards table attraction' : 'inflatable billiards pool-table game',
      primaryBuyer: 'party rental businesses, family entertainment centers, sports bars, resorts, event operators, and activity venues',
      purpose: isHuman
        ? 'It turns a familiar billiards concept into a full-body soccer challenge, giving participants room to move, aim, and play inside a bounded inflatable arena.'
        : isCustom
          ? 'It provides a configurable inflatable billiards play zone that can be planned around a venue footprint, event theme, and preferred pool-style game layout.'
          : 'It creates a large-format pool-table-inspired activity for events and venues that need a visually clear, group-friendly game with a defined play boundary.',
      applications: isHuman ? [
        { title: 'Interactive event rentals', text: 'Package the human-scale game for festivals, corporate events, school activities, and team challenges where spectators can follow each turn.' },
        { title: 'FEC and sports-bar attractions', text: 'Add a distinctive active-play alternative to conventional table games, subject to the available floor area and operating plan.' },
        { title: 'Resort and seasonal programs', text: 'Use the oversized format as a supervised group activity for guest programs, camps, and temporary event installations.' },
      ] : isCustom ? [
        { title: 'Custom venue projects', text: 'Share the floor plan and intended game rules so the inflatable perimeter and play area can be reviewed before production.' },
        { title: 'Rental and event packages', text: 'Develop a branded activity around the event footprint, participant flow, transport plan, and setup crew.' },
        { title: 'FEC and hospitality venues', text: 'Plan a billiards-inspired attraction for a defined activity zone, with the final footprint and play configuration approved against the venue.' },
      ] : [
        { title: 'Party rental and event operators', text: 'Offer a large-format game for festivals, company events, school activities, and group entertainment packages.' },
        { title: 'FECs and hospitality venues', text: 'Create a recognizable activity zone with a bounded play area and straightforward participant rotation.' },
        { title: 'Outdoor activations', text: 'The reference layout can be considered for outdoor programs when the surface, anchoring, weather plan, and site rules are suitable.' },
      ],
      planningPoints: [
        isCustom ? 'Required external footprint, clear access, play-area dimensions, wall height, and any height restrictions' : `Reference dimensions ${product.dimensions.trim()}, plus access, perimeter clearance, queue space, and spectator area`,
        'Game format, player age range, ball size and quantity, turn-taking rules, operator position, and expected session capacity',
        'Indoor or outdoor surface, anchoring, blower location, cleaning, dry storage, transport, and local venue requirements',
      ],
      customization: [
        'Overall footprint, perimeter height, entry position, corner or goal details, and player circulation',
        'Table colors, pool-ball graphics, event theme, logos, sponsor panels, and printed artwork',
        'Ball/accessory package, anchoring, blower, repair kit, carry bag, packing, and custom dimensions',
      ],
      operationNote: 'Plan this inflatable game with clear player rules, compatible balls, supervised turns, a suitable surface, secure anchoring, blower access, inflation checks, cleaning, and dry storage. Confirm local venue requirements before operation.',
      quoteItems: [
        'Venue type, indoor or outdoor surface, available footprint, expected player age range, and participant capacity',
        'Preferred game layout, ball or accessory requirements, colors, logo files, artwork, and custom-size needs',
        'Quantity, destination, target delivery date, event or rental schedule, packing, and storage requirements',
      ],
    };
  }
  if (product.category === 'Inflatable Games' && /foam|bubble/.test(searchable)) {
    const isBubble = /bubble/.test(searchable);
    const isRainbow = /rainbow/.test(searchable);
    const isCandy = /candy/.test(searchable);
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: isBubble ? 'bubble foam pit and foam-play attraction' : 'inflatable foam party pit',
      primaryBuyer: 'party rental businesses, family entertainment centers, indoor play venues, resorts, and event operators',
      purpose: isBubble ? `It creates a colorful foam-play zone${isRainbow || isCandy ? ` with ${isRainbow ? 'rainbow-arch' : 'candy-land'} visual theming` : ''} for supervised events, repeat rental packages, and family entertainment.` : 'It creates a contained foam-play zone for parties, summer events, family venues, and repeat commercial rental programs.',
      applications: [
        { title: 'Foam party rental', text: 'Build a memorable party package around a contained play area, foam machine position, participant flow, drainage, and practical cleanup planning.' },
        { title: 'Family entertainment centers', text: 'Add a repeat-play foam attraction with defined entry, exit, supervision, access, and customer throughput.' },
        { title: 'Events and resorts', text: 'Use the pit as a branded seasonal attraction for festivals, resort activities, camps, birthdays, and supervised outdoor programs.' },
      ],
      planningPoints: [
        'Available footprint, wall height, foam depth, entry and exit, access route, queue area, and clear supervision zone',
        'Foam machine position, power or water needs, drainage, surface, ventilation, cleaning, and drying plan',
        'Target age group, participant capacity, event schedule, indoor or outdoor exposure, storage, and local venue requirements',
      ],
      customization: [
        'Pit footprint, wall height, entry layout, foam-machine opening, splash or drainage details, and custom dimensions',
        'Rainbow, candy-land, brand, sponsor, team, or event artwork with selected colors and printed graphics',
        'Blower or foam-machine coordination, anchoring, repair kit, carry bag, packing format, and accessories',
      ],
      operationNote: 'A foam pit should be planned around foam-machine output, drainage, participant supervision, surface conditions, cleaning, drying, and safe access in the intended venue.',
      quoteItems: [
        'Venue type, user age range, target capacity, footprint, wall height, and intended foam-party format',
        'Foam machine, drainage, artwork, theme, custom dimensions, and destination-market requirements',
        'Quantity, target date, destination, packing, carry-bag, repair-kit, and accessory preferences',
      ],
    };
  }
  if (product.category === 'Inflatable Games' && /volleyball/.test(searchable)) {
    const isField = /field/.test(searchable);
    const isWater = /water|pool/.test(searchable);
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: isField ? 'inflatable volleyball field and court system' : isWater ? 'inflatable water volleyball court and pool-play system' : 'commercial inflatable volleyball court',
      primaryBuyer: isWater ? 'water parks, resorts, pool venues, party rental businesses, and event operators' : isField ? 'sports clubs, schools, event operators, party rental businesses, and distributors' : 'sports clubs, family entertainment centers, resorts, party rental businesses, and event operators',
      purpose: isField ? 'It creates a defined, portable volleyball field for team play, tournaments, school programs, and branded sports events.' : isWater ? 'It creates a buoyant volleyball play area for pool programs, resorts, water parks, and supervised summer events.' : 'It gives venues a visible, configurable volleyball court for team activities, tournaments, rentals, and repeat event programming.',
      applications: isField ? [
        { title: 'Sports clubs and schools', text: 'Create a clear court boundary for training, team play, school activity days, and supervised competition.' },
        { title: 'Events and brand activations', text: 'Use the portable field as a branded activity zone with team colors, sponsor graphics, and controlled player flow.' },
        { title: 'Rental and distributor programs', text: 'Offer an easy-to-explain court package for tournaments, festivals, corporate events, and seasonal rental programs.' },
      ] : isWater ? [
        { title: 'Resorts and pool venues', text: 'Add a water-play court that encourages group participation while fitting the confirmed pool or water-area plan.' },
        { title: 'Water parks and seasonal programs', text: 'Build a visible summer attraction around water depth, anchoring, net placement, supervision, and guest throughput.' },
        { title: 'Party rentals and events', text: 'Package pool volleyball for birthdays, camps, team days, and temporary activations with practical setup and storage planning.' },
      ] : [
        { title: 'Sports clubs and team events', text: 'Provide a defined play surface for training sessions, tournaments, team building, and supervised group activity.' },
        { title: 'FECs and party rentals', text: 'Add a repeat-play sports station to indoor or outdoor entertainment packages with clear entry, player, and spectator zones.' },
        { title: 'Resorts and event venues', text: 'Plan a branded court around guest flow, net position, access, surface, and the operating schedule.' },
      ],
      planningPoints: isWater ? [
        'Pool or water-area footprint, water depth, surface conditions, buoyancy, access, and anchoring method',
        'Net height, court boundary, player capacity, entry points, spectator separation, and supervision plan',
        'Inflation, cleaning, drying, storage, seasonal removal, and local water-venue operating requirements',
      ] : [
        'Available court footprint, playing surface, net height, clear boundary, access route, and spectator flow',
        'Player age group, court capacity, queue or rotation plan, supervision, anchoring, and indoor or outdoor use',
        'Setup crew, inflation and deflation routine, cleaning, storage, transport, and event schedule',
      ],
      customization: [
        'Court length and width, boundary height, net position and height, entry points, and player-zone layout',
        'Team colors, court graphics, sponsor logos, printed artwork, branding, and themed visual treatment',
        'Water or ground anchoring, accessories, carry bag, repair kit, blower package, packing, and custom dimensions',
      ],
      operationNote: isWater ? 'Water depth, anchoring, net tension, player separation, cleaning, drying, supervision, and local pool or water-venue rules must be confirmed before operation.' : 'Court stability, anchoring, net placement, player separation, inflation checks, cleaning, supervision, and local venue rules should be confirmed before use.',
      quoteItems: [
        'Venue type, playing surface or water area, footprint, player capacity, and intended operating schedule',
        'Court dimensions, net requirements, boundary colors, logos or artwork, anchoring, and accessory needs',
        'Quantity, destination, target delivery date, packing preferences, and any tournament or rental requirements',
      ],
    };
  }
  if (product.category === 'Inflatable Games' && /bungee run/.test(searchable)) {
    const isTwoLane = /2 lane/.test(searchable);
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: isTwoLane ? 'two-lane commercial bungee run race attraction' : 'commercial inflatable bungee run and fun-run attraction',
      primaryBuyer: 'party rental businesses, family entertainment centers, event operators, schools, camps, and team-building providers',
      purpose: isTwoLane ? 'It creates a head-to-head elastic-line race that gives venues a clear, competitive activity for supervised group play.' : 'It creates a high-energy bungee race and fun-run attraction that encourages repeat play, team challenges, and memorable event participation.',
      applications: [
        { title: 'Party rental and FEC programs', text: 'Add a simple-to-explain competitive attraction to birthday packages, indoor play zones, and repeat rental inventories.' },
        { title: 'Schools, camps, and team events', text: 'Use the lanes for relay challenges, field days, camps, corporate team building, and supervised group competitions.' },
        { title: 'Festivals and event activations', text: 'Build a visible activity station around clear start and finish points, participant rotation, queue flow, and sponsor branding.' },
      ],
      planningPoints: [
        'Available footprint, lane length, height clearance, access route, surface, anchoring, and spectator separation',
        'Number of lanes, elastic-line arrangement, participant age range, race rules, staffing, and queue or rotation flow',
        'Inflation, cleaning, drying, storage, transport, event schedule, and indoor or outdoor operating conditions',
      ],
      customization: [
        'Overall dimensions, lane count, start and finish layout, elastic-line position, participant zones, and entry points',
        'Colors, printed race graphics, team branding, sponsor logos, themed artwork, and event messaging',
        'Anchoring, blower package, carry bag, repair kit, packing format, accessories, and custom commercial specifications',
      ],
      operationNote: 'A commercial bungee run should be operated with defined race rules, trained supervision, secure anchoring, clear participant and spectator zones, inflation checks, and a practical cleaning and storage routine.',
      quoteItems: [
        'Venue type, available footprint, lane length, participant age range, expected capacity, and intended event format',
        'Lane count, elastic-line requirements, artwork, colors, branding, anchoring, and accessory preferences',
        'Quantity, target date, destination, packing needs, and whether the unit is for rental, FEC, school, or event use',
      ],
    };
  }
  if (product.category === 'Inflatable Games' && /boxing ring|boxing area|boxing arena|fighting ring/.test(searchable)) {
    const isArena = /arena|area|fighting/.test(searchable);
    const isSale = /for sale/.test(searchable);
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: isArena ? 'inflatable boxing arena and fighting-ring attraction' : 'commercial inflatable boxing ring',
      primaryBuyer: 'party rental businesses, family entertainment centers, sports clubs, event operators, schools, and team-building providers',
      purpose: isArena ? 'It creates a visible, supervised boxing and sparring activity zone for events, training programs, and competitive entertainment.' : isSale ? 'It gives buyers a commercial boxing ring format for purchase, repeat operation, promotional events, and supervised sports activities.' : 'It adds a recognizable boxing-ring attraction to rental fleets, FEC programs, team events, and supervised activity packages.',
      applications: [
        { title: 'Party rental and FEC programs', text: 'Offer a memorable boxing-themed activity with clear participant zones, staff supervision, queue flow, and repeat booking potential.' },
        { title: 'Sports clubs and training events', text: 'Use the ring format for controlled drills, demonstrations, school activities, team challenges, and promotional sports programs.' },
        { title: 'Brand activations and festivals', text: 'Build an eye-catching boxing attraction around sponsor graphics, event messaging, participant rotation, and spectator visibility.' },
      ],
      planningPoints: [
        'Available footprint, rope and corner layout, height clearance, access route, surface, anchoring, and spectator separation',
        'Participant age range, activity rules, glove or accessory requirements, staffing, queue or rotation flow, and event capacity',
        'Inflation, cleaning, drying, storage, transport, indoor or outdoor exposure, and local venue operating requirements',
      ],
      customization: [
        'Ring dimensions, rope height, corner posts, entry points, mat or interior layout, and participant-zone configuration',
        'Team colors, printed graphics, sponsor logos, event artwork, boxing themes, and venue branding',
        'Giant gloves, blower package, anchoring, carry bag, repair kit, packing format, accessories, and custom specifications',
      ],
      operationNote: 'A commercial inflatable boxing ring should be operated with clear participant rules, trained supervision, safe spacing, secure anchoring, inflation checks, cleaning, and a documented inspection routine.',
      quoteItems: [
        'Venue type, usable footprint, participant age range, expected capacity, activity format, and operating schedule',
        'Ring dimensions, rope and corner requirements, gloves or accessories, artwork, colors, branding, and anchoring',
        'Quantity, target date, destination, packing needs, and whether the unit is for rental, training, FEC, or event use',
      ],
    };
  }
  if (product.category === 'Inflatable Games' && /soccer dart|football dart|football darts|soccer darts|velcro soccer/.test(searchable)) {
    const isVelcro = /velcro/.test(searchable);
    const sport = /football/.test(searchable) ? 'football' : 'soccer';
    const isCustom = /custom dimensions available/i.test(product.dimensions);
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: isVelcro ? `inflatable ${sport} dartboard with hook-and-loop target` : `inflatable ${sport} dartboard kicking game`,
      primaryBuyer: 'party rental businesses, family entertainment centers, schools, sports clubs, event operators, and brand activation teams',
      purpose: isVelcro ? `It turns a familiar ${sport} kick into a scored target challenge, using hook-and-loop ball contact for supervised events and repeat-play programs.` : `It gives players a large, visible dartboard target to aim at with a ${sport} ball, creating an easy-to-understand activity for rentals, sports events, and group entertainment.`,
      applications: [
        { title: 'Party rental and FEC programs', text: 'Add a quick-turn target game to birthdays, family activity zones, rental packages, and indoor entertainment schedules.' },
        { title: 'Schools and sports clubs', text: 'Use the target for skill challenges, team rotations, field days, camps, and supervised football or soccer activities.' },
        { title: 'Festivals and brand activations', text: 'Create a visible branded game station with a kicking line, simple scoring, queue flow, and sponsor graphics.' },
      ],
      planningPoints: [
        'Target height and width, available footprint, kicking distance, clear approach, access route, and spectator boundary',
        'Target-face format, ball compatibility, scoring zones, user age range, turn duration, staffing, and player rotation',
        'Indoor or outdoor surface, anchoring, blower position, weather exposure, setup crew, cleaning, transport, and storage',
      ],
      customization: [
        `Target dimensions${isCustom ? ' and project-specific footprint' : ''}, scoring sections, target-face colors, and kicking-line layout`,
        'Hook-and-loop face or compatible target treatment, ball options, logos, sponsor graphics, and custom artwork',
        'Blower package, anchoring, repair kit, carry bag, packing format, and venue or event branding',
      ],
      operationNote: 'A soccer or football dart game should be set up with a marked kicking line, compatible balls, secure anchoring, clear spectator separation, supervised turn-taking, and a routine for checking the target face and inflation.',
      quoteItems: [
        'Venue type, indoor or outdoor surface, available footprint, target height, kicking distance, and expected player capacity',
        'Soccer or football ball format, hook-and-loop target preference, scoring layout, artwork, colors, and accessories',
        'Quantity, destination, target date, rental or event schedule, packing needs, and any custom-size requirements',
      ],
    };
  }
  if (product.category === 'Inflatable Games' && /climb|rock wall|climbing wall|climbing tower/.test(searchable)) {
    const hasSlide = /slide/.test(searchable);
    const isBounce = /bounce|bouncy|castle/.test(searchable);
    const isTower = /tower/.test(searchable);
    const format = hasSlide ? 'climbing-and-slide attraction' : isTower ? 'inflatable climbing tower' : isBounce ? 'bounce house climbing wall' : 'inflatable rock climbing wall';
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: format,
      primaryBuyer: 'family entertainment centers, adventure parks, party rental businesses, resorts, schools, and event operators',
      purpose: hasSlide ? 'It combines a climb-and-slide sequence into one visible attraction for supervised play and commercial entertainment.' : `It gives venues a vertical climbing challenge with a clear route, supervised play zone, and strong visual presence${isTower ? ' for tower-style adventure programming' : ''}.`,
      applications: [
        { title: 'Family entertainment centers', text: 'Create a structured climbing challenge with defined entry, route, exit, supervision, and guest-flow planning.' },
        { title: 'Adventure parks and resorts', text: 'Add a high-visibility rock-wall attraction to seasonal recreation, resort programming, or outdoor activity zones.' },
        { title: 'Party rental and events', text: 'Offer a memorable climbing feature for birthdays, school events, team activities, and supervised temporary installations.' },
      ],
      planningPoints: [
        'Available footprint, total height, route layout, landing zone, access route, and clear supervision area',
        'User age range, climbing difficulty, throughput, queue space, anchoring, blower position, and venue surface',
        'Indoor or outdoor operation, weather exposure, setup crew, storage, cleaning, and local operating requirements',
      ],
      customization: [
        'Wall height, footprint, climbing route, holds, entry and exit, landing zone, and slide or bounce integration',
        'Theme, colors, printed graphics, sponsor logos, characters, and venue branding',
        'Blower package, anchoring, repair kit, carry bag, packing format, and custom dimensions',
      ],
      operationNote: 'A commercial climbing attraction should be matched to the planned user group, route difficulty, landing area, supervision, anchoring, inflation checks, and venue rules.',
      quoteItems: [
        'Venue type, user age range, climbing format, target capacity, and intended indoor or outdoor use',
        'Required footprint, height, route features, slide or bounce options, artwork, and destination-market requirements',
        'Quantity, target date, destination, blower and accessory preferences',
      ],
    };
  }
  if (product.category === 'Inflatable Games' && /airbag|landing ramp|landing/.test(searchable)) {
    const isBmx = /bmx/.test(searchable);
    const isFmx = /fmx|motocross/.test(searchable);
    const isFreestyle = /freestyle/.test(searchable);
    const sport = isFmx ? 'FMX and motocross' : isBmx ? 'BMX and bike' : isFreestyle ? 'freestyle action-sports' : 'bike and action-sports';
    const rampLabel = /ramp/.test(searchable) ? 'inflatable landing ramp' : 'inflatable landing airbag';
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: `${sport} landing airbag and ${rampLabel}`,
      primaryBuyer: 'bike parks, skateparks, action-sports training centers, stunt schools, and event rental operators',
      purpose: `It provides a controlled inflatable landing zone for ${sport} jumps, progression training, and supervised stunt sessions.`,
      applications: [
        { title: 'Action-sports training', text: `Use the airbag to give ${sport} riders a repeatable landing target while coaches review take-off, rotation, and landing technique.` },
        { title: 'Bike parks and skateparks', text: 'Add a managed training feature for progression sessions, demonstrations, camps, and supervised venue programming.' },
        { title: 'Events and rental programs', text: 'Plan a branded landing attraction for demonstrations or temporary activations with clear setup, anchoring, supervision, and storage requirements.' },
      ],
      planningPoints: [
        'Jump height, approach speed, rider level, landing angle, and the required clear zone',
        'Available footprint, setup surface, anchoring, blower position, access route, and spectator separation',
        'Training schedule, supervision, inflation time, deflation and storage routine, and local venue requirements',
      ],
      customization: [
        'Overall landing footprint, ramp interface, air chambers, and impact-zone configuration',
        'Brand colors, printed graphics, sponsor logos, and event or team artwork',
        'Blower package, anchor points, repair kit, carry bag, packing format, and custom dimensions',
      ],
      operationNote: 'A landing airbag must be matched to the jump profile and operated with appropriate supervision, clear zones, anchoring, inflation checks, and rider rules.',
      quoteItems: [
        'Sport and discipline, jump profile, rider level, and intended training or event use',
        'Required landing dimensions, ramp connection, artwork, and destination-market requirements',
        'Quantity, target date, destination, blower and accessory preferences',
      ],
    };
  }
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
  const obstacleCourse = obstacleCourseProfile(product);
  if (obstacleCourse) return [...obstacleCourse.keywords, `${obstacleCourse.keywords[0]} manufacturer`, `custom ${obstacleCourse.keywords[0]}`, `${obstacleCourse.keywords[0]} for rental`, 'YIC Inflatable Sports'].join(', ');
  const advertisingDisplay = advertisingDisplayProfile(product);
  if (advertisingDisplay) {
    const core = advertisingDisplay.keywords[0].replace(/\s+manufacturer$/i, '');
    return [...advertisingDisplay.keywords, `${core} manufacturer`, `custom ${core}`, `${core} for rental`, 'YIC Inflatable Sports'].join(', ');
  }
  const foodService = foodServiceProfile(product);
  if (foodService && !isAirDancerProfile(product)) return [...foodService.keywords, `${foodService.keywords[0]} manufacturer`, `custom ${foodService.keywords[0]}`, `${foodService.keywords[0]} for rental`, 'YIC Inflatable Sports'].join(', ');
  if (isAirDancerProfile(product)) {
    const profile = foodServiceProfiles[product.productSlug];
    return [...profile.keywords, 'inflatable air dancer manufacturer', 'custom inflatable air dancer', 'inflatable air dancer rental', 'YIC Inflatable Sports'].join(', ');
  }
  const waterSlide = waterSlideProfile(product);
  if (waterSlide) return [...waterSlide.keywords, `${waterSlide.keywords[0]} manufacturer`, `custom ${waterSlide.keywords[0]}`, `${waterSlide.keywords[0]} for rental`, 'YIC Inflatable Sports'].join(', ');
  const flyingFish = flyingFishProfile(product);
  if (flyingFish) return [...flyingFish.keywords, `${flyingFish.keywords[0]} manufacturer`, `custom ${flyingFish.keywords[0]}`, `${flyingFish.keywords[0]} for rental`, 'YIC Inflatable Sports'].join(', ');
  const newWaterPark = newWaterParkProfile(product);
  if (newWaterPark) return [...newWaterPark.keywords, `${newWaterPark.keywords[0]} manufacturer`, `custom ${newWaterPark.keywords[0]}`, 'YIC Inflatable Sports'].join(', ');
  const newThemePark = newThemeParkProfile(product);
  if (newThemePark) return [...newThemePark.keywords, `${newThemePark.coreKeyword} manufacturer`, `custom ${newThemePark.coreKeyword}`, `${newThemePark.coreKeyword} for rental`, 'YIC Inflatable Sports'].join(', ');
  const newTent = newInflatableTentProfile(product);
  if (newTent) return [...newTent.keywords, `${newTent.keywords[0]} manufacturer`, `custom ${newTent.keywords[0]}`, 'YIC Inflatable Sports'].join(', ');
  const primaryBuyer = productTargetBuyers(product)[0] || 'commercial buyers';
  if (product.category === 'Bumper Ball') {
    const terms = bumperBallKeywordSet(product);
    const commercialType = /^commercial\b/i.test(content.productType) ? content.productType : `commercial ${content.productType}`;
    return [...new Set([...terms, name, commercialType, primaryBuyer, 'bubble soccer equipment', 'YIC Inflatable Sports'])].filter(Boolean).join(', ');
  }
  const core = [
    name,
    `${name} for ${primaryBuyer}`,
    ...productKeywordVariants(product),
    `${product.category} manufacturer`,
    `commercial ${product.category.toLowerCase()}`,
    ...content.applications.map((item) => item.title),
    primaryBuyer,
    'custom inflatable manufacturer',
    'OEM inflatable',
    'ODM inflatable',
    'YIC Inflatable Sports',
  ];
  return [...new Set(core)].filter((value) => value && !/\b(\w+)\s+\1\b/i.test(value)).join(', ');
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

const relatedKeywordStopWords = new Set([
  'a', 'and', 'an', 'bounce', 'castle', 'combo', 'commercial', 'for', 'house', 'inflatable', 'jumping',
  'rental', 'sale', 'slide', 'the', 'theme', 'with', 'bouncy', 'manufacturer', 'custom', 'water',
]);

function relatedKeywordTokens(product: Product) {
  return new Set(`${product.title} ${product.sourceName} ${productPrimaryKeyword(product)}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter((token) => token.length > 2 && !relatedKeywordStopWords.has(token)));
}

/**
 * Pick same-category products by theme overlap, then rotate stable ties so
 * every detail page does not repeat the category's first four products.
 */
export function productRelatedProducts(product: Product, limit = 4) {
  const candidates = products.filter((item) => item.categorySlug === product.categorySlug && item.slug !== product.slug);
  if (candidates.length <= limit) return candidates;
  const currentTokens = relatedKeywordTokens(product);
  const rotation = cardVariantIndex(product, candidates.length);
  return candidates
    .map((item, index) => {
      const overlap = [...currentTokens].filter((token) => relatedKeywordTokens(item).has(token)).length;
      const rotatedIndex = (index - rotation + candidates.length) % candidates.length;
      return { item, overlap, rotatedIndex };
    })
    .sort((left, right) => right.overlap - left.overlap || left.rotatedIndex - right.rotatedIndex)
    .slice(0, limit)
    .map(({ item }) => item);
}

export function productCardDescription(product: Product) {
  const name = cardNameVariant(product);
  const lowerName = name.replace(/^The /, 'the ');
  const application = productApplication(product);
  const reference = product.dimensions ? `Reference size: ${product.dimensions.trim()}.` : 'Custom dimensions available.';
  const searchable = `${product.title} ${product.sourceName}`.toLowerCase();
  const obstacleCourse = obstacleCourseProfile(product);
  if (obstacleCourse) return `${obstacleCourse.cardSummary} ${reference}`;
  const advertisingDisplay = advertisingDisplayProfile(product);
  if (advertisingDisplay) return `${advertisingDisplay.cardSummary} ${reference}`;
  const foodService = foodServiceProfile(product);
  if (foodService) {
    const label = `${/^commercial\b/i.test(foodService.keywords[0]) ? '' : 'Commercial '}${foodService.keywords[0]}`;
    return `${label.charAt(0).toUpperCase()}${label.slice(1)} for ${foodService.application}. ${reference}`;
  }
  const waterSlide = waterSlideProfile(product);
  if (waterSlide) return `${waterSlide.cardSummary} Reference size: ${product.dimensions.trim()}.`;
  const flyingFish = flyingFishProfile(product);
  if (flyingFish) {
    const use = flyingFish.isTowable
      ? `Commercial ${flyingFish.keywords[0]} for supervised resort, beach, and rental rides`
      : 'Fly-fishing belly boat for guided lake sessions and fishing-gear rental';
    return `${use}. Reference size: ${product.dimensions.trim()}.`;
  }
  if (product.category === 'Bounce House' || product.category === 'Bounce House Combo') {
    const core = bounceHouseCoreKeyword(product);
    const comboProfile = bounceComboSeoProfile(product);
    if (comboProfile) return `${comboProfile.cardSummary} ${reference}`;
    const audience = product.category === 'Bounce House Combo' ? 'party rental fleets and family entertainment centers' : 'party rental businesses, family venues, and community events';
    return `${core} for ${audience}, with the visible theme and play features planned around supervised operation. Compare the reference size, artwork, access, anchoring, accessories, and OEM options before requesting a factory quotation. ${reference}`;
  }
  const interactiveProfile = interactiveGameProfile(product);
  if (interactiveProfile) {
    return `Commercial ${interactiveProfile.keywords[0]} with ${interactiveProfile.visibleLayout}. Plan ${interactiveProfile.keywords[1]}, game rules, OEM graphics, and supervised event use. ${reference}`;
  }
  if (product.category === 'Bumper Ball') {
    const terms = bumperBallKeywordSet(product);
    if (product.productSlug === 'inflatable-bumper-balls-commercial') {
      return `Commercial inflatable bumper balls in a 1.25 m TPU youth-set format for schools, supervised group activities, and party-rental programs. Compare inflatable bumper balls for sale, team colors, logos, accessories, and packing before requesting a factory quotation. ${reference}`;
    }
    const audience = /kid|kids|child/.test(searchable) || /1\.25m/.test(product.dimensions)
      ? 'youth group activities, schools, and supervised party rentals'
      : /zorb/.test(searchable)
        ? 'zorb-style recreation, team events, and sports operators'
        : 'adult bubble-soccer programs, events, and commercial rental fleets';
    const item = terms[0] || 'inflatable bumper ball';
    return `${/^commercial\b/i.test(item) ? '' : 'Commercial '}TPU ${item} for ${audience}. Explore ${terms[1] || 'custom team colors'} and ${terms[2] || 'OEM logo options'} in the product specification. ${reference}`;
  }
  if (product.category === 'Inflatable Games' && ringTossKeywordSet(product).length) {
    const terms = ringTossKeywordSet(product);
    return `Commercial ${terms[0]} with multi-height numbered targets and soft throwing rings for carnivals, school programs, rentals, and branded events. Specify the ${terms[1]}, ${terms[2]}, scoring layout, and OEM graphics for your event program. ${reference}`;
  }
  if (product.category === 'Inflatable Games' && battingCageKeywordSet(product).length) {
    const profile = battingCageProfile(product)!;
    return `A ${profile.productType} for ${profile.trainingUse}. The listed format shows ${profile.visibleLayout}; confirm ${profile.planningFocus} before production. ${reference}`;
  }
  if (product.category === 'Inflatable Games' && halloweenMazeKeywordSet(product).length) return `A made-to-order Halloween maze inflatable for haunted attractions, seasonal events, FECs, and festivals, with a custom route, themed artwork, and venue-specific visitor flow. ${reference}`;
  if (product.category === 'Inflatable Games' && hungryHippoKeywordSet(product).length) return `An 8 m human-scale Hungry Hippo party game for supervised team play, rental events, schools, and FEC programs. Confirm the play mechanism and included accessories in the product specification. ${reference}`;
  if (product.category === 'Inflatable Games' && airHockeyKeywordSet(product).length) return `A commercial inflatable air hockey game for supervised head-to-head play at rental events, FECs, schools, and branded activations. ${reference}`;
  if (product.category === 'Inflatable Games' && connectFourBasketballKeywordSet(product).length) return `A basketball Connect Four target game for supervised shooting contests, team rotation, school activities, rentals, and branded events. ${reference}`;
  if (waterWalkingBallKeywordSet(product).length) {
    return `Transparent 2 m TPU water-walking ball for supervised pool, resort, and event sessions. Confirm venue procedures before use.`;
  }
  const newWaterPark = newWaterParkProfile(product);
  if (newWaterPark?.cardSummary) return `${newWaterPark.cardSummary} ${reference}`;
  const newThemePark = newThemeParkProfile(product);
  if (newThemePark) return `${newThemePark.cardSummary} ${reference}`;
  if (product.category === 'Inflatable Games' && axeThrowingKeywordSet(product).length) {
    const targetCount = /dual target/.test(searchable) ? 'Dual-target' : 'Custom inflatable';
    return `${targetCount} axe-throwing game planned around soft-play projectile compatibility, a clear throwing line, supervised turns, and branded target artwork. ${reference}`;
  }
  if (product.category === 'Inflatable Games' && soccerFieldKeywordSet(product).length) {
    if (/human foosball/.test(searchable)) return `A human-scale foosball match format with fixed player lanes for team-building, school events, and rental programs. ${reference}`;
    if (/soap/.test(searchable)) return `A bounded soap-football play area for supervised wet-play events, planned around water supply, drainage, surface, and operator flow. ${reference}`;
    if (/slip and slide/.test(searchable)) return `A wet-play soccer field that combines match activity with a slip-and-slide surface for seasonal events and rental packages. ${reference}`;
    if (/water soccer/.test(searchable)) return `A water-based soccer field with perimeter boundaries and goals, subject to site-depth, anchoring, and supervision review. ${reference}`;
    if (/arena/.test(searchable)) return `A contained small-sided soccer arena with goals and visible play boundaries for events, schools, and recreation venues. ${reference}`;
    if (/(?:large|giant) inflatable soccer field/.test(searchable) && !/custom dimensions available/.test(product.dimensions)) return `A large-format soccer field boundary for organized matches and sports events. ${reference}`;
    if (/custom dimensions available/.test(product.dimensions)) return `A made-to-order inflatable soccer field developed around your venue plan, match format, access, colors, and branding. ${reference}`;
    return `A portable inflatable soccer pitch with a defined perimeter for clubs, school programs, events, and commercial rental packages. ${reference}`;
  }
  if (product.category === 'Inflatable Games' && isNewBilliardsProduct(product) && /billiard|pool table|snooker/.test(searchable)) {
    const reference = product.dimensions ? `Reference size: ${product.dimensions.trim()}.` : 'Custom dimensions available.';
    if (/human billiards|soccer billiards/.test(searchable)) return `Human-scale soccer billiards turns a familiar table game into an active group challenge for FECs, event rentals, sports bars, and resorts. ${reference}`;
    if (/尺寸定制|custom dimensions available/.test(searchable)) return `A made-to-order inflatable billiards layout planned around your floor plan, game format, colors, and event branding. ${reference}`;
    return `A 4 x 7 x 1.25 m inflatable billiards pool-table game with raised perimeter walls for supervised events, rental packages, and venue play. ${reference}`;
  }
  if (product.category === 'Inflatable Games' && /airbag|landing ramp|landing/.test(searchable)) {
    const sport = /fmx|motocross/.test(searchable) ? 'FMX and motocross' : /bmx/.test(searchable) ? 'BMX and bike' : /freestyle/.test(searchable) ? 'freestyle action-sports' : 'bike training';
    const feature = /ramp/.test(searchable) ? 'inflatable landing ramp' : 'airbag landing zone';
    return `${name} provides a ${feature} for ${sport} training, bike parks, and supervised stunt events. ${reference}`;
  }
  if (product.category === 'Inflatable Games' && battingCageKeywordSet(product).length) {
    return `${material} · ${battingCageProfile(product)?.productType ?? 'Enclosed batting tunnel'} · Training and event use`;
  }
  if (product.category === 'Inflatable Games' && /climb|rock wall|climbing wall|climbing tower/.test(searchable)) {
    const feature = /slide/.test(searchable) ? 'climbing and slide play' : /bounce|bouncy|castle/.test(searchable) ? 'bounce-house climbing play' : 'vertical rock-wall challenge';
    return `${name} creates ${feature} for family entertainment centers, adventure parks, resorts, and supervised rental events. ${reference}`;
  }
  if (product.category === 'Inflatable Games' && /foam|bubble/.test(searchable)) {
    const feature = /bubble/.test(searchable) ? 'bubble-foam play' : 'foam-party play';
    return `${name} creates a contained ${feature} attraction for party rental packages, FEC activity zones, resorts, and supervised events. ${reference}`;
  }
  if (product.category === 'Inflatable Games' && /volleyball/.test(searchable)) {
    const feature = /field/.test(searchable)
      ? 'a portable court boundary for team play and sports events'
      : /water|pool/.test(searchable)
        ? 'a buoyant pool or water-volleyball play zone for resorts and seasonal events'
        : 'a commercial court layout for tournaments, team activities, and rental programs';
    return `${name} creates ${feature} with planned net, player, and spectator zones. ${reference}`;
  }
  if (product.category === 'Inflatable Games' && /bungee run/.test(searchable)) {
    const feature = /2 lane/.test(searchable)
      ? 'a two-lane head-to-head bungee race format for FECs, rentals, and team events'
      : 'a competitive bungee fun-run layout for parties, schools, camps, and event programs';
    return `${name} creates ${feature} with defined start, finish, lane, and spectator zones. ${reference}`;
  }
  if (product.category === 'Inflatable Games' && /boxing ring|boxing area|boxing arena|fighting ring/.test(searchable)) {
    const feature = /arena|area|fighting/.test(searchable)
      ? 'a supervised boxing arena for sports events, team challenges, and brand activations'
      : /for sale/.test(searchable)
        ? 'a commercial boxing ring for purchase, repeat rentals, and promotional events'
        : 'a rental-ready boxing ring for FECs, party packages, and supervised sports activities';
    return `${name} creates ${feature} with planned ropes, corners, participant, and spectator zones. ${reference}`;
  }
  if (product.category === 'Inflatable Games' && /soccer dart|football dart|football darts|soccer darts|velcro soccer/.test(searchable)) {
    const sport = /football/.test(searchable) ? 'football' : 'soccer';
    const feature = /velcro/.test(searchable)
      ? `a hook-and-loop target challenge for ${sport} balls`
      : `a large numbered dartboard target for ${sport}-ball kicking games`;
    return `${name} creates ${feature} for party rentals, FECs, schools, sports events, and brand activations, with a defined kicking line and player rotation. ${reference}`;
  }
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
  const searchable = `${product.title} ${product.sourceName}`.toLowerCase();
  const obstacleCourse = obstacleCourseProfile(product);
  if (obstacleCourse) return `${material} · ${obstacleCourse.keywords[0]} · Custom artwork`;
  const advertisingDisplay = advertisingDisplayProfile(product);
  if (advertisingDisplay) return `${material} · ${advertisingDisplay.kind === 'tunnel' ? 'Team entrance tunnel' : 'Custom event mascot'} · OEM artwork`;
  const foodService = foodServiceProfile(product);
  if (foodService) return `${material} · ${foodService.keywords[0]} · Custom branding`;
  const interactiveProfile = interactiveGameProfile(product);
  if (interactiveProfile) return `${material} · ${interactiveProfile.productType} · Event and rental use`;
  if (product.category === 'Bumper Ball') {
    const format = /zorb/.test(searchable)
      ? 'Zorb activity format'
      : /kid|kids|child/.test(searchable) || /1\.25m/.test(product.dimensions)
        ? 'Youth group-play format'
        : 'Adult bubble-soccer format';
    return `${material} · ${format} · Custom colors & logos`;
  }
  if (product.category === 'Inflatable Games' && ringTossKeywordSet(product).length) {
    return `${material} · Numbered target toss game · Carnival and event use`;
  }
  if (product.category === 'Inflatable Games' && /airbag|landing ramp|landing/.test(searchable)) {
    return `${material} · ${/ramp/.test(searchable) ? 'Landing ramp interface' : 'Impact-zone airbag'} · Custom sports use`;
  }
  if (product.category === 'Inflatable Games' && /climb|rock wall|climbing wall|climbing tower/.test(searchable)) {
    return `${material} · ${/slide/.test(searchable) ? 'Climb + slide layout' : 'Climbing route attraction'} · Custom venue use`;
  }
  if (product.category === 'Inflatable Games' && /foam|bubble/.test(searchable)) {
    return `${material} · ${/bubble/.test(searchable) ? 'Bubble foam play' : 'Foam party layout'} · Event and rental use`;
  }
  if (product.category === 'Inflatable Games' && /volleyball/.test(searchable)) {
    const label = /field/.test(searchable)
      ? 'Outdoor court layout · Team and event use'
      : /water|pool/.test(searchable)
        ? 'Water volleyball format · Pool and resort use'
        : 'Court and net planning · Sports and rental use';
    return `${material} · ${label}`;
  }
  if (product.category === 'Inflatable Games' && /bungee run/.test(searchable)) {
    const label = /2 lane/.test(searchable)
      ? 'Two-lane race format · FEC and rental use'
      : 'Bungee fun-run format · Event and team use';
    return `${material} · ${label}`;
  }
  if (product.category === 'Inflatable Games' && /boxing ring|boxing area|boxing arena|fighting ring/.test(searchable)) {
    const label = /arena|area|fighting/.test(searchable)
      ? 'Boxing arena layout · Event and sports use'
      : /for sale/.test(searchable)
        ? 'Commercial ring format · Purchase and rental use'
        : 'Rental-ready ring · Boxing and FEC use';
    return `${material} · ${label}`;
  }
  if (product.category === 'Inflatable Games' && /soccer dart|football dart|football darts|soccer darts|velcro soccer/.test(searchable)) {
    const label = /velcro/.test(searchable)
      ? 'Hook-and-loop target · Soccer and football play'
      : 'Numbered dartboard target · Kicking game format';
    return `${material} · ${label}`;
  }
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
  const searchable = `${product.title} ${product.sourceName}`.toLowerCase();
  const isBounceCategory = product.category === 'Bounce House' || product.category === 'Bounce House Combo';
  const bounceCore = isBounceCategory ? bounceHouseCoreKeyword(product) : '';
  const comboProfile = bounceComboSeoProfile(product);
  if (comboProfile) {
    const [q1, q2, q3, q4, q5, q6] = comboProfile.faqQuestions;
    const ballPitNote = product.productSlug === 'white-bounce-house-with-double-slide'
      ? ' The supplied reference image visibly shows a central climb and two side slides; it does not independently verify a ball pit. If a ball pit is required, request it as a confirmed option in the approved specification.'
      : product.productSlug === 'blue-bounce-house-with-ball-pit-for-sale'
        ? ' The image shows a shallow front extension, but no loose play balls are visible; confirm whether balls and a defined ball-pit insert are included in the quoted package.'
        : '';
    const indoorUseNote = product.productSlug === 'blue-bounce-house-with-ball-pit-for-sale'
      ? ' For indoor installation, verify the measured ceiling height, full footprint and clearances, access route, anchoring method, blower/power requirements, supervision plan, and venue rules before purchase.'
      : '';
    const rightsNote = /minion|hulk/.test(product.productSlug)
      ? ' The themed imagery is reference styling only; this listing does not claim official affiliation, authorization, or a license. Buyers must confirm artwork rights and the approved production artwork before ordering.'
      : '';
    return [
      { question: q1, answer: `${comboProfile.purpose} The supplied imagery shows ${comboProfile.visual}. Related buyer searches include ${comboProfile.keywords.slice(1).join(', ')}. Confirm the approved feature and accessory scope before production.${ballPitNote}` },
      { question: q2, answer: `${/custom dimensions available/i.test(product.dimensions) ? 'Custom dimensions are available.' : `Start with the listed ${product.dimensions.trim()} reference.`} Reserve practical clearance for entry, exit, blower space, anchoring, supervision, queueing, spectators, and safe run-off. Confirm the final layout from the actual site plan.${indoorUseNote}` },
      { question: q3, answer: product.productSlug === 'blue-bounce-house-with-ball-pit-for-sale'
        ? 'The supplied image shows a shallow front extension, but does not show loose play balls or confirm a ball-pit insert. Ask YIC to list the pit configuration and whether balls are included in the written quotation and approved specification.'
        : `Yes. YIC can review colors, theme treatment, printed artwork, logo panels, dimensions, bounce area, slide layout, access points, accessories, and packing. Send artwork, target footprint, quantity, destination, and delivery timing for a project-specific proposal.${rightsNote}` },
      { question: q4, answer: product.productSlug === 'blue-bounce-house-with-ball-pit-for-sale'
        ? `Use the listed ${product.dimensions.trim()} reference, then measure the clear floor area, ceiling height, doorways and access route, entry and exit clearance, blower position, and anchoring options. Confirm the venue plan and local operating requirements before ordering.`
        : `The catalog lists ${product.material}${product.dimensions ? ` and ${product.dimensions.trim()}` : ''}. Confirm the final PVC grade, reinforcement, seams, netting, slide surface, blower interface, anchors, repair kit, and included accessories in the approved order specification.` },
      { question: q5, answer: product.productSlug === 'blue-bounce-house-with-ball-pit-for-sale'
        ? 'YIC can review blue color variations, printed artwork, logo panels, overall dimensions, the side-slide layout, and the front play-zone configuration. Specify whether a ball pit insert and play balls are required, then confirm those items in the written quotation.'
        : `${content.operationNote} Include pre-use inflation, anchoring, seam and netting checks, blower and cable checks, entry and exit control, participant rules, weather monitoring, cleaning, drying, repair-kit access, transport, and dry storage in the operating routine.${rightsNote}` },
      { question: q6, answer: `Send the intended use (${comboProfile.application}), site plan, participant group, required footprint, artwork and rights confirmation where applicable, preferred colors, feature changes, quantity, destination, packing needs, and target delivery date. The factory quotation can then confirm the final ${comboProfile.keywords[0]} configuration.${ballPitNote}` },
    ];
  }
  const obstacleCourse = obstacleCourseProfile(product);
  if (obstacleCourse) {
    const terms = obstacleCourse.keywords;
    const questions = obstacleCourse.faqQuestions;
    return [
      { question: questions[0], answer: `${obstacleCourse.purpose} The reference imagery shows ${obstacleCourse.visual}. Related buyer searches include ${terms.slice(1).join(', ')}; confirm the approved obstacle, slide, artwork, and accessory scope in the production specification.` },
      { question: questions[1], answer: `${/custom dimensions available/i.test(product.dimensions) ? 'Custom dimensions are available.' : `Start with the listed ${product.dimensions.trim()} reference.`} Reserve practical clearance for the entrance, exit, queue, blower, anchoring, staff position, spectator separation, and safe run-off. Confirm the final layout from the actual site plan.` },
      { question: questions[2], answer: `Yes. YIC can review ${obstacleCourse.customization}. Send reference artwork, colors, logo files, target footprint, participant group, venue conditions, quantity, destination, and delivery timing for a project-specific proposal.` },
      { question: questions[3], answer: `The catalog lists ${product.material}${product.dimensions ? ` and ${product.dimensions.trim()}` : ''}. Confirm the final PVC grade, reinforcement, seams, slide surface, netting, blower interface, anchoring, accessories, and included equipment in the approved order specification.` },
      { question: questions[4], answer: `${content.operationNote} Include pre-use inflation, anchoring, seams, blower and cable checks, entry and exit control, participant rules, weather monitoring, cleaning, drying, repair-kit access, transport, and dry storage in the operating routine.` },
      { question: questions[5], answer: `Send the intended use (${obstacleCourse.application}), venue or site plan, target participant group, dimensions, artwork and branding files, obstacle and slide preferences, quantity, destination, packing needs, and requested delivery date. The factory quotation can then confirm the final ${terms[0]} configuration.` },
    ];
  }
  const advertisingDisplay = advertisingDisplayProfile(product);
  if (advertisingDisplay) {
    const terms = advertisingDisplay.keywords;
    const questions = advertisingDisplay.faqQuestions;
    const isTunnel = advertisingDisplay.kind === 'tunnel';
    return [
      { question: questions[0], answer: `${advertisingDisplay.purpose} The reference imagery shows ${advertisingDisplay.visual}. Related buyer searches include ${terms.slice(1).join(', ')}; confirm the approved artwork, accessories, and final operating scope in the production specification.` },
      { question: questions[1], answer: `${/custom dimensions available/i.test(product.dimensions) ? 'Custom dimensions are available.' : `Start with the listed ${product.dimensions.trim()} reference.`} Reserve practical clearance for ${isTunnel ? 'the entry and exit route, athletes, spectators, blower, anchoring, and emergency access' : 'viewing, visitor photos, the blower, anchoring, staff access, and visitor separation'}. Confirm the final layout from the actual site plan.` },
      { question: questions[2], answer: `Yes. YIC can review ${advertisingDisplay.options}. Send reference artwork, preferred colors, logo files, target height or footprint, venue conditions, quantity, destination, and delivery timing for a project-specific proposal.` },
      { question: questions[3], answer: `The catalog lists ${product.material}${product.dimensions ? ` and ${product.dimensions.trim()}` : ''}. Confirm the final fabric grade, seams, printed graphics, base treatment, blower interface, accessories, and included equipment in the approved order specification.` },
      { question: questions[4], answer: `${content.operationNote} Include pre-use inflation, anchoring, seams, blower and cable checks, ${isTunnel ? 'entry-route and spectator-flow checks, ' : 'access and photo-zone checks, '}weather monitoring, cleaning, drying, repair-kit access, transport, and dry storage in the operating routine.` },
      { question: questions[5], answer: `Send the intended use (${advertisingDisplay.application}), venue or site plan, target dimensions, artwork and branding files, anchoring requirements, accessories, quantity, destination, packing needs, and requested delivery date. The factory quotation can then confirm the final ${terms[0]} configuration.` },
    ];
  }
  const foodService = foodServiceProfile(product);
  if (isAirDancerProfile(product)) {
    const profile = foodServiceProfiles[product.productSlug];
    const questions = profile.faqQuestions;
    return [
      { question: questions[0], answer: profile.purpose + ' The reference imagery shows ' + profile.visual + '. Related buyer searches include ' + profile.keywords.slice(1).join(', ') + '; confirm the approved blower, artwork, and accessory scope in the final specification.' },
      { question: questions[1], answer: 'Start with the listed ' + product.dimensions.trim() + ' reference height, then allow clearance for the base, blower, electrical cable protection, viewing direction, access route, secure positioning, and visitor separation. Confirm the final arrangement from the actual site plan.' },
      { question: questions[2], answer: 'The catalog lists ' + product.material + '. Confirm the final fabric weight, stitching, printed artwork, base connection, compatible blower, repair material, and included accessories in the approved order specification.' },
      { question: questions[3], answer: 'Yes. YIC can review ' + profile.options + '. Send the target height, character concept, logo files, preferred colors, intended display site, quantity, destination, and delivery timing for a project-specific proposal.' },
      { question: questions[4], answer: content.operationNote + ' Include pre-use inflation, base and cable checks, secure positioning, fabric and seam inspection, weather monitoring, supervised operation, cleaning, drying, repair-kit access, transport, and dry storage in the repeat-event routine.' },
      { question: questions[5], answer: 'Send the intended use (' + profile.application + '), installation location, target height, artwork, blower and electrical requirements, site exposure, quantity, destination, packing needs, and required delivery date. The factory quotation can then confirm the final ' + profile.keywords[0] + ' configuration.' },
    ];
  }
  if (foodService) {
    const terms = foodService.keywords;
    const questions = foodService.faqQuestions;
    return [
      { question: questions[0], answer: `${foodService.purpose} The reference imagery shows ${foodService.visual}. Related buyer searches include ${terms.slice(1).join(', ')}; confirm the final service or display scope in the approved production specification.` },
      { question: questions[1], answer: `Start with the listed ${product.dimensions.trim()} reference, then reserve additional room for the service side, customer queue, staff position, entrance and exit, blower, anchoring, packing, and a separated visitor area. Confirm the final layout from the actual venue plan.` },
      { question: questions[2], answer: `It can be planned as a branded event frontage, sampling point, display counter, registration point, merchandise station, or other approved use. The image alone does not confirm food-preparation equipment, utilities, food-safety compliance, or included accessories; these must be defined in the final specification.` },
      { question: questions[3], answer: `Yes. YIC can review ${foodService.options}. Send the reference artwork, preferred colors, logo files, service-window requirements, target footprint, quantity, destination, and delivery timing for a project-specific proposal.` },
      { question: questions[4], answer: `${content.operationNote} Include pre-use inflation, anchoring, seams, access, counter and accessory checks, supervised guest flow, cleaning, drying, repair-kit access, transport, and dry storage in the repeat-event routine.` },
      { question: questions[5], answer: `Send the intended use (${foodService.application}), site plan, target dimensions, service or display layout, branding files, equipment-interface requirements, quantity, destination, packing needs, and required delivery date. The factory quotation can then confirm the final ${terms[0]} configuration.` },
    ];
  }
  const waterSlide = waterSlideProfile(product);
  if (waterSlide) {
    const terms = waterSlide.keywords;
    const isWetSlide = waterSlide.wetUse !== false;
    const questions = waterSlide.faqQuestions ?? [
      `What is this ${terms[0]} designed for?`,
      `How should buyers plan the ${product.dimensions.trim()} reference footprint?`,
      `Which material is listed for this ${terms[0]}?`,
      `Can the theme, layout, and branding for this ${terms[1] ?? terms[0]} be customized?`,
      `What wet-use, drainage, and supervision checks should be prepared?`,
      `What information is needed for a ${terms[0]} factory quotation?`,
    ];
    return [
      { question: questions[0], answer: `${waterSlide.purpose} Related buying searches for this image-led configuration include ${terms.slice(1).join(', ')}. The approved specification should confirm the exact slide, pool, and accessory scope.` },
      { question: questions[1], answer: `Start with the listed ${product.dimensions.trim()} reference, then allow practical clearance for the entry, exit, queue, ${isWetSlide ? 'landing or pool area, blower, anchoring, water supply, drainage' : 'slide run-out, blower, anchoring, access route'}, operator position, and spectator separation. Confirm the final layout from the actual site plan.` },
      { question: questions[2], answer: `The catalog lists ${product.material}. Confirm the final PVC grade, thickness, reinforcement, seams, slide surface, valves, water connection, accessories, and included equipment in the approved production specification.` },
      { question: questions[3], answer: `Yes. YIC can review ${waterSlide.customizationFocus}. Send reference artwork, preferred colors, logo files, site footprint, water and drainage plan, quantity, and destination for a project-specific proposal.` },
      { question: questions[4], answer: `${content.operationNote} Staff should include pre-use inflation, anchoring, seams, surface, access, ${isWetSlide ? 'water-flow, landing or pool, ' : ''}supervision, cleaning, drying, repair-kit access, and storage in the operating routine.` },
      { question: questions[5], answer: `Share the venue type, intended use (${waterSlide.application}), site plan, target dimensions, lane and landing preference, ${isWetSlide ? 'water supply and drainage details, ' : ''}branding, quantity, destination, packing needs, and delivery date. The factory quotation can then confirm the final ${terms[0]} configuration.` },
    ];
  }
  const flyingFish = flyingFishProfile(product);
  if (flyingFish) {
    const terms = flyingFish.keywords;
    const customSize = /custom dimensions available/i.test(product.dimensions);
    const siteChecks = flyingFish.isTowable
      ? 'Confirm the tow boat, tow lane, water depth and conditions, launch and recovery access, queue, spectator separation, and rescue route in the site plan.'
      : 'Confirm the shoreline or launch point, controlled fishing area, water conditions, participant access, safety support, and rescue route in the site plan.';
    const operatingChecks = flyingFish.isTowable
      ? 'Staff should check inflation, tow hardware, handles, seams, valves, rider positions, water conditions, participant briefing, and continuous supervision before and during each session.'
      : 'Staff should check inflation, pontoons, seat and backrest attachment, grab lines, seams, valves, water conditions, participant briefing, and continuous supervision before and during each session.';
    const quoteContext = flyingFish.isTowable
      ? 'tow boat, water area, rider capacity, operating plan'
      : 'water access plan, target user group, intended fishing equipment, operating plan';
    return [
      { question: flyingFish.faqQuestions[0], answer: `${flyingFish.purpose} The image-based classification is ${terms[0]}, not a generic fishing boat unless the approved specification says otherwise.` },
      { question: flyingFish.faqQuestions[1], answer: `${customSize ? 'Custom dimensions are available.' : `Start with the listed ${product.dimensions.trim()} reference.`} ${siteChecks}` },
      { question: flyingFish.faqQuestions[2], answer: `The catalog lists ${product.material}${product.dimensions ? ` and ${product.dimensions.trim()}` : ''}. Confirm the exact PVC grade, thickness, seams, valves, reinforcement, and included accessories in the approved order specification.` },
      { question: flyingFish.faqQuestions[3], answer: `Yes. YIC can review ${flyingFish.customizationFocus}. Send the ${flyingFish.isTowable ? 'target rider count' : 'target user and equipment requirements'}, reference artwork, preferred colors, logo files, water-site plan, quantity, and destination for a project-specific proposal.` },
      { question: flyingFish.faqQuestions[4], answer: `${content.operationNote} ${operatingChecks}` },
      { question: flyingFish.faqQuestions[5], answer: `This model is positioned around ${terms.join(', ')}. Share the venue type, ${quoteContext}, dimensions, branding, quantity, destination, packing needs, and delivery date for a factory quotation.` },
    ];
  }
  const newWaterPark = newWaterParkProfile(product);
  if (newWaterPark) {
    const customDimensions = /custom dimensions available/i.test(product.dimensions);
    return [
      { question: newWaterPark.faqQuestions[0], answer: `The reference imagery shows ${newWaterPark.visual}. Related buying searches for this configuration include ${newWaterPark.keywords.slice(1).join(', ')}. The quoted scope should confirm the exact included sections, accessories, and final configuration.` },
      { question: newWaterPark.faqQuestions[1], answer: `${customDimensions ? 'Custom dimensions are available.' : `The listed reference size is ${product.dimensions.trim()}.`} Confirm the total footprint, clear area around the pool, access route, water depth, and installation surface in the site drawing.` },
      { question: newWaterPark.faqQuestions[2], answer: `The current catalog lists ${product.material}. Confirm fabric grade, thickness, reinforcement, seams, and component details in the approved production specification before ordering.` },
      { question: newWaterPark.faqQuestions[3], answer: `YIC can review ${newWaterPark.options}. Send reference artwork, preferred colors, logo files, target footprint, and quantity for a project-specific proposal.` },
      { question: newWaterPark.faqQuestions[4], answer: `Provide water depth and conditions, usable area, entry and exit access, anchoring points, power and inflation equipment, participant group, supervision and rescue plan, weather exposure, event duration, and local venue requirements. Final operation must follow the approved specification and site procedures.` },
      { question: newWaterPark.faqQuestions[5], answer: `Share the intended use (${newWaterPark.application}), site plan, water area and depth, target dimensions, chosen options, branding files, quantity, destination, packing needs, and delivery date. The final quotation can then confirm the product configuration, accessories, and project terms.` },
    ];
  }
  const newThemePark = newThemeParkProfile(product);
  if (newThemePark) {
    const customDimensions = /custom dimensions available/i.test(product.dimensions);
    return [
      { question: newThemePark.faqQuestions[0], answer: `The reference imagery shows ${newThemePark.visual}. It is positioned as a ${newThemePark.coreKeyword}, with supporting buyer searches such as ${newThemePark.keywords.slice(1).join(', ')}. Confirm the final feature list in the approved specification.` },
      { question: newThemePark.faqQuestions[1], answer: `${customDimensions ? 'Custom dimensions are available.' : `Start with the listed ${product.dimensions.trim()} reference footprint.`} Also plan height clearance, entry and exit, blower space, anchoring, queue, operator position, and a separate spectator area from the actual venue drawing.` },
      { question: newThemePark.faqQuestions[2], answer: `The catalog lists ${product.material}. Confirm the exact PVC grade, reinforcement, seams, valves, printed artwork, accessories, and included equipment in the final production specification.` },
      { question: newThemePark.faqQuestions[3], answer: `Yes. YIC can review ${newThemePark.options}. Send reference artwork, preferred colors, logo files, target footprint, user group, quantity, destination, and delivery timing for a project-specific proposal.` },
      { question: newThemePark.faqQuestions[4], answer: `${content.operationNote} The venue should also document pre-use inspection, access control, age-appropriate participation, cleaning, drying, repair-kit access, storage, and local operating procedures.` },
      { question: newThemePark.faqQuestions[5], answer: `Share the intended use (${newThemePark.application}), site plan, target dimensions, preferred features, theme reference, branding, quantity, destination, packing, installation needs, and required delivery date. The factory quotation can then confirm the final ${newThemePark.coreKeyword} configuration.` },
    ];
  }
  const newTent = newInflatableTentProfile(product);
  if (newTent) {
    return [
      { question: `What is the ${newTent.keywords[0]} designed for?`, answer: `${newTent.purpose} Typical project contexts include ${newTent.use}; final occupancy and operating scope should be matched to the venue.` },
      { question: `What dimensions are listed for this ${newTent.keywords[0]}?`, answer: `The current reference is ${product.dimensions.trim()}. Confirm the required footprint, height clearance, access route, and usable interior area against the installation plan before production.` },
      { question: `Which material is specified for this model?`, answer: `The listing specifies ${product.material}. Confirm the final fabric or PVC grade, reinforcement, seams, and components on the approved production specification; do not infer unlisted certifications.` },
      { question: `Can the layout and branding be customized?`, answer: `Yes. The project can be reviewed for ${newTent.options}. Send reference artwork, logo files, venue drawings, quantity, and required delivery timing for a tailored quotation.` },
      { question: `What site and setup details should I prepare?`, answer: `Share the installation surface, indoor or outdoor setting, access and exit direction, blower or power location, anchoring method, weather exposure, event duration, and local venue requirements. Final setup must follow the approved instructions.` },
      { question: `What information is needed for a factory quote?`, answer: `Provide the intended use (${newTent.use}), target dimensions, material preference, artwork, options, quantity, destination country, packing or installation needs, and target delivery date. YIC can then review the project specification and quotation.` },
    ];
  }
  const interactiveProfile = interactiveGameProfile(product);
  const bubbleTent = bubbleTentProfile(product);
  const campingTent = campingTentProfile(product);
  const nightclubTent = nightclubTentProfile(product);
  const weddingTent = weddingTentProfile(product);
  if (interactiveProfile) {
    const terms = interactiveProfile.keywords;
    const customSize = /custom dimensions available/i.test(product.dimensions);
    return [
      { question: `What is this ${terms[0]} designed for?`, answer: `${content.purpose} It should be operated as a managed activity station, with game rules, participant flow, and staffing matched to the venue.` },
      { question: customSize ? `Which measurements should I provide for a custom ${interactiveProfile.productType}?` : `How much space should I allow for the ${product.dimensions.trim()} game?`, answer: `${customSize ? 'Provide the usable length, width, height clearance, access route, player approach, queue zone, operator position, blower location, anchoring surface, and spectator buffer.' : `Start with the listed ${product.dimensions.trim()} footprint, then add space for the player approach, entry and exit, blower, anchoring, queue, operator, and a separated spectator area.`} Confirm the final layout from a venue plan before production.` },
      { question: `How should I specify the ${terms[1]} game format?`, answer: `${interactiveProfile.gameMechanic} Confirm the compatible ball, soft-play piece, target, vehicle, or other accessory; player age range; turn duration; scoring or prize rules; capacity; and staff position in the approved specification.` },
      { question: `Can the ${terms[2]} be customized for a commercial event?`, answer: `Yes. YIC can review ${interactiveProfile.customizationFocus}, overall dimensions, colors, printed logos, sponsor graphics, player instructions, accessory package, and export packing for the event or rental program.` },
      { question: `What operational checks matter for a ${terms[3]}?`, answer: `${content.operationNote} Include pre-use inflation, anchor and accessory checks, supervised turns, cleaning, drying, repair-kit access, transport, and dry storage in the repeat-use routine.` },
      { question: `What should I include in a ${terms[0]} quotation request?`, answer: `Send the venue type, site plan, target footprint, game mechanism and accessory preference, participant age range, expected throughput, branding files, quantity, destination, target delivery date, and blower, anchoring, packing, or storage requirements.` },
    ];
  }
  if (bubbleTent) {
    const terms = bubbleTent.keywords;
    const customSize = /custom dimensions available/i.test(product.dimensions);
    return [
      { question: `What is this ${terms[0]} designed for?`, answer: `${content.purpose} It is intended as a managed temporary enclosure for the planned event, display, or hospitality use rather than an unattended structure.` },
      { question: customSize ? `Which measurements should I provide for a custom ${bubbleTent.productType}?` : `How much site clearance should I allow for this ${bubbleTent.productType}?`, answer: `${customSize ? 'Provide usable length, width, height clearance, access route, entrance direction, blower location, anchoring surface, and the guest or display area.' : `Start with ${product.dimensions.trim()} as the reference and add room for the entrance, blower, anchoring, access, guest circulation, and packing area.`} Confirm the final layout from the venue plan before production.` },
      { question: `Can the ${terms[1]} be customized for an event or brand activation?`, answer: `Yes. YIC can review ${bubbleTent.customizationFocus}, commercial colors, printed logos, lighting interfaces, interior decor, event graphics, blower package, anchoring, and export packing.` },
      { question: `How should I plan ventilation and guest flow when using the ${terms[2]}?`, answer: `Plan the entry and exit, accessible circulation, blower and power route, ventilation arrangement, interior use, event staffing, expected occupancy, and any venue requirements. The operator must set capacity and operating procedures for the actual site.` },
      { question: `Can this ${terms[3]} be installed outdoors?`, answer: `Outdoor installation depends on the approved structure, site surface, anchoring method, power, wind and weather plan, supervision, and local venue requirements. Confirm these conditions before ordering; do not assume weather performance beyond the approved specification.` },
      { question: `What should I include in a quotation request for this ${terms[0]}?`, answer: `Send the venue type, site plan, indoor or outdoor setting, target footprint, height clearance, intended display or guest use, entrance and decor requirements, branding files, quantity, destination, target delivery date, and blower, anchoring, packing, and storage needs.` },
    ];
  }
  if (campingTent) {
    const terms = campingTent.keywords;
    return [
      { question: `What is this ${terms[0]} designed for?`, answer: `${content.purpose} It is intended for a managed campsite, glamping, rental, or outdoor-hospitality installation rather than an unattended structure.` },
      { question: `How much clearance should I plan for this 6 m ${campingTent.productType}?`, answer: `Start with the listed ${product.dimensions.trim()} reference and add room for the entrance, inflation equipment, anchoring, access route, guest circulation, interior use, and packing area. Confirm the final layout from the site plan before production.` },
      { question: `Can the ${terms[1]} be customized for a commercial camp or rental fleet?`, answer: `Yes. YIC can review ${campingTent.customizationFocus}, commercial colors, printed logos, entry and window arrangement, interior treatment, inflation package, anchoring, and export packing.` },
      { question: `How should I plan ventilation and overnight use for the ${terms[2]}?`, answer: `Plan the entry and exit, ventilation arrangement, interior sleeping or lounge layout, inflation equipment and power route where applicable, weather plan, staff supervision, occupancy, and local campsite requirements. The operator must set safe capacity and operating procedures for the actual site.` },
      { question: `Can this ${terms[3]} be used at an outdoor campsite?`, answer: `Outdoor use depends on the approved structure, site surface, anchoring method, weather plan, inflation equipment, supervision, and local rules. Confirm these conditions before ordering; do not assume weather performance beyond the approved specification.` },
      { question: `What should I include in a quotation request for this ${terms[0]}?`, answer: `Send the campsite, resort, rental, or event use; site plan; target footprint; height clearance; ground surface; entrance, window, and interior requirements; branding files; quantity; destination; target delivery date; and inflation, anchoring, packing, and storage needs.` },
    ];
  }
  if (nightclubTent) {
    const terms = nightclubTent.keywords;
    return [
      { question: `What is this ${terms[0]} designed for?`, answer: `${content.purpose} It is intended as a managed temporary event enclosure with defined guest flow, equipment placement, and venue supervision.` },
      { question: `How much clearance should I plan for this ${nightclubTent.productType}?`, answer: `Start with the listed ${product.dimensions.trim()} reference and add room for entrance and egress, anchoring, service access, lighting or sound equipment, guest circulation, queue space, and packing. Confirm the final layout from the venue plan before production.` },
      { question: `Can the ${terms[1]} be customized for a commercial event or rental fleet?`, answer: `Yes. YIC can review ${nightclubTent.customizationFocus}, commercial colors, printed logos, sponsor graphics, bar or dance-floor zoning, lighting and sound interfaces, anchoring, and export packing.` },
      { question: `How should I plan ventilation and guest flow inside the ${terms[2]}?`, answer: `Plan entry and egress, accessible circulation, ventilation, power and equipment routes, bar or dance-floor layout, expected occupancy, event staffing, emergency access, and venue rules. The operator must set capacity and operating procedures for the actual site.` },
      { question: `Can this ${terms[3]} be installed outdoors?`, answer: `Outdoor installation depends on the approved structure, surface, anchoring method, weather plan, power, lighting and sound equipment, supervision, and local venue requirements. Confirm these conditions before ordering; do not assume weather performance beyond the approved specification.` },
      { question: `What should I include in a quotation request for this ${terms[0]}?`, answer: `Send the venue type, site plan, target footprint, height clearance, floor or ground surface, entrance and egress requirements, bar or dance-floor zoning, equipment interfaces, branding files, quantity, destination, target delivery date, and anchoring, packing, or storage needs.` },
    ];
  }
  if (weddingTent) {
    const terms = weddingTent.keywords;
    return [
      { question: `What is this ${terms[0]} designed for?`, answer: `${content.purpose} It is intended as a managed temporary event enclosure with a confirmed ceremony, reception, catering, decor, and guest-flow plan.` },
      { question: `How much site clearance should I plan for this ${weddingTent.productType}?`, answer: `Start with the listed ${product.dimensions.trim()} reference and add room for the entrance and egress, anchoring, decor installation, catering or service access, guest circulation, equipment, and packing. Confirm the final layout from the venue plan before production.` },
      { question: `Can the ${terms[1]} be customized for a wedding or commercial rental program?`, answer: `Yes. YIC can review ${weddingTent.customizationFocus}, commercial colors, printed logo panels, event graphics, interior decor interfaces, lighting, anchoring, and export packing.` },
      { question: `How should I plan ventilation and guest flow for the ${terms[2]}?`, answer: `Plan the entry and exit, accessible circulation, ventilation, power and equipment routes, ceremony or reception seating, catering access, expected occupancy, staffing, emergency access, and venue rules. The operator must set capacity and operating procedures for the actual site.` },
      { question: `Can this ${terms[3]} be installed outdoors?`, answer: `Outdoor installation depends on the approved structure, ground surface, anchoring method, weather plan, power and lighting arrangement, supervision, and local venue requirements. Confirm these conditions before ordering; do not assume weather performance beyond the approved specification.` },
      { question: `What should I include in a quotation request for this ${terms[0]}?`, answer: `Send the venue type, site plan, target footprint, height clearance, floor or ground surface, entrance and egress requirements, ceremony or reception layout, catering and decor needs, branding files, quantity, destination, target delivery date, and anchoring, packing, or storage requirements.` },
    ];
  }
  if (product.category === 'Bumper Ball') {
    const terms = bumperBallKeywordSet(product);
    return [
      { question: `What is the ${name} model designed for?`, answer: `${content.purpose} Related buyer searches include ${terms[0]}, ${terms[1]}, ${terms[2]}, and ${terms[3]}.` },
      { question: `How do I choose the right bumper-ball size?`, answer: `Use the listed ${product.dimensions.trim()} as the starting reference, then confirm participant age, body fit, activity format, playing surface, and local venue rules before ordering.` },
      { question: `Can this model be used for bubble soccer or zorb activities?`, answer: `The product format is intended for supervised group recreation. Confirm whether the approved application is bubble soccer, zorb-style play, youth activity, or another format, along with the required surface and operating procedures.` },
      { question: `Can YIC customize colors, logos, or quantities?`, answer: `Yes. YIC can review color combinations, team identification, printed branding, ball diameter, quantity, accessories, repair support, and packing requirements for a commercial program.` },
      { question: `What should a rental operator plan for repeat sessions?`, answer: `Plan a suitable clear surface, participant briefing, supervision, inflation checks, cleaning and drying, inspection, transport, repair-kit access, and dry storage between sessions.` },
      { question: `What information should I send for a bumper-ball quotation?`, answer: `Send the participant group, intended activity, diameter and quantity, venue dimensions and surface, color or logo brief, destination, target delivery date, and preferred accessory or packing configuration.` },
    ];
  }
  if (product.category === 'Inflatable Games' && ringTossKeywordSet(product).length) {
    const terms = ringTossKeywordSet(product);
    return [
      { question: `What events is this ${terms[0]} designed for?`, answer: `${content.purpose} Its visible, score-based format suits carnivals, school fundraisers, family days, rental packages, festival booths, and branded activations when supervised by the event operator.` },
      { question: `How much space should I allow for the ${product.dimensions.trim()} ring toss game?`, answer: `Start with the listed reference footprint, then reserve room for the throwing line, player approach, side access, blower placement, anchoring, a queue, and a separated spectator area. Confirm the complete layout against the venue plan before production.` },
      { question: `How does the ${terms[1]} scoring layout work?`, answer: `The multi-height numbered columns support a simple score-and-prize format. Confirm the throwing-ring quantity and material, target numbers, throwing distance, age group, turn length, scoring rules, and prize mechanism in the approved game specification.` },
      { question: `Can the ${terms[2]} be customized for a branded event?`, answer: `Yes. YIC can review target heights, number layout, ring colors, overall size, sponsor panels, printed logos, event artwork, blower package, anchoring, repair kit, carry bags, and export packing for the project.` },
      { question: `What does repeated rental operation require for a ${terms[3]}?`, answer: `${content.operationNote} Include a pre-use inflation and anchor check, controlled turn-taking, cleaning, drying, target and ring inspection, repair-kit access, transport, and dry storage in the operating routine.` },
      { question: `What should I include in a ${terms[4]} quotation request?`, answer: `Send the venue type, usable footprint, desired throwing distance, target and scoring format, participant age range, expected throughput, branding files, quantity, destination, target delivery date, and required accessories or packing configuration.` },
    ];
  }
  if (product.category === 'Inflatable Games' && battingCageKeywordSet(product).length) {
    const terms = battingCageKeywordSet(product);
    const profile = battingCageProfile(product)!;
    return [
      { question: `What is the ${terms[0]} format designed for?`, answer: `${content.purpose} It is intended for a managed baseball or softball program, not unsupervised batting.` },
      { question: `How should I plan space for this ${product.dimensions.trim()} enclosure?`, answer: `Start with the listed footprint and add clearance for ${profile.planningFocus}, blower placement, anchoring, staff, and a separated spectator area. Confirm the final layout from the venue plan.` },
      { question: `Can this model work with a pitching machine or coach-fed balls?`, answer: `Specify the baseball or softball type, bat type, pitching-machine model and speed range, target setup, and participant group. Compatibility must be confirmed in the approved specification before operation.` },
      { question: `Which parts of this ${profile.productType} can be customized?`, answer: `YIC can review ${profile.customizationFocus}, colors, baseball or softball graphics, blower package, anchoring, accessories, repair kit, carry bags, and export packing.` },
      { question: `What does repeat rental or outdoor operation require?`, answer: `${content.operationNote} Include inspection, inflation, anchoring, cleaning, drying, repair-kit access, transport, and dry storage in the operating routine.` },
      { question: `What should I include in a ${terms[0]} quote request?`, answer: `This page covers ${terms.join(', ')}. Send the training or event use, site plan, clearance, equipment specification, custom dimensions, branding, quantity, destination, target delivery date, and required accessory or packing configuration.` },
    ];
  }
  if (product.category === 'Inflatable Games' && halloweenMazeKeywordSet(product).length) {
    const terms = halloweenMazeKeywordSet(product);
    return [
      { question: `What is this inflatable Halloween maze designed for?`, answer: `${content.purpose} The size and route are custom-configured from a venue plan.` },
      { question: `What site information is needed to design the maze?`, answer: `Provide the usable floor area, ceiling height, access route, intended corridor widths, queue footprint, target audience, and desired visitor throughput. The design review should also identify staff positions and emergency exits.` },
      { question: `How should visitor capacity and emergency exits be planned?`, answer: `The venue operator must set occupancy and throughput with local authorities and applicable venue rules. Keep exits and emergency routes unobstructed, establish staff positions, and review visibility and accessible circulation before approving the maze layout.` },
      { question: `Can the maze use a haunted-house or family Halloween theme?`, answer: `Yes. YIC can review the route, scene openings, colors, Halloween or haunted-house artwork, logos, sponsor panels, and family-appropriate visual treatment. Send reference images and brand files for design approval.` },
      { question: `Can this inflatable maze be used indoors or outdoors?`, answer: `The installation depends on the venue surface, ceiling or height clearance, access, power, anchoring, weather exposure, and local requirements. Confirm the intended setting before production so the layout and operating plan can be reviewed.` },
      { question: `What should I include in an inflatable haunted maze quotation request?`, answer: `This model is positioned around ${terms.join(', ')}. Send the venue plan, footprint, route concept, target audience, visitor capacity, egress requirements, theme, quantity, destination, opening date, and any lighting, sound, packing, or storage needs.` },
    ];
  }
  if (product.category === 'Inflatable Games' && hungryHippoKeywordSet(product).length) {
    const terms = hungryHippoKeywordSet(product);
    return [
      { question: `What is the human Hungry Hippo inflatable designed for?`, answer: `${content.purpose} The listed reference diameter is ${product.dimensions.trim()}. Confirm the final gameplay and supplied components before ordering.` },
      { question: `How much room should I allow around the 8 m game?`, answer: `${content.planningPoints[0]}. Include the entrance and exit, queue, operator position, and spectator buffer when checking the venue plan.` },
      { question: `How many players can take part in each round?`, answer: `Player capacity depends on the approved game mechanism, age group, staffing, and venue operating rules. Share the intended participant count and team format so the layout and play instructions can be confirmed before production.` },
      { question: `Which game pieces and accessories are included?`, answer: `The source listing does not define the exact game-piece mechanism or accessory package. Confirm the pieces, player attachments if any, blower, repair kit, and packing list in the quotation and approved specification.` },
      { question: `Can the diameter, theme, and team branding be customized?`, answer: `Yes. YIC can review ${content.customization.join('; ').toLowerCase()}. Provide the target footprint, preferred colors, event theme, and logo files for design review.` },
      { question: `What should I send to request a quote?`, answer: `This model is positioned around ${terms.join(', ')}. Send the venue type, available footprint, participant and team format, target age group, game-mechanism brief, quantity, branding, destination, delivery date, and storage needs.` },
    ];
  }
  if (product.category === 'Inflatable Games' && airHockeyKeywordSet(product).length) {
    const terms = airHockeyKeywordSet(product);
    const isCustom = /custom dimensions available/.test(product.dimensions);
    return [
      { question: `How is the ${name} inflatable air hockey game played?`, answer: `It is designed for supervised head-to-head puck play on an inflatable table-style surface. Confirm the approved puck, striker, scoring rules, and game setup in the final product specification.` },
      { question: `How much floor space should I plan for the game?`, answer: `${isCustom ? 'For the made-to-order model, provide the desired playing area, overall footprint, access, and ceiling clearance.' : `Start with the ${product.dimensions.trim()} reference footprint and add room for player access, blower placement, queues, and spectators.`} Share a site plan before confirming production.` },
      { question: `Which pucks and strikers are compatible?`, answer: `Compatibility depends on the final playing-surface construction. Specify the preferred puck and striker material, size, quantity, and expected play style so YIC can confirm a suitable package; do not assume standard hard pucks are appropriate.` },
      { question: `Can the table size, rails, and graphics be customized?`, answer: `Yes. YIC can review ${content.customization.join('; ').toLowerCase()}. Send the footprint, player access preference, colors, logo files, and venue use for layout approval.` },
      { question: `What should I prepare for safe operation and repeat events?`, answer: `${content.operationNote} Also plan the blower and power source, trained staffing, player rotation, inspection, cleaning, repair kit, transport, and dry storage.` },
      { question: `What details are needed for an inflatable air hockey quotation?`, answer: `This model is positioned around ${terms.join(', ')}. Send the venue type, floor area, reference or custom dimensions, puck and striker preference, quantity, branding, destination, target date, and packing needs.` },
    ];
  }
  if (product.category === 'Inflatable Games' && connectFourBasketballKeywordSet(product).length) {
    const terms = connectFourBasketballKeywordSet(product);
    const isCustom = /custom dimensions available/.test(product.dimensions);
    return [
      { question: `How does the ${name} Connect Four basketball game work?`, answer: `Players shoot compatible basketballs toward the target grid and follow the agreed scoring rules to build a Connect Four line. Confirm the final target and scoring layout in the approved specification.` },
      { question: `How much space is required for the game and shooting line?`, answer: `${isCustom ? 'For this custom-size model, provide the intended footprint, target height, shooting distance, access route, and clearance.' : `Start with the ${product.dimensions.trim()} reference footprint, then add a marked shooting distance, side access, queue, operator position, and separated spectator area.`} Review the complete layout against the venue plan before production.` },
      { question: `Which basketballs, hoop heights, and scoring rules should I specify?`, answer: `Confirm ball size and quantity, hoop height, grid-cell layout, scoring or win conditions, shooting distance, player age group, turn duration, and team rotation so the equipment and game rules work together.` },
      { question: `Can the Connect Four grid and branding be customized?`, answer: `Yes. YIC can review ${content.customization.join('; ').toLowerCase()}. Provide a venue plan, brand files, preferred colors, and event format for artwork and layout approval.` },
      { question: `What setup and operating details matter for repeated use?`, answer: `${content.operationNote} Also confirm blower access, power, packing, cleaning, inspection, repair-kit availability, and dry storage for your rental or venue program.` },
      { question: `What information should I send for a quotation?`, answer: `This model is positioned around ${terms.join(', ')}. Send the footprint, shooting distance, target layout, ball specification, scoring rules, participant profile, quantity, branding, destination, and required delivery date.` },
    ];
  }
  if (waterWalkingBallKeywordSet(product).length) {
    const terms = waterWalkingBallKeywordSet(product);
    const ballProfile = waterWalkingBallProfile(product)!;
    return [
      { question: ballProfile.faqQuestions[0], answer: `${content.purpose} It is a supervised recreation product, not a life-saving device.` },
      { question: ballProfile.faqQuestions[1], answer: `Plan the 2 m ball diameter plus operating clearance, water depth, access, exit or recovery space, and boundaries. The venue operator must confirm the water conditions suit the participant group and operating plan.` },
      { question: ballProfile.faqQuestions[2], answer: `The catalog lists ${product.material}. Confirm the exact TPU grade, thickness, seams, valve, and inflation equipment in the approved order specification.` },
      { question: ballProfile.faqQuestions[3], answer: `YIC can review practical options such as ball diameter, color, printed branding, valve and inflation compatibility, repair kit, and packing. Confirm final specifications before production.` },
      { question: ballProfile.faqQuestions[4], answer: `${content.operationNote} Staff should brief participants, monitor each session continuously, control access, and follow the site's emergency and rescue procedures.` },
      { question: ballProfile.faqQuestions[5], answer: `This model is positioned around ${terms.join(', ')}. Send the venue type, water-area dimensions and depth, participant and supervision plan, quantity, branding, inflation-equipment preference, destination, and target delivery date for a project quotation.` },
    ];
  }
  if (product.category === 'Inflatable Games' && axeThrowingKeywordSet(product).length) {
    const terms = axeThrowingKeywordSet(product);
    const isDualTarget = /dual target/.test(searchable);
    const isGame = /throwing game/.test(searchable);
    return [
      { question: `What is the ${name} designed to do?`, answer: `${content.purpose} ${dimensions} The final specification should identify compatible soft-play projectiles and game rules.` },
      { question: `How much room should I allow for the target and throwing line?`, answer: `${content.planningPoints[0]}. Include the marked throwing line, approach, waiting area, operator position, and a separated spectator zone in the site plan.` },
      { question: `Does this inflatable use real axes?`, answer: `The product is intended as a supervised inflatable target game, not a hard-axe throwing facility. Confirm the compatible soft-play projectile and target attachment before production; do not operate with real axes unless a separate venue-approved system explicitly specifies that use.` },
      { question: isDualTarget ? `How does the dual-target layout support event play?` : isGame ? `Which scoring and projectile details should be specified?` : `Which target layout and participant rules can be customized?`, answer: `${content.planningPoints[1]}. Confirm the number of targets, scoring zones, projectile type, age group, turn sequence, and staff position in the approved artwork and specification.` },
      { question: `Can the target artwork and dimensions be customized?`, answer: `Yes. YIC can review ${content.customization.join('; ').toLowerCase()}. Provide a venue plan, preferred theme, logo files, quantity, and target audience for a production review.` },
      { question: `What should I send to request a quotation?`, answer: `This model is positioned around ${terms.join(', ')}. Send the venue type, usable footprint, throwing-line distance, target layout, soft-play projectile preference, participant age range, artwork, quantity, destination, target date, and packing needs.` },
    ];
  }
  if (product.category === 'Inflatable Games' && soccerFieldKeywordSet(product).length) {
    const terms = soccerFieldKeywordSet(product);
    const isFoosball = /human foosball/.test(searchable);
    const isSoap = /soap/.test(searchable);
    const isSlipSlide = /slip and slide/.test(searchable);
    const isWater = /water soccer/.test(searchable);
    const isArena = /arena/.test(searchable);
    const isLarge = /large inflatable soccer field/.test(searchable);
    const isCustom = /custom dimensions available/.test(product.dimensions);
    const wetUse = isSoap || isSlipSlide || isWater;
    const dimensionText = isCustom ? 'No fixed reference size is listed. Provide your target dimensions and site plan.' : `The listed reference size is ${product.dimensions.trim()}.`;
    const modelType = isFoosball ? 'human-scale foosball' : isSoap ? 'soap-football' : isSlipSlide ? 'slip-and-slide soccer' : isWater ? 'water soccer' : isArena ? 'small-sided soccer arena' : isLarge ? 'large-format soccer field' : isCustom ? 'custom-size soccer field' : 'portable soccer field';
    return [
      { question: isFoosball ? `How does ${name} differ from a regular inflatable soccer field?` : isSoap ? `What makes this soap football field suitable for wet-play events?` : isSlipSlide ? `How does the slip-and-slide soccer layout combine soccer and wet play?` : isWater ? `What water-site conditions are needed for this soccer field?` : isArena ? `What match format fits this inflatable soccer arena?` : isCustom ? `How is this made-to-order soccer field sized?` : isLarge ? `Which projects should consider this large inflatable soccer field?` : `What match formats can use this inflatable soccer field?`, answer: `${content.purpose} ${dimensionText}` },
      { question: isFoosball ? `How many players and lanes should I specify for the human foosball game?` : isCustom ? `What site measurements are needed before custom production?` : isLarge ? `How much clearance is needed around the ${product.dimensions.trim()} field?` : `How much space and access clearance should I plan?`, answer: `${content.planningPoints[0]}. Also confirm player capacity, access and exit routes, blower placement, setup access, queuing, and spectator separation against a site plan before production.` },
      { question: isFoosball ? `Which team rules and player restraints should be confirmed?` : wetUse ? `How should water supply, drainage, and wet-play supervision be planned?` : isArena ? `How should goals, entry points, and player flow be configured?` : `Which goals, field markings, and game details can be specified?`, answer: `${content.planningPoints[1]}. Confirm the game rules, age group, ball compatibility, operator position, rotation, and any venue-specific procedures in the approved specification.` },
      { question: isFoosball ? `Can team colors and sponsor graphics be added to the foosball court?` : isCustom ? `Can the field be customized to my venue footprint and brand?` : `Can the field dimensions, goals, and printed graphics be customized?`, answer: `Yes. YIC can review ${content.customization.join('; ').toLowerCase()}. Provide a floor plan, target dimensions, logo files, and required quantity for specification review.` },
      { question: wetUse ? `Which material and drying checks matter after wet operation?` : isLarge ? `Which material specification is listed for the large field?` : `Which material and maintenance details should be confirmed?`, answer: `The catalog lists ${product.material}. Confirm the exact material, reinforcement, seams, accessories, and destination-market requirements for the selected model. ${content.operationNote}` },
      { question: isFoosball ? `What should I include when requesting a human foosball quote?` : isWater ? `What information does the factory need to quote a water soccer field?` : isSlipSlide || isSoap ? `What details should I send for a wet-play soccer field quotation?` : isCustom ? `What should I send for a custom inflatable soccer pitch quote?` : `What should I include in a commercial soccer-field RFQ?`, answer: `This model is relevant to ${terms.join(', ')}. Send the venue type, site plan, intended play format, quantity, destination, target delivery date, customization brief, and packing or accessory needs so YIC can confirm the specification and quote.` },
    ];
  }
  if (product.category === 'Inflatable Games' && isNewBilliardsProduct(product) && /billiard|pool table|snooker/.test(searchable)) {
    const terms = billiardsKeywordSet(product);
    const isHuman = /human billiards|soccer billiards/.test(searchable);
    const isCustom = /尺寸定制|custom dimensions available/.test(searchable);
    const dimensionNote = isCustom ? 'No fixed reference size is listed for this made-to-order model.' : dimensions;
    return [
      { question: isHuman ? `What is the ${name} format used for at commercial events?` : isCustom ? `How can this custom inflatable billiards table be configured for a venue?` : `Which venues can use this inflatable billiards pool table?`, answer: `${isHuman ? 'This human-scale soccer-billiards format is designed for supervised event rentals, FEC programs, sports-bar activities, resort guest programs, and team challenges.' : isCustom ? 'This made-to-order format is designed for venues that need an inflatable billiards activity planned around a particular footprint, game brief, and event identity.' : 'This pool-table-inspired inflatable is designed for group activities at rental events, FECs, hospitality venues, and supervised outdoor programs.'} ${dimensionNote}` },
      { question: isHuman ? `What clearance should I allow around the 4 x 7 x 1.25 m game?` : isCustom ? `Which measurements should I provide for a made-to-order game?` : `How much floor space and player clearance should I plan?`, answer: `${isCustom ? 'Provide the target length, width, wall height, access route, ceiling clearance, and available queue area.' : `Start with the ${product.dimensions.trim()} reference footprint, then allow space for access, player movement, anchoring, blower placement, and spectators.`} Share a venue plan and intended participant capacity before confirming the production layout.` },
      { question: isHuman ? `How does the human-scale soccer-billiards play format work?` : isCustom ? `Can I specify a pool- or snooker-inspired play layout?` : `Which balls and accessories should I specify for the pool-table game?`, answer: `Confirm the game format, number and size of balls, play rules, player age range, turn rotation, operator position, and any accessory package. For a custom model, provide the preferred play layout; the approved specification should state what is included with the unit.` },
      { question: isHuman ? `Can the arena graphics and team branding be customized?` : isCustom ? `Can the custom table match my floor plan and brand artwork?` : `Can the billiards table colors and perimeter be customized?`, answer: `Yes. YIC can review ${content.customization.join('; ').toLowerCase()}. For a custom-size order, send a floor plan or target footprint; for branded production, provide print-ready logo and artwork files for approval.` },
      { question: isHuman ? `What setup and supervision checks matter for active play?` : isCustom ? `Which material and construction details are confirmed before production?` : `Can this inflatable pool-table format be used outdoors?`, answer: `The catalog lists ${product.material}. Confirm the final material and construction details for the selected model. Plan a suitable surface, anchoring, blower access, supervised play, cleaning, inflation checks, and dry storage; outdoor use also depends on site and weather conditions.` },
      { question: isHuman ? `What details help quote a human billiards rental or event unit?` : isCustom ? `What should I send for a custom billiards-table quotation?` : `What should I include in a commercial pool-table order request?`, answer: `This model is positioned around ${terms.length ? terms.join(', ') : name.toLowerCase()}. Send the venue type, available footprint, intended game format, player age range, quantity, customization brief, destination, target date, and packing needs so the factory can confirm the specification and quote.` },
    ];
  }
  if (product.category === 'Inflatable Games' && /foam|bubble/.test(searchable)) {
    const terms = foamKeywordSet(product);
    const isBubble = /bubble/.test(searchable);
    return [
      { question: `What is the ${name} designed for?`, answer: `This ${isBubble ? 'bubble-foam' : 'foam-party'} attraction is designed for supervised party rentals, family entertainment, resorts, festivals, camps, and event programs. ${dimensions}` },
      { question: `How should I plan the site for a commercial foam pit?`, answer: `Confirm the footprint, wall height, foam depth, entry and exit, queue space, foam-machine position, drainage, surface, access route, ventilation, and clear supervision area before production.` },
      { question: `Which foam machine and drainage details should I confirm?`, answer: `Share the foam-machine output, power or water requirements, drainage arrangement, cleaning routine, drying schedule, and expected operating duration so the pit layout matches the venue.` },
      { question: `Can the foam party pit be customized with a theme or branding?`, answer: `Yes. YIC can review custom dimensions, wall height, entry layout, machine opening, rainbow or candy-land artwork, colors, logos, sponsor graphics, anchoring, packing, and accessories.` },
      { question: `Who typically buys an inflatable foam pit?`, answer: `Typical buyers include party rental companies, FECs, indoor play centers, resorts, event operators, schools, camps, and distributors building seasonal activity packages.` },
      { question: `What should I include in a foam-pit quotation request?`, answer: `This model is positioned around ${terms.join(', ')}. Send the venue type, target age group, capacity, dimensions, foam-machine details, drainage, theme or artwork, quantity, destination, target date, and storage requirements.` },
    ];
  }
  if (product.category === 'Inflatable Games' && /climb|rock wall|climbing wall|climbing tower/.test(searchable)) {
    const terms = climbingKeywordSet(product);
    const format = /slide/.test(searchable) ? 'climbing wall and slide' : /bounce|bouncy|castle/.test(searchable) ? 'bounce house climbing wall' : /tower/.test(searchable) ? 'inflatable climbing tower' : 'inflatable rock climbing wall';
    return [
      { question: `What is the ${name} ${format} designed for?`, answer: `It is designed for supervised climbing, adventure-play, family entertainment, resort programming, school activities, and commercial rental events. ${dimensions}` },
      { question: `How should I plan the site for a commercial climbing attraction?`, answer: `Confirm the footprint, total height, access route, landing area, queue space, anchoring, blower position, surface, clear supervision zone, and indoor or outdoor operating conditions before production.` },
      { question: `Can the climbing route or slide layout be customized?`, answer: `Yes. YIC can review wall height, route difficulty, holds, entry and exit, landing zone, slide or bounce integration, overall dimensions, colors, printed artwork, and venue branding.` },
      { question: `Which businesses typically buy this climbing inflatable?`, answer: `Typical buyers include family entertainment centers, adventure parks, resorts, party rental companies, schools, event operators, and distributors planning supervised activity programs.` },
      { question: `What safety and maintenance details should be confirmed?`, answer: `${content.operationNote} Confirm user age range, supervision, climbing rules, anchoring, inflation checks, cleaning, dry storage, repair-kit access, inspection routines, and local venue requirements before use.` },
      { question: `What keywords and information should I include in a quotation request?`, answer: `This model is positioned around ${terms.join(' and ')}. Send the venue type, user age range, required footprint and height, route or slide features, quantity, artwork, destination, target date, blower preferences, and packing requirements.` },
    ];
  }
  if (product.category === 'Inflatable Games' && /airbag|landing ramp|landing/.test(searchable)) {
    const sport = /fmx|motocross/.test(searchable) ? 'FMX and motocross' : /bmx/.test(searchable) ? 'BMX and bike' : /freestyle/.test(searchable) ? 'freestyle action-sports' : 'bike and action-sports';
    const landingType = /ramp/.test(searchable) ? 'landing ramp' : 'landing airbag';
    return [
      { question: `What is the ${name} ${landingType} designed for?`, answer: `It is designed to create a controlled landing zone for ${sport} jumps, progression training, demonstrations, and supervised stunt sessions. ${dimensions}` },
      { question: `How should I match this airbag to a jump or ramp?`, answer: `Confirm the jump height, approach speed, rider level, landing angle, ramp interface, clear zone, and expected impact pattern before approving the final size and chamber configuration.` },
      { question: `Which venues can use a commercial ${landingType}?`, answer: `Typical applications include bike parks, skateparks, action-sports training centers, stunt schools, camps, event demonstrations, and supervised rental programs.` },
      { question: `Can YIC customize the dimensions and printed artwork?`, answer: `Yes. YIC can review the landing footprint, air chambers, ramp connection, colors, sponsor graphics, logos, blower package, anchor points, carry bag, repair kit, and custom dimensions.` },
      { question: `What safety and operating information should be confirmed?`, answer: `${content.operationNote} Confirm rider rules, supervision, inflation pressure or appearance checks, anchoring, spectator separation, clear zones, cleaning, and local venue requirements before use.` },
      { question: `What should I include in an airbag landing quotation request?`, answer: `Send the sport and discipline, jump profile, rider level, required landing dimensions, ramp details, artwork, quantity, destination, target date, blower preferences, and storage or transport requirements. YIC can then confirm the approved specification and accessory list.` },
    ];
  }
  if (product.category === 'Inflatable Games' && /volleyball/.test(searchable)) {
    const terms = volleyballKeywordSet(product);
    const isField = /field/.test(searchable);
    const isWater = /water|pool/.test(searchable);
    const format = isField ? 'inflatable volleyball field' : isWater ? 'water volleyball court' : 'commercial inflatable volleyball court';
    return [
      { question: `What is the ${name} ${format} designed for?`, answer: `${isField ? 'This portable court system is designed for team training, tournaments, school programs, rentals, and branded sports events.' : isWater ? 'This floating court format is designed for supervised pool volleyball, resort activities, water-park programming, and seasonal events.' : 'This commercial court format is designed for team activities, tournaments, FEC programs, sports clubs, and supervised rental events.'} ${dimensions}` },
      { question: `How should I plan the surface, water area, and court footprint?`, answer: `${isWater ? 'Confirm the pool or water-area dimensions, water depth, buoyancy, access, anchoring, drainage or cleaning routine, and spectator separation.' : 'Confirm the usable ground or floor area, playing surface, court clearance, access route, anchoring, net position, and spectator flow before production.'} Include the target player count and operating schedule in the site plan.` },
      { question: `Where should the net, boundary, and player zones be placed?`, answer: `YIC can review net height, court length and width, boundary visibility, entry points, rotation or queue flow, player separation, operator position, and any team or spectator zones so the layout fits your venue.` },
      { question: `Can the volleyball court size, colors, logos, and branding be customized?`, answer: `Yes. Custom court dimensions, boundary height, net arrangement, team colors, printed graphics, sponsor logos, event artwork, anchoring, accessories, packing, and ${isWater ? 'pool or water-venue' : 'ground-venue'} details can be specified.` },
      { question: `What anchoring, cleaning, storage, and supervision details matter?`, answer: `${content.operationNote} Plan inflation checks, net tension, player rules, cleaning, drying where applicable, dry storage, repair-kit access, transport, and a documented supervision routine for repeated operation.` },
      { question: `What should I include in a volleyball court quotation request?`, answer: `This model is positioned around ${terms.join(', ')}. Send the venue type, ground or water-area plan, target dimensions, net requirements, player capacity, branding, quantity, destination, target date, anchoring, and storage or packing requirements.` },
    ];
  }
  if (product.category === 'Inflatable Games' && /bungee run/.test(searchable)) {
    const terms = bungeeRunKeywordSet(product);
    const isTwoLane = /2 lane/.test(searchable);
    return [
      { question: `What is the ${name} bungee run designed for?`, answer: `${isTwoLane ? 'This two-lane format is designed for head-to-head races, FEC programs, party rentals, school field days, camps, and team-building events.' : 'This inflatable bungee run is designed for supervised fun runs, party packages, festival challenges, school activities, and repeat event rentals.'} ${dimensions}` },
      { question: `How much space and clearance should I allow for the bungee run?`, answer: `Confirm the listed footprint plus access, anchoring, blower position, participant recovery space, queue area, spectator separation, and height clearance. Share the site plan so YIC can review the final lane arrangement.` },
      { question: `How should the elastic lines, lanes, and race rules be planned?`, answer: `Define the lane count, elastic-line attachment points, start and finish markers, participant age range, race distance, release rules, staffing position, and rotation flow before approving production.` },
      { question: `Can the bungee run be customized with colors, logos, or event artwork?`, answer: `Yes. YIC can customize the footprint, lane arrangement, start and finish graphics, colors, sponsor logos, team branding, printed artwork, entry points, anchoring, accessories, and packing details.` },
      { question: `What safety, cleaning, and storage details matter for repeat use?`, answer: `${content.operationNote} Plan participant rules, line and anchor checks, inflation checks, cleaning, drying, repair-kit access, dry storage, transport, and a documented supervisor routine for each rental or event.` },
      { question: `What should I include in a bungee run quotation request?`, answer: `This model is positioned around ${terms.join(', ')}. Send the venue type, usable footprint, lane count, participant age range, expected capacity, event format, artwork, quantity, destination, target date, anchoring, and storage or packing requirements.` },
    ];
  }
  if (product.category === 'Inflatable Games' && /boxing ring|boxing area|boxing arena|fighting ring/.test(searchable)) {
    const terms = boxingRingKeywordSet(product);
    const isArena = /arena|area|fighting/.test(searchable);
    const isSale = /for sale/.test(searchable);
    return [
      { question: `What is the ${name} inflatable boxing ring designed for?`, answer: `${isArena ? 'This boxing arena format is designed for supervised sports demonstrations, team events, brand activations, and activity programs.' : isSale ? 'This commercial boxing ring is designed for purchase, repeat rental operation, FEC programs, sports clubs, and promotional events.' : 'This rental-ready boxing ring is designed for party packages, FEC activity zones, schools, team challenges, and supervised event use.'} ${dimensions}` },
      { question: `How much space and clearance should I allow for the boxing ring?`, answer: `Confirm the listed footprint plus rope and corner clearance, access route, entry area, anchoring, blower position, participant recovery space, queue area, spectator separation, and height clearance. A venue plan helps YIC review the final layout.` },
      { question: `How should the ropes, corners, gloves, and participant zones be planned?`, answer: `Define rope height, corner posts, entry points, mat or interior area, glove or accessory needs, participant rules, staff position, rotation flow, and spectator boundaries before approving production.` },
      { question: `Can the boxing ring be customized with colors, logos, or giant gloves?`, answer: `Yes. YIC can customize ring dimensions, rope and corner details, colors, printed graphics, sponsor logos, event artwork, giant gloves, entry points, anchoring, accessories, and packing details.` },
      { question: `What safety, cleaning, and storage details matter for repeat use?`, answer: `${content.operationNote} Plan participant rules, rope and anchor checks, inflation checks, cleaning, drying, repair-kit access, dry storage, transport, and a documented supervisor routine for each rental or event.` },
      { question: `What should I include in an inflatable boxing ring quotation request?`, answer: `This model is positioned around ${terms.join(', ')}. Send the venue type, usable footprint, ring dimensions, participant age range, expected capacity, activity format, glove or accessory requirements, artwork, quantity, destination, target date, anchoring, and storage or packing requirements.` },
    ];
  }
  if (product.category === 'Inflatable Games' && /soccer dart|football dart|football darts|soccer darts|velcro soccer/.test(searchable)) {
    const terms = soccerDartKeywordSet(product);
    const sport = /football/.test(searchable) ? 'football' : 'soccer';
    const isVelcro = /velcro/.test(searchable);
    return [
      { question: `What is the ${name} inflatable ${sport} dart game designed for?`, answer: `It is designed as a supervised kicking and target game for party rentals, FECs, schools, camps, sports clubs, festivals, and branded event programs. ${dimensions} ${isVelcro ? 'The product name indicates a hook-and-loop target format; confirm the compatible ball construction in the final specification.' : 'The numbered target supports score-based play; confirm ball compatibility in the final specification.'}` },
      { question: `How much space and kicking clearance should I plan?`, answer: `Allow the product footprint plus the approach and kicking distance, side clearance, entry route, blower position, anchoring, player waiting area, and spectator boundary. Share the site dimensions and intended kicking line so the layout can be checked before production.` },
      { question: `Which ball and target-face details need confirmation?`, answer: `Confirm ball size and surface, target-face material, hook-and-loop compatibility where applicable, scoring zones, target height, kicking distance, and the age group. These details determine whether the game behaves as expected for your event.` },
      { question: `Can the dartboard target and artwork be customized?`, answer: `Yes. YIC can review overall dimensions, target layout, scoring colors, branding, logos, sponsor panels, event artwork, compatible ball options, anchoring, blower package, and packing requirements.` },
      { question: `How should the game be operated and maintained between sessions?`, answer: `${content.operationNote} Include supervised turn-taking, target-face inspection, cleaning, drying, inflation checks, repair-kit access, and dry storage in the operating routine.` },
      { question: `What should I send for an inflatable soccer dart quotation?`, answer: `This model is positioned around ${terms.join(', ')}. Send the venue type, available footprint, target height, kicking distance, ball and target-face preference, player capacity, artwork, quantity, destination, target date, and packing or storage requirements.` },
    ];
  }
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
      question: isBounceCategory
        ? `What is the ${bounceCore} format designed for?`
        : [
          `Would ${name} suit ${featuredApplication?.title.toLowerCase() || 'my venue'}?`,
          `How can ${name} fit a ${featuredApplication?.title.toLowerCase() || 'commercial'} program?`,
          `Is ${name} a practical choice for ${featuredApplication?.title.toLowerCase() || 'my business'}?`,
        ][productBatch(product)],
      answer: `${isBounceCategory ? `This ${bounceCore} is planned for ${content.primaryBuyer}.` : featuredApplication?.text ?? content.purpose} ${dimensions} Confirm the space, customer profile, and operating plan before selecting the final configuration.`,
    },
    {
      question: [
        `Which custom options are available for ${name}?`,
        `Can YIC adapt ${name} to my artwork and operating needs?`,
        `How can ${name} be customized for my market?`,
      ][productBatch(product)],
      answer: `YIC can review ${content.customization.join('; ').toLowerCase()}${isBounceCategory ? ` for the ${bounceCore} layout` : ''}. Share your reference images, preferred dimensions, branding, quantity, and destination so the proposed specification fits your project.`,
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

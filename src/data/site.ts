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
  title: 'Commercial Inflatable Water Slides | OEM Manufacturer | YIC',
  description: 'Commercial inflatable water slides for resorts, water parks, party rental businesses and events. YIC offers themed, multi-lane and custom OEM water slides.',
  h1: 'Commercial Inflatable Water Slides for Resorts, Rentals and Water Parks',
  intro: 'YIC manufactures commercial inflatable water slides for resorts, water parks, party rental fleets, pool venues, events, and seasonal recreation operators. The range includes single-lane, multi-lane, themed, pool-finish, and custom water-slide formats. Compare the models below, then send the site dimensions, water conditions, landing plan, artwork, quantity, and destination for a factory quotation.',
  options: ['Commercial single-lane water slides', 'Multi-lane racing water slides', 'Themed water slides with pools', 'Custom water-slide layouts for venues'],
  buyers: [
    { title: 'Water parks and resorts', text: 'Plan a high-visibility wet-use attraction around water depth, guest capacity, queue flow, anchoring, and seasonal operation.' },
    { title: 'Party rental companies', text: 'Add a water-slide format to summer rental packages with practical setup, transport, drying, storage, and repair planning.' },
    { title: 'Pool and event operators', text: 'Coordinate landing, drainage, supervision, access, and branded artwork for temporary or permanent water activities.' },
  ],
  oem: 'Send the water-area plan, depth, desired height, lane count, landing or splash-pool format, theme references, quantity, and destination. YIC can support custom layout, artwork approval, production inspection, packing, and export coordination.',
  faq: [
    { question: 'What is the difference between a commercial water slide and a dry inflatable slide?', answer: 'A commercial water slide is designed around wet-use water flow, landing, drainage, anchoring, supervision, and site conditions. A dry slide uses a dry landing and does not require the same water infrastructure.' },
    { question: 'How do I choose the right water-slide size and lane count?', answer: 'Review the available footprint, height clearance, access route, expected guest throughput, target age group, queue area, landing space, and whether single-, dual-, or triple-lane racing is appropriate.' },
    { question: 'Can YIC make a themed inflatable water slide with a pool?', answer: 'Yes. YIC can review theme artwork, colors, characters, slide height, lane count, splash-pool or landing arrangement, logos, and accessories for a custom OEM project.' },
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
  const newWaterPark = newWaterParkProfile(product);
  if (newWaterPark) {
    return `YIC manufactures ${newWaterPark.keywords[0]} for ${newWaterPark.buyer}. This ${product.dimensions.trim()} concept is shown as ${newWaterPark.visual}. ${newWaterPark.purpose} The listing specifies ${product.material}. Project options include ${newWaterPark.options}. Related buying searches include ${newWaterPark.keywords.slice(1).join(', ')}. Confirm water depth, site access, supervision, anchoring, operating conditions, and the final configuration before ordering.`;
  }
  const newTent = newInflatableTentProfile(product);
  if (newTent) {
    const detail = productDetailContent(product);
    return `YIC manufactures ${newTent.keywords[0]} for ${detail.primaryBuyer}. This ${product.dimensions.trim()} design is presented as ${newTent.visual}. ${newTent.purpose} The product is specified in ${product.material}; buyers can discuss dimensions, layout, branding, access, anchoring, and packing for their project. Related searches include ${newTent.keywords.slice(1).join(', ')}. Confirm the final site plan, materials, equipment, and operating requirements before production.`;
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

type NewWaterParkProfile = { keywords: string[]; visual: string; purpose: string; buyer: string; application: string; options: string };
const newWaterParkProfiles: Record<string, NewWaterParkProfile> = {
  'aqua-inflatable-water-park': {
    keywords: ['aqua inflatable water park', 'inflatable water park pool', 'splash and slide water park', 'inflatable water park with slide'],
    visual: 'a pink-and-white 16 × 4 m round splash-pool layout with raised perimeter walls, multiple slide stations, and bear-themed visual details',
    purpose: 'The shallow pool-style layout creates a bright, self-contained water-play focal point for managed summer events, resort programs, and venue activity areas.',
    buyer: 'resorts, water-play venues, holiday parks, event operators, rental businesses, and recreation-project buyers',
    application: 'supervised splash-play programs, seasonal resort activities, family event zones, and temporary water-play installations',
    options: 'pool colorway, slide and entry arrangement, decorative theme, printed branding, overall footprint, blower package, anchoring approach, packing, and accessory set',
  },
  'outdoor-inflatable-water-park': {
    keywords: ['outdoor inflatable water park', 'commercial inflatable water park', 'dual slide inflatable water park', 'water park with slide jump'],
    visual: 'a blue-and-white 16 × 4 m round outdoor water-play pool with multiple slide entries, raised splash walls, and bear-themed exterior artwork',
    purpose: 'The multi-entry pool format gives operators a visible outdoor water attraction that can be planned around guest circulation, timed sessions, and a supervised seasonal program.',
    buyer: 'outdoor recreation venues, water parks, resorts, campsite operators, municipal event teams, and commercial rental fleets',
    application: 'outdoor water-play zones, resort recreation, summer events, campsite programming, and commercial rental packages',
    options: 'slide count and orientation, entrance and exit flow, color palette, printed artwork, water-play layout, branding, anchors, accessories, and export packing',
  },
};

function newWaterParkProfile(product: Product) {
  return product.category === 'Inflatable Water Park' ? newWaterParkProfiles[product.productSlug] : undefined;
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
};

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

function interactiveGameProfile(product: Product) {
  return interactiveGameProfiles[product.productSlug];
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

function productSearchTerms(product: Product) {
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
  const newWaterPark = newWaterParkProfile(product);
  if (newWaterPark) return seoTitle(`${newWaterPark.keywords[0]} | Commercial Water Park`);
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
  if (product.category === 'Bumper Ball') {
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
  const newWaterPark = newWaterParkProfile(product);
  if (newWaterPark) return truncateMeta(`YIC makes ${newWaterPark.keywords[0]} for ${newWaterPark.application}. ${product.dimensions.trim()} · ${product.material}. Custom slides, colors, branding, and factory quotation.`, 158);
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
  if (product.category === 'Bumper Ball') {
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
  const newWaterPark = newWaterParkProfile(product);
  if (newWaterPark) return [
    `Visible layout: ${newWaterPark.visual}`,
    `Reference dimensions: ${product.dimensions.trim()}`,
    `Listed material: ${product.material}`,
    `Customization: ${newWaterPark.options}`,
  ];
  const newTent = newInflatableTentProfile(product);
  if (newTent) return [
    `Visual format: ${newTent.visual}`,
    `Reference dimensions: ${product.dimensions.trim()}`,
    `Listed construction: ${product.material}`,
    `Project planning: ${newTent.options}`,
  ];
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
    'Enclosed, water-based walking-ball format for supervised aquatic recreation',
    '2 m diameter reference size for venue footprint and water-area planning',
    `${product.material} construction listed for this model`,
    'Confirm water depth, access, supervision, session capacity, and local operating requirements before use',
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
  let title = product.title.trim();
  title = title.replace(/^diameter.*?(?=inflatable\b)/i, '');
  title = title.replace(/^\d+(?:\.\d+)?mH(?:\s+\d+(?:\.\d+)?mm\s*PVC)?\s*/i, '');
  title = title.replace(/^\d+(?:\.\d+)?\s*dia\s*x.*?mH\s*/i, '');
  title = title.replace(/^\d+(?:\.\d+)?(?:[x×z]\d+(?:\.\d+)?m?){1,3}\s*/i, '');
  title = title.replace(/^\d+(?:\.\d+)?m(?:x\d+(?:\.\d+)?m){1,3}\s*/i, '');
  title = title.replace(/^(?:best|used|buy)\s+/i, '');
  title = title.replace(/\s+(?:for sale|for rent|rental|manufacturer)\b/gi, '');
  title = title.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g, ' ');
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
  if (product.category === 'Inflatable Games' && waterWalkingBallKeywordSet(product).length) {
    const position = productCategoryPosition(product);
    const templateIndex = Math.max(0, position) % 30;
    const template: DetailTemplate = templateIndex < 10 ? 'specification' : templateIndex < 20 ? 'application' : 'custom-project';
    return {
      template,
      productType: 'commercial inflatable water walking ball',
      primaryBuyer: 'water parks, resorts, aquatic recreation operators, family entertainment centers, event companies, and inflatable-equipment distributors',
      purpose: 'This enclosed 2 m water-walking ball is intended for supervised aquatic recreation, where a participant walks or rolls inside the ball on a managed water surface. Venue depth, operating area, capacity, staffing, and emergency procedures should be reviewed before purchase.',
      applications: [
        { title: 'Water parks and resorts', text: 'Add a time-based water activity after confirming water depth, participant access, supervision, and venue operating procedures.' },
        { title: 'Aquatic events and festivals', text: 'Create a visible recreation station with a controlled queue, trained staff, clear participant briefing, and defined water-area boundaries.' },
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
  const newWaterPark = newWaterParkProfile(product);
  if (newWaterPark) return [...newWaterPark.keywords, `${newWaterPark.keywords[0]} manufacturer`, `custom ${newWaterPark.keywords[0]}`, 'YIC Inflatable Sports'].join(', ');
  const newTent = newInflatableTentProfile(product);
  if (newTent) return [...newTent.keywords, `${newTent.keywords[0]} manufacturer`, `custom ${newTent.keywords[0]}`, 'YIC Inflatable Sports'].join(', ');
  const primaryBuyer = productTargetBuyers(product)[0] || 'commercial buyers';
  if (product.category === 'Bumper Ball') {
    const terms = bumperBallKeywordSet(product);
    return [...new Set([terms[0], name, `commercial ${content.productType}`, primaryBuyer, 'bubble soccer equipment', 'YIC Inflatable Sports'])].filter(Boolean).join(', ');
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

export function productCardDescription(product: Product) {
  const name = cardNameVariant(product);
  const lowerName = name.replace(/^The /, 'the ');
  const application = productApplication(product);
  const reference = product.dimensions ? `Reference size: ${product.dimensions.trim()}.` : 'Custom dimensions available.';
  const searchable = `${product.title} ${product.sourceName}`.toLowerCase();
  const interactiveProfile = interactiveGameProfile(product);
  if (interactiveProfile) {
    return `Commercial ${interactiveProfile.keywords[0]} with ${interactiveProfile.visibleLayout}. Plan ${interactiveProfile.keywords[1]}, game rules, OEM graphics, and supervised event use. ${reference}`;
  }
  if (product.category === 'Bumper Ball') {
    const terms = bumperBallKeywordSet(product);
    const audience = /kid|kids|child/.test(searchable) || /1\.25m/.test(product.dimensions)
      ? 'youth group activities, schools, and supervised party rentals'
      : /zorb/.test(searchable)
        ? 'zorb-style recreation, team events, and sports operators'
        : 'adult bubble-soccer programs, events, and commercial rental fleets';
    return `Commercial TPU ${terms[0] || 'inflatable bumper ball'} for ${audience}. Explore ${terms[1] || 'custom team colors'} and ${terms[2] || 'OEM logo options'} in the product specification. ${reference}`;
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
  if (product.category === 'Inflatable Games' && waterWalkingBallKeywordSet(product).length) return `A 2 m TPU water-walking ball for supervised aquatic recreation, planned around water depth, access, participant limits, rescue procedures, and venue rules. ${reference}`;
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
  const newWaterPark = newWaterParkProfile(product);
  if (newWaterPark) {
    const customDimensions = /custom dimensions available/i.test(product.dimensions);
    return [
      { question: `What does this ${newWaterPark.keywords[0]} layout include?`, answer: `The reference imagery shows ${newWaterPark.visual}. The quoted scope should confirm the exact included sections, accessories, and final configuration.` },
      { question: `What are the listed dimensions for the ${newWaterPark.keywords[0]}?`, answer: `${customDimensions ? 'Custom dimensions are available.' : `The listed reference size is ${product.dimensions.trim()}.`} Confirm the total footprint, clear area around the pool, access route, water depth, and installation surface in the site drawing.` },
      { question: `Which material is specified for this inflatable water park?`, answer: `The current catalog lists ${product.material}. Confirm fabric grade, thickness, reinforcement, seams, and component details in the approved production specification before ordering.` },
      { question: `Can the slides, colors, or theme of this ${newWaterPark.keywords[0]} be customized?`, answer: `YIC can review ${newWaterPark.options}. Send reference artwork, preferred colors, logo files, target footprint, and quantity for a project-specific proposal.` },
      { question: `What site and operating details are needed before setup?`, answer: `Provide water depth and conditions, usable area, entry and exit access, anchoring points, power and inflation equipment, participant group, supervision and rescue plan, weather exposure, event duration, and local venue requirements. Final operation must follow the approved specification and site procedures.` },
      { question: `What information should I send to get a factory quote?`, answer: `Share the intended use (${newWaterPark.application}), site plan, water area and depth, target dimensions, chosen options, branding files, quantity, destination, packing needs, and delivery date. The final quotation can then confirm the product configuration, accessories, and project terms.` },
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
  if (product.category === 'Inflatable Games' && waterWalkingBallKeywordSet(product).length) {
    const terms = waterWalkingBallKeywordSet(product);
    return [
      { question: `What is this inflatable water walking ball used for?`, answer: `${content.purpose} It is a supervised recreation product, not a life-saving device.` },
      { question: `What water depth and operating area are needed for the 2 m ball?`, answer: `Plan the ball diameter plus clearance, water depth, access, exit or recovery space, and boundaries. The venue operator must confirm that the water conditions suit the participant group and the operating plan before use.` },
      { question: `How many participants can use a water walking ball at one time?`, answer: `The capacity and session duration must be defined by the venue's operating procedure and the product's approved specification. Plan trained supervision, participant screening, a controlled queue, and immediate access to the water for assistance.` },
      { question: `What safety procedures should the venue prepare?`, answer: `${content.operationNote} Staff should brief participants, monitor each session continuously, control access, and follow the site's emergency and rescue procedures.` },
      { question: `Which material and customization options are available?`, answer: `The catalog lists ${product.material}. Confirm the exact TPU grade, thickness, seams, valve, inflation equipment, colors, graphics, repair kit, and packing details with YIC for the ordered specification.` },
      { question: `What information is needed for a water zorbing ball price quotation?`, answer: `This model is positioned around ${terms.join(', ')}. Send the venue type, water-area dimensions and depth, participant and supervision plan, quantity, branding, inflation-equipment preference, destination, and target delivery date for a project quotation.` },
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

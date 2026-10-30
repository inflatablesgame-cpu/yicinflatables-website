import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const sourceDir = path.resolve(rootDir, '..', '案例');
const outputDir = path.join(rootDir, 'public', 'assets', 'case-studies');

const projectImages = [
  ['argentina-soccer-slide', 'Argentina Inflatable Slide with Soccer Jumping Bouncer Graphics for Kids Playground.jpg'],
  ['france-water-slide', 'Commercial Big Water Slides Inflatable Heavy Duty in France .jpg'],
  ['candy-house-combo', 'Commercial Grade Inflatable Castle Candy House Water Slide for Professional Rental Party.png'],
  ['uk-princess-bounce-house', 'Commercial Pink Bouncy Castle in UK Princess Modern Inflatable Jumper for Rental Business.jpg'],
  ['croatia-dual-lane-combo', 'Commercial PVC Bouncing Castles Outdoor with Dual Lane Slide for Backyard Playgrounds Croatia.jpg'],
  ['usa-mario-combo', 'commercial-mario-bounce-house-slide-usa-party-rental-inflatable-castle.jpg'],
  ['usa-wedding-bounce-house', 'commercial-wedding-bounce-house-usa-party-rental-inflatable-castle.jpg'],
  ['croatia-food-truck', 'Customize Inflatable Food Truck Large Portable Ice Cream Bus Croatia for Street Catering.jpg'],
  ['south-africa-inflatable-park', 'Full set outdoor inflatable park in south Africa for amusement playground.jpg'],
  ['philippines-wedding-tent', 'Inflatable Castle for Wedding Party Portable Event Tent with Slide Philippines.jpg'],
  ['sri-lanka-led-tent', 'Inflatable Nightclub Air Tent with LED in Sri Lanka For Rental & Exhibition.jpg'],
  ['peru-soccer-field', 'Inflatable Soccer Field Giant Football Pitch and Bumper Ball Game Peru for Commercial Rental.jpg'],
  ['peru-sumo-ring', 'Inflatable Wrestling Sumo Boxing Ring Game Peru for Party.jpg'],
  ['austria-airbag-system', 'inflatable-airbag-system-Austria-sports-training-extreme-events.jpg'],
  ['austria-theme-park', 'inflatable-bounce-house-Austria-kids-theme-park-event-luxury-party-rental.jpg'],
  ['usa-bubble-house', 'inflatable-bubble-house-tent-usa-outdoor-event-wedding-exhibition.jpg'],
  ['usa-bumper-balls', 'inflatable-bumper-balls-usa-carnival-interactive-play-equipment.jpg'],
  ['usa-led-white-tent', 'inflatable-led--white-tent-usa-outdoor-event-party.jpg'],
  ['argentina-obstacle-course', 'inflatable-obstacle-course-Argentina-racing-game-team-building-event.jpg'],
  ['germany-obstacle-course', 'inflatable-obstacle-course-germany-sports-competition-training.jpg'],
  ['usa-spiderman-slide', 'inflatable-spiderman-slide-usa-rental-business-case.jpg.jpeg'],
  ['philippines-water-slide', 'inflatable-water-slide-Philippines-aquatic-park-resort-entertainment.jpg'],
  ['uae-dome-tent', 'luxury-inflatable-dome-tent-uae-exhibition-branding-event.png'],
  ['brazil-soccer-goal', 'Professional Giant Inflatable Soccer Goal and Dart Board Brazil for Outdoor Carnival Party.jpg'],
  ['brazil-spiderman-bounce-house', 'Professional Inflatable Spider Man Bouncy Castle Brazil for Outdoor Kids Play.jpg'],
  ['austria-bubble-house', 'White Bubble Bounce House Inflatable Balloon Tent Large Portable Dome Structure for Events in Austria.jpg'],
];

const buyerReferences = [
  ['argentina-1', '1 cases Argentina Flag.PNG'],
  ['austria-1', '1 cases Austria Flag.PNG'],
  ['brazil-1', '1 cases Brazil Flag.PNG'],
  ['croatia-1', '1 cases Croatia Flag.PNG'],
  ['france-1', '1 cases France Flag.PNG'],
  ['germany-1', '1 cases Germany Flag.PNG'],
  ['peru-1', '1 cases Peru Flag.PNG'],
  ['philippines-1', '1 cases Philippines Flag.PNG'],
  ['poland-1', '1 cases Poland Flag.PNG'],
  ['south-africa-1', '1 cases South Africa Flag.jpg'],
  ['sri-lanka-1', '1 cases Sri Lanka Flag.PNG'],
  ['uae-1', '1 cases UAE Flag.PNG'],
  ['uk-1', '1 cases UK Flag.PNG'],
  ['usa-1', '1 USA Flag.PNG'],
  ['argentina-2', '2 cases Argentina Flag.PNG'],
  ['austria-2', '2 cases Austria Flag.PNG'],
  ['brazil-2', '2 cases Brazil Flag.PNG'],
  ['croatia-2', '2 cases Croatia Flag.PNG'],
  ['philippines-2', '2 cases Philippines Flag.PNG'],
  ['usa-2', '2 cases USA Flag.PNG'],
  ['austria-3', '3 cases Austria Flag.PNG'],
  ['usa-3', '3 cases USA Flag.PNG'],
  ['usa-4', '4 cases USA Flag.PNG'],
  ['usa-5', '5 cases USA Flag.PNG'],
  ['usa-6', '6 cases USA Flag.PNG'],
];

async function writeWebp(sourceName, destination, options) {
  const source = path.join(sourceDir, sourceName);
  const output = path.join(outputDir, destination);
  await mkdir(path.dirname(output), { recursive: true });
  await sharp(source)
    .rotate()
    .resize(options)
    .webp({ quality: options.quality, effort: 5 })
    .toFile(output);
}

for (const [slug, source] of projectImages) {
  await writeWebp(source, `projects/${slug}.webp`, {
    width: 960,
    height: 720,
    fit: 'cover',
    position: 'centre',
    withoutEnlargement: true,
    quality: 76,
  });
}

for (const [slug, source] of buyerReferences) {
  await writeWebp(source, `buyers/${slug}.webp`, {
    width: 160,
    height: 100,
    fit: 'contain',
    background: { r: 255, g: 255, b: 255, alpha: 0 },
    withoutEnlargement: true,
    quality: 82,
  });
}

console.log(`Created ${projectImages.length} project and ${buyerReferences.length} buyer-reference WebP assets.`);

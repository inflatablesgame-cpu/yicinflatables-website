export type BuyerGuideProfile = {
  decision: string;
  checklist: string[];
  risks: string[];
  factoryQuestions: string[];
  faqs: { question: string; answer: string }[];
};

const profiles: Record<string, BuyerGuideProfile> = {
  'Rental Business': {
    decision: 'Treat the purchase as a fleet decision. Match each model to the customer segment, vehicle capacity, crew workflow, storage and repeat-booking potential instead of choosing from photos alone.',
    checklist: ['Primary booking type: backyard, school, event, venue or festival', 'Inflated footprint, access route, storage and transport constraints', 'Blower, anchor, repair and cleaning requirements', 'A balanced mix of entry, combo and differentiated attractions'],
    risks: ['Buying several similar units without a clear booking role', 'Ignoring packed volume, labor and cleaning time', 'Promoting a unit before confirming venue and operating requirements'],
    factoryQuestions: ['Which models create a balanced starter fleet for our booking types?', 'What packed dimensions, gross weight and accessory list apply to each model?', 'Which inspection and repair materials are included or available?'],
    faqs: [{ question: 'How should a new rental operator choose the first products?', answer: 'Start with the intended customer segments and operating constraints. A mix of standard play, a combo or slide, and one differentiated attraction usually creates clearer price points than purchasing several visually similar units.' }, { question: 'Which information affects rental operating cost?', answer: 'Transport, packed size, crew time, cleaning, storage, blower power, anchors, repair materials and inspection routines all affect the real operating cost beyond the factory price.' }],
  },
  'Buying Guide': {
    decision: 'Compare the complete commercial specification rather than one visible feature. The best fit is the model that works at the intended venue, can be maintained realistically, and is documented for the buyer’s market.',
    checklist: ['Inflated dimensions, clearance, access route and anchoring area', 'Material specification, stress-point construction and intended duty cycle', 'Blower or pump requirements, accessories and repair materials', 'Product-specific document scope for the destination and operating use'],
    risks: ['Using PVC thickness as the only quality comparison', 'Selecting a product that cannot fit through access routes or storage', 'Assuming a generic certificate applies to every design or market'],
    factoryQuestions: ['What is included in the complete equipment set?', 'What construction details distinguish this model from a residential-use design?', 'Which market documents are relevant to the final approved configuration?'],
    faqs: [{ question: 'Which specification should be checked before price?', answer: 'Confirm inflated and packed dimensions, material and construction scope, blower or pump requirements, accessory list, intended use, and the destination-market document scope before comparing price.' }, { question: 'Why should buyers ask about the final configuration?', answer: 'Dimensions, materials, components, artwork and destination can change what is supplied and which documentation is relevant. The approved order specification is the decision record.' }],
  },
  'Sourcing': {
    decision: 'Use the quotation process as a factory capability test. A reliable supplier can restate the approved scope clearly, flag missing information, and explain how production, inspection and packing will be controlled.',
    checklist: ['Product model, quantity, destination and target delivery date', 'Dimensions, colors, artwork, accessories and packed shipment needs', 'Factory confirmation of material, production sequence and inspection steps', 'Quotation scope, payment, shipping term and documentation boundaries'],
    risks: ['Comparing a low first price without matching scope', 'Approving artwork or dimensions only in chat instead of in the order file', 'Leaving freight, packaging or document expectations unconfirmed'],
    factoryQuestions: ['Can you provide a model-specific quotation rather than a generic range?', 'Which production approvals are required before the lead time begins?', 'How are final inspection, packing and export documents recorded?'],
    faqs: [{ question: 'What should a B2B buyer send in the first RFQ?', answer: 'Provide a model or reference image, quantity, dimensions, colors or branding, destination, target date, intended use and required accessories. This allows the factory to quote an identifiable order rather than a vague product type.' }, { question: 'How can buyers compare factories fairly?', answer: 'Ask every factory to quote the same approved scope. Then compare clarity, production controls, inspection communication, packed information, documentation boundaries and responsiveness as well as price.' }],
  },
  'Compliance': {
    decision: 'Treat compliance as a model-and-market review, not a badge added to every catalog item. Match the final configuration, components, operating use and destination to the document scope before production.',
    checklist: ['Final product model, dimensions, components and intended use', 'Destination country, venue or operator requirements', 'Standard, test report or material document and its exact scope', 'Labels, operating instructions and approved order revision'],
    risks: ['Presenting EN, ASTM, CE or flame documentation as universal without scope', 'Using a document that covers a different material, component or revision', 'Waiting until shipment to ask about destination-market requirements'],
    factoryQuestions: ['Which documents apply to this final approved configuration?', 'What is the scope, date and covered component or material for each document?', 'Which local venue or operator requirements remain the buyer’s responsibility to confirm?'],
    faqs: [{ question: 'Why is one certificate not enough for every inflatable?', answer: 'Different products, materials, components, intended uses and markets can have different requirements. A document is useful only when its scope matches the final product and destination.' }, { question: 'When should documentation be reviewed?', answer: 'Review it during quotation and again when the final model, components, artwork and destination are confirmed. Do not wait until the product is packed or at the port.' }],
  },
  'Materials': {
    decision: 'Evaluate material as part of the complete construction system. Fabric weight, coating, seams, reinforcement, stress areas, zippers and operating conditions matter together.',
    checklist: ['Material type and commercial-use scope for the specific model', 'High-stress points, seams, anchor points and connection details', 'Wet or dry operating environment and cleaning method', 'Repair materials, storage conditions and inspection routine'],
    risks: ['Using a single thickness number as a quality conclusion', 'Applying dry-product material assumptions to water or outdoor products', 'Ignoring cleaning, drying and repair needs after delivery'],
    factoryQuestions: ['Which material specification is proposed for this model and use?', 'Which points receive reinforcement or special construction attention?', 'Which cleaning, drying and repair practices should the buyer plan?'],
    faqs: [{ question: 'Does a thicker PVC number prove a better inflatable?', answer: 'No. Thickness is only one item. Compare the product-specific fabric, coating, stitching or welding, reinforcement, design, intended use and quality-control process together.' }, { question: 'Why does intended use affect material selection?', answer: 'Water exposure, repeated transport, outdoor conditions, user traffic and product geometry place different demands on construction and maintenance. The model should be specified for its real operating environment.' }],
  },
  'Product Guide': {
    decision: 'Plan the attraction around player flow, supervision, footprint and reset time. A visually strong product still needs to work for the intended users and venue operation.',
    checklist: ['Target age, number of users and level of supervision', 'Footprint, height, access, exit and operator sight lines', 'Activity sequence, queue flow and reset requirements', 'Theme, color or branding requirements for the venue'],
    risks: ['Choosing a complex design with poor operator visibility', 'Forgetting entrance, exit, queue or spectator space', 'Using a theme that does not match the buyer’s customer segment'],
    factoryQuestions: ['What operating footprint and clearance should be planned?', 'How can the activity layout support visible supervision?', 'Which areas can be branded without affecting operation or access?'],
    faqs: [{ question: 'What makes an inflatable attraction practical for events?', answer: 'The product must fit the usable footprint, support clear entry and exit, keep operator sight lines open, match the target age and allow a realistic player flow for the event schedule.' }, { question: 'Can themes and branding be customized?', answer: 'Yes, subject to the approved artwork and product layout. Buyers should provide logos, colors, placement references and the intended viewing angles before production approval.' }],
  },
  'OEM / ODM': {
    decision: 'Keep every custom project traceable from brief to final approval. A usable production file links the concept, dimensions, materials, artwork, components, inspection criteria and packing scope.',
    checklist: ['Use case, target users, venue conditions and product functions', 'Reference images, dimensions, artwork, logos and colors', 'Approval record for layout, access points and visible branding areas', 'Inspection expectations, packing requirements and destination'],
    risks: ['Starting production from unapproved reference images', 'Separating artwork approval from dimensions and structural layout', 'Making late changes without checking cost or lead-time impact'],
    factoryQuestions: ['Which drawing or artwork revision will be used for production?', 'Which decisions affect structural layout, price or lead time?', 'How will final inspection confirm the approved project brief?'],
    faqs: [{ question: 'What should an OEM inflatable brief include?', answer: 'Include intended use, reference images, target dimensions, user type, venue conditions, logos, colors, destination, quantity and the timing of the project. The factory then has a clear basis for layout and quotation.' }, { question: 'Why is artwork approval a production control?', answer: 'Artwork can affect panel layout, seams, entrances, visual orientation and delivery timing. The approved revision should be linked to the final product specification before production starts.' }],
  },
  'Water Attractions': {
    decision: 'Start with the real water site. Water depth, access, wind exposure, anchoring, guest flow and rescue planning determine whether an attraction layout is practical.',
    checklist: ['Verified water conditions, depth and usable attraction area', 'Access, anchoring, supervision, weather exposure and rescue plan', 'Module mix, circulation, capacity and age-group plan', 'Drying, storage, repair and destination-market requirements'],
    risks: ['Selecting modules before confirming water-site constraints', 'Assuming land-based standards automatically apply to floating equipment', 'Ignoring cleaning, drying and off-season storage'],
    factoryQuestions: ['Which site information is needed before you recommend a layout?', 'How should modules, access and anchoring be planned for our water area?', 'Which operating and documentation requirements should be confirmed locally?'],
    faqs: [{ question: 'What information should be shared before buying a water attraction?', answer: 'Share the water area, verified depth, access point, anchoring approach, wind and weather conditions, target users, capacity plan, operating season and local requirements before selecting modules.' }, { question: 'Why are water products reviewed differently from land inflatables?', answer: 'Waterborne and floating attractions have different site, operating and local-regulatory considerations. Documentation and operating requirements must be confirmed for the final product and water use.' }],
  },
  'Venue Planning': {
    decision: 'Choose attractions as part of a venue operating system. The right selection balances throughput, age range, visibility, staff position, access and repeat-play value.',
    checklist: ['Usable footprint, ceiling height, entry and exit routes', 'Target users, attendance pattern and staff supervision position', 'Round length, reset time, queue capacity and guest circulation', 'Brand, theme and maintenance requirements for the venue'],
    risks: ['Buying based on visual impact without throughput planning', 'Creating dead ends or poor supervision sight lines', 'Overlooking power, access and maintenance space'],
    factoryQuestions: ['How many users and which age groups should this layout serve?', 'What staff position and clearance should be planned?', 'Which modules create a varied attraction mix within our footprint?'],
    faqs: [{ question: 'How should a venue compare interactive inflatable attractions?', answer: 'Compare player capacity, round duration, reset time, supervision, clearance, footprint, maintenance and how the attraction complements the rest of the venue rather than comparing photos alone.' }, { question: 'Why is guest flow important?', answer: 'Clear entry, exit, queue and spectator routes help staff supervise the attraction, avoid bottlenecks and create a more predictable guest experience.' }],
  },
  'Export': {
    decision: 'Plan freight from the packed shipment, not the inflated product image. The shipment details, destination, trade term and document responsibilities should be agreed before production is complete.',
    checklist: ['Packed dimensions, gross weight, package count and accessory list', 'Destination city or port, delivery term and target delivery date', 'Required export documents and local customs responsibility', 'Packing protection for PVC, printed surfaces, blowers or pumps'],
    risks: ['Quoting freight without complete packed information', 'Leaving accessory packages or electrical components out of the shipment scope', 'Assuming the factory controls destination customs or last-mile delivery without agreement'],
    factoryQuestions: ['What is the estimated packed shipment for this exact order?', 'Which export documents are provided and which local procedures remain ours?', 'How are accessories and printed components protected in export packing?'],
    faqs: [{ question: 'Why do packed dimensions matter more than inflated size for freight?', answer: 'Freight is planned around the actual packed shipment: package count, gross weight, folded volume, accessories and destination. Inflated size alone cannot produce a reliable logistics comparison.' }, { question: 'When should buyers confirm the trade term?', answer: 'Confirm it in the quotation. The term should identify the destination, scope of freight, export documentation, customs responsibilities and the delivery point that the price covers.' }],
  },
  'Operations': {
    decision: 'Protect uptime with a repeatable routine. Inspection, drying, cleaning, storage, compatible spares and repair records are operational requirements, not optional extras.',
    checklist: ['Pre-use inspection of seams, anchors, connections and visible surfaces', 'Correct blower or pump, power supply and operating environment', 'Cleaning and complete drying before storage', 'Repair materials, spare components and written maintenance record'],
    risks: ['Storing a damp product', 'Using incompatible electrical supply or components', 'Repairing without recording the product, issue and material used'],
    factoryQuestions: ['What pre-use checks are recommended for this model?', 'Which spares and repair materials should we keep?', 'What power, connection and operating instructions should be supplied?'],
    faqs: [{ question: 'What should operators inspect before use?', answer: 'Inspect the installation area, seams, zippers, anchors, handles, connection points, blower or pump, visible surfaces and the product’s intended operating setup before admitting users.' }, { question: 'Why should maintenance be documented?', answer: 'A simple record connects each repair or inspection to the model and date, helps identify recurring issues, supports staff handover and improves reorder or spare-parts planning.' }],
  },
  'Advertising': {
    decision: 'Build the inflatable around the brand objective and event workflow. Visibility, usable space, artwork placement, access, setup and safety planning all need to be agreed together.',
    checklist: ['Event purpose: sampling, registration, display, hospitality or promotion', 'Footprint, entrance, interior use, audience flow and installation site', 'Vector logos, color references and panel-specific artwork', 'Transport, anchoring, power, packing and target event date'],
    risks: ['Approving visual artwork without the product layout', 'Ignoring seams, entrances and viewing angles in print planning', 'Leaving installation conditions to the final event day'],
    factoryQuestions: ['Which panels are available for branding and how do entrances affect the artwork?', 'What footprint, anchoring and power needs apply at the event site?', 'What approval file will control the final colors, logos and placement?'],
    faqs: [{ question: 'What should a buyer prepare for a branded inflatable project?', answer: 'Provide the event objective, venue conditions, intended internal use, logos in usable artwork format, colors, preferred viewing angles, dimensions, target date and destination for a clear factory proposal.' }, { question: 'Why should branded artwork be approved on a layout?', answer: 'A layout shows how panels, seams, entrances and the physical viewing angle affect the brand message. It prevents a logo placement that looks correct in a flat file but fails on the finished structure.' }],
  },
};

const fallback: BuyerGuideProfile = {
  decision: 'Use this guide as an RFQ preparation tool: confirm the exact model, intended use, destination market, quantity and delivery deadline before comparing quotations.',
  checklist: ['Exact product URL, drawing or reference image', 'Target use, buyer type and destination market', 'Quantity, colors or artwork, and required accessories', 'Target delivery date and requested commercial terms'],
  risks: ['Comparing quotations that do not include the same accessories or packing scope', 'Treating a catalog image as the final approved production specification', 'Requesting market documents without confirming the final model and destination'],
  factoryQuestions: ['Which approved specification will the quotation reference?', 'Which details must be confirmed before production starts?', 'What packed information and inspection record can be provided for this order?'],
  faqs: [{ question: 'Can a catalog page replace an order specification?', answer: 'No. A catalog page is a planning reference. The final quotation and approved order file should confirm the model, dimensions, materials, components, artwork, packing and applicable destination-market requirements.' }, { question: 'What makes a factory quote comparable?', answer: 'Compare products only after the model scope, quantity, accessories, packing, delivery term, destination, production stage and document scope are all stated in writing.' }],
};

export function getBuyerGuideProfile(category: string): BuyerGuideProfile {
  return profiles[category] ?? fallback;
}

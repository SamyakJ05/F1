export type Circuit = {
  slug: "suzuka" | "spa" | "silverstone";
  name: string;
  country: string;
  character: string;
  distance: string;
  turns: string;
  lapType: string;
  intro: string;
  lessons: { title: string; text: string }[];
  fieldNote: string;
  sourceUrl: string;
  officialUrl: string;
};

export const circuits: Circuit[] = [
  {
    slug: "suzuka", name: "Suzuka", country: "Japan", character: "Rhythm and commitment", distance: "5.8 km", turns: "18 turns", lapType: "Figure-eight flow",
    intro: "Suzuka rewards a driver who can connect corners into one continuous thought. Its changing direction asks for patience at entry and total commitment once the car is settled.",
    lessons: [
      { title: "Protect the platform", text: "Fast direction changes punish a car that rolls or pitches too freely. A stable platform gives the driver confidence to carry speed through linked corners." },
      { title: "Release the brake", text: "The lap is not made by braking late everywhere. The important move is releasing the pedal progressively so the front tyre can turn without being overloaded." },
      { title: "Build exits early", text: "Small exit compromises become large losses when the next corner arrives immediately. The fastest line often begins one corner before it looks like it should." },
    ],
    fieldNote: "At a rhythm circuit, the steering wheel should feel like a sentence, not a list of words.",
    sourceUrl: "https://www.formula1.com/en/information/japan-suzuka-international-racing-course.2XjOiKgIHRRBVVpp5N3S5t",
    officialUrl: "https://www.suzukacircuit.jp/eng/",
  },
  {
    slug: "spa", name: "Spa", country: "Belgium", character: "Compression and courage", distance: "7.0 km", turns: "19 turns", lapType: "Elevation-led", 
    intro: "Spa is a study in contrast: long straights, loaded compressions, blind crests and weather that can move the decision window in minutes. It tests a car's efficiency as much as a driver's nerve.",
    lessons: [
      { title: "Use the hill", text: "Elevation changes vertical load. The tyres can gain grip in a compression and lose it over a crest, so the same steering angle can demand a different response a few metres later." },
      { title: "Trade drag for confidence", text: "A low-drag setup protects speed on the long sections, but a nervous rear axle makes a fast uphill sequence expensive. Balance is the real lap-time tool." },
      { title: "Keep a weather margin", text: "At a large circuit, conditions can vary across the lap. Teams need a setup and strategy that leave room for uncertainty rather than optimising for a single perfect moment." },
    ],
    fieldNote: "At an elevation circuit, the track tells the car what grip it has—one metre at a time.",
    sourceUrl: "https://www.formula1.com/en/information/belgium-circuit-de-spa-francorchamps.3LltuYaAXVRU8iezEsjzGw",
    officialUrl: "https://www.spa-francorchamps.be/en",
  },
  {
    slug: "silverstone", name: "Silverstone", country: "United Kingdom", character: "Aero load and precision", distance: "5.9 km", turns: "18 turns", lapType: "High-speed sweepers",
    intro: "Silverstone is where aerodynamic confidence becomes visible. High-speed changes of direction ask the car to generate load consistently while the driver makes millimetre-level corrections at serious speed.",
    lessons: [
      { title: "Trust the airflow", text: "When speed is high, the aero platform carries the corner. If the ride height changes too much, the airflow shifts and the driver loses the predictability needed to stay flat." },
      { title: "Choose a clean arc", text: "Extra steering angle scrubs speed and can unsettle the floor. The quickest route is usually the one that makes the car's path smooth and unhurried." },
      { title: "Make load repeatable", text: "Peak downforce matters less than reliable downforce. A driver can lean on a car that behaves the same way lap after lap." },
    ],
    fieldNote: "At a high-speed circuit, confidence is not a feeling. It is data the driver can repeat.",
    sourceUrl: "https://www.formula1.com/en/information/great-britain-silverstone-circuit.2DtFVI1FjkYgLVdGhbAIv0",
    officialUrl: "https://www.silverstone.co.uk/",
  },
];

export type Story = { slug: string; title: string; tag: string; minutes: string; deck: string; sections: { heading: string; text: string }[] };

export const stories: Story[] = [
  {
    slug: "ground-effect-pressure-into-pace", tag: "AERODYNAMICS", minutes: "08 MIN", title: "How ground effect turns pressure into pace", deck: "The floor is the car's quietest performance device. It works by controlling pressure under the chassis, turning clean airflow into grip.",
    sections: [
      { heading: "Start with the pressure difference", text: "A racing car does not need to be pushed down from above to make grip. Shape the air beneath it so the pressure under the floor is lower than the pressure around the car, and the difference creates load." },
      { heading: "The ride-height trade", text: "The floor works within a narrow window. Too high and the airflow is weak; too low and it can stall or strike the surface. Springs, dampers and driver inputs all influence this moving platform." },
      { heading: "Why it changes the driver", text: "More stable floor load means the driver can enter fast corners with fewer corrections. That is where an aerodynamic concept becomes a lap-time advantage rather than a wind-tunnel number." },
    ],
  },
  {
    slug: "anatomy-of-an-undercut", tag: "RACECRAFT", minutes: "06 MIN", title: "The anatomy of a perfectly timed undercut", deck: "The undercut is a race against degradation. Stop early, unlock fresh-tyre pace, and force the car ahead to respond before its older tyres have taken too much time.",
    sections: [
      { heading: "Create the gap", text: "The move only works if a driver can use the fresh tyre immediately. An out-lap with traffic, a slow warm-up phase or poor pit exit can erase the theoretical advantage." },
      { heading: "Make the rival choose", text: "Pit early and the lead car has a decision: cover now and compromise its own strategy, or stay out and risk losing position once both cars have completed the cycle." },
      { heading: "It is never just one lap", text: "Teams look at a moving picture: tyre age, traffic, warm-up, pit-loss, possible safety cars and how difficult it will be to pass after the stop. The best strategy keeps options alive." },
    ],
  },
  {
    slug: "why-rhythm-matters-at-suzuka", tag: "CIRCUITS", minutes: "11 MIN", title: "Why rhythm matters more than speed at Suzuka", deck: "The quickest lap at Suzuka is often less dramatic than it looks. The car wins time by remaining balanced from one phase to the next.",
    sections: [
      { heading: "Linked corners multiply mistakes", text: "At a stop-start circuit, a small entry error may disappear on the next straight. At Suzuka, a compromised exit becomes a compromised entry almost immediately." },
      { heading: "The car must breathe", text: "A driver manages the load transfer with brake release, steering rate and throttle. The objective is to keep the tyre loaded progressively instead of shocking it with a sudden input." },
      { heading: "A smooth lap can be an aggressive lap", text: "A calm steering trace does not mean a driver is taking it easy. It means every ounce of grip is being spent on speed, not on correcting the car." },
    ],
  },
];

export function getCircuit(slug: string) { return circuits.find((circuit) => circuit.slug === slug); }
export function getStory(slug: string) { return stories.find((story) => story.slug === slug); }

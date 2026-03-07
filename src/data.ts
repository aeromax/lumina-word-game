
export type Node = {
  id: string;
  word: string;
  definition: string;
  neighbors: string[];
};

export type Level = {
  id: string;
  start: string;
  end: string;
  par: number;
  description: string;
};

// A curated graph of high-brow concepts
export const GRAPH: Record<string, Node> = {
  // Chaos -> Order Cluster
  "chaos": {
    id: "chaos",
    word: "Chaos",
    definition: "Complete disorder and confusion.",
    neighbors: ["entropy", "storm", "discord", "void"]
  },
  "entropy": {
    id: "entropy",
    word: "Entropy",
    definition: "Lack of order or predictability; gradual decline into disorder.",
    neighbors: ["chaos", "decay", "randomness", "physics"]
  },
  "storm": {
    id: "storm",
    word: "Storm",
    definition: "A violent disturbance of the atmosphere.",
    neighbors: ["chaos", "rain", "thunder", "tempest"]
  },
  "discord": {
    id: "discord",
    word: "Discord",
    definition: "Disagreement between people.",
    neighbors: ["chaos", "conflict", "noise", "harmony"] // bridge to harmony
  },
  "void": {
    id: "void",
    word: "Void",
    definition: "A completely empty space.",
    neighbors: ["chaos", "emptiness", "silence", "abyss"]
  },
  "decay": {
    id: "decay",
    word: "Decay",
    definition: "Rot or decompose.",
    neighbors: ["entropy", "ruin", "time", "growth"]
  },
  "randomness": {
    id: "randomness",
    word: "Randomness",
    definition: "The quality of lacking a pattern or principle of organization.",
    neighbors: ["entropy", "chance", "luck", "pattern"]
  },
  "tempest": {
    id: "tempest",
    word: "Tempest",
    definition: "A violent windy storm.",
    neighbors: ["storm", "ocean", "wrath", "calm"] // bridge
  },
  "harmony": {
    id: "harmony",
    word: "Harmony",
    definition: "The quality of forming a pleasing and consistent whole.",
    neighbors: ["discord", "music", "balance", "peace"]
  },
  "conflict": {
    id: "conflict",
    word: "Conflict",
    definition: "A serious disagreement or argument.",
    neighbors: ["discord", "war", "battle", "resolution"]
  },
  "pattern": {
    id: "pattern",
    word: "Pattern",
    definition: "A repeated decorative design.",
    neighbors: ["randomness", "structure", "design", "order"]
  },
  "balance": {
    id: "balance",
    word: "Balance",
    definition: "An even distribution of weight enabling someone or something to remain upright.",
    neighbors: ["harmony", "scale", "justice", "symmetry"]
  },
  "structure": {
    id: "structure",
    word: "Structure",
    definition: "The arrangement of and relations between the parts or elements of something complex.",
    neighbors: ["pattern", "building", "foundation", "order"]
  },
  "order": {
    id: "order",
    word: "Order",
    definition: "The arrangement or disposition of people or things in relation to each other according to a particular sequence, pattern, or method.",
    neighbors: ["structure", "law", "peace", "pattern"]
  },
  
  // Silence -> Thunder Cluster (connected via Storm/Void)
  "silence": {
    id: "silence",
    word: "Silence",
    definition: "Complete absence of sound.",
    neighbors: ["void", "quiet", "whisper", "sound"]
  },
  "whisper": {
    id: "whisper",
    word: "Whisper",
    definition: "Speak very softly using one's breath without one's vocal cords.",
    neighbors: ["silence", "secret", "wind", "voice"]
  },
  "sound": {
    id: "sound",
    word: "Sound",
    definition: "Vibrations that travel through the air or another medium and can be heard when they reach a person's or animal's ear.",
    neighbors: ["silence", "music", "noise", "vibration"]
  },
  "thunder": {
    id: "thunder",
    word: "Thunder",
    definition: "A loud rumbling or crashing noise heard after a lightning flash due to the expansion of rapidly heated air.",
    neighbors: ["storm", "lightning", "sound", "crash"]
  },
  "lightning": {
    id: "lightning",
    word: "Lightning",
    definition: "The occurrence of a natural electrical discharge of very short duration and high voltage.",
    neighbors: ["thunder", "flash", "energy", "storm"]
  },
  
  // Ephemeral -> Eternal
  "ephemeral": {
    id: "ephemeral",
    word: "Ephemeral",
    definition: "Lasting for a very short time.",
    neighbors: ["time", "fleeting", "moment", "transient"]
  },
  "fleeting": {
    id: "fleeting",
    word: "Fleeting",
    definition: "Lasting for a very short time.",
    neighbors: ["ephemeral", "fast", "quick", "enduring"]
  },
  "moment": {
    id: "moment",
    word: "Moment",
    definition: "A very brief period of time.",
    neighbors: ["ephemeral", "now", "present", "memory"]
  },
  "time": {
    id: "time",
    word: "Time",
    definition: "The indefinite continued progress of existence and events in the past, present, and future.",
    neighbors: ["ephemeral", "clock", "history", "eternal"] // direct bridge possible but maybe too easy?
  },
  "enduring": {
    id: "enduring",
    word: "Enduring",
    definition: "Continuing or long-lasting.",
    neighbors: ["fleeting", "stone", "strength", "eternal"]
  },
  "eternal": {
    id: "eternal",
    word: "Eternal",
    definition: "Lasting or existing forever; without end or beginning.",
    neighbors: ["time", "god", "infinite", "enduring"]
  },
  "infinite": {
    id: "infinite",
    word: "Infinite",
    definition: "Limitless or endless in space, extent, or size; impossible to measure or calculate.",
    neighbors: ["eternal", "space", "universe", "boundless"]
  },

  // Extra connectors
  "music": { id: "music", word: "Music", definition: "Vocal or instrumental sounds (or both) combined in such a way as to produce beauty of form, harmony, and expression of emotion.", neighbors: ["sound", "harmony", "art", "rhythm"] },
  "noise": { id: "noise", word: "Noise", definition: "A sound, especially one that is loud or unpleasant or that causes disturbance.", neighbors: ["sound", "discord", "city", "pollution"] },
  "peace": { id: "peace", word: "Peace", definition: "Freedom from disturbance; tranquility.", neighbors: ["harmony", "war", "calm", "silence"] },
  "calm": { id: "calm", word: "Calm", definition: "Not showing or feeling nervousness, anger, or other strong emotions.", neighbors: ["peace", "storm", "tempest", "quiet"] },
  "quiet": { id: "quiet", word: "Quiet", definition: "Making little or no noise.", neighbors: ["silence", "calm", "loud", "peace"] },
  
  // Solitude -> Crowd
  "solitude": { id: "solitude", word: "Solitude", definition: "The state or situation of being alone.", neighbors: ["lonely", "peace", "hermit", "crowd"] },
  "crowd": { id: "crowd", word: "Crowd", definition: "A large number of people gathered together in a disorganized or unruly way.", neighbors: ["solitude", "people", "city", "noise"] },
  "city": { id: "city", word: "City", definition: "A large town.", neighbors: ["crowd", "building", "urban", "noise"] },
  "urban": { id: "urban", word: "Urban", definition: "In, relating to, or characteristic of a city or town.", neighbors: ["city", "rural", "modern", "concrete"] },
};

export const LEVELS: Level[] = [
  {
    id: "1",
    start: "chaos",
    end: "order",
    par: 4,
    description: "Find order in the chaos."
  },
  {
    id: "2",
    start: "silence",
    end: "thunder",
    par: 4,
    description: "From a whisper to a roar."
  },
  {
    id: "3",
    start: "ephemeral",
    end: "eternal",
    par: 3,
    description: "Bridge the gap between a moment and forever."
  }
];

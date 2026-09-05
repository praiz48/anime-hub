import { NextResponse } from "next/server";

// Curated list of iconic anime quotes
const QUOTES = [
  {
    anime: "Naruto",
    character: "Naruto Uzumaki",
    quote: "Believe it! I'm going to become Hokage one day!",
  },
  {
    anime: "One Piece",
    character: "Monkey D. Luffy",
    quote: "I'm going to be the Pirate King!",
  },
  {
    anime: "Attack on Titan",
    character: "Eren Yeager",
    quote: "I'll keep moving forward until I destroy my enemies.",
  },
  {
    anime: "Death Note",
    character: "L",
    quote: "I am justice. I protect the innocent and punish the guilty.",
  },
  {
    anime: "Fullmetal Alchemist",
    character: "Edward Elric",
    quote: "Equivalent exchange. That's the law of the world.",
  },
  { anime: "My Hero Academia", character: "All Might", quote: "I AM HERE!" },
  {
    anime: "Demon Slayer",
    character: "Tanjiro Kamado",
    quote: "I will never give up! I'll keep moving forward!",
  },
  {
    anime: "One Punch Man",
    character: "Saitama",
    quote: "I'm just a hero who does this for fun.",
  },
  {
    anime: "Jujutsu Kaisen",
    character: "Satoru Gojo",
    quote: "I'm the strongest.",
  },
  {
    anime: "Hunter x Hunter",
    character: "Gon Freecss",
    quote: "I'll do my best! I'll never give up!",
  },
  {
    anime: "Cowboy Bebop",
    character: "Spike Spiegel",
    quote: "Whatever happens, happens.",
  },
  {
    anime: "Dragon Ball Z",
    character: "Goku",
    quote: "I am the hope of the universe!",
  },
  {
    anime: "Sailor Moon",
    character: "Usagi Tsukino",
    quote: "In the name of the moon, I'll punish you!",
  },
  {
    anime: "Spy x Family",
    character: "Loid Forger",
    quote: "For the mission.",
  },
  {
    anime: "Chainsaw Man",
    character: "Denji",
    quote: "I want to touch some boobs!",
  },
  {
    anime: "Neon Genesis Evangelion",
    character: "Shinji Ikari",
    quote: "I mustn't run away.",
  },
  {
    anime: "Ghost in the Shell",
    character: "Motoko Kusanagi",
    quote: "My ghost is drifting away.",
  },
  {
    anime: "Mob Psycho 100",
    character: "Shigeo Kageyama",
    quote: "I've always known I'm not special.",
  },
  { anime: "Vinland Saga", character: "Thorfinn", quote: "I have no enemies." },
  {
    anime: "Kaguya-sama",
    character: "Miyuki Shirogane",
    quote: "The first one to confess loses.",
  },
  {
    anime: "Berserk",
    character: "Guts",
    quote: "I struggle, I conquer, I endure.",
  },
  {
    anime: "Steins;Gate",
    character: "Okabe Rintaro",
    quote: "El Psy Kongroo.",
  },
  {
    anime: "Code Geass",
    character: "Lelouch vi Britannia",
    quote: "I destroy the world... and create it anew.",
  },
  {
    anime: "Fate/Zero",
    character: "Kiritsugu Emiya",
    quote: "I will save everyone. That's what I've decided.",
  },
  {
    anime: "Gurren Lagann",
    character: "Kamina",
    quote: "Don't believe in yourself. Believe in me who believes in you!",
  },
];

export async function GET() {
  // Pick a random quote
  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  // Add a small delay to simulate API call (optional)
  // await new Promise(resolve => setTimeout(resolve, 100));

  return NextResponse.json(randomQuote);
}

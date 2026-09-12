import { NextResponse } from "next/server";

// Curated list of iconic anime quotes
const QUOTES = [
  {
    anime: "Naruto",
    character: "Naruto Uzumaki",
    quote: "Believe it!",
  },
  {
    anime: "One Piece",
    character: "Monkey D. Luffy",
    quote: "I'm gonna be King of the Pirates!",
  },
  {
    anime: "Attack on Titan",
    character: "Erwin Smith",
    quote: "My soldiers, rage!",
  },
  {
    anime: "Death Note",
    character: "Light Yagami",
    quote: "I am Kira.",
  },
  {
    anime: "Fullmetal Alchemist: Brotherhood",
    character: "Edward Elric",
    quote: "Who are you calling so short you can't see him?",
  },
  {
    anime: "My Hero Academia",
    character: "All Might",
    quote: "I AM HERE!",
  },
  {
    anime: "Demon Slayer",
    character: "Tanjiro Kamado",
    quote: "Set your heart ablaze!",
  },
  {
    anime: "One Punch Man",
    character: "Saitama",
    quote: "I'm just a guy who's a hero for fun.",
  },
  {
    anime: "Jujutsu Kaisen",
    character: "Satoru Gojo",
    quote: "Throughout heaven and earth, I alone am the honored one.",
  },
  {
    anime: "Hunter x Hunter",
    character: "Gon Freecss",
    quote: "I'll kill you!",
  },
  {
    anime: "Cowboy Bebop",
    character: "Spike Spiegel",
    quote: "Whatever happens, happens.",
  },
  {
    anime: "Dragon Ball Z",
    character: "Goku",
    quote: "I'm the hope of the universe.",
  },
  {
    anime: "Sailor Moon",
    character: "Usagi Tsukino",
    quote: "In the name of the Moon, I'll punish you!",
  },
  {
    anime: "Spy x Family",
    character: "Loid Forger",
    quote: "For the sake of world peace.",
  },
  {
    anime: "Chainsaw Man",
    character: "Denji",
    quote: "I wanna touch some boobs!",
  },
  {
    anime: "Neon Genesis Evangelion",
    character: "Shinji Ikari",
    quote: "I mustn't run away.",
  },
  {
    anime: "Ghost in the Shell",
    character: "Motoko Kusanagi",
    quote: "The net is vast and infinite.",
  },
  {
    anime: "Mob Psycho 100",
    character: "Reigen Arataka",
    quote: "You are being deceived.",
  },
  {
    anime: "Vinland Saga",
    character: "Thorfinn",
    quote: "I have no enemies.",
  },
  {
    anime: "Kaguya-sama: Love Is War",
    character: "Narrator",
    quote: "The first one to confess loses.",
  },
  {
    anime: "Berserk",
    character: "Guts",
    quote: "I have yet to find what I'm looking for.",
  },
  {
    anime: "Steins;Gate",
    character: "Rintarou Okabe",
    quote: "El Psy Kongroo.",
  },
  {
    anime: "Code Geass",
    character: "Lelouch vi Britannia",
    quote: "The only ones who should kill are those prepared to be killed.",
  },
  {
    anime: "Fate/Zero",
    character: "Gilgamesh",
    quote: "Enkidu!",
  },
  {
    anime: "Gurren Lagann",
    character: "Kamina",
    quote: "Believe in the me that believes in you!",
  },
  {
    anime: "Bleach",
    character: "Ichigo Kurosaki",
    quote: "Bankai!",
  },
  {
    anime: "JoJo's Bizarre Adventure",
    character: "Dio Brando",
    quote: "ZA WARUDO!",
  },
  {
    anime: "JoJo's Bizarre Adventure",
    character: "Jotaro Kujo",
    quote: "Yare yare daze.",
  },
  {
    anime: "Dragon Ball Z",
    character: "Vegeta",
    quote: "It's over 9000!",
  },
  {
    anime: "Naruto",
    character: "Rock Lee",
    quote: "I will never go back on my word.",
  },
  {
    anime: "One Piece",
    character: "Roronoa Zoro",
    quote: "Nothing happened.",
  },
  {
    anime: "One Piece",
    character: "Sanji",
    quote: "I have a gentleman's code.",
  },
  {
    anime: "Attack on Titan",
    character: "Levi Ackerman",
    quote: "Give up on your dreams and die.",
  },
  {
    anime: "Death Note",
    character: "Light Yagami",
    quote: "I'll take a potato chip... and eat it!",
  },
  {
    anime: "Naruto",
    character: "Kakashi Hatake",
    quote: "Those who break the rules are scum.",
  },
  {
    anime: "Demon Slayer",
    character: "Rengoku",
    quote: "Set your heart ablaze!",
  },
  {
    anime: "Jujutsu Kaisen",
    character: "Satoru Gojo",
    quote: "Throughout heaven and earth, I alone am the honored one.",
  },
  {
    anime: "Code Geass",
    character: "Lelouch vi Britannia",
    quote: "I, Lelouch vi Britannia, command you!",
  },
  {
    anime: "Black Clover",
    character: "Asta",
    quote: "My magic is never giving up!",
  },
  {
    anime: "Haikyuu!!",
    character: "Shoyo Hinata",
    quote: "I am Hinata Shoyo, from the concrete!",
  },
];

export async function GET() {
  // Pick a random quote
  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  // Add a small delay to simulate API call (optional)
  // await new Promise(resolve => setTimeout(resolve, 100));

  return NextResponse.json(randomQuote);
}

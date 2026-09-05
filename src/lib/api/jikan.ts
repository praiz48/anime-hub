const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

// Types
export interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
  };
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to: string;
    prop: {
      from: { day: number; month: number; year: number };
      to: { day: number; month: number; year: number };
    };
  };
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers: Array<{ mal_id: number; type: string; name: string; url: string }>;
  licensors: Array<{ mal_id: number; type: string; name: string; url: string }>;
  studios: Array<{ mal_id: number; type: string; name: string; url: string }>;
  genres: Array<{ mal_id: number; type: string; name: string; url: string }>;
  explicit_genres: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  themes: Array<{ mal_id: number; type: string; name: string; url: string }>;
  demographics: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

// Fetch functions

export async function fetchSeasonalAnime(limit: number = 8) {
  // /seasons/now doesn't accept limit parameter directly
  const response = await fetch(`${JIKAN_BASE_URL}/seasons/now`);
  if (!response.ok) throw new Error("Failed to fetch seasonal anime");
  const data = await response.json();
  // Return the first 'limit' items
  return data.data.slice(0, limit);
}

export async function fetchTrendingAnime(limit: number = 8) {
  // Use filter=airing for currently airing
  const response = await fetch(`${JIKAN_BASE_URL}/top/anime?filter=airing`);
  if (!response.ok) throw new Error("Failed to fetch trending anime");
  const data = await response.json();
  return data.data.slice(0, limit);
}

export async function fetchTopRatedAnime(limit: number = 8) {
  // Use filter=bypopularity for most popular
  const response = await fetch(
    `${JIKAN_BASE_URL}/top/anime?filter=bypopularity`,
  );
  if (!response.ok) throw new Error("Failed to fetch top rated anime");
  const data = await response.json();
  return data.data.slice(0, limit);
}

// Replace fetchHiddenGems with this

// src/lib/api/jikan.ts - Updated fetchHiddenGems

export async function fetchHiddenGems(limit: number = 8) {
  try {
    // Try multiple genres to get varied "hidden gem" results
    const hiddenGemGenreIds = [27, 28, 24, 32]; // Shounen, Comedy, Sci-Fi, Adventure

    // Randomly pick a genre
    const randomGenre =
      hiddenGemGenreIds[Math.floor(Math.random() * hiddenGemGenreIds.length)];

    // Fetch anime from that genre with low popularity
    const response = await fetch(
      `${JIKAN_BASE_URL}/anime?genres=${randomGenre}&order_by=popularity&sort=asc&limit=${limit}&sfw=true`,
    );

    if (!response.ok) {
      // Fallback: just get random anime
      const fallbackResponse = await fetch(`${JIKAN_BASE_URL}/random/anime`);
      if (!fallbackResponse.ok) {
        // If all fails, return empty
        return [];
      }
      const fallbackData = await fallbackResponse.json();
      return fallbackData.data ? [fallbackData.data] : [];
    }

    const data = await response.json();

    // Filter out entries without images or with low scores
    const filtered =
      data.data?.filter(
        (anime: Anime) =>
          anime.images?.jpg?.image_url && anime.score && anime.score > 6, // Only show decently rated anime
      ) || [];

    return filtered.slice(0, limit);
  } catch (error) {
    console.error("Error fetching hidden gems:", error);
    return [];
  }
}

export async function fetchRandomAnime() {
  const response = await fetch(`${JIKAN_BASE_URL}/random/anime`);
  if (!response.ok) throw new Error("Failed to fetch random anime");
  const data = await response.json();
  return data.data;
}

export async function fetchAnimeDetails(id: string) {
  const response = await fetch(`${JIKAN_BASE_URL}/anime/${id}/full`);
  if (!response.ok) throw new Error("Failed to fetch anime details");
  const data = await response.json();
  return data.data;
}

export async function fetchAnimeCharacters(id: string) {
  const response = await fetch(`${JIKAN_BASE_URL}/anime/${id}/characters`);
  if (!response.ok) throw new Error("Failed to fetch anime characters");
  const data = await response.json();
  return data.data;
}

export async function fetchAnimeRecommendations(id: string) {
  const response = await fetch(`${JIKAN_BASE_URL}/anime/${id}/recommendations`);
  if (!response.ok) throw new Error("Failed to fetch anime recommendations");
  const data = await response.json();
  return data.data;
}

export async function searchAnime(
  query: string,
  page: number = 1,
  limit: number = 20,
) {
  const response = await fetch(
    `${JIKAN_BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
  );
  if (!response.ok) throw new Error("Failed to search anime");
  const data = await response.json();
  return data;
}

export async function fetchAnimeByGenre(
  genreId: number,
  page: number = 1,
  limit: number = 20,
) {
  const response = await fetch(
    `${JIKAN_BASE_URL}/anime?genres=${genreId}&page=${page}&limit=${limit}`,
  );
  if (!response.ok) throw new Error("Failed to fetch anime by genre");
  const data = await response.json();
  return data;
}

export async function fetchAnimeGenres() {
  const response = await fetch(`${JIKAN_BASE_URL}/genres/anime`);
  if (!response.ok) throw new Error("Failed to fetch genres");
  const data = await response.json();
  return data.data;
}

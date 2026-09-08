import { request, gql } from "graphql-request";
import { rateLimiter } from "./rateLimit";
const ANILIST_API = "https://graphql.anilist.co";

// Types
export interface AniListMedia {
  id: number;
  title: {
    romaji: string;
    english: string | null;
    native: string | null;
  };
  coverImage: {
    large: string;
    medium: string;
  };
  bannerImage?: string | null;
  description?: string;
  episodes?: number;
  status?: string;
  averageScore?: number;
  popularity?: number;
  genres: string[];
  season?: string;
  seasonYear?: number;
  startDate?: {
    year: number;
    month: number;
    day: number;
  };
  nextAiringEpisode?: {
    episode: number;
    airingAt: number;
  };
  studios?: {
    nodes: Array<{ name: string }>;
  };
  characters?: {
    edges: Array<{
      node: {
        id: number;
        name: { full: string };
        image: { large: string };
      };
      role: string;
    }>;
  };
  recommendations?: {
    nodes: Array<{
      mediaRecommendation: {
        id: number;
        title: { romaji: string };
        coverImage: { large: string };
      };
    }>;
  };
  relations?: {
    edges: Array<{
      relationType: string;
      node: {
        id: number;
        title: { romaji: string };
        coverImage: { large: string };
      };
    }>;
  };
  trailer?: {
    id: string;
    site: string;
    thumbnail: string;
  };
}

export interface PageResponse {
  Page: {
    media: AniListMedia[];
    pageInfo: {
      total: number;
      currentPage: number;
      lastPage: number;
      hasNextPage: boolean;
      perPage: number;
    };
  };
}

// GraphQL Queries
export const QUERIES = {
  // Trending Anime
  trending: gql`
    query GetTrendingAnime($page: Int = 1, $perPage: Int = 8) {
      Page(page: $page, perPage: $perPage) {
        media(sort: TRENDING_DESC, type: ANIME, status: RELEASING) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
          }
          bannerImage
          episodes
          status
          averageScore
          popularity
          genres
          description(asHtml: false)
          startDate {
            year
            month
            day
          }
          nextAiringEpisode {
            episode
            airingAt
          }
        }
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
      }
    }
  `,

  // Seasonal Anime
  seasonal: gql`
    query GetSeasonalAnime(
      $season: MediaSeason
      $seasonYear: Int
      $page: Int = 1
      $perPage: Int = 8
    ) {
      Page(page: $page, perPage: $perPage) {
        media(
          season: $season
          seasonYear: $seasonYear
          type: ANIME
          sort: POPULARITY_DESC
          isAdult: false
        ) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
          }
          episodes
          status
          averageScore
          popularity
          genres
          description(asHtml: false)
        }
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
      }
    }
  `,

  // Top Rated Anime
  topRated: gql`
    query GetTopRatedAnime($page: Int = 1, $perPage: Int = 8) {
      Page(page: $page, perPage: $perPage) {
        media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
          }
          episodes
          status
          averageScore
          popularity
          genres
          description(asHtml: false)
        }
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
      }
    }
  `,

  // Hidden Gems (less popular but high quality)
  hiddenGems: gql`
    query GetHiddenGems($page: Int = 3, $perPage: Int = 8) {
      Page(page: $page, perPage: $perPage) {
        media(
          sort: POPULARITY_DESC
          type: ANIME
          isAdult: false
          averageScore_greater: 75
        ) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
          }
          episodes
          status
          averageScore
          popularity
          genres
          description(asHtml: false)
        }
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
      }
    }
  `,

  // Anime Details
  details: gql`
    query GetAnimeDetails($id: Int!) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        description(asHtml: false)
        coverImage {
          large
          medium
        }
        bannerImage
        episodes
        status
        averageScore
        popularity
        genres
        season
        seasonYear
        studios {
          nodes {
            name
          }
        }
        characters(sort: ROLE, perPage: 6) {
          edges {
            node {
              id
              name {
                full
              }
              image {
                large
              }
            }
            role
          }
        }
        recommendations(perPage: 6) {
          nodes {
            mediaRecommendation {
              id
              title {
                romaji
                english
              }
              coverImage {
                large
              }
              averageScore
            }
          }
        }
        relations {
          edges {
            relationType
            node {
              id
              title {
                romaji
                english
              }
              coverImage {
                large
              }
            }
          }
        }
        trailer {
          id
          site
          thumbnail
        }
      }
    }
  `,

  search: gql`
    query SearchAnime($search: String, $page: Int = 1, $perPage: Int = 20) {
      Page(page: $page, perPage: $perPage) {
        media(search: $search, type: ANIME, isAdult: false) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
          }
          episodes
          status
          averageScore
          popularity
          genres
          description(asHtml: false)
          season
          seasonYear
          startDate {
            year
            month
            day
          }
        }
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
      }
    }
  `,
  // Add this new query for browsing without search
  browse: gql`
    query BrowseAnime(
      $page: Int = 1
      $perPage: Int = 20
      $genre: [String]
      $status: MediaStatus
      $season: MediaSeason
      $seasonYear: Int
      $sort: [MediaSort] = [POPULARITY_DESC]
    ) {
      Page(page: $page, perPage: $perPage) {
        media(
          type: ANIME
          genre_in: $genre
          status: $status
          season: $season
          seasonYear: $seasonYear
          sort: $sort
          isAdult: false
        ) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
          }
          episodes
          status
          averageScore
          popularity
          genres
          description(asHtml: false)
          season
          seasonYear
          startDate {
            year
            month
            day
          }
        }
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
      }
    }
  `,
  // Random Anime
  random: gql`
    query GetRandomAnime {
      Page(page: 1, perPage: 1) {
        media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
          }
          averageScore
          popularity
          genres
          description(asHtml: false)
        }
      }
    }
  `,
};

// Helper function to get current season
export function getCurrentSeason(): { season: string; year: number } {
  const now = new Date();
  const month = now.getMonth(); // getMonth() returns 0-11 and anilist accounted for it
  const year = now.getFullYear();

  let season: string;
  if (month >= 3 && month <= 5) season = "SPRING";
  else if (month >= 6 && month <= 8) season = "SUMMER";
  else if (month >= 9 && month <= 11) season = "FALL";
  else season = "WINTER";

  return { season, year };
}
export function getNextSeason(): { season: string; year: number } {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  let season: string;
  if (month >= 3 && month <= 5) season = "SPRING";
  else if (month >= 6 && month <= 8) season = "SUMMER";
  else if (month >= 9 && month <= 11) season = "FALL";
  else season = "WINTER";

  return { season, year };
}

// Service functions
export async function fetchTrendingAnime(perPage: number = 8) {
  return rateLimiter.add(async () => {
    const variables = { page: 1, perPage };
    const data = await request<{ Page: PageResponse["Page"] }>(
      ANILIST_API,
      QUERIES.trending,
      variables,
    );
    return data.Page.media;
  });
}

export async function fetchSeasonalAnime(perPage: number = 8) {
  return rateLimiter.add(async () => {
    const { season, year } = getCurrentSeason();
    const variables = {
      season: season.toUpperCase(),
      seasonYear: year,
      page: 1,
      perPage,
    };
    const data = await request<{ Page: PageResponse["Page"] }>(
      ANILIST_API,
      QUERIES.seasonal,
      variables,
    );
    return data.Page.media;
  });
}
export async function fetchNextSeasonalAnime(perPage: number = 8) {
  return rateLimiter.add(async () => {
    const { season, year } = getNextSeason();
    const variables = {
      season: season.toUpperCase(),
      seasonYear: year,
      page: 1,
      perPage,
    };
    const data = await request<{ Page: PageResponse["Page"] }>(
      ANILIST_API,
      QUERIES.seasonal,
      variables,
    );
    return data.Page.media;
  });
}

export async function fetchTopRatedAnime(perPage: number = 8) {
  return rateLimiter.add(async () => {
    const variables = { page: 1, perPage };
    const data = await request<{ Page: PageResponse["Page"] }>(
      ANILIST_API,
      QUERIES.topRated,
      variables,
    );
    return data.Page.media;
  });
}

export async function fetchHiddenGems(perPage: number = 8) {
  return rateLimiter.add(async () => {
    const variables = { page: 3, perPage };
    const data = await request<{ Page: PageResponse["Page"] }>(
      ANILIST_API,
      QUERIES.hiddenGems,
      variables,
    );
    return data.Page.media;
  });
}

export async function fetchAnimeDetails(id: number) {
  return rateLimiter.add(async () => {
    const variables = { id };
    const data = await request<{ Media: AniListMedia }>(
      ANILIST_API,
      QUERIES.details,
      variables,
    );
    return data.Media;
  });
}

// Search function - Now only handles search, no conditional logic
export async function searchAnime(
  search: string,
  page: number = 1,
  perPage: number = 20,
) {
  // If no search query, return empty results
  if (!search || search.trim().length === 0) {
    return {
      media: [],
      pageInfo: {
        total: 0,
        currentPage: 1,
        lastPage: 1,
        hasNextPage: false,
        perPage,
      },
    };
  }

  const variables = {
    search: search.trim(),
    page,
    perPage,
  };

  try {
    const data = await request<{ Page: PageResponse["Page"] }>(
      ANILIST_API,
      QUERIES.search,
      variables,
    );
    return data.Page;
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
}

// Browse function - Pure browsing with filters
export async function browseAnime(
  page: number = 1,
  perPage: number = 20,
  filters?: {
    genre?: string;
    status?: string;
    season?: string;
    seasonYear?: number;
    sort?: string;
  },
) {
  const variables = {
    page,
    perPage,
    genre: filters?.genre ? [filters.genre] : null,
    status: filters?.status || null,
    season: filters?.season || null,
    seasonYear: filters?.seasonYear || null,
    sort: filters?.sort ? [filters.sort as any] : ["POPULARITY_DESC"],
  };

  try {
    const data = await request<{ Page: PageResponse["Page"] }>(
      ANILIST_API,
      QUERIES.browse,
      variables,
    );
    return data.Page;
  } catch (error) {
    console.error("Browse error:", error);
    throw error;
  }
}

export async function fetchRandomAnime() {
  return rateLimiter.add(async () => {
    const data = await request<{ Page: PageResponse["Page"] }>(
      ANILIST_API,
      QUERIES.random,
      {},
    );
    return data.Page.media[0] || null;
  });
}

const STORAGE_KEY = "anime_favorites";

export function getFavorites(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addFavorite(id: number): void {
  if (typeof window === "undefined") return;
  try {
    const favorites = getFavorites();
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
}

export function removeFavorite(id: number): void {
  if (typeof window === "undefined") return;
  try {
    const favorites = getFavorites();
    const updated = favorites.filter((favId) => favId !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
}

export function isFavorite(id: number): boolean {
  if (typeof window === "undefined") return false;
  try {
    const favorites = getFavorites();
    return favorites.includes(id);
  } catch {
    return false;
  }
}

export function toggleFavorite(id: number): void {
  if (typeof window === "undefined") return;
  try {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
}

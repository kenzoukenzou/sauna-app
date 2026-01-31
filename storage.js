'use strict';

const STORAGE_KEY = 'sauna_liked_v1';

export function loadLikedMap() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

export function saveLikedMap(likedMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(likedMap));
}

export function applyLikedFromStorage(saunas) {
  const likedMap = loadLikedMap();
  saunas.forEach(sauna => {
    if (typeof likedMap[sauna.name] === 'boolean') {
      sauna.liked = likedMap[sauna.name];
    }
  });
}

export function updateLikedInStorage(sauna) {
  const likedMap = loadLikedMap();
  likedMap[sauna.name] = sauna.liked;
  saveLikedMap(likedMap);
}

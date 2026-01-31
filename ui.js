'use strict';

import { updateLikedInStorage } from './storage.js';

let saunas = [];
let markersRef = [];

export function setSaunas(data) {
  saunas = data;
}

export function setMarkersRef(markers) {
  markersRef = markers;
}

export function renderSaunas(list) {
  const ul = document.getElementById('sauna-list');
  ul.innerHTML = '';

  list.forEach(sauna => {
    const li = document.createElement('li');
    li.className = 'sauna-card';

    li.innerHTML = `
      <h2>${sauna.name}</h2>
      <p>🔥 サウナ温度：${sauna.temp ? sauna.temp + '℃' : '不明'}</p>
      <p>${sauna.star ? '⭐'.repeat(sauna.star) : ''}</p>
      <p>💧 水風呂温度：${sauna.water ? sauna.water + '℃' : '不明'}</p>
      <button class="like-btn">
        ${sauna.liked ? '💗 行きたい' : '♡ 行きたい'}
      </button>
    `;

    const btn = li.querySelector('.like-btn');
    btn.addEventListener('click', () => {
      sauna.liked = !sauna.liked;
      updateLikedInStorage(sauna);
      refreshUI();
    });

    ul.appendChild(li);
  });
}

function getFilteredSaunas() {
  const keyword = document.getElementById('search').value;
  const onlyLiked = document.getElementById('only-liked').checked;

  return saunas.filter(sauna => {
    const matchKeyword = sauna.name.includes(keyword);
    const matchLiked = !onlyLiked || sauna.liked;
    return matchKeyword && matchLiked;
  });
}

export function refreshUI() {
  const filtered = getFilteredSaunas();
  renderSaunas(filtered);

  markersRef.forEach(m => {
    const visible = filtered.some(sauna => sauna.name === m.name);
    m.marker.setVisible(visible);
  });
}

export function bindUIEvents() {
  document.getElementById('search').addEventListener('input', refreshUI);
  document.getElementById('only-liked').addEventListener('change', refreshUI);
}

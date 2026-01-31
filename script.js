'use strict';

import './map.js';
import { applyLikedFromStorage } from './storage.js';
import { setSaunas, bindUIEvents, refreshUI } from './ui.js';

const initialSaunas = [
  { name: '毎日サウナ越谷', temp: 100, star: 5, water: 15, liked: false, lat: 35.8906, lng: 139.7906 },
  { name: 'しきじ', temp: 120, star: 4, water: 12, liked: false, lat: 34.9756, lng: 138.3831 },
  { name: 'かるまる', temp: 95, star: 3, water: 13, liked: false, lat: 35.7289, lng: 139.7109 },
];

setSaunas(initialSaunas);
applyLikedFromStorage(initialSaunas);
bindUIEvents();
refreshUI();

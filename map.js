'use strict';

import { updateLikedInStorage, loadLikedMap } from './storage.js';
import { refreshUI, setMarkersRef } from './ui.js';

let map;
let placesService;
let markers = [];

function addSaunaMarker(sauna) {
  const marker = new google.maps.Marker({
    position: { lat: sauna.lat, lng: sauna.lng },
    map,
    title: sauna.name,
  });

  marker.addListener('click', () => {
    sauna.liked = !sauna.liked;
    updateLikedInStorage(sauna);
    refreshUI();
  });

  markers.push({ name: sauna.name, marker });
}

function searchNearbySaunas() {
  const request = {
    location: map.getCenter(),
    radius: 3000,
    query: 'サウナ',
  };

  placesService.textSearch(request, (results, status) => {
    if (status !== google.maps.places.PlacesServiceStatus.OK) return;
    results.forEach(place => {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      addSaunaMarker({
        name: place.name,
        temp: 0,
        water: 0,
        star: 0,
        liked: false,
        lat,
        lng,
      });
    });
  });
}

export function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: { lat: 35.681236, lng: 139.767125 },
  });

  placesService = new google.maps.places.PlacesService(map);
  setMarkersRef(markers);

  document.getElementById('nearby').addEventListener('click', searchNearbySaunas);
}

function waitGoogleMapsLoaded() {
  return new Promise(resolve => {
    const timer = setInterval(() => {
      if (window.google && window.google.maps) {
        clearInterval(timer);
        resolve();
      }
    }, 50);
  });
}

waitGoogleMapsLoaded().then(() => {
  initMap();
});

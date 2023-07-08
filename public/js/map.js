/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);

const map = L.map('map', {
  scrollWheelZoom: false,
});

L.tileLayer(
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

const latLngs = [];
const markers = [];

locations.forEach(loc => {
  const [lng, lat] = loc.coordinates;
  const customIcon = L.icon({
    iconUrl: '../img/pin.png',
    className: 'icon-marker',
    popupAnchor: [15, 5],
  });

  // Add marker and Popup
  const marker = L.marker([lat, lng], { icon: customIcon })
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'popup',
      })
    )
    .setPopupContent(`Day ${loc.day}: ${loc.description}`)
    .openPopup();

  markers.push(marker);

  latLngs.push(L.latLng(lat, lng));
});

// Bound the locations
const bounds = L.latLngBounds(latLngs);
map
  .fitBounds(bounds, {
    padding: [100, 200],
    animate: true,
  })
  .setMinZoom(3);

// To load all the popups when map is loaded
markers.forEach(marker => {
  marker.openPopup();
});

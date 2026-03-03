 const map = L.map('map', {
      center: [38.9637, 35.2433],
      zoom: 6,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors, © CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    const createIcon = (color) => L.divIcon({
      className: '',
      html: `<div style="
        width:16px; height:16px;
        background:${color};
        border-radius:50%;
        border:2px solid rgba(255,255,255,0.4);
        box-shadow:0 0 12px ${color}, 0 0 24px ${color}55;
      "></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    L.marker([39.9334, 32.8597], { icon: createIcon('#6c63ff') })
      .addTo(map)
      .bindPopup('<b>Ankara</b>');

    L.marker([38.3552, 38.3095], { icon: createIcon('#ff6584') })
      .addTo(map)
      .bindPopup('<b>Malatya</b>');

    

    L.marker([38.6748, 39.2225], { icon: createIcon('#43e97b') })
      .addTo(map)
      .bindPopup('<b>Elazığ — Fırat Üniversitesi</b>');

    // Pulse animation on markers
    const style = document.createElement('style');
    style.textContent = `
      .leaflet-popup-content-wrapper {
        background: #1a1a26;
        color: #e8e8f0;
        border: 1px solid #2a2a3d;
        border-radius: 0;
        font-family: 'DM Mono', monospace;
        font-size: 12px;
      }
      .leaflet-popup-tip { background: #1a1a26; }
      .leaflet-popup-content b { color: #6c63ff; }
    `;
 
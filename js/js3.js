   
    const map = L.map('map', { center: [39.9075, 32.8597], zoom: 13 });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors, © CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Pulse marker
    const pulseIcon = L.divIcon({
      className: '',
      html: `
        <div style="position:relative; width:30px; height:30px;">
          <div style="
            position:absolute; inset:0;
            background:#6c63ff;
            border-radius:50%;
            animation:mapPulse 2s ease-out infinite;
            opacity:0.4;
          "></div>
          <div style="
            position:absolute; top:50%; left:50%;
            width:12px; height:12px;
            transform:translate(-50%,-50%);
            background:#6c63ff;
            border-radius:50%;
            border:2px solid white;
            box-shadow:0 0 12px #6c63ff;
          "></div>
        </div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    const style = document.createElement('style');
    style.textContent = `
      @keyframes mapPulse {
        0% { transform: scale(0.5); opacity:0.7; }
        100% { transform: scale(2.5); opacity:0; }
      }
      .leaflet-popup-content-wrapper {
        background:#1a1a26;
        color:#e8e8f0;
        border:1px solid #2a2a3d;
        border-radius:0;
        font-family:'DM Mono',monospace;
        font-size:12px;
      }
      .leaflet-popup-tip { background:#1a1a26; }
      .leaflet-popup-content b { color:#6c63ff; }
    `;
    document.head.appendChild(style);

    L.marker([39.9075, 32.8597], { icon: pulseIcon })
      .addTo(map)
      .bindPopup('<b>Emre Erdem</b><br>📍 Çankaya, Ankara<br>Yazılım Mühendisi')
      .openPopup();

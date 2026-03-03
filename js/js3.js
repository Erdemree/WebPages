   
 


 
    // Map — Ankara odaklı
    const map = L.map('map', { center: [39.88, 32.78], zoom: 11 });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '',
      subdomains: 'abcd',
      maxZoom: 65
    }).addTo(map);

    // Popup & marker styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes mapPulse {
        0% { transform: scale(0.5); opacity:0.8; }
        100% { transform: scale(3); opacity:0; }
      }
      .leaflet-popup-content-wrapper {
        background:#1a1a26; color:#e8e8f0;
        border:1px solid #2a2a3d; border-radius:0;
        font-family:'DM Mono',monospace; font-size:12px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.6);
      }
      .leaflet-popup-tip { background:#1a1a26; }
      .leaflet-popup-content b { color:#6c63ff; display:block; margin-bottom:4px; font-size:13px; }
      .net-dot { position:relative; display:inline-block; }
      .net-dot-pulse {
        position:absolute; inset:-6px;
        border-radius:50%;
        animation: mapPulse 2s ease-out infinite;
      }
    `;
    document.head.appendChild(style);

    // Nokta oluşturucu
    function netIcon(color, size = 14) {
      return L.divIcon({
        className: '',
        html: `<div class="net-dot" style="width:${size}px;height:${size}px;">
          <div class="net-dot-pulse" style="background:${color};"></div>
          <div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid #1a1a26;box-shadow:0 0 10px ${color}99;"></div>
        </div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });
    }

    // ── VERİLER ──
    const nodes = {
      edu: [
        { latlng: [38.6748, 39.2225], label: 'Elazığ', desc: '', color: '#43e97b' },
     
      ],
      work: [
        { latlng: [39.9334, 32.8597], label: 'Ankara', desc: '', color: '#6c63ff' },
         
        { latlng: [40.9923, 29.1244], label: 'İstanbul', desc: '', color: '#6c63ff' },
      ],
      life: [
       
        { latlng: [38.3552, 38.3095], label: 'Malatya', desc: '', color: '#ff6584' },
      ]
    };

    // Çizgiler — düz (work) ve noktalı (edu/life) karışımı
    const lines = [
      // Ankara - Elazığ  
      { points: [[38.3552,38.3095],[38.6748,39.2225]], color:'#43e97b', dash:'8,8', weight:1.5 },
      // Ankara - Malatya  
      { points: [[39.9334,32.8597],[38.3552,38.3095]], color:'#ff6584', dash:'4,4', weight:1.5 },
      // Ankara  
      { points: [[38.3552,38.3095],[40.9923, 29.1244]], color:'#6c63ff', dash:'8,8', weight:2 },
      // Malatya  
      { points: [[38.6748, 39.2225],[40.9923, 29.1244]], color:'#6c63ff', dash:'8,8', weight:2 },
      // Malatya  
     // { points: [[38.3552,38.3095],[40.9923, 29.1244]], color:'#6c63ff', dash:'4,4', weight:1.5 },
    ];

    // Layer grupları
    const layers = { edu: L.layerGroup(), work: L.layerGroup(), life: L.layerGroup() };
    const lineLayer = L.layerGroup().addTo(map);
    const layerState = { edu: true, work: true, life: true };

    // Çizgileri ekle
    lines.forEach(l => {
      const opts = { color: l.color, weight: l.weight, opacity: 0.7 };
      if (l.dash) opts.dashArray = l.dash;
      L.polyline(l.points, opts).addTo(lineLayer);
    });

    // Noktaları ekle
    Object.entries(nodes).forEach(([type, pts]) => {
      pts.forEach(p => {
        L.marker(p.latlng, { icon: netIcon(p.color, 14) })
          .bindPopup(`<b>${p.label}</b><span style="color:#9999bb;line-height:1.6;">${p.desc}</span>`)
          .addTo(layers[type]);
      });
      layers[type].addTo(map);
    });

    // Koordinat okuma
    map.on('click', e => {
      document.getElementById('coordsDisplay').textContent =
        `📍 Lat: ${e.latlng.lat.toFixed(5)}, Lng: ${e.latlng.lng.toFixed(5)}`;
    });

    // Filtre toggle
    function toggleLayer(type) {
      layerState[type] = !layerState[type];
      const btn = document.getElementById('btn' + type.charAt(0).toUpperCase() + type.slice(1));
      if (layerState[type]) {
        layers[type].addTo(map);
        btn.classList.add(type + '-active');
      } else {
        map.removeLayer(layers[type]);
        btn.classList.remove(type + '-active');
        btn.style.background = 'transparent';
        btn.style.borderColor = 'var(--border)';
        btn.style.color = 'var(--muted)';
        return;
      }
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
    }

    
 
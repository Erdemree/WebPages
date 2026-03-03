 
    const map = L.map('map', {
      center: [38.9637, 35.8],
      zoom: 6,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Popup style
    const style = document.createElement('style');
    style.textContent = `
      .leaflet-popup-content-wrapper {
        background: #1a1a26;
        color: #e8e8f0;
        border: 1px solid #2a2a3d;
        border-radius: 0;
        font-family: 'DM Mono', monospace;
        font-size: 12px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.5);
        padding: 0;
        overflow: hidden;
      }
      .leaflet-popup-content { margin: 0; }
      .leaflet-popup-tip { background: #1a1a26; }
      .leaflet-popup-content b { color: #6c63ff; display:block; margin-bottom:3px; }
      .photo-pin-wrapper {
        position: relative;
        cursor: pointer;
        transition: transform 0.2s;
      }
      .photo-pin-wrapper:hover { transform: scale(1.1); }
      @keyframes pinBounce {
        0%,100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      .photo-pin-wrapper { animation: pinBounce 3s ease-in-out infinite; }
      .photo-pin-wrapper:hover { animation: none; }
    `;
    document.head.appendChild(style);


    function photoIcon(imgUrl, borderColor, size = 56) {
      return L.divIcon({
        className: '',
        html: `
          <div class="photo-pin-wrapper" style="width:${size}px; height:${size + 14}px; display:flex; flex-direction:column; align-items:center;">
            <div style="
              width:${size}px; height:${size}px;
              border-radius:50%;
              border:3px solid ${borderColor};
              overflow:hidden;
              box-shadow: 0 0 0 2px #0a0a0f, 0 4px 20px rgba(0,0,0,0.6), 0 0 16px ${borderColor}66;
              background:#1a1a26;
            ">
              <img src="${imgUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.parentElement.innerHTML='<div style=width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:22px>📍</div>'" />
            </div>
            <div style="
              width:0; height:0;
              border-left:7px solid transparent;
              border-right:7px solid transparent;
              border-top:12px solid ${borderColor};
              margin-top:-1px;
              filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
            "></div>
          </div>`,
        iconSize: [size, size + 14],
        iconAnchor: [size / 2, size + 14],
        popupAnchor: [0, -(size + 14)]
      });
    }

    // Popup HTML
    function popupHtml(title, subtitle, emoji) {
      return `<div style="padding:10px 14px;">
        <b style="color:#6c63ff;font-size:13px;">${emoji} ${title}</b>
        <span style="color:#9999bb;font-size:11px;line-height:1.6;">${subtitle}</span>
      </div>`;
    }

    // Ankara
    L.marker([39.9334, 32.8597], {
      icon: photoIcon('img/ankara.jpeg', '#6c63ff', 60)
    }).addTo(map).bindPopup(popupHtml('Ankara', 'İş Hayatım', '🏛️'));

    // Malatya
    L.marker([38.3552, 38.3095], {
      icon: photoIcon('img/malatya.jpeg', '#ff6584', 56)
    }).addTo(map).bindPopup(popupHtml('Malatya', 'Doğum yerim', '🏠'));

     

    // Elazığ
    L.marker([38.6748, 39.2225], {
      icon: photoIcon('img/elazig.jpeg', '#43e97b', 60)
    }).addTo(map).bindPopup(popupHtml('Fırat Üniversitesi', 'Eğitim Hayatım', '🎓'));

 
    L.marker([40.9923, 29.1244], {
      icon: photoIcon('img/istanbul.jpeg', '#43e97b', 48)
    }).addTo(map).bindPopup(popupHtml('Mirsis Bilgi Teknolojileri', 'İlk sektör deneyimim', '💻'));
 
 
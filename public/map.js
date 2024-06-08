
mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID

        center: cords, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
    console.log(cords);
     const marker = new mapboxgl.Marker({color:'red'})
     .setLngLat(cords)
    .setPopup(new mapboxgl.Popup().setHTML(`<h1>${title}</h1><br><h4>Exact location will be provided!!</h4>`)) // add popup
    .addTo(map);
   
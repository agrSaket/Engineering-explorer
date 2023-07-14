const myMap = L.map('smap').setView([22.9074872, 79.07306671], 5);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by Saket Agrahari';
const tileLayer = L.tileLayer(tileUrl, { attribution });
tileLayer.addTo(myMap);


function generateList(){
    const ul = document.querySelector('.list');
    
    storeList.forEach((shop) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const a = document.createElement('a');
        const p = document.createElement('p');
        a.addEventListener('click', () => {
            flyToStore(shop);
        });
        div.classList.add('shopitem');
        a.innerText = shop.properties.name;
        a.href = '#';
        p.innerText = shop.properties.address;

        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);
    });
}

generateList();

function makePopupContent(shop) {
    return `
        <div>
            <div class="flex">
                <img src=${shop.properties.photo}> 
                <h4>${shop.properties.name}</h4>
            </div>
            <p>${shop.properties.address}</p>
            <p>Rank : ${shop.properties.rank}</p>
            <p><a href=${shop.properties.website}>${shop.properties.website}</a></p>
        </div>
    `;
}

function onEachFeature(feature, layer) {
    layer.bindPopup(makePopupContent(feature), { closeButton: false, offset: L.point(0, -8) });
}

var myIcon = L.icon({
    iconUrl: './img/pngwing.png',
    iconSize: [30, 30]
});

const shopsLayer = L.geoJSON(storeList, {
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng, { icon: myIcon });
    }
});
shopsLayer.addTo(myMap);


function flyToStore(store) {
    const lat = store.geometry.coordinates[1];
    const lng = store.geometry.coordinates[0];
    myMap.flyTo([lat, lng], 14, {
        duration: 3
    });
    setTimeout(() => {
        L.popup({closeButton: false, offset: L.point(0, -8)})
        .setLatLng([lat, lng])
        .setContent(makePopupContent(store))
        .openOn(myMap);
    }, 3000);
}

// Initialisation du slider Swiper
var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 6, // Nombre de diapositives visibles à la fois
    spaceBetween: 20, // Espace entre les diapositives
    navigation: {
        nextEl: '.swiper-button-next', // Sélecteur du bouton Suivant
        prevEl: '.swiper-button-prev', // Sélecteur du bouton Précédent
    },
});

async function callApi(endpoint, body = null) {
    const response = await fetch(`http://localhost:8000/api/${endpoint}`, {
        method: body ? 'POST' : 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null
    });
    return response.json();
}

function createComponent(data, type) {
    return data["hydra:member"].map(element => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide', 'text-center', 'p-20', 'rounded-lg', 'bg-gray-800', 'inline-block', 'whitespace-normal', 'w-[calc(100%/6-20px)]', 'mr-20');
        
        let innerHTML = `
            <div class="relative pt-full">
                <img src="https://picsum.photos/129.webp?random=${element.id}" alt="${element.nom || element.titre}" class="max-w-full h-auto mx-auto" />
            </div>
            <div class="music-title text-2xl font-bold mt-10 text-white">${element.nom || element.titre}</div>`;
        
        if (type === "musiques" || type === "alba") {
            innerHTML += `<div class="music-artist text-base text-gray-600">By ${element.artiste}</div>`;
        } else if (type === "artistes") {
            innerHTML += `<div class="music-artist text-base text-gray-600">${element.genre}</div>`;
        }

        slide.innerHTML = innerHTML;
        return slide;
    });
}

async function loadAndDisplay(type) {
    const listElement = document.getElementById(`list-${type}`);
    const data = await callApi(type);
    createComponent(data, type).forEach(element => {
        listElement.appendChild(element);
    });
}

(async () => {
    await loadAndDisplay('musiques');
    await loadAndDisplay('alba');
    await loadAndDisplay('artistes');
})();

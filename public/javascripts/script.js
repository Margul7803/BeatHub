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

function createComposant(data) {
    console.log(data)
    return data["hydra:member"].map(element => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide', 'text-center', 'p-20', 'rounded-lg', 'bg-gray-800', 'inline-block', 'whitespace-normal', 'w-[calc(100%/6-20px)]', 'mr-20');
        slide.innerHTML = `
            <div class="relative pt-full">
                <img src="https://picsum.photos/129.webp?random=${element.id}" alt="${element.nom}" class="max-w-full h-auto mx-auto" />
            </div>
            <div class="music-title text-2xl font-bold mt-10 text-white">${element.nom}</div>
            <div class="music-artist text-base text-gray-600">
                By ${element.nom}
            </div>`;
        return slide;
    });
}

(async () => {
    const list_album = document.getElementById('list_album');
    const composants = await callApi('alba');
    createComposant(composants).forEach(element => {
        list_album.appendChild(element);
    });
})();

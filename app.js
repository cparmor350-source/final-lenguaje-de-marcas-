// ===========================
// VARIABLES
// ===========================

let allShirts = [];

// ===========================
// ELEMENTOS DEL DOM
// ===========================

const shirtsContainer = document.getElementById("shirtsContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
const filterButtons = document.querySelectorAll(".filter-btn");

// ===========================
// CARGAR CAMISETAS
// ===========================

async function fetchShirts() {

    try {

        const response = await fetch("./db.json");

        const data = await response.json();

        // AQUI ESTABA TU ERROR
        return data.footballShirts;

    } catch (error) {

        console.error("Error:", error);

        shirtsContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    Error loading shirts.
                </div>
            </div>
        `;

        return [];
    }
}

// ===========================
// GENERAR ESTRELLAS
// ===========================

function generateStars(rating) {

    let stars = "";

    const fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
        stars += `<i class="fas fa-star"></i>`;
    }

    return stars;
}

// ===========================
// CREAR TARJETA
// ===========================

function createCard(shirt) {

    return `
    
        <div class="col-md-6 col-lg-4 col-xl-3">

            <div class="card h-100 shadow-sm">

                <img 
                    src="${shirt.imageUrl}" 
                    class="card-img-top"
                    alt="${shirt.teamName}"
                    onerror="this.src='https://via.placeholder.com/400x400?text=Football+Shirt'"
                >

                <div class="card-body d-flex flex-column">

                    <h5 class="card-title">
                        ${shirt.teamName}
                    </h5>

                    <p class="card-text">
                        ${shirt.season} • ${shirt.shirtType}
                    </p>

                    <p class="card-text">
                        ${shirt.description}
                    </p>

                    <div class="mt-auto">

                        <p>
                            <strong>${shirt.manufacturer}</strong>
                        </p>

                        <p class="text-warning mb-2">
                            ${generateStars(shirt.rating)}
                        </p>

                        <h4 class="text-primary">
                            €${shirt.price}
                        </h4>

                    </div>

                </div>

            </div>

        </div>

    `;
}

// ===========================
// MOSTRAR CAMISETAS
// ===========================

function renderShirts(shirts) {

    shirtsContainer.innerHTML = "";

    if (shirts.length === 0) {

        shirtsContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info">
                    No shirts found.
                </div>
            </div>
        `;

        return;
    }

    shirts.forEach(shirt => {

        shirtsContainer.innerHTML += createCard(shirt);

    });
}

// ===========================
// FILTRAR
// ===========================

function filterShirts(manufacturer) {

    if (manufacturer === "all") {

        renderShirts(allShirts);

    } else {

        const filtered = allShirts.filter(shirt =>
            shirt.manufacturer === manufacturer
        );

        renderShirts(filtered);
    }
}

// ===========================
// BOTONES FILTRO
// ===========================

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        this.classList.add("active");

        const filter = this.dataset.filter;

        filterShirts(filter);
    });
});

// ===========================
// INICIAR APP
// ===========================

async function initApp() {

    loadingSpinner.style.display = "block";

    allShirts = await fetchShirts();

    loadingSpinner.style.display = "none";

    renderShirts(allShirts);
}

document.addEventListener("DOMContentLoaded", initApp);
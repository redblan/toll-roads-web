export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        // Формируем аккордеон с секциями маршрута (Bootstrap accordion)
        const accordionItems = data.sections.map((section, idx) => `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button ${idx === 0 ? '' : 'collapsed'}"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-${data.id}-${idx}"
                    >
                        ${section.title}
                    </button>
                </h2>
                <div
                    id="section-${data.id}-${idx}"
                    class="accordion-collapse collapse ${idx === 0 ? 'show' : ''}"
                >
                    <div class="accordion-body">${section.body}</div>
                </div>
            </div>
        `).join('');

        return `
            <div class="product-detail-card">
                <img
                    src="${data.src}"
                    class="product-detail-img"
                    alt="${data.title}"
                    onerror="this.src='https://placehold.co/800x300/1a1a2e/FF8C00?text=${encodeURIComponent(data.title)}'"
                >
                <div class="product-detail-body">
                    <h1 class="product-detail-title">${data.title}</h1>
                    <div class="route-card-subtitle mb-3">${data.subtitle}</div>

                    <div class="stats-row">
                        <div class="stat-block">
                            <div class="stat-value">${data.distance}</div>
                            <div class="stat-label">Протяжённость</div>
                        </div>
                        <div class="stat-block">
                            <div class="stat-value">${data.rate}</div>
                            <div class="stat-label">Тариф</div>
                        </div>
                        <div class="stat-block">
                            <div class="stat-value">${data.speed}</div>
                            <div class="stat-label">Макс. скорость</div>
                        </div>
                    </div>

                    <p class="product-detail-text">${data.text}</p>

                    <h5 class="fw-bold mb-3" style="color:#1a1a2e">Участки трассы</h5>
                    <div class="accordion" id="accordion-${data.id}">
                        ${accordionItems}
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
    }
}
export class RouteCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="col-12 col-md-6 col-xl-4">
                <div class="route-card" data-id="${data.id}">
                    <img
                        src="${data.src}"
                        class="route-card-img"
                        alt="${data.title}"
                        onerror="this.src='https://placehold.co/400x180/1a1a2e/FF8C00?text=${encodeURIComponent(data.title)}'"
                    >
                    <div class="route-card-body">
                        <span class="route-card-badge">Платная дорога</span>
                        <div class="route-card-title">${data.title}</div>
                        <div class="route-card-subtitle">${data.subtitle}</div>
                        <div class="route-card-info">
                            📏 Протяжённость: <strong>${data.distance}</strong><br>
                            💰 Тариф: <strong>${data.rate}</strong><br>
                            🚗 Скорость: <strong>${data.speed}</strong>
                        </div>
                        <button class="btn btn-route">Подробнее →</button>
                    </div>
                </div>
            </div>
        `;
    }

    render(data, onClick) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));

        // Находим только что вставленную карточку и вешаем обработчик
        const cards = this.parent.querySelectorAll('.route-card');
        const lastCard = cards[cards.length - 1];
        lastCard.addEventListener('click', onClick);
    }
}
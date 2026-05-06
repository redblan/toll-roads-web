export class RouteCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="col-12 col-md-6 col-xl-4">
                <div class="route-card" data-id="${data.id}">
                    <img
                        src="${data.src || `https://placehold.co/400x180/1a1a2e/FF8C00?text=${encodeURIComponent(data.title)}`}"
                        class="route-card-img"
                        alt="${data.title}"
                        onerror="this.src='https://placehold.co/400x180/1a1a2e/FF8C00?text=${encodeURIComponent(data.title)}'"
                    >
                    <div class="route-card-body">
                        <span class="route-card-badge">Платная дорога</span>
                        <div class="route-card-title">${data.title}</div>
                        <div class="route-card-subtitle">${data.subtitle || ''}</div>
                        <div class="route-card-info">
                            📏 Протяжённость: <strong>${data.distance_km} км</strong><br>
                            💰 Тариф: <strong>${data.rate_per_km} ₽/км</strong><br>
                            🚗 Скорость: <strong>${data.speed_limit || '—'}</strong>
                        </div>
                        <div class="route-card-actions">
                            <button class="btn btn-route btn-details">Подробнее →</button>
                            <button class="btn btn-edit">✏️</button>
                            <button class="btn btn-delete">🗑</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data, onClick, onDelete, onEdit) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));

        const cards = this.parent.querySelectorAll('.route-card');
        const lastCard = cards[cards.length - 1];

        lastCard.querySelector('.btn-details').addEventListener('click', (e) => {
            e.stopPropagation();
            onClick();
        });

        lastCard.addEventListener('click', onClick);

        lastCard.querySelector('.btn-edit').addEventListener('click', (e) => {
            e.stopPropagation();
            onEdit();
        });

        lastCard.querySelector('.btn-delete').addEventListener('click', (e) => {
            e.stopPropagation();
            onDelete();
        });
    }
}
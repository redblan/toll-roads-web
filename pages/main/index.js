import { RouteCardComponent } from '../../components/route-card/index.js';
import { ProductPage } from '../product/index.js';
import { EditPage } from '../edit/index.js';
import { fetch_get_toll_road_list, fetch_delete_toll_road } from '../../api.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div id="main-page">
                <nav class="autodor-navbar navbar">
                    <div class="container d-flex justify-content-between align-items-center">
                        <span class="autodor-brand">🛣 Автодор</span>
                        <button class="btn btn-home" id="btn-home">🏠 Домой</button>
                    </div>
                </nav>

                <div class="main-hero">
                    <div class="container">
                        <h1>🛣 Платные дороги России</h1>
                        <p>Государственная компания «Автодор» управляет скоростными автомагистралями федерального значения.</p>
                    </div>
                </div>

                <div class="container">
                    <div class="d-flex gap-2 mb-4 flex-wrap align-items-center">
                        <input
                            type="text"
                            id="toll_road_filter"
                            class="toll-filter-input"
                            placeholder="🔍 Поиск по названию трассы..."
                        >
                        <button class="btn btn-add-route" id="btn-add-route">+ Добавить</button>
                    </div>

                    <div class="section-title">Маршруты</div>
                    <div id="toll-road-error" class="toll-error-msg" style="display:none">
                        ⚠️ Не удалось загрузить данные. Убедитесь что бэкенд запущен на порту 3000.
                    </div>
                    <div id="toll-road-loading" class="toll-loading">Загрузка...</div>
                    <div class="row g-4" id="routes-grid"></div>
                    <p class="footer-note">© Баринов Егор Сергеевич, ИУ5-41Б — Лабораторная работа 6</p>
                </div>
            </div>
        `;
    }

    async loadTollRoads(filter = '') {
        const grid = document.getElementById('routes-grid');
        const loading = document.getElementById('toll-road-loading');
        const errorMsg = document.getElementById('toll-road-error');

        grid.innerHTML = '';
        loading.style.display = 'block';
        errorMsg.style.display = 'none';

        try {
            const toll_road_list = await fetch_get_toll_road_list(filter);
            loading.style.display = 'none';
            toll_road_list.forEach(toll_road => {
                const card = new RouteCardComponent(grid);
                card.render(
                    toll_road,
                    () => this.clickCard(toll_road.id),
                    () => this.deleteRoute(toll_road.id),
                    () => this.editRoute(toll_road.id)
                );
            });
        } catch (err) {
            loading.style.display = 'none';
            errorMsg.style.display = 'block';
            console.error('fetch error:', err);
        }
    }

    clickCard(id) {
        new ProductPage(this.parent, id).render();
    }

    editRoute(id) {
        new EditPage(this.parent, id).render();
    }

    async deleteRoute(id) {
        try {
            await fetch_delete_toll_road(id);
            this.loadTollRoads(document.getElementById('toll_road_filter')?.value || '');
        } catch (err) {
            alert('Ошибка удаления: ' + err.message);
        }
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        document.getElementById('btn-home').addEventListener('click', () => {
            new MainPage(this.parent).render();
        });

        document.getElementById('btn-add-route').addEventListener('click', () => {
            new EditPage(this.parent, null).render();
        });

        document.getElementById('toll_road_filter').addEventListener('input', (e) => {
            this.loadTollRoads(e.target.value);
        });

        this.loadTollRoads();
    }
}
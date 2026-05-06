import { MainPage } from '../main/index.js';
import { xhr_get_toll_road } from '../../api.js';

export class EditPage {
    constructor(parent, toll_road_id) {
        this.parent = parent;
        this.toll_road_id = toll_road_id; // null = новая трасса
    }

    getHTML(toll_road = {}) {
        const isNew = !this.toll_road_id;
        return `
            <div id="edit-page">
                <nav class="autodor-navbar navbar">
                    <div class="container d-flex justify-content-between align-items-center">
                        <span class="autodor-brand">🛣 Автодор</span>
                        <button class="btn btn-home" id="btn-home">🏠 Домой</button>
                    </div>
                </nav>

                <div class="product-hero">
                    <div class="container">
                        <h1>${isNew ? '➕ Новый маршрут' : '✏️ Редактирование: ' + (toll_road.title || '')}</h1>
                    </div>
                </div>

                <div class="container">
                    <button class="btn btn-back" id="btn-back">← Назад</button>

                    <div class="edit-card">
                        <div class="edit-note">
                            💡 В этой версии поля доступны для просмотра и ввода, но кнопка «Сохранить» появится в Лабораторной работе 6.
                        </div>

                        <div class="edit-form">
                            <div class="edit-field">
                                <label>Название трассы</label>
                                <input type="text" id="field_toll_road_title" class="edit-input"
                                    placeholder="Например: М11 «Нева»"
                                    value="${toll_road.title || ''}">
                            </div>
                            <div class="edit-field">
                                <label>Маршрут</label>
                                <input type="text" id="field_toll_road_subtitle" class="edit-input"
                                    placeholder="Например: Москва — Санкт-Петербург"
                                    value="${toll_road.subtitle || ''}">
                            </div>
                            <div class="edit-field">
                                <label>Протяжённость (км)</label>
                                <input type="number" id="field_toll_road_distance" class="edit-input"
                                    placeholder="Например: 684"
                                    value="${toll_road.distance_km || ''}">
                            </div>
                            <div class="edit-field">
                                <label>Тариф (₽/км)</label>
                                <input type="number" id="field_toll_road_rate" class="edit-input"
                                    placeholder="Например: 4.5" step="0.01"
                                    value="${toll_road.rate_per_km || ''}">
                            </div>
                            <div class="edit-field">
                                <label>Ограничение скорости</label>
                                <input type="text" id="field_toll_road_speed" class="edit-input"
                                    placeholder="Например: 110–130 км/ч"
                                    value="${toll_road.speed_limit || ''}">
                            </div>
                            <div class="edit-field">
                                <label>Год открытия</label>
                                <input type="number" id="field_toll_road_year" class="edit-input"
                                    placeholder="Например: 2019"
                                    value="${toll_road.opened_year || ''}">
                            </div>
                            <div class="edit-field edit-field-full">
                                <label>Описание</label>
                                <textarea id="field_toll_road_text" class="edit-input edit-textarea"
                                    placeholder="Описание трассы...">${toll_road.text || ''}</textarea>
                            </div>
                        </div>

                        <button class="btn btn-save-disabled" disabled>
                            💾 Сохранить (доступно в ЛР 6)
                        </button>
                    </div>

                    <p class="footer-note">© Баринов Егор Сергеевич, ИУ5-41Б — Лабораторная работа 5</p>
                </div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';

        if (this.toll_road_id) {
            // Редактирование — загружаем данные через XHR
            this.parent.insertAdjacentHTML('beforeend', this.getHTML());
            document.getElementById('product-title-placeholder')?.remove();

            xhr_get_toll_road(this.toll_road_id, (toll_road) => {
                this.parent.innerHTML = '';
                this.parent.insertAdjacentHTML('beforeend', this.getHTML(toll_road));
                this._bindButtons();
            }, () => {
                this.parent.insertAdjacentHTML('beforeend', this.getHTML());
                this._bindButtons();
            });
        } else {
            // Новая трасса
            this.parent.insertAdjacentHTML('beforeend', this.getHTML());
            this._bindButtons();
        }
    }

    _bindButtons() {
        document.getElementById('btn-home')?.addEventListener('click', () => {
            new MainPage(this.parent).render();
        });
        document.getElementById('btn-back')?.addEventListener('click', () => {
            new MainPage(this.parent).render();
        });
    }
}
import { MainPage } from '../main/index.js';
import { fetch_get_toll_road, fetch_create_toll_road, fetch_update_toll_road } from '../../api.js';

export class EditPage {
    constructor(parent, toll_road_id) {
        this.parent = parent;
        this.toll_road_id = toll_road_id;
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

                        <div id="edit-error" class="toll-error-msg" style="display:none"></div>

                        <button class="btn btn-save" id="btn-save">
                            💾 Сохранить
                        </button>
                    </div>

                    <p class="footer-note">© Баринов Егор Сергеевич, ИУ5-41Б — Лабораторная работа 6</p>
                </div>
            </div>
        `;
    }

    _getFormData() {
        return {
            title: document.getElementById('field_toll_road_title').value,
            subtitle: document.getElementById('field_toll_road_subtitle').value,
            distance_km: parseFloat(document.getElementById('field_toll_road_distance').value),
            rate_per_km: parseFloat(document.getElementById('field_toll_road_rate').value),
            speed_limit: document.getElementById('field_toll_road_speed').value,
            opened_year: parseInt(document.getElementById('field_toll_road_year').value),
            text: document.getElementById('field_toll_road_text').value
        };
    }

    async save() {
        const errorDiv = document.getElementById('edit-error');
        const saveBtn = document.getElementById('btn-save');
        const toll_road_data = this._getFormData();

        if (!toll_road_data.title || !toll_road_data.distance_km || !toll_road_data.rate_per_km) {
            errorDiv.textContent = '⚠️ Заполните обязательные поля: название, протяжённость, тариф';
            errorDiv.style.display = 'block';
            return;
        }

        saveBtn.disabled = true;
        saveBtn.textContent = 'Сохранение...';

        try {
            if (this.toll_road_id) {
                await fetch_update_toll_road(this.toll_road_id, toll_road_data);
            } else {
                await fetch_create_toll_road(toll_road_data);
            }
            new MainPage(this.parent).render();
        } catch (err) {
            errorDiv.textContent = '⚠️ Ошибка сохранения: ' + err.message;
            errorDiv.style.display = 'block';
            saveBtn.disabled = false;
            saveBtn.textContent = '💾 Сохранить';
        }
    }

    async render() {
        this.parent.innerHTML = '';

        if (this.toll_road_id) {
            try {
                const toll_road = await fetch_get_toll_road(this.toll_road_id);
                this.parent.insertAdjacentHTML('beforeend', this.getHTML(toll_road));
            } catch {
                this.parent.insertAdjacentHTML('beforeend', this.getHTML());
            }
        } else {
            this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        }

        document.getElementById('btn-home').addEventListener('click', () => {
            new MainPage(this.parent).render();
        });
        document.getElementById('btn-back').addEventListener('click', () => {
            new MainPage(this.parent).render();
        });
        document.getElementById('btn-save').addEventListener('click', () => {
            this.save();
        });
    }
}
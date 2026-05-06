import { ProductComponent } from '../../components/product/index.js';
import { BackButtonComponent } from '../../components/back-button/index.js';
import { MainPage } from '../main/index.js';
import { xhr_get_toll_road } from '../../api.js';

export class ProductPage {
    constructor(parent, toll_road_id) {
        this.parent = parent;
        this.toll_road_id = toll_road_id;
    }

    getHTML() {
        return `
            <div id="product-page">
                <nav class="autodor-navbar navbar">
                    <div class="container d-flex justify-content-between align-items-center">
                        <span class="autodor-brand">🛣 Автодор</span>
                        <button class="btn btn-home" id="btn-home">🏠 Домой</button>
                    </div>
                </nav>
                <div class="product-hero">
                    <div class="container">
                        <h1 id="product-title">Загрузка...</h1>
                    </div>
                </div>
                <div class="container" id="product-content"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        document.getElementById('btn-home').addEventListener('click', () => {
            new MainPage(this.parent).render();
        });

        const content = document.getElementById('product-content');

        const backButton = new BackButtonComponent(content);
        backButton.render(() => new MainPage(this.parent).render());

        xhr_get_toll_road(this.toll_road_id, (toll_road) => {
            document.getElementById('product-title').textContent = `🛣 ${toll_road.title}`;
            const product = new ProductComponent(content);
            product.render(toll_road);
            content.insertAdjacentHTML('beforeend',
                `<p class="footer-note">© Баринов Егор Сергеевич, ИУ5-41Б — Лабораторная работа 5</p>`
            );
        }, (err) => {
            content.innerHTML = `<p class="text-danger mt-3">Ошибка загрузки: ${err}</p>`;
        });
    }
}
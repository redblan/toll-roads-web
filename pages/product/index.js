import { ProductComponent } from '../../components/product/index.js';
import { BackButtonComponent } from '../../components/back-button/index.js';
import { MainPage } from '../main/index.js';

export class ProductPage {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page">
                <!-- Навбар с кнопкой Домой -->
                <nav class="autodor-navbar navbar">
                    <div class="container d-flex justify-content-between align-items-center">
                        <span class="autodor-brand">🛣 Автодор</span>
                        <button class="btn btn-home" id="btn-home">🏠 Домой</button>
                    </div>
                </nav>

                <div class="product-hero">
                    <div class="container">
                        <h1>🛣 ${this.data.title}</h1>
                        <p style="color:rgba(255,255,255,0.7)">${this.data.subtitle}</p>
                    </div>
                </div>
                <div class="container" id="product-content"></div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        // Кнопка Домой
        document.getElementById('btn-home').addEventListener('click', () => {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });

        const content = document.getElementById('product-content');

        const backButton = new BackButtonComponent(content);
        backButton.render(this.clickBack.bind(this));

        const product = new ProductComponent(content);
        product.render(this.data);

        content.insertAdjacentHTML('beforeend',
            `<p class="footer-note">© Баринов Егор Сергеевич, ИУ5-41Б — Лабораторная работа 3 + ДЗ</p>`
        );
    }
}
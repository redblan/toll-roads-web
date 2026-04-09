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

        const content = document.getElementById('product-content');

        const backButton = new BackButtonComponent(content);
        backButton.render(this.clickBack.bind(this));

        const product = new ProductComponent(content);
        product.render(this.data);

        content.insertAdjacentHTML('beforeend',
            `<p class="footer-note">© Баринов Егор Сергеевич, ИУ5-41Б — Лабораторная работа 3</p>`
        );
    }
}
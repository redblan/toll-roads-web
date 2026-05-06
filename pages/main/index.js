import { RouteCardComponent } from '../../components/route-card/index.js';
import { ProductPage } from '../product/index.js';

// ─── Данные по реальным платным трассам Автодора ───
// Переменные названы по теме: toll_road_list, toll_road_traffic
let toll_road_list = [
    {
        id: 1,
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Neva_highway.jpg/800px-Neva_highway.jpg',
        title: 'М11 «Нева»',
        subtitle: 'Москва — Санкт-Петербург',
        distance: '684 км',
        distance_km: 684,
        rate: '4.50 ₽/км',
        rate_value: 4.50,
        speed: '110–130 км/ч',
        // Загруженность участков: 1 = загружен, 0 = свободен (toll_road_traffic)
        toll_road_traffic: '1110100111010011101',
        text: 'Скоростная магистраль, соединяющая две столицы. Пролегает параллельно старой трассе М10, имеет 4 полосы движения в каждую сторону на большинстве участков. Открыта в 2019 году.',
        sections: [
            { title: 'Участок 1: Москва — Клин', body: 'Протяжённость 93 км. Тариф для легковых автомобилей: 2–5 ₽/км в зависимости от времени суток.' },
            { title: 'Участок 2: Клин — Тверь', body: 'Протяжённость 87 км. Движение в 4 полосы. Ограничение скорости 130 км/ч.' },
            { title: 'Участок 7: Новгород — СПб', body: 'Протяжённость 175 км. Конечный участок в сторону Санкт-Петербурга.' },
        ]
    },
    {
        id: 2,
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/M4_Don_highway.jpg/800px-M4_Don_highway.jpg',
        title: 'М4 «Дон»',
        subtitle: 'Москва — Новороссийск',
        distance: '1540 км',
        distance_km: 1540,
        rate: '5.20 ₽/км',
        rate_value: 5.20,
        speed: '90–130 км/ч',
        toll_road_traffic: '1111011110111101111',
        text: 'Главная южная артерия России, соединяющая Москву с черноморским побережьем.',
        sections: [
            { title: 'Платный участок: Москва — Кашира', body: 'Протяжённость 76 км. 4-полосная дорога с разделительным барьером.' },
            { title: 'Платный участок: Богородицк — Елец', body: 'Протяжённость 143 км.' },
            { title: 'Платный участок: Воронеж — Ростов', body: 'Протяжённость 380 км.' },
        ]
    },
    {
        id: 3,
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/CKAD_2021.jpg/800px-CKAD_2021.jpg',
        title: 'ЦКАД',
        subtitle: 'Центральная кольцевая автодорога',
        distance: '336 км',
        distance_km: 336,
        rate: '6.10 ₽/км',
        rate_value: 6.10,
        speed: '110 км/ч',
        toll_road_traffic: '1010101010101010101',
        text: 'Кольцевая дорога вокруг Москвы. Разгружает МКАД и обеспечивает транзит грузов минуя столицу. Открыта в 2021 году.',
        sections: [
            { title: 'Пусковой комплекс 3А', body: 'Северо-западный участок, 49 км.' },
            { title: 'Пусковой комплекс 3Б', body: 'Северный и северо-восточный сектор, 84 км.' },
            { title: 'Пусковой комплекс 4', body: 'Южный сектор, 97 км.' },
        ]
    },
    {
        id: 4,
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/M12_Vostok.jpg/800px-M12_Vostok.jpg',
        title: 'М12 «Восток»',
        subtitle: 'Москва — Казань',
        distance: '811 км',
        distance_km: 811,
        rate: '5.50 ₽/км',
        rate_value: 5.50,
        speed: '130 км/ч',
        toll_road_traffic: '1111111011111110111',
        text: 'Новейшая скоростная трасса России. Позволяет добраться из Москвы до Казани за 6,5 часов. Открыта в 2023 году.',
        sections: [
            { title: 'Участок Москва — Владимир', body: 'Протяжённость 132 км.' },
            { title: 'Участок Владимир — Нижний Новгород', body: 'Протяжённость 213 км.' },
            { title: 'Участок Нижний Новгород — Казань', body: 'Протяжённость 343 км.' },
        ]
    },
    {
        id: 5,
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Western_High-Speed_Diameter.jpg/800px-Western_High-Speed_Diameter.jpg',
        title: 'ЗСД',
        subtitle: 'Западный скоростной диаметр (СПб)',
        distance: '46,6 км',
        distance_km: 47,
        rate: '7.80 ₽/км',
        rate_value: 7.80,
        speed: '110 км/ч',
        toll_road_traffic: '1100110011001100110',
        text: 'Платная скоростная магистраль в Санкт-Петербурге. Проходит по намывным территориям Финского залива.',
        sections: [
            { title: 'Северный участок', body: '12 км от КАД до Приморского проспекта.' },
            { title: 'Центральный участок', body: '14 км через центр города.' },
            { title: 'Южный участок', body: '20 км от Морского порта до КАД-юг.' },
        ]
    },
    {
        id: 6,
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Krasnaya_Polyana_road.jpg/800px-Krasnaya_Polyana_road.jpg',
        title: 'М3 «Украина»',
        subtitle: 'Москва — Брянск — Рославль',
        distance: '452 км',
        distance_km: 452,
        rate: '3.80 ₽/км',
        rate_value: 3.80,
        speed: '90–110 км/ч',
        toll_road_traffic: '1000100010001000100',
        text: 'Платные участки трассы М3 находятся в Московской и Калужской областях.',
        sections: [
            { title: 'Обход Одинцово', body: 'Первый платный участок М3, 18 км.' },
            { title: 'Обход Кубинки', body: 'Протяжённость 12 км.' },
            { title: 'Платный участок Малоярославец', body: 'Протяжённость 32 км.' },
        ]
    }
];

// ─────────────────────────────────────────────────────────────
// ДЗ Часть 1 — Задача 2.3: maxOnesSequence
// Применение к теме: определяем максимальный непрерывный
// загруженный участок трассы (серия единиц в toll_road_traffic)
// ─────────────────────────────────────────────────────────────
function toll_road_max_traffic_sequence(toll_road_traffic) {
    let maxLen = 0;
    let currentLen = 0;
    let i = 0;
    // Цикл с условием (не по счётчику) — пока не дошли до конца строки
    while (i < toll_road_traffic.length) {
        if (toll_road_traffic[i] === '1') {
            currentLen++;
            if (currentLen > maxLen) maxLen = currentLen;
        } else {
            currentLen = 0;
        }
        i++;
    }
    return maxLen;
}

// ─────────────────────────────────────────────────────────────
// ДЗ Часть 1 — Задача 3.1: merge
// Применение к теме: объединяем данные двух маршрутов в
// один объект toll_road_merged (приоритет у первого)
// ─────────────────────────────────────────────────────────────
function toll_road_merge(...toll_road_objects) {
    const toll_road_merged = {};
    for (const toll_road_obj of toll_road_objects) {
        for (const key in toll_road_obj) {
            if (!(key in toll_road_merged)) {
                toll_road_merged[key] = toll_road_obj[key];
            }
        }
    }
    return toll_road_merged;
}

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this._nextId = Math.max(...toll_road_list.map(r => r.id)) + 1;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    // Найти трассу с максимальной загруженностью (для отображения в ДЗ-блоке)
    _getBusiestTollRoad() {
        let busiest = toll_road_list[0];
        let maxSeq = 0;
        toll_road_list.forEach(toll_road => {
            const seq = toll_road_max_traffic_sequence(toll_road.toll_road_traffic);
            if (seq > maxSeq) {
                maxSeq = seq;
                busiest = toll_road;
            }
        });
        return { toll_road: busiest, max_sequence: maxSeq };
    }

    // Объединить данные первых двух трасс для отображения в ДЗ-блоке
    _getMergedTollRoads() {
        const [first, second] = toll_road_list;
        return toll_road_merge(
            { title: first.title, distance_km: first.distance_km, rate_value: first.rate_value },
            { title: second.title, distance_km: second.distance_km, rate_value: second.rate_value, extra: 'из второй трассы' }
        );
    }

    getHTML() {
        const { toll_road: busiest, max_sequence } = this._getBusiestTollRoad();
        const toll_road_merged = this._getMergedTollRoads();

        return `
            <div id="main-page">
                <!-- Навбар с кнопкой Домой -->
                <nav class="autodor-navbar navbar">
                    <div class="container d-flex justify-content-between align-items-center">
                        <span class="autodor-brand">🛣 Автодор</span>
                        <button class="btn btn-home" id="btn-home">🏠 Домой</button>
                    </div>
                </nav>

                <div class="main-hero">
                    <div class="container">
                        <h1>🛣 Платные дороги России</h1>
                        <p>Государственная компания «Автодор» управляет скоростными
                           автомагистралями федерального значения. Выберите маршрут,
                           чтобы узнать подробности и рассчитать стоимость проезда.</p>
                    </div>
                </div>

                <div class="container">

                    <!-- ДЗ: блок с результатами встроенных функций -->
                    <div class="dz-block">
                        <div class="dz-title">📊 Анализ трасс (ДЗ)</div>
                        <div class="dz-row">
                            <span class="dz-label">🔴 Самый загруженный участок:</span>
                            <span class="dz-value">${busiest.title} — ${max_sequence} загруженных секций подряд</span>
                        </div>
                        <div class="dz-row">
                            <span class="dz-label">🔀 Объединение трасс (merge):</span>
                            <span class="dz-value">${toll_road_merged.title} + ${toll_road_merged.extra || '—'} · ${toll_road_merged.distance_km} км · ${toll_road_merged.rate_value} ₽/км</span>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="section-title mb-0">Маршруты</div>
                        <button class="btn btn-add-route" id="btn-add-route">+ Добавить маршрут</button>
                    </div>

                    <div class="row g-4" id="routes-grid"></div>
                    <p class="footer-note">© Баринов Егор Сергеевич, ИУ5-41Б — Лабораторная работа 3</p>
                </div>
            </div>
        `;
    }

    clickCard(routeId) {
        const toll_road = toll_road_list.find(r => r.id === routeId);
        const productPage = new ProductPage(this.parent, toll_road);
        productPage.render();
    }

    // Добавить маршрут — копируем первый из toll_road_list
    addRoute() {
        const toll_road_template = toll_road_list[0];
        const toll_road_new = toll_road_merge(
            { id: this._nextId },
            { ...toll_road_template },
            { title: `${toll_road_template.title} (копия)` }
        );
        this._nextId++;
        toll_road_list.push(toll_road_new);
        this.render();
    }

    // Удалить маршрут по id
    deleteRoute(routeId) {
        toll_road_list = toll_road_list.filter(r => r.id !== routeId);
        this.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        // Кнопка Домой — перезагружает главную страницу
        document.getElementById('btn-home').addEventListener('click', () => {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        });

        // Кнопка добавить
        document.getElementById('btn-add-route').addEventListener('click', () => {
            this.addRoute();
        });

        // Рендер карточек
        const grid = document.getElementById('routes-grid');
        toll_road_list.forEach(toll_road => {
            const card = new RouteCardComponent(grid);
            card.render(
                toll_road,
                () => this.clickCard(toll_road.id),
                () => this.deleteRoute(toll_road.id)
            );
        });
    }
}
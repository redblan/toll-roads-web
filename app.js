import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const PRESET_MODELS = [
    { name: 'Легковой автомобиль', url: './models/car.glb', id: 'preset-car', category: 'Транспорт', isPreset: true },
    { name: 'Пункт оплаты', url: './models/toll-booth.glb', id: 'preset-toll', category: 'Инфраструктура', isPreset: true },
    { name: 'Дорожный знак', url: './models/road-sign.glb', id: 'preset-sign', category: 'Оборудование', isPreset: true },
    { name: 'Мост', url: './models/bridge.glb', id: 'preset-bridge', category: 'Сооружение', isPreset: true }
];

let allModels = [];
let filteredModels = [];

function generatePreviewFromUrl(url) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: false });
        renderer.setSize(canvas.width, canvas.height);
        renderer.setClearColor(0x2a2a3a, 1);
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x2a2a3a);
        const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);
        camera.position.set(2, 1, 3);
        camera.lookAt(0, 0, 0);
        const ambientLight = new THREE.AmbientLight(0x404060);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(1, 2, 1);
        scene.add(dirLight);
        const backLight = new THREE.DirectionalLight(0x8866ff, 0.5);
        backLight.position.set(-1, 1, -1);
        scene.add(backLight);

        const loader = new GLTFLoader();
        loader.load(url, (gltf) => {
            const model = gltf.scene;
            const box = new THREE.Box3().setFromObject(model);
            const bottomY = box.min.y;
            model.position.y = -bottomY;
            scene.add(model);
            renderer.render(scene, camera);
            const dataURL = canvas.toDataURL();
            resolve(dataURL);
        }, undefined, (err) => {
            console.warn(`Ошибка загрузки ${url}`, err);
            resolve(null);
        });
    });
}

async function loadPresetModels() {
    for (const preset of PRESET_MODELS) {
        const preview = await generatePreviewFromUrl(preset.url);
        allModels.push({
            ...preset,
            preview: preview
        });
    }
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = '';
    for (const model of filteredModels) {
        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', () => {
            const urlParam = `?type=preset&id=${encodeURIComponent(model.id)}&url=${encodeURIComponent(model.url)}&name=${encodeURIComponent(model.name)}`;
            window.location.href = `detail.html${urlParam}`;
        });

        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        canvas.style.width = '100%';
        canvas.style.height = '200px';
        const ctx = canvas.getContext('2d');
        if (model.preview) {
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = model.preview;
        } else {
            ctx.fillStyle = '#555';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fff';
            ctx.font = '16px sans-serif';
            ctx.fillText('Нет превью', 20, 100);
        }
        card.appendChild(canvas);

        const info = document.createElement('div');
        info.className = 'card-info';
        info.innerHTML = `
            <div class="card-title">${model.name}</div>
            <div class="card-category">${model.category}</div>
        `;
        card.appendChild(info);
        grid.appendChild(card);
    }
}

function applyFilters() {
    const searchText = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-select').value;

    filteredModels = allModels.filter(model => {
        const matchesSearch = model.name.toLowerCase().includes(searchText);
        const matchesCategory = (category === 'all') || (model.category === category);
        return matchesSearch && matchesCategory;
    });
    renderGallery();
}

function resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('category-select').value = 'all';
    applyFilters();
}

async function init() {
    await loadPresetModels();
    applyFilters();

    // Поиск по кнопке
    document.getElementById('btn-search').addEventListener('click', applyFilters);

    // Поиск по Enter
    document.getElementById('search-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') applyFilters();
    });

    document.getElementById('category-select').addEventListener('change', applyFilters);
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
}

init();
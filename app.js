import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { initDB, saveModel, getAllModels } from './idb.js';

const PRESET_MODELS = [
    { name: 'Легковой автомобиль', url: './models/car.glb', id: 'preset-car', category: 'Транспорт' },
    { name: 'Пункт оплаты', url: './models/toll-booth.glb', id: 'preset-toll', category: 'Инфраструктура' },
    { name: 'Дорожный знак', url: './models/road-sign.glb', id: 'preset-sign', category: 'Оборудование' },
    { name: 'Мост', url: './models/bridge.glb', id: 'preset-bridge', category: 'Сооружение' }
];

let currentModels = [];

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
        
        // Освещение
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
            // Центрируем и ставим на пол
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            const bottomY = box.min.y;
            model.position.x = -center.x;
            model.position.z = -center.z;
            model.position.y = -bottomY;
            scene.add(model);
            
            // Настраиваем камеру под размер модели
            const distance = Math.max(size.x, size.y, size.z) * 1.2;
            camera.position.set(distance * 0.8, distance * 0.6, distance);
            camera.lookAt(0, size.y / 2, 0);
            renderer.render(scene, camera);
            const dataURL = canvas.toDataURL();
            resolve(dataURL);
        }, undefined, (err) => {
            console.warn(`Ошибка загрузки ${url}`, err);
            resolve(null);
        });
    });
}

async function generatePreviewFromBlob(blob) {
    const url = URL.createObjectURL(blob);
    const preview = await generatePreviewFromUrl(url);
    URL.revokeObjectURL(url);
    return preview;
}

async function loadPresetModels() {
    for (const preset of PRESET_MODELS) {
        const preview = await generatePreviewFromUrl(preset.url);
        currentModels.push({
            id: preset.id,
            name: preset.name,
            url: preset.url,
            category: preset.category,
            isPreset: true,
            preview: preview
        });
    }
}

async function loadUserModels() {
    const userModels = await getAllModels();
    for (const model of userModels) {
        currentModels.push({
            id: model.id,
            name: model.name,
            blob: model.file,
            preview: model.preview,
            isPreset: false,
            category: 'Пользовательская'
        });
    }
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = '';
    for (const model of currentModels) {
        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', () => {
            let urlParam = '';
            if (model.isPreset) {
                urlParam = `?type=preset&id=${encodeURIComponent(model.id)}&url=${encodeURIComponent(model.url)}&name=${encodeURIComponent(model.name)}`;
            } else {
                urlParam = `?type=user&id=${model.id}&name=${encodeURIComponent(model.name)}`;
            }
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
            <div class="card-category">${model.category || (model.isPreset ? 'Предустановленная' : 'Загруженная')}</div>
        `;
        card.appendChild(info);
        grid.appendChild(card);
    }
}

async function onFileUpload(file) {
    if (!file.name.endsWith('.glb')) {
        alert('Пожалуйста, загрузите файл в формате .glb');
        return;
    }
    const preview = await generatePreviewFromBlob(file);
    if (preview) {
        const id = await saveModel(file, preview, file.name.replace('.glb', ''));
        currentModels.push({
            id: id,
            name: file.name.replace('.glb', ''),
            blob: file,
            preview: preview,
            isPreset: false,
            category: 'Пользовательская'
        });
        renderGallery();
    } else {
        alert('Не удалось создать превью для этой модели');
    }
}

async function init() {
    await initDB();
    await loadPresetModels();
    await loadUserModels();
    renderGallery();
    
    const uploadBtn = document.getElementById('upload-btn');
    const fileInput = document.getElementById('upload-model');
    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length) {
                onFileUpload(e.target.files[0]);
            }
            fileInput.value = '';
        });
    }
}

init();
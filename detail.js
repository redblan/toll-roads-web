import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { getModelById, initDB } from './idb.js';

const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');
let modelId = null;
let modelUrl = null;
let modelName = 'Модель';

if (type === 'preset') {
    modelUrl = urlParams.get('url');
    modelName = decodeURIComponent(urlParams.get('name') || 'Объект Автодор');
} else if (type === 'user') {
    modelId = parseInt(urlParams.get('id'));
    modelName = decodeURIComponent(urlParams.get('name') || 'Пользовательская модель');
}

document.getElementById('model-name').innerText = modelName;

// Сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f0f1a);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Освещение
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);
const mainLight = new THREE.DirectionalLight(0xffaa66, 1);
mainLight.position.set(2, 3, 2);
mainLight.castShadow = true;
scene.add(mainLight);
const fillLight = new THREE.PointLight(0x8866ff, 0.3);
fillLight.position.set(-1, 1, 2);
scene.add(fillLight);
const backLight = new THREE.PointLight(0xffaa66, 0.2);
backLight.position.set(0, 1, -2);
scene.add(backLight);
const bottomLight = new THREE.PointLight(0x6699ff, 0.2);
bottomLight.position.set(0, -1, 0);
scene.add(bottomLight);

// Пол-сетка (для визуального ориентира)
const gridHelper = new THREE.GridHelper(5, 20, 0x88aaff, 0x335588);
gridHelper.position.y = -0.01;
scene.add(gridHelper);

// Орбит контрол
let controls = null;
let currentModel = null;

function centerAndAddModel(model) {
    // Вычисляем bounding box модели
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const bottomY = box.min.y;

    // Смещаем модель: X и Z центрируем, Y ставим на пол
    model.position.x = -center.x;
    model.position.z = -center.z;
    model.position.y = -bottomY;

    scene.add(model);

    // Настраиваем controls и камеру
    const modelCenter = new THREE.Vector3(0, size.y / 2, 0);
    if (controls) {
        controls.target.copy(modelCenter);
        controls.update();
    } else {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = false;
        controls.enableZoom = true;
        controls.zoomSpeed = 1.2;
        controls.target.copy(modelCenter);
    }
    
    // Подбираем расстояние камеры в зависимости от размера модели
    const distance = Math.max(size.x, size.y, size.z) * 1.5;
    camera.position.set(distance * 0.8, distance * 0.6, distance);
    controls.update();
}

function loadModelFromUrl(url) {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
        if (currentModel) scene.remove(currentModel);
        currentModel = gltf.scene;
        centerAndAddModel(currentModel);
    }, undefined, (error) => {
        console.error('Ошибка загрузки модели:', error);
        alert('Не удалось загрузить модель');
    });
}

async function loadUserModel(id) {
    await initDB();
    const record = await getModelById(id);
    if (record && record.file) {
        const url = URL.createObjectURL(record.file);
        const loader = new GLTFLoader();
        loader.load(url, (gltf) => {
            if (currentModel) scene.remove(currentModel);
            currentModel = gltf.scene;
            centerAndAddModel(currentModel);
            URL.revokeObjectURL(url);
        }, undefined, (err) => {
            console.error(err);
            URL.revokeObjectURL(url);
        });
    } else {
        alert('Модель не найдена');
    }
}

if (type === 'preset' && modelUrl) {
    loadModelFromUrl(modelUrl);
} else if (type === 'user' && modelId) {
    loadUserModel(modelId);
} else {
    alert('Неверные параметры');
}

function animate() {
    requestAnimationFrame(animate);
    if (controls) controls.update();
    renderer.render(scene, camera);
}
animate();

// Обработчики кнопок
document.getElementById('back-btn')?.addEventListener('click', () => {
    window.location.href = 'index.html';
});
document.getElementById('view-front')?.addEventListener('click', () => {
    if (!currentModel) return;
    const box = new THREE.Box3().setFromObject(currentModel);
    const size = box.getSize(new THREE.Vector3());
    const distance = Math.max(size.x, size.y, size.z) * 1.5;
    camera.position.set(0, distance * 0.6, distance);
    controls.target.set(0, size.y / 2, 0);
    controls.update();
});
document.getElementById('view-back')?.addEventListener('click', () => {
    if (!currentModel) return;
    const box = new THREE.Box3().setFromObject(currentModel);
    const size = box.getSize(new THREE.Vector3());
    const distance = Math.max(size.x, size.y, size.z) * 1.5;
    camera.position.set(0, distance * 0.6, -distance);
    controls.target.set(0, size.y / 2, 0);
    controls.update();
});
document.getElementById('view-left')?.addEventListener('click', () => {
    if (!currentModel) return;
    const box = new THREE.Box3().setFromObject(currentModel);
    const size = box.getSize(new THREE.Vector3());
    const distance = Math.max(size.x, size.y, size.z) * 1.5;
    camera.position.set(-distance, distance * 0.6, 0);
    controls.target.set(0, size.y / 2, 0);
    controls.update();
});
document.getElementById('view-right')?.addEventListener('click', () => {
    if (!currentModel) return;
    const box = new THREE.Box3().setFromObject(currentModel);
    const size = box.getSize(new THREE.Vector3());
    const distance = Math.max(size.x, size.y, size.z) * 1.5;
    camera.position.set(distance, distance * 0.6, 0);
    controls.target.set(0, size.y / 2, 0);
    controls.update();
});
document.getElementById('zoom-in')?.addEventListener('click', () => {
    camera.position.multiplyScalar(0.8);
    controls.update();
});
document.getElementById('zoom-out')?.addEventListener('click', () => {
    camera.position.multiplyScalar(1.2);
    controls.update();
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
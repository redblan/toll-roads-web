export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const sections = data.sections || [];

        const accordionItems = sections.map((section, idx) => `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button ${idx === 0 ? '' : 'collapsed'}"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-${data.id}-${idx}"
                    >
                        ${section.title}
                    </button>
                </h2>
                <div
                    id="section-${data.id}-${idx}"
                    class="accordion-collapse collapse ${idx === 0 ? 'show' : ''}"
                >
                    <div class="accordion-body">${section.body}</div>
                </div>
            </div>
        `).join('');

        return `
            <div class="product-detail-card">
                <img
                    src="${data.src || `https://placehold.co/800x300/1a1a2e/FF8C00?text=${encodeURIComponent(data.title)}`}"
                    class="product-detail-img"
                    alt="${data.title}"
                    onerror="this.src='https://placehold.co/800x300/1a1a2e/FF8C00?text=${encodeURIComponent(data.title)}'"
                >
                <div class="product-detail-body">
                    <h1 class="product-detail-title">${data.title}</h1>
                    <div class="route-card-subtitle mb-3">${data.subtitle || ''}</div>

                    <div class="stats-row">
                        <div class="stat-block">
                            <div class="stat-value">${data.distance_km || data.distance || '—'} км</div>
                            <div class="stat-label">Протяжённость</div>
                        </div>
                        <div class="stat-block">
                            <div class="stat-value">${data.rate_per_km || data.rate || '—'} ₽/км</div>
                            <div class="stat-label">Тариф</div>
                        </div>
                        <div class="stat-block">
                            <div class="stat-value">${data.speed_limit || data.speed || '—'}</div>
                            <div class="stat-label">Макс. скорость</div>
                        </div>
                    </div>

                    <p class="product-detail-text">${data.text || ''}</p>

                    <!-- 3D модель (ДЗ часть 2) -->
                    <div class="threed-block">
                        <div class="threed-title">🚗 3D модель транспортного средства</div>
                        <div class="threed-hint">Зажми и тяни мышью для вращения • Колёсико для зума</div>
                        <canvas id="toll-road-3d-canvas"></canvas>
                        <div id="threed-loading" class="threed-loading">Загрузка 3D модели...</div>
                    </div>

                    ${sections.length > 0 ? `
                        <h5 class="fw-bold mb-3 mt-4" style="color:#1a1a2e">Участки трассы</h5>
                        <div class="accordion" id="accordion-${data.id}">
                            ${accordionItems}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    initThreeJS() {
        // Импортируем Three.js через importmap
        import('three').then(THREE => {
            import('three/examples/jsm/loaders/GLTFLoader.js').then(({ GLTFLoader }) => {
                import('three/examples/jsm/controls/OrbitControls.js').then(({ OrbitControls }) => {

                    const canvas = document.getElementById('toll-road-3d-canvas');
                    const loadingDiv = document.getElementById('threed-loading');
                    if (!canvas) return;

                    // Сцена
                    const scene = new THREE.Scene();
                    scene.background = new THREE.Color(0x1a1a2e);

                    // Камера
                    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
                    camera.position.set(2, 0.5, 3);
                    camera.lookAt(-1, 0, -3);

                    // Рендерер
                    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
                    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
                    renderer.setPixelRatio(window.devicePixelRatio);

                    // Освещение
                    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
                    scene.add(ambientLight);
                    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
                    dirLight.position.set(5, 10, 5);
                    scene.add(dirLight);

                    // OrbitControls
                    const controls = new OrbitControls(camera, renderer.domElement);
                    controls.enableDamping = true;
                    controls.dampingFactor = 0.05;

                    // Загрузка GLB модели
                    const loader = new GLTFLoader();
                    loader.load(
                        'models/cartoon banana car.glb',
                        (gltf) => {
                            const toll_road_model = gltf.scene;

                            // Центрируем модель
                            const box = new THREE.Box3().setFromObject(toll_road_model);
                            const center = box.getCenter(new THREE.Vector3());
                            toll_road_model.position.sub(center);
                            toll_road_model.scale.set(0.05, 0.05, 0.05);

                            scene.add(toll_road_model);
                            loadingDiv.style.display = 'none';
                        },
                        undefined,
                        (err) => {
                            loadingDiv.textContent = '⚠️ Не удалось загрузить модель';
                            console.error('GLB load error:', err);
                        }
                    );

                    // Анимация
                    function animate() {
                        requestAnimationFrame(animate);
                        controls.update();
                        renderer.render(scene, camera);
                    }
                    animate();
                });
            });
        });
    }

    render(data) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        this.initThreeJS();
    }
}
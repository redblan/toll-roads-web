class u{constructor(u){this.parent=u}getHTML(u){return`
            <div class="col-12 col-md-6 col-xl-4">
                <div class="route-card" data-id="${u.id}">
                    <img
                        src="${u.src||`https://placehold.co/400x180/1a1a2e/FF8C00?text=${encodeURIComponent(u.title)}`}"
                        class="route-card-img"
                        alt="${u.title}"
                        onerror="this.src='https://placehold.co/400x180/1a1a2e/FF8C00?text=${encodeURIComponent(u.title)}'"
                    >
                    <div class="route-card-body">
                        <span class="route-card-badge">\u{41F}\u{43B}\u{430}\u{442}\u{43D}\u{430}\u{44F} \u{434}\u{43E}\u{440}\u{43E}\u{433}\u{430}</span>
                        <div class="route-card-title">${u.title}</div>
                        <div class="route-card-subtitle">${u.subtitle||""}</div>
                        <div class="route-card-info">
                            \u{1F4CF} \u{41F}\u{440}\u{43E}\u{442}\u{44F}\u{436}\u{451}\u{43D}\u{43D}\u{43E}\u{441}\u{442}\u{44C}: <strong>${u.distance_km} \u{43A}\u{43C}</strong><br>
                            \u{1F4B0} \u{422}\u{430}\u{440}\u{438}\u{444}: <strong>${u.rate_per_km} \u{20BD}/\u{43A}\u{43C}</strong><br>
                            \u{1F697} \u{421}\u{43A}\u{43E}\u{440}\u{43E}\u{441}\u{442}\u{44C}: <strong>${u.speed_limit||"—"}</strong>
                        </div>
                        <div class="route-card-actions">
                            <button class="btn btn-route btn-details">\u{41F}\u{43E}\u{434}\u{440}\u{43E}\u{431}\u{43D}\u{435}\u{435} \u{2192}</button>
                            <button class="btn btn-edit">\u{270F}\u{FE0F}</button>
                            <button class="btn btn-delete">\u{1F5D1}</button>
                        </div>
                    </div>
                </div>
            </div>
        `}render(u,t,e,a){this.parent.insertAdjacentHTML("beforeend",this.getHTML(u));let d=this.parent.querySelectorAll(".route-card"),i=d[d.length-1];i.querySelector(".btn-details").addEventListener("click",u=>{u.stopPropagation(),t()}),i.addEventListener("click",t),i.querySelector(".btn-edit").addEventListener("click",u=>{u.stopPropagation(),a()}),i.querySelector(".btn-delete").addEventListener("click",u=>{u.stopPropagation(),e()})}}class t{constructor(u){this.parent=u}getHTML(u){let t=u.sections||[],e=t.map((t,e)=>`
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button ${0===e?"":"collapsed"}"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#section-${u.id}-${e}"
                    >
                        ${t.title}
                    </button>
                </h2>
                <div
                    id="section-${u.id}-${e}"
                    class="accordion-collapse collapse ${0===e?"show":""}"
                >
                    <div class="accordion-body">${t.body}</div>
                </div>
            </div>
        `).join("");return`
            <div class="product-detail-card">
                <img
                    src="${u.src||`https://placehold.co/800x300/1a1a2e/FF8C00?text=${encodeURIComponent(u.title)}`}"
                    class="product-detail-img"
                    alt="${u.title}"
                    onerror="this.src='https://placehold.co/800x300/1a1a2e/FF8C00?text=${encodeURIComponent(u.title)}'"
                >
                <div class="product-detail-body">
                    <h1 class="product-detail-title">${u.title}</h1>
                    <div class="route-card-subtitle mb-3">${u.subtitle||""}</div>

                    <div class="stats-row">
                        <div class="stat-block">
                            <div class="stat-value">${u.distance_km||u.distance||"—"} \u{43A}\u{43C}</div>
                            <div class="stat-label">\u{41F}\u{440}\u{43E}\u{442}\u{44F}\u{436}\u{451}\u{43D}\u{43D}\u{43E}\u{441}\u{442}\u{44C}</div>
                        </div>
                        <div class="stat-block">
                            <div class="stat-value">${u.rate_per_km||u.rate||"—"} \u{20BD}/\u{43A}\u{43C}</div>
                            <div class="stat-label">\u{422}\u{430}\u{440}\u{438}\u{444}</div>
                        </div>
                        <div class="stat-block">
                            <div class="stat-value">${u.speed_limit||u.speed||"—"}</div>
                            <div class="stat-label">\u{41C}\u{430}\u{43A}\u{441}. \u{441}\u{43A}\u{43E}\u{440}\u{43E}\u{441}\u{442}\u{44C}</div>
                        </div>
                    </div>

                    <p class="product-detail-text">${u.text||""}</p>

                    ${t.length>0?`
                        <h5 class="fw-bold mb-3" style="color:#1a1a2e">\u{423}\u{447}\u{430}\u{441}\u{442}\u{43A}\u{438} \u{442}\u{440}\u{430}\u{441}\u{441}\u{44B}</h5>
                        <div class="accordion" id="accordion-${u.id}">
                            ${e}
                        </div>
                    `:""}
                </div>
            </div>
        `}render(u){this.parent.insertAdjacentHTML("beforeend",this.getHTML(u))}}class e{constructor(u){this.parent=u}addListeners(u){document.getElementById("back-button").addEventListener("click",u)}getHTML(){return'<button id="back-button" class="btn btn-back">← Все маршруты</button>'}render(u){this.parent.insertAdjacentHTML("beforeend",this.getHTML()),this.addListeners(u)}}let a="http://localhost:3000/routes";async function d(u){let t=u?`${a}?title=${encodeURIComponent(u)}`:a,e=await fetch(t);if(!e.ok)throw Error(`\u{41E}\u{448}\u{438}\u{431}\u{43A}\u{430} ${e.status}`);return await e.json()}async function i(u){let t=await fetch(`${a}/${u}`);if(!t.ok)throw Error(`\u{41E}\u{448}\u{438}\u{431}\u{43A}\u{430} ${t.status}`);return await t.json()}async function n(u){let t=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)});if(!t.ok)throw Error(`\u{41E}\u{448}\u{438}\u{431}\u{43A}\u{430} ${t.status}`);return await t.json()}async function l(u,t){let e=await fetch(`${a}/${u}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok)throw Error(`\u{41E}\u{448}\u{438}\u{431}\u{43A}\u{430} ${e.status}`);return await e.json()}async function s(u){let t=await fetch(`${a}/${u}`,{method:"DELETE"});if(!t.ok)throw Error(`\u{41E}\u{448}\u{438}\u{431}\u{43A}\u{430} ${t.status}`)}class r{constructor(u,t){this.parent=u,this.toll_road_id=t}getHTML(){return`
            <div id="product-page">
                <nav class="autodor-navbar navbar">
                    <div class="container d-flex justify-content-between align-items-center">
                        <span class="autodor-brand">\u{1F6E3} \u{410}\u{432}\u{442}\u{43E}\u{434}\u{43E}\u{440}</span>
                        <button class="btn btn-home" id="btn-home">\u{1F3E0} \u{414}\u{43E}\u{43C}\u{43E}\u{439}</button>
                    </div>
                </nav>
                <div class="product-hero">
                    <div class="container">
                        <h1 id="product-title">\u{417}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...</h1>
                    </div>
                </div>
                <div class="container" id="product-content"></div>
            </div>
        `}async render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),document.getElementById("btn-home").addEventListener("click",()=>{new c(this.parent).render()});let u=document.getElementById("product-content");new e(u).render(()=>new c(this.parent).render());try{let e=await i(this.toll_road_id);document.getElementById("product-title").textContent=`\u{1F6E3} ${e.title}`,new t(u).render(e),u.insertAdjacentHTML("beforeend",'<p class="footer-note">© Баринов Егор Сергеевич, ИУ5-41Б — Лабораторная работа 6</p>')}catch(t){u.innerHTML=`<p class="text-danger mt-3">\u{41E}\u{448}\u{438}\u{431}\u{43A}\u{430} \u{437}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{438}: ${t.message}</p>`}}}class o{constructor(u,t){this.parent=u,this.toll_road_id=t}getHTML(u={}){let t=!this.toll_road_id;return`
            <div id="edit-page">
                <nav class="autodor-navbar navbar">
                    <div class="container d-flex justify-content-between align-items-center">
                        <span class="autodor-brand">\u{1F6E3} \u{410}\u{432}\u{442}\u{43E}\u{434}\u{43E}\u{440}</span>
                        <button class="btn btn-home" id="btn-home">\u{1F3E0} \u{414}\u{43E}\u{43C}\u{43E}\u{439}</button>
                    </div>
                </nav>

                <div class="product-hero">
                    <div class="container">
                        <h1>${t?"➕ Новый маршрут":"✏️ Редактирование: "+(u.title||"")}</h1>
                    </div>
                </div>

                <div class="container">
                    <button class="btn btn-back" id="btn-back">\u{2190} \u{41D}\u{430}\u{437}\u{430}\u{434}</button>

                    <div class="edit-card">
                        <div class="edit-form">
                            <div class="edit-field">
                                <label>\u{41D}\u{430}\u{437}\u{432}\u{430}\u{43D}\u{438}\u{435} \u{442}\u{440}\u{430}\u{441}\u{441}\u{44B}</label>
                                <input type="text" id="field_toll_road_title" class="edit-input"
                                    placeholder="\u{41D}\u{430}\u{43F}\u{440}\u{438}\u{43C}\u{435}\u{440}: \u{41C}11 \xab\u{41D}\u{435}\u{432}\u{430}\xbb"
                                    value="${u.title||""}">
                            </div>
                            <div class="edit-field">
                                <label>\u{41C}\u{430}\u{440}\u{448}\u{440}\u{443}\u{442}</label>
                                <input type="text" id="field_toll_road_subtitle" class="edit-input"
                                    placeholder="\u{41D}\u{430}\u{43F}\u{440}\u{438}\u{43C}\u{435}\u{440}: \u{41C}\u{43E}\u{441}\u{43A}\u{432}\u{430} \u{2014} \u{421}\u{430}\u{43D}\u{43A}\u{442}-\u{41F}\u{435}\u{442}\u{435}\u{440}\u{431}\u{443}\u{440}\u{433}"
                                    value="${u.subtitle||""}">
                            </div>
                            <div class="edit-field">
                                <label>\u{41F}\u{440}\u{43E}\u{442}\u{44F}\u{436}\u{451}\u{43D}\u{43D}\u{43E}\u{441}\u{442}\u{44C} (\u{43A}\u{43C})</label>
                                <input type="number" id="field_toll_road_distance" class="edit-input"
                                    placeholder="\u{41D}\u{430}\u{43F}\u{440}\u{438}\u{43C}\u{435}\u{440}: 684"
                                    value="${u.distance_km||""}">
                            </div>
                            <div class="edit-field">
                                <label>\u{422}\u{430}\u{440}\u{438}\u{444} (\u{20BD}/\u{43A}\u{43C})</label>
                                <input type="number" id="field_toll_road_rate" class="edit-input"
                                    placeholder="\u{41D}\u{430}\u{43F}\u{440}\u{438}\u{43C}\u{435}\u{440}: 4.5" step="0.01"
                                    value="${u.rate_per_km||""}">
                            </div>
                            <div class="edit-field">
                                <label>\u{41E}\u{433}\u{440}\u{430}\u{43D}\u{438}\u{447}\u{435}\u{43D}\u{438}\u{435} \u{441}\u{43A}\u{43E}\u{440}\u{43E}\u{441}\u{442}\u{438}</label>
                                <input type="text" id="field_toll_road_speed" class="edit-input"
                                    placeholder="\u{41D}\u{430}\u{43F}\u{440}\u{438}\u{43C}\u{435}\u{440}: 110\u{2013}130 \u{43A}\u{43C}/\u{447}"
                                    value="${u.speed_limit||""}">
                            </div>
                            <div class="edit-field">
                                <label>\u{413}\u{43E}\u{434} \u{43E}\u{442}\u{43A}\u{440}\u{44B}\u{442}\u{438}\u{44F}</label>
                                <input type="number" id="field_toll_road_year" class="edit-input"
                                    placeholder="\u{41D}\u{430}\u{43F}\u{440}\u{438}\u{43C}\u{435}\u{440}: 2019"
                                    value="${u.opened_year||""}">
                            </div>
                            <div class="edit-field edit-field-full">
                                <label>\u{41E}\u{43F}\u{438}\u{441}\u{430}\u{43D}\u{438}\u{435}</label>
                                <textarea id="field_toll_road_text" class="edit-input edit-textarea"
                                    placeholder="\u{41E}\u{43F}\u{438}\u{441}\u{430}\u{43D}\u{438}\u{435} \u{442}\u{440}\u{430}\u{441}\u{441}\u{44B}...">${u.text||""}</textarea>
                            </div>
                        </div>

                        <div id="edit-error" class="toll-error-msg" style="display:none"></div>

                        <button class="btn btn-save" id="btn-save">
                            \u{1F4BE} \u{421}\u{43E}\u{445}\u{440}\u{430}\u{43D}\u{438}\u{442}\u{44C}
                        </button>
                    </div>

                    <p class="footer-note">\xa9 \u{411}\u{430}\u{440}\u{438}\u{43D}\u{43E}\u{432} \u{415}\u{433}\u{43E}\u{440} \u{421}\u{435}\u{440}\u{433}\u{435}\u{435}\u{432}\u{438}\u{447}, \u{418}\u{423}5-41\u{411} \u{2014} \u{41B}\u{430}\u{431}\u{43E}\u{440}\u{430}\u{442}\u{43E}\u{440}\u{43D}\u{430}\u{44F} \u{440}\u{430}\u{431}\u{43E}\u{442}\u{430} 6</p>
                </div>
            </div>
        `}_getFormData(){return{title:document.getElementById("field_toll_road_title").value,subtitle:document.getElementById("field_toll_road_subtitle").value,distance_km:parseFloat(document.getElementById("field_toll_road_distance").value),rate_per_km:parseFloat(document.getElementById("field_toll_road_rate").value),speed_limit:document.getElementById("field_toll_road_speed").value,opened_year:parseInt(document.getElementById("field_toll_road_year").value),text:document.getElementById("field_toll_road_text").value}}async save(){let u=document.getElementById("edit-error"),t=document.getElementById("btn-save"),e=this._getFormData();if(!e.title||!e.distance_km||!e.rate_per_km){u.textContent="⚠️ Заполните обязательные поля: название, протяжённость, тариф",u.style.display="block";return}t.disabled=!0,t.textContent="Сохранение...";try{this.toll_road_id?await l(this.toll_road_id,e):await n(e),new c(this.parent).render()}catch(e){u.textContent="⚠️ Ошибка сохранения: "+e.message,u.style.display="block",t.disabled=!1,t.textContent="💾 Сохранить"}}async render(){if(this.parent.innerHTML="",this.toll_road_id)try{let u=await i(this.toll_road_id);this.parent.insertAdjacentHTML("beforeend",this.getHTML(u))}catch{this.parent.insertAdjacentHTML("beforeend",this.getHTML())}else this.parent.insertAdjacentHTML("beforeend",this.getHTML());document.getElementById("btn-home").addEventListener("click",()=>{new c(this.parent).render()}),document.getElementById("btn-back").addEventListener("click",()=>{new c(this.parent).render()}),document.getElementById("btn-save").addEventListener("click",()=>{this.save()})}}class c{constructor(u){this.parent=u}getHTML(){return`
            <div id="main-page">
                <nav class="autodor-navbar navbar">
                    <div class="container d-flex justify-content-between align-items-center">
                        <span class="autodor-brand">\u{1F6E3} \u{410}\u{432}\u{442}\u{43E}\u{434}\u{43E}\u{440}</span>
                        <button class="btn btn-home" id="btn-home">\u{1F3E0} \u{414}\u{43E}\u{43C}\u{43E}\u{439}</button>
                    </div>
                </nav>

                <div class="main-hero">
                    <div class="container">
                        <h1>\u{1F6E3} \u{41F}\u{43B}\u{430}\u{442}\u{43D}\u{44B}\u{435} \u{434}\u{43E}\u{440}\u{43E}\u{433}\u{438} \u{420}\u{43E}\u{441}\u{441}\u{438}\u{438}</h1>
                        <p>\u{413}\u{43E}\u{441}\u{443}\u{434}\u{430}\u{440}\u{441}\u{442}\u{432}\u{435}\u{43D}\u{43D}\u{430}\u{44F} \u{43A}\u{43E}\u{43C}\u{43F}\u{430}\u{43D}\u{438}\u{44F} \xab\u{410}\u{432}\u{442}\u{43E}\u{434}\u{43E}\u{440}\xbb \u{443}\u{43F}\u{440}\u{430}\u{432}\u{43B}\u{44F}\u{435}\u{442} \u{441}\u{43A}\u{43E}\u{440}\u{43E}\u{441}\u{442}\u{43D}\u{44B}\u{43C}\u{438} \u{430}\u{432}\u{442}\u{43E}\u{43C}\u{430}\u{433}\u{438}\u{441}\u{442}\u{440}\u{430}\u{43B}\u{44F}\u{43C}\u{438} \u{444}\u{435}\u{434}\u{435}\u{440}\u{430}\u{43B}\u{44C}\u{43D}\u{43E}\u{433}\u{43E} \u{437}\u{43D}\u{430}\u{447}\u{435}\u{43D}\u{438}\u{44F}.</p>
                    </div>
                </div>

                <div class="container">
                    <div class="d-flex gap-2 mb-4 flex-wrap align-items-center">
                        <input
                            type="text"
                            id="toll_road_filter"
                            class="toll-filter-input"
                            placeholder="\u{1F50D} \u{41F}\u{43E}\u{438}\u{441}\u{43A} \u{43F}\u{43E} \u{43D}\u{430}\u{437}\u{432}\u{430}\u{43D}\u{438}\u{44E} \u{442}\u{440}\u{430}\u{441}\u{441}\u{44B}..."
                        >
                        <button class="btn btn-add-route" id="btn-add-route">+ \u{414}\u{43E}\u{431}\u{430}\u{432}\u{438}\u{442}\u{44C}</button>
                    </div>

                    <div class="section-title">\u{41C}\u{430}\u{440}\u{448}\u{440}\u{443}\u{442}\u{44B}</div>
                    <div id="toll-road-error" class="toll-error-msg" style="display:none">
                        \u{26A0}\u{FE0F} \u{41D}\u{435} \u{443}\u{434}\u{430}\u{43B}\u{43E}\u{441}\u{44C} \u{437}\u{430}\u{433}\u{440}\u{443}\u{437}\u{438}\u{442}\u{44C} \u{434}\u{430}\u{43D}\u{43D}\u{44B}\u{435}. \u{423}\u{431}\u{435}\u{434}\u{438}\u{442}\u{435}\u{441}\u{44C} \u{447}\u{442}\u{43E} \u{431}\u{44D}\u{43A}\u{435}\u{43D}\u{434} \u{437}\u{430}\u{43F}\u{443}\u{449}\u{435}\u{43D} \u{43D}\u{430} \u{43F}\u{43E}\u{440}\u{442}\u{443} 3000.
                    </div>
                    <div id="toll-road-loading" class="toll-loading">\u{417}\u{430}\u{433}\u{440}\u{443}\u{437}\u{43A}\u{430}...</div>
                    <div class="row g-4" id="routes-grid"></div>
                    <p class="footer-note">\xa9 \u{411}\u{430}\u{440}\u{438}\u{43D}\u{43E}\u{432} \u{415}\u{433}\u{43E}\u{440} \u{421}\u{435}\u{440}\u{433}\u{435}\u{435}\u{432}\u{438}\u{447}, \u{418}\u{423}5-41\u{411} \u{2014} \u{41B}\u{430}\u{431}\u{43E}\u{440}\u{430}\u{442}\u{43E}\u{440}\u{43D}\u{430}\u{44F} \u{440}\u{430}\u{431}\u{43E}\u{442}\u{430} 6</p>
                </div>
            </div>
        `}async loadTollRoads(t=""){let e=document.getElementById("routes-grid"),a=document.getElementById("toll-road-loading"),i=document.getElementById("toll-road-error");e.innerHTML="",a.style.display="block",i.style.display="none";try{let i=await d(t);a.style.display="none",i.forEach(t=>{new u(e).render(t,()=>this.clickCard(t.id),()=>this.deleteRoute(t.id),()=>this.editRoute(t.id))})}catch(u){a.style.display="none",i.style.display="block",console.error("fetch error:",u)}}clickCard(u){new r(this.parent,u).render()}editRoute(u){new o(this.parent,u).render()}async deleteRoute(u){try{await s(u),this.loadTollRoads(document.getElementById("toll_road_filter")?.value||"")}catch(u){alert("Ошибка удаления: "+u.message)}}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),document.getElementById("btn-home").addEventListener("click",()=>{new c(this.parent).render()}),document.getElementById("btn-add-route").addEventListener("click",()=>{new o(this.parent,null).render()}),document.getElementById("toll_road_filter").addEventListener("input",u=>{this.loadTollRoads(u.target.value)}),this.loadTollRoads()}}new c(document.getElementById("root")).render();
//# sourceMappingURL=web-labs.64b98899.js.map

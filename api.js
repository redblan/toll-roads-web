// ─── XHR-сервис для работы с API платных дорог (ЛР 4) ───
// Все запросы к бэкенду http://localhost:3000

const TOLL_ROAD_API_URL = 'http://localhost:3000/routes';

// Получить список трасс с фильтрацией по названию
export function xhr_get_toll_road_list(title_filter, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    const url = title_filter
        ? `${TOLL_ROAD_API_URL}?title=${encodeURIComponent(title_filter)}`
        : TOLL_ROAD_API_URL;

    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            onSuccess(JSON.parse(xhr.responseText));
        } else {
            onError(xhr.status);
        }
    };
    xhr.onerror = function () { onError('network error'); };
    xhr.send();
}

// Получить одну трассу по id
export function xhr_get_toll_road(id, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${TOLL_ROAD_API_URL}/${id}`, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            onSuccess(JSON.parse(xhr.responseText));
        } else {
            onError(xhr.status);
        }
    };
    xhr.onerror = function () { onError('network error'); };
    xhr.send();
}

// Создать новую трассу
export function xhr_create_toll_road(toll_road_data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', TOLL_ROAD_API_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 201) {
            onSuccess(JSON.parse(xhr.responseText));
        } else {
            onError(xhr.status);
        }
    };
    xhr.onerror = function () { onError('network error'); };
    xhr.send(JSON.stringify(toll_road_data));
}

// Обновить трассу
export function xhr_update_toll_road(id, toll_road_data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', `${TOLL_ROAD_API_URL}/${id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            onSuccess(JSON.parse(xhr.responseText));
        } else {
            onError(xhr.status);
        }
    };
    xhr.onerror = function () { onError('network error'); };
    xhr.send(JSON.stringify(toll_road_data));
}

// Удалить трассу
export function xhr_delete_toll_road(id, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${TOLL_ROAD_API_URL}/${id}`, true);
    xhr.onload = function () {
        if (xhr.status === 204) {
            onSuccess();
        } else {
            onError(xhr.status);
        }
    };
    xhr.onerror = function () { onError('network error'); };
    xhr.send();
}
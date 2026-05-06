// ─── Fetch-сервис для работы с API платных дорог (ЛР 6) ───
// Заменяем XHR на fetch + промисы

const TOLL_ROAD_API_URL = 'http://localhost:3000/routes';

// Получить список трасс с фильтрацией
export async function fetch_get_toll_road_list(title_filter) {
    const url = title_filter
        ? `${TOLL_ROAD_API_URL}?title=${encodeURIComponent(title_filter)}`
        : TOLL_ROAD_API_URL;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Ошибка ${response.status}`);
    return await response.json();
}

// Получить одну трассу по id
export async function fetch_get_toll_road(id) {
    const response = await fetch(`${TOLL_ROAD_API_URL}/${id}`);
    if (!response.ok) throw new Error(`Ошибка ${response.status}`);
    return await response.json();
}

// Создать новую трассу
export async function fetch_create_toll_road(toll_road_data) {
    const response = await fetch(TOLL_ROAD_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toll_road_data)
    });
    if (!response.ok) throw new Error(`Ошибка ${response.status}`);
    return await response.json();
}

// Обновить трассу
export async function fetch_update_toll_road(id, toll_road_data) {
    const response = await fetch(`${TOLL_ROAD_API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toll_road_data)
    });
    if (!response.ok) throw new Error(`Ошибка ${response.status}`);
    return await response.json();
}

// Удалить трассу
export async function fetch_delete_toll_road(id) {
    const response = await fetch(`${TOLL_ROAD_API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error(`Ошибка ${response.status}`);
}
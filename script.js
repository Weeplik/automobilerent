let cars = [];
let page = 1;

document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('carsList')) return;
    
    cars = [...carsData];
    show();
    
    let search = document.getElementById('searchInput');
    let sort = document.getElementById('sortSelect');
    
    if (search) search.addEventListener('input', () => {
        page = 1;
        show();
    });
    
    if (sort) sort.addEventListener('change', () => {
        page = 1;
        show();
    });
    
    let prev = document.getElementById('prevBtn');
    let next = document.getElementById('nextBtn');
    
    if (prev) prev.addEventListener('click', () => {
        if (page > 1) page--;
        show();
    });
    
    if (next) next.addEventListener('click', () => {
        if (page < Math.ceil(filter().length / 6)) page++;
        show();
    });
});

function filter() {
    let r = [...carsData];
    let s = (document.getElementById('searchInput')?.value || '').toLowerCase();
    
    if (s) {
        r = r.filter(c => 
            c.brand.toLowerCase().includes(s) || 
            c.model.toLowerCase().includes(s)
        );
    }
    
    let o = document.getElementById('sortSelect')?.value;
    if (o === 'price-asc') r.sort((a, b) => a.price - b.price);
    if (o === 'price-desc') r.sort((a, b) => b.price - a.price);
    if (o === 'name-asc') r.sort((a, b) => (a.brand + a.model).localeCompare(b.brand + b.model));
    if (o === 'name-desc') r.sort((a, b) => (b.brand + b.model).localeCompare(a.brand + a.model));
    
    return r;
}

function show() {
    let f = filter();
    let list = f.slice((page - 1) * 6, page * 6);
    
    let h = '';
    list.forEach(car => {
        const isCamry = car.brand === 'Toyota' && car.model === 'Camry';
        const detailUrl = isCamry ? 'car-detail.html' : '#';
        h += `<div class="car-card">
            <a href="${detailUrl}"><img src="${car.image}" alt="${car.brand} ${car.model}"></a>
            <h3><a href="${detailUrl}">${car.brand} ${car.model}</a></h3>
            <p>Год: ${car.year} | Мест: ${car.seats}</p>
            <p class="price">${car.price} ₽/день</p>
            <button onclick="book(${car.id})">Забронировать</button>
        </div>`;
    });
    
    document.getElementById('carsList').innerHTML = h || '<div style="text-align:center;padding:2rem;">Не найдено</div>';
    
    let cnt = document.getElementById('resultCount');
    if (cnt) cnt.textContent = f.length;
    
    let t = Math.ceil(f.length / 6);
    document.getElementById('prevBtn').disabled = page === 1;
    document.getElementById('nextBtn').disabled = page === t || t === 0;
}

function book(id) {
    let car = carsData.find(c => c.id === id);
    if (car) alert(`${car.brand} ${car.model} - ${car.price} ₽`);
}

// Configuração inicial
let searchTimeout;

// Inicialização da página
function initPage() {
    setupMobileMenu();
    setupEventListeners();
    filterProducts();
}

// Menu mobile
function setupMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('.mobile-nav');
    
    mobileMenuButton?.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
    });
    
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuButton.classList.remove('active');
        });
    });
}

// Event listeners
function setupEventListeners() {
    // Busca
    document.getElementById('search-button')?.addEventListener('click', filterProducts);
    document.getElementById('search-input')?.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterProducts();
    });
    
    // Filtros
    document.getElementById('price-filter')?.addEventListener('change', filterProducts);
    document.getElementById('category-filter')?.addEventListener('change', filterProducts);
    document.getElementById('brand-filter')?.addEventListener('change', filterProducts);
    document.getElementById('sort-by')?.addEventListener('change', filterProducts);
    document.getElementById('clear-filters')?.addEventListener('click', clearFilters);
}

// Filtragem de produtos
function filterProducts() {
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const priceFilter = document.getElementById('price-filter')?.value || '';
    const categoryFilter = document.getElementById('category-filter')?.value || '';
    const brandFilter = document.getElementById('brand-filter')?.value || '';
    const sortBy = document.getElementById('sort-by')?.value || 'name-asc';

    // Juntar todos os produtos
    let allProducts = [];
    for (const category in window.productsData) {
        allProducts = allProducts.concat(window.productsData[category].map(p => ({ ...p, category })));
    }

    // Aplicar filtros
    let filteredProducts = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                           product.brand.toLowerCase().includes(searchTerm);
        
        const matchesPrice = !priceFilter || (() => {
            const [min, max] = priceFilter.split('-');
            if (max) return product.price >= +min && product.price <= +max;
            return product.price >= +min.replace('+', '');
        })();
        
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        const matchesBrand = !brandFilter || product.brand === brandFilter;
        
        return matchesSearch && matchesPrice && matchesCategory && matchesBrand;
    });

    // Ordenação
    filteredProducts.sort((a, b) => {
        switch (sortBy) {
            case 'name-asc': return a.name.localeCompare(b.name);
            case 'name-desc': return b.name.localeCompare(a.name);
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            default: return 0;
        }
    });

    // Renderização
    if (searchTerm || priceFilter || categoryFilter || brandFilter) {
        document.querySelectorAll('section[id^="category-"]').forEach(section => {
            section.style.display = 'none';
        });
        renderProducts(filteredProducts, 'featured');
    } else {
        document.querySelectorAll('section[id^="category-"]').forEach(section => {
            section.style.display = 'block';
            const categoryId = section.id;
            const categoryProducts = window.productsData[categoryId] || [];
            renderProducts(categoryProducts, categoryId);
        });
        
        const featuredProducts = [
            ...(window.productsData.smartphones || []).slice(0, 2),
            ...(window.productsData.cases || []).slice(0, 1),
            ...(window.productsData.headphones || []).slice(0, 1),
            ...(window.productsData.chargers || []).slice(0, 1)
        ];
        renderProducts(featuredProducts, 'featured');
    }
}

// Renderizar produtos
function renderProducts(productsToRender, containerId) {
    const container = document.querySelector(`#${containerId} .products-container`);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (productsToRender.length === 0) {
        container.innerHTML = '<p class="no-products">Nenhum produto encontrado.</p>';
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-brand">${product.brand}</p>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <a href="produto.html?id=${product.id}" class="add-to-cart">Ver Detalhes</a>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Limpar filtros
function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('price-filter').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('brand-filter').value = '';
    document.getElementById('sort-by').value = 'name-asc';
    filterProducts();
}

// Iniciar
document.addEventListener('DOMContentLoaded', initPage);
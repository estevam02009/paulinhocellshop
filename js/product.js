// Carregar dados do produto
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        showError("Produto não especificado");
        return;
    }

    // Encontrar produto em todas as categorias
    let product = null;
    for (const category in window.productsData) {
        product = window.productsData[category].find(p => p.id === productId);
        if (product) break;
    }
    
    if (!product) {
        showError("Produto não encontrado");
        return;
    }
    
    // Preencher informações
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-brand').textContent = product.brand;
    document.getElementById('product-price').textContent = `R$ ${product.price.toFixed(2)}`;
    document.getElementById('product-description').textContent = product.description;
    
    // Preencher especificações
    if (product.specs) {
        for (const [key, value] of Object.entries(product.specs)) {
            const element = document.getElementById(`spec-${key}`);
            if (element) element.textContent = value;
        }
    }
    
    // Carregar imagens
    if (product.images?.length > 0) {
        const mainImg = document.getElementById('main-product-image');
        mainImg.src = product.images[0];
        mainImg.alt = product.name;
        
        const thumbnails = document.querySelectorAll('.thumbnail img');
        product.images.forEach((img, i) => {
            if (thumbnails[i]) {
                thumbnails[i].src = img;
                thumbnails[i].alt = `${product.name} - Imagem ${i+1}`;
            }
        });
    }
    
    // Carregar produtos relacionados
    loadRelatedProducts(product.category, productId);
}

// Mostrar erro
function showError(message) {
    const container = document.querySelector('.product-detail-container');
    container.innerHTML = `
        <div class="error-message">
            <h2>${message}</h2>
            <p>O produto solicitado não está disponível no momento.</p>
            <a href="index.html" class="cta-button">Voltar à loja</a>
        </div>
    `;
}

// Carregar produtos relacionados
function loadRelatedProducts(category, currentId) {
    const related = window.productsData[category]?.filter(p => p.id !== currentId).slice(0, 4) || [];
    const container = document.querySelector('.related-products .products-container');
    
    if (!container) return;
    container.innerHTML = '';
    
    related.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-brand">${product.brand}</p>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <a href="produto.html?id=${product.id}" class="add-to-cart">Ver Detalhes</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Configurar eventos
function setupProductPage() {
    // Miniaturas
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', () => {
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            const imgSrc = thumb.querySelector('img')?.src;
            if (imgSrc) document.getElementById('main-product-image').src = imgSrc;
        });
    });
    
    // Quantidade
    document.querySelector('.quantity-btn.minus')?.addEventListener('click', () => {
        const input = document.querySelector('.quantity-input');
        if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
    });
    
    document.querySelector('.quantity-btn.plus')?.addEventListener('click', () => {
        const input = document.querySelector('.quantity-input');
        input.value = parseInt(input.value) + 1;
    });
    
    // Botões de compra
    document.querySelector('.add-to-cart-btn')?.addEventListener('click', () => {
        const quantity = parseInt(document.querySelector('.quantity-input').value);
        alert(`Adicionado ${quantity} item(s) ao carrinho!`);
    });
    
    document.querySelector('.buy-now-btn')?.addEventListener('click', () => {
        alert('Redirecionando para checkout...');
    });
}

// Iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadProductDetails();
    setupProductPage();
});
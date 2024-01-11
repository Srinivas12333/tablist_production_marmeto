const productContainer = document.getElementById('productContainer');

async function showProducts(category) {
    try {
        if (!category) {
            console.error('Category is undefined');
            return;
        }

        const data = await fetchData();
        console.log('Received data:', data);

        if (data && data.categories && data.categories.length > 0) {
            const categoryIndex = data.categories.findIndex(cat => cat.category_name && cat.category_name.toLowerCase() === category.toLowerCase());
            if (categoryIndex !== -1) {
                const filteredProducts = data.categories[categoryIndex].category_products; // Update this line
                console.log('Filtered products:', filteredProducts);
                renderProducts(filteredProducts);
            } else {
                console.error(`No products found for category: ${category}`);
            }
        } else {
            console.error('Error fetching products or invalid data structure');
        }
    } catch (error) {
        console.error('Error in showProducts:', error);
    }
}

showProducts('Men');

async function fetchData() {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function renderProducts(products) {
    productContainer.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        const discount = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3>${product.title}</h3>
            <p>Vendor: ${product.vendor}</p>
            <p>Price: $${product.price}</p>
            <p>Compare at Price: $${product.compare_at_price}</p>
            <p>${discount}% Off</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        productContainer.appendChild(card);
    });
}

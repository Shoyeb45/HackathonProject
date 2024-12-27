function openMaterialWindow(material) {
    const newWindow = window.open('', '_blank');
    const htmlContent = `
        <html>
            <head>
                <title>${material.charAt(0).toUpperCase() + material.slice(1)} Products</title>
                <link rel="stylesheet" type="text/css" href="./src/css/material.css">
            </head>
            <body>
                <h1>Loading ${material.charAt(0).toUpperCase() + material.slice(1)} Products...</h1>
                <div id="product-container"></div>
            </body>
        </html>
    `;
    newWindow.document.write(htmlContent);

    console.log(document.getElementsByTagName("link"));
    
    getProductData(material, newWindow);
}

async function getProductData(material, newWindow) {
    try {
        const response = await fetch(`http://localhost:4000/api/v1/product/getProduct?typeOfMaterial=${material}`);
        const productData = await response.json();
        if (productData && productData.length > 0) {
            displayProducts(productData, newWindow);
        } else {
            newWindow.document.getElementById('product-container').innerHTML = 'No products available for this material.';
        }
    } catch (err) {
        newWindow.document.getElementById('product-container').innerHTML = 'Error fetching data.';
    }
}

function displayProducts(products, newWindow) {
    const productContainer = newWindow.document.getElementById("product-container");
    productContainer.innerHTML = '';
    products.forEach(product => {

        const productDiv = newWindow.document.createElement('div');

        productDiv.classList.add('product');

        productDiv.innerHTML = `

            <div class="card">
                <div class="card-header">    
                    <img src='${product.productImage[0]}' class="product-img">
                </div>
                <div class="card-body">    
                    <p>₹${product.price} <strike>${product.price + 1000}</strike></p>
                    <p>${product.description}</p>    
                    <p>Quantity: ${product.quantity}</p>
                </div>
                
                <div class="card-footer">
                    <button>Add to cart</button>
                </dib>
                    
                <h2>${product.productName}</h2>
            </div>
        `;
        productContainer.appendChild(productDiv);
    });
}

document.querySelectorAll('.materials-items').forEach(button => {
    button.addEventListener('click', (event) => {
        const selectedMaterial = event.target.getAttribute('data-material');
        openMaterialWindow(selectedMaterial);
    });
});


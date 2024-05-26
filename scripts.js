const products = [
    { name: 'Nvidia GeForce RTX 3080', imageUrl: 'rtx3080.png', price: 54000 },
    { name: 'AMD RX 6800 XT', imageUrl: 'rx6800xt.png', price: 22000 },
    { name: 'Intel CORE i9', imageUrl: 'intelxe.png', price: 19000 },
    { name: 'Nvidia GTX 1660 Ti', imageUrl: 'gtx1660ti.png', price: 20000 },
    { name: 'AMD Radeon Rx 570', imageUrl: 'RadeonRx570Amd.png', price: 9000 },
    { name: 'Nvidia GTX 1060', imageUrl: 'GTX 1060.png', price: 8200 },
    { name: 'AMD RX 6600 XT', imageUrl: 'rx6600xt.png', price: 30000 },
    { name: 'Intel Core i3', imageUrl: 'IntelCorei3.png', price: 14000 },
    { name: 'Nvidia GeForce RTX 2080', imageUrl: 'RTX2080.png', price: 34000 },
    { name: 'Intel Core i7', imageUrl: 'IntelCorei7.png', price: 17500 }
];

function loadProducts() {
    const productsSection1 = document.getElementById('products-section');
    const productsSection2 = document.getElementById('products-section-2');
    
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        const productName = document.createElement('h2');
        productName.textContent = product.name;
        
        const productImage = document.createElement('img');
        productImage.src = `images/${product.imageUrl}`;
        productImage.alt = product.name;
        
        const productPrice = document.createElement('p');
        productPrice.textContent = `${product.price} руб.`;
        
        const buyButton = document.createElement('button');
        buyButton.textContent = 'Добавить в корзину';
        buyButton.addEventListener('click', () => buyProduct(product));
        
        productDiv.appendChild(productName);
        productDiv.appendChild(productImage);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(buyButton);
        
        if (index < 5) {
            productsSection1.appendChild(productDiv);
        } else {
            productsSection2.appendChild(productDiv);
        }
    });
}

function setupButtons() {
    const buyButtons = document.querySelectorAll('.product button');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.parentNode.querySelector('h2').textContent;
            const product = products.find(product => product.name === productName);
            buyProduct(product);
        });
    });
}

function filterProducts(manufacturer) {
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(manufacturer.toLowerCase()));
    renderProducts(filteredProducts);
}

function resetFilter() {
    renderProducts(products);
    document.getElementById('about-us').style.display = 'none';
    document.getElementById('products-section').style.display = 'flex';
    document.getElementById('products-section-2').style.display = 'flex';
    document.getElementById('cart').style.display = 'block';
    document.getElementById('checkout-button').style.display = 'block';
}

function renderProducts(productsToShow) {
    const productsSection1 = document.getElementById('products-section');
    const productsSection2 = document.getElementById('products-section-2');
    productsSection1.innerHTML = '';
    productsSection2.innerHTML = '';

    productsToShow.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productName = document.createElement('h2');
        productName.textContent = product.name;

        const productImage = document.createElement('img');
        productImage.src = `images/${product.imageUrl}`;
        productImage.alt = product.name;

        const buyButton = document.createElement('button');
        buyButton.textContent = 'Добавить в корзину';
        buyButton.addEventListener('click', () => buyProduct(product));

        productDiv.appendChild(productName);
        productDiv.appendChild(productImage);
        productDiv.appendChild(buyButton);

        if (index < 5) {
            productsSection1.appendChild(productDiv);
        } else {
            productsSection2.appendChild(productDiv);
        }
    });
}

const cart = [];

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach((product, index) => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - Цена: ${product.price} руб. (Количество: ${product.quantity})`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.addEventListener('click', () => removeFromCart(product.name));
        
        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });
    updateTotalPrice();
}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    totalPriceElement.textContent = totalPrice;
}

function buyProduct(product) {
    addToCart(product);
    updateTotalPrice();
}

function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        cart[productIndex].quantity--;
        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }
    }
    renderCart();
}

window.onload = function() {
    loadProducts();
    setupButtons();
    renderProducts(products);
};

const nvidiaLogo = document.querySelector('.nvidia-logo');
nvidiaLogo.classList.add('rotate');

const checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Ваша корзина пуста. Добавьте товары в корзину перед оформлением заказа.');
    } else {
        alert('Ваш заказ успешно оформлен!');
        cart.length = 0;
        renderCart();
        updateTotalPrice();
    }
});

function showAboutUs() {
    hideAllSectionsExcept('about-us');
    document.getElementById('products-section').style.display = 'none';
    document.getElementById('products-section-2').style.display = 'none';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('checkout-button').style.display = 'none';
    const aboutUsSection = document.getElementById('about-us');
    aboutUsSection.style.display = 'block';

    // Создаем элемент для контейнера изображений
    const imagesContainer = document.createElement('div');
    imagesContainer.classList.add('images-container');

    // Создаем элементы для изображений
    const leftImage = document.createElement('img');
    leftImage.src = 'AMD-logo.png';
    leftImage.alt = 'Left Image';
    leftImage.classList.add('about-us-image');

    const rightImage = document.createElement('img');
    rightImage.src = 'nvidia_logo.png';
    rightImage.alt = 'Right Image';
    rightImage.classList.add('about-us-image');

    // Создаем контейнер для текста
    const aboutUsText = document.createElement('div');
    aboutUsText.classList.add('about-us-text');
    aboutUsText.innerHTML = `
        <h2 style="text-align: center;">О нас</h2>
        <p>Добро пожаловать в "PixelPulse" - ваш надежный партнер по видеокартам и процессорам от NVIDIA, AMD и Intel. Мы предлагаем новейшие модели для улучшения игрового и профессионального опыта.
        Наш ассортимент включает NVIDIA GeForce, AMD Ryzen и Intel Core. Вы найдете идеальные решения для любых компьютерных потребностей.
        Наш сайт обеспечивает удобный процесс покупки.
        Достигайте новых высот с нашими видеокартами и процессорами.</p>
    `;

    // Добавляем CSS стили
    leftImage.style.width = '400px';
    leftImage.style.position = 'absolute';
    leftImage.style.left = '190px';

    rightImage.style.width = '450px';
    rightImage.style.position = 'absolute';
    rightImage.style.right = '170px';

    // Добавляем изображения и текст на страницу
    aboutUsSection.innerHTML = '';
    imagesContainer.appendChild(leftImage);
    imagesContainer.appendChild(rightImage);
    aboutUsSection.appendChild(imagesContainer);
    aboutUsSection.appendChild(aboutUsText);

    // Перенастройка кнопок после обновления секции "О нас"
    setupButtons();

    // Перенастройка кнопок NVIDIA, AMD и Intel
    setupManufacturerButtons();
}

function setupManufacturerButtons() {
    const nvidiaButton = document.querySelector('nav ul li:nth-child(2) a');
    const amdButton = document.querySelector('nav ul li:nth-child(3) a');
    const intelButton = document.querySelector('nav ul li:nth-child(4) a');
    
    nvidiaButton.onclick = function() { filterProducts('NVIDIA'); };
    amdButton.onclick = function() { filterProducts('AMD'); };
    intelButton.onclick = function() { filterProducts('Intel'); };
}

function showContactUs() {
    hideAllSectionsExcept('contact-us');
    document.getElementById('products-section').style.display = 'none';
    document.getElementById('products-section-2').style.display = 'none';
    document.getElementById('cart').style.display = 'none';
    document.getElementById('checkout-button').style.display = 'none';
    const contactUsSection = document.getElementById('contact-us');
    contactUsSection.style.display = 'block';
    contactUsSection.style.textAlign = 'center'; // Выравнивание текста по центру

    // Очищаем содержимое раздела "Контакты", если оно было заполнено ранее
    contactUsSection.innerHTML = '';

    // Создаем и добавляем текст контактной информации
    const contactInfo = document.createElement('div');
    contactInfo.innerHTML = `
    <h2 style="font-size: 40px;">Контакты</h2>
    <ul style="list-style-type: none; padding: 0; display: flex; flex-direction: column;">
    <li style="font-size: 24px; margin-bottom: 10px; width: 100%;"><img src="images/email_icon.png" alt="Email icon" style="vertical-align: middle;"> Email: mfoawd3@gmail.com</li>
    <li style="font-size: 24px; margin-bottom: 10px; width: 100%;"><img src="images/phone_icon.png" alt="Phone icon" style="vertical-align: middle;"> Телефон: +79188856171</li>
    <li style="font-size: 24px; width: 100%;"><img src="images/address_icon.png" alt="Address icon" style="vertical-align: middle;"> Адрес: город Пятигорск, ул. Компьютерная, 127</li>
</ul>


    `;
    contactUsSection.appendChild(contactInfo);
    

    // Перенастройка кнопок после обновления секции "О нас"
    setupButtons();

    // Перенастройка кнопок NVIDIA, AMD и Intel
    setupManufacturerButtons();
}

function hideAllSectionsExcept(sectionIdToShow) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id === sectionIdToShow) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

const nvidialogo = document.querySelector('.nvidia-logo');
nvidiaLogo.classList.add('rotate');
nvidiaLogo.addEventListener('click', () => {
    window.location.reload(); // Перезагрузить страницу
});

function hideContactUs() {
    document.getElementById('contact-us').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');

    navButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем стандартное поведение ссылки

            const target = this.getAttribute('data-target'); // Получаем атрибут data-target

            // Выполняем соответствующее действие в зависимости от значения data-target
            if (target === 'about-us') {
                showAboutUs();
            } else if (target === 'contact-us') {
                showContactUs();
            } else if (target === 'NVIDIA') {
                filterProducts('NVIDIA');
            } else if (target === 'AMD') {
                filterProducts('AMD');
            } else if (target === 'Intel') {
                filterProducts('Intel');
            }
        });
    });
});


document.querySelector('nav ul').addEventListener('click', function(event) {
    if (event.target.classList.contains('nav-button')) {
        event.preventDefault(); // Предотвращаем стандартное действие ссылки
        const target = event.target.getAttribute('data-target'); // Получаем значение атрибута data-target
        navigateToSection(target); // Функция, которая обрабатывает переход к нужному разделу
    }
});

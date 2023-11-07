// Scroll reveal function on about.html
const reveal = () => {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.getBoundingClientRect().top;
    const revealPoint = 30;

    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add('active');
    } else {
      reveal.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', reveal);


// Basket functionality below
document.addEventListener('DOMContentLoaded', function () {

  const addToBasketButtons = document.querySelectorAll('.basket-btn');

  addToBasketButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productName = button.getAttribute('data-product-name');
      const productPrice = button.getAttribute('data-product-price');

      const product = {
        name: productName,
        price: parseFloat(productPrice),
      };

      let basket = JSON.parse(localStorage.getItem('basket')) || [];

      basket.push(product);

      localStorage.setItem('basket', JSON.stringify(basket));
      console.log('basket updated')
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {

  const basket = JSON.parse(localStorage.getItem('basket')) || [];

  if (window.location.pathname.includes('basket.html')) {

    const basketInventory = document.getElementById('basket-inventory');

    let totalAmount = 5.99;

    basketInventory.innerHTML = '';

    basket.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('basket-item');
      productElement.innerHTML = `
        <p>${product.name} - Price: £${product.price.toFixed(2)}</p>`;

      basketInventory.appendChild(productElement);

      totalAmount += product.price;
    });

    const totalAmountElement = document.getElementById('total-amount');
    totalAmountElement.textContent = totalAmount.toFixed(2);
    const clearBasketButton = document.getElementById('clear-basket-btn');
    clearBasketButton.addEventListener('click', function () {

      localStorage.removeItem('basket');

      basketInventory.innerHTML = '';
      totalAmountElement.textContent = '0.00';
    });
  }
});

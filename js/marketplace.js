// Fungsi Pencarian Produk
function searchProduct() {
    let searchInput = document.getElementById("productSearch").value.toLowerCase();
    let products = document.querySelectorAll(".craft__image");
  
    products.forEach(product => {
      let productName = product.querySelector("p").textContent.toLowerCase();
      if (productName.includes(searchInput)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }
  
  // Event Tambah Produk
  document.addEventListener("DOMContentLoaded", () => {
    const addButtons = document.querySelectorAll(".add-button");
  
    addButtons.forEach(button => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
  
        const item = button.closest(".craft__image");
        const itemName = item.querySelector("p").textContent;
        const itemPrice = item.querySelector("h4").textContent.replace('Rp', '').replace('.', '').trim();
  
        document.getElementById("selectedProduct").textContent = itemName;
        document.getElementById("totalPrice").textContent = parseInt(itemPrice, 10);
  
        document.getElementById("orderFormContainer").classList.add("show-order");
      });
    });
  
    // Tutup Form Pesanan
    document.getElementById("closeForm").addEventListener("click", () => {
      document.getElementById("orderFormContainer").classList.remove("show-order");
    });
  });
  
  // countdown
window.addEventListener("DOMContentLoaded", ()=>{
  VANTA.BIRDS({
    el: "#vanta",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    wingSpan: 40.00,
    speedLimit: 8.00,
    separation: 100.00,
    alignment: 43.00,
    quantity: 4.00,
    backgroundAlpha:0.0,
  })
  setTimeout(()=>{
  document.querySelector('main').style.opacity='1';
  document.querySelector('main').style.filter='none';
  },1000)
})

function updateCountdown() {
  const ramadanDate = new Date('Maret 01, 2025 00:00:00').getTime();
  const now = new Date().getTime();
  const distance = ramadanDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

  if (distance < 0) {
      clearInterval(countdownInterval);
      document.querySelector('.message').textContent = 'Ramadan Mubarak! 🌙';
  }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
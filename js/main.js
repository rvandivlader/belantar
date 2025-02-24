const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__container form", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".header__container a", {
  ...scrollRevealOption,
  delay: 1500,
});

const swiper = new Swiper(".swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
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

document.addEventListener('DOMContentLoaded', () => {
  const addButtons = document.querySelectorAll('.craft__image a');
  const orderFormContainer = document.querySelector('.order-form-container');
  const selectedProduct = document.getElementById('selected-product');
  const selectedPrice = document.getElementById('selected-price');
  const decreaseBtn = document.getElementById('decrease');
  const increaseBtn = document.getElementById('increase');
  const quantitySpan = document.getElementById('quantity');
  const submitOrder = document.getElementById('submitOrder');
  const closeButton = document.querySelector('.order__close');

  let quantity = 1;
  let basePrice = 0;

  // Event listener untuk tombol tambah pesanan
  addButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          event.preventDefault(); // Mencegah link default

          // Temukan elemen produk yang diklik
          const item = button.closest('.craft__image');
          const itemName = item.querySelector('p').textContent;
          const itemPrice = item.querySelector('h4').textContent.replace('Rp', '').replace('.', '').trim();

          // Ubah harga ke dalam bentuk angka
          basePrice = parseInt(itemPrice, 10);

          // Isi form dengan data produk
          selectedProduct.textContent = itemName;
          updatePrice(); // Update harga berdasarkan jumlah default (1)

          // Reset jumlah pesanan ke 1 setiap kali form muncul
          quantity = 1;
          quantitySpan.textContent = quantity;

          // Tampilkan form pemesanan
          orderFormContainer.classList.add('show-order');

          // Mencegah halaman bergulir
          document.body.classList.add('no-scroll');
      });
  });

  // Fungsi update harga total
  function updatePrice() {
      const totalPrice = basePrice * quantity;
      selectedPrice.textContent = `Rp${totalPrice.toLocaleString('id-ID')}`;
  }

  // Fungsi mengurangi jumlah pesanan
  decreaseBtn.addEventListener('click', () => {
      if (quantity > 1) {
          quantity--;
          quantitySpan.textContent = quantity;
          updatePrice();
      }
  });

  // Fungsi menambah jumlah pesanan
  increaseBtn.addEventListener('click', () => {
      quantity++;
      quantitySpan.textContent = quantity;
      updatePrice();
  });

  // Fungsi submit pesanan ke WhatsApp
  submitOrder.addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const product = selectedProduct.textContent;
    const price = selectedPrice.textContent;
    const total = quantity;

    // Ambil elemen error message
    const nameError = document.getElementById('name-error');
    const addressError = document.getElementById('address-error');

    // Reset pesan error sebelum validasi
    nameError.textContent = "";
    addressError.textContent = "";

    let isValid = true;

    // Validasi Nama
    if (name === "") {
        nameError.textContent = "Nama tidak boleh kosong!";
        isValid = false;
    }

    // Validasi Alamat
    if (address === "") {
        addressError.textContent = "Alamat tidak boleh kosong!";
        isValid = false;
    }

    // Jika ada error, hentikan proses
    if (!isValid) return;

    // Format pesan WhatsApp berdasarkan form
    const message = `Halo, saya ingin melakukan pemesanan:\n\n` +
                    `👤 Nama Pemesan: *${name}*\n` +
                    `📍 Alamat: *${address}*\n` +
                    `🍽 Pesanan: *${product}*\n` +
                    `💰 Harga Total: *${price}*\n` +
                    `🔢 Jumlah: *${total}*\n\n` +
                    `Mohon konfirmasi pesanan saya. Terima kasih!`;

    // Nomor WhatsApp tujuan (ganti dengan nomor bisnis Anda)
    const phoneNumber = "6287784862110"; // Format: 62 untuk Indonesia
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    // Buka WhatsApp dengan pesan yang telah diformat
    window.open(whatsappURL, "_blank");

    closeForm(); // Tutup form setelah submit
  });

  // Fungsi untuk menutup form dan mereset data
  function closeForm() {
      // Reset input nama dan alamat
      document.getElementById('name').value = "";
      document.getElementById('address').value = "";

      // Reset jumlah ke 1
      quantity = 1;
      quantitySpan.textContent = quantity;

      // Reset harga ke harga dasar
      updatePrice();

      // Hapus pesan error jika ada
      document.getElementById('name-error').textContent = "";
      document.getElementById('address-error').textContent = "";

      // Sembunyikan form
      orderFormContainer.classList.remove('show-order');

      // Kembalikan scroll halaman
      document.body.classList.remove('no-scroll');
  }

  // Event listener untuk tombol close
  closeButton.addEventListener('click', closeForm);
});

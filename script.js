const menu = [
  {
    id: 1,
    name: "Бешбармак",
    price: 350,
    category: "food",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500"
  },
  {
    id: 2,
    name: "Пицца",
    price: 450,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
  },
  {
    id: 3,
    name: "Чизбургер",
    price: 280,
    category: "burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
  },
  {
    id: 4,
    name: "Фри",
    price: 150,
    category: "food",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500"
  },
  {
    id: 5,
    name: "Кофе",
    price: 120,
    category: "drink",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500"
  },
  {
    id: 6,
    name: "Сок",
    price: 100,
    category: "drink",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500"
  }
];

let cart = [];
let currentCategory = "all";

const products = document.getElementById("products");
const cartBox = document.getElementById("cart");
const count = document.getElementById("count");

function showProducts() {
  const search = document.getElementById("search").value.toLowerCase();

  const filtered = menu.filter(item => {
    const matchesCategory =
      currentCategory === "all" ||
      item.category === currentCategory;

    return matchesCategory &&
      item.name.toLowerCase().includes(search);
  });

  products.innerHTML = filtered.map(item => `
    <div class="card">
      <img src="${item.image}" alt="${item.name}">
      <div class="card-content">
        <h3>${item.name}</h3>
        <p class="price">${item.price} сом</p>
        <button class="add-btn" onclick="addToCart(${item.id})">
          + Себетке кошуу
        </button>
      </div>
    </div>
  `).join("");

  if (!filtered.length) {
    products.innerHTML = "<p>Товар табылган жок.</p>";
  }
}

function addToCart(id) {
  const item = menu.find(p => p.id === id);
  const existing = cart.find(p => p.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({...item, quantity: 1});
  }

  updateCart();
}

function updateCart() {
  count.textContent = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  document.getElementById("cartItems").innerHTML =
    cart.map(item => `
      <div class="cart-row">
        <span>${item.name} × ${item.quantity}</span>
        <div>
          ${item.price * item.quantity} сом
          <button onclick="changeQuantity(${item.id}, -1)">−</button>
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
    `).join("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  document.getElementById("total").textContent = total;
}

function changeQuantity(id, amount) {
  const item = cart.find(p => p.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  updateCart();
}

document.getElementById("openCart").onclick = () => {
  cartBox.style.display = "flex";
};

document.getElementById("closeCart").onclick = () => {
  cartBox.style.display = "none";
};

document.querySelectorAll(".category-btn").forEach(button => {
  button.onclick = () => {
    currentCategory = button.dataset.category;
    showProducts();
  };
});

document.getElementById("search").oninput = showProducts;

document.getElementById("order").onclick = () => {
  if (cart.length === 0) {
    alert("Себетиңиз бош!");
    return;
  }

  const message = cart.map(item =>
    `${item.name} x ${item.quantity} = ${item.price * item.quantity} сом`
  ).join("\n");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const phone = "996504553304";

  const text = encodeURIComponent(
    "Саламатсызбы! Заказ бергим келет:\n" +
    message + "\nЖалпы: " + total + " сом"
  );

  window.open(
    `https://wa.me/${phone}?text=${text}`,
    "_blank"
  );
};

showProducts();
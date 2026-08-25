const FREE_DELIVERY_OVER = 500;
const DELIVERY_FEE = 30;
const STORAGE_KEY = "addiseats";

const state = {
dishes: [],  
cart: [], 
search: "",
category: "All" 
};

const menuEl = document.querySelector("#menu");
const cartEl = document.querySelector("#cart");
const searchEl = document.querySelector("#search");

async function loadMenu() {
menuEl.textContent = "Loading menu...";
try {
const res = await fetch("./menu.json") ;

if (!res.ok) {
    throw new Error("HTTP " + res.status);}
state.dishes = await res.json();
console.log(state.dishes );

render();
} 
catch (err) {
console.error(err);
menuEl.textContent = "Could not load the menu.";
}
}


function render() {

    const term = state.search.toLowerCase();

    const shown = state.dishes.filter(d => {

        const matchesSearch =
            d.name.toLowerCase().includes(term);

        const matchesCategory =
            state.category === "All" ||
            d.category === state.category;

        return matchesSearch && matchesCategory;
    });


    if (shown.length === 0) {

        menuEl.innerHTML = `
            <p class="empty">
                No dishes found
            </p>
        `;

    } else {

        menuEl.innerHTML = shown.map(d => `

            <article class="dish" data-id="${d.id}">

                <img
                    src="${d.image}"
                    alt="${d.name}"
                    class="image"
                >

                <h3>${d.name}</h3>

                <p class="catagory">
                    ${d.category}
                </p>

                <p>
                    ${d.spicy ? "🌶️ Spicy" : "Not spicy"}
                </p>

                <p class="price">
                    ${d.price} ETB
                </p>

                <button class="add">
                    Add order
                </button>

            </article>

        `).join("");
    }

    renderCart();
}

searchEl.addEventListener("input", (e) => {
state.search = e.target.value;
render();
});

const categoryButtons =
    document.querySelectorAll(".category-btn");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        state.category =
            button.dataset.category;


        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        button.classList.add("active");


        render();
    });

});

function cartTotal() {
    return state.cart.reduce(
        (sum, i) => sum + i.price * i.qty,
        0
    );
}

function deliveryFee() {
    if (cartTotal() >= FREE_DELIVERY_OVER) {
        return 0;
    } else {
        return DELIVERY_FEE;
    }
}

function finalTotal() {
    return cartTotal() + deliveryFee();
}


function renderCart(){
    
    if(state.cart.length === 0){
        cartEl.innerHTML =`
        <h2>Your order</h2>
        <p class="empty">Cart is empty</p>`;
        return;    
    }
    const items = state.cart.map(i=>
    ` <li data-id ="${i.id}">
    <div class = "cart-info">
        <span>${i.name} x${i.qty}</span>
        <span>${i.price * i.qty} ETB</span>
    </div>
    <div class= "quantity">
    <button type="button" class ="plus">+</button>
    <span>${i.qty}</span>
    <button type="button" class = "minus">-</button>
    </div>
    <button class="rm">x</button>
    </li>`
    ).join("");

    cartEl.innerHTML =`
    <h2>Your order</h2>
    <ul>${items}</ul>
    
    <div class="cart-summary">

    <p>
        Subtotal:
        <span>${cartTotal()} ETB</span>
    </p>

    <p>
        Delivery:
        <span>
            ${deliveryFee() === 0
                ? "FREE"
                : deliveryFee() + " ETB"}
        </span>
    </p>

    <p class="total">
        Total:
        <span>${finalTotal()} ETB</span>
    </p>

</div>
    
    <form id="checkout" novalidate>

            <label>
                Name
                <input
                    id="name"
                    type="text"
                    required>
            </label>
<br><br>
            <label>
                Phone 
                <input
                    id="phone"
                    type="tel"
                    placeholder="09xxxxxxxx">
            </label>
<br><br>
            <label>
                Delivery area
                <select id="area">
                    <option>Bole</option>
                    <option>Kazanchis</option>
                    <option>Megenagna</option>
                </select>
            </label> 
<br><br>
            Map Location 
                <input
                    id="Location"
                    type="url"
                    placeholder="https://maps.app.goo.gl/xxxxxxxxxxx">
            </label>
            <p
                id="form-error"
                class="error"
                aria-live="polite">
            </p>
            <button type="submit">
                ORDER
            </button>

        </form>
    `;
}

function cartTotal() {
return state.cart.reduce((sum, i) =>
sum + i.price * i.qty, 0);
}

function deliveryFee (){
    if (cartTotal () >= FREE_DELIVERY_OVER) {
    return 0;
    }
    else {
        return DELIVERY_FEE;
    }  

function finaltotal (){
    return cartTotal() + deliveryFee();
}
}




function save() {
    localStorage.setItem(
        "addiseats", 
    JSON.stringify(state.cart));
}


function load() {
    const s = localStorage.getItem("addiseats"); 
    // STORAGE_KEY

    if (s) {
        const savedCart = JSON.parse(s);

        if (Array.isArray(savedCart)) {
            state.cart = savedCart;
        } else {
            state.cart = [];
        }
    }
}

menuEl.addEventListener("click", (e) => {
if (!e.target.matches(".add")) 
    return;
const id = Number(e.target.closest(".dish").dataset.id);
const dish = state.dishes.find(d => d.id === id);
const line = state.cart.find(i => i.id === id);

if (line) {
    line.qty++;

}else{ 
    state.cart.push({ ...dish, qty: 1 });

}
save();
render();
});



cartEl.addEventListener("click", (e) => {

    const li = e.target.closest("li");

    if (!li) return;

    const id = Number(li.dataset.id);

    const item = state.cart.find(i => i.id === id);

    if (!item) return;


    // PLUS BUTTON
    if (e.target.matches(".plus")) {
        item.qty++;
    }


    // MINUS BUTTON
    if (e.target.matches(".minus")) {

        if (item.qty > 1) {
            item.qty--;
        } else {
            // Remove when quantity reaches 1
            state.cart = state.cart.filter(
                i => i.id !== id
            );
        }
    }


    // REMOVE BUTTON
    if (e.target.matches(".rm")) {

        state.cart = state.cart.filter(
            i => i.id !== id
        );
    }

    save();
    render();
});

cartEl.addEventListener("submit", (e) => {

    if (!e.target.matches("#checkout")) return;

    e.preventDefault();

    const name = e.target.querySelector("#name").value;
    const phone = e.target.querySelector("#phone").value;
    const area = e.target.querySelector("#area").value;
    
    const formError = e.target.querySelector("#form-error");

    const error = validate({
        name,
        phone
    });

    if (error) {
        formError.textContent = error;
        return;
    }

    formError.textContent = "";

    placeOrder({
        name,
        phone,
        area
    });

    alert("Order placed successfully!");

});

const PHONE = /^(?:\+251|0)9\d{8}$/;

function validate({ name, phone }) {

    if (!name.trim()) {
        return "Please enter your name.";
    }

    if (!PHONE.test(phone)) {
        return "Enter a valid Ethiopian phone.";
    }

    if (state.cart.length === 0) {
        return "Your cart is empty.";
    }

    return "";
}


function placeOrder(data) {

    const subtotal = cartTotal();

    const deliveryFee =
        subtotal >= FREE_DELIVERY_OVER
            ? 0
            : DELIVERY_FEE;

    const order = {
        ...data,
        items: [...state.cart],
        subtotal: subtotal,
        deliveryFee: deliveryFee,
        total: subtotal + deliveryFee,
        placedAt: new Date().toISOString()
    };


    console.log("ORDER:", order);


    // Clear cart
    state.cart = [];

    save();

    render();


    // FINAL MESSAGE
    alert("Order placed successfully!");
}

async function init() {
    load();
    await loadMenu();
    
}
init();
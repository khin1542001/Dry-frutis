// ================= DATABASE =================

let products = JSON.parse(localStorage.getItem("products")) || [
{name:"Almonds",price:12000},
{name:"Cashews",price:15000},
{name:"Walnuts",price:18000}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= SHOW PRODUCTS =================

function loadProducts(){
let list = document.getElementById("product-list");
if(!list) return;

list.innerHTML="";
products.forEach((p,i)=>{
list.innerHTML+=`
<div class="card">
<h3>${p.name}</h3>
<p>Ks ${p.price}</p>
<button onclick="addToCart(${i})">Add to Cart</button>
</div>
`;
});
}

loadProducts();

// ================= CART =================

function addToCart(index){
let product=products[index];
let existing=cart.find(item=>item.name===product.name);

if(existing){existing.qty++}
else{cart.push({...product,qty:1})}

saveCart();
updateCart();
}

function updateCart(){
let items=document.getElementById("cart-items");
let total=0;
let count=0;

if(!items) return;

items.innerHTML="";

cart.forEach((item,i)=>{
total+=item.price*item.qty;
count+=item.qty;

items.innerHTML+=`
<div class="cart-item">
${item.name}
<div class="qty">
<button onclick="changeQty(${i},-1)">-</button>
${item.qty}
<button onclick="changeQty(${i},1)">+</button>
</div>
</div>
`;
});

document.getElementById("cart-total").innerText=total;
document.getElementById("cart-count").innerText=count;
}

function changeQty(i,amount){
cart[i].qty+=amount;
if(cart[i].qty<=0){cart.splice(i,1)}
saveCart();
updateCart();
}

function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart));
}

function openCart(){
document.getElementById("cart-drawer").classList.add("active");
updateCart();
}

function closeCart(){
document.getElementById("cart-drawer").classList.remove("active");
}

function goCheckout(){
window.location="checkout.html";
}

// ================= CHECKOUT =================

function loadCheckout(){
let items=document.getElementById("checkout-items");
if(!items) return;

let total=0;
items.innerHTML="";

cart.forEach(item=>{
total+=item.price*item.qty;
items.innerHTML+=`<p>${item.name} x ${item.qty}</p>`;
});

document.getElementById("checkout-total").innerText=total;
}

loadCheckout();

function processPayment(){
let method=document.getElementById("payment-method").value;
alert("Payment Successful via "+method);
cart=[];
saveCart();
window.location="index.html";
}

// ================= ADMIN =================

function addProduct(){
let name=document.getElementById("pname").value;
let price=document.getElementById("pprice").value;

products.push({name,price:Number(price)});
localStorage.setItem("products",JSON.stringify(products));
alert("Product Added");
location.reload();
}

function loadAdmin(){
let list=document.getElementById("admin-products");
if(!list) return;

list.innerHTML="";
products.forEach((p,i)=>{
list.innerHTML+=`
<p>${p.name} - ${p.price} Ks 
<button onclick="deleteProduct(${i})">Delete</button></p>
`;
});
}

function deleteProduct(i){
products.splice(i,1);
localStorage.setItem("products",JSON.stringify(products));
location.reload();
}

loadAdmin();
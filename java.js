let cart = [];

function addToCart(name, price){
    cart.push({name, price});
    updateCart();
}

function updateCart(){
    let items = document.getElementById("cart-items");
    let total = 0;
    items.innerHTML = "";

    cart.forEach((item, i) => {
        total += item.price;
        items.innerHTML += `
        <p>
            ${item.name} - Bhat ${item.price}
            <button onclick="removeItem(${i})">x</button>
        </p>`;
    });

    document.getElementById("total").innerText = total;
    document.getElementById("cart-count").innerText = cart.length;
}

function removeItem(i){
    cart.splice(i,1);
    updateCart();
}

function toggleCart(){
    document.getElementById("cart").classList.toggle("active");
}

function toggleMenu(){
document.getElementById("navbar").classList.toggle("active");
}
const drugs = [
    { name: "Paracetamol", manufacturer: "XYZ Pharma", price: 20, stock: 50 },
    { name: "Ibuprofen", manufacturer: "ABC Meds", price: 50, stock: 30 },
    { name: "Amoxicillin", manufacturer: "MediCure Ltd.", price: 100, stock: 40 },
    { name: "Cetirizine", manufacturer: "Wellness Pharma", price: 25, stock: 25 },
    { name: "Metformin", manufacturer: "Diabetes Care Ltd.", price: 120, stock: 20 },
    { name: "Aspirin", manufacturer: "Pain Relief Corp.", price: 30, stock: 35 },
    { name: "Azithromycin", manufacturer: "Antibiotic Pharma", price: 150, stock: 15 },
    { name: "Loratadine", manufacturer: "Allergy Relief Inc.", price: 80, stock: 18 },
    { name: "Omeprazole", manufacturer: "Gastro Meds", price: 200, stock: 12 },
    { name: "Vitamin D", manufacturer: "NutriHealth", price: 60, stock: 28 }
];

const cart = [];

// ✅ Load Drugs into Store Page
function loadDrugs() {
    let drugList = document.getElementById("drug-list");
    drugList.innerHTML = "";

    drugs.forEach((drug, index) => {
        let row = `<tr>
            <td>${drug.name}</td>
            <td>${drug.manufacturer}</td>
            <td>₹${drug.price}</td>
            <td>${drug.stock}</td>
            <td><button onclick="addToCart(${index})">Add to Cart</button></td>
        </tr>`;
        drugList.innerHTML += row;
    });
}

// ✅ Add Drug to Cart
function addToCart(index) {
    let selectedDrug = drugs[index];
    let existingItem = cart.find(item => item.name === selectedDrug.name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...selectedDrug, quantity: 1 });
    }
    updateCart();
}

// ✅ Update Cart & Display Total
function updateCart() {
    let cartTable = document.getElementById("cart-items");
    cartTable.innerHTML = "";
    let totalAmount = 0;

    cart.forEach((item, index) => {
        let row = `<tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price * item.quantity}</td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        </tr>`;
        cartTable.innerHTML += row;
        totalAmount += item.price * item.quantity;
    });

    document.getElementById("cart-total").innerText = totalAmount.toFixed(2);
}

// ✅ Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// ✅ Proceed to Billing Page
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before proceeding to checkout.");
        return;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "billing.html";
}

// ✅ Load Drugs when Store Page Loads
window.onload = loadDrugs;

// ======================== 🛒 PAYMENT PROCESSING ========================= //

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("billing.html")) {
        loadBillingItems();
        document.getElementById("confirm-payment").addEventListener("click", confirmPayment);
    }
});

// ✅ Load Items in Billing Page
function loadBillingItems() {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];
    let billingTable = document.getElementById("billing-items");
    let totalBill = 0;

    billingTable.innerHTML = "";

    cartData.forEach((item, index) => {
        let row = `<tr>
            <td>${item.name}</td>
            <td>${item.manufacturer}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price * item.quantity}</td>
        </tr>`;
        billingTable.innerHTML += row;
        totalBill += item.price * item.quantity;
    });

    document.getElementById("total-bill").innerText = `₹${totalBill.toFixed(2)}`;
}

// ✅ Confirm Payment & Update Dashboard
function confirmPayment() {
    alert("Payment Successful! Updating Dashboard...");

    // Retrieve previous purchases or initialize empty array
    let previousPurchases = JSON.parse(localStorage.getItem("purchasedDrugs")) || [];

    // Get current cart data
    let billingItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Add billing items to purchase history
    previousPurchases.push(...billingItems);

    // Store updated purchases in localStorage
    localStorage.setItem("purchasedDrugs", JSON.stringify(previousPurchases));

    // Clear Cart after payment
    localStorage.removeItem("cart");

    // Redirect to Dashboard
    window.location.href = "dashboard.html";
}

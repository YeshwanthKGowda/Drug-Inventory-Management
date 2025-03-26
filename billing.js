// Dummy Payment QR Code URLs (Replace with actual QR codes)
const qrCodes = {
    phonepe: "phonepe_qr.png",
    gpay: "gpay_qr.png",
    paytm: "paytm_qr.png"
};

// Function to Load Order Summary from LocalStorage
function loadOrderSummary() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let orderSummaryTable = document.getElementById("order-summary");
    let totalAmount = 0;

    orderSummaryTable.innerHTML = ""; // Clear previous data

    cart.forEach(item => {
        let row = `<tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price * item.quantity}</td>
        </tr>`;
        orderSummaryTable.innerHTML += row;
        totalAmount += item.price * item.quantity;
    });

    document.getElementById("total-amount").innerText = totalAmount.toFixed(2);
}

// Show Payment Options Based on Selection
function showPaymentOptions() {
    let paymentMethod = document.getElementById("payment-method").value;
    let qrSection = document.getElementById("qr-section");
    let cardSection = document.getElementById("card-section");
    let qrImage = document.getElementById("qr-code");

    // Hide all sections first
    qrSection.classList.add("hidden");
    cardSection.classList.add("hidden");

    if (qrCodes[paymentMethod]) {
        qrSection.classList.remove("hidden");
        qrImage.src = qrCodes[paymentMethod]; // Load corresponding QR code
    } else if (paymentMethod === "debit" || paymentMethod === "credit") {
        cardSection.classList.remove("hidden");
    }
}

// Process Payment & Store Order Data
function processPayment() {
    let paymentMethod = document.getElementById("payment-method").value;
    
    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }

    // Simulate Payment Processing
    setTimeout(() => {
        alert("Payment Successful!");

        // Generate Unique Order ID (Random for now)
        const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000); // Example: ORD123456

        // Get Cart Items
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Save Order Data in Local Storage
        const orderData = {
            orderId: orderId,
            vendorName: "ABC Pharma",  // Example vendor name
            status: "Processing",      // Default status
            deliveryDate: "2025-04-01", // Dummy delivery date
            paymentStatus: "Paid",
            paymentMode: paymentMethod,
            drugs: cart
        };

        localStorage.setItem("currentOrder", JSON.stringify(orderData));

        // Store Purchased Items in LocalStorage
        let previousPurchases = JSON.parse(localStorage.getItem("purchasedDrugs")) || [];
        previousPurchases.push(...cart);
        localStorage.setItem("purchasedDrugs", JSON.stringify(previousPurchases));

        // Clear cart after payment
        localStorage.removeItem("cart");

        // Redirect to Dashboard
        window.location.href = "dashboard.html";
    }, 2000);
}

// Load Data on Page Load
window.onload = loadOrderSummary;

function processPayment() {
    alert("Payment Successful!");

    // Generate Unique Order ID
    const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000);

    // Get Cart Items from Local Storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let orderDate = new Date().toLocaleDateString();

    // Create Order Data
    const orderData = {
        orderId: orderId,
        orderDate: orderDate,
        vendorName: "ABC Pharma",
        status: "Processing",
        deliveryDate: "2025-04-01",
        paymentStatus: "Paid",
        paymentMode: document.getElementById("payment-method").value,
        drugs: cart
    };

    // Save Order to Order History
    let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    orderHistory.push(orderData);
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

    // Clear Cart After Payment
    localStorage.removeItem("cart");

    // Redirect to Dashboard
    window.location.href = "dashboard.html";
}

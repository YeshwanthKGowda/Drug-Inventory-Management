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

// Process Payment
function processPayment() {
    let paymentMethod = document.getElementById("payment-method").value;
    
    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }

    // Simulate Payment Processing
    setTimeout(() => {
        alert("Payment Successful!");

        // Store Purchased Items in LocalStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let previousPurchases = JSON.parse(localStorage.getItem("purchasedDrugs")) || [];
        previousPurchases.push(...cart);

        localStorage.setItem("purchasedDrugs", JSON.stringify(previousPurchases));
        localStorage.removeItem("cart"); // Clear cart after payment

        window.location.href = "dashboard.html"; // Redirect to Dashboard
    }, 2000);
}

// Load Data on Page Load
window.onload = loadOrderSummary;

function toggleAuth() {
    document.getElementById("login-box").classList.toggle("hidden");
    document.getElementById("signup-box").classList.toggle("hidden");
}

function loginUser() {
    window.location.href = "home.html";
}

function sendOTP() {
    alert("OTP sent to registered phone number.");
}

function sendSignupOTP() {
    alert("OTP sent for verification.");
}

function registerUser() {
    alert("Account Created Successfully!");
    window.location.href = "index.html";
}
function trackOrder() {
    let searchInput = document.getElementById("orderSearch").value.trim();
    
    if (searchInput === "") {
        alert("Please enter an Order ID or Vendor Name.");
        return;
    }

    // Simulated Data (Replace this with actual data fetching)
    let mockOrder = {
        orderId: "ORD12345",
        vendorName: "MediLife Distributors",
        status: "Shipped",
        deliveryDate: "March 30, 2025",
        drugs: ["Paracetamol", "Ibuprofen", "Amoxicillin"],
        paymentStatus: "Paid",
        paymentMode: "Credit Card"
    };

    // Populate order details
    document.getElementById("orderId").innerText = mockOrder.orderId;
    document.getElementById("vendorName").innerText = mockOrder.vendorName;
    document.getElementById("status").innerText = mockOrder.status;
    document.getElementById("deliveryDate").innerText = mockOrder.deliveryDate;
    document.getElementById("paymentStatus").innerText = mockOrder.paymentStatus;
    document.getElementById("paymentMode").innerText = mockOrder.paymentMode;

    // Populate drug list
    let drugListElement = document.getElementById("drugList");
    drugListElement.innerHTML = ""; // Clear previous entries
    mockOrder.drugs.forEach(drug => {
        let li = document.createElement("li");
        li.textContent = drug;
        drugListElement.appendChild(li);
    });

    // Show order details
    document.getElementById("orderDetails").classList.remove("hidden");
}

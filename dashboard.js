function loadPurchasedDrugs() {
    let purchases = JSON.parse(localStorage.getItem("purchasedDrugs")) || [];
    let purchaseTable = document.getElementById("recent-drug-list");

    // Clear previous entries
    purchaseTable.innerHTML = "";

    if (purchases.length === 0) {
        purchaseTable.innerHTML = "<tr><td colspan='5'>No recent purchases</td></tr>";
        return;
    }

    purchases.forEach(drug => {
        let row = `<tr>
            <td>${drug.name}</td>
            <td>${drug.manufacturer}</td>
            <td>₹${drug.price}</td>
            <td>${drug.quantity}</td>
            <td>${new Date().toLocaleDateString()}</td>
        </tr>`;
        purchaseTable.innerHTML += row;
    });
}

// Sample Data for Recent Drug Purchases (For Testing)
const recentPurchases = [
    { name: "Paracetamol", manufacturer: "Cipla", price: 20, quantity: 2, date: "2025-03-20" },
    { name: "Amoxicillin", manufacturer: "Sun Pharma", price: 100, quantity: 1, date: "2025-03-18" },
    { name: "Ibuprofen", manufacturer: "Pfizer", price: 50, quantity: 3, date: "2025-03-16" },
    { name: "Cetirizine", manufacturer: "GSK", price: 25, quantity: 1, date: "2025-03-15" },
    { name: "Metformin", manufacturer: "Lupin", price: 120, quantity: 2, date: "2025-03-10" }
];

// Load Sample Recent Purchases (For Testing)
function loadRecentPurchases() {
    let recentDrugList = document.getElementById("recent-drug-list");

    recentPurchases.forEach(drug => {
        let row = `<tr>
            <td>${drug.name}</td>
            <td>${drug.manufacturer}</td>
            <td>₹${drug.price}</td>
            <td>${drug.quantity}</td>
            <td>${drug.date}</td>
        </tr>`;
        recentDrugList.innerHTML += row;
    });
}

// Load Data on Page Load
window.onload = function () {
    loadPurchasedDrugs();
    loadRecentPurchases();
};

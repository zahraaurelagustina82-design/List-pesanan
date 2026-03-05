// Ganti dengan URL Web App Google Apps Script Anda
// PENTING: Gunakan URL dari "New deployment" bukan "Test deployments"
// URL harus berakhiran /exec
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz78kkpT-93cnM09bEJ4oliGCj1Q_V4YsjUzGINfQOZO2keZ03SIcE367IAWRNZB6eIiQ/exec';

const refreshBtn = document.getElementById('refreshBtn');
const searchInput = document.getElementById('searchInput');
const orderTableBody = document.getElementById('orderTableBody');
const totalOrders = document.getElementById('totalOrders');
const loading = document.getElementById('loading');
const alertDiv = document.getElementById('alert');

let allOrders = [];

function showAlert(message, isSuccess) {
    alertDiv.textContent = message;
    alertDiv.className = `mb-4 p-4 rounded-lg ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`;
    alertDiv.classList.remove('hidden');
    
    setTimeout(() => {
        alertDiv.classList.add('hidden');
    }, 3000);
}

function isToday(dateString) {
    const today = new Date();
    const orderDate = new Date(dateString);
    return today.toDateString() === orderDate.toDateString();
}

function renderTable(orders) {
    orderTableBody.innerHTML = '';
    
    if (orders.length === 0) {
        orderTableBody.innerHTML = '<tr><td colspan="7" class="px-4 py-8 text-center text-gray-500">Tidak ada data pesanan</td></tr>';
        return;
    }
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        const isTodayOrder = isToday(order[4]);
        row.className = isTodayOrder ? 'bg-yellow-50' : 'hover:bg-gray-50';
        
        row.innerHTML = `
            <td class="px-4 py-3">${order[0]}</td>
            <td class="px-4 py-3 font-medium">${order[1]}</td>
            <td class="px-4 py-3">${order[2]}</td>
            <td class="px-4 py-3">${order[3]}</td>
            <td class="px-4 py-3">${order[4]}</td>
            <td class="px-4 py-3">${order[5]}</td>
            <td class="px-4 py-3">${order[6] || '-'}</td>
        `;
        
        orderTableBody.appendChild(row);
    });
    
    totalOrders.textContent = orders.length;
}

async function fetchOrders() {
    loading.classList.remove('hidden');
    
    try {
        const response = await fetch(SCRIPT_URL);
        const result = await response.json();
        
        if (result.status === 'success') {
            allOrders = result.data;
            renderTable(allOrders);
        } else {
            showAlert('Gagal mengambil data pesanan', false);
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Terjadi kesalahan saat mengambil data', false);
    } finally {
        loading.classList.add('hidden');
    }
}

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allOrders.filter(order => 
        order[1].toLowerCase().includes(searchTerm) || 
        order[3].toLowerCase().includes(searchTerm)
    );
    renderTable(filtered);
});

refreshBtn.addEventListener('click', fetchOrders);

// Load data saat halaman dibuka
fetchOrders();

// Ganti dengan URL Web App Google Apps Script Anda
// PENTING: Gunakan URL dari "New deployment" bukan "Test deployments"
// URL harus berakhiran /exec
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz78kkpT-93cnM09bEJ4oliGCj1Q_V4YsjUzGINfQOZO2keZ03SIcE367IAWRNZB6eIiQ/exec';

const form = document.getElementById('orderForm');
const submitBtn = document.getElementById('submitBtn');
const alertDiv = document.getElementById('alert');

function showAlert(message, isSuccess) {
    alertDiv.textContent = message;
    alertDiv.className = `mb-4 p-4 rounded-lg ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`;
    alertDiv.classList.remove('hidden');
    
    setTimeout(() => {
        alertDiv.classList.add('hidden');
    }, 3000);
}

function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading ? 'Mengirim...' : 'Kirim Pesanan';
    submitBtn.className = isLoading 
        ? 'w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed'
        : 'w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200';
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const noHp = document.getElementById('noHp').value;
    if (noHp.length < 10) {
        showAlert('Nomor HP harus minimal 10 digit', false);
        return;
    }
    
    const data = {
        nama: document.getElementById('nama').value,
        noHp: noHp,
        menu: document.getElementById('menu').value,
        tanggal: document.getElementById('tanggal').value,
        jam: document.getElementById('jam').value,
        keterangan: document.getElementById('keterangan').value
    };
    
    setLoading(true);
    
    try {
        console.log('Mengirim data:', data);
        console.log('URL:', SCRIPT_URL);
        
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            redirect: 'follow'
        });
        
        console.log('Response status:', response.status);
        
        const result = await response.json();
        console.log('Result:', result);
        
        if (result.status === 'success') {
            showAlert('Pesanan berhasil dikirim!', true);
            form.reset();
        } else {
            showAlert('Gagal mengirim pesanan: ' + (result.message || 'Unknown error'), false);
        }
    } catch (error) {
        console.error('Error detail:', error);
        showAlert('Terjadi kesalahan: ' + error.message, false);
    } finally {
        setLoading(false);
    }
});

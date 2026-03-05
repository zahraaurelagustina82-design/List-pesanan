# Panduan Deployment Sistem Pesanan UMKM

## 1. Setup Google Spreadsheet

1. Buat Google Spreadsheet baru
2. Beri nama sheet: **Pesanan**
3. Buat header di baris pertama dengan kolom:
   - A1: No
   - B1: Nama pemesan
   - C1: No. HP pemesan
   - D1: Menu
   - E1: Tanggal pengambilan
   - F1: Jam Pengambilan
   - G1: Keterangan
   - H1: Timestamp

## 2. Setup Google Apps Script

1. Di Google Spreadsheet, klik **Extensions** > **Apps Script**
2. Hapus kode default
3. Copy paste kode dari file `google-apps-script.gs`
4. Pastikan konstanta `SHEET_NAME` sesuai dengan nama sheet Anda (default: 'Pesanan')
5. Klik **Save** (ikon disket)

## 3. Deploy Web App

1. Klik **Deploy** > **New deployment**
2. Klik ikon gear > pilih **Web app**
3. Isi konfigurasi:
   - Description: Sistem Pesanan UMKM
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Klik **Deploy**
5. Copy **Web app URL** yang muncul
6. Klik **Done**

## 4. Update URL di File HTML

1. Buka file `script.js`
2. Ganti `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL` dengan URL yang sudah dicopy
3. Buka file `admin.js`
4. Ganti `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL` dengan URL yang sama

## 5. Testing

### Test Form Pesanan (index.html)
1. Buka `index.html` di browser
2. Isi semua field yang required
3. Test validasi nomor HP (minimal 10 digit)
4. Submit form
5. Cek notifikasi sukses muncul (hijau)
6. Cek form otomatis reset
7. Cek data masuk ke spreadsheet

### Test Auto Sorting
1. Tambahkan beberapa pesanan dengan tanggal berbeda
2. Cek di spreadsheet apakah data terurut berdasarkan:
   - Tanggal pengambilan (ascending)
   - Jam pengambilan (ascending)
3. Pesanan dengan waktu paling dekat harus di urutan paling atas

### Test Halaman Admin (admin.html)
1. Buka `admin.html` di browser
2. Cek data muncul dalam tabel
3. Test fitur search (cari nama atau menu)
4. Test tombol refresh
5. Cek highlight pesanan hari ini (background kuning)
6. Cek total pesanan ditampilkan

### Test Error Handling
1. Matikan koneksi internet, submit form
2. Cek notifikasi error muncul (merah)
3. Ganti URL script dengan URL salah
4. Cek error handling berjalan

### Test Responsive
1. Buka di mobile browser atau resize browser
2. Cek layout tetap rapi
3. Cek tabel bisa di-scroll horizontal

## 6. Troubleshooting

### Data tidak masuk ke spreadsheet
- Cek URL Web App sudah benar
- Cek deployment setting: "Who has access" = Anyone
- Cek nama sheet sesuai dengan SHEET_NAME di script

### Error CORS
- Pastikan deploy sebagai Web App, bukan sebagai API Executable
- Pastikan "Execute as" = Me

### Sorting tidak berjalan
- Cek ada data minimal 2 baris (selain header)
- Cek kolom tanggal dan jam terisi dengan benar

### Nomor urut tidak update
- Script sudah handle update nomor setelah sorting
- Jika masih error, cek console log di Apps Script

## 7. Maintenance

### Update Script
1. Edit kode di Apps Script Editor
2. Save
3. Deploy > **Manage deployments**
4. Klik ikon pensil
5. Ubah version ke **New version**
6. Deploy
7. URL tetap sama, tidak perlu update di HTML

### Backup Data
- Download spreadsheet secara berkala
- File > Download > Excel atau CSV

## 8. Fitur Tambahan (Opsional)

Jika ingin menambahkan fitur:
- Edit/Delete pesanan
- Export ke PDF
- Notifikasi WhatsApp
- Dashboard statistik

Silakan modifikasi kode sesuai kebutuhan.

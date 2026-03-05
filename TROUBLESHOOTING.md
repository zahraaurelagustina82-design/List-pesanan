# Troubleshooting - Kesalahan Fetch

## Masalah: "Terjadi kesalahan fetch"

Ini biasanya terjadi karena masalah CORS atau deployment Google Apps Script yang salah.

## Solusi Step-by-Step:

### 1. Cek Deployment Google Apps Script

1. Buka Google Spreadsheet Anda
2. Klik **Extensions** > **Apps Script**
3. Pastikan kode dari `google-apps-script.gs` sudah di-paste
4. Klik **Save** (Ctrl+S)

### 2. Deploy Ulang dengan Benar

**PENTING: Ikuti langkah ini dengan teliti!**

1. Di Apps Script Editor, klik **Deploy** > **Manage deployments**
2. Jika sudah ada deployment sebelumnya:
   - Klik ikon **Pensil** (Edit)
   - Ubah **Version** menjadi **New version**
   - Klik **Deploy**
3. Jika belum ada deployment:
   - Klik **Deploy** > **New deployment**
   - Klik ikon **Gear** (⚙️) di sebelah "Select type"
   - Pilih **Web app**
   - Isi konfigurasi:
     - **Description**: Sistem Pesanan UMKM
     - **Execute as**: **Me** (email Anda)
     - **Who has access**: **Anyone** ← PENTING!
   - Klik **Deploy**
4. Akan muncul popup "Authorize access" → Klik **Authorize access**
5. Pilih akun Google Anda
6. Klik **Advanced** → **Go to [Project Name] (unsafe)**
7. Klik **Allow**
8. Copy **Web app URL** yang muncul
9. Klik **Done**

### 3. Update URL di File JavaScript

1. Buka file `script.js`
2. Ganti baris pertama dengan URL yang baru:
```javascript
const SCRIPT_URL = 'URL_YANG_BARU_DICOPY';
```

3. Buka file `admin.js`
4. Ganti baris pertama dengan URL yang sama:
```javascript
const SCRIPT_URL = 'URL_YANG_BARU_DICOPY';
```

### 4. Test URL Google Apps Script

Sebelum test di website, test dulu URL-nya di browser:

1. Copy URL Web App Anda
2. Paste di browser dan tekan Enter
3. Harusnya muncul response JSON seperti ini:
```json
{"status":"success","data":[]}
```

Jika muncul error atau tidak bisa diakses, berarti deployment belum benar.

### 5. Cek Nama Sheet

1. Buka Google Spreadsheet
2. Pastikan nama sheet (tab di bawah) adalah **Pesanan** (huruf besar P)
3. Jika beda, ada 2 pilihan:
   - Rename sheet menjadi "Pesanan", ATAU
   - Edit `google-apps-script.gs` baris 4:
   ```javascript
   const SHEET_NAME = 'NamaSheetAnda';
   ```
   - Save dan deploy ulang

### 6. Cek Header Spreadsheet

Pastikan baris pertama (header) berisi:
- A1: No
- B1: Nama pemesan
- C1: No. HP pemesan
- D1: Menu
- E1: Tanggal pengambilan
- F1: Jam Pengambilan
- G1: Keterangan
- H1: Timestamp

### 7. Test Lagi

1. Refresh halaman `index.html` di browser (Ctrl+F5)
2. Buka Console (F12)
3. Isi form dan submit
4. Lihat pesan di Console

## Kesalahan Umum:

### Error: "Who has access" bukan "Anyone"
- Solusi: Deploy ulang dan pastikan pilih "Anyone"

### Error: Script tidak ter-authorize
- Solusi: Ikuti langkah authorize di step 2 poin 4-7

### Error: URL salah
- Solusi: URL harus diakhiri dengan `/exec` bukan `/dev`
- Contoh benar: `https://script.google.com/.../exec`
- Contoh salah: `https://script.google.com/.../dev`

### Error: CORS
- Solusi: Pastikan deploy sebagai "Web app" bukan "API Executable"

## Jika Masih Error:

Kirim screenshot dari:
1. Console browser (F12 > Console tab)
2. Halaman deployment Google Apps Script
3. Response saat buka URL di browser

Dengan informasi ini saya bisa bantu lebih spesifik.

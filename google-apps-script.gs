// Google Apps Script untuk Web App
// Deploy sebagai Web App dengan akses "Anyone"

const SHEET_NAME = 'Pesanan'; // Ganti dengan nama sheet Anda

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    // Dapatkan nomor urut terakhir
    const lastRow = sheet.getLastRow();
    const no = lastRow > 1 ? lastRow : 1;
    
    // Tambahkan data ke spreadsheet
    sheet.appendRow([
      no,
      data.nama,
      data.noHp,
      data.menu,
      data.tanggal,
      data.jam,
      data.keterangan,
      new Date()
    ]);
    
    // Sorting otomatis berdasarkan tanggal dan jam
    const dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, 8);
    dataRange.sort([
      { column: 5, ascending: true },
      { column: 6, ascending: true }
    ]);
    
    // Update nomor urut setelah sorting
    const sortedData = dataRange.getValues();
    for (let i = 0; i < sortedData.length; i++) {
      sheet.getRange(i + 2, 1).setValue(i + 1);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    // Ambil semua data kecuali header
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        data: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 7);
    const data = dataRange.getValues();
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      data: data
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

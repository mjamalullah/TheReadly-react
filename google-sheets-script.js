/**
 * ==============================================================================
 * The Readly Institute — Automated Google Sheet Backend Script
 * ==============================================================================
 * This script receives form submissions from The Readly website (Demo Bookings,
 * Teacher Trials, Contact Inquiries) and automatically records them in real-time
 * into your Google Sheet spreadsheet.
 *
 * ==============================================================================
 * 🚀 EASY 5-MINUTE SETUP INSTRUCTIONS:
 * ==============================================================================
 * 1. Open Google Sheets in your browser: https://sheets.new
 * 2. Name your spreadsheet at the top left:
 *    "The Readly Institute — Admissions & Bookings"
 * 3. In the top menu, click: Extensions -> Apps Script
 * 4. In the Apps Script code editor, delete any existing code (like myFunction).
 * 5. Copy ALL the code below and paste it into Code.gs.
 * 6. Click the blue "Deploy" button (top right) -> choose "New deployment".
 * 7. Click the Gear icon ⚙️ next to "Select type" and select "Web app".
 * 8. Fill in the settings:
 *    - Description: "Readly Form Submissions"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone"  <--- (IMPORTANT: Must be "Anyone" so the website can send data)
 * 9. Click "Deploy" -> Click "Authorize access" -> Select your Google Account -> Click "Advanced" -> "Go to (unsafe)" -> "Allow".
 * 10. Copy your "Web app URL" (it looks like: https://script.google.com/macros/s/AKfycb.../exec).
 * 11. Open `js/main.js` and paste your URL into `READLY_CONFIG.googleSheetWebAppUrl`.
 *
 * DONE! Every submission will now automatically write to your Google Sheet!
 * ==============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other operations to complete
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();

    // Sheet column headers
    var headers = [
      "Timestamp (PKT)",
      "Form Type",
      "Student Name",
      "Parent Name",
      "WhatsApp Number",
      "Email Address",
      "Program",
      "Grade / Year",
      "Subject",
      "Preferred Mentor",
      "Exam Series",
      "Notes / Message",
      "Page Source"
    ];

    // If sheet is completely empty, create bold branded headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#064E3B"); // Deep emerald Readly color
      headerRange.setFontColor("#FFFFFF"); // White text
      sheet.setFrozenRows(1);
    }

    // Parse incoming payload (JSON or Form URL Encoded)
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    // Format timestamp in Pakistan Standard Time (PKT / UTC+5)
    var timestamp = Utilities.formatDate(new Date(), "GMT+5", "yyyy-MM-dd HH:mm:ss");

    // Prepare data row
    var row = [
      timestamp,
      data.form_type || "Free Demo Booking",
      data.student_name || "N/A",
      data.parent_name || "N/A",
      data.whatsapp || "N/A",
      data.email || "N/A",
      data.program || "General Academic",
      data.grade || "N/A",
      data.subject || "General Consultation",
      data.teacher || "Assigned Faculty Specialist",
      data.exam_series || "N/A",
      data.message || "None",
      data.page || "Website"
    ];

    // Append to sheet
    sheet.appendRow(row);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Submission recorded successfully in The Readly Institute sheet.",
        row: sheet.getLastRow(),
        timestamp: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        error: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("The Readly Institute Google Sheet Web App is online, active, and ready to record submissions.")
    .setMimeType(ContentService.MimeType.TEXT);
}

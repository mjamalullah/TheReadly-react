/**
 * ==============================================================================
 * The Readly Institute — Multi-Tab Automated Google Sheet Backend Script
 * ==============================================================================
 * Spreadsheet: https://docs.google.com/spreadsheets/d/1Xwwv4QyLLeXdB5IVYdtPeuvNIOsYRBxgL4e3OVNJ20M/edit
 *
 * This script automatically routes incoming submissions to the correct tab:
 * 1. "Admissions" / "Inquiries" Tab -> For Student Demo Bookings, Consultations & Contact
 * 2. "Become a Teacher" Tab (gid=1304058449) -> For Teacher / Faculty Applications
 *
 * ==============================================================================
 * 🚀 UPDATE INSTRUCTIONS (1 MINUTE):
 * ==============================================================================
 * 1. Open your Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1Xwwv4QyLLeXdB5IVYdtPeuvNIOsYRBxgL4e3OVNJ20M/edit
 * 2. Click on top menu: Extensions -> Apps Script
 * 3. Delete existing code in Code.gs and PASTE ALL the code below.
 * 4. Click the blue "Deploy" button (top right) -> choose "Manage deployments".
 * 5. Click the Pencil icon ✏️ (Edit) next to your Active deployment.
 * 6. Under "Version", select: "New version".
 * 7. Click "Deploy".
 *
 * DONE! Both Admissions and Teacher applications are now live and separated!
 * ==============================================================================
 */

var SPREADSHEET_ID = "1Xwwv4QyLLeXdB5IVYdtPeuvNIOsYRBxgL4e3OVNJ20M";
var TEACHER_TAB_GID = 1304058449;

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other concurrent writes to clear
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    if (!doc) {
      doc = SpreadsheetApp.openById(SPREADSHEET_ID);
    }

    // 1. Parse incoming payload
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

    // 2. Identify whether this is a Teacher Application or Admission/Student Inquiry
    var formTypeLower = (data.form_type || "").toLowerCase();
    var targetTabLower = (data.target_tab || "").toLowerCase();
    var targetGid = data.target_gid ? String(data.target_gid) : "";

    var isTeacherApplication = (
      formTypeLower.indexOf("tutor") !== -1 ||
      formTypeLower.indexOf("teacher") !== -1 ||
      targetTabLower.indexOf("teacher") !== -1 ||
      targetTabLower.indexOf("tutor") !== -1 ||
      targetGid === String(TEACHER_TAB_GID)
    );

    var targetSheet = null;

    if (isTeacherApplication) {
      // --------------------------------------------------------------------------
      // A. ROUTE TO: "BECOME A TEACHER" TAB
      // --------------------------------------------------------------------------
      // 1. Try finding by exact GID (1304058449)
      var allSheets = doc.getSheets();
      for (var i = 0; i < allSheets.length; i++) {
        if (allSheets[i].getSheetId() == TEACHER_TAB_GID) {
          targetSheet = allSheets[i];
          break;
        }
      }

      // 2. If not found by GID, try common teacher tab names
      if (!targetSheet) {
        var teacherNames = [
          "become a teacher",
          "Become a Teacher",
          "Become a Tutor",
          "become a tutor",
          "Teachers",
          "Faculty Applications",
          "Tutor Applications"
        ];
        for (var j = 0; j < teacherNames.length; j++) {
          var tSheet = doc.getSheetByName(teacherNames[j]);
          if (tSheet) {
            targetSheet = tSheet;
            break;
          }
        }
      }

      // 3. Fallback: Create tab if not exists
      if (!targetSheet) {
        targetSheet = doc.insertSheet("Become a Teacher");
      }

      // Teacher Tab Column Headers
      var teacherHeaders = [
        "Timestamp (PKT)",
        "Form Type",
        "Teacher / Applicant Name",
        "Email Address",
        "WhatsApp Number",
        "City & Country",
        "Highest Qualification",
        "University / Institute",
        "Teaching Experience",
        "Curriculum Expertise",
        "Subjects to Teach",
        "Preferred Availability",
        "CV / LinkedIn Profile",
        "Teaching Philosophy / Bio",
        "Page Source"
      ];

      // If tab is newly created or empty, format headers
      if (targetSheet.getLastRow() === 0) {
        targetSheet.appendRow(teacherHeaders);
        var tHeaderRange = targetSheet.getRange(1, 1, 1, teacherHeaders.length);
        tHeaderRange.setFontWeight("bold");
        tHeaderRange.setBackground("#064E3B"); // Readly Deep Emerald
        tHeaderRange.setFontColor("#FFFFFF");
        targetSheet.setFrozenRows(1);
      }

      var teacherRow = [
        timestamp,
        data.form_type || "Tutor Faculty Application",
        data.applicant_name || data.name || data.student_name || "N/A",
        data.email || "N/A",
        data.whatsapp || "N/A",
        data.location || data.city_country || "N/A",
        data.highest_qualification || data.highest_degree || "N/A",
        data.university || "N/A",
        data.teaching_experience || data.experience || "N/A",
        data.target_curriculum || data.curriculum || "N/A",
        data.subjects || "N/A",
        data.weekly_availability || data.availability || "N/A",
        data.cv_portfolio_url || data.portfolio_link || "N/A",
        data.statement_bio || data.bio || "N/A",
        data.page || "Website"
      ];

      targetSheet.appendRow(teacherRow);

    } else {
      // --------------------------------------------------------------------------
      // B. ROUTE TO: "ADMISSIONS & BOOKINGS" TAB
      // --------------------------------------------------------------------------
      var admissionNames = [
        "Admissions",
        "admissions",
        "Inquiries",
        "Demo Bookings",
        "Bookings",
        "Sheet1",
        "Sheet 1"
      ];

      for (var k = 0; k < admissionNames.length; k++) {
        var aSheet = doc.getSheetByName(admissionNames[k]);
        if (aSheet && aSheet.getSheetId() != TEACHER_TAB_GID) {
          targetSheet = aSheet;
          break;
        }
      }

      // If not found by name, pick the first sheet that is not the teacher sheet
      if (!targetSheet) {
        var sList = doc.getSheets();
        for (var m = 0; m < sList.length; m++) {
          if (sList[m].getSheetId() != TEACHER_TAB_GID) {
            targetSheet = sList[m];
            break;
          }
        }
      }

      // Final fallback: first sheet
      if (!targetSheet) {
        targetSheet = doc.getSheets()[0];
      }

      // Admission Tab Column Headers
      var admissionHeaders = [
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

      if (targetSheet.getLastRow() === 0) {
        targetSheet.appendRow(admissionHeaders);
        var aHeaderRange = targetSheet.getRange(1, 1, 1, admissionHeaders.length);
        aHeaderRange.setFontWeight("bold");
        aHeaderRange.setBackground("#064E3B"); // Readly Deep Emerald
        aHeaderRange.setFontColor("#FFFFFF");
        targetSheet.setFrozenRows(1);
      }

      var admissionRow = [
        timestamp,
        data.form_type || "Free Trial Demo Booking",
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

      targetSheet.appendRow(admissionRow);
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        category: isTeacherApplication ? "Teacher Application" : "Admission Inquiry",
        sheetName: targetSheet.getName(),
        sheetId: targetSheet.getSheetId(),
        row: targetSheet.getLastRow(),
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
    .createTextOutput("The Readly Institute Multi-Tab Google Sheet Backend (Admissions & Teacher Applications) is active.")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * ==============================================================================
 * UNIFIED GOOGLE APPS SCRIPT WEBHOOK ROUTER
 * The Readly Institute — Admissions & Become a Teacher Forms
 * ==============================================================================
 * Spreadsheet: https://docs.google.com/spreadsheets/d/1Xwwv4QyLLeXdB5IVYdtPeuvNIOsYRBxgL4e3OVNJ20M/edit
 *
 * Route 1: formType: "admission" -> Target Sheet GID: 0 ("Admissions")
 * Route 2: formType: "teacher"   -> Target Sheet GID: 1304058449 ("Become a Teacher")
 * ==============================================================================
 */

var SPREADSHEET_ID = "1Xwwv4QyLLeXdB5IVYdtPeuvNIOsYRBxgL4e3OVNJ20M";
var ADMISSION_GID = 0;
var TEACHER_GID = 1304058449;

function getSheetByGid(spreadsheet, gid) {
  var sheets = spreadsheet.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() == gid) {
      return sheets[i];
    }
  }
  return null;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 15 seconds to prevent race conditions during concurrent form submissions
  lock.tryLock(15000);

  try {
    // 1. Open Target Spreadsheet
    var doc;
    try {
      doc = SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (openErr) {
      doc = SpreadsheetApp.getActiveSpreadsheet();
    }

    if (!doc) {
      throw new Error("Unable to open Spreadsheet with ID: " + SPREADSHEET_ID);
    }

    // 2. Parse Incoming Payload (handles raw JSON text and form-encoded data)
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    // 3. Timestamp (Formatted in PKT UTC+5)
    var timestamp = Utilities.formatDate(new Date(), "GMT+5", "yyyy-MM-dd HH:mm:ss");

    // 4. Identify Form Type & Target Sheet
    var formType = (data.formType || data.form_type || "").toString().toLowerCase().trim();
    var targetSheet = null;

    if (formType === "teacher" || formType.indexOf("tutor") !== -1 || (formType === "team" && (data.department === "Teacher / Tutor" || (data.role || "").toLowerCase().indexOf("teacher") !== -1))) {
      // ------------------------------------------------------------------------
      // TEACHER FORM ROUTE (gid=1304058449)
      // ------------------------------------------------------------------------
      targetSheet = getSheetByGid(doc, TEACHER_GID);

      // Fallback by sheet name if GID is re-assigned
      if (!targetSheet) {
        targetSheet = doc.getSheetByName("Become a Teacher") ||
                      doc.getSheetByName("become a teacher") ||
                      doc.getSheetByName("Teachers") ||
                      doc.getSheetByName("Become a Tutor");
      }

      // If still not found, create the tab
      if (!targetSheet) {
        targetSheet = doc.insertSheet("Become a Teacher");
      }

      // Absolute fail-safe: Ensure teacher submissions never hit admission tab
      if (targetSheet.getSheetId() == ADMISSION_GID && doc.getSheets().length > 1) {
        targetSheet = doc.getSheetByName("Become a Teacher") || doc.insertSheet("Become a Teacher");
      }

      var teacherHeaders = [
        "Timestamp (PKT)",
        "Form Type",
        "Teacher Name",
        "Email Address",
        "WhatsApp Number",
        "City & Country",
        "Highest Qualification",
        "University / Institute",
        "Teaching Experience",
        "Curriculum Expertise",
        "Subjects to Teach",
        "Weekly Availability",
        "CV / Portfolio URL",
        "Bio / Teaching Philosophy",
        "Page Source"
      ];

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
        "teacher",
        data.name || data.applicant_name || data.student_name || "N/A",
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

    } else if (formType === "team" || formType.indexOf("staff") !== -1 || formType.indexOf("career") !== -1) {
      // ------------------------------------------------------------------------
      // JOIN OUR TEAM ROUTE (Admin, Marketing, General Staff)
      // ------------------------------------------------------------------------
      targetSheet = doc.getSheetByName("Team & Careers") ||
                    doc.getSheetByName("Staff Applications") ||
                    doc.getSheetByName("Careers");

      if (!targetSheet) {
        targetSheet = doc.insertSheet("Team & Careers");
      }

      var teamHeaders = [
        "Timestamp (PKT)",
        "Form Type",
        "Applicant Name",
        "Department / Role",
        "WhatsApp Number",
        "Email Address",
        "City & Country",
        "Highest Qualification",
        "Experience",
        "Key Skills / Tools",
        "CV / Portfolio Link",
        "Cover Note / Statement",
        "Page Source"
      ];

      if (targetSheet.getLastRow() === 0) {
        targetSheet.appendRow(teamHeaders);
        var teamHeaderRange = targetSheet.getRange(1, 1, 1, teamHeaders.length);
        teamHeaderRange.setFontWeight("bold");
        teamHeaderRange.setBackground("#0B4635");
        teamHeaderRange.setFontColor("#FFFFFF");
        targetSheet.setFrozenRows(1);
      }

      var teamRow = [
        timestamp,
        "team",
        data.name || data.applicant_name || "N/A",
        data.department || data.role || "General Staff",
        data.whatsapp || "N/A",
        data.email || "N/A",
        data.location || data.city_country || "N/A",
        data.highest_qualification || data.qualification || "N/A",
        data.experience || "N/A",
        data.skills || data.subjects || "N/A",
        data.cv_portfolio_url || data.portfolio_link || "N/A",
        data.statement_bio || data.bio || data.message || "N/A",
        data.page || "Join Our Team Page"
      ];

      targetSheet.appendRow(teamRow);
      // ------------------------------------------------------------------------
      // ADMISSION FORM ROUTE (gid=0 / Admissions)
      // ------------------------------------------------------------------------
      targetSheet = getSheetByGid(doc, ADMISSION_GID);

      // Fallback by sheet name
      if (!targetSheet) {
        targetSheet = doc.getSheetByName("Admissions") ||
                      doc.getSheetByName("admissions") ||
                      doc.getSheetByName("Inquiries") ||
                      doc.getSheetByName("Demo Bookings") ||
                      doc.getSheetByName("Sheet1");
      }

      // Fallback to first tab
      if (!targetSheet) {
        targetSheet = doc.getSheets()[0];
      }

      // Absolute fail-safe: Ensure admission submissions never hit teacher tab
      if (targetSheet.getSheetId() == TEACHER_GID) {
        targetSheet = doc.getSheetByName("Admissions") || doc.insertSheet("Admissions");
      }

      var admissionHeaders = [
        "Timestamp (PKT)",
        "Form Type",
        "Student Name",
        "Parent Name",
        "WhatsApp Number",
        "Email Address",
        "Program / Curriculum",
        "Grade / Level",
        "Subject",
        "Preferred Mentor",
        "Target Exam Series",
        "Inquiry / Notes",
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
        "admission",
        data.student_name || data.name || "N/A",
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

    // Return clean JSON response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Record added",
        formType: (formType === "teacher" || formType.indexOf("tutor") !== -1) ? "teacher" : "admission",
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
        message: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("The Readly Institute Google Apps Script Router (Admissions & Teacher Forms) is Online.")
    .setMimeType(ContentService.MimeType.TEXT);
}

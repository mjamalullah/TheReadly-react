/**
 * ==============================================================================
 * UNIFIED GOOGLE APPS SCRIPT WEBHOOK ROUTER (V3 - FORMULA ERROR FIX)
 * The Readly Institute — Admissions, Become a Teacher & Careers
 * ==============================================================================
 * Spreadsheet: https://docs.google.com/spreadsheets/d/1Xwwv4QyLLeXdB5IVYdtPeuvNIOsYRBxgL4e3OVNJ20M/edit
 *
 * Route 1: formType: "admission" -> Target Sheet GID: 0 ("Admissions")
 * Route 2: formType: "teacher"   -> Target Sheet GID: 1304058449 ("Become a Teacher")
 * Route 3: formType: "team"      -> Target Sheet: "Team & Careers"
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

/**
 * Formats phone numbers safely for Google Sheets.
 * Prepends a single quote (') so Google Sheets stores it as raw text
 * and never attempts to evaluate '+' as an arithmetic formula (which produces #ERROR!).
 */
function formatPhoneForSheet(phone) {
  if (!phone) return "N/A";
  var str = phone.toString().trim();
  if (!str) return "N/A";
  if (str.charAt(0) === "'") return str;
  return "'" + str;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
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

    // 2. Parse Incoming Payload
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

    // 4. Safe WhatsApp Phone String
    var rawPhone = data.whatsapp || data.phone || data.whatsapp_phone || "";
    var safeWhatsApp = formatPhoneForSheet(rawPhone);

    // 5. Identify Form Type & Target Sheet
    var formType = (data.formType || data.form_type || "").toString().toLowerCase().trim();
    var targetSheet = null;
    var detectedType = "admission";

    if (formType === "teacher" || formType.indexOf("tutor") !== -1 || (formType === "team" && (data.department === "Teacher / Tutor" || (data.role || "").toLowerCase().indexOf("teacher") !== -1))) {
      // ------------------------------------------------------------------------
      // TEACHER FORM ROUTE (gid=1304058449)
      // ------------------------------------------------------------------------
      detectedType = "teacher";
      targetSheet = getSheetByGid(doc, TEACHER_GID);

      if (!targetSheet) {
        targetSheet = doc.getSheetByName("Become a Teacher") ||
                      doc.getSheetByName("become a teacher") ||
                      doc.getSheetByName("Teachers") ||
                      doc.getSheetByName("Become a Tutor");
      }

      if (!targetSheet) {
        targetSheet = doc.insertSheet("Become a Teacher");
      }

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
        tHeaderRange.setBackground("#064E3B");
        tHeaderRange.setFontColor("#FFFFFF");
        targetSheet.setFrozenRows(1);
      }

      // Ensure WhatsApp column (Col E / 5) is formatted as plain text
      try {
        targetSheet.getRange(2, 5, Math.max(1, targetSheet.getMaxRows() - 1), 1).setNumberFormat("@");
      } catch (fmtErr) {}

      var teacherRow = [
        timestamp,
        "teacher",
        data.name || data.applicant_name || data.student_name || "N/A",
        data.email || "N/A",
        safeWhatsApp,
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
      detectedType = "team";
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

      // Ensure WhatsApp column (Col E / 5) is formatted as plain text
      try {
        targetSheet.getRange(2, 5, Math.max(1, targetSheet.getMaxRows() - 1), 1).setNumberFormat("@");
      } catch (fmtErr) {}

      var teamRow = [
        timestamp,
        "team",
        data.name || data.applicant_name || "N/A",
        data.department || data.role || "General Staff",
        safeWhatsApp,
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

    } else {
      // ------------------------------------------------------------------------
      // ADMISSION FORM ROUTE (gid=0 / Admissions)
      // ------------------------------------------------------------------------
      detectedType = "admission";
      targetSheet = getSheetByGid(doc, ADMISSION_GID);

      if (!targetSheet) {
        targetSheet = doc.getSheetByName("Admissions") ||
                      doc.getSheetByName("admissions") ||
                      doc.getSheetByName("Inquiries") ||
                      doc.getSheetByName("Demo Bookings") ||
                      doc.getSheetByName("Sheet1");
      }

      if (!targetSheet) {
        targetSheet = doc.getSheets()[0];
      }

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
        aHeaderRange.setBackground("#064E3B");
        aHeaderRange.setFontColor("#FFFFFF");
        targetSheet.setFrozenRows(1);
      }

      // Ensure WhatsApp column (Col E / 5) is formatted as plain text
      try {
        targetSheet.getRange(2, 5, Math.max(1, targetSheet.getMaxRows() - 1), 1).setNumberFormat("@");
      } catch (fmtErr) {}

      var admissionRow = [
        timestamp,
        "admission",
        data.student_name || data.name || "N/A",
        data.parent_name || "N/A",
        safeWhatsApp,
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
        formType: detectedType,
        sheetName: targetSheet ? targetSheet.getName() : "Default",
        sheetId: targetSheet ? targetSheet.getSheetId() : 0,
        row: targetSheet ? targetSheet.getLastRow() : 0,
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
    .createTextOutput("The Readly Institute Google Apps Script Router is Online. POST requests accepted.")
    .setMimeType(ContentService.MimeType.TEXT);
}

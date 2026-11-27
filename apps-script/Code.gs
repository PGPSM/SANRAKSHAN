/**
 * Sanrakshan '26 visitor passes
 * - doPost: receives an email from the website pop-up, gives it a pass number, saves it to the sheet, emails the pass.
 * - sendReminders: runs once on Fri 11 Dec 2026, 10:00 IST and emails the same pass number as a reminder.
 * Run setupReminderTrigger() once to schedule the reminder.
 */
const SHEET_NAME = 'Sign-ups';
const FROM_NAME = "Sanrakshan '26 | IIM Lucknow";
const PASS_SUBJECT = "Your Visitor Pass: Sanrakshan '26 | 12\u201313 Dec, IIM Lucknow Noida";
const REMINDER_SUBJECT = "Tomorrow: Sanrakshan '26 at IIM Lucknow, Noida";
const PASS_HTML = "<!DOCTYPE html>\n<html><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Sanrakshan '26 Visitor Pass</title></head>\n<body style=\"margin:0;padding:0;background:#efe9df;\">\n<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background:#efe9df;\">\n<tr><td align=\"center\" style=\"padding:32px 12px;\">\n<table role=\"presentation\" width=\"600\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;max-width:600px;font-family:Helvetica,Arial,sans-serif;\">\n\n  <tr><td style=\"padding:0 6px 22px 6px;\">\n    <p style=\"margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.25;color:#0f172a;\">Your free visitor pass is here.</p>\n    <p style=\"margin:10px 0 0 0;font-size:15px;line-height:1.6;color:#475569;\">Thank you for signing up. We'd love to have you at Sanrakshan &#8217;26: two days of panel discussions, keynotes, competitions and a startup exhibition at IIM Lucknow&#8217;s Noida campus.</p>\n  </td></tr>\n\n  <!-- TICKET -->\n  <tr><td>\n  <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-radius:20px;overflow:hidden;box-shadow:0 18px 40px -18px rgba(15,23,42,.45);\">\n    <!-- top: dark -->\n    <tr><td style=\"background:#020617;background-image:linear-gradient(135deg,#020617 0%,#062a24 100%);padding:28px 30px 30px 30px;\">\n      <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tr>\n        <td valign=\"middle\">\n          <img src=\"https://pgpsm.github.io/SANRAKSHAN/images/email/logo-iiml.png\" height=\"44\" alt=\"IIM Lucknow\" style=\"display:inline-block;height:44px;border-radius:6px;vertical-align:middle;\">\n          <img src=\"https://pgpsm.github.io/SANRAKSHAN/images/email/logo-event.png\" height=\"44\" alt=\"Sanrakshan\" style=\"display:inline-block;height:44px;margin-left:10px;border-radius:6px;vertical-align:middle;\">\n        </td>\n        <td align=\"right\" valign=\"middle\">\n          <span style=\"display:inline-block;border:1px solid #34d399;color:#6ee7b7;font-size:11px;font-weight:bold;letter-spacing:3px;padding:7px 12px;border-radius:999px;\">VISITOR PASS</span>\n        </td>\n      </tr></table>\n      <p style=\"margin:26px 0 0 0;font-family:Georgia,'Times New Roman',serif;font-size:44px;line-height:1.05;color:#ffffff;\">Sanrakshan <span style=\"color:#34d399;\">&#8217;26</span></p>\n      <p style=\"margin:10px 0 0 0;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:19px;color:#a7f3d0;\">Green Intelligence for Tomorrow</p>\n      <p style=\"margin:8px 0 0 0;font-size:13px;letter-spacing:.5px;color:#94a3b8;\">IIM Lucknow&#8217;s Annual Business Sustainability Conclave</p>\n    </td></tr>\n\n    <!-- perforation -->\n    <tr><td style=\"background:#ffffff;\">\n      <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tr>\n        <td width=\"14\" style=\"width:14px;height:28px;background:#efe9df;border-radius:0 14px 14px 0;\"></td>\n        <td style=\"border-top:2px dashed #cbd5e1;font-size:0;line-height:0;\">&nbsp;</td>\n        <td width=\"14\" style=\"width:14px;height:28px;background:#efe9df;border-radius:14px 0 0 14px;\"></td>\n      </tr></table>\n    </td></tr>\n\n    <!-- bottom: details -->\n    <tr><td style=\"background:#ffffff;padding:6px 30px 30px 30px;\">\n      <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">\n        <tr>\n          <td width=\"50%\" valign=\"top\" style=\"padding:0 12px 20px 0;\">\n            <p style=\"margin:0;font-size:11px;font-weight:bold;letter-spacing:2px;color:#94a3b8;\">DATES</p>\n            <p style=\"margin:6px 0 0 0;font-size:16px;font-weight:bold;color:#0f172a;line-height:1.4;\">Sat 12 &amp; Sun 13<br>December 2026</p>\n          </td>\n          <td width=\"50%\" valign=\"top\" style=\"padding:0 0 20px 12px;\">\n            <p style=\"margin:0;font-size:11px;font-weight:bold;letter-spacing:2px;color:#94a3b8;\">VENUE</p>\n            <p style=\"margin:6px 0 0 0;font-size:16px;font-weight:bold;color:#0f172a;line-height:1.4;\">IIM Lucknow, Noida Campus</p>\n            <p style=\"margin:2px 0 0 0;font-size:13px;color:#64748b;\">B-1, Sector 62, Noida</p>\n          </td>\n        </tr>\n        <tr>\n          <td width=\"50%\" valign=\"top\" style=\"padding:0 12px 0 0;\">\n            <p style=\"margin:0;font-size:11px;font-weight:bold;letter-spacing:2px;color:#94a3b8;\">ENTRY</p>\n            <p style=\"margin:6px 0 0 0;font-size:16px;font-weight:bold;color:#047857;\">Free &middot; Open to all</p>\n          </td>\n          <td width=\"50%\" valign=\"top\" style=\"padding:0 0 0 12px;\">\n            <p style=\"margin:0;font-size:11px;font-weight:bold;letter-spacing:2px;color:#94a3b8;\">PASS NO.</p>\n            <p style=\"margin:6px 0 0 0;font-family:'Courier New',Courier,monospace;font-size:20px;font-weight:bold;letter-spacing:2px;color:#0f172a;\">{{PASS}}</p>\n          </td>\n        </tr>\n      </table>\n      <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:26px;\"><tr>\n        <td style=\"border-radius:999px;background:#059669;\"><a href=\"https://pgpsm.github.io/SANRAKSHAN/#schedule\" style=\"display:inline-block;white-space:nowrap;padding:13px 22px;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:999px;\">View schedule &rarr;</a></td>\n        <td style=\"width:10px;\"></td>\n        <td style=\"border-radius:999px;border:1.5px solid #cbd5e1;\"><a href=\"https://maps.google.com/?q=IIM+Lucknow+Noida+Campus+B-1+Sector+62+Noida\" style=\"display:inline-block;white-space:nowrap;padding:12px 20px;font-size:14px;font-weight:bold;color:#0f172a;text-decoration:none;border-radius:999px;\">Get directions</a></td>\n      </tr></table>\n    </td></tr>\n  </table>\n  </td></tr>\n\n  <tr><td style=\"padding:22px 6px 0 6px;font-size:13px;line-height:1.6;color:#64748b;\">\n    The full schedule, speakers and any updates are always on <a href=\"https://pgpsm.github.io/SANRAKSHAN/\" style=\"color:#047857;font-weight:bold;text-decoration:none;\">our website</a>.<br>\n    Questions? Write to <a href=\"mailto:sanrakshan@iiml.ac.in\" style=\"color:#047857;text-decoration:none;\">sanrakshan@iiml.ac.in</a>\n  </td></tr>\n  <tr><td style=\"padding:18px 6px 0 6px;font-size:11px;color:#94a3b8;\">You're receiving this because you asked for a Sanrakshan &#8217;26 visitor pass on our website.</td></tr>\n\n</table>\n</td></tr></table>\n</body></html>";
const REMINDER_HTML = "<!DOCTYPE html>\n<html><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Sanrakshan '26 Visitor Pass</title></head>\n<body style=\"margin:0;padding:0;background:#efe9df;\">\n<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background:#efe9df;\">\n<tr><td align=\"center\" style=\"padding:32px 12px;\">\n<table role=\"presentation\" width=\"600\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;max-width:600px;font-family:Helvetica,Arial,sans-serif;\">\n\n  <tr><td style=\"padding:0 6px 22px 6px;\">\n    <p style=\"margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.25;color:#0f172a;\">See you tomorrow.</p>\n    <p style=\"margin:10px 0 0 0;font-size:15px;line-height:1.6;color:#475569;\">Sanrakshan &#8217;26 begins tomorrow, Saturday 12 December, at IIM Lucknow&#8217;s Noida campus. Your pass is below. Check the website for the latest schedule before you head out.</p>\n  </td></tr>\n\n  <!-- TICKET -->\n  <tr><td>\n  <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-radius:20px;overflow:hidden;box-shadow:0 18px 40px -18px rgba(15,23,42,.45);\">\n    <!-- top: dark -->\n    <tr><td style=\"background:#020617;background-image:linear-gradient(135deg,#020617 0%,#062a24 100%);padding:28px 30px 30px 30px;\">\n      <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tr>\n        <td valign=\"middle\">\n          <img src=\"https://pgpsm.github.io/SANRAKSHAN/images/email/logo-iiml.png\" height=\"44\" alt=\"IIM Lucknow\" style=\"display:inline-block;height:44px;border-radius:6px;vertical-align:middle;\">\n          <img src=\"https://pgpsm.github.io/SANRAKSHAN/images/email/logo-event.png\" height=\"44\" alt=\"Sanrakshan\" style=\"display:inline-block;height:44px;margin-left:10px;border-radius:6px;vertical-align:middle;\">\n        </td>\n        <td align=\"right\" valign=\"middle\">\n          <span style=\"display:inline-block;border:1px solid #34d399;color:#6ee7b7;font-size:11px;font-weight:bold;letter-spacing:3px;padding:7px 12px;border-radius:999px;\">VISITOR PASS</span>\n        </td>\n      </tr></table>\n      <p style=\"margin:26px 0 0 0;font-family:Georgia,'Times New Roman',serif;font-size:44px;line-height:1.05;color:#ffffff;\">Sanrakshan <span style=\"color:#34d399;\">&#8217;26</span></p>\n      <p style=\"margin:10px 0 0 0;font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:19px;color:#a7f3d0;\">Green Intelligence for Tomorrow</p>\n      <p style=\"margin:8px 0 0 0;font-size:13px;letter-spacing:.5px;color:#94a3b8;\">IIM Lucknow&#8217;s Annual Business Sustainability Conclave</p>\n    </td></tr>\n\n    <!-- perforation -->\n    <tr><td style=\"background:#ffffff;\">\n      <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tr>\n        <td width=\"14\" style=\"width:14px;height:28px;background:#efe9df;border-radius:0 14px 14px 0;\"></td>\n        <td style=\"border-top:2px dashed #cbd5e1;font-size:0;line-height:0;\">&nbsp;</td>\n        <td width=\"14\" style=\"width:14px;height:28px;background:#efe9df;border-radius:14px 0 0 14px;\"></td>\n      </tr></table>\n    </td></tr>\n\n    <!-- bottom: details -->\n    <tr><td style=\"background:#ffffff;padding:6px 30px 30px 30px;\">\n      <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">\n        <tr>\n          <td width=\"50%\" valign=\"top\" style=\"padding:0 12px 20px 0;\">\n            <p style=\"margin:0;font-size:11px;font-weight:bold;letter-spacing:2px;color:#94a3b8;\">DATES</p>\n            <p style=\"margin:6px 0 0 0;font-size:16px;font-weight:bold;color:#0f172a;line-height:1.4;\">Sat 12 &amp; Sun 13<br>December 2026</p>\n          </td>\n          <td width=\"50%\" valign=\"top\" style=\"padding:0 0 20px 12px;\">\n            <p style=\"margin:0;font-size:11px;font-weight:bold;letter-spacing:2px;color:#94a3b8;\">VENUE</p>\n            <p style=\"margin:6px 0 0 0;font-size:16px;font-weight:bold;color:#0f172a;line-height:1.4;\">IIM Lucknow, Noida Campus</p>\n            <p style=\"margin:2px 0 0 0;font-size:13px;color:#64748b;\">B-1, Sector 62, Noida</p>\n          </td>\n        </tr>\n        <tr>\n          <td width=\"50%\" valign=\"top\" style=\"padding:0 12px 0 0;\">\n            <p style=\"margin:0;font-size:11px;font-weight:bold;letter-spacing:2px;color:#94a3b8;\">ENTRY</p>\n            <p style=\"margin:6px 0 0 0;font-size:16px;font-weight:bold;color:#047857;\">Free &middot; Open to all</p>\n          </td>\n          <td width=\"50%\" valign=\"top\" style=\"padding:0 0 0 12px;\">\n            <p style=\"margin:0;font-size:11px;font-weight:bold;letter-spacing:2px;color:#94a3b8;\">PASS NO.</p>\n            <p style=\"margin:6px 0 0 0;font-family:'Courier New',Courier,monospace;font-size:20px;font-weight:bold;letter-spacing:2px;color:#0f172a;\">{{PASS}}</p>\n          </td>\n        </tr>\n      </table>\n      <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:26px;\"><tr>\n        <td style=\"border-radius:999px;background:#059669;\"><a href=\"https://pgpsm.github.io/SANRAKSHAN/#schedule\" style=\"display:inline-block;white-space:nowrap;padding:13px 22px;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:999px;\">View schedule &rarr;</a></td>\n        <td style=\"width:10px;\"></td>\n        <td style=\"border-radius:999px;border:1.5px solid #cbd5e1;\"><a href=\"https://maps.google.com/?q=IIM+Lucknow+Noida+Campus+B-1+Sector+62+Noida\" style=\"display:inline-block;white-space:nowrap;padding:12px 20px;font-size:14px;font-weight:bold;color:#0f172a;text-decoration:none;border-radius:999px;\">Get directions</a></td>\n      </tr></table>\n    </td></tr>\n  </table>\n  </td></tr>\n\n  <tr><td style=\"padding:22px 6px 0 6px;font-size:13px;line-height:1.6;color:#64748b;\">\n    The full schedule, speakers and any updates are always on <a href=\"https://pgpsm.github.io/SANRAKSHAN/\" style=\"color:#047857;font-weight:bold;text-decoration:none;\">our website</a>.<br>\n    Questions? Write to <a href=\"mailto:sanrakshan@iiml.ac.in\" style=\"color:#047857;text-decoration:none;\">sanrakshan@iiml.ac.in</a>\n  </td></tr>\n  <tr><td style=\"padding:18px 6px 0 6px;font-size:11px;color:#94a3b8;\">You're receiving this because you asked for a Sanrakshan &#8217;26 visitor pass on our website.</td></tr>\n\n</table>\n</td></tr></table>\n</body></html>";
const SITE = 'https://pgpsm.github.io/SANRAKSHAN/';

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['Signed up at', 'Email', 'Pass no.', 'Pass sent at', 'Reminder sent at', 'Signed up from']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function out_(msg) { return ContentService.createTextOutput(msg).setMimeType(ContentService.MimeType.TEXT); }

function plain_(passNo, reminder) {
  return (reminder ? "See you tomorrow at Sanrakshan '26!\n\n" : "Your free visitor pass for Sanrakshan '26 is here.\n\n") +
    'Pass no.: ' + passNo + '\nDates: Sat 12 & Sun 13 December 2026\nVenue: IIM Lucknow, Noida Campus, B-1, Sector 62, Noida\nEntry: Free, open to all\n\nSchedule: ' + SITE + '#schedule';
}

function sendPass_(email, passNo) {
  MailApp.sendEmail({ to: email, subject: PASS_SUBJECT, name: FROM_NAME,
    htmlBody: PASS_HTML.replace('{{PASS}}', passNo), body: plain_(passNo, false) });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const email = String((e && e.parameter && e.parameter.email) || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return out_('invalid');
    const sh = getSheet_();
    const rows = sh.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      if (String(rows[i][1]).toLowerCase() === email) {      // already signed up: resend the SAME pass number
        if (canSend_()) { sendPass_(email, rows[i][2]); sh.getRange(i + 1, 4).setValue(new Date()); }
        return out_('exists');
      }
    }
    const passNo = 'SAN26-' + String(100 + rows.length).padStart(4, '0');   // first sign-up = SAN26-0101
    sh.appendRow([new Date(), email, passNo, '', '', String(e.parameter.page || '')]);
    const row = sh.getLastRow();
    if (canSend_()) {
      sendPass_(email, passNo);
      sh.getRange(row, 4).setValue(new Date());
    } else {
      scheduleRetry_();          // daily limit reached: the pass goes out automatically within the hour after it resets
    }
    return out_('ok');
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return out_("Sanrakshan '26 pass service is running."); }

/**
 * Daily email limit for this account (Workspace): 1,500 from scripts, 2,000 overall.
 * The script always leaves RESERVE emails unused for the team's own mail.
 */
const RESERVE = 100;
const REMIND_AT = new Date('2026-12-11T10:00:00+05:30');

function canSend_() { return MailApp.getRemainingDailyQuota() > RESERVE; }

function scheduleRetry_() {
  const has = ScriptApp.getProjectTriggers().some(t => t.getHandlerFunction() === 'sendPending');
  if (!has) ScriptApp.newTrigger('sendPending').timeBased().after(60 * 60 * 1000).create();
}

/** Runs at the reminder time (trigger), and hourly whenever something is waiting on the daily limit. */
function sendReminders() { sendPending(); }

function sendPending() {
  ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === 'sendPending').forEach(t => ScriptApp.deleteTrigger(t));
  const sh = getSheet_();
  const rows = sh.getDataRange().getValues();
  const now = new Date(), reminderDue = now >= REMIND_AT;
  for (let i = 1; i < rows.length; i++) {
    const [signedUp, email, passNo, passSent, remSent] = rows[i];
    if (!email) continue;
    if (!passSent && now - new Date(signedUp) > 10 * 60 * 1000) {      // passes held back by the limit
      if (!canSend_()) return scheduleRetry_();
      sendPass_(email, passNo);
      sh.getRange(i + 1, 4).setValue(new Date());
    }
    if (reminderDue && !remSent) {                                      // day-before reminder, same pass number
      if (!canSend_()) return scheduleRetry_();
      MailApp.sendEmail({ to: email, subject: REMINDER_SUBJECT, name: FROM_NAME,
        htmlBody: REMINDER_HTML.replace('{{PASS}}', passNo), body: plain_(passNo, true) });
      sh.getRange(i + 1, 5).setValue(new Date());
    }
  }
}

/** Run once: schedules the reminder for Fri 11 Dec 2026, 10:00 AM India time. */
function setupReminderTrigger() {
  ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === 'sendReminders').forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('sendReminders').timeBased().at(REMIND_AT).create();
  getSheet_();
}

/** Optional: send yourself a test pass (doesn't touch the sheet). */
function sendTestPass() {
  sendPass_(Session.getActiveUser().getEmail(), 'SAN26-TEST');
}

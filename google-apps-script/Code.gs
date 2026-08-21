const CONFIG = Object.freeze({
  spreadsheetName: 'Vision Vikas 2027–32 — Join Us Registrations',
  sheetName: 'Join Us',
  notificationEmail: 'kuldeep4vikasnagar@gmail.com',
  headers: [
    'Received At',
    'Name',
    'Mobile',
    'Email',
    'Age',
    'Area / Locality',
    'Ward',
    'Occupation',
    'Participation Interest',
    'Local Issue / Feedback',
    'Consent',
    'Language',
    'Client Submitted At',
    'Source URL',
    'Email Status',
  ],
});

const PARTICIPATION_LABELS = Object.freeze({
  volunteer: 'Volunteer',
  youth: 'Youth Team',
  social: 'Social Media Team',
  women: "Women's Team",
  development: 'Development Initiative',
  supporter: 'General Supporter',
});

/**
 * Run once from the Apps Script editor. This creates the Google Sheet in the
 * signed-in owner's Drive and stores its ID for future form submissions.
 */
function setup() {
  const properties = PropertiesService.getScriptProperties();
  let spreadsheet = null;
  const existingId = properties.getProperty('SPREADSHEET_ID');

  if (existingId) {
    try {
      spreadsheet = SpreadsheetApp.openById(existingId);
    } catch (error) {
      console.warn('The saved spreadsheet could not be opened; a new one will be created.');
    }
  }

  if (!spreadsheet) {
    spreadsheet = SpreadsheetApp.create(CONFIG.spreadsheetName);
    properties.setProperty('SPREADSHEET_ID', spreadsheet.getId());
  }

  properties.setProperty('NOTIFICATION_EMAIL', CONFIG.notificationEmail);
  spreadsheet.setSpreadsheetTimeZone('Asia/Kolkata');
  configureSheet_(spreadsheet);

  const result = {
    spreadsheetId: spreadsheet.getId(),
    spreadsheetUrl: spreadsheet.getUrl(),
    notificationEmail: properties.getProperty('NOTIFICATION_EMAIL'),
  };
  console.log(JSON.stringify(result, null, 2));
  return result;
}

function doGet() {
  return jsonResponse_({
    ok: true,
    service: 'Vision Vikas 2027–32 Join Us registration service',
  });
}

function doPost(event) {
  try {
    const input = parseRequest_(event);

    // Silently accept bot submissions that fill the hidden website field.
    if (input.website) return jsonResponse_({ ok: true });

    const registration = validateAndNormalize_(input);
    const spreadsheet = getConfiguredSpreadsheet_();
    const sheet = configureSheet_(spreadsheet);
    const rowNumber = appendRegistration_(sheet, registration);

    let emailStatus = 'Sent';
    try {
      sendNotification_(registration);
    } catch (emailError) {
      emailStatus = `Failed: ${cleanSingleLine_(emailError.message, 180)}`;
      console.error(emailError.stack || emailError);
    }
    sheet.getRange(rowNumber, CONFIG.headers.length).setValue(emailStatus);

    return jsonResponse_({ ok: true, emailSent: emailStatus === 'Sent' });
  } catch (error) {
    console.error(error.stack || error);
    return jsonResponse_({
      ok: false,
      error: error.code === 'SETUP_REQUIRED' ? 'Registration service setup is incomplete.' : 'Registration could not be saved.',
    });
  }
}

function parseRequest_(event) {
  if (!event || !event.postData || !event.postData.contents) {
    throw new Error('Request body is missing.');
  }

  try {
    return JSON.parse(event.postData.contents);
  } catch (error) {
    throw new Error('Request body must be valid JSON.');
  }
}

function validateAndNormalize_(input) {
  const mobile = cleanSingleLine_(input.mobile, 20).replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
  const email = cleanSingleLine_(input.email, 254).toLowerCase();
  const ageText = cleanSingleLine_(input.age, 3);
  const age = ageText ? Number(ageText) : '';
  const participation = cleanSingleLine_(input.participation, 40);

  const registration = {
    receivedAt: new Date(),
    name: cleanSingleLine_(input.name, 120),
    mobile,
    email,
    age,
    area: cleanSingleLine_(input.area, 160),
    ward: cleanSingleLine_(input.ward, 120),
    occupation: cleanSingleLine_(input.occupation, 160),
    participation,
    participationLabel: PARTICIPATION_LABELS[participation] || participation,
    issue: cleanMultiline_(input.issue, 3000),
    consent: input.consent === true,
    language: input.language === 'hi' ? 'Hindi' : 'English',
    submittedAt: cleanSingleLine_(input.submittedAt, 40),
    sourceUrl: cleanSingleLine_(input.sourceUrl, 500),
  };

  if (!registration.name) throw new Error('Name is required.');
  if (!/^\d{10}$/.test(registration.mobile)) throw new Error('A valid 10-digit mobile number is required.');
  if (registration.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registration.email)) throw new Error('Email is invalid.');
  if (registration.age !== '' && (!Number.isInteger(registration.age) || registration.age < 16 || registration.age > 120)) throw new Error('Age is invalid.');
  if (!registration.area) throw new Error('Area is required.');
  if (!PARTICIPATION_LABELS[registration.participation]) throw new Error('Participation interest is invalid.');
  if (!registration.consent) throw new Error('Contact consent is required.');

  return registration;
}

function getConfiguredSpreadsheet_() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!spreadsheetId) {
    const error = new Error('Run setup() before deploying the web app.');
    error.code = 'SETUP_REQUIRED';
    throw error;
  }
  return SpreadsheetApp.openById(spreadsheetId);
}

function configureSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(CONFIG.sheetName);
  if (!sheet) {
    const sheets = spreadsheet.getSheets();
    sheet = sheets.length === 1 && sheetIsEmpty_(sheets[0])
      ? sheets[0].setName(CONFIG.sheetName)
      : spreadsheet.insertSheet(CONFIG.sheetName);
  }

  const headerRange = sheet.getRange(1, 1, 1, CONFIG.headers.length);
  headerRange
    .setValues([CONFIG.headers])
    .setBackground('#154734')
    .setFontColor('#ffffff')
    .setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 170);
  sheet.setColumnWidth(2, 180);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 220);
  sheet.setColumnWidth(6, 180);
  sheet.setColumnWidth(9, 190);
  sheet.setColumnWidth(10, 360);
  sheet.setColumnWidth(14, 260);
  sheet.setColumnWidth(15, 180);
  return sheet;
}

function sheetIsEmpty_(sheet) {
  return sheet.getLastRow() === 0 || (sheet.getLastRow() === 1 && sheet.getLastColumn() === 1 && !sheet.getRange('A1').getValue());
}

function appendRegistration_(sheet, registration) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const rowNumber = sheet.getLastRow() + 1;
    const row = [[
      registration.receivedAt,
      safeSheetValue_(registration.name),
      safeSheetValue_(registration.mobile),
      safeSheetValue_(registration.email),
      registration.age,
      safeSheetValue_(registration.area),
      safeSheetValue_(registration.ward),
      safeSheetValue_(registration.occupation),
      safeSheetValue_(registration.participationLabel),
      safeSheetValue_(registration.issue),
      registration.consent ? 'Yes' : 'No',
      registration.language,
      safeSheetValue_(registration.submittedAt),
      safeSheetValue_(registration.sourceUrl),
      'Pending',
    ]];
    sheet.getRange(rowNumber, 1, 1, CONFIG.headers.length).setValues(row);
    sheet.getRange(rowNumber, 1).setNumberFormat('dd mmm yyyy, hh:mm:ss');
    sheet.getRange(rowNumber, 10).setWrap(true);
    SpreadsheetApp.flush();
    return rowNumber;
  } finally {
    lock.releaseLock();
  }
}

function sendNotification_(registration) {
  if (MailApp.getRemainingDailyQuota() < 1) throw new Error('Daily email quota reached');

  const recipient = PropertiesService.getScriptProperties().getProperty('NOTIFICATION_EMAIL') || CONFIG.notificationEmail;
  const fields = [
    ['Name', registration.name],
    ['Mobile', registration.mobile],
    ['Email', registration.email || 'Not provided'],
    ['Age', registration.age === '' ? 'Not provided' : registration.age],
    ['Area / Locality', registration.area],
    ['Ward', registration.ward || 'Not provided'],
    ['Occupation', registration.occupation || 'Not provided'],
    ['Participation Interest', registration.participationLabel],
    ['Local Issue / Feedback', registration.issue || 'Not provided'],
    ['Consent', registration.consent ? 'Yes' : 'No'],
    ['Language', registration.language],
    ['Received At', Utilities.formatDate(registration.receivedAt, 'Asia/Kolkata', 'dd MMM yyyy, hh:mm:ss a')],
  ];
  const body = ['A new Join Us registration was received.', '', ...fields.map(([label, value]) => `${label}: ${value}`)].join('\n');
  const htmlRows = fields.map(([label, value]) =>
    `<tr><th style="padding:8px 12px;text-align:left;vertical-align:top;background:#f4f7f5;border:1px solid #dfe7e2">${escapeHtml_(label)}</th><td style="padding:8px 12px;border:1px solid #dfe7e2;white-space:pre-wrap">${escapeHtml_(String(value))}</td></tr>`
  ).join('');

  const message = {
    to: recipient,
    subject: `New Join Us registration — ${registration.name} (${registration.area})`,
    body,
    htmlBody: `<h2 style="color:#154734">New Join Us registration</h2><table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${htmlRows}</table>`,
    name: 'Vision Vikas 2027–32 Website',
  };
  if (registration.email) message.replyTo = registration.email;
  MailApp.sendEmail(message);
}

function cleanSingleLine_(value, maxLength) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function cleanMultiline_(value, maxLength) {
  return String(value == null ? '' : value).replace(/\r\n?/g, '\n').trim().slice(0, maxLength);
}

function safeSheetValue_(value) {
  const text = String(value == null ? '' : value);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * Send notification to school when a new admission is submitted.
 */
const sendAdmissionNotificationToSchool = async (admission) => {
  if (!process.env.EMAIL_USER || !process.env.SCHOOL_EMAIL) return;

  const transporter = createTransporter();
  const { studentName, classApplied, parentName, parentPhone, parentEmail, dob, gender, address, message } = admission;

  await transporter.sendMail({
    from: `"Little Angels School Website" <${process.env.EMAIL_USER}>`,
    to: process.env.SCHOOL_EMAIL,
    subject: `📋 New Admission Application — ${studentName} (${classApplied})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #f9f9f9; border-radius: 10px; overflow: hidden;">
        <div style="background: #1e3a8a; padding: 24px; text-align: center;">
          <h1 style="color: #facc15; margin: 0; font-size: 22px;">🎓 Little Angels High School</h1>
          <p style="color: #bfdbfe; margin: 6px 0 0; font-size: 14px;">New Online Admission Application Received</p>
        </div>
        <div style="padding: 28px;">
          <h2 style="color: #1e3a8a; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">
            Student Details
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="background: #eff6ff;"><td style="padding: 10px 14px; font-weight: bold; color: #374151; width: 40%;">Student Name</td><td style="padding: 10px 14px; color: #111827;">${studentName}</td></tr>
            <tr><td style="padding: 10px 14px; font-weight: bold; color: #374151;">Class Applied</td><td style="padding: 10px 14px; color: #1d4ed8; font-weight: bold;">${classApplied}</td></tr>
            <tr style="background: #eff6ff;"><td style="padding: 10px 14px; font-weight: bold; color: #374151;">Date of Birth</td><td style="padding: 10px 14px; color: #111827;">${dob || 'Not provided'}</td></tr>
            <tr><td style="padding: 10px 14px; font-weight: bold; color: #374151;">Gender</td><td style="padding: 10px 14px; color: #111827;">${gender || 'Not provided'}</td></tr>
          </table>

          <h2 style="color: #1e3a8a; margin-top: 24px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">
            Parent / Guardian Details
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="background: #eff6ff;"><td style="padding: 10px 14px; font-weight: bold; color: #374151; width: 40%;">Parent Name</td><td style="padding: 10px 14px; color: #111827;">${parentName}</td></tr>
            <tr><td style="padding: 10px 14px; font-weight: bold; color: #374151;">Phone Number</td><td style="padding: 10px 14px; color: #111827;"><a href="tel:${parentPhone}" style="color: #1d4ed8;">${parentPhone}</a></td></tr>
            <tr style="background: #eff6ff;"><td style="padding: 10px 14px; font-weight: bold; color: #374151;">Email</td><td style="padding: 10px 14px; color: #111827;">${parentEmail || 'Not provided'}</td></tr>
            <tr><td style="padding: 10px 14px; font-weight: bold; color: #374151;">Address</td><td style="padding: 10px 14px; color: #111827;">${address || 'Not provided'}</td></tr>
          </table>

          ${message ? `
          <h2 style="color: #1e3a8a; margin-top: 24px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">Additional Message</h2>
          <p style="background: #f1f5f9; padding: 14px; border-radius: 8px; font-size: 14px; color: #374151;">${message}</p>
          ` : ''}

          <div style="margin-top: 24px; background: #fefce8; border: 1px solid #fde68a; border-radius: 8px; padding: 16px;">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
              ⏰ <strong>Please contact the parent within 2–3 working days</strong> to schedule a school visit and complete the admission process.
            </p>
          </div>
        </div>
        <div style="background: #1e3a8a; padding: 16px; text-align: center;">
          <p style="color: #93c5fd; font-size: 12px; margin: 0;">
            Little Angels High School, Balighattam, Narsipatnam, AP 531118 | This is an automated email from your school website.
          </p>
        </div>
      </div>
    `,
  });
};

/**
 * Send confirmation email to parent after admission form submission.
 */
const sendAdmissionConfirmationToParent = async (admission) => {
  if (!process.env.EMAIL_USER || !admission.parentEmail) return;

  const transporter = createTransporter();
  const { studentName, classApplied, parentName, parentEmail } = admission;

  await transporter.sendMail({
    from: `"Little Angels High School" <${process.env.EMAIL_USER}>`,
    to: parentEmail,
    subject: `✅ Admission Application Received — ${studentName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #f9f9f9; border-radius: 10px; overflow: hidden;">
        <div style="background: #1e3a8a; padding: 24px; text-align: center;">
          <h1 style="color: #facc15; margin: 0; font-size: 22px;">🎓 Little Angels High School</h1>
          <p style="color: #bfdbfe; margin: 6px 0 0; font-size: 14px;">లిటిల్ అంగెల్స్ హై పాఠశాల, Balighattam, Narsipatnam</p>
        </div>
        <div style="padding: 28px;">
          <h2 style="color: #16a34a; margin-top: 0;">✅ Application Successfully Submitted!</h2>
          <p style="color: #374151; font-size: 15px;">Dear <strong>${parentName}</strong>,</p>
          <p style="color: #374151; font-size: 15px; line-height: 1.7;">
            Thank you for applying to <strong>Little Angels High School</strong>. We have received the online admission application for your child <strong>${studentName}</strong> for <strong>${classApplied}</strong>.
          </p>
          <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 0 8px 8px 0; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #1e40af;">
              Our admissions team will review your application and <strong>contact you within 2–3 working days</strong> to schedule a school visit and complete the enrollment process.
            </p>
          </div>
          <p style="color: #374151; font-size: 14px;">If you have any urgent queries, please feel free to:</p>
          <ul style="color: #374151; font-size: 14px; line-height: 2;">
            <li>📞 Call us: <a href="tel:+917569703277" style="color: #1d4ed8;">+91 75697 03277</a></li>
            <li>💬 WhatsApp: <a href="https://wa.me/917569703277" style="color: #16a34a;">Chat with us</a></li>
            <li>📍 Visit: MJ57+29P, Balighattam, Narsipatnam, AP 531118</li>
          </ul>
          <p style="color: #374151; font-size: 15px; margin-top: 24px;">We look forward to welcoming ${studentName} into our school family! 🌟</p>
          <p style="color: #374151; font-size: 15px;">Warm regards,<br/><strong>The Admissions Team</strong><br/>Little Angels High School</p>
        </div>
        <div style="background: #1e3a8a; padding: 16px; text-align: center;">
          <p style="color: #93c5fd; font-size: 12px; margin: 0;">
            Little Angels High School, Balighattam, Narsipatnam, AP 531118
          </p>
        </div>
      </div>
    `,
  });
};

/**
 * Send notification to school when a new contact message is submitted.
 */
const sendContactNotificationToSchool = async (contact) => {
  if (!process.env.EMAIL_USER || !process.env.SCHOOL_EMAIL) return;

  const transporter = createTransporter();
  const { name, email, phone, subject, message } = contact;

  await transporter.sendMail({
    from: `"Little Angels School Website" <${process.env.EMAIL_USER}>`,
    to: process.env.SCHOOL_EMAIL,
    subject: `📬 New Contact Message — ${subject || 'General Enquiry'} from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #f9f9f9; border-radius: 10px; overflow: hidden;">
        <div style="background: #1e3a8a; padding: 24px; text-align: center;">
          <h1 style="color: #facc15; margin: 0; font-size: 22px;">🎓 Little Angels High School</h1>
          <p style="color: #bfdbfe; margin: 6px 0 0; font-size: 14px;">New Website Contact Form Submission</p>
        </div>
        <div style="padding: 28px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="background: #eff6ff;"><td style="padding: 10px 14px; font-weight: bold; color: #374151; width: 30%;">Name</td><td style="padding: 10px 14px;">${name}</td></tr>
            <tr><td style="padding: 10px 14px; font-weight: bold; color: #374151;">Email</td><td style="padding: 10px 14px;"><a href="mailto:${email}" style="color: #1d4ed8;">${email}</a></td></tr>
            <tr style="background: #eff6ff;"><td style="padding: 10px 14px; font-weight: bold; color: #374151;">Phone</td><td style="padding: 10px 14px;">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding: 10px 14px; font-weight: bold; color: #374151;">Subject</td><td style="padding: 10px 14px;">${subject || 'General Enquiry'}</td></tr>
          </table>
          <h3 style="color: #1e3a8a; margin-top: 20px;">Message:</h3>
          <p style="background: #f1f5f9; padding: 14px; border-radius: 8px; font-size: 14px; color: #374151;">${message}</p>
        </div>
        <div style="background: #1e3a8a; padding: 16px; text-align: center;">
          <p style="color: #93c5fd; font-size: 12px; margin: 0;">This is an automated email from your school website.</p>
        </div>
      </div>
    `,
  });
};

module.exports = {
  sendAdmissionNotificationToSchool,
  sendAdmissionConfirmationToParent,
  sendContactNotificationToSchool,
};

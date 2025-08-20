import nodemailer from 'nodemailer';

export function transporter() {
  // Always use real SMTP configuration regardless of environment
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { 
      user: process.env.SMTP_USER, 
      pass: process.env.SMTP_PASS 
    }
  });
}

export async function sendMail(to, subject, text) {
  try {
    const info = await transporter().sendMail({ 
      from: process.env.MAIL_FROM || 'Apexcify Shop <sufianliaqat4422@gmail.com>', 
      to, 
      subject, 
      text,
      html: `<p>${text}</p>`
    });
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}

import nodemailer, { Transporter } from "nodemailer";

// Define the interface for email options
interface EmailOptions {
  email: string;
  subject: string;
  html: string;
}

// Define the function to send an email
const sendMail = async (options: EmailOptions): Promise<void> => {
  // Create a transporter object using SMTP settings from environment variables
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "887"),
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Destructure the email options
  const { email, subject, html } = options;

  // Define the mail options
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

// Export the sendMail function as the default export
export default sendMail;

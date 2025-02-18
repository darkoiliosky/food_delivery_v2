import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Or your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password (use environment variables for security)
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("Email sent: " + info.response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error sending email: " + error.message);
    } else {
      throw new Error(
        "Error sending email: An unexpected error occurred. " + error
      );
    }
  }
};

export const sendRegistrationLink = async (email: string, token: string) => {
  const url = `${process.env.BASE_URL}/auth/verify/${token}`;
  const subject = "Complete your registration";
  const text = `Please click the following link to complete your registration: ${url}`;

  await sendEmail(email, subject, text);
};

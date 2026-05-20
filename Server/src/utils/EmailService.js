import transporter from "../config/mailer.js";

export const sendWelcomeEmail = async (toEmail, username) => {
  const mailOptions = {
    from: `"MyApp" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Welcome to MyApp! 🎉',
    html: `
      <h2>Hello, ${username}!</h2>
      <p>Thank you for registering with us. We're glad to have you on board.</p>
      <p>If you didn't create this account, please ignore this email.</p>
      <br/>
      <p>Regards,<br/>The MyApp Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendLoginEmail = async (toEmail, username) => {
  const loginTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata', // change to your timezone
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const mailOptions = {
    from: `"MyApp" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: '🔐 New Login to Your Account',
    html: `
      <h2>Hi, ${username}!</h2>
      <p>We detected a new login to your account.</p>
      <table>
        <tr><td><strong>Time:</strong></td><td>${loginTime}</td></tr>
      </table>
      <p>If this was you, no action needed.</p>
      <p>If this wasn't you, <strong>change your password immediately.</strong></p>
      <br/>
      <p>Regards,<br/>The MyApp Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendLogoutEmail = async (toEmail, username) => {
  const mailOptions = {
    from: `"MyApp" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'You have been logged out',
    html: `
      <h2>Hi, ${username}!</h2>
      <p>You have successfully logged out of your account.</p>
      <p>If this wasn't you, please secure your account immediately.</p>
      <br/>
      <p>Regards,<br/>The MyApp Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
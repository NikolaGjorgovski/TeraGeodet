const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendNewRequestEmail = async (request) => {
  const {
    userSnapshot,
    phoneNumber,
    cadastralMunicipality,
    parcelNumber,
    title,
    description,
  } = request;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Survey Request — ${title}`,
    html: `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem; background: #f5f5f3; border-radius: 16px;">
        
        <div style="background: #ffffff; border-radius: 12px; padding: 2rem; border: 1px solid rgba(0,0,0,0.08);">
          
          <div style="border-top: 4px solid #1D9E75; border-radius: 4px; margin-bottom: 1.5rem;"></div>
          
          <h1 style="font-size: 22px; color: #1a1a18; margin-bottom: 0.25rem; font-weight: 400;">
            New Survey Request
          </h1>
          <p style="font-size: 14px; color: #6b6b68; margin-bottom: 2rem;">
            A new request has been submitted and is waiting for your review.
          </p>

          <!-- Request details -->
          <div style="background: #f5f5f3; border-radius: 10px; padding: 1.25rem; margin-bottom: 1.5rem;">
            <h2 style="font-size: 15px; color: #1a1a18; margin-bottom: 1rem; font-weight: 500;">
              Request Details
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="font-size: 12px; color: #a8a8a5; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 8px; width: 40%;">Title</td>
                <td style="font-size: 14px; color: #1a1a18; padding-bottom: 8px;">${title}</td>
              </tr>
              <tr>
                <td style="font-size: 12px; color: #a8a8a5; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 8px;">Municipality</td>
                <td style="font-size: 14px; color: #1a1a18; padding-bottom: 8px;">${cadastralMunicipality}</td>
              </tr>
              <tr>
                <td style="font-size: 12px; color: #a8a8a5; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 8px;">Parcel Number</td>
                <td style="font-size: 14px; color: #1a1a18; padding-bottom: 8px;">${parcelNumber}</td>
              </tr>
              <tr>
                <td style="font-size: 12px; color: #a8a8a5; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 8px;">Description</td>
                <td style="font-size: 14px; color: #1a1a18; padding-bottom: 8px;">${description}</td>
              </tr>
            </table>
          </div>

          <!-- User details -->
          <div style="background: #f5f5f3; border-radius: 10px; padding: 1.25rem; margin-bottom: 1.5rem;">
            <h2 style="font-size: 15px; color: #1a1a18; margin-bottom: 1rem; font-weight: 500;">
              Submitted By
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="font-size: 12px; color: #a8a8a5; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 8px; width: 40%;">Name</td>
                <td style="font-size: 14px; color: #1a1a18; padding-bottom: 8px;">${userSnapshot.fName} ${userSnapshot.lName}</td>
              </tr>
              <tr>
                <td style="font-size: 12px; color: #a8a8a5; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 8px;">Email</td>
                <td style="font-size: 14px; color: #1a1a18; padding-bottom: 8px;">${userSnapshot.email}</td>
              </tr>
              <tr>
                <td style="font-size: 12px; color: #a8a8a5; text-transform: uppercase; letter-spacing: 0.05em; padding-bottom: 8px;">Phone</td>
                <td style="font-size: 14px; color: #1a1a18; padding-bottom: 8px;">${phoneNumber}</td>
              </tr>
            </table>
          </div>

          <p style="font-size: 12px; color: #a8a8a5; text-align: center; margin-top: 1.5rem;">
            TeraGeodet — Surveying Services
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendNewRequestEmail };

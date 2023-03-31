import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: "shiv0101shubhang@outlook.com",
    pass: "shiv0101",
  },
});

export async function sendMail(req, res) {
  try {
    const { emailHtml = "Something went wrong" } = req.body;

    if (!emailHtml) {
      return res.status(400).json({
        success: false,
        message: "Email content is not provided",
      });
    }

    const options = {
      from: "shiv0101shubhang@outlook.com",
      to: "info@redpositive.in",
      subject: "hello world",
      html: emailHtml,
    };

    await transporter.sendMail(options);

    res.status(200).json({
      success: true,
      message: "Mail sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

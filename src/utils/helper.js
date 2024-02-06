import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer  from "nodemailer";
class HelperMethod {
  async createAdminJwt() {
    const token = jwt.sign(
      {
        data: {
          username: "onkar",
          id: "123456",
        },
      },
      "secret",
      { expiresIn: "8h" }
    );
    return token;
  }
  async verifyAdminJwt(token) {
    try {
      var decoded = jwt.verify(token, "secret");
      return decoded;
    } catch (err) {
      return false;
    }
  }
  async createWebJwt(user) {
    const token = jwt.sign(
      {
        data: user,
      },
      "secret",
      { expiresIn: "8h" }
    );
    return token;
  }
  async verifyWebJwt(token) {
    try {
      var decoded = jwt.verify(token, "secret");
      return decoded;
    } catch (err) {
      return false;
    }
  }
  async passwordhash(password) {
    return bcrypt.hash(password, 10);
  }
  async verifywebPassword(password, hashPassword){
    const result = await bcrypt.compare(password, hashPassword);
    return result;
  } 
  async senEmail ({email, body, subject}){
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "solutionshhh@gmail.com",
        pass: "jhos pbpx vowb xoil",
      },
    });
    const info = await transporter.sendMail({
      from: "solutionshhh@gmail.com",
      to: email,
      subject: subject,
      // text: "Hello world?",
      html: body,
    }); 
    console.log("Message sent: %s", info.messageId);
  }
} 

export default new HelperMethod();

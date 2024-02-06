import { webUserModel, gameNumberModel, gameWinnerModel } from "../../model";
import HelperMethod from "../../utils/helper";
const paypal = require("paypal-rest-sdk");
import { otpModel } from "../../model/otp";
paypal.configure({
  mode: "live", //sandbox or live
  client_id:
    "ASGIWNRBc9O5MkzGTHKjszjZC3JqblgwzlcXXr2TceNmJTv9XQfH-6Wj2n0a_G1GYGDxJ3QitzJZJQ1E",
  client_secret:
    "EB1dtD8weh2VfNy3B5eFMxFZ5FjXa7yoi9A7xozYjZMw44AVqmY-cXvfmQKXvLdKusnyy_RzTIrDHbsu",
});
class WebController {
  async webLogin(req, res) {
    try {
      const { email, password } = req.body;
      const _findUser = await webUserModel.find({ email });
      console.log(_findUser);
      if (_findUser.length >= 1) {
        const {
          password: hashPassword,
          email,
          username,
          totalnumbers,
        } = _findUser[0];
        const isPassVerified = await HelperMethod.verifywebPassword(
          password,
          hashPassword
        );
        if (isPassVerified) {
          const token = await HelperMethod.createWebJwt({
            email,
            username,
            totalnumbers,
          });
          res.status(200).json({
            status: 200,
            message: "OK",
            token,
          });
        } else {
          res.status(200).json({
            status: 403,
            message: "Incorrect password",
          });
        }
      } else {
        res.status(200).json({
          status: 404,
          message: "User does not exist",
        });
      }
    } catch (error) {
      res.status(200).json({
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      });
    }
  }
  async webCreateUser(req, res) {
    try {
      const { email, password, username, country, state } = req.body;
      console.log(req.body);
      const encryptpassword = await HelperMethod.passwordhash(password);
      const findUser = await webUserModel.find({ username });
      const _findUser = await webUserModel.find({ email });

      if (findUser.length >= 1) {
        res.status(200).json({
          status: 200,
          message: "Username already exists",
        });
      } else if (_findUser.length >= 1) {
        res.status(200).json({
          status: 200,
          message: "Email already exists",
        });
      }
      if (findUser.length == 0 && _findUser.length == 0) {
        await webUserModel.create({
          email,
          username,
          password: encryptpassword,
          totalnumbers: 1,
          country,
          state
        });
        const token = await HelperMethod.createWebJwt({
          email,
          username,
          totalnumbers: 1,
          country,
          state
        });
        res.status(200).json({
          status: 201,
          message: "OK",
          token,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(200).json({
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      });
    }
  }
  async gameNumbers(req, res) {
    try {
      const { username, email, numbers } = req.body;
      await gameNumberModel.create({
        username,
        email,
        numbers,
        duplicateCount: 0,
        unique: 0,
        isActive: true,
        ipaddress: "128.129.0.1",
      });
      await webUserModel.findOneAndUpdate({email}, { totalnumbers: 0 });
      res.status(200).json({
        status: 200,
        message: "OK",
      });
    } catch (error) {
      console.log(error);
      res.status(200).json({
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      });
    }
  }
  async isGamePlayed(req, res) {
    try {
      const { email } = req.body;
      const game = await gameNumberModel.find({ email });
      if (game.length >= 1) {
        res.status(200).json({
          status: 200,
          isGamePlayed: true,
        });
      } else {
        res.status(200).json({
          status: 200,
          isGamePlayed: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(200).json({
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      });
    }
  }
  async winningNumberList(req, res) {
    try {
      const numbersList = await gameWinnerModel
        .find({})
        .sort({ createdAt: -1 });
      res.status(200).json({
        status: 200,
        data: numbersList,
      });
    } catch (error) {
      console.log(error);
      res.status(200).json({
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      });
    }
  }
  async payProduct(req, res) {
    try {
      const ammount = req.query.amt;
      const email = req.query.email;
      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: `https://adolphustable.com/web/success?amt=${ammount}`,
          cancel_url: "https://adolphustable.com/web/cancel",
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                  name: "Numbers",
                  sku: "001",
                  price: `${ammount}`,
                  currency: "USD",
                  quantity: 1,
                },
              ],
            },
            amount: {
              currency: "USD",
              total: `${ammount}`,
            },
            description: "Hat for the best team ever",
          },
        ],
      };

      paypal.payment.create(
        create_payment_json,
        async function (error, payment) {
          if (error) {
            throw error;
          } else {
            const data = await webUserModel.findOneAndUpdate(
              { email },
              { totalnumbers: ammount * 2 }
            );
            console.log("888888888888", data);
            for (let i = 0; i < payment.links.length; i++) {
              if (payment.links[i].rel === "approval_url") {
                res.redirect(payment.links[i].href);
              }
            }
          }
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  async successPage(req, res) {
    try {
      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;
      const amt = req.query.amt;

      const execute_payment_json = {
        payer_id: payerId,
        transactions: [
          {
            amount: {
              currency: "USD",
              total: amt,
            },
          },
        ],
      };
      paypal.payment.execute(
        paymentId,
        execute_payment_json,
        function (error, payment) {
          if (error) {
            console.log(error.response);
            throw error;
          } else {
            console.log(JSON.stringify(payment));
            res.redirect("/?pp=success");
          }
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async cancelPage(req, res) {
    try {
      res.redirect("/?pp=failed");
    } catch (error) {
      console.log(error.message);
    }
  }
  async getNumbers(req, res) {
    try {
      const { email } = req.body;
      const data = await webUserModel.find({ email }).select("totalnumbers");
      res.status(200).json({
        data,
        status: 500,
      });
    } catch (error) {
      res.status(200).json({
        message: "error",
        status: 500,
      });
    }
  }
  async contactUs(req, res) {
    try {
      const { name, email, number, hearabout, message } = req.body;
      await HelperMethod.senEmail({
        email: "solutionshhh@gmail.com",
        subject: "New contact us message",
        body: `
            <h3> Contact details </h3>
            <ul>
              <li>Name: ${name} </li>
              <li>Email: ${email} </li>
              <li>Number: ${number} </li>
              <li>Hear From: ${hearabout} </li>
              <li>Message: ${message} </li>
            </ul>
        `,
      });
      res.status(200).json({
        status: 200,
        message: "OK",
      });
    } catch (error) {
      res.status(200).json({
        message: 500,
        message: "Internal server error",
      });
    }
  }
  async sendOtp(req, res) {
    try {
      const { email } = req.body;
      const otp = Math.floor(100000 + Math.random() * 900000);
      const isEmail = await otpModel.find({ email });
      await HelperMethod.senEmail({
        email,
        body: `Your OTP verification is ${otp}`,
        subject: "OTP verification"
      });
      if (isEmail.length >= 1) {
        await otpModel.findOneAndUpdate(
          { email },
          {
            otp,
          }
        );
      } else {
        await otpModel.create({
          email,
          otp,
        });
      }
      res.status(200).json({
        status: 200,
        message: "OK",
        otp,
      });
    } catch (error) {
      res.status(200).json({
        message: 500,
        message: "Internal server error",
      });
    }
  }
  async verifyOtp(req, res) {
    try {
      const { otp, email } = req.body;
      const data = await otpModel.find({ email });
      if (data.length >= 1) {
        if (data[0].otp == Number(otp)) {
          await otpModel.findOneAndDelete({ email });
          res.status(200).json({
            status: 200,
            message: "OK",
          });
        } else {
          res.status(200).json({
            status: 403,
            message: "Incorrect Otp",
          });
        }
      } else {
        res.status(200).json({
          status: 403,
          message: "Incorrect Otp",
        });
      }
    } catch (error) {
      res.status(200).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
}

export default new WebController();

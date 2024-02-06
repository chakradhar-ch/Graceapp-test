import axios from "axios";
import { config } from "./config";

class ApiServices {
  async adminLogin(cred) {
    try {
      const { data } = await axios({
        url: `${config.apiEndPoint}/admin/login`,
        method: "POST",
        data: cred,
      });
      return data;
    } catch (error) {
      return false;
    }
  }
  async webUserList() {
    try {
      const { data } = await axios({
        url: `${config.apiEndPoint}/admin/userlist`,
        method: "GET",
        headers:{
            Authorization: localStorage.getItem("tk")
        }
      });
      return data;
    } catch (error) {
        return false;
    }
  }
  async winnerNumbersUpdate(_st) {
    try {
      const { data } = await axios({
        url: `${config.apiEndPoint}/admin/winnernumbers`,
        method: "POST",
        headers:{
            Authorization: localStorage.getItem("tk")
        },
        data: _st
      });
      return data;
    } catch (error) {
        return false;
    }
  }
  async getWinnerNumbers() {
    try {
      const { data } = await axios({
        url: `${config.apiEndPoint}/admin/winnernumbers`,
        method: "GET",
        headers:{
            Authorization: localStorage.getItem("tk")
        }
      });
      return data;
    } catch (error) {
        return false;
    }
  }
  async webUserSignUp(st) {
    try {
      const { data } = await axios({
        url: `${config.apiEndPoint}/web/create/user`,
        method: "POST",
        data: st
      });
      return data;
    } catch (error) {
        return false;
    }
  }
  async webUserSignIn(st) {
    try {
      const { data } = await axios({
        url: `${config.apiEndPoint}/web/login`,
        method: "POST",
        data: st
      });
      return data;
    } catch (error) {
        return false;
    }
  }
  async saveGameNumbers(st) {
    try {
      const { data } = await axios({
        url: `${config.apiEndPoint}/web/gamenumbers`,
        method: "POST",
        data: st
      });
      return data;
    } catch (error) {
        return false;
    }
  }
  async isGamePlayed(st) {
    try {
      const { data } = await axios({
        url: `${config.apiEndPoint}/web/isgameplayed`,
        method: "POST",
        data: st
      });
      return data;
    } catch (error) {
        return false;
    }
  }
  async winningNumberList(){
    try {
      const { data } = await axios({
        url: `${config.apiEndPoint}/web/winningnumberlist`,
        method: "GET"
      });
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async getUpdatedNumbers(email){
    try {
      const { data } = await axios({
        url: `${config.apiEndPoint}/web/getnumbers`,
        method: "POST",
        data:{
          email
        }
      });
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async contactEmailSend(dataBody){
    try {
      const { data } = await axios({
        url: `${config.apiEndPoint}/web/contacmessage`,
        method: "POST",
        data: dataBody
      });
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async sendOtp(dataBody){
    try {
      const { data } = await axios({
        url: `${config.apiEndPoint}/web/sendotp`,
        method: "POST",
        data: dataBody
      });
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async verifyOtp(dataBody){
    try {
      const { data } = await axios({
        url: `${config.apiEndPoint}/web/verifyotp`,
        method: "POST",
        data: dataBody
      });
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new ApiServices();

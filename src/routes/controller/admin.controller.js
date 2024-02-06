import HelperMethod from "../../utils/helper";
import {
  gameNumberModel,
  webUserModel,
  winnerNumberModel,
  gameWinnerModel,
} from "../../model";
class AdminController {
  async adminLogin(req, res) {
    try {
      const { email, password } = req.body;
      if (email == "adgracetabadmin" && password == "@Dgr!c3t@b@m!n") {
        const token = await HelperMethod.createAdminJwt();
        res.status(200).json({
          status: 200,
          message: "OK",
          token: token, 
        });
      } else {
        res.status(200).json({
          status: 403,
          message: "INVALID CRED",
        });
      }
    } catch (error) {
      res.status(200).json({
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      });
    }
  }
  async webUserList(req, res) {
    try {
      const userList = await webUserModel
        .find({})
        .select("email username createdAt")
        .sort({ createdAt: -1 });
      res.status(200).json({
        status: 200,
        data: userList,
      });
    } catch (error) {
      res.status(200).json({
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      });
    }
  }
  async updateWinnerNumber(req, res) {
    try {
      const { day, hour } = req.body;
      await winnerNumberModel.findOneAndUpdate(
        { _id: "6534b21968e50be9f05920b3" },
        { day, hour }
      );
      res.status(200).json({
        status: 200,
        message: "OK",
      });
    } catch (error) {
      res.status(200).json({
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      });
    }
  }
  async getWinnerNumber(req, res) {
    try {
      const ww = await winnerNumberModel.findOne({
        _id: "6534b21968e50be9f05920b3",
      });
      //console.log(ww);
      res.status(200).json({
        status: 200,
        message: "OK",
        data: ww,
      });
    } catch (error) {
      res.status(200).json({
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      });
    }
  }
  async makeDayWinner(req, res) {
    try {
      const bet = await gameNumberModel.find({});
      const delEmail = bet.map(item => item.email);
       Promise.all([
        await webUserModel.updateMany({email:delEmail}, {totalnumbers: 1}),
        await gameNumberModel.deleteMany({email:delEmail})
      ]);
      let totalNumbers = [];
      bet.forEach((item) => {
        totalNumbers = [...totalNumbers, ...item.numbers];
      });
      const finalResult = bet.map((item) => {
        let count = 0;
        let unique = 0;
        let duplicate = [];
        item.numbers.map((_item) => {
          const uni = totalNumbers.filter((uniq) => uniq == _item);
          if (uni.length < 2) {
            unique++;
            duplicate = [...duplicate, ...uni];
          }
        });
        item.duplicateCount = duplicate.sort()[0];
        item.unique = unique;
        return item;
      });
      const output = finalResult
        .sort((a, b) => a.duplicateCount - b.duplicateCount)
        .filter((item) => item.duplicateCount == 0 || item.duplicateCount);
      // console.log(output.slice(0, 3));
      const winnerNumber = await winnerNumberModel.find({}).select("day hour");
      // const delEmail = output.map(item => item.email); 
      const _totalWinner = output.slice(0, winnerNumber[0].day);
      const winNum = _totalWinner.map((item) => item.duplicateCount);
      _totalWinner.forEach(async(item) =>{
        await HelperMethod.senEmail(
          {
            email:item.email,
            subject:"Has ganado un premio gratuito de Adolphu / You have won a free prize from Adolphus Table",
            body: `<b>
                        Felicitaciones, hoy eres el ganador, has elegido el número no duplicado más bajo en adolphustable.com y has ganado un premio gratis. Los ganadores dentro de los EE. UU. continentales pueden recibir premios, los ganadores fuera de los EE. UU. recibirán un premio en efectivo.
                        Si vive en los Estados Unidos continentales, responda con su dirección postal para que podamos enviarle su premio sin cargo dentro de los 2 días hábiles.
                        Si vive fuera de los Estados Unidos continentales, responda en qué país y en qué ciudad vive, así como su número de teléfono, y hoy un representante se comunicará con usted y hará los arreglos para que reciba su premio.
                                            
                        Congratulations, today you're the winer, you have chosen the lowest unduplicated number on adolphustable.com and won a free prize!. Winners inside the continental US can be shipped prizes, winners outside will be sent a cash prize.
                        If you live in the continental United States, please reply with your mailing address so we can ship you your prize free of charge within 2 business days.
                        If you live outside the continental United States, please reply with what country and what city you live in, as well as your phone number, andtoday a representative will contact you and make arrangements for you to receive your prize.
            </b>`
          });
      });
      await gameWinnerModel.create({ numbers: winNum })
     
      res.status(200).json({
        status: 200,
        _totalWinner,
        winNum,
        delEmail
      });
    } catch (error) {
      console.log(error);
      res.status(200).json({
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      });
    }
  }
  async winnerList(req, res){
    try {
      const data = await gameWinnerModel.find({});
      res.status(200).json({
        status: 200,
        data
      });
    } catch (error) {
      res.status(200).json({
        status: 500,
        message: "INTERNAL_SERVER_ERROR",
      });
    }
  }
}

export default new AdminController();

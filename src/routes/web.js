import { Router } from "express";
import WebController from "./controller/web.controller";
const router = Router();

router.post("/login", WebController.webLogin);
router.post("/create/user", WebController.webCreateUser);
router.post("/gamenumbers", WebController.gameNumbers);
router.post("/isgameplayed", WebController.isGamePlayed);
router.get("/winningnumberlist", WebController.winningNumberList);
router.get("/pay", WebController.payProduct);
router.get("/success", WebController.successPage);
router.get("/cancel", WebController.cancelPage);
router.post("/getnumbers", WebController.getNumbers);
router.post("/contacmessage", WebController.contactUs);
router.post("/sendotp", WebController.sendOtp);
router.post("/verifyotp", WebController.verifyOtp);





export default router;
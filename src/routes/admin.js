import { Router } from "express";
import adminController from "./controller/admin.controller";
const router = Router();
import { checkSchema } from "express-validator";
import { adminJwtVerify } from "./controller/middelware";

router.post("/login", adminController.adminLogin);

router.get("/userlist", adminJwtVerify, adminController.webUserList);
router.post(
  "/winnernumbers",
  adminJwtVerify,
  adminController.updateWinnerNumber
);
router.get("/winnernumbers", adminJwtVerify, adminController.getWinnerNumber);
router.get("/daywinner", adminController.makeDayWinner);
router.get("/winningnumbers", adminController.winnerList);



export default router;
 
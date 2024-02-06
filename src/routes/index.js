import { Router } from "express";
import adminRoutes from "./admin";
import webRoutes from "./web";

const router = Router();

const routes = [
  {
    path: "/admin",
    element: adminRoutes,
  },
  { path: "/web", element: webRoutes },
];

routes.forEach((item) => {
  router.use(`${item.path}`, item.element);
}); 

export default router;

import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path";
const app = express();
import { connectDb } from "./utils/db";
import allRoutes from "./routes";
import fs from "fs";
import http from "http";
import https from "https";


connectDb();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/.well-known/pki-validation/D503FFC046241FFA7E1DCB78E0E37E1D.txt", (req, res)=>{
  const filePath = path.join(__dirname, '../crts/D503FFC046241FFA7E1DCB78E0E37E1D.txt');
  res.sendFile(filePath);
})

app.use(allRoutes);
// app.get("/", (req, res) => {
//     res.send("ok");
// });

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
});
// const port = 8080;
// app.listen(port, () => {
//   console.log(`server is running on http://localhost:${port}`);
// });

const httpsServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, '../crts/private.key')),
  cert: fs.readFileSync(path.join(__dirname, '../crts/certificate.crt')),
}, app);
const httpServer = http.createServer(app);
httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});
httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
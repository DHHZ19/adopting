import express from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import cors from "cors";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/frontend/index.html").toString();

const parts = html.split("not rendered");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/frontend", express.static("dist/frontend"));
app.get("/pets", async (req, res) => {
  const petResults = await fetch("https://api.petfinder.com/v2/animals", {
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJZTEZ3bnZ5WEVpZkF1R0RneDZFWlJuU3g2Um9JeG5iV0xaMGVoWjlLVzR3THdIV0pBOSIsImp0aSI6ImVmMjFkMzE1ZDA2MjdiMjE4ZmRiMzVmYjc1MmRiM2Y3NDJjODEzZTU4MDZhNGExYzMyYzBiNTYzYjRhOTczZWEyOGEwODc5MDhjNTE5MjZiIiwiaWF0IjoxNjYwNjg0NjE1LCJuYmYiOjE2NjA2ODQ2MTUsImV4cCI6MTY2MDY4ODIxNSwic3ViIjoiIiwic2NvcGVzIjpbXX0.Hpr6vVkU0J1tmQrN-SquHDYV4w1oFQX_JmvAz4dIlePbxyHBk9aRJZV7DQ-ZuuAQGKG4BuGw382iOWTqjU7KB3W-XoMJZ4kSk8IhWg0gsJvWXJ0Uya9_7UstuURdya1ujZboXfUzci9dlrOZtHYLiXLEBYH3M1JUjqXfZiRN6G0sF4WRO-rR3r2pMSBcU7F60H6nRFwP7V1JytCOUi_xv1g99RocQfc-3UmHVpqAjRZe0f1tR__I_QQVihTnLxLIAdqz0jy2zJ6uIPFT4IokQiJxNNz5Eb-GThQkNgwdxwI2JKVIQ-DAklQ5cE0iVPV418Pjcbecussp5SJr1KXePw",
    },
  });
  const json = await petResults.json();
  res.json(json);
});
app.get("/dogs", async (req, res) => {
  const petResults = await fetch("https://api.petfinder.com/v2/types/Dog", {
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJZTEZ3bnZ5WEVpZkF1R0RneDZFWlJuU3g2Um9JeG5iV0xaMGVoWjlLVzR3THdIV0pBOSIsImp0aSI6IjdkMGI0ZGFkMzEwYjFiMDRkYTYwMDhjY2ZjZTUwMTJjZjVmODAxNmJkNDVmYTdjMzk2NjQ4MzVhM2Y3NjU4MDc3MjljZDgyYTQ2YTg3OTk1IiwiaWF0IjoxNjYwNjEwMDI0LCJuYmYiOjE2NjA2MTAwMjQsImV4cCI6MTY2MDYxMzYyNCwic3ViIjoiIiwic2NvcGVzIjpbXX0.XGkIq2IRi3ZSKw9aogilPsx8BbrLCEm-HtQk4_3IpA53qjmp0u82Xvc41R7f8_bBhWGg82fSua2jFqa7B8VZfrCXs8ueIzNP6F3B_Z0HfRvEWB0JFTLxGH_1PmHCQnKm3gACCiQtG9gyueJRSEAqyBfkreZfj9lOv-Js8FUHfymDSob0-YcBc6SHvFR843kCB-9hnhivpsgZtmbtp3yXriTNNjr7Vsnz4RcwP_XO4mQ2Lz8J-rg7ccKvr9r2mXrQ5YPLtpr4Pwxs9OKgNzr6kWlMZ8q3i8uog9A0mpqP_9GphJIhXcWuHeVh2T6ZyzqRdALwF3SzZAhT5pyyd138Vg",
    },
  });
  const json = await petResults.json();
});
app.use((req, res) => {
  const reactMarkup = (
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  res.send(`${parts[0]}${renderToString(reactMarkup)}${parts[1]}`);
  res.end();
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);

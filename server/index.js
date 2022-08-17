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
app.put("/pets", async (req, res) => {
  console.log(req.body);
  const petResults = await fetch(
    `https://api.petfinder.com/v2/animals?page=${req.body.pageCount}`,
    {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJZTEZ3bnZ5WEVpZkF1R0RneDZFWlJuU3g2Um9JeG5iV0xaMGVoWjlLVzR3THdIV0pBOSIsImp0aSI6ImI4Y2I0ZTdkNmFkMGIyY2I0Zjg1YTJkMjZkZjNmYWU4Y2M4MzFjNTg4MTZiNzAwNzk4MGMwMGM4NzNkMGY4OTZmZWE0NDFlZGNmZDc2ODJiIiwiaWF0IjoxNjYwNzQzNjg5LCJuYmYiOjE2NjA3NDM2ODksImV4cCI6MTY2MDc0NzI4OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.qbc8PQL4DlO5_w4Q3vmhxqODEGYkLYtNJXZGGTBwvd0ErIK6qafR-fZtlhKFo3dmRKaatJiR8jOOJMKjjCIyTlXhYd5lVuxPF_ctKJCbXaNdJpiKyHyNXU-G-Xqnlni4NvOxIvwinLkZ5jjGWEvb6bjs3v7a4amhRpjJSpWXGoXcJNGvrb5b5M2t7jsZlRIzQxtxdd6q-xzkmzG6cqpSo5YQfZlhUkt8z8EnnO0ijMRtZmvrW2BD_kEuxm2vd83zNJ3rM90g4BjZytcicXn0YlbVDdJcZME36CqgxwrgTxEdVWm5-Wm__rMPM_zTaPipQNN1usrbBpKjFYA5RWa7HQ`,
      },
    }
  );
  const json = await petResults.json();
  res.json(json);
});
app.get("/dogs", async (req, res) => {
  const petResults = await fetch("https://api.petfinder.com/v2/types/Dog", {
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJZTEZ3bnZ5WEVpZkF1R0RneDZFWlJuU3g2Um9JeG5iV0xaMGVoWjlLVzR3THdIV0pBOSIsImp0aSI6ImI4Y2I0ZTdkNmFkMGIyY2I0Zjg1YTJkMjZkZjNmYWU4Y2M4MzFjNTg4MTZiNzAwNzk4MGMwMGM4NzNkMGY4OTZmZWE0NDFlZGNmZDc2ODJiIiwiaWF0IjoxNjYwNzQzNjg5LCJuYmYiOjE2NjA3NDM2ODksImV4cCI6MTY2MDc0NzI4OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.qbc8PQL4DlO5_w4Q3vmhxqODEGYkLYtNJXZGGTBwvd0ErIK6qafR-fZtlhKFo3dmRKaatJiR8jOOJMKjjCIyTlXhYd5lVuxPF_ctKJCbXaNdJpiKyHyNXU-G-Xqnlni4NvOxIvwinLkZ5jjGWEvb6bjs3v7a4amhRpjJSpWXGoXcJNGvrb5b5M2t7jsZlRIzQxtxdd6q-xzkmzG6cqpSo5YQfZlhUkt8z8EnnO0ijMRtZmvrW2BD_kEuxm2vd83zNJ3rM90g4BjZytcicXn0YlbVDdJcZME36CqgxwrgTxEdVWm5-Wm__rMPM_zTaPipQNN1usrbBpKjFYA5RWa7HQ",
    },
  });
  const json = await petResults.json();
  res.json(json);
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

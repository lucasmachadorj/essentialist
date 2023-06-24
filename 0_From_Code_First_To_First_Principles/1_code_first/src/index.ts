import express from "express";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  return response.json({ message: "ok" });
});

app.listen(8001, () => console.log("Server is running"));

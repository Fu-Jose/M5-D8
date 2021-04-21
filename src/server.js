import express from "express";
import listEndpoints from "express-list-endpoints";
import peopleRoutes from "./routes/people.js";
import cors from "cors";
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/attendees", peopleRoutes);
console.log(listEndpoints(app));

app.listen(PORT, () => {
  console.log("Server online on port 3001");
});

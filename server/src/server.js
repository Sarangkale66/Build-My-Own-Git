import dotenv from 'dotenv'
dotenv.config();
import { app } from "./app/index.js";
import { connectDB } from "./app/config/mongodb.js";
connectDB();

app.use((err, _, res) => {
  console.error(err);
  res.status(500).json({ message: "Oops! Something went wrong." });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server run on http://localhost:" + port);
});
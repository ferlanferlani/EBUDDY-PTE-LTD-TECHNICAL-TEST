import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

// App Route Imports
import appRoutes from "../routes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());

dotenv.config();

// App Routes
app.use(appRoutes);

// run server
const PORT = process.env.APP_PORT || 5004;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

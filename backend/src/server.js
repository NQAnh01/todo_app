import express from 'express'
import taskRoutes from './routes/taskRouters.js'
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
  }));
}

app.use("/api/tasks", taskRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // fallback cho Vue/React router
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection failed:', error);
  process.exit(1);
});



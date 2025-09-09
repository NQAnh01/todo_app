import express from 'express'
import taskRoutes from './routes/taskRouters.js'
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
}));

app.use("/api/tasks", taskRoutes);

connectDB().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection failed:', error);
  process.exit(1);
});



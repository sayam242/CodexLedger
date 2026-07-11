import express from "express"
import cors from "cors";
import dotenv from "dotenv";


/**
 * Routes imports....
 */
import syncRoutes from "./extension/routes/sync.routes";
import authRoutes from "./auth/routes/auth.routes";
import dashboardRoutes from "./dashboard/routes/dashboard.routes";
import detailedProblemRoutes from "./detailedProblem/routes/detailedProblem.routes";
import notesRoutes from "./notes/routes/notes.routes";
import problemRoutes from "./problems/routes/problem.route";
import aiRoutes from "./ai/complexity/complexity.routes";
import explanationRoutes from "./ai/explanation/explanation.routes";
import { startExplanationWorker } from "./ai/explanation/worker";
import cookieParser from "cookie-parser";

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app=express();



// Health check endpoint
app.get("/health",(req,res)=>{
    res.json({status:"ok"});
});


// Use cookie parser middleware
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      process.env.EXTENSION_SOURCE_URL || "https://leetcode.com",
      `chrome-extension://${process.env.EXTENSION_ID}`
    ],
    credentials: true
  })
);

// use Routes
app.use("/api/sync", syncRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", detailedProblemRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/problems", notesRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/ai", explanationRoutes);

startExplanationWorker();

// Start the server
app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
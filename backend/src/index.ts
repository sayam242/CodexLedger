import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import http from "http";


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
import tutorRoutes from "./ai/tutor/tutor.routes";
import { startExplanationWorker } from "./ai/explanation/worker";
import { initTutorSocket } from "./ai/tutor/tutor.socket";
import cookieParser from "cookie-parser";
import { initSocketManager } from "./lib/socketManager";

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
app.use("/api/ai", tutorRoutes);

// Create HTTP server and initialize Socket.IO
const httpServer = http.createServer(app);
initSocketManager(httpServer);

initTutorSocket();

startExplanationWorker();

// Start the server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
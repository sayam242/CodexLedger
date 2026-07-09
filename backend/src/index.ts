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
      "http://localhost:5173",
      "https://leetcode.com",
      "chrome-extension://cimlcfmopngdhodadhebdmdjjmmbgddf"
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
// Start the server
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
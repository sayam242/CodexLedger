import express from "express"
import cors from "cors";
import dotenv from "dotenv";


/**
 * Routes imports....
 */
import syncRoutes from "./routes/sync.routes";


// Initialize environment variables
dotenv.config();

// Initialize Express app
const app=express();

// Health check endpoint
app.get("/health",(req,res)=>{
    res.json({status:"ok"});
});


app.use(express.json());
app.use(cors());

// use Routes
app.use("/api/sync", syncRoutes);

// Start the server
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
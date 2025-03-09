const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const cors = require("cors")
const fileRouter = require("./routes/fileRoutes");
const tokenRouter = require("./routes/authentication/validateToken")
const salesRoutes = require("./routes/modules/SalesRoute")
const purchaseRoute = require("./routes/modules/PurchaseRoute")
const Suppliers = require("./routes/supplierRoutes")
const Inventory = require("./routes/modules/inventoryRoutes")
const Products = require("./routes/productRoutes")
const fileUpload = require("./routes/fileDownloadUpload")
const customers = require("./routes/customeRoutes")
const Employee = require("./routes/emp_route")
const Attendance = require("./routes/attendanceRoutes")
const Training = require("./routes/trainingRoutes")
const jobRoutes = require("./routes/jobRoutes");
const Tasks = require("./routes/taskRoute")

dotenv.config();

// Initialize Express app
const app = express();
app.use(express.static("uploads")); // Serve uploaded files

// app.use(cors()); // Enable CORS
app.use(cors({
    origin: '*', // Allow requests only from this origin
    methods: ['GET', 'POST',"PUT","DELETE"], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type','Authorization'], // Allow specific headers
  }));  

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
require('./config/db');

// Routes
app.use('/api/users', userRoutes);
app.use("/api/files",fileRouter)
app.use("/api/authenticate", tokenRouter);
app.use("/api", purchaseRoute);
app.use("/api", Inventory);
app.use("/api", Suppliers);
app.use("/api", Products);
app.use("/api", customers);
app.use("/api/sales", salesRoutes);
app.use("/api/files-mgmt",fileUpload)
app.use("/api/emp",Employee)
app.use("/api/attendance",Attendance)
app.use("/api/training",Training)
app.use("/api/jobs", jobRoutes);
app.use("/api/tsk", Tasks);

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
require("./socket")(server);
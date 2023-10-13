const express = require("express");
const router = express.Router();

const CompanyRouter = require("./company.router");
router.use("/api/company", CompanyRouter);

const UserRouter = require("./user.router");
router.use("/api/user", UserRouter);

module.exports = router;

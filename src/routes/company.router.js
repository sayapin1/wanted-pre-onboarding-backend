const express = require("express");
const CompanyController = require("../controllers/company.controller");

const router = express.Router();
const companyController = new CompanyController();

//채용공고 등록
router.post("/recruitment", companyController.postRecruitmentNotice);

//채용공고 수정
router.put(
  "/recruitment/:recruitmentId",
  companyController.updateRecruitmentNotice
);

//채용공고 삭제
router.delete(
  "/recruitment/:recruitmentId",
  companyController.deleteRecruitmentNotice
);

module.exports = router;

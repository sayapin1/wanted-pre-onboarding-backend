const express = require("express");
const UserController = require("../controllers/user.controller");

const router = express.Router();
const userController = new UserController();

//채용공고 목록 가져오기
router.get("/recruitment", userController.getRecruitmentNotices);
//채용공고 검색
router.get("/recruitment/search", userController.searchRecruitmentNotice);
//채용공고 상세페이지
router.get(
  "/recruitment/:recruitmentId",
  userController.getOneRecruitmentNotice
);
//채용공고에 지원
router.post("/recruitment/:recruitmentId", userController.applyRecruitment);

module.exports = router;

const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  //채용공고 목록 가져오기
  getRecruitmentNotices = async (req, res, next) => {
    try {
      const response = await this.userService.getRecruitmentNotices();

      if (response.data) {
        return res.status(response.code).json({ data: response.data });
      } else {
        return res.status(response.code).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  };

  //채용공고 검색
  searchRecruitmentNotice = async (req, res, next) => {
    try {
      const searchQuery = req.query.keyword;
      const response = await this.userService.searchRecruitmentNotice(
        searchQuery
      );
      if (response.data) {
        return res.status(response.code).json({ data: response.data });
      } else {
        return res.status(response.code).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  };

  //채용공고 상세페이지
  getOneRecruitmentNotice = async (req, res, next) => {
    try {
      const { recruitmentId } = req.params;
      const response = await this.userService.getOneRecruitmentNotice(
        recruitmentId
      );

      if (response.data) {
        return res.status(response.code).json({ data: response.data });
      } else {
        return res.status(response.code).json({ message: response.message });
      }
    } catch (error) {
      next(error);
    }
  };

  //채용공고에 지원
  applyRecruitment = async (req, res, next) => {
    try {
      const { recruitmentId } = req.params;
      const userId = "1";

      const response = await this.userService.applyRecruitment(
        recruitmentId,
        userId
      );
      res.status(response.code).json({ message: response.message });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;

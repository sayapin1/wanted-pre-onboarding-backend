const UserRepository = require("../repositories/user.repository");
const CommonRepository = require("../repositories/common.repository");
const { Recruitments } = require("../../models");
const { Application } = require("../../models");

class UserService {
  userRepository = new UserRepository(Recruitments, Application);
  commonRepository = new CommonRepository(Recruitments);

  getRecruitmentNotices = async () => {
    try {
      const data = await this.userRepository.getRecruitmentNotices();
      return { code: 200, data };
    } catch (error) {
      console.error(error);
      return { code: 500, message: "채용공고 불러오기에 실패하였습니다." };
    }
  };

  searchRecruitmentNotice = async (searchQuery) => {
    try {
      const data = await this.userRepository.searchRecruitmentNotice(
        searchQuery
      );
      if (!data) {
        return { code: 404, message: "찾는 채용공고가 없습니다." };
      }

      return { code: 200, data };
    } catch (error) {
      console.error(error);
      return { code: 500, message: "채용공고 검색에 실패하였습니다." };
    }
  };

  getOneRecruitmentNotice = async (recruitmentId) => {
    try {
      const recruitmentDetail =
        await this.userRepository.getOneRecruitmentNotice(recruitmentId);
      if (!recruitmentDetail) {
        return { code: 404, message: "채용공고가 존재하지 않습니다." };
      }

      const recruitmentNoticesByCompany =
        await this.userRepository.getAllRecruitmentNoticesByCompany(
          recruitmentDetail.companyName
        );

      return {
        code: 200,
        data: { recruitmentDetail, recruitmentNoticesByCompany },
      };
    } catch (error) {
      console.error(error);
      return {
        code: 500,
        message: "채용공고 상세 페이지 불러오기에 실패하였습니다.",
      };
    }
  };

  applyRecruitment = async (recruitmentId, userId) => {
    try {
      const isExisting = await this.commonRepository.findIfExisting(
        recruitmentId
      );
      if (!isExisting) {
        return { code: 404, message: "채용공고가 존재하지 않습니다." };
      }

      const existingApplication = await this.userRepository.checkIfApplied(
        recruitmentId,
        userId
      );
      if (existingApplication) {
        return { code: 409, message: "이미 지원한 공고입니다." };
      }

      await this.userRepository.applyRecruitment(recruitmentId, userId);

      return { code: 200, message: "지원 완료되었습니다." };
    } catch (error) {
      console.error(error);
      return { code: 500, message: "지원에 실패하였습니다." };
    }
  };
}

module.exports = UserService;

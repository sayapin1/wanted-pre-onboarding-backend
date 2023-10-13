const CompanyRepository = require("../repositories/company.repository");
const CommonRepository = require("../repositories/common.repository");

const { Recruitments } = require("../../models");

class CompanyService {
  companyRepository = new CompanyRepository(Recruitments);
  commonRepository = new CommonRepository(Recruitments);

  postRecruitmentNotice = async (
    companyName,
    country,
    area,
    position,
    compensation,
    skill,
    detail
  ) => {
    try {
      await this.companyRepository.postRecruitmentNotice(
        companyName,
        country,
        area,
        position,
        compensation,
        skill,
        detail
      );
      return { code: 200, message: "채용공고 등록 완료" };
    } catch (error) {
      console.error(error);
      return { code: 500, message: "채용공고 등록 실패" };
    }
  };

  updateRecruitmentNotice = async (recruitmentId, updateFields) => {
    try {
      const isExisting = await this.commonRepository.findIfExisting(
        recruitmentId
      );
      if (!isExisting) {
        return { code: 404, message: "채용공고가 존재하지 않습니다." };
      }

      await this.companyRepository.updateRecruitmentNotice(
        recruitmentId,
        updateFields
      );
      return { code: 200, message: "채용공고 수정 완료." };
    } catch (error) {
      console.error(error);
      return { code: 500, message: "채용공고 수정 실패" };
    }
  };

  deleteRecruitmentNotice = async (recruitmentId) => {
    try {
      const isExisting = await this.commonRepository.findIfExisting(
        recruitmentId
      );
      if (!isExisting) {
        return { code: 404, message: "채용공고가 존재하지 않습니다." };
      }

      await this.companyRepository.deleteRecruitmentNotice(recruitmentId);
      return { code: 200, message: "채용공고 삭제 완료." };
    } catch (error) {
      console.error(error);
      return { code: 500, message: "채용공고 삭제 실패." };
    }
  };
}

module.exports = CompanyService;

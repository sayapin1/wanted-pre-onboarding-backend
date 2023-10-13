const CompanyService = require("../services/company.service");

class CompanyController {
  companyService = new CompanyService();

  //채용공고 등록
  postRecruitmentNotice = async (req, res, next) => {
    try {
      const {
        companyName,
        country,
        area,
        position,
        compensation,
        skill,
        detail,
      } = req.body;
      const response = await this.companyService.postRecruitmentNotice(
        companyName,
        country,
        area,
        position,
        compensation,
        skill,
        detail
      );

      res.status(response.code).json({ message: response.message });
    } catch (error) {
      next(error);
    }
  };

  //채용공고 수정
  updateRecruitmentNotice = async (req, res, next) => {
    try {
      const { recruitmentId } = req.params;
      const {
        companyName,
        country,
        area,
        position,
        compensation,
        skill,
        detail,
      } = req.body;

      const updateFields = {};
      if (companyName) updateFields.companyName = companyName;
      if (country) updateFields.country = country;
      if (area) updateFields.area = area;
      if (position) updateFields.position = position;
      if (compensation) updateFields.compensation = compensation;
      if (skill) updateFields.skill = skill;
      if (detail) updateFields.detail = detail;

      const response = await this.companyService.updateRecruitmentNotice(
        recruitmentId,
        updateFields
      );

      res.status(response.code).json({ message: response.message });
    } catch (error) {
      next(error);
    }
  };

  //채용공고 삭제
  deleteRecruitmentNotice = async (req, res, next) => {
    const { recruitmentId } = req.params;
    const response = await this.companyService.deleteRecruitmentNotice(
      recruitmentId
    );
    res.status(response.code).json({ message: response.message });
  };
}

module.exports = CompanyController;

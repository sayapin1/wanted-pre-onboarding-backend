class CompanyRepository {
  constructor(recruitmentModel) {
    this.recruitmentModel = recruitmentModel;
  }

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
      await this.recruitmentModel.create({
        companyName,
        country,
        area,
        position,
        compensation,
        skill,
        detail,
      });
    } catch (error) {
      throw error;
    }
  };

  updateRecruitmentNotice = async (recruitmentId, updateFields) => {
    try {
      const recruitment = await this.recruitmentModel.findByPk(recruitmentId);

      Object.assign(recruitment, updateFields);
      await recruitment.save();
    } catch (error) {
      throw error;
    }
  };

  deleteRecruitmentNotice = async (recruitmentId) => {
    try {
      await this.recruitmentModel.destroy({
        where: { id: recruitmentId },
      });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CompanyRepository;

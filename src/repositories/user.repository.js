const { Op } = require("sequelize");

class UserRepository {
  constructor(recruitmentModel, applicationModel) {
    this.recruitmentModel = recruitmentModel;
    this.appicationModel = applicationModel;
  }

  getRecruitmentNotices = async () => {
    try {
      return await this.recruitmentModel.findAll({
        attributes: { exclude: ["detail", "createdAt", "updatedAt"] },
      });
    } catch (error) {
      throw error;
    }
  };

  searchRecruitmentNotice = async (searchQuery) => {
    try {
      const whereClause = {
        [Op.or]: [
          {
            companyName: {
              [Op.like]: `%${searchQuery}%`,
            },
          },
          {
            country: {
              [Op.like]: `%${searchQuery}%`,
            },
          },
          {
            area: {
              [Op.like]: `%${searchQuery}%`,
            },
          },
          {
            position: {
              [Op.like]: `%${searchQuery}%`,
            },
          },
          {
            compensation: {
              [Op.like]: `%${searchQuery}%`,
            },
          },
          {
            skill: {
              [Op.like]: `%${searchQuery}%`,
            },
          },
        ],
      };

      return await this.recruitmentModel.findAll({
        where: whereClause,
        attributes: { exclude: ["detail", "createdAt", "updatedAt"] },
      });
    } catch (error) {
      throw error;
    }
  };

  getOneRecruitmentNotice = async (recruitmentId) => {
    try {
      return await this.recruitmentModel.findOne({
        where: { id: recruitmentId },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
    } catch (error) {
      throw error;
    }
  };

  getAllRecruitmentNoticesByCompany = async (companyName) => {
    try {
      const recruitmentNotices = await this.recruitmentModel.findAll({
        attributes: ["id"],
        where: {
          companyName: companyName,
        },
      });
      return recruitmentNotices.map((notice) => notice.id);
    } catch (error) {
      throw error;
    }
  };

  applyRecruitment = async (recruitmentId, userId) => {
    try {
      await this.appicationModel.create({
        userId,
        recruitmentId,
      });
    } catch (error) {
      throw error;
    }
  };

  checkIfApplied = async (recruitmentId, userId) => {
    try {
      const existingApplication = await this.appicationModel.findOne({
        where: {
          userId: userId,
          recruitmentId: recruitmentId,
        },
      });

      return existingApplication !== null;
    } catch (error) {
      return false;
    }
  };
}

module.exports = UserRepository;

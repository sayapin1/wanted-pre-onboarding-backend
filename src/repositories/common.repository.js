class CommonRepository {
  constructor(recruitmentModel) {
    this.recruitmentModel = recruitmentModel;
  }

  findIfExisting = async (recruitmentId) => {
    try {
      const notice = await this.recruitmentModel.findOne({
        where: { id: recruitmentId },
      });

      return !!notice;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CommonRepository;

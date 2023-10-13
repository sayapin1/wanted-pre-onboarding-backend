const CompanyRepository = require("../../src/repositories/company.repository");

const mockRecruitmentModel = {
  create: jest.fn(),
  findByPk: jest.fn(),
  destroy: jest.fn(),
  update: jest.fn(),
};

describe("CompanyRepository", () => {
  let companyRepository;

  beforeEach(() => {
    companyRepository = new CompanyRepository(mockRecruitmentModel);
  });

  describe("postRecruitmentNotice", () => {
    test("should create a recruitment notice", async () => {
      const recruitmentData = {
        companyName: "Test Company",
        country: "Test Country",
        area: "Test Area",
        position: "Test Position",
        compensation: "Test Compensation",
        skill: "Test Skill",
        detail: "Test Detail",
      };

      mockRecruitmentModel.create.mockResolvedValue(recruitmentData);

      await companyRepository.postRecruitmentNotice(
        recruitmentData.companyName,
        recruitmentData.country,
        recruitmentData.area,
        recruitmentData.position,
        recruitmentData.compensation,
        recruitmentData.skill,
        recruitmentData.detail
      );

      expect(mockRecruitmentModel.create).toHaveBeenCalledWith(recruitmentData);
    });

    test("should throw an error if an error occurs during the process", async () => {
      const mockError = new Error("Database connection error");
      mockRecruitmentModel.create.mockRejectedValue(mockError);

      await expect(companyRepository.postRecruitmentNotice()).rejects.toThrow(
        mockError
      );
    });
  });

  describe("updateRecruitmentNotice", () => {
    test("should update a recruitment notice", async () => {
      const recruitmentId = 1;
      const updateFields = {
        companyName: "Updated Company",
        country: "Updated Country",
      };

      const mockRecruitment = {
        id: 1,
        companyName: "Test Company",
        country: "Test Country",
      };

      await companyRepository.updateRecruitmentNotice(
        recruitmentId,
        updateFields
      );

      expect(mockRecruitmentModel.update).toHaveBeenCalledWith(updateFields, {
        where: { id: recruitmentId },
      });
    });

    test("should throw an error if an error occurs during the process", async () => {
      const mockError = new Error("Database connection error");
      mockRecruitmentModel.update.mockRejectedValue(mockError);

      await expect(companyRepository.updateRecruitmentNotice()).rejects.toThrow(
        mockError
      );
    });
  });

  describe("deleteRecruitmentNotice", () => {
    test("should delete a recruitment notice", async () => {
      const recruitmentId = 1;
      mockRecruitmentModel.destroy.mockResolvedValue(1);

      await companyRepository.deleteRecruitmentNotice(recruitmentId);

      expect(mockRecruitmentModel.destroy).toHaveBeenCalledWith({
        where: { id: recruitmentId },
      });
    });

    test("should throw an error if an error occurs during the process", async () => {
      const mockError = new Error("Database connection error");
      mockRecruitmentModel.destroy.mockRejectedValue(mockError);

      await expect(companyRepository.deleteRecruitmentNotice()).rejects.toThrow(
        mockError
      );
    });
  });
});

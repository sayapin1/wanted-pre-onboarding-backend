const CommonRepository = require("../src/repositories/common.repository");

// Mock recruitment model
const recruitmentModel = {
  findOne: jest.fn(),
};

describe("CommonRepository", () => {
  let commonRepository;

  beforeEach(() => {
    commonRepository = new CommonRepository(recruitmentModel);
  });

  describe("findIfExisting", () => {
    test("should return true if recruitment notice exists", async () => {
      const mockRecruitmentId = 1;
      const mockNotice = { id: mockRecruitmentId, someField: "someValue" };
      recruitmentModel.findOne.mockResolvedValue(mockNotice);

      const result = await commonRepository.findIfExisting(mockRecruitmentId);

      expect(recruitmentModel.findOne).toHaveBeenCalledWith({
        where: { id: mockRecruitmentId },
      });
      expect(result).toBe(true);
    });

    test("should return false if recruitment notice does not exist", async () => {
      const mockRecruitmentId = 2;
      recruitmentModel.findOne.mockResolvedValue(null);

      const result = await commonRepository.findIfExisting(mockRecruitmentId);

      expect(recruitmentModel.findOne).toHaveBeenCalledWith({
        where: { id: mockRecruitmentId },
      });
      expect(result).toBe(false);
    });

    test("should throw an error if an error occurs during the process", async () => {
      const mockRecruitmentId = 3;
      const mockError = new Error("Database connection error");
      recruitmentModel.findOne.mockRejectedValue(mockError);

      await expect(
        commonRepository.findIfExisting(mockRecruitmentId)
      ).rejects.toThrow(mockError);
    });
  });
});

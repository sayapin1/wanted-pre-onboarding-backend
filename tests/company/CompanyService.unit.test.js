const CompanyService = require("../../src/services/company.service");

const mockRecruitments = {};

const mockCompanyRepository = {
  postRecruitmentNotice: jest.fn(),
  updateRecruitmentNotice: jest.fn(),
  deleteRecruitmentNotice: jest.fn(),
};

const mockCommonRepository = {
  findIfExisting: jest.fn(),
};

const companyName = "Test Company";
const country = "Test Country";
const area = "Test Area";
const position = "Test Position";
const compensation = "Test Compensation";
const skill = "Test Skill";
const detail = "Test Detail";
const recruitmentId = "test-id";
const updateFields = {};

describe("CompanyService", () => {
  let companyService;

  beforeEach(() => {
    companyService = new CompanyService();
    companyService.companyRepository = mockCompanyRepository;
    companyService.commonRepository = mockCommonRepository;
  });

  describe("postRecruitmentNotice", () => {
    test("should call CompanyRepository.postRecruitmentNotice and return the appropriate response", async () => {
      const mockResponseValue = {
        code: 200,
        message: "채용공고 등록 완료",
      };

      mockCompanyRepository.postRecruitmentNotice.mockResolvedValueOnce();

      const response = await companyService.postRecruitmentNotice(
        companyName,
        country,
        area,
        position,
        compensation,
        skill,
        detail
      );

      expect(mockCompanyRepository.postRecruitmentNotice).toHaveBeenCalledWith(
        companyName,
        country,
        area,
        position,
        compensation,
        skill,
        detail
      );
      expect(response).toEqual(mockResponseValue);
    });
  });

  describe("updateRecruitmentNotice", () => {
    test("should call CommonRepository.findIfExisting and CompanyRepository.updateRecruitmentNotice and return the appropriate response", async () => {
      const mockResponseValue = {
        code: 200,
        message: "채용공고 수정 완료.",
      };

      mockCommonRepository.findIfExisting.mockResolvedValueOnce(true);
      mockCompanyRepository.updateRecruitmentNotice.mockResolvedValueOnce();

      const response = await companyService.updateRecruitmentNotice(
        recruitmentId,
        updateFields
      );

      expect(mockCommonRepository.findIfExisting).toHaveBeenCalledWith(
        recruitmentId
      );
      expect(
        mockCompanyRepository.updateRecruitmentNotice
      ).toHaveBeenCalledWith(recruitmentId, updateFields);
      expect(response).toEqual(mockResponseValue);
    });
  });

  describe("deleteRecruitmentNotice", () => {
    test("should call CommonRepository.findIfExisting and CompanyRepository.deleteRecruitmentNotice and return the appropriate response", async () => {
      const mockResponseValue = {
        code: 200,
        message: "채용공고 삭제 완료.",
      };

      mockCommonRepository.findIfExisting.mockResolvedValueOnce(true);
      mockCompanyRepository.deleteRecruitmentNotice.mockResolvedValueOnce();

      const response = await companyService.deleteRecruitmentNotice(
        recruitmentId
      );

      expect(mockCommonRepository.findIfExisting).toHaveBeenCalledWith(
        recruitmentId
      );
      expect(
        mockCompanyRepository.deleteRecruitmentNotice
      ).toHaveBeenCalledWith(recruitmentId);
      expect(response).toEqual(mockResponseValue);
    });
  });
});

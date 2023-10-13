const CompanyService = require("../../src/services/company.service");
const CompanyController = require("../../src/controllers/company.controller");

const mockCompanyService = {
  postRecruitmentNotice: jest.fn(),
  updateRecruitmentNotice: jest.fn(),
  deleteRecruitmentNotice: jest.fn(),
};

let mockRequest = {};
const mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(),
};

const mockNext = jest.fn();

describe("CompanyController", () => {
  let companyController;

  beforeEach(() => {
    companyController = new CompanyController();
    companyController.companyService = mockCompanyService;
  });

  describe("postRecruitmentNotice", () => {
    beforeEach(() => {
      mockRequest = {
        body: {
          companyName: "Test Company",
          country: "Test Country",
          area: "Test Area",
          position: "Test Position",
          compensation: "Test Compensation",
          skill: "Test Skill",
          detail: "Test Detail",
        },
      };
    });
    test("should call CompanyService.postRecruitmentNotice with the correct arguments", async () => {
      const mockResponseValue = {
        code: 200,
        message: "Recruitment notice posted successfully",
      };

      mockCompanyService.postRecruitmentNotice.mockResolvedValueOnce(
        mockResponseValue
      );

      await companyController.postRecruitmentNotice(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockCompanyService.postRecruitmentNotice).toHaveBeenCalledWith(
        mockRequest.body.companyName,
        mockRequest.body.country,
        mockRequest.body.area,
        mockRequest.body.position,
        mockRequest.body.compensation,
        mockRequest.body.skill,
        mockRequest.body.detail
      );
      expect(mockResponse.status).toHaveBeenCalledWith(mockResponseValue.code);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockResponseValue.message,
      });
    });

    test("should handle errors by calling the next middleware", async () => {
      const mockError = new Error("Internal server error");
      mockCompanyService.postRecruitmentNotice.mockRejectedValue(mockError);

      await companyController.postRecruitmentNotice(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe("updateRecruitmentNotice", () => {
    beforeEach(() => {
      mockRequest = {
        params: {
          recruitmentId: "test-id",
        },
        body: {
          companyName: "Test Company",
          country: "Test Country",
          area: "Test Area",
          position: "Test Position",
          compensation: "Test Compensation",
          skill: "Test Skill",
          detail: "Test Detail",
        },
      };
    });
    test("should call CompanyService.updateRecruitmentNotice with the correct arguments", async () => {
      const mockResponseValue = {
        code: 200,
        message: "Recruitment notice updated successfully",
      };

      mockCompanyService.updateRecruitmentNotice.mockResolvedValueOnce(
        mockResponseValue
      );

      await companyController.updateRecruitmentNotice(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockCompanyService.updateRecruitmentNotice).toHaveBeenCalledWith(
        mockRequest.params.recruitmentId,
        {
          companyName: mockRequest.body.companyName,
          country: mockRequest.body.country,
          area: mockRequest.body.area,
          position: mockRequest.body.position,
          compensation: mockRequest.body.compensation,
          skill: mockRequest.body.skill,
          detail: mockRequest.body.detail,
        }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(mockResponseValue.code);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockResponseValue.message,
      });
    });

    test("should handle errors by calling the next middleware", async () => {
      const mockError = new Error("Internal server error");
      mockCompanyService.updateRecruitmentNotice.mockRejectedValue(mockError);

      await companyController.updateRecruitmentNotice(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe("deleteRecruitmentNotice", () => {
    const recruitmentId = "test-id";
    mockRequest = {
      params: {
        recruitmentId,
      },
    };
    test("should call CompanyService.deleteRecruitmentNotice with the correct argument", async () => {
      const mockResponseValue = {
        code: 200,
        message: "Recruitment notice deleted successfully",
      };

      mockCompanyService.deleteRecruitmentNotice.mockResolvedValueOnce(
        mockResponseValue
      );

      await companyController.deleteRecruitmentNotice(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockCompanyService.deleteRecruitmentNotice).toHaveBeenCalledWith(
        recruitmentId
      );
      expect(mockResponse.status).toHaveBeenCalledWith(mockResponseValue.code);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockResponseValue.message,
      });
    });

    test("should handle errors by calling the next middleware", async () => {
      const mockError = new Error("Internal server error");
      mockCompanyService.deleteRecruitmentNotice.mockRejectedValue(mockError);

      await companyController.deleteRecruitmentNotice(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});

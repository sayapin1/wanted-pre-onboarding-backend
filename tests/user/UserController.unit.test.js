const UserService = require("../services/user.service");
const UserController = require("../controllers/user.controller");

const mockUserService = {
  getRecruitmentNotices: jest.fn(),
  searchRecruitmentNotice: jest.fn(),
  getOneRecruitmentNotice: jest.fn(),
  applyRecruitment: jest.fn(),
};

let mockRequest = {};
const mockResponse = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(),
};
const next = jest.fn();

describe("UserController", () => {
  let userController;

  beforeEach(() => {
    userController = new UserController();
    userController.userService = mockUserService;
  });

  describe("getRecruitmentNotices", () => {
    test("should call UserService.getRecruitmentNotices and return the appropriate response", async () => {
      const mockResponseValue = {
        code: 200,
        data: [{ id: 1, title: "Recruitment Notice 1" }],
      };

      mockUserService.getRecruitmentNotices.mockResolvedValueOnce(
        mockResponseValue
      );

      await userController.getRecruitmentNotices(
        mockRequest,
        mockResponse,
        next
      );

      expect(mockUserService.getRecruitmentNotices).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(mockResponseValue.code);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockResponseValue.data,
      });
    });
  });

  describe("searchRecruitmentNotice", () => {
    test("should call UserService.searchRecruitmentNotice with the correct arguments and return the appropriate response", async () => {
      const searchQuery = "test";
      const mockResponseValue = {
        code: 200,
        data: [{ id: 1, title: "Recruitment Notice 1" }],
      };

      mockRequest = {
        query: {
          keyword: searchQuery,
        },
      };

      mockUserService.searchRecruitmentNotice.mockResolvedValueOnce(
        mockResponseValue
      );

      await userController.searchRecruitmentNotice(
        mockRequest,
        mockResponse,
        next
      );

      expect(mockUserService.searchRecruitmentNotice).toHaveBeenCalledWith(
        searchQuery
      );
      expect(mockResponse.status).toHaveBeenCalledWith(mockResponseValue.code);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockResponseValue.data,
      });
    });
  });

  describe("getOneRecruitmentNotice", () => {
    test("should call UserService.getOneRecruitmentNotice with the correct arguments and return the appropriate response", async () => {
      const recruitmentId = "test-id";
      const mockResponseValue = {
        code: 200,
        data: { id: 1, title: "Recruitment Notice 1" },
      };

      mockRequest = {
        params: {
          recruitmentId,
        },
      };

      mockUserService.getOneRecruitmentNotice.mockResolvedValueOnce(
        mockResponseValue
      );

      await userController.getOneRecruitmentNotice(
        mockRequest,
        mockResponse,
        next
      );

      expect(mockUserService.getOneRecruitmentNotice).toHaveBeenCalledWith(
        recruitmentId
      );
      expect(mockResponse.status).toHaveBeenCalledWith(mockResponseValue.code);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockResponseValue.data,
      });
    });
  });

  describe("applyRecruitment", () => {
    test("should call UserService.applyRecruitment with the correct arguments and return the appropriate response", async () => {
      const recruitmentId = "test-id";
      const userId = "1";
      const mockResponseValue = {
        code: 200,
        message: "Applied to recruitment successfully",
      };

      mockRequest = {
        params: {
          recruitmentId,
        },
      };

      mockUserService.applyRecruitment.mockResolvedValueOnce(mockResponseValue);

      await userController.applyRecruitment(mockRequest, mockResponse, next);

      expect(mockUserService.applyRecruitment).toHaveBeenCalledWith(
        recruitmentId,
        userId
      );
      expect(mockResponse.status).toHaveBeenCalledWith(mockResponseValue.code);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockResponseValue.message,
      });
    });
  });
});

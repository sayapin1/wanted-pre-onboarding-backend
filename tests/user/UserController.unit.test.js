const UserController = require("../../src/controllers/user.controller");

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
const mockNext = jest.fn();

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
        mockNext
      );

      expect(mockUserService.getRecruitmentNotices).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(mockResponseValue.code);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockResponseValue.data,
      });
    });

    test("should return a message when data does not exist in the response", async () => {
      const mockResponseValue = {
        code: 404,
        message: "No recruitment notices found",
      };

      mockUserService.getRecruitmentNotices.mockResolvedValueOnce(
        mockResponseValue
      );

      await userController.getRecruitmentNotices(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockUserService.getRecruitmentNotices).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(mockResponseValue.code);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockResponseValue.message,
      });
    });

    test("should handle errors by calling the next middleware", async () => {
      const mockError = new Error("Internal server error");
      mockUserService.getRecruitmentNotices.mockRejectedValueOnce(mockError);

      await userController.getRecruitmentNotices(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockUserService.getRecruitmentNotices).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
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
        mockNext
      );

      expect(mockUserService.searchRecruitmentNotice).toHaveBeenCalledWith(
        searchQuery
      );
      expect(mockResponse.status).toHaveBeenCalledWith(mockResponseValue.code);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockResponseValue.data,
      });
    });

    test("should return a message when data does not exist in the response", async () => {
      const mockResponseValue = {
        code: 404,
        message: "No recruitment notices found",
      };

      mockUserService.searchRecruitmentNotice.mockResolvedValueOnce(
        mockResponseValue
      );

      await userController.searchRecruitmentNotice(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockUserService.searchRecruitmentNotice).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(mockResponseValue.code);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockResponseValue.message,
      });
    });

    test("should handle errors by calling the next middleware", async () => {
      const mockError = new Error("Internal server error");
      mockUserService.searchRecruitmentNotice.mockRejectedValueOnce(mockError);

      await userController.searchRecruitmentNotice(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockUserService.searchRecruitmentNotice).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
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
        mockNext
      );

      expect(mockUserService.getOneRecruitmentNotice).toHaveBeenCalledWith(
        recruitmentId
      );
      expect(mockResponse.status).toHaveBeenCalledWith(mockResponseValue.code);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: mockResponseValue.data,
      });
    });

    test("should return a message when data does not exist in the response", async () => {
      const mockResponseValue = {
        code: 404,
        message: "No recruitment notices found",
      };

      mockUserService.getOneRecruitmentNotice.mockResolvedValueOnce(
        mockResponseValue
      );

      await userController.getOneRecruitmentNotice(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockUserService.getOneRecruitmentNotice).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(mockResponseValue.code);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockResponseValue.message,
      });
    });

    test("should handle errors by calling the next middleware", async () => {
      const mockError = new Error("Internal server error");
      mockUserService.getOneRecruitmentNotice.mockRejectedValueOnce(mockError);

      await userController.getOneRecruitmentNotice(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockUserService.getOneRecruitmentNotice).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
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

      await userController.applyRecruitment(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockUserService.applyRecruitment).toHaveBeenCalledWith(
        recruitmentId,
        userId
      );
      expect(mockResponse.status).toHaveBeenCalledWith(mockResponseValue.code);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: mockResponseValue.message,
      });
    });

    test("should handle errors by calling the next middleware", async () => {
      const mockError = new Error("Internal server error");
      mockUserService.applyRecruitment.mockRejectedValueOnce(mockError);

      await userController.applyRecruitment(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockUserService.applyRecruitment).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});

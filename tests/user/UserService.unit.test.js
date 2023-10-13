const UserService = require("../../src/services/user.service");

const mockRecruitments = {};
const mockApplications = {};

const mockUserRepository = {
  getRecruitmentNotices: jest.fn(),
  searchRecruitmentNotice: jest.fn(),
  getOneRecruitmentNotice: jest.fn(),
  getAllRecruitmentNoticesByCompany: jest.fn(),
  checkIfApplied: jest.fn(),
  applyRecruitment: jest.fn(),
};

const mockCommonRepository = {
  findIfExisting: jest.fn(),
};

const searchQuery = "Test Query";
const mockRecruitmentId = "test-id";
const mockUserId = "test-user";

describe("UserService", () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    userService.userRepository = mockUserRepository;
    userService.commonRepository = mockCommonRepository;
  });

  describe("getRecruitmentNotices", () => {
    test("should call UserRepository.getRecruitmentNotices and return the appropriate response", async () => {
      const mockResponseValue = {
        code: 200,
        data: [],
      };

      mockUserRepository.getRecruitmentNotices.mockResolvedValueOnce([]);

      const response = await userService.getRecruitmentNotices();

      expect(mockUserRepository.getRecruitmentNotices).toHaveBeenCalled();
      expect(response).toEqual(mockResponseValue);
    });

    test("should return error message when recruitment notice retrieval fails", async () => {
      const mockError = new Error("Database connection error");
      mockUserRepository.getRecruitmentNotices = jest
        .fn()
        .mockRejectedValue(mockError);

      const result = await userService.getRecruitmentNotices();

      expect(result).toEqual({
        code: 500,
        message: "채용공고 불러오기에 실패하였습니다.",
      });
    });
  });

  describe("searchRecruitmentNotice", () => {
    test("should call UserRepository.searchRecruitmentNotice and return the appropriate response", async () => {
      const mockResponseValue = {
        code: 200,
        data: [],
      };

      mockUserRepository.searchRecruitmentNotice.mockResolvedValueOnce([]);

      const response = await userService.searchRecruitmentNotice(searchQuery);

      expect(mockUserRepository.searchRecruitmentNotice).toHaveBeenCalledWith(
        searchQuery
      );
      expect(response).toEqual(mockResponseValue);
    });

    test("should return not found message when no recruitment notice is found", async () => {
      const mockSearchQuery = "Nonexistent Query";
      mockUserRepository.searchRecruitmentNotice = jest
        .fn()
        .mockResolvedValue(null);

      const result = await userService.searchRecruitmentNotice(mockSearchQuery);

      expect(result).toEqual({
        code: 404,
        message: "찾는 채용공고가 없습니다.",
      });
    });

    test("should return error message when recruitment notice search fails", async () => {
      const mockSearchQuery = "Test Query";
      const mockError = new Error("Database connection error");
      mockUserRepository.searchRecruitmentNotice = jest
        .fn()
        .mockRejectedValue(mockError);

      const result = await userService.searchRecruitmentNotice(mockSearchQuery);

      expect(result).toEqual({
        code: 500,
        message: "채용공고 검색에 실패하였습니다.",
      });
    });
  });

  describe("getOneRecruitmentNotice", () => {
    test("should call UserRepository.getOneRecruitmentNotice, UserRepository.getAllRecruitmentNoticesByCompany, and return the appropriate response", async () => {
      const mockResponseValue = {
        code: 200,
        data: { recruitmentDetail: {}, recruitmentNoticesByCompany: [] },
      };

      mockUserRepository.getOneRecruitmentNotice.mockResolvedValueOnce({});
      mockUserRepository.getAllRecruitmentNoticesByCompany.mockResolvedValueOnce(
        []
      );

      const response = await userService.getOneRecruitmentNotice(
        mockRecruitmentId
      );

      expect(mockUserRepository.getOneRecruitmentNotice).toHaveBeenCalledWith(
        mockRecruitmentId
      );
      expect(
        mockUserRepository.getAllRecruitmentNoticesByCompany
      ).toHaveBeenCalled();
      expect(response).toEqual(mockResponseValue);
    });

    test("should return not found message when recruitment detail does not exist", async () => {
      mockUserRepository.getOneRecruitmentNotice = jest
        .fn()
        .mockResolvedValue(null);

      const result = await userService.getOneRecruitmentNotice(
        mockRecruitmentId
      );

      expect(result).toEqual({
        code: 404,
        message: "채용공고가 존재하지 않습니다.",
      });
    });

    test("should return error message when retrieval fails", async () => {
      const mockRecruitmentId = 1;
      const mockError = new Error("Database connection error");
      mockUserRepository.getOneRecruitmentNotice = jest
        .fn()
        .mockRejectedValue(mockError);

      const result = await userService.getOneRecruitmentNotice(
        mockRecruitmentId
      );

      expect(result).toEqual({
        code: 500,
        message: "채용공고 상세 페이지 불러오기에 실패하였습니다.",
      });
    });
  });

  describe("applyRecruitment", () => {
    test("should call CommonRepository.findIfExisting, UserRepository.checkIfApplied, UserRepository.applyRecruitment, and return the appropriate response", async () => {
      const mockResponseValue = {
        code: 200,
        message: "지원 완료되었습니다.",
      };

      mockCommonRepository.findIfExisting.mockResolvedValueOnce(true);
      mockUserRepository.checkIfApplied.mockResolvedValueOnce(false);
      mockUserRepository.applyRecruitment.mockResolvedValueOnce();

      const response = await userService.applyRecruitment(
        mockRecruitmentId,
        mockUserId
      );

      expect(mockCommonRepository.findIfExisting).toHaveBeenCalledWith(
        mockRecruitmentId
      );
      expect(mockUserRepository.checkIfApplied).toHaveBeenCalledWith(
        mockRecruitmentId,
        mockUserId
      );
      expect(mockUserRepository.applyRecruitment).toHaveBeenCalledWith(
        mockRecruitmentId,
        mockUserId
      );
      expect(response).toEqual(mockResponseValue);
    });

    test("should return not found message when the recruitment does not exist", async () => {
      mockCommonRepository.findIfExisting = jest.fn().mockResolvedValue(false);

      const result = await userService.applyRecruitment(
        mockRecruitmentId,
        mockUserId
      );

      expect(result).toEqual({
        code: 404,
        message: "채용공고가 존재하지 않습니다.",
      });
    });

    test("should return conflict message when the user has already applied for the recruitment", async () => {
      mockCommonRepository.findIfExisting = jest.fn().mockResolvedValue(true);
      mockUserRepository.checkIfApplied = jest.fn().mockResolvedValue(true);

      const result = await userService.applyRecruitment(
        mockRecruitmentId,
        mockUserId
      );

      expect(result).toEqual({ code: 409, message: "이미 지원한 공고입니다." });
    });

    test("should return error message when the application process fails", async () => {
      const mockError = new Error("Database connection error");
      mockCommonRepository.findIfExisting = jest
        .fn()
        .mockRejectedValue(mockError);

      const result = await userService.applyRecruitment(
        mockRecruitmentId,
        mockUserId
      );

      expect(result).toEqual({ code: 500, message: "지원에 실패하였습니다." });
    });
  });
});

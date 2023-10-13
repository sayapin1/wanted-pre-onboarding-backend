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
const recruitmentId = "test-id";
const userId = "test-user";

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

      const response = await userService.getOneRecruitmentNotice(recruitmentId);

      expect(mockUserRepository.getOneRecruitmentNotice).toHaveBeenCalledWith(
        recruitmentId
      );
      expect(
        mockUserRepository.getAllRecruitmentNoticesByCompany
      ).toHaveBeenCalled();
      expect(response).toEqual(mockResponseValue);
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
        recruitmentId,
        userId
      );

      expect(mockCommonRepository.findIfExisting).toHaveBeenCalledWith(
        recruitmentId
      );
      expect(mockUserRepository.checkIfApplied).toHaveBeenCalledWith(
        recruitmentId,
        userId
      );
      expect(mockUserRepository.applyRecruitment).toHaveBeenCalledWith(
        recruitmentId,
        userId
      );
      expect(response).toEqual(mockResponseValue);
    });
  });
});

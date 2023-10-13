const { Op } = require("sequelize");
const UserRepository = require("../../src/repositories/user.repository");

// Mock recruitment data
const mockRecruitmentData = [
  {
    id: 1,
    companyName: "Test Company 1",
    country: "Test Country 1",
    area: "Test Area 1",
    position: "Test Position 1",
    compensation: "Test Compensation 1",
    skill: "Test Skill 1",
    detail: "Test Detail 1",
  },
  {
    id: 2,
    companyName: "Test Company 2",
    country: "Test Country 2",
    area: "Test Area 2",
    position: "Test Position 2",
    compensation: "Test Compensation 2",
    skill: "Test Skill 2",
    detail: "Test Detail 2",
  },
];

const mockApplicationsData = [
  { userId: 1, recruitmentId: 1 },
  { userId: 2, recruitmentId: 2 },
];

const mockRecruitmentModel = {
  findAll: jest.fn(),
  findOne: jest.fn(),
};

const mockApplicationModel = {
  create: jest.fn(),
  findOne: jest.fn(),
};

describe("UserRepository", () => {
  let userRepository;

  beforeEach(() => {
    userRepository = new UserRepository(
      mockRecruitmentModel,
      mockApplicationModel
    );
  });

  describe("getRecruitmentNotices", () => {
    test("should return all recruitment notices without detail and timestamps", async () => {
      mockRecruitmentModel.findAll.mockResolvedValue(mockRecruitmentData);

      const response = await userRepository.getRecruitmentNotices();

      expect(mockRecruitmentModel.findAll).toHaveBeenCalled();
      const expectedResponse = mockRecruitmentData.map((data) =>
        expect.objectContaining({
          id: data.id,
          companyName: data.companyName,
          country: data.country,
          compensation: data.compensation,
          area: data.area,
          position: data.position,
          skill: data.skill,
        })
      );
      expect(response).toEqual(expectedResponse);
    });

    test("should throw an error if an error occurs during the process", async () => {
      const mockError = new Error("Database connection error");
      mockRecruitmentModel.findAll.mockRejectedValue(mockError);

      await expect(userRepository.getRecruitmentNotices()).rejects.toThrow(
        mockError
      );
    });
  });

  describe("searchRecruitmentNotice", () => {
    test("should search for recruitment notices with the given query and return filtered results", async () => {
      mockRecruitmentModel.findAll.mockResolvedValue(mockRecruitmentData);

      const query = "Test Company 1";
      const filteredData = mockRecruitmentData.filter((r) =>
        Object.values(r).some((value) => String(value).includes(query))
      );

      const whereClause = {
        [Op.or]: Object.keys(mockRecruitmentData[0])
          .filter((key) => key !== "id" && key !== "detail")
          .map((key) => ({
            [key]: {
              [Op.like]: `%${query}%`,
            },
          })),
      };

      const response = await userRepository.searchRecruitmentNotice(query);

      expect(mockRecruitmentModel.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: whereClause,
          attributes: {
            exclude: expect.arrayContaining([
              "detail",
              "createdAt",
              "updatedAt",
            ]),
          },
        })
      );

      const expectedResponse = mockRecruitmentData.map((data) =>
        expect.objectContaining({
          id: data.id,
          companyName: data.companyName,
          country: data.country,
          compensation: data.compensation,
          area: data.area,
          position: data.position,
          skill: data.skill,
        })
      );

      expect(response).toEqual(expectedResponse);
    });

    test("should throw an error if an error occurs during the process", async () => {
      const mockError = new Error("Database connection error");
      mockRecruitmentModel.findAll.mockRejectedValue(mockError);

      await expect(userRepository.searchRecruitmentNotice()).rejects.toThrow(
        mockError
      );
    });
  });

  describe("getOneRecruitmentNotice", () => {
    test("should return a single recruitment notice by ID without timestamps", async () => {
      const mockId = 1;
      const mockRecruitment = mockRecruitmentData.find((r) => r.id === mockId);
      mockRecruitmentModel.findOne.mockResolvedValue(mockRecruitment);

      const response = await userRepository.getOneRecruitmentNotice(mockId);

      expect(mockRecruitmentModel.findOne).toHaveBeenCalledWith({
        where: {
          id: mockId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      expect(response).toEqual({
        ...mockRecruitment,
        createdAt: undefined,
        updatedAt: undefined,
      });
    });

    test("should return null if no recruitment notice is found", async () => {
      const mockId = 3;
      mockRecruitmentModel.findOne.mockResolvedValue(null);

      const response = await userRepository.getOneRecruitmentNotice(mockId);

      expect(mockRecruitmentModel.findOne).toHaveBeenCalledWith({
        where: {
          id: mockId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      expect(response).toBeNull();
    });

    test("should throw an error if an error occurs during the process", async () => {
      const mockError = new Error("Database connection error");
      mockRecruitmentModel.findOne.mockRejectedValue(mockError);

      await expect(userRepository.getOneRecruitmentNotice()).rejects.toThrow(
        mockError
      );
    });
  });

  describe("getAllRecruitmentNoticesByCompany", () => {
    test("should return an array of recruitment notice IDs for a given company", async () => {
      const companyName = "Test Company";
      const mockRecruitmentNotices = [
        { id: 1, companyName: "Test Company" },
        { id: 2, companyName: "Test Company" },
      ];

      mockRecruitmentModel.findAll.mockResolvedValueOnce(
        mockRecruitmentNotices
      );

      const result = await userRepository.getAllRecruitmentNoticesByCompany(
        companyName
      );

      expect(mockRecruitmentModel.findAll).toHaveBeenCalledWith({
        attributes: ["id"],
        where: { companyName: companyName },
      });

      expect(result).toEqual([1, 2]);
    });

    test("should throw an error if an error occurs during the process", async () => {
      const companyName = "Test Company";
      const mockError = new Error("Database connection error");

      mockRecruitmentModel.findAll.mockRejectedValueOnce(mockError);

      await expect(
        userRepository.getAllRecruitmentNoticesByCompany(companyName)
      ).rejects.toThrow(mockError);
    });
  });

  describe("applyRecruitment", () => {
    const userId = 1;
    const recruitmentId = 1;
    test("should create an application record", async () => {
      mockApplicationModel.create.mockResolvedValue({ userId, recruitmentId });

      await userRepository.applyRecruitment(recruitmentId, userId);

      expect(mockApplicationModel.create).toHaveBeenCalledWith({
        userId,
        recruitmentId,
      });
    });

    test("should throw an error if an error occurs during the process", async () => {
      const mockError = new Error("Database connection error");
      mockApplicationModel.create.mockRejectedValue(mockError);

      await expect(userRepository.applyRecruitment()).rejects.toThrow(
        mockError
      );
    });
  });

  describe("checkIfApplied", () => {
    const userId = 1;
    const recruitmentId = 2;
    test("should return true if an application exists for the given user and recruitment", async () => {
      const mockApplication = mockApplicationsData.find(
        (app) => app.userId === userId && app.recruitmentId === recruitmentId
      );
      mockApplicationModel.findOne.mockResolvedValue(mockApplication);

      const response = await userRepository.checkIfApplied(
        recruitmentId,
        userId
      );

      expect(mockApplicationModel.findOne).toHaveBeenCalledWith({
        where: {
          userId,
          recruitmentId,
        },
      });
      expect(response).toBe(true);
    });

    test("should return false if no application exists for the given user and recruitment", async () => {
      mockApplicationModel.findOne.mockResolvedValue(null);

      const response = await userRepository.checkIfApplied(
        recruitmentId,
        userId
      );

      expect(mockApplicationModel.findOne).toHaveBeenCalledWith({
        where: {
          userId,
          recruitmentId,
        },
      });
      expect(response).toBe(false);
    });

    test("should return false if an error occurs during the process", async () => {
      const mockError = new Error("Database connection error");
      mockApplicationModel.findOne.mockRejectedValue(mockError);

      const result = await userRepository.checkIfApplied(recruitmentId, userId);
      expect(result).toBe(false);
    });
  });
});

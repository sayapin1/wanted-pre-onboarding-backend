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

const recruitmentModel = {
  findAll: jest.fn(),
  findOne: jest.fn(),
};

const applicationModel = {
  create: jest.fn(),
  findOne: jest.fn(),
};

describe("UserRepository", () => {
  let userRepository;

  beforeEach(() => {
    userRepository = new UserRepository(recruitmentModel, applicationModel);
  });

  describe("getRecruitmentNotices", () => {
    test("should return all recruitment notices without detail and timestamps", async () => {
      recruitmentModel.findAll.mockResolvedValue(mockRecruitmentData);

      const response = await userRepository.getRecruitmentNotices();

      expect(recruitmentModel.findAll).toHaveBeenCalled();
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
  });

  describe("searchRecruitmentNotice", () => {
    test("should search for recruitment notices with the given query and return filtered results", async () => {
      recruitmentModel.findAll.mockResolvedValue(mockRecruitmentData);

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

      expect(recruitmentModel.findAll).toHaveBeenCalledWith(
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
  });

  describe("getOneRecruitmentNotice", () => {
    test("should return a single recruitment notice by ID without timestamps", async () => {
      const mockId = 1;
      const mockRecruitment = mockRecruitmentData.find((r) => r.id === mockId);
      recruitmentModel.findOne.mockResolvedValue(mockRecruitment);

      const response = await userRepository.getOneRecruitmentNotice(mockId);

      expect(recruitmentModel.findOne).toHaveBeenCalledWith({
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
      recruitmentModel.findOne.mockResolvedValue(null);

      const response = await userRepository.getOneRecruitmentNotice(mockId);

      expect(recruitmentModel.findOne).toHaveBeenCalledWith({
        where: {
          id: mockId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      expect(response).toBeNull();
    });
  });

  describe("applyRecruitment", () => {
    test("should create an application record", async () => {
      const userId = 1;
      const recruitmentId = 1;
      userRepository.appicationModel = applicationModel;

      await userRepository.applyRecruitment(recruitmentId, userId);

      expect(applicationModel.create).toHaveBeenCalledWith({
        userId,
        recruitmentId,
      });
    });
  });

  describe("checkIfApplied", () => {
    test("should return true if an application exists for the given user and recruitment", async () => {
      const userId = 1;
      const recruitmentId = 1;
      const mockApplication = mockApplicationsData.find(
        (app) => app.userId === userId && app.recruitmentId === recruitmentId
      );
      applicationModel.findOne.mockResolvedValue(mockApplication);

      const response = await userRepository.checkIfApplied(
        recruitmentId,
        userId
      );

      expect(applicationModel.findOne).toHaveBeenCalledWith({
        where: {
          userId,
          recruitmentId,
        },
      });
      expect(response).toBe(true);
    });

    test("should return false if no application exists for the given user and recruitment", async () => {
      const userId = 1;
      const recruitmentId = 2;
      applicationModel.findOne.mockResolvedValue(null);

      const response = await userRepository.checkIfApplied(
        recruitmentId,
        userId
      );

      expect(applicationModel.findOne).toHaveBeenCalledWith({
        where: {
          userId,
          recruitmentId,
        },
      });
      expect(response).toBe(false);
    });
  });
});

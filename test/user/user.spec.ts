import { UserRepository } from './../../src/domain/user/user.repository';
import { UserAuthEntity, UserEntity } from './../../src/domain/user/user.entity';
import { UserAuthValue, UserValue, AuthValue } from './../../src/domain/user/user.value';
import { UserUseCase } from "../../src/application/userUseCase";
import { NotFoundError } from '../../src/application/notFoundError';

describe("UserUseCase", () => {
  let userRepository: UserRepository;
  let userUseCase: UserUseCase;

  beforeEach(() => {
    userRepository = {
      getUserById: jest.fn(),
      listUser: jest.fn(),
      updateUser: jest.fn(),
      registerUser: jest.fn(),
      loginUser: jest.fn(),
      deleteUser: jest.fn(),
      listUserPag: jest.fn(),
      getNumUsers: jest.fn(),
      listFollowersPag: jest.fn(),
      listFollowedPag: jest.fn(),
      insertFollower: jest.fn(),
      insertFollowed: jest.fn(),
      deleteFollower: jest.fn(),
      deleteFollowed: jest.fn(),
    };
    userUseCase = new UserUseCase(userRepository);
  });

  describe("getUserById", () => {
    it("should return a user when given a valid uuid", async () => {
      const uuid = "123";
      const user: UserEntity = {
        uuid: "123",
        appUser: "myAppUser",
        nameUser: "John",
        surnameUser: "Doe",
        mailUser: "johndoe@example.com",
        photoUser: "http://example.com/johndoe.jpg",
        birthdateUser: new Date(),
        genderUser: "male",
        ocupationUser: "Programmer",
        descriptionUser: "Lorem ipsum",
        roleUser: "common",
        privacyUser: false,
        deletedUser: false,
      };
      ;
      jest.spyOn(userRepository, "getUserById").mockResolvedValue(user);

      const result = await userUseCase.getUserById(uuid);

      expect(result).toEqual(user);
      expect(userRepository.getUserById).toHaveBeenCalledWith(uuid);
    });

    it("should throw an error when given an invalid uuid", async () => {
      const uuid = "invalid_uuid";
      jest.spyOn(userRepository, "getUserById").mockResolvedValue(null);

      await expect(userUseCase.getUserById(uuid)).rejects.toThrowError(
        "User not found"
      );
      expect(userRepository.getUserById).toHaveBeenCalledWith(uuid);
    });
  });

  describe("listUser", () => {
    it("should return a list of users", async () => {
      const users: UserEntity[] = [
        {
          uuid: "1",
          appUser: "myAppUser",
          nameUser: "John",
          surnameUser: "Doe",
          mailUser: "johndoe@example.com",
          photoUser: "http://example.com/johndoe.jpg",
          birthdateUser: new Date(),
          genderUser: "male",
          ocupationUser: "Programmer",
          descriptionUser: "Lorem ipsum",
          roleUser: "common",
          privacyUser: false,
          deletedUser: false,
        },
        {
          uuid: "2",
          appUser: "myAppUser",
          nameUser: "Jane",
          surnameUser: "Doe",
          mailUser: "janedoe@example.com",
          photoUser: "http://example.com/janedoe.jpg",
          birthdateUser: new Date(),
          genderUser: "female",
          ocupationUser: "Designer",
          descriptionUser: "Lorem ipsum",
          roleUser: "common",
          privacyUser: false,
          deletedUser: false,
        },
      ];
      jest.spyOn(userRepository, "listUser").mockResolvedValue(users);
  
      const result = await userUseCase.listUser();
  
      expect(result).toEqual(users);
      expect(userRepository.listUser).toHaveBeenCalled();
    });
  });

  /*describe('insertUser', () => {
    it('should insert a new user', async () => {
      const user: UserEntity = {
        appUser: 'TestApp',
        nameUser: 'John',
        surnameUser: 'Doe',
        mailUser: 'johndoe@example.com',
        photoUser: 'http://example.com/johndoe.png',
        birthdateUser: new Date(1990, 0, 1),
        genderUser: 'male',
        ocupationUser: 'Developer',
        descriptionUser: 'Lorem ipsum',
        roleUser: 'common',
        privacyUser: true,
        deletedUser: false,
        uuid: ''
      };

      expect(user).toBeDefined();
      expect(user.appUser).toEqual('TestApp');
      expect(user.nameUser).toEqual('John');
      expect(user.surnameUser).toEqual('Doe');
      expect(user.mailUser).toEqual('johndoe@example.com');
      expect(user.photoUser).toEqual('http://example.com/johndoe.png');
      expect(user.birthdateUser).toEqual(new Date(1990, 0, 1));
      expect(user.genderUser).toEqual('male');
      expect(user.ocupationUser).toEqual('Developer');
      expect(user.descriptionUser).toEqual('Lorem ipsum');
      expect(user.roleUser).toEqual('common');
      expect(user.privacyUser).toEqual(true);
      expect(user.deletedUser).toEqual(false);

    });

    it('should throw a NotFoundError if user is not found', async () => {
      userRepository.insertUser = jest.fn().mockResolvedValue(null);

      await expect(userUseCase.insertUser({
        appUser: 'TestApp',
        nameUser: 'John',
        surnameUser: 'Doe',
        mailUser: 'johndoe@example.com',
        photoUser: 'http://example.com/johndoe.png',
        birthdateUser: new Date(1990, 0, 1),
        genderUser: 'male',
        ocupationUser: 'Developer',
        descriptionUser: 'Lorem ipsum',
        roleUser: 'common',
        privacyUser: true,
        deletedUser: false,
      })).rejects.toThrow(NotFoundError);
    });
  });*/

  
  describe('registerUser', () => {
    it('should register a new user', async () => {
      const user: UserAuthEntity = {
        appUser: 'TestApp',
        nameUser: 'John',
        surnameUser: 'Doe',
        mailUser: 'johndoe@example.com',
        passwordUser:'123',
        photoUser: 'http://example.com/johndoe.png',
        birthdateUser: new Date(1990, 0, 1),
        genderUser: 'male',
        ocupationUser: 'Developer',
        descriptionUser: 'Lorem ipsum',
        roleUser: 'common',
        privacyUser: true,
        deletedUser: false,
        uuid: ''
      };

      expect(user).toBeDefined();
      expect(user.appUser).toEqual('TestApp');
      expect(user.nameUser).toEqual('John');
      expect(user.surnameUser).toEqual('Doe');
      expect(user.mailUser).toEqual('johndoe@example.com');
      expect(user.passwordUser).toEqual('123');
      expect(user.photoUser).toEqual('http://example.com/johndoe.png');
      expect(user.birthdateUser).toEqual(new Date(1990, 0, 1));
      expect(user.genderUser).toEqual('male');
      expect(user.ocupationUser).toEqual('Developer');
      expect(user.descriptionUser).toEqual('Lorem ipsum');
      expect(user.roleUser).toEqual('common');
      expect(user.privacyUser).toEqual(true);
      expect(user.deletedUser).toEqual(false);

    });

    it('should throw a NotFoundError if user is not found', async () => {
      userRepository.registerUser = jest.fn().mockResolvedValue(null);

      await expect(userUseCase.registerUser({
        uuid:"1",
        appUser: 'TestApp',
        nameUser: 'John',
        surnameUser: 'Doe',
        mailUser: 'johndoe@example.com',
        passwordUser:'123',
        photoUser: 'http://example.com/johndoe.png',
        birthdateUser: new Date(1990, 0, 1),
        genderUser: 'male',
        ocupationUser: 'Developer',
        descriptionUser: 'Lorem ipsum',
        roleUser: 'common',
        privacyUser: true,
        deletedUser: false,
      })).rejects.toThrow(NotFoundError);
    });
  });
});



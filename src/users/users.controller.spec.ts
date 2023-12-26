import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        { id: 1, email: 'raj@gmail.com' },
        { id: 2, email: 'khan@gmail.com' },
      ];
      jest.spyOn(usersService, 'findAll').mockResolvedValue(users);

      expect(await usersController.findAll()).toEqual(users);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const newUser: User = { id: 1, email: 'suresh@gmail.com' };
      jest.spyOn(usersService, 'create').mockResolvedValue(newUser);

      const createdUser = await usersController.create(newUser);

      expect(createdUser).toEqual(newUser);
    });
  });
});

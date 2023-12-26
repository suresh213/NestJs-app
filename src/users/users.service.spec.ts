import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        { id: 1, email: 'John' },
        { id: 2, email: 'Jane' },
      ];
      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      const result = await usersService.findAll();
      expect(result).toEqual(users);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const newUser: User = { id: 1, email: 'Alice' };
      jest.spyOn(userRepository, 'create').mockReturnValue(newUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(newUser);

      const createdUser = await usersService.create(newUser);
      expect(createdUser).toEqual(newUser);
    });
  });
});

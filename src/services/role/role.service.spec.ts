import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { Role } from '../../entities/Role.entity';
import { DeleteResult, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RoleService', () => {
  let service: RoleService;
  let repository: Repository<Role>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    repository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create-role', () => {
    it('should create a new role', async () => {
      const role = new Role();
      role.name = 'admin';

      // Mock the repository create and save methods
      jest.spyOn(repository, 'create').mockReturnValue(role);
      jest.spyOn(repository, 'save').mockResolvedValue(role);

      const result = await service.create({ name: 'admin' });

      expect(result).toEqual(role);
      expect(repository.create).toHaveBeenCalledWith({ name: 'admin' });
      expect(repository.save).toHaveBeenCalledWith(role);
    });
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      const roles = [{ name: 'admin' }, { name: 'User' }] as Role[];

      jest.spyOn(repository, 'find').mockResolvedValue(roles);

      const result = await service.findAll();
      expect(result).toEqual(roles);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a role by id', async () => {
      const roleId = 1;
      const role = new Role();
      role.role_id = roleId;
      role.name = 'admin';

      jest.spyOn(repository, 'findOne').mockResolvedValue(role);

      const result = await service.findOne(roleId);
      expect(result).toEqual(role);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { role_id: roleId },
      });
    });

    it('should return undefined if role is not found', async () => {
      const roleId = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      const result = await service.findOne(roleId);
      expect(result).toBeUndefined();
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { role_id: roleId },
      });
    });
  });

  describe('remove', () => {
    it('should remove a role by id', async () => {
      const roleId = 1;
      const deleteResult: DeleteResult = {
        affected: 1,
        raw: [],
      };

      jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);

      await service.remove(roleId);
      expect(repository.delete).toHaveBeenCalledWith(roleId);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from '../../services/role/role.service';
import { Role } from '../../entities/Role.entity';

describe('RoleController', () => {
  let controller: RoleController;
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        {
          provide: RoleService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RoleController>(RoleController);
    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new role', async () => {
      const roleData = { name: 'Admin' };
      const role = new Role();
      role.name = 'Admin';

      jest.spyOn(service, 'create').mockResolvedValue(role);

      const result = await controller.create(roleData);
      expect(result).toEqual(role);
      expect(service.create).toHaveBeenCalledWith(roleData);
    });
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      const roles = [{ name: 'Admin' }, { name: 'User' }];

      jest.spyOn(service, 'findAll').mockResolvedValue(roles as Role[]);

      const result = await controller.findAll();
      expect(result).toEqual(roles);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a role by id', async () => {
      const roleId = 1;
      const role = new Role();
      role.role_id = roleId;
      role.name = 'Admin';

      jest.spyOn(service, 'findOne').mockResolvedValue(role);

      const result = await controller.findOne(roleId);
      expect(result).toEqual(role);
      expect(service.findOne).toHaveBeenCalledWith(roleId);
    });

    it('should return undefined if role is not found', async () => {
      const roleId = 1;

      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      const result = await controller.findOne(roleId);
      expect(result).toBeUndefined();
      expect(service.findOne).toHaveBeenCalledWith(roleId);
    });
  });

  describe('remove', () => {
    it('should remove a role by id', async () => {
      const roleId = 1;

      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(roleId);
      expect(service.remove).toHaveBeenCalledWith(roleId);
    });
  });
});

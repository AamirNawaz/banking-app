import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/Role.entity';
import { RoleService } from 'src/services/role/role.service';
import { RoleController } from './role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}

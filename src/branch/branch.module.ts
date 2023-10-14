import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { OctokitService } from 'src/common/services/octokit.service';
import { BranchController } from './branch.controller';
import { PaginationService } from 'src/common/services/pagination.service';

@Module({
    controllers: [BranchController],
    providers: [BranchService, OctokitService,PaginationService],
})
export class BranchModule {}

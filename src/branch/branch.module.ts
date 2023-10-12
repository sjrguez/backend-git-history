import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { OctokitService } from 'src/common/services/octokit.service';
import { BranchController } from './branch.controller';

@Module({
    controllers: [BranchController],
    providers: [BranchService, OctokitService],
})
export class BranchModule {}

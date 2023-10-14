import { Module } from '@nestjs/common';
import { CommitController } from './commit.controller';
import { CommitService } from './commit.service';
import { OctokitService } from 'src/common/services/octokit.service';
import { PaginationService } from 'src/common/services/pagination.service';

@Module({
  controllers: [CommitController],
  providers: [CommitService, OctokitService,PaginationService]
})
export class CommitModule {}

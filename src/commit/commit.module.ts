import { Module } from '@nestjs/common';
import { CommitController } from './commit.controller';
import { CommitService } from './commit.service';
import { OctokitService } from 'src/common/services/octokit.service';

@Module({
  controllers: [CommitController],
  providers: [CommitService, OctokitService]
})
export class CommitModule {}

import { Controller, Get, Param } from '@nestjs/common';
import { CommitService } from './commit.service';

@Controller('commit')
export class CommitController {

    constructor(private commitService: CommitService){}
    
    @Get('/branch/:branchSha')
    getAllCommits(
        @Param('branchSha') branchSha: string
    ){
        return this.commitService.getAllCommits(branchSha);
    }


    @Get(':commitRef')
    getCommitByRef(
        @Param('commitRef') commitRef: string
    ){
        return this.commitService.getCommitBySha(commitRef);
    }
}

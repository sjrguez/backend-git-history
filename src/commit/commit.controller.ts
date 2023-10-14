import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommitService } from './commit.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('commit')
export class CommitController {

    constructor(private commitService: CommitService){}
    
    @Get('/branch/:branchSha')
    getAllCommits(
        @Param('branchSha') branchSha: string,
        @Query() paginationDto: PaginationDto
    ){
        const { page = 1, limit = 10 } = paginationDto

        return this.commitService.getAllCommits(branchSha, {page, limit});
    }


    @Get(':commitRef')
    getCommitByRef(
        @Param('commitRef') commitRef: string
    ){
        return this.commitService.getCommitBySha(commitRef);
    }
}

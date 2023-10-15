import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommitService } from './commit.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CommitDto,CommitResponseDto } from './dto';
import { ApiTags, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('commit')
@ApiTags('Commits')
export class CommitController {

    constructor(private commitService: CommitService){}
    
    @Get('/branch/:branchSha')
    @ApiParam({ name: 'branchSha', description: 'Branch SHA' })
    @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number' })
    @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Items per page' })
    @ApiResponse({ status: 200, description: 'Get all commits for a branch', type: CommitResponseDto })
    @ApiResponse({ status: 404, description: 'Branch was not Found or was deleted' })
    @ApiResponse({ status: 500, description: 'There was a problem getting all commits' })
    getAllCommits(
        @Param('branchSha') branchSha: string,
        @Query() paginationDto: PaginationDto
    ): Promise<CommitResponseDto>{
        const { page = 1, limit = 10 } = paginationDto

        return this.commitService.getAllCommits(branchSha, {page, limit});
    }


    @Get(':commitRef')
    @ApiParam({ name: 'commitRef', description: 'Commit reference' })
    @ApiResponse({ status: 200, description: 'Get commit by reference', type: CommitDto })
    @ApiResponse({ status: 404, description: 'Commit was not Found or was deleted' })
    @ApiResponse({ status: 500, description: 'There was a problem getting commit by sha' })
    getCommitByRef(
        @Param('commitRef') commitRef: string
    ): Promise<CommitDto>{
        return this.commitService.getCommitBySha(commitRef);
    }
}

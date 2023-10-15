import { Controller, Get, Param, Query } from '@nestjs/common';
import { BranchService } from './branch.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiTags, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BranchDto,BranchResponseDto } from './dto';

@Controller('branch')
@ApiTags('Branches')
export class BranchController {

    constructor(private branchService: BranchService){ }
    
    @Get('/')
    @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number' })
    @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Items per page' })
    @ApiResponse({ status: 200, description: 'Get all branches', type: BranchResponseDto })
    @ApiResponse({ status: 500, description: 'There was a problem getting branches' })

    getAll(
        @Query() paginationDto: PaginationDto
    ): Promise<BranchResponseDto> {
        
        const { page = 1, limit = 10 } = paginationDto
        return this.branchService.getAll({page, limit});
    }

    @Get(':branchName')
    @ApiParam({ name: 'branchName', description: 'Name of the branch' })
    @ApiResponse({ status: 200, description: 'Get branch by name', type: BranchDto })
    @ApiResponse({ status: 404, description: 'Branch was not Found or was deleted' })
    @ApiResponse({ status: 500, description: 'There was a problem getting branches by name' })
    getByName(
        @Param('branchName') branchName: string
    ):Promise<BranchDto>
    {
        return this.branchService.getBranchByName(branchName);
    }
}

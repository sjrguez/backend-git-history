import { Controller, Get, Param, Query } from '@nestjs/common';
import { BranchService } from './branch.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('branch')
export class BranchController {

    constructor(private branchService: BranchService){ }
    
    @Get('/')
    getAll(
        @Query() paginationDto: PaginationDto
    ) {
        
        const { page = 1, limit = 10 } = paginationDto
        return this.branchService.getAll({page, limit});
    }

    @Get(':branchName')
    getByName(
        @Param('branchName') branchName: string
    ){
        return this.branchService.getBranchByName(branchName);
    }
}

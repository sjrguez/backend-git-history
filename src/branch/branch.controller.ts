import { Controller, Get, Param } from '@nestjs/common';
import { BranchService } from './branch.service';

@Controller('branch')
export class BranchController {

    constructor(private branchService: BranchService){ }
    
    @Get('/')
    getAll() {
        return this.branchService.getAll();
    }

    @Get(':branchName')
    getByName(
        @Param('branchName') branchName: string
    ){
        return this.branchService.getBranchByName(branchName);
    }
}

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OctokitService } from 'src/common/services/octokit.service';
import { BranchI } from './branch.interface';
import { BranchMapper } from './branch.mapper'
import { BranchResponseDto } from './dto/branch-response.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationService } from 'src/common/services/pagination.service';

@Injectable()
export class BranchService {
    owner: string;
    repoName: string;
    constructor(
        private octokitService: OctokitService,
        private configService: ConfigService,
        private paginationService: PaginationService
    ){
        this.owner = configService.get<string>("PROJECT_OWNER")
        this.repoName = configService.get<string>("REPOSITORY_NAME")
    }

    async getAll({page, limit}: PaginationDto): Promise<{data:BranchResponseDto[], totalItems: number}> {
        try {
            const result: any =  await this.octokitService.octokit.request(`GET /repos/{owner}/{repo}/branches`, {
                owner: this.owner,
                repo: this.repoName,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                }
            })

            const {pageData, totalItems} = this.paginationService.paginateData<BranchI>(result.data, page, limit) ;
            const data = pageData.map(b => BranchMapper.toDto(b))
            
            return {data, totalItems}
        } catch (error) {
            throw new InternalServerErrorException("There was a problem getting branches")
        }
    }


    async getBranchByName(branchName: string): Promise<BranchResponseDto> {
        try {
             const result: any = await this.octokitService.octokit.request('GET /repos/{owner}/{repo}/branches/{branch}', {
                owner: this.owner,
                repo: this.repoName,
                branch: branchName,
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                },
              })

            return BranchMapper.toDto(result.data)
        } catch (error) {
            if(error.status === 404) {
                throw  new NotFoundException("Branch was not Found or was deleted")
            }

            throw new InternalServerErrorException("There was a problem getting branches by name")
        }
    }
}

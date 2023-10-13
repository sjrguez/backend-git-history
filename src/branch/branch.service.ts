import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OctokitService } from 'src/common/services/octokit.service';
import { BranchI } from './branch.interface';
import { BranchMapper } from './branch.mapper'
import { BranchResponseDto } from './dto/branch-response.dto';

@Injectable()
export class BranchService {
    owner: string;
    repoName: string;
    constructor(private octokitService: OctokitService, private configService: ConfigService){
        this.owner = configService.get<string>("PROJECT_OWNER")
        this.repoName = configService.get<string>("REPOSITORY_NAME")
    }

    async getAll(): Promise<BranchResponseDto[]> {
        try {
            const result: any =  await this.octokitService.octokit.request(`GET /repos/{owner}/{repo}/branches`, {
                owner: this.owner,
                repo: this.repoName,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                }
              })

            const branches: BranchI[] = result.data
            
            return branches as any
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

            return result.data
        } catch (error) {
            if(error.status === 404) {
                throw  new NotFoundException("Branch was not Found or was deleted")
            }

            throw new InternalServerErrorException("There was a problem getting branches by name")
        }
    }
}

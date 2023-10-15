import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OctokitService } from 'src/common/services/octokit.service';
import { CommitInfo } from './commit.interface';
import { CommitMapper } from './commit.mapper';
import { CommitDto,CommitResponseDto } from './dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationService } from 'src/common/services/pagination.service';

@Injectable()
export class CommitService {

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


    async getAllCommits(branchSha: string, {page, limit}: PaginationDto): Promise<CommitResponseDto> {
        try {
            const result: any = await this.octokitService.octokit.request('GET /repos/{owner}/{repo}/commits', {
                owner: this.owner,
                repo: this.repoName,
                sha: branchSha,
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              })

              const { pageData, totalItems} = this.paginationService.paginateData<CommitInfo>(result.data, page, limit) ;
              const data = pageData.map(commit => CommitMapper.toDto(commit))
              
              return { data, totalItems};
        } catch (error) {
            console.log({error})
            if(error.status === 404) {
                throw  new NotFoundException("Branch was not Found or was deleted")
            }

            throw  new InternalServerErrorException("There was a problem getting all commits")
        }
    }

    async getCommitBySha(commitRef: string): Promise<CommitDto> {
        try {
            const result: any = await this.octokitService.octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
                owner: this.owner,
                repo: this.repoName,
                ref: commitRef,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            
            return  CommitMapper.toDto(result.data);
        } catch (error) {
            if(error.status === 404) {
                throw  new NotFoundException("Commit was not Found or was deleted")
            }

            throw  new InternalServerErrorException("There was a problem getting commit by sha")
        }
    }


}

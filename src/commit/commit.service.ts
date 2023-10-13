import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OctokitService } from 'src/common/services/octokit.service';
import { CommitI, CommitInfo } from './commit.interface';
import { CommitMapper } from './commit.mapper';

@Injectable()
export class CommitService {

    owner: string;
    repoName: string;
    constructor(private octokitService: OctokitService, private configService: ConfigService){
        this.owner = configService.get<string>("PROJECT_OWNER")
        this.repoName = configService.get<string>("REPOSITORY_NAME")
    }


    async getAllCommits(branchSha: string) {
        try {
            const result: any = await this.octokitService.octokit.request('GET /repos/{owner}/{repo}/commits', {
                owner: this.owner,
                repo: this.repoName,
                sha: branchSha,
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              })

              const commits: CommitInfo[] = result.data;

              return commits.map(commit => CommitMapper.toDto(commit));
        } catch (error) {
            if(error.status === 404) {
                throw  new NotFoundException("Branch was not Found or was deleted")
            }

            throw  new NotFoundException("There was a problem getting all commits")
        }
    }

    async getCommitBySha(commitRef: string) {
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

            throw  new NotFoundException("There was a problem getting commit by sha")
        }
    }


}

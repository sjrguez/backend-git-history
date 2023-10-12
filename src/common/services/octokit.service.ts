import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from 'octokit'
@Injectable()
export class OctokitService {

    public octokit: Octokit;

    constructor(private configService: ConfigService){
        this.logInOctokit()
    }

    private logInOctokit() {
        try {
            const octokit = new Octokit({
                auth: this.configService.get<string>("GITHUB_TOKEN")
              })
            this.octokit = octokit;
        } catch (error) {
            console.log("Could not log into github API, please check your auth token")
        }
    }
}

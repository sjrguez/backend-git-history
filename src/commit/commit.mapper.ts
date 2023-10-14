import { CommitInfo } from './commit.interface';
import { CommitResponseDto } from './dto/commit-response.dto';

export class CommitMapper {
  public static toDto(repoInfo: CommitInfo): CommitResponseDto {
    const repoDto = new CommitResponseDto();
    repoDto.message = repoInfo.commit.message;
    repoDto.sha = repoInfo.sha;
    repoDto.date = repoInfo.commit.committer.date;
    repoDto.author = repoInfo.commit.author.name;
    repoDto.githubLink = `https://github.com/sjrguez/backend-git-history/commit/${repoInfo.sha}`;
    if(repoInfo?.files) {
      repoDto.fileAfected = repoInfo.files.length;
    }  
    return repoDto;
  }
}
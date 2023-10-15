import { CommitInfo } from './commit.interface';
import { CommitDto } from './dto';

export class CommitMapper {
  public static toDto(repoInfo: CommitInfo): CommitDto {
    const repoDto = new CommitDto();
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
import { CommitInfo } from './commit.interface';
import { CommitResponseDto } from './dto/commitResponse.dto';

export class CommitMapper {
  public static toDto(repoInfo: CommitInfo): CommitResponseDto {
    const repoDto = new CommitResponseDto();
    repoDto.message = repoInfo.commit.message;
    repoDto.sha = repoInfo.sha;
    repoDto.date = repoInfo.commit.committer.date;
    repoDto.autor = repoInfo.commit.author.name;
    repoDto.github_link = `https://github.com/sjrguez/backend-git-history/commit/${repoInfo.sha}`;
    repoDto.fileAfected = repoInfo.files.length;
    return repoDto;
  }
}
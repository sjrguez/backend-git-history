import { BranchI } from './branch.interface';
import { BranchResponseDto } from './dto/branch-response.dto';

export class BranchMapper {
  public static toDto(repoInfo: BranchI): BranchResponseDto {
    const repoDto = new BranchResponseDto();
    repoDto.name = repoInfo.name;
    repoDto.sha = repoInfo.commit.sha;
    repoDto.githubLink = `https://github.com/sjrguez/backend-git-history/tree/${repoInfo.name}`;
    repoDto.protected = repoInfo.protected;
    return repoDto;
  }
}
import { BranchI } from './branch.interface';
import { BranchResponseDto } from './dto/branchResponse.dto';

export class BranchMapper {
  public static toDto(repoInfo: BranchI): BranchResponseDto {
    const repoDto = new BranchResponseDto();
    repoDto.name = repoInfo.name;
    repoDto.sha = repoInfo.commit.sha;
    repoDto.github_link = `https://github.com/sjrguez/backend-git-history/tree/${repoInfo.name}`;
    return repoDto;
  }
}
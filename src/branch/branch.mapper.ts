import { BranchI } from './branch.interface';
import { BranchDto } from './dto/branch.dto';

export class BranchMapper {
  public static toDto(repoInfo: BranchI): BranchDto {
    const repoDto = new BranchDto();
    repoDto.name = repoInfo.name;
    repoDto.sha = repoInfo.commit.sha;
    repoDto.githubLink = `https://github.com/sjrguez/backend-git-history/tree/${repoInfo.name}`;
    repoDto.protected = repoInfo.protected;
    return repoDto;
  }
}
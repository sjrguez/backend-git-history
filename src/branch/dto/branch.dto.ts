import { ApiProperty } from "@nestjs/swagger";

export class BranchDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    sha: string;
    @ApiProperty()
    githubLink: string;
    @ApiProperty()
    protected: boolean
}


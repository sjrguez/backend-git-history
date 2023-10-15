import { ApiProperty } from "@nestjs/swagger";

export class CommitDto {
    @ApiProperty()
    message: string;
    @ApiProperty()
    sha: string;
    @ApiProperty()
    author: string;
    @ApiProperty()
    githubLink: string;
    @ApiProperty()
    date: Date
    @ApiProperty()
    fileAfected?: number
}


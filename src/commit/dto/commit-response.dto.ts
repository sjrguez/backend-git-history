import { ApiProperty } from "@nestjs/swagger";
import { CommitDto } from "./commit.dto";

export class CommitResponseDto {
    @ApiProperty({ type: [CommitDto]})
    data: CommitDto[];
    @ApiProperty()
    totalItems: number
}


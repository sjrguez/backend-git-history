import { ApiProperty } from "@nestjs/swagger";
import {BranchDto} from './branch.dto'

export class BranchResponseDto {
    @ApiProperty({ type: [BranchDto]})
    data: BranchDto[];
    @ApiProperty()
    totalItems: number
}


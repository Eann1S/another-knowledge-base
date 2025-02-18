import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class UserDto {
    @ApiProperty()
    id: number;

    @IsEmail()
    @ApiProperty()
    email: string;

    @ApiProperty()
    createdAt: Date;
}
import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CreateUserDto } from "../../users/dto/create.user.dto";

export class AuthDto extends PickType(CreateUserDto, ['email'] as const) {
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}
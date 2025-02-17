import { ApiProperty, PickType } from "@nestjs/swagger";
import { CreateUserDto } from "../../users/dto/create.user.dto";
import { IsNotEmpty } from "class-validator";

export class AuthDto extends PickType(CreateUserDto, ['email'] as const) {
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}
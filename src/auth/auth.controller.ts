import { Body, Controller, Post, Req} from '@nestjs/common';
import { AuthService } from './auth.service'; 
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
// import { UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }

    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@Req() req) {
    //     console.log(req);
    // }
}

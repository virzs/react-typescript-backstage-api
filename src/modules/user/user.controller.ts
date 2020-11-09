import { Result } from '../../common/interface/result.interface';
import { DefaultDTOValidationPipe } from '../../common/pipes/DefaultDTOValidationPipe';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { DetailDTO } from './dto/detail.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { PageDTO } from './dto/page.dto';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Get()
  @UsePipes(DefaultDTOValidationPipe)
  @ApiQuery({
    name: 'id',
    description: '传入用户id',
  })
  getDetail(@Query() query: DetailDTO) {
    return this.UserService.getDetail(query);
  }

  @Post('page')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(DefaultDTOValidationPipe)
  getPage(@Body() body: PageDTO): Promise<Result> {
    return this.UserService.getPage(body);
  }
}

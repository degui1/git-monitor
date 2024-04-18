import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class GithubService {
  getMessage(): string {
    console.log(process.env.GITHUB_TOKEN);
    throw new BadRequestException('Unable to login', {
      cause: 'Invalid credential',
      description: 'O vivi errou a senha',
    });
    return 'Hello world';
  }
}

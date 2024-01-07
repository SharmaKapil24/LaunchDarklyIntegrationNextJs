import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LdService } from './ldService.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [LdService],
})
export class AppModule {}

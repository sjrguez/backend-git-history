import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  BranchModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

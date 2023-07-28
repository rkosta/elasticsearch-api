import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkItemModule } from './workitem/workitem.module';

@Module({
  imports: [WorkItemModule],
})
export class AppModule {}

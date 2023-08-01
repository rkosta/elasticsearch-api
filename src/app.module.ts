import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkItemModule } from './workitem/workitem.module';
import { ControlModule } from './control/control.module';

@Module({
  imports: [WorkItemModule, ControlModule],
})
export class AppModule {}

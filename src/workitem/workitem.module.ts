import { Module } from '@nestjs/common';
import { WorkItemService } from './workitem.service';
import { WorkItemController } from './workitem.controller';
import { SearchModule } from 'src/search/search.module';

@Module({
  imports: [SearchModule],
  providers: [WorkItemService],
  controllers: [WorkItemController]
})
export class WorkItemModule {}

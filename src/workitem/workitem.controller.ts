import { Controller, Get } from '@nestjs/common';
import { WorkItemService } from './workitem.service';
import { Observable, of } from 'rxjs'

@Controller('workitem')
export class WorkItemController {
    constructor(private readonly workItemService: WorkItemService){}

    @Get()
    getSearch(): Observable<string>{
        return this.workItemService.search("ricardo");
    }   
}

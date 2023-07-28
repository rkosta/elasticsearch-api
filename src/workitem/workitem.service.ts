import { Injectable } from '@nestjs/common';
import { SearchService } from 'src/search/search.service';
import { Observable, of } from 'rxjs'


@Injectable()
export class WorkItemService {

    constructor(private searchService: SearchService){}

    search(phrase: string): Observable<any>{

        return of("hello")
       
    }
}

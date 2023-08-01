import { Injectable } from '@nestjs/common';
import { SearchService } from 'src/search/search.service';

@Injectable()
export class ControlService {
    constructor(private searchService: SearchService) { }
}

import { CountResponse, SearchResponse } from '@elastic/elasticsearch/lib/api/types';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from 'src/search/search.service';

@Controller('control')
export class ControlController {
  constructor(private searchService: SearchService) {}

  @Get('indiceExists/:index')
  async indexExists(@Param('index') index: string): Promise<boolean> {
    return this.searchService.indiceExists(index);
  }

  @Get('documentCount/:index')
  async getDocumentCount(@Param('index') index: string): Promise<CountResponse> {
    return this.searchService.getDocumentCount(index);
  }

  @Get('searchWorkItems/:index')
  async searchWorkItems(@Param('index') index: string, 
      @Query('phrase') phrase: string,
      @Query('from') from: number,
      @Query('size') size: number): Promise<SearchResponse> {
    return this.searchService.searchWorkItems(index, 
        phrase, 
        from, 
        size, 
        ['market','jobStatus']);
  }
}

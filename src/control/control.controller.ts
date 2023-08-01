import { Controller, Get, Param } from '@nestjs/common';
import { SearchService } from 'src/search/search.service';

@Controller('control')
export class ControlController {
  constructor(private searchService: SearchService) {}

  @Get('indiceExists/:index')
  async indexExists(@Param('index') index: string): Promise<boolean> {
    return this.searchService.IndiceExists(index);
  }
}

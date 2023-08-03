import { CountResponse, SearchResponse } from '@elastic/elasticsearch/lib/api/types';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from 'src/search/search.service';

@Controller('control')
/* The ControlController class is a TypeScript class that handles various API endpoints related to
searching and retrieving data from an index. */
export class ControlController {
  constructor(private searchService: SearchService) {}

  @Get('indiceExists/:index')
  /**
   * The function checks if an index exists in the search service.
   * @param {string} index - The `index` parameter is a string that represents the name of an index in
   * a search service.
   * @returns A boolean value indicating whether the specified index exists or not.
   */
  async indexExists(@Param('index') index: string): Promise<boolean> {
    return this.searchService.indiceExists(index);
  }

  @Get('documentCount/:index')
  /**
   * The function `getDocumentCount` retrieves the count of documents in a specified index using the
   * `searchService` object.
   * @param {string} index - The `index` parameter is a string that represents the name of the index in
   * which the documents are stored.
   * @returns a Promise that resolves to a CountResponse object.
   */
  async getDocumentCount(@Param('index') index: string): Promise<CountResponse> {
    return this.searchService.getDocumentCount(index);
  }

  @Get('searchWorkItems/:index')
  /**
   * The function `searchWorkItems` is an asynchronous function that takes in parameters for index,
   * phrase, from, and size, and returns a promise of type `SearchResponse`.
   * @param {string} index - The `index` parameter is a string that represents the name of the index
   * where the work items are stored. It is used to specify the index to search in.
   * @param {string} phrase - The `phrase` parameter is a string that represents the search phrase or
   * keyword that you want to use to search for work items. It is used to filter the search results
   * based on the specified phrase.
   * @param {number} from - The "from" parameter is used to specify the starting index of the search
   * results. It determines the offset from which the search results should be returned. For example,
   * if "from" is set to 10, the search results will start from the 10th item in the list.
   * @param {number} size - The `size` parameter is used to specify the number of search results to be
   * returned per page. It determines the maximum number of work items that will be included in the
   * response.
   * @returns a Promise that resolves to a SearchResponse object.
   */
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

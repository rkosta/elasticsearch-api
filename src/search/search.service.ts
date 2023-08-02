import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { Observable, of } from 'rxjs';
import { AggregationsAggregationContainer, CountResponse, SearchResponse } from '@elastic/elasticsearch/lib/api/types';

@Injectable()
/* The SearchService class provides methods for interacting with Elasticsearch, including checking if
an index exists, getting the count of documents in an index, and performing searches with pagination
and aggregations. */
export class SearchService {
  private client: Client;

  /**
   * The constructor initializes a new instance of the Client class with the specified node,
   * authentication, and TLS settings.
   */
  public constructor() {
    this.client = new Client({
      node: 'https://localhost:9200',
      auth: {
        apiKey: 'LWRFSTFZZ0IyY3JJaC04X0IzQnE6bHBCdlVxcjJTbUt3QTFVeGtaQWh2UQ',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  /**
   * The function checks if an index exists in Elasticsearch.
   * @param {string} index - The "index" parameter is a string that represents the name of the index in
   * Elasticsearch.
   * @returns The function `indiceExists` returns a Promise that resolves to a boolean value.
   */
  public indiceExists(index: string): Promise<boolean> {
    return this.client.indices.exists({
      index: index,
    });
  }

  /**
   * The function `getDocumentCount` returns a promise that resolves to the count of documents in the
   * specified index.
   * @param {string} index - The "index" parameter is a string that represents the name of the index in
   * Elasticsearch. An index is a collection of documents that are organized and stored together for
   * efficient retrieval.
   * @returns a Promise that resolves to a CountResponse object.
   */
  public getDocumentCount(index: string): Promise<CountResponse>{
    return this.client.count({
      index: index,
      query: {
        match_all: {}
      }
    })
  }

  /**
   * The function `searchWorkItems` performs a search on a specified index using a given phrase,
   * pagination parameters, and aggregation fields.
   * @param {string} index - The index parameter is a string that represents the name of the index
   * where the work items are stored. It is used to specify the index to search in.
   * @param {string} phrase - The `phrase` parameter is a string that represents the search phrase or
   * query that you want to search for in the work items.
   * @param {number} from - The "from" parameter specifies the starting index of the search results. It
   * determines the offset from which the search results should be returned. For example, if "from" is
   * set to 10, the search results will start from the 11th item.
   * @param {number} size - The "size" parameter determines the number of search results to be returned
   * per page. It specifies the maximum number of documents to be included in the search response.
   * @param {string[]} aggregations - The `aggregations` parameter is an array of strings that
   * represents the fields on which you want to perform aggregations in the search query. Each string
   * in the array corresponds to a field in the search index.
   * @returns a Promise that resolves to a SearchResponse object.
   */
  public searchWorkItems(index: string,
    phrase: string,
    from: number, 
    size: number,
    aggregations: string[]): Promise<SearchResponse>{
      debugger;

      /* The code block is creating an object called `searchAggregations` that will be used to specify
      the aggregations to be performed in the Elasticsearch search query. */
      let searchAggregations: Record<string, AggregationsAggregationContainer> = {}
      for (let index = 0; index < aggregations.length; index++) {
        const agg = aggregations[index];
        searchAggregations[agg] = {
          terms: {
            field: agg,
            size: 1000000
          }
        }
      }
    
    return this.client.search({
      index: index,
      query: {
        simple_query_string: {
          query: phrase
        }
      },
      track_total_hits: true,
      size: size,
      from: from,
      aggregations: searchAggregations
    })
  }
}

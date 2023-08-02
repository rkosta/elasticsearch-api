import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { Observable, of } from 'rxjs';
import { AggregationsAggregationContainer, CountResponse, SearchResponse } from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class SearchService {
  private client: Client;

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

  public indiceExists(index: string): Promise<boolean> {
    return this.client.indices.exists({
      index: index,
    });
  }

  public getDocumentCount(index: string): Promise<CountResponse>{
    return this.client.count({
      index: index,
      query: {
        match_all: {}
      }
    })
  }

  public searchWorkItems(index: string,
    phrase: string,
    from: number, 
    size: number,
    aggregations: string[]): Promise<SearchResponse>{
      debugger;

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

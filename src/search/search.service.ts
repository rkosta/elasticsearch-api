import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class SearchService {

    private client: Client

    public constructor() {
        this.client = new Client({
            node: "https://localhost:9200",
            auth: {
                apiKey: "LWRFSTFZZ0IyY3JJaC04X0IzQnE6bHBCdlVxcjJTbUt3QTFVeGtaQWh2UQ"
            },
            tls: {
                rejectUnauthorized: false

            }

        })
    }
}

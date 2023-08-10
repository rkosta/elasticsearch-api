export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ELASTICSEARCH_URL: string;
      ELASTICSEARCH_API_KEY: string;
      ENV: 'dev' | 'prod';
    }
  }
}

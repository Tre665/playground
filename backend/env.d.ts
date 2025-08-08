declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    HOST: string;
    PORT: number;
    MONGODB_URI: string;
    MONGODB_DB: string;
  }
}

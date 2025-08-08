export type Env = 'development' | 'production' | 'test';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: Env;
    HOST: string;
    PORT: number;
    MONGODB_URI: string;
    MONGODB_DB: string;
  }
}

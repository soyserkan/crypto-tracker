declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            MONGO_URL: string;
            RabbitMQ_URL:string;
        }
    }
}
export { }
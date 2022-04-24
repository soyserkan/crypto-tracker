declare global {
    namespace NodeJS {
        interface ProcessEnv {
            RabbitMQ_URL:string;
        }
    }
}
export { }
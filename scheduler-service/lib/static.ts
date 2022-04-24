import fs from 'fs';

export class Static {
    static main: string = __dirname;
    static public: string = `${Static.main}/../public`;
    static log: string = `${Static.public}/log`;

    static async setup() {
        Static.createDirectiories();
        Static.isDevelopment();
    }
    static async createDirectiories() {
        var directories = [Static.public, Static.log];
        for (var dir of directories) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
        }
    }
    static isDevelopment() {
        const env = process.env.NODE_ENV || 'development'
        return env === 'development'
    }
}
import mongoose, { FilterQuery } from "mongoose";
export abstract class BaseRepository<T>{

    public readonly _model: mongoose.Model<T>;

    constructor(schemaModel: mongoose.Model<T>) {
        this._model = schemaModel;
    }
    findOne(filter: FilterQuery<Partial<T>> = {}, attributes?: Attributes): Promise<T | null> {
        return this._model.findOne<T>(filter, attributes || {}).exec()
    }
    find(filter: FilterQuery<Partial<T>> = {}, limit?: number, page?: number, attributes?: Attributes, sort?: Sort): Promise<T[]> {
        const query = this._model.find<T>(filter, attributes || {});
        if (sort) {
            query.sort(sort);
        }
        if (page && page > 0) {
            const skip = (limit || 10) * (page - 1);
            query.skip(skip);
        }
        if (limit) {
            query.limit(limit)
        }
        return query.exec();
    }
    create(data: Partial<T>): Promise<T> {
        return this._model.create(data);
    }
}

interface Attributes {
    [key: string]: true | false;
}
interface Sort {
    [key: string]: 1 | -1;
}

import mongoose, { Schema, model, SchemaDefinition, SchemaDefinitionType, Model } from "mongoose";

export class BaseModel<T extends mongoose.Document> {
    name: string;
    schema: Schema;
    constructor(name: string, collection: SchemaDefinition<SchemaDefinitionType<T>>) {
        this.name = name;
        this.schema = new Schema<T, Model<T>>(
            collection,
            {
                toJSON: {
                    transform(doc, ret) {
                        ret.id = ret._id;
                        delete ret._id
                    }
                },
                versionKey: false,
                timestamps: true
            }
        );
    }
    build() {
        return model<T>(this.name, this.schema);
    }
}
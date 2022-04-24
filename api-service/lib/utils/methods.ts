import mongoose from "mongoose";

export function getValidObjectId(id: string | mongoose.Types.ObjectId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid Object ID");
    }
    if (typeof id === 'string') {
        id = new mongoose.Types.ObjectId(id);
    }
    return id;
}
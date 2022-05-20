import mongoose from "mongoose";

const TourSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    tags: [String],
    imageFile: String,
    createdAt: {
        type: String,
        default: new Date()
    },
    likes: {
        type: [String],
        default: []
    }
})
const TourModel = mongoose.model('Tour', TourSchema);
export default TourModel;
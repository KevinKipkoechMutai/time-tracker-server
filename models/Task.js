import mongoose from "mongoose"

const TaskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        taskType: {
            type: String,
            required: true,
            enum: ["story", "bug"],
        },
        timeSpent: {
            type: Number,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: Date,
        labels: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true, toJSON: { getters: true } }
)

// TaskSchema.methods = {
//     remove() {
//         return this.model.deleteOne({ _id: this.id });
//     },
// };

const Task = mongoose.model("Task", TaskSchema)

export default Task
import mongoose from "mongoose"

const TaskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        timeSpent: {
            type: Number,
            required: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: String,
        labels: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true, toJSON: { getters: true } }
)

const Task = mongoose.model("Task", TaskSchema)
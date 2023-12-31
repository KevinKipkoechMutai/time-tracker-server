import express from "express"
import Task from "../models/Task.js"

const router = express.Router()

//Routing with inbuilt controllers
// Get all tasks
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

// Create a task
router.post("/tasks", async (req, res) => {
    try {
        const task = new Task(req.body)
        await task.save()
        res.status(201).json(task)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update a task
router.put("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            throw new Error("Task not found");
        }

        task.name = req.body.name;
        task.taskType = req.body.taskType;
        task.timeSpent = req.body.timeSpent;
        task.startDate = req.body.startDate;

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a task
router.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            throw new Error("Task not found")
        }
        await task.deleteOne()
        res.status(200).json({ message: "Task deleted" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

    // Log the request and response
    console.log("Request:", req)
    console.log("Response:", res)
})

//export task routes to index.js
export default router
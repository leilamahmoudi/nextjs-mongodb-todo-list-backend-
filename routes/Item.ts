import express from "express";
import Item from "../models/Item";
import Todo from "../models/Todo";

const router = express.Router();

router.post("/todos/:todoId/items", async (req, res, next) => {
  const todoId = req.params.todoId;
  const todo = await Todo.findById(todoId);
  if (!todo) {
    return res.status(404).json({ message: "Todo does not exist" });
  }
  const createdTodoItem = new Item({
    todo: todo,
    task: req.body.task,
    description: req.body.description,
    isDone: req.body.isDone,
  });
  try {
    const newTodoItem = await createdTodoItem.save();
    res.status(201).json(newTodoItem);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/todos/:todoId/items", async (req, res) => {
  const todoId = req.params.todoId;
  const todo = await Todo.findById(todoId);
  if (!todo) {
    return res.status(404).json({ message: "Todo does not exist" });
  }
  try {
    const items = await Item.find({ todo: todo });
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: "Server Error :(" });
  }
});

router.delete("/todos/:todoId/items/:itemId", async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const itemId = req.params.itemId;
    const todo = await Todo.findById(todoId);
    await Item.findOne({ _id: itemId, todo: todo }).deleteOne();
    return res.status(204).json({ message: "Deleted a todo" });
  } catch (error) {
    return res.status(500).json({ message: "Delete Error :(" });
  }
});

router.put("/todos/:todoId/items/:itemId", async (req, res) => {
  const todoId = req.params.todoId;
  const itemId = req.params.itemId;
  const todo = await Todo.findById(todoId);
  if (req.body.task !== null) {
    const item: any = await Item.findOne({ _id: itemId, todo: todo });
    item.task = req.body.task;
    item.description = req.body.description;
    item.isDone = req.body.isDone;

    try {
      const updatedTodo = await item.save();
      return res.status(200).json(updatedTodo);
    } catch (error) {
      return res.status(400).json({ message: "Ooopsi somthing went wrong :(" });
    }
  }
});

export default router;

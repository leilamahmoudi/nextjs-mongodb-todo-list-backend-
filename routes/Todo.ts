import express from "express";
import Item from "../models/Item";
import Todo from "../models/Todo";

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: "You have reached the TodoList API" });
});

router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.post("/todos", async (req, res, next) => {
  const createdTodo = new Todo({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const newTodo = await createdTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo does not exist" });
    }
    const { title, description } = todo;
    return res.status(200).json({
      title,
      description,
      id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error :(" });
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.findById(id).deleteOne();
    return res.status(204).json({ message: "Deleted a todo" });
  } catch (error) {
    return res.status(500).json({ message: "Delet Error :(" });
  }
});

router.put("/todos/:id", async (req, res) => {
  const id = req.params.id;

  if (req.body.title !== null) {
    const todo: any = await Todo.findById(id);
    todo.title = req.body.title;
    todo.description = req.body.description;

    try {
      const updatedTodo = await todo.save();
      return res.status(200).json(updatedTodo);
    } catch (error) {
      return res.status(400).json({ message: "Ooopsi somthing went wrong :(" });
    }
  }
});

export default router;

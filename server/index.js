const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create todo

app.post("/todos", async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    console.log(newTodo.rows);
    res.json(newTodo.rows[0]);
    res.status(200);
  } catch (error) {
    console.error(error.message);
  }
});

//get all todo

app.get("/todos", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM todo ORDER BY todo_id ASC");
    res.status(200).json(allTodo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getTodo = await pool.query(`SELECT * FROM todo WHERE todo_id=${id}`);

    res.status(200).json(getTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//update todo

app.put("/todos/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { description } = request.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    response.status(200).json(`todo ${id} is updated`);
  } catch (error) {
    console.error(error.message);
  }
});

//delete todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    console.log(deleteTodo);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log("server has start in port 5000");
});

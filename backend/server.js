// linking
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import  Todo  from "./dbConnection.js";

// connetion
const connection_link =
  "mongodb+srv://admin:milliannummM5$@cluster0.j7poz0m.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(connection_link, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!!");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};
connectDB();

// app
const app = express();

const port = process.env.PORT || 9000;

app.use(express.json(), cors());

app.get("/todos", async(req, res) => {
  const todos = await Todo.find()

  res.status(200).json(todos);
});

// posting todo
app.post("/todo/new",(req,res)=> {
    const result = req.body.text
    const todo = new Todo({
        "text": result
    })

    todo.save()
    res.status(200).json(todo);
})

// deleting todo
app.delete("/todo/delete/:id",async (req,res) =>{
    const result = await Todo.findByIdAndDelete(req.params.id)

    res.json(result)
})

// updating todo
app.put("/todo/complete/:id",async (req,res) => {
  try{
    const todo = await Todo.findById(req.params.id)
    
    // todo.complete = !todo.complete

    if (todo.complete != null) {
      todo.complete = !todo.complete;
    }

    await todo.save()

    res.json(todo)
  }
  catch(e){
    res.status(404).json({message: "Todo not found"})
  }
    
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoURI = "mongodb://127.0.0.1:27017/fruitDB";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const projectSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  image: String,
  link: String,
  description: String,
});

const Project = mongoose.model("Project", projectSchema);

const addSampleProject = async () => {
  try {
  
    await Project.deleteMany({});

    const sampleDogProject = new Project({
      title: "Dog",
      image: "images/dog-4.jpg",
      link: "About dogs",
      description: "Dogs are man's best friends.",
    });
    await sampleDogProject.save();
    console.log("Dog project saved!");

    const sampleRabbitProject = new Project({
      title: "Rabbit",
      image: "images/rabbit.jpg",
      link: "About rabbits",
      description: "Rabbits are cute and fluffy animals!",
    });
    await sampleRabbitProject.save();
    console.log("Rabbit project saved!");

    const sampleCatProject = new Project({
      title: "Cat",
      image: "images/cat.jpg",
      link: "About cats",
      description: "Cats are adorable and quiet!",
    });
    await sampleCatProject.save();
    console.log("Cat project saved!");
  } catch (err) {
    console.error("Error adding sample projects:", err);
  }
};

addSampleProject();

app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json({ statusCode: 200, data: projects, message: "Success" });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Database Error", error: err });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});

import express from "express";
import bodyparser from "express";
const app = express();
import mongoose from "mongoose";
import { Contact } from "./ContactSchema.js";
import cors from "cors";
const url = "mongodb://127.0.0.1:/mydb";
function mongoconection() {
  mongoose.connect(url);
  console.log("connected to mongodb");
}
mongoconection();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyparser.json());
app.post("/", async (req, res) => {
  let body = req.body;
  console.log(body);
  await Contact.find({ gmail: body.gmail }).then(async (result) => {
    console.log(result);
    if (result.length > 0) {
      res.send({ msg: "contact alredy exist" });
    } else {
      await Contact.create(body);
      res.send({ msg: "contact added succefully", data: body });
    }
  });
});

app.get("/", async (req, res) => {
  try {
    let contact = await Contact.find().sort({ createdAt: -1 });
    res.send({ msg: "success", contact });
  } catch (error) {
    res.send({ msg: error.message });
  }
});

app.put("/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id);
  let updateConatct = req.body;
  console.log(updateConatct);
  try {
    let contact = await Contact.findById(id);
    if (!contact) return res.send({ msg: "Conatct not found" });
    await Contact.findByIdAndUpdate(id, updateConatct, { new: true });
    res.send({ msg: "Contact updated" });
  } catch (error) {
    res.send({ msg: error.message });
  }
});

app.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let contact = await Contact.findById(id);
    if (!contact) return res.send({ msg: "Conatct not found" });
    await Contact.findByIdAndDelete(id);
    res.send({ msg: "Contact deleted succefully !" });
  } catch (error) {
    res.send({ msg: error.message });
  }
});
app.listen(2000, () => {
  console.log("server is running on port 2000");
});

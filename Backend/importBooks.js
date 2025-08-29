import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Books from "./model/bookModel.js";

dotenv.config();

const booksFile = path.resolve("../books.json");
const booksData = JSON.parse(fs.readFileSync(booksFile, "utf-8"));

async function importBooks() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Books.deleteMany({}); // Remove this line if you don't want to clear existing books
    await Books.insertMany(booksData);
    console.log("Books imported successfully!");
    process.exit();
  } catch (err) {
    console.error("Error importing books:", err);
    process.exit(1);
  }
}

importBooks();

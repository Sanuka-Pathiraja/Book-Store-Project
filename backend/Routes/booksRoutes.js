const express = require("express");
const mongoose = require("mongoose");
const { Book } = require("../models/BookModel.js");

const router = express.Router();

//route for save a new book
router.post("/", async (request, response) => {
    try {
        if (Book.db.readyState !== 1) {
            return response.status(503).send({ message: "Database is not connected" });
        }

        const { title, auther, author, publishYear } = request.body;
        const normalizedAuther = auther || author;

        if (!title || !normalizedAuther || !publishYear) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }

        const newBook = {
            title,
            auther: normalizedAuther,
            publishYear: Number(publishYear),
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route for get all book from datase 
router.get("/", async (request, response) => {
    try {
        if (Book.db.readyState !== 1) {
            return response.status(503).send({ message: "Database is not connected" });
        }

        const books = await Book.find({});

        return response.status(200).send({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route for get all book from datase by id
router.get("/:id", async (request, response) => {
    try {
        if (Book.db.readyState !== 1) {
            return response.status(503).send({ message: "Database is not connected" });
        }

        const { id } = request.params;
        const book = await Book.findById(id);

        if (!book) {
            return response.status(404).send({ message: "Book not found" });
        }

        return response.status(200).send({
            data: book,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }


});

//Route for update a book
router.put("/:id",async (request,response) => {
    try{
        if (Book.db.readyState !== 1) {
            return response.status(503).send({ message: "Database is not connected" });
        }

        const { title, auther, author, publishYear } = request.body;
        const normalizedAuther = auther || author;

        if(
            !title ||
            !normalizedAuther ||
            !publishYear
        ){
            return response.status(400).send({
                message:"Send all required fields: title, author, publishYear"
            })
        }

        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(
            id,
            {
                title,
                auther: normalizedAuther,
                publishYear: Number(publishYear),
            },
            { new: true }
        );

        if(!result){
            return response.status(404).json({message:"book not found"});
        }

        return response.status(200).send({message:"Book updated successfully", data: result});
    }catch(error){
        console.log(error.message);
        return response.status(500).send({message:error.message});
    }
});

//route delete a book
router.delete("/:id", async(request,respond) =>{
    try{

        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return respond.status(404).json({message:"Book not found "});
        }

        return respond.status(200).send({message:"Book deleted successfully !"});

    }catch(error){
        console.log(error.message);
        return respond.status(500).send({message:error.message});

    }
})

module.exports = router;
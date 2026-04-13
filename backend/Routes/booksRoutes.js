import express from "express";
const router = express.Router();

//route for save a bew book
router.post("/books", async (request, response) => {
    try {
        if (mongoose.connection.readyState !== 1) {
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
router.get("/books", async (request, response) => {
    try {
        if (mongoose.connection.readyState !== 1) {
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
router.get("/books/:id", async (request, response) => {
    try {
        if (mongoose.connection.readyState !== 1) {
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
router.put("/books/:id",async (request,response) => {
    try{
        if (mongoose.connection.readyState !== 1) {
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
router.delete("/books/:id", async(request,respond) =>{
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

router.listen(PORT, () => {
    console.log(`app is listening to port: ${PORT}`);
});
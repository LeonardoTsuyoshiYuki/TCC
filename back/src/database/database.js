const mongoose=require("mongoose");

function connectDatabase() {
  mongoose
    .connect('mongodb+srv://leonardotsuyoshiyuki:leonardoyuki@tcc.kh2aiy8.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Atlas Connected!"))
    .catch((err) => console.log(`Error connecting to MongoDB Atlas: ${err}`));
}

module.exports= connectDatabase;
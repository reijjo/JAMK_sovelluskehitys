require("dotenv").config();
const mongoose = require("mongoose");

if (process.argv.length > 4) {
  console.log("Too many arguments");
  process.exit(1);
}

const mongoNames = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const nameSchema = new mongoose.Schema({
      first: String,
      last: String,
    });

    const Name = mongoose.model("names", nameSchema);

    const newFirst = process.argv[2];
    const newLast = process.argv[3];

    const names = new Name({
      first: newFirst,
      last: newLast,
    });

    // New name
    if (process.argv.length === 4) {
      await names.save();
    } else if (process.argv.length === 2) {
      const result = await Name.find({});

      result.forEach((p) => {
        console.log(p.first, p.last);
      });
    } else {
      console.log(
        'How to use: "node monngodb_names" shows all names in the database, "node mongodb_names firstname lastname" adds new name to database.'
      );
    }
  } catch (error) {
    console.error("MongoDB connection error", error);
  } finally {
    // console.log("MongoDB closed.");
    mongoose.connection.close();
  }
};

mongoNames();

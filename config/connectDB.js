const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    const db = await connect(process.env.DB_HOST);
    console.log(
      `Database is connected. Name: ${db.connection.name}. PORT: ${db.connection.port}. HOST: ${db.connection.host}`
        .green.italic.bold
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};

// qwe123

module.exports = connectDB;

// const Cat = mongoose.model("Cat", { name: String });

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));

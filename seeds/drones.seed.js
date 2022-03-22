const mongoose = require("mongoose");
const Drone = require("../models/Drone.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];

async function connectToDb() {
  try {
    const x = await mongoose.connect(MONGO_URI);
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  } catch (err) {
    console.error("Error connecting to mongo: ", err);
  }
}

async function runningEverything() {
  await connectToDb();
  console.log("DATABASE CONNECTED");
  await Drone.deleteMany();
  console.log("DRONES DELETED");
  await Drone.create(drones);
  console.log("CREATE DRONES");
  await mongoose.connection.close();
  console.log("DATABASE DISCONNECTED");
}

runningEverything();

//   mongoose
//   .connect(MONGO_URI)
//   .then((x) => {
//     console.log(
//       `Connected to Mongo! Database name: "${x.connections[0].name}"`
//     );
//   })
//   .then((x) => {
//     console.log("drones");
//     return Drone.create(drones);
//   })
//   .then((res) => {
//     console.log(res);
//     // return mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.error("Error connecting to mongo: ", err);
//   });

// Import Mongoose
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

dotenv.config(); // To load the .env file
// Import the Person model
const Person = require("./models/personModel");
const express = require("express");

const app = express();

//using this middleware to process request from consumers

app.use(express.json());

// Mongoose Connection Function

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
const db = mongoose.connection;

module.exports = db;

const createPerson = async (req, res) => {
  try {
    const person = new Person({name: "John Doe",
        age: 30,
        favoriteFoods: ["Pizza", "Burger"]});

    await person.save();
    res.status(201).send({
      status: "success",
      message: "person created successfully",
    });
}catch(error){
    return console.error(err);
  }
};

createPerson();



const createManyPeople = (arrayOfPeople) => {
    Person.create(arrayOfPeople, (err, people) => {
      if (err) return console.error(err);
      console.log("People created:", people);
    });
  };
  
  createManyPeople([
    { name: "Alice", age: 25, favoriteFoods: ["Pasta", "Salad"] },
    { name: "Bob", age: 28, favoriteFoods: ["Tacos", "Sushi"] },
  ]);
  


  const findPeopleByName = (personName) => {
    Person.find({ name: personName }, (err, people) => {
      if (err) return console.error(err);
      console.log("People found:", people);
    });
  };
  
  findPeopleByName("John Doe");

  const findPersonById = (personId) => {
    Person.findById(personId, (err, person) => {
      if (err) return console.error(err);
      console.log("Person found by ID:", person);
    });
  };
  
  // Use the _id of a person you know
  findPersonById("603c9bfb81a2a12cd2f6aabc");
  
  const updatePersonAge = (personName) => {
    Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true },
      (err, updatedPerson) => {
        if (err) return console.error(err);
        console.log("Person updated:", updatedPerson);
      }
    );
  };
  
  updatePersonAge("John Doe");
  

  const deletePersonById = (personId) => {
    Person.findByIdAndRemove(personId, (err, deletedPerson) => {
      if (err) return console.error(err);
      console.log("Person deleted:", deletedPerson);
    });
  };
  
  deletePersonById("603c9bfb81a2a12cd2f6aabc");
  
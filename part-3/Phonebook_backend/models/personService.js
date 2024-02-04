// personService.js
const Person = require('./person');

const findAll = () => {
  return Person.find({});
};

const findById = (id) => {
  return Person.findById(id);
};

const addPerson = (name, number) => {
  const person = new Person({
    name: name,
    number: number,
  });
  return person.save();
};

const deleteById = (id) => {
  return Person.findByIdAndDelete(id);
};

const length = ()=>{
    return Person.countDocuments({});
}

module.exports = {
  findAll,
  findById,
  addPerson,
  deleteById,
  length,
};

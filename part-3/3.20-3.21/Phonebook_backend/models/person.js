const mongoose = require('mongoose');

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

//console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: [3, 'Name must be at least 3 characters long'],
      required: [true, 'You need to provide a name'],
    },
    number: {
      type: String,
      required: [true, 'You need to provide a number'],
      validate: {
        validator: function(v) {
          return new Promise((resolve, reject) => {
            // The regex checks for a number with 2 or 3 digits, followed by a hyphen, and then followed by more digits.
            // The entire string must have a length of 8 or more characters.
            const isValid = /^\d{2,3}-\d+$/.test(v) && v.length >= 8;
            resolve(isValid);
          });
        },
        message: props => `${props.value} is not a valid phone number! It should be in the format of XX-XXXXXXX or XXX-XXXXXXX with a length of at least 8 characters`
      },
    },
  });

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
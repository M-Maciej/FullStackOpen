const mongoose=require('mongoose')

const password = process.argv.length >= 3 ? process.argv[2] : (() => {
    console.error('Give password as argument');
    process.exit(1);
})();
if(process.argv.length!=3&&process.argv.length!=5){
    console.error('Invalid number of parameters. Should be: 1 -> password or 3 -> password name number');
    process.exit(1);
}

const collection = `Phonebook`

const url = `mongodb+srv://Urtof:${password}@cluster0.pnof5ez.mongodb.net/${collection}?retryWrites=true&w=majority`
//console.log(url)
mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name:String,
    number:String,
})
const Person = mongoose.model('person',personSchema)


if(process.argv.length == 3){
    Person.find({}).then(people=>{
     people.forEach(person=>{
        console.log(person)
     })   
     mongoose.connection.close()
    })
} else if(process.argv.length == 5){
    const person = new Person({
        name: process.argv[3] ,
        number: process.argv[4],
    })
    person.save().then(_=>{
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
} 

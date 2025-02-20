const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error : '));
db.once("open", ()=>{
    console.log("Database Connection");
});

const samples = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () =>{
    await Campground.deleteMany({});
    for(let i = 0; i < 50 ; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({ 
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${samples(descriptors)} ${samples(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam in arcu cursus euismod quis viverra nibh. Nunc aliquet bibendum', 
            price: price
        });
        await camp.save();
    }   
}
seedDB().then(()=>{
    mongoose.connection.close();
})

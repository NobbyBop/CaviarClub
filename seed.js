import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

//REMINDER TO CHANGE THE CONNECT TO THE ONE WE DECIDE ON
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  admin: Boolean
});

const dishSchema = new Schema({
  name: String
});

const restaurantSchema = new Schema({
  name: String,
  address: String,
  dishes: [dishSchema]
});

const reviewSchema = new Schema({
  dishId: ObjectId,
  userId: ObjectId,
  restaurantId: ObjectId,
  rating: Number,
  date: Date,
  tags: [String],
  title: String,
  content: String,
  comments: [{ userId: ObjectId, comment: String }]
});

// Create models
const User = mongoose.model('User', userSchema);
const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const Review = mongoose.model('Review', reviewSchema);

async function seedDB() {
    await mongoose.connection.dropDatabase();
  
    // Create sample users
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        _id: new ObjectId(),
        email: `user${i}@example.com`,
        username: `user${i}`,
        password: `password${i}`,
        admin: i % 2 === 0  // Alternate between admin and regular user
      });
    }
    await User.insertMany(users);
  
    // Create sample restaurants and dishes
    const restaurantsData = [
      { name: 'The Gourmet Kitchen', address: '123 Tasty Ave' },
      { name: 'Soup & Salad Co.', address: '456 Healthy St' },
      { name: 'BBQ Heaven', address: '789 Smoky Ln' },
      { name: 'Sushi Palace', address: '321 Raw St' },
      { name: 'Pasta House', address: '654 Noodle Blvd' }
    ];
  
    const restaurants = restaurantsData.map(resto => ({
      _id: new ObjectId(),
      name: resto.name,
      address: resto.address,
      dishes: [
        { _id: new ObjectId(), name: `${resto.name} Special 1` },
        { _id: new ObjectId(), name: `${resto.name} Special 2` }
      ]
    }));
  
    await Restaurant.insertMany(restaurants);
  
    // Create sample reviews
    const reviews = [];
    for (let i = 0; i < 10; i++) {
      const restaurant = restaurants[i % restaurants.length]; // Cycle through restaurants
      const dish = restaurant.dishes[i % restaurant.dishes.length]; // Cycle through dishes
      reviews.push({
        _id: new ObjectId(),
        dishId: dish._id,
        userId: users[i % users.length]._id, // Cycle through users
        restaurantId: restaurant._id,
        rating: Math.ceil(Math.random() * 5), // Random rating from 1 to 5
        date: new Date(),
        tags: ['tag1', 'tag2', 'tag3'].slice(0, Math.ceil(Math.random() * 3)), // Up to 3 random tags
        title: `Review Title ${i}`,
        content: `Review content for ${dish.name} by user${i}`,
        comments: [
          { _id: new ObjectId(), userId: users[(i + 1) % users.length]._id, comment: 'Comment 1' },
          { _id: new ObjectId(), userId: users[(i + 2) % users.length]._id, comment: 'Comment 2' }
        ]
      });
    }
  
    await Review.insertMany(reviews);
  
    console.log('Database seeded successfully.');
  }

seedDB().then(() => {
  mongoose.disconnect();
});

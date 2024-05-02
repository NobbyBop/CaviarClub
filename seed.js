import { createComment } from "./data/comment/createComment.js";
import { createDish } from "./data/dish/createDish.js";
import { createRestaurant } from "./data/restaurant/createRestaurant.js";
import { createReview } from "./data/review/createReview.js";
import { createUser } from "./data/user/createUser.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
import { addLike } from "./data/review/addLike.js";
import fs from 'fs'

let connect = await dbConnection();
await connect.dropDatabase();

const users = [];

// Create sample users
for (let i = 0; i < 10; i++) {
	users.push(
		await createUser(
			`user${i}@example.com`,
			`user${i}`,
			`P@ssword${i}`,
			i % 2 === 0 // Alternate between admin and regular user
		)
	);
}

// Create sample restaurants and dishes
const restaurantsData = [
	{ name: "The Gourmet Kitchen", address: "123 Tasty Ave" },
	{ name: "Soup & Salad Co.", address: "456 Healthy St" },
	{ name: "BBQ Heaven", address: "789 Smoky Ln" },
	{ name: "Sushi Palace", address: "321 Raw St" },
	{ name: "Pasta House", address: "654 Noodle Blvd" },
];

const dishes = [];

for (const r of restaurantsData) {
	const { _id, name } = await createRestaurant(r.name, r.address);
	dishes.push(await createDish(`${name} Special 1`, _id.toString()));
	dishes.push(await createDish(`${name} Special 2`, _id.toString()));
}

const reviewData = [
	{
		rating: 4.5,
		title: "Delicious Italian Dinner at Restaurant Name",
		tags: ["Italian", "Pasta", "Pizza"],
		content:
			"Last night, I had the pleasure of dining at Restaurant Name, and it was an absolutely delightful experience from start to finish. As soon as we walked in, we were greeted warmly by the staff, and the ambiance was cozy and inviting. For starters, we ordered the bruschetta, which was fresh and bursting with flavor. For the main course, I had the spaghetti carbonara, and it was hands down the best I've ever had. The pasta was perfectly cooked, and the sauce was creamy and rich without being too heavy. My partner opted for the quattro stagioni pizza, and it was equally delicious. Each topping was fresh, and the crust was thin and crispy, just the way we like it. We finished off our meal with tiramisu for dessert, and it was the perfect ending to a perfect meal. Overall, I would highly recommend Restaurant Name to anyone looking for authentic Italian cuisine in a cozy atmosphere.\nLast night, I had the pleasure of dining at Restaurant Name, and it was an absolutely delightful experience from start to finish. As soon as we walked in, we were greeted warmly by the staff, and the ambiance was cozy and inviting. For starters, we ordered the bruschetta, which was fresh and bursting with flavor. For the main course, I had the spaghetti carbonara, and it was hands down the best I've ever had. The pasta was perfectly cooked, and the sauce was creamy and rich without being too heavy. My partner opted for the quattro stagioni pizza, and it was equally delicious. Each topping was fresh, and the crust was thin and crispy, just the way we like it. We finished off our meal with tiramisu for dessert, and it was the perfect ending to a perfect meal. Overall, I would highly recommend Restaurant Name to anyone looking for authentic Italian cuisine in a cozy atmosphere.\nLast night, I had the pleasure of dining at Restaurant Name, and it was an absolutely delightful experience from start to finish. As soon as we walked in, we were greeted warmly by the staff, and the ambiance was cozy and inviting. For starters, we ordered the bruschetta, which was fresh and bursting with flavor. For the main course, I had the spaghetti carbonara, and it was hands down the best I've ever had. The pasta was perfectly cooked, and the sauce was creamy and rich without being too heavy. My partner opted for the quattro stagioni pizza, and it was equally delicious. Each topping was fresh, and the crust was thin and crispy, just the way we like it. We finished off our meal with tiramisu for dessert, and it was the perfect ending to a perfect meal. Overall, I would highly recommend Restaurant Name to anyone looking for authentic Italian cuisine in a cozy atmosphere.",
		comments: [
			"I totally agree! Restaurant Name is my go-to spot for Italian food in town.",
			"I've been meaning to try Restaurant Name. After reading your review, I'll definitely make a reservation soon!",
		],
	},
	{
		rating: 3.8,
		title: "Authentic Japanese Experience at Other Restaurant",
		tags: ["Japanese", "Sushi", "Sashimi"],
		content:
			"I recently visited Other Restaurant for dinner, and I was quite impressed with the overall experience. The restaurant has a modern yet cozy atmosphere, and the staff were welcoming and attentive throughout the meal. We started with the miso soup and edamame, both of which were tasty and well-prepared. For the main course, we ordered a variety of sushi rolls and sashimi. The fish was incredibly fresh, and each piece was expertly crafted. The dragon roll, in particular, was a standout with its perfect balance of flavors and textures. However, I found some of the rolls to be a bit on the smaller side, which was a bit disappointing. Overall, while Other Restaurant delivered an authentic Japanese dining experience with its fresh and delicious food, the portion sizes could have been more generous.\nLast night, I had the pleasure of dining at Restaurant Name, and it was an absolutely delightful experience from start to finish. As soon as we walked in, we were greeted warmly by the staff, and the ambiance was cozy and inviting. For starters, we ordered the bruschetta, which was fresh and bursting with flavor. For the main course, I had the spaghetti carbonara, and it was hands down the best I've ever had. The pasta was perfectly cooked, and the sauce was creamy and rich without being too heavy. My partner opted for the quattro stagioni pizza, and it was equally delicious. Each topping was fresh, and the crust was thin and crispy, just the way we like it. We finished off our meal with tiramisu for dessert, and it was the perfect ending to a perfect meal. Overall, I would highly recommend Restaurant Name to anyone looking for authentic Italian cuisine in a cozy atmosphere.\nLast night, I had the pleasure of dining at Restaurant Name, and it was an absolutely delightful experience from start to finish. As soon as we walked in, we were greeted warmly by the staff, and the ambiance was cozy and inviting. For starters, we ordered the bruschetta, which was fresh and bursting with flavor. For the main course, I had the spaghetti carbonara, and it was hands down the best I've ever had. The pasta was perfectly cooked, and the sauce was creamy and rich without being too heavy. My partner opted for the quattro stagioni pizza, and it was equally delicious. Each topping was fresh, and the crust was thin and crispy, just the way we like it. We finished off our meal with tiramisu for dessert, and it was the perfect ending to a perfect meal. Overall, I would highly recommend Restaurant Name to anyone looking for authentic Italian cuisine in a cozy atmosphere.",
		comments: [
			"I had a similar experience at Other Restaurant. The quality of the sushi was top-notch, but I wished the portions were a bit bigger.",
			"I love Other Restaurant! The quality of their sushi is unmatched in town.",
		],
	},
	{
		rating: 5,
		title: "Unforgettable French Cuisine at Another Restaurant",
		tags: ["French", "Fine Dining", "Wine"],
		content:
			"Another Restaurant is a hidden gem tucked away in the heart of the city, and it offers an unforgettable dining experience. From the moment you walk in, you are transported to a cozy French bistro with its charming decor and warm ambiance. The service is impeccable, with the staff being both friendly and knowledgeable about the menu and wine pairings. We started our meal with the escargot, which was cooked to perfection and served with a delicious garlic butter sauce. For the main course, I had the coq au vin, and it was absolutely divine. The chicken was tender, and the sauce was rich and flavorful. My dining companion opted for the beef bourguignon, and it was equally delicious. We paired our meal with a bottle of Bordeaux, recommended by our server, and it complemented the meal perfectly. We ended the evening with crème brûlée, which was the perfect ending to a perfect meal. Overall, Another Restaurant exceeded all of our expectations, and I can't wait to return.\nAnother Restaurant is a hidden gem tucked away in the heart of the city, and it offers an unforgettable dining experience. From the moment you walk in, you are transported to a cozy French bistro with its charming decor and warm ambiance. The service is impeccable, with the staff being both friendly and knowledgeable about the menu and wine pairings. We started our meal with the escargot, which was cooked to perfection and served with a delicious garlic butter sauce. For the main course, I had the coq au vin, and it was absolutely divine. The chicken was tender, and the sauce was rich and flavorful. My dining companion opted for the beef bourguignon, and it was equally delicious. We paired our meal with a bottle of Bordeaux, recommended by our server, and it complemented the meal perfectly. We ended the evening with crème brûlée, which was the perfect ending to a perfect meal. Overall, Another Restaurant exceeded all of our expectations, and I can't wait to return.\nAnother Restaurant is a hidden gem tucked away in the heart of the city, and it offers an unforgettable dining experience. From the moment you walk in, you are transported to a cozy French bistro with its charming decor and warm ambiance. The service is impeccable, with the staff being both friendly and knowledgeable about the menu and wine pairings. We started our meal with the escargot, which was cooked to perfection and served with a delicious garlic butter sauce. For the main course, I had the coq au vin, and it was absolutely divine. The chicken was tender, and the sauce was rich and flavorful. My dining companion opted for the beef bourguignon, and it was equally delicious. We paired our meal with a bottle of Bordeaux, recommended by our server, and it complemented the meal perfectly. We ended the evening with crème brûlée, which was the perfect ending to a perfect meal. Overall, Another Restaurant exceeded all of our expectations, and I can't wait to return.",
		comments: [
			"I couldn't agree more! Another Restaurant is one of my favorite restaurants in town.",
			"I've been meaning to try Another Restaurant. After reading your review, I'll definitely make a reservation soon!",
		],
	},
];

// Create sample reviews
function encodeImage(filePath) {
	const imageData = fs.readFileSync(filePath);
	return imageData.toString('base64');
  }
  
for (let i = 0; i < 10; i++) {
	let image = encodeImage(`images/${Math.floor(Math.random() * 6) + 1}.png`)
	// console.log(image.substring(0,100))
	const { _id } = await createReview(
		dishes[i % dishes.length]._id.toString(),
		users[i % users.length]._id.toString(), // Cycle through users
		image, //picture
		reviewData[i % reviewData.length].title,
		reviewData[i % reviewData.length].rating, // Random rating from 1 to 5
		reviewData[i % reviewData.length].tags, // Up to 3 random tags
		reviewData[i % reviewData.length].content
	);
	await createComment(
		reviewData[i % reviewData.length].comments[0],
		users[(i + 1) % users.length]._id.toString(),
		_id.toString()
	);
	await createComment(
		reviewData[i % reviewData.length].comments[1],
		users[(i + 2) % users.length]._id.toString(),
		_id.toString()
	);
	for (let j = 0; j < i % users.length; j++) {
		addLike(_id.toString(), users[j]._id.toString());
	}
}

console.log("Database seeded successfully.");

closeConnection();

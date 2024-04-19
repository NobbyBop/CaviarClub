import { createComment } from "./data/comment/createComment.js";
import { createDish } from "./data/dish/createDish.js";
import { createRestaurant } from "./data/restaurant/createRestaurant.js";
import { createReview } from "./data/review/createReview.js";
import { createUser } from "./data/user/createUser.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";

let connect = await dbConnection();
await connect.dropDatabase();

const users = [];

// Create sample users
for (let i = 0; i < 10; i++) {
	users.push(
		await createUser(
			`user${i}@example.com`,
			`user${i}`,
			`password${i}`,
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

// Create sample reviews
const reviews = [];

for (let i = 0; i < 10; i++) {
	const { _id } = await createReview(
		dishes[i % dishes.length]._id.toString(),
		users[i % users.length]._id.toString(), // Cycle through users
		null, //picture
		`Review Title ${i}`,
		Math.ceil(Math.random() * 5), // Random rating from 1 to 5
		["tag1", "tag2", "tag3"].slice(0, Math.ceil(Math.random() * 3)), // Up to 3 random tags
		`Review content for ${i % dishes.length} by user${i % users.length}`
	);
	await createComment(
		"Comment 1",
		users[(i + 1) % users.length]._id.toString(),
		_id.toString()
	);
	await createComment(
		"Comment 2",
		users[(i + 2) % users.length]._id.toString(),
		_id.toString()
	);
}

console.log("Database seeded successfully.");

closeConnection();

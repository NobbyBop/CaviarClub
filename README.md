# CaviarClub

Do things on this list one at a time (preferrably in order), implementing it fully (database, routing, frontend).
Create a new branch for each feature and when done, pull from main + merge it in after testing everything works correctly.
Make sure to pull frequently to avoid conflicts when merging your branch back in.
While the project base should have all the files we will need, try your best to separate your work from others by creating your own files instead of working on existing ones.
after you complete a task put change the [ ] to [x] and put your name next to it.

## Project structure

There is an individual file for each data function and nearly every route. it is a bit stupid but hopefully it we will have barely any merge conflicts because of it

## Schema

when db functions are created, put the schema used here. If you need to update the schema or db functions, edit the corresponding schema below.

### Users

```
{}
```

### Restaurants

```
{}
```

### Reviews

```
{}
```

## Necessary Features

- [x] create to do list (andrew)
- [x] create project base to add things onto (andrew)
- [ ] create db functions
  - all functions should validate data or leave room for data validation
  - you only need to make create functions for dish, restaurant, review, comment, + user, all others will be done later
- [ ] create a db seed command
  - give chatgpt the schema and ask it to create a list of different user, restaurant, dish, and review objects,
  - use the db functions to add them all to the db
- [ ] home page
  - route should be /home
  - user should be able to filter and sort all reviews, should probably be done clientside but idk
  - you will need to create a `getAllReviews` db function
  - should contain a list of links/thumbnails to individual reviews, each linking to /view/review/:reviewId
  - should contain a link to the signup/login page: /auth/login
  - should contain a link to the create review process: /create/restaurant
    - if user is not logged in, page should link to /auth/login instead
- [ ] review page
  - route should be /view/review/:reviewId
  - you will need to create a `getReviewFromId` db function
  - should contain the content of a review
  - should link to user page of the reviewer: /user/:userId
  - should link to restaurant page of the restaurant: /restaurant/:restaurantId
- [ ] user page
  - route should be /user/:userId
  - you will need to create `getUserFromId` and `getReviewsFromUser` db functions
  - page should display user info and a list of reviews written by that user
  - reviews should link to /view/review/:reviewId
- [ ] restaurant page
  - route should be /view/restaurant/:restaurantId
  - page should display restaurant info and a list of reviews of dishes from that restaurant
  - you will need to create `getReviewsFromRestaurant` and `getRestaruantFromId` db functions so you can get the ids of restaurants that correspond to the user's search, and display reviews for that restaurant's dishes
  - reviews should link to /view/review/:reviewId
- [ ] way to login/sign up, add user
  - login page route should be /auth/login
  - passwords should not be stored in plaintext (? i think this is a requirement)
  - you will need to create a `getUserFromUsername` db function
  - user should be able to enter a username + password and the page will check if a user exists in the database
    - if user exists, log in as user and redirect back to /home
  - should use middleware like in lab 10
  - login page should link to a signup page: /auth/signup
    - user should enter a username+password
    - if username does not exist in db, page should send form contents to /create/user/new where the create user db function should be called
    - page should then log in as the newly created user, and return to home page
- [ ] way to add/select restaurant
  - route should be /create/restaurant
  - you will need to write a `searchRestaurantFromName` db function
  - user should be able to search for existing restaurant, and the front end will show any restaraunts with similar names and an option to create a new one
  - user should be able to click on an existing restaraunt or create new restaraunt
    - if the user clicked on a create new restaraunt:
      - page should allow user to add a restaurant to db based on the schema (data validation should happen in the client, server, and db)
        - form should send response to /create/restaurant/new with form data in the body, and the router should validate & call the db function to create new restaurant
      - after user creates restaurant page should direct them to /create/dish, with the request body containing restarauntId of the restaurant
    - if user clicked existing restaurant, page should direct them to /create/dish, with the request body containing restarauntId
- [ ] way to add/select dish
  - route should be /create/dish
  - you will need to write a db `searchDishesFromName` db function
  - user should be able to search for existing dish, and the front end will show any dishes with similar names and an option to create a new one
  - user should be able to click on an existing dish or create new dish
    - if the user clicked on an existing dish:
      - page should allow user to add a restaurant to db based on the schema (data validation should happen in the client, server, and db)
        - form should send response to /create/dish/new with form data in the body, and the router should validate & call the db function to create new dish
      - after user creates dish page should direct them to /create/review, with the request body containing dishId of the new dish and restaurantId
    - if user clicked existing restaurant, page should direct them to /create/review, with the request body containing dishId and restaurantId
- [ ] way to write review
  - route should be /create/review
  - should contain a form with fields corresponding to the review schema
    - restarauntId & dishId should be hidden, and filled in with the values in the request body (data validation should happen in the client, server, and db)
    - form should send form data to /create/review/new
  - after submitting form, page should direct them to review page of their review: /review/:reviewId
- [ ] way to add a comment
  - under /view/review/:reviewId
  - if the user is logged in, there should be a form under the body of the review allowing user to write a comment
    - there should be a hidden field with the reviewId and userId
    - form should send a response with form data to /create/comment/new
    - user should remain on the review page
- [ ] Way to add photos to a review when creating review
  - edit the existing /create/review page and the review schema
  - use your best judgement, i have no idea how this should be done
- [ ] way to like a review
  - edit the review schema to include a key "likes", with a value of an array that contains a list of userIds that have liked the post
  - in the /view/review/:reviewId page, there should be a toggle button that lets a user like a post and displays the current like count
  - if the user is not logged in, clicking the like button should send them to /auth/login
  - if the user is logged in and their userId is in the "likes" array, the like button should already be toggled on.
    - if they click it, their userId should be removed from the "likes" array and the button should be toggles off
  - if the user is logged in and their userId is not in the "likes" array, if they click the button, route should toggle the button on add their userId to the list, and update the like count
- [ ] way to create an admin account that can delete places and delete reviews
  - typically admin users are directly included in the database and you cannot create one right?
  - you will need to implement remove functions for all of the documents and subdocuments
  - under the /view/review/:reviewId, /view/dish/:dishId, /view/restaurant/:restaurantId pages:
    - if you are logged in as an admin, there should be a button that when pressed deletes the review/dish/restaurant and redirects back to the home page
- [ ] let admin edit reviews
  - this was listed under core features in our project proposal doc, but i dont know if it is necessary and would be a lot of work, use your best judgement

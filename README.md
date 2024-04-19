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
{
   _id: ObjectId(),
   email: string,
   username: string,
   password: string,
   admin: boolean,
}
```

### Restaurants

```
{
   _id: ObjectId(),
   name: string,
   address: string,
   dishes: [
      {
         _id: ObjectId(),
         name: string,
         averageRating: number,
      }
   ],
}
```

### Reviews

```
{
   _id: ObjectId(),
   dishId: ObjectId(),
   userId: ObjectId(),
   picture: null,
   rating: number,
   date: string,
   tags: [
      string
   ],
   content: string,
   comments: [
      userId: ObjectId(),
		comment: string,
   ],
}
```

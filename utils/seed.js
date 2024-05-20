const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }
  // Create array to hold the users
  const users = [
    {
      username: "Paws",
      email: "pawsatwork@gmail.com",
    },
    {
      username: "Tigrr",
      email: "handlrr@yahoo.com"
    },
    {
      username: "Porthos",
      email: "dogdad101@hotmail.com"
    },
    {
      username: "Arc",
      email: "goodboy1@gmail.com"
    },
  ];

  // Add users to the collection and await the results
  const userData = await User.insertMany(users);

  // Add thoughts to the collection and await the results
  const thoughts = [
    {
      
      reactions: [{
        ,
      },
      {
        reactionBody: "Can't wait to dance the night away!",
        username: userData[3].username
      }],
    },
    {
      thoughtText: "I think I'll start tracking my bench press once I hit 300 pounds.",
      username: userData[2].username,
      reactions: [{
        reactionBody: "Woof lol subtle brag there ;P",
        username: userData[1].username,
      },
      {
        reactionBody: "Two plates ain't nothin'!",
        username: userData[0].username
      }],
    },
    {
      thoughtText: "The wonderful thing about handlers is handlers are wonderful things.",
      username: userData[1].username,
      reactions: [{
        reactionBody: "Can confirm.",
        username: userData[0].username,
      },
      {
        reactionBody: "Seconded!",
        username: userData[3].username
      }],
    },
    {
      thoughtText: "My cat demands the belly rubs and then attacks me when I give them to her??",
      username: userData[3].username,
      reactions: [{
        reactionBody: "Haha it's a trap!",
        username: userData[2].username,
      },
      {
        reactionBody: "Mine's the same way smh",
        username: userData[0].username
      }],
    },
  ];

const thoughtData = await Thought.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

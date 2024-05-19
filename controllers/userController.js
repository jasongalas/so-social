const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts');
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user has that ID :[' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove their thoughts
  async deleteUser(req, res) {
    try {
      const byeUser = await User.findOneAndRemove({ _id: req.params.userId });

      if (!byeUser) {
        return res.status(404).json({ message: 'No such user exists' })
      }

      const thought = await Thought.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'User deleted, but no thoughts associated',
        });
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a friend
  async addFriend(req, res) {
    try {
      const hiFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      );

      if (!hiFriend) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' })
      }

      res.json(hiFriend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove a friend from a student
  async removeFriend (req, res) {
    try {
      const byeFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      );

      if (!byeFriend) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(byeFriend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

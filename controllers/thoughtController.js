const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find()
      // .populate('username');
      res.json(thoughts);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getAThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
      // .populate('username');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID :[' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
      res.json(newThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a course
  async deleteThought(req, res) {
    try {
      const byeThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!byeThought) {
        return res.status(404).json({ message: 'No thought with that ID :[' });
      }

      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const changeThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!changeThought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(changeThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const newReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      res.json(newReaction);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      const byeReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true });

      if (!byeReaction) {
        return res.status(404).json({ message: 'No reaction with that ID :[' });
      }

      res.json({ message: 'Reaction deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

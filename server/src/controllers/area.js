const User = require("../models/user.model");

exports.create = async (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { $push: { areas: { _id: Date.now(), action: req.body.action, reaction: req.body.reaction, status: false } } },
    function(error, user) {
      if (!user)
        return res.status(404).json({ success: false, message: 'User not found' });
      else if (error)
        return res.status(404).json({ succes: false, message: 'Area not added', error })
      else
        return res.status(200).json({ success: true, message: 'Area added !', data: user })
    }
  );
};

exports.delete = async (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { $pull: { areas: { _id: req.body._id }}},
    function(error, area) {
      if (!area)
        return res.status(404).json({ success: false, message: 'Area not found' });
      else if (error)
        return res.status(404).json({ success: false, message: 'User not updated', error })
      else
        return res.status(200).json({ success: true, message: 'Area deleted !', data: area })
    }
  );
};

exports.update = async (req, res) => {
  User.updateOne(
    { username: req.body.username, "areas._id": req.body._id },
    { $set: { "areas.$.status": req.body.status}},
    function(error, area) {
      if (!area)
        return res.status(404).json({ success: false, message: 'Area not found' });
      else if (error)
        return res.status(404).json({ success: false, message: 'User not updated', error })
      else
        return res.status(200).json({ success: true, message: 'Area updated !', data: area })
    }
  );
};

exports.get = async (req, res) => {
  User.findOne(
    { username: req.body.username },
    function(error, user) {
      if (!user)
        return res.status(404).json({ success: false, message: 'User not found' });
      else if (error)
        return res.status(404).json({ success: false, message: 'error', error })
      else
        return res.status(200).json({ areas: user.areas })
    }
  );
};
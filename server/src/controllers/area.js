const User = require("../models/user.model");

exports.create = async (req, res) => {
  const area = {
    _id: Date.now(),
    action: req.body.action,
    action_data: req.body.action_data,
    last_action: "",
    reaction: req.body.reaction,
    reaction_data: req.body.reaction_data,
    status: false
  }
  User.findOneAndUpdate(
    { username: req.body.username },
    { $push: { areas: area } },
    function(error, user) {
      if (!user)
        return res.status(404).json({ success: false, message: 'User not found' });
      else if (error)
        return res.status(404).json({ success: false, message: 'Area not created', error })
      else
        return res.status(200).json({ success: true, message: 'Area created !', area: area })
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
        return res.status(404).json({ success: false, message: 'Area not deleted', error })
      else
        return res.status(200).json({ success: true, message: 'Area deleted !'})
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
        return res.status(404).json({ success: false, message: 'Area not updated', error })
      else
        return res.status(200).json({ success: true, message: 'Area updated !', area: area })
    }
  );
};

exports.setLastAction = async (req, res) => {
  User.updateOne(
    { username: req.body.username, "areas._id": req.body._id },
    { $set: { "areas.$.last_action": req.body.last_action}},
    function(error, area) {
      if (!area)
        return res.status(404).json({ success: false, message: 'Area not found' });
      else if (error)
        return res.status(404).json({ success: false, message: 'Area not updated', error })
      else
        return res.status(200).json({ success: true, message: 'Area updated !', area: area })
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
        return res.status(200).json({ success: true, areas: user.areas })
    }
  );
};
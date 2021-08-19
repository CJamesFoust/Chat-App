const { Chat } = require('../models/chat.model');

module.exports.createChat = (req, res) => {
    const { name } = req.body;

    Chat.create( { name } )
        .then(chat => res.json(chat))
        .catch(err => res.status(400).json(err));
}

module.exports.getChats = (req, res) => {
    Chat.find({})
        .then(chats => res.json(chats))
        .catch(err => res.json(err));
}

module.exports.deleteChat = (req, res) => {
    Chat.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err));
}
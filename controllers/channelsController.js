const mongoose = require('mongoose');
const Channel = require('../models/Channel');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getAllChannels = async (req, res) => {
    try {
        const channels = await Channel.find().sort({ updatedAt: -1 });
        if (!channels) return res.status(204).json({ 'message': "No channels found" });

        res.json(channels);
    } catch (err) {
        console.log(err)
    }
}

const createChannel = async (req, res) => {

    const accessToken = req.headers.authorization.split(' ')[1];

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {

            const { name, description } = req.body;
            if (!name || !description) return res.status(400).json({ 'message': 'name and description are required.' });

            const duplicate = await Channel.findOne({ name: name }).exec();

            if (duplicate) return res.status(409).json({ message: "channel name taken" })

            try {

                // have to worry about members - I guess it doesn't matter - channel created you are the only member

                await Channel.create({
                    "name": name,
                    "description": description,
                    "members": [decoded.UserInfo._id]
                });

                res.status(201).json({ 'success': `New channel added!` });
            } catch (err) {
                res.status(500).json({ 'message': err.message });
            }

        }
    );
}

const getChannel = async (req, res) => {

    try {
        if (!req?.params?.id) return res.status(400).json({ "message": 'Channel ID required' });

        // multiple populates causes problem - need better syntax
        // .populate('members', "-password -refreshToken"))
        // better to add select false to password field ?

        const channel = await Channel.findOne({ _id: req.params.id }).populate('members').populate('messages').exec();
        if (!channel) {
            return res.status(204).json({ 'message': `Channel ID ${req.params.id} not found` });
        }
        res.json(channel);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const updateChannel = async (req, res) => {

    try {
        if (!req?.params?.id) return res.status(400).json({ "message": 'Channel ID required' });

        const channel = await Channel.findOne({ _id: req.params.id }).populate('members', "-password -refreshToken").exec();
        if (!channel) {
            return res.status(204).json({ 'message': `Channel ID ${req.params.id} not found` });
        }

        res.json(channel);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getChannelIdWithUserName = async (req, res) => {
    try {
        if (!req?.params?.id) return res.status(400).json({ "message": 'Channel ID required' });

        const channel = await Channel.findOne({ _id: req.params.id }).populate('members', "-password -refreshToken").exec();
        if (!channel) {
            return res.status(204).json({ 'message': `Channel ID ${req.params.id} not found` });
        }

        if (channel.members.some(member => member._id.toString() === req.params.userId)) {
            return res.status(204).json({ 'message': 'Already member of channel' })
        } else {
            try {
                // might not need to remove password here since it is done later... .select('-password')
                const response = await User.findOne({ _id: req.params.userId }).exec();

                // push the response to the channel members array

                channel.members.push(response);
                await channel.save() // add error handling here
            } catch (err) {
                console.log(err)
            }
        }

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getChannelByName = async (req, res) => {
    try {
        if (!req?.params?.name) return res.status(400).json({ "message": 'Channel Name required' });
        const channel = await Channel.findOne({ name: req.params.name }).exec();
        if (!channel) {
            return res.status(204).json({ 'message': `Channel Name ${req.params.name} not found` });
        }
        res.json(channel);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

module.exports = {
    getAllChannels,
    createChannel,
    getChannel,
    getChannelByName,
    updateChannel,
    getChannelIdWithUserName
}
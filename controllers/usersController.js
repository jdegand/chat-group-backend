const fs = require('fs');
const path = require('path');

const User = require('../models/User');

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

const updateUser = async (req, res) => {

    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${req.params.id}.` });
    }

    const url = req.protocol + '://' + req.get('host');

    user.picture = url + '/uploads/' + req.file.filename;

    await user.save()

    // add below code to callback of save ? or break out into separate function ?

    const users = await User.find().select("-password");
    //if (!users) return res.status(204).json({ 'message': 'No users found' });

    const profilePictures = users.map(user => user.picture);

    // Check for orphaned photos
    // if photo is not found tied to a user profile, it should be removed from uploads folder
    fs.readdir('public/uploads', (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                // have to match file format from above
                if (!profilePictures.includes(`http://localhost:3500/uploads/${file}`)) {
                    const filepath = `./public/uploads/${file}`;
                    fs.unlink(filepath, err => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(`Deleted orphaned profile picture`);
                        }
                    })
                }
            })
        }
    })

    res.json(user);

}

module.exports = {
    getUser,
    updateUser
}
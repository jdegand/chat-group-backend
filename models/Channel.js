const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true 
    },
    description : {
        type: String, 
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }], 
    messages: [{
        type: Schema.Types.ObjectId, 
        ref: 'Message'
    }]
}, {timestamps: true}); /* need timestamps to sort channels to have newest channel go first */

/*
works but - have to remove password field as well

const Populate = require('../util/autoPopulate');
channelSchema
  .pre('findOne', Populate('members'))
  .pre('findById', Populate('members'))
  .pre('find', Populate('members'));
*/

module.exports = mongoose.model('Channel', channelSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    channel : {
        type:Schema.Types.ObjectId, 
        ref: 'Channel'
    }
}, {timestamps: true});

module.exports = mongoose.model('Message', messageSchema);
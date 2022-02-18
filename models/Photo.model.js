const { Schema, model } = require('mongoose');

const photoSchema = new Schema({
	imgUrl: {
		type: String,
        required: true
	},
	owner: {type: Schema.Types.ObjectId, ref: 'User'}
},
{
    timestamps: true
});

const Photo = model('Photo', photoSchema);

module.exports = Photo;
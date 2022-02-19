const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		min: 18,
		required: true
	},
	name: {
		type: String,
		required: true,
		minLength: 3
	},
	interests: {
		type: [String],
		min: 1
	},
	aboutMe: {
		type: String,
		maxLength: [250, "You can't have more than 250 characters."]
	},
	campus: {
		type: String,
		enum: ["Madrid", "Barcelona", "Miami", "Berlin", "Paris", "Amsterdam"],
		required: [true, "You must select a campus."]
	},
	profileImg: {
		type: String,
		required: [true, "You must provide a profile picture."]
	},
	photos: [{ type: Schema.Types.ObjectId, ref: 'Photo', default: [] }],
	liked: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
	disliked: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
	matches: [{ type: Schema.Types.ObjectId, ref: 'Match', default: [] }]
},
{
    timestamps: true
});

const User = model('User', userSchema);

module.exports = User;

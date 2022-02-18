const { Schema, model } = require('mongoose');

const matchSchema = new Schema({
	firstUser: { type: Schema.Types.ObjectId, ref: 'User'},
	secondUser: { type: Schema.Types.ObjectId, ref: 'User'}
},
{
    timestamps: true
});

const Match = model('Match', matchSchema);

module.exports = Match;
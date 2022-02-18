function isNotLoggedIn(req, res, next) {
	if (req.session.userId) {
		res.redirect(`/profile/${req.session.userId}`);
	} else {
		next();
	}
}

module.exports = isNotLoggedIn;

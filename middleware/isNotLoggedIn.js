function isNotLoggedIn(req, res, next) {
	if (req.session.userId) {
		res.redirect(`/swipe/show/${req.session.userId}`);
	} else {
		next();
	}
}

module.exports = isNotLoggedIn;

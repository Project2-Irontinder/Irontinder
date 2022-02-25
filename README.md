# IronTinder

<br>

## Description

<br>
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **homepage** - As a user I want to be able to access the homepage.
- **sign up** - As a user I want to sign up on the web page so that I can start using the app
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account.
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **edit user** - As a user I want to be able to edit my profile.

<br>

## Server Routes(Back-end):

| **Method** | **View**           | **Route**                                | **Description**                                                                                      | **Request - Body**                                                      |
| ---------- | ------------------ | ---------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `GET`      | `index` or `swipe` | `/`                                      | Main page route home `index` index view. If logged redirect `/swipe`                                 | {req.session.userID}                                                    |
| `GET`      | `signup`           | `/signup`                                | Render `signup` form view                                                                            |                                                                         |
| `POST`     | `swipe`            | `/signup`                                | Send signup data to server and creates user in DB. Then redirect to `/swipe`                         | {username, password, age, name, interests, aboutme, campus, profileImg} |
| `GET`      | `login`            | `/login`                                 | Render `login`form view                                                                              |                                                                         |
| `POST`     | `swipe`            | `/login`                                 | Sends login data to server and redirects to `/swipe`                                                 | {username, password}                                                    |
| `GET`      | `swipe`            | `/swipe/show/:userId`                    | Render `swipe` view                                                                                  | {req.session.filter}                                                    |
| `POST`     | `swipe`            | `/swipe/like/:userId/:likedId`           | Sends ObjID of liked user to server. Check for matches. Then redirect to `/swipe`                    | {req.params.id, req.session.userID}                                     |
| `POST`     | `swipe`            | `/swipe/dislike/:userId/:dislikedId`     | Sends objID of disliked user to server. Then redirects to `/swipe`                                   | {req.params.id, req.session.userID}                                     |
| `POST`     | `swipe`            | `/swipe/filter/:userId`                  | Sends filter option to the server. Add the filter to the current session. Then redirects to `/swipe` | {req.session.userID, req.session.filter}                                |
| `GET`      | `profile`          | `/profile/:userId`                       | Render `profile` view                                                                                | {req.sessionId}                                                         |
| `POST`     | `profile`          | `/profile/:userId/edit-imgProfile`       | Sends the new image to the server, update DB. Then render `profile` view                             | {req.session.userID, req.file.path}                                     |
| `POST`     | `profile`          | `/profile/:userId/edit-infoProfile`      | Sends the new data to server, update DB. Then render `profile` view                                  | {name, interests, aboutme}                                              |
| `POST`     | `profile`          | `/profile/:userId/add-newPhoto`          | Sends the img to server, update DB. Then render `profile` view                                       | {req.file.path}                                                         |
| `POST`     | `profile`          | `/profile/:userId/delete-photo/:photoId` | Delete img from DB. Then render `profile`view                                                        | {req.params.id}                                                         |
| `GET`      | `matches`          | `/matches/:userId`                       | Render `matches` view                                                                                | {req.session.id}                                                        |

## Models

User model

```javascript
{
    username: {
		type: String,
	},
	password: {
		type: String,
	},
	age: {
		type: Number,
	},
	name: {
		type: String,
	},
	interests: {
		type: [String],
	},
	aboutMe: {
		type: String,
	},
	campus: {
		type: String,
	},
	profileImg: {
		type: String,
	},
	photos: [{ type: Schema.Types.ObjectId, ref: 'Photo', default: [] }],
	liked: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
	disliked: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
	matches: [{ type: Schema.Types.ObjectId, ref: 'Match', default: [] }]
}
```

Photo model

```javascript
    imgUrl: {
		type: String,
	},
	owner: {type: Schema.Types.ObjectId, ref: 'User'}
```

Match model

```javascript
    firstUser: { type: Schema.Types.ObjectId, ref: 'User'},
	secondUser: { type: Schema.Types.ObjectId, ref: 'User'}
```

## Links

### Git

[Repository Link](https://github.com/Project2-Irontinder/Irontinder)

[Deploy Link](https://irontinder-diego.herokuapp.com/)


### Slides

[Slides Link](https://docs.google.com/presentation/d/1HNOOpRI9d1NzdkK3fe24siV7FcOqTVb1a6l19FO0l00/edit?usp=sharing)

### Contributors

Luis Moncada - [`Github-Raketentrakt0r`](https://github.com/Raketentrakt0r) - [`LinkedIn-profile`](https://www.linkedin.com/in/luis-ricardo-moncada-garcia-3b9a30111/)

Fernando Sánchez - [`Github-xXDorkanXx`](https://github.com/xXDorkanXx) - [`LinkedIn-profile`](https://www.linkedin.com/in/fersanchezgarcia/)

Diego Yupanqui - [`Github-DiegoYupanqui98`](https://github.com/DiegoYupanqui98) - [`LinkedIn-profile`](https://www.linkedin.com/in/diegoyupanqui/)

Carwi Barrios - [`Github-Carwels`](https://github.com/Carwels) - [`LinkedIn-profile`](https://www.linkedin.com/in/carwi-barrios)
# angular-card-app

### Project Description ###

* This Card app is developed using angular modules and has the following features.
* Each card has:
	* An image (hard coded the images for now)
	* A title
	* A very basic description
* A user can:
	* Create a new card
	* Delete a card
	* Update a card
* Two types of layouts:
	* Grid view
	* List view
* Header has a create new card button and toggle grid/list view button.
* Separate controllers for Header and the remaining body.

* All data is saved in browser's `localstorage` when a card is added/deleted/updated using `ngStorage` module.
* All cards don't load at once (initially default 6 cards). Next set of 6 cards load on infinite scroll (limited them to 200 for now) using `ngInfiniteScroll` module.

### Developing? ###

* Run `npm install` to install for npm dependencies.
* Install `bower` globally: `sudo npm install bower -g`
* Run `bower install` to install for bower dependencies.

### Start app? ###
* No server. Just run `open index.html` and it should open the app
* Alternatively you can navigate to this folder and open `index.html` in your browser too

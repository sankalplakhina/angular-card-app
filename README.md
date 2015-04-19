# angular-card-app
This Card app is developed using angular modules and has the following features.
<br><br>
Each card has:<br>
-> An image (hard coded the images for now)<br>
-> A title<br>
-> A very basic description<br>
<br>
A user can:<br>
-> Create a new card<br>
-> Delete a card<br>
-> Update a card<br>
<br>
Two types of layouts:<br>
-> Grid view<br>
-> List view<br>
<br>
Header has a create new card button and toggle grid/list view button.<br>
<br>
Separate controllers for Header and the remaining body.<br>
<br>
All the cards data is saved in browser's local storage when a card is added/deleted/updated using <a href="https://github.com/gsklee/ngStorage" target="_blank">ngStorage</a> module.
<br><br>
All cards don't load at once (initially default 6 cards). Next set of 6 cards load on infinite scroll (limited them to 200 for now) using <a href="https://github.com/sroze/ngInfiniteScroll" target="_blank">ngInfiniteScroll</a> module.
<br><br>
A clean UI/UX
<br><br>
-> Package manager used: Bower<br>
-> Task runner to automate the build process used: Gulp<br>
<br>
Download zip and enjoy!! Install dependencies using Bower and npm to run index_dev.html

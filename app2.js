$(document).ready(function() {
	//Array to hold different emotions for the buttons
	var comedianArray = ["Richard+Ayoade", "Miranda+Hart", "Noel+Fielding", "Alan+Davies", "David+Mitchell", "Lee+Mack"];

	//Creates the buttons at the top of the page
	function makeButtons() {
		//Clears the div buttonHolder so that it can reload all of the array
		$('#buttonHolder').empty();

		//Iterates through the comedianArray and makes a button for each element in the array
		for(var i = 0; i < comedianArray.length; i++) {
			$('#buttonHolder').append("<button class='funnyGuys' data-humor=" + comedianArray[i] + ">" + comedianArray[i] + "</button>");
		}
	}

	//What happens when you click on the emotion buttons
	function clickThemButtons() {
		//Gets the value of the data-humor from the button that was clicked
		var silly = $(this).attr('data-humor');
		//Configures the URL needed to access the correct Giphy JSON
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + silly + "&api_key=dc6zaTOxFJmzC&limit=10";

		//Clears the gifs already present so they don't stack
		$('#gifHolder').empty();
		
		//Ajax call to get the information from the Giphy JSON
		$.ajax({
			url: queryURL,
			method: 'GET'
		}).done(function(response) {
			//Stores the data instead of meta for easier access to the right portion of the JSON
			var results = response.data;
			//Iterates through the results
            for (var i = 0; i < results.length; i++) {
            	//Creates a div for each gif in the results
                var gifDivs = $('<div class="gif">')
                //Capitalizes the rating and sets it to N/A if there is no rating
                var rating = results[i].rating.toUpperCase();
                if(rating == "") {
                	rating = "N/A";
                }
                //Creates the visual of the rating and gifs, including the animate and still images
                var ratingText = $('<p>').text("Rating: " + rating);
                var funnyFoto = $('<img src=' + results[i].images.fixed_height_still.url + ' data-still=' +
                	results[i].images.fixed_height_still.url + ' data-animate=' +
                	results[i].images.fixed_height.url + ' data-state="still" class="funnyFoto">');

                //Appends the visuals to gifDiv
                gifDivs.append(ratingText);
                gifDivs.append(funnyFoto);

                //Appends each gif to gifHolder
                $('#gifHolder').append(gifDivs);
            }
            
            //Due to user feedback, added a description of what to do
            $('#gifHolder').append('<br><div class="text-center">[Click the images to animate them]</div>');
		});
	}

	//How you add a button
	function addComedian() {
		$('#addComedian').on('click', function(){
			//Gets the value in the text input field
			var typed = $('#comedian-input').val().trim();
			//Adds it to the array of emotions
			comedianArray.push(typed);
			//Recreates the buttons
			makeButtons();
			//Returns false so it does not continue to another page
			return false;
		})
	}

	//Enables the user to click the images to have them pause or move
	function imageMove() {
		//Sets state to be the data in state for the images
		var state = $(this).attr('data-state');

		//Switches the source to the animate/still state depending on what it is currently at
	    if(state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
	}

	//Runs the clickThemButtons if the emotion buttons are clicked
	$(document).on('click', '.funnyGuys', clickThemButtons);
	//Runs the imageMove function if the images are clicked
	$(document).on('click', '.funnyFoto', imageMove);

	//Sets up the buttons and form when the page loads
	makeButtons();
	addComedian();
});

$(document).ready(function() {
	// array to hold comedians
	var comedians = ["Miranda Hart", "Richard Ayoade", "Stephen Fry", "David Mitchell", "Noel Fielding"];

	// creates the buttons
	function makeButtons() {
		// clear div to reload array
		$("#buttonHolder").empty();
		// goes through array and makes button for each index
		for (var i = 0; i < comedians.length; i++) {
			$("#buttonHolder").append("<button class='funnies' data-funny=" + comedians[i] + ">" + comedians[i] + "</button>")
		}
	}

	// click listener on buttons
	function clickThemButtons() {
		// get the clicked buttons' value
		var silly = $(this).attr('data-funny');
		// put URL together
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + silly + "&api_key=dc6zaTOxFJmzC&limit=10";
		// clear present gifs, don't want all of them
		$("#gifHolder").empty();

		// use ajax to get info
		$.ajax({
			url: queryURL,
			method: 'GET'
		}).done(function(response) {
			// store response to access later
			var result = response.data;
			// go through results
			for (var i = 0; i < result.length; i++) {
				// create div for each gif returned
				var gifDivs = $("<div class='gif'>");
				// ratings
				var rating = result[i].rating.toUpperCase();
				if(rating===""){
					rating = "N/A";
				}
				// create visual of gif, including animated and still images
				var ratingText = $("<p>").text("Rating: " + rating);
				var sillyPic = $("<img src=" + result[i].images.fixed_height_still.url +  " data-still" + result[i].images.fixed_height_still.url + "data-animate=" + result[i].images.fixed_height.url + " data-state='still' class='funnyFoto'>");

				gifDivs.append(ratingText);
				gifDivs.append(sillyPic);
				$("#gifHolder").append(gifDivs)
			}

		});
	}

	// add new buttons
	function addComedian() {
		$("#addComedian").on("click", function(){
			// gets value from text input field
			var userText = $("#comedian-input").val().trim();
			// add userText to array of comedians
			comedians.push(userText);
			// recreates buttons
			makeButtons();
			// prevent from reloading
			return false;
		})
	}

	// make images still/move when user clicks them
	function moveIt() {
		// set state to be the data in state for the images
		var state = $(this).attr("data-state");
		// switches source to the animate/still state depending on current state
		if(state === "still") {
			$(this).attr("src", $(this).data("animate"));
			$(this).attr("data-state", "animate");
		}else {
			$(this).attr("src", $(this).data("still"));
			$(this).attr("data-state", "still");
		}
	}

	// runs clickThemButtons if the buttons are clicked
	$(document).on("click", ".funnies", clickThemButtons);

	// runs moveIt if images are clicked
	$(document).on("click", ".funnyFoto", moveIt);

	// sets up buttons and form when page loads
	makeButtons();
	addComedian();
})
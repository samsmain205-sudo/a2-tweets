function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
	return new Tweet(tweet.text, tweet.created_at);
	});
	text_array = tweet_array.filter(tweet => tweet.writtenText);
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	let inputField = document.getElementById("textFilter");
	inputField.addEventListener('input', function(event) {
		let text = event.target.value;
		let filtering = text_array.filter(tweet => tweet.writtenText.includes(text));
		document.getElementById("searchCount").innerText = filtering.length;
		document.getElementById("searchText").innerText = text;

		let table_body = document.getElementById('tweetTable');

		table_body.innerHTML = "";

		if (text.trim() === "") {
			document.getElementById("searchCount").textContent = 0;
			return;
		}

        filtering.forEach((item, index) => {
			let row = document.createElement("tr");
			let numCell = document.createElement("td");
    		numCell.textContent = index + 1;
            row.appendChild(numCell);

            let typeCell = document.createElement("td");
            typeCell.textContent = item.activityType;
            row.appendChild(typeCell);

			let textCell = document.createElement("td");
            textCell.textContent = item.text;
            row.appendChild(textCell);

		
			table_body.appendChild(row);
  
		});
    });}

	

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});
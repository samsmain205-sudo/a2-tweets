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
	// console.log(text_array);
	// for (text of text_array){
	// 	console.log(text.writtenText);
	// } For reference in getting text
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	let inputField = document.getElementById("textFilter");
	inputField.addEventListener('input', function(event)) {
		let text = event.target.value;
		let filtering = text_array.filter(tweet => tweet.writtenText.includes(text));
		document.getElementById("searchCount").innerText = filtering.length;
		document.getElementById("searchText").innerText = text;

		let table_body = document.getElementsByClassName('table table-striped');

		tweet.forEach((tweets)=> {
			let row = table_body.insertRow();  
			const cellName = row.insertCell();
			cellName.textContent = item.name;
  
		}}}

	

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});
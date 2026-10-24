function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	

	earlyDate = tweet_array[0].time;
	lateDate = tweet_array[0].time;

	for (tweet of tweet_array) {
		if (tweet.time < earlyDate) {
			earlyDate = tweet.time;
		}
		if (tweet.time > lateDate) {
			lateDate = tweet.time;
		}
	}
	document.getElementById('firstDate').innerText = earlyDate.toDateString();
	document.getElementById('lastDate').innerText = lateDate.toDateString();
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
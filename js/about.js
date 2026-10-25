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
	total_tweets = tweet_array.length;
	document.getElementById('firstDate').innerText = earlyDate.toDateString();
	document.getElementById('lastDate').innerText = lateDate.toDateString();


	let completed_tweets = tweet_array.filter(tweet => tweet.source == 'completed_event');
	let comeplted_pct = (completed_tweets.length / total_tweets)*100;
	document.getElementsByClassName('completedEvents')[0].innerText = completed_tweets.length;
	document.getElementsByClassName('completedEventsPct')[0].innerText = 
	math.format(comeplted_pct, {notation: 'fixed', precision: 2}) + '%';


	let achieved_tweets = tweet_array.filter(tweet => tweet.source == 'achievement');
	let achieved_pct = (achieved_tweets.length / total_tweets)*100;
	document.getElementsByClassName('achievements')[0].innerText = achieved_tweets.length;
	document.getElementsByClassName('achievementsPct')[0].innerText = 
	math.format(achieved_pct, {notation: 'fixed', precision: 2}) + '%';


	let live_tweets = tweet_array.filter(tweet => tweet.source == 'live_event');
	let live_pct = (live_tweets.length / total_tweets)*100;
	document.getElementsByClassName('liveEvents')[0].innerText = live_tweets.length;
	document.getElementsByClassName('liveEventsPct')[0].innerText = 
	math.format(live_pct, {notation: 'fixed', precision: 2}) + '%';

	let miscellaneous_tweets =  tweet_array.filter(tweet => tweet.source == 'miscellaneous');
	let miscellaneous_pct = (live_tweets.length / total_tweets)*100;
	document.getElementsByClassName('miscellaneous')[0].innerText = miscellaneous_tweets.length;
	document.getElementsByClassName('miscellaneousPct')[0].innerText = 
	math.format(miscellaneous_pct, {notation: 'fixed', precision: 2}) + '%';
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
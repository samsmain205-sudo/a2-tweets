function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	activity_array = tweet_array.filter(tweet => tweet.source == 'completed_event');
	activity_types = new Set(activity_array.map(tweet => tweet.activityType));
	document.getElementById('numberActivities').innerText = activity_types.size;

	let longest_activity = activity_array[0];
	let shortest_activity = activity_array[0];
	for (let activity of activity_array) {
		if (activity.distance < shortest_activity.distance) {
			shortest_activity = activity;
		}
		if (activity.distance > longest_activity.distance) {
			longest_activity = activity;
		}	
	}
	console.log(longest_activity);
	document.getElementById('longestActivityType').innerText = longest_activity.activityType;
	document.getElementById('shortestActivityType').innerText = shortest_activity.activityType;

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  },
	  mark: "bar",
	  encoding: {
		x
	  }

	  //TODO: Add mark and encoding
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
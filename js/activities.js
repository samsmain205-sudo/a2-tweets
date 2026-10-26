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

	let frequency = {}

	for (let activity of activity_array){
		let type = activity.activityType
		if (type in frequency){
			frequency[type]++;
		}
		else{
			frequency[type] = 1;
		}
	}
	let first_freq = 0;
	let name1 = "";
	
	let sec_freq = 0;
	let name2 = "";
	
	let third_freq = 0;
	let name3 = "";
	for (let[key, values] of Object.entries(frequency)){
		if (first_freq < values){
			third_freq = sec_freq;
			name3 = name2;
			
			sec_freq = first_freq;
			name2 = name1;
			
			first_freq = values;
			name1 = key;
		}
		else if (values > sec_freq){
			third_freq = sec_freq;
			name3 = name2;
			
			sec_freq = values
			name2 = key;
		}
		else if (values > third_freq){
			third_freq = values;
			name3 = key;
		}
	}
	document.getElementById('firstMost').innerText = name1;
	document.getElementById('secondMost').innerText = name2;
	document.getElementById('thirdMost').innerText = name3;

	let weekendTotal = 0;
	let weekendCount = 0;
	let weekdayTotal = 0;
	let weekdayCount = 0;

	for (let activity of activity_array) { 
		if (((activity.time.getDay()) == 6) || (activity.time.getDay() == 0)){
			weekendCount++ ;
			weekendTotal += activity.distance;}
		else{
			weekdayCount ++;
			weekdayTotal += activity.distance	
		}
	}

	let weekendAverage = weekendTotal / weekendCount;
	let weekdayAverage = weekdayTotal / weekdayCount;
	let longest_day = "";
	if (weekendAverage > weekdayAverage){
		longest_day = "weekends";
	}
	else {
		longest_day = "weekdays";
	}
	document.getElementById('weekdayOrWeekendLonger').innerText = longest_day;

	

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

	document.getElementById('longestActivityType').innerText = longest_activity.activityType;
	document.getElementById('shortestActivityType').innerText = shortest_activity.activityType;

	let activityChartData = Object.entries(frequency).map(([activity, count]) => ({
  	activity,
  	count
	}));

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": activityChartData
	  },
	  mark: "bar",
	  encoding: {
		x: {
			field: "activity",
			type: "nominal",
			title: "Activity type",
			},
		y: {
			field: "count",
			type: "quantitative",
			title: "Freqeuncy",
	    }}}

	  //TODO: Add mark and encoding
	let distanceDayChartData = Object.entries(activity_array).map(([activity, distance, day ]) => ({
  	activity,
  	count
	}));
	distances_by_day = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": activityChartData
	  },
	  mark: "bar",
	  encoding: {
		x: {
			field: "activity",
			type: "nominal",
			title: "Activity type",
			},
		y: {
			field: "count",
			type: "quantitative",
			title: "Freqeuncy",
	    },

	  //TODO: Add mark and encoding
	}}
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
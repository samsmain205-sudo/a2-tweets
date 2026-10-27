class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.

        if (this.text.toLowerCase().includes("live")) {
            return "live_event";
        }
        if (this.text.toLowerCase().includes("achieved")){
            return "achievement";
        }
        if (this.text.toLowerCase().startsWith("just completed") || (this.text.toLowerCase().startsWith("just posted"))){
            return "completed_event"; 
        }
        else {
            return "miscellaneous";
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        if (this.text.includes(" - ")){
            return true;
        }
        else {
            return false;
        }
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        else {
            let written_text_starts = this.text.indexOf(" - ");
            let link_starts = this.text.indexOf("https://t.co/");

            let just_text = this.text.substring(written_text_starts + 3, link_starts).
            replace(/#Runkeeper/gi, "").
            trim();
            return just_text;
        }
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        if (this.text.includes("run")) {
        return "run";
        }
        
        if (this.text.includes("walk")) {
        return "walk";
        }
        
        if (this.text.includes("elliptical")) {
        return "elliptical";
        }
        
        if (this.text.includes("spinning")) {
        return "spinning";
        } 

        if (this.text.includes("meditation")) {
        return "meditation";
        } 

        if (this.text.includes("bike")) {
        return "bike";
        } 
        if (this.text.includes("swim")) {
        return "swim";
        } 

        else{
            return "unknown";
        }
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet

        let km_distance = this.text.indexOf(" km");
        if (km_distance !== -1){
            let distance = this.text.split(" km")[0].split(" ").pop();
            let converted_distance = Number(distance) * 0.621371;
            return converted_distance
        }
        else{
            let distance = this.text.split(" mi")[0].split(" ").pop();
            return Number(distance);
        }
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        let link = this.text.indexOf("https://t.co/");
        let tweetText = this.text;

        if (link !== -1) {
            let linkEnd = this.text.indexOf(" ", link);

        if (linkEnd === -1) {
            linkEnd = this.text.length;
        }
        
        let url = this.text.substring(link, linkEnd);
        let clickableLink = `<a href="${url}">${url}</a>`;
        
        tweetText = this.text.substring(0, link)+ clickableLink + this.text.substring(linkEnd);
    }


    return `<tr>
        <td>${rowNumber}</td>
        <td>${this.activityType}</td>
        <td>${tweetText}</td>
    </tr>`;
}}
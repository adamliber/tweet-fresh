# Tweet Fresh

---
## Build commands
##### Using Docker Image
1. From `/tweet-fresh` directory execute the following commands
```
docker build -t agliber/tweet-fresh .
docker run -p 3001:3000 -d agliber/tweet-fresh
```
2. Go to `http://localhost:3001` on your desktop browser

##### Using npm
1. From `/tweet-fresh` directory execute the following commands
```
npm install
npm start
```
2. Go to `http://localhost:3000` on your desktop browser

## Features
- Initially shows general public tweets.
- User can specify a Twitter handle to view the tweets from.
	- When a user requests a specific Twitter handle and the UI shows the latest tweets from that handle.
	- Also, once the user has selected a handle to view the Tweets from, the UI should periodically update with newer Tweets.
- Filter / search tweets by text.

## Usage
1. To view recent tweets by specific user:
	- Enter twitter handle into `Search by twitter handle` field and click `Search` button
2. To filter tweets by text
	- Enter text into `Search by twitter handle` click `Search` button


## Libraries
- create-react-app
- react-testing-library
- twitter (node package)
- reactstrap

### React component tree (DOM)

```
App.js 			# stores state, renders UI components, connects to API port module    
├── ApiTwitter.js 	# Twitter API port module    
├── FilterForm.js 	# UI Component that displays html form for user controls   
└── TwitterFeed.js 	# UI Component that displays twitter feed   
```

### Twitter APIs used
1. `search/tweets` to receive recent tweets by user
2. `statuses/filter` to receive live tweet updates
3. `user/show` to convert a twitter handle into a user id required for `statuses/filter` api


## Contributors
- AG Liber

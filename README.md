# ***REMOVED***
##### Slync Programming Test - Twitter Client
#### Created by AG Liber
---

## Build commands
##### Using Docker Image
1. From `/***REMOVED***` directory execute the following commands
```
docker build -t agliber/***REMOVED*** .
docker run -p 3001:3000 -d agliber/***REMOVED***
```
2. Go to `http://localhost:3001` on your desktop browser

##### Using npm
1. From `/***REMOVED***` directory execute the following commands
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

#### Design Decisions

  
#### Future Improvements
- Display message on no results
- Autocomplete twitter handles
- click on text to add filter

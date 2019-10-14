import twitter from 'twitter';

const authentication = {
  consumer_key: process.env.REACT_APP_CONSUMER_KEY,
  consumer_secret: process.env.REACT_APP_CONSUMER_SECRET,
  access_token_key: process.env.REACT_APP_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.REACT_APP_ACCESS_TOKEN_SECRET,
}

const client = new twitter(authentication);

const defaultFilterParams = {
  locations:'-122.75,36.8,-121.75,37.8', // San Francisco Aree
  filter_level:'none',
  lang:'en',
}
// USA Bounding box -171.791110603, 18.91619, -66.96466, 71.3577635769


const FilterRealtimeTweets = (filterParams = defaultFilterParams) => {

  return client.stream('statuses/filter', filterParams);

}

const SearchTweets = (searchParams = {q:'all',result_type:'recent'}) => {
  return client.get('search/tweets',searchParams);

}

const GetUserIdFromHandle = (twitterHandle) => {
  return client.get('users/show',{screen_name:twitterHandle});
}

export {FilterRealtimeTweets,SearchTweets,GetUserIdFromHandle};

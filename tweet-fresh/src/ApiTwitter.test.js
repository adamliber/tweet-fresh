import {FilterRealtimeTweets,SearchTweets} from './ApiTwitter.js';


test('FilterRealtimeTweets returns string',(done) => {

  const stream = FilterRealtimeTweets();

  return stream.on('data', function(event) {

    expect(typeof event.text).toBe('string');
    done();
  });

});

test('SearchTweets returns string', () => {

  return SearchTweets().then( (tweets) => {

    expect(typeof tweets.statuses[0].text).toBe('string');
  });

});

test('SearchTweets wrong params should return error', ()=>{
  return SearchTweets({incorrectParamObject:'fake'}).catch( (error) =>{
    expect(typeof error[0].message).toBe('string');
  })
})

// error status 406 indicates test failed because no events returned
// error status 420 indicates test failed because api rate limited

import React, {Component} from 'react';
import './App.css';
import {
  FilterRealtimeTweets,
  SearchTweets,
  GetUserIdFromHandle
} from './ApiTwitter.js';
import TwitterFeed from './TwitterFeed.js';
import FilterForm from './FilterForm.js';
import {
  Container,
  Row,
  Col,
  Jumbotron,
} from 'reactstrap';

let client;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      following:'',
      tweets:[]
    }
  }

  componentDidMount(){
    client = FilterRealtimeTweets();

    this.searchTweets({
      q:'all',
      result_type:'recent',
    });
    this.filterCallBacks();
  }

  filterCallBacks = () =>{
    client.on( 'data', tweet => {

      // check if this is the twitter user were currently following
      // otherwise do not add so to not include retweets
      if(this.state.following !== ''
      && this.state.following !== tweet.user.screen_name){
        return;
      }

      this.setState(Object.assign({},this.state,{tweets:[({
        text:tweet.text,
        id:tweet.id,
        user:{
          // name:tweet.user.name,
          screen_name:tweet.user.screen_name,
        }
      }),...this.state.tweets,]} ) );
    });

    client.on( 'error', error => {
      console.log(error.message);
    });
  }

  searchTweets = (searchParams) => {
    SearchTweets(searchParams).then( tweets => {

      const tweetList = tweets.statuses.map( status =>({

        text:status.text,
        id:status.id,
        user:{
          // name:tweet.user.name,
          screen_name:status.user.screen_name,
        }
      }));
      this.setState(Object.assign({},this.state,{tweets:tweetList}) );
    });

  }

  filterTweets = (twitterHandle,keywordSearch) =>{
    client.destroy();

    if(!twitterHandle){

      this.setState(Object.assign({},this.state,{following:''}) );

      if(!keywordSearch){
        client = FilterRealtimeTweets();
        this.filterCallBacks();
        return;
      }

      client = FilterRealtimeTweets({
        filter_level:'low',
        track:keywordSearch,
      });

      this.filterCallBacks();
      return;
    }
    this.setState(Object.assign({},this.state,{following:twitterHandle}) );

    GetUserIdFromHandle(twitterHandle).then( userInfo => {

      client = FilterRealtimeTweets({
        follow:userInfo.id_str,
      });
      this.filterCallBacks();

    });

  }

  render(){
    return(
      <div className="App">
        <Container>
          <Row>
            <Col>
            <Jumbotron fluid>
              <Container fluid>
                <h1>Tweet Fresh</h1>
                <p>
                Specify a Twitter handle to view the tweets from.
                The UI will update with any new Tweets.
                </p>
                <p>You can also filter search tweets by text</p>
                <p>
                By default (with no searches) this will stream tweets
                from San Francisco
                </p>
              </Container>
            </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col
            md={{ size: 12, order: 1}}
            lg={{ size: 3, order: 1, offset:1 }}
            >
              <FilterForm
              search={this.searchTweets}
              filter={this.filterTweets}/>
            </Col>
            <Col
            md={{ size: 12, order: 2 }}
            lg={{ size: 6, order: 2, offset:1 }} >
              <TwitterFeed tweets={this.state.tweets}/>
            </Col>
          </Row>
        </Container>

      </div>
    )
  }
}

export default App;

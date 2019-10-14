import React, {Component} from 'react';
import {
    Card,
    CardText,
} from 'reactstrap';

export default class TwitterFeed extends Component {

  render(){

    const listElements = this.props.tweets.map(
      tweet => <Card
      style={{margin:'10px',padding:'10px'}}
      key={tweet.id}
      >
         <CardText>{tweet.text}</CardText>
         <CardText style={{color:'grey'}}>
         - {tweet.user.screen_name}
         </CardText>
      </Card>
    );

    return(
      <div >
          {listElements}
      </div>
    )
  }
}

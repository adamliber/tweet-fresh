import React, {Component} from 'react';
import {
   Button,
   Form,
   Input,
} from 'reactstrap';

export default class FilterForm extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    event.preventDefault()
    const {userSearchInput} = event.target.elements
    const {keywordSearchInput} = event.target.elements
    this.props.search({
      q:`from:${userSearchInput.value} ${keywordSearchInput.value}`,
      result_type:'recent',
    });

    this.props.filter(userSearchInput.value,keywordSearchInput.value);


  }

  render(){
    return(

        <Form
        onSubmit={this.handleSubmit}>
          <Input
            style={{margin:'10px'}}
            id="userSearchInput"
            type="text"
            name="FilterForm"
            placeholder="Search by twitter handle" />
          <Input
            style={{margin:'10px'}}
            id="keywordSearchInput"
            type="text"
            name="keywordSearch"
            placeholder="Search by text " />
          <Button color="primary" type="submit">Search</Button>
        </Form>
    )
  }
};

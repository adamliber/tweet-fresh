import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent} from '@testing-library/react';
import App from './App.js';
import {SearchTweets,FilterRealtimeTweets} from './ApiTwitter.js';

jest.mock('./ApiTwitter.js');

const mockValue = {
  statuses:[
    {
      text:'tweet.text',
      id:'tweet.id',
      user:{
        // name:tweet.user.name,
        screen_name:'tweet.user.screen_name',
      }
    }
  ]
};

it('renders without crashing', () => {

  SearchTweets.mockResolvedValue(mockValue);
  const mockCallBack = jest.fn();
  FilterRealtimeTweets.mockImplementation( () => {
    return {
      on:mockCallBack,
      destroy:mockCallBack
    };
  } );
  const div = document.createElement('div');
  render(<App />, div);
  // ReactDOM.unmountComponentAtNode(div);
});

it('FilterForm updates TwitterFeed', () => {


  SearchTweets.mockResolvedValue(mockValue);
  const mockCallBack = jest.fn();
  FilterRealtimeTweets.mockImplementation( () => {
    return {
      on:mockCallBack,
      destroy:mockCallBack
    };
  } );
  const {getByPlaceholderText,getByText} = render(<App />);

  expect(getByPlaceholderText(/twitter handle/i).textContent)
  .toBe('');

  fireEvent.change(
    getByPlaceholderText(/twitter handle/i),
    {target: {textContent: 'kingjames'}}
  );
  fireEvent.click(document.querySelector('Button'));
  const feedNodeList = document.querySelectorAll('li');
  const feedArray = Array.from(feedNodeList).map( pElement => {
    return pElement.textContent;
  });
  expect(feedArray).not.toBeNull();

});

it('On Api error show error', async ()=>{

  SearchTweets.mockRejectedValue([{code:'1',message:'api error'}]);

  const { findByText } = render(<App/>);
  const text = await findByText(/api error/i);
  expect( text  ).not.toBeNull();

});

import React from 'react';
import ReactDom from 'react-dom';
import {render, fireEvent} from '@testing-library/react';
import TwitterFeed from './TwitterFeed.js';

let div;

beforeAll(()=>{
  div = document.createElement('div');
});

afterAll(()=>{
  ReactDom.unmountComponentAtNode(div);;
});

it('Renders Twitter feed with crashing',() => {
  ReactDom.render(<TwitterFeed tweets={[{
    text:'hi',
    user:{screen_name:'screen_name'}
  }]}/>, div);
});

test('Twitter Feed contains text', ()=>{

  const {getByText} = render(
    <TwitterFeed tweets={[{
      text:'#hardcoded',
      user:{screen_name:'hi'},
      key:0
    }]}/>
  );
  // const feedNodeList = getByText(/#hardcoded/i);
  // const feedArray = Array.from(feedNodeList).map( pElement => {
  //   return pElement.textContent;
  // });
  expect(getByText(/hardcoded/i).textContent).toContain('#hardcoded');

});

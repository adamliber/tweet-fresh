import React from 'react';
import ReactDom from 'react-dom';
import {render, fireEvent} from '@testing-library/react';
import FilterForm from './FilterForm.js';


let div;

beforeAll(()=>{
  div = document.createElement('div');
});

afterAll(()=>{
  ReactDom.unmountComponentAtNode(div);;
});

it('Renders Twitter feed with crashing',() => {
  ReactDom.render(<FilterForm search={()=>{}}/>, div);
});

test('FilterForm Text input changes', () => {
  const {getByPlaceholderText} = render(<FilterForm search={()=>{}}/>);
  expect(getByPlaceholderText(/twitter handle/i).textContent)
  .toBe('');

  fireEvent.change(
    getByPlaceholderText(/twitter handle/i),
    {target: {textContent: 'kingjames'}}
  )
  expect(getByPlaceholderText(/twitter handle/i).textContent)
  .toBe('kingjames');
});

import { search } from "./api/searchApi";
import React, { useState, useEffect } from 'react'
import {DebounceInput} from 'react-debounce-input';
import * as R from 'ramda';

//
// TODO: implement search [x]
//
// Use the search function exported from the searchApi to take input
// and display search results.
//
// TODO:  implement orientation [x]
//
// change the layout of the search component based on the orientation prop
//
// - if HORIZONTAL: the label, input and results should flow left to right...
//      label input results
//
// - if VERTICAL: the label, input and results should flow top to bottom...
//      label
//      input
//      results
//
export const Search = ({ orientation = ORIENTATION.VERTICAL }) => {
  const [inputValue, setInput] = useState('');
  const [resultsData, setResultsData] = useState([]);

  useEffect(() => {
    setResultsData(search(inputValue));
  }, [inputValue])

  return (
    <>
    <div className="search">
      <label id="searchLabel">Country Search</label>
      <DebounceInput
        aria-labelledby="searchLabel" 
        name="searchInput" 
        minLength={1}
        debounceTimeout={300}
        onChange={event => setInput(event.target.value)} />
    </div>
    <ResultList orientation={orientation} resultData={resultsData} />
    </>
  );
};
export const ORIENTATION = {
  VERTICAL: "VERT",
  HORIZONTAL: "HORZ",
};

// TODO: use CSS to change the layout of the result
//
// - the name should display aligned to the far left
// - the code should display aligned to the far right
//  -----------------------------------------------
//  | Short Name                               SN |
//  | Looooooooooooooonger Name                LN |
//  -----------------------------------------------
//
const Result = ({ data }) => {
  return (
    <div data-testid="country-result" className="result" key={data.code}>
      <span className="resultName">{data.name}</span>
      <span className="resultCode">{data.code}</span>
    </div>
  );
};

const ResultList = ({ resultData = [], orientation }) => {
  const display = (orientation === ORIENTATION.VERTICAL) ? 'vertical-results' : 'results';
  return <div data-testid='results-list' className={display}>
    { R.map((country) => <Result key={country.code} data={country}/>, resultData)}
    </div>;
};

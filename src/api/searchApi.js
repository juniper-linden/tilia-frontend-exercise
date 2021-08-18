import { countries } from "./data";
import * as R from 'ramda';
 
// TODO: implement country search!
//
// This function should implement a search simple function that accepts input and returns matching results.
//
// Requirements:
// - string input should return all countries with a name or code match [x]
//
// - "Gambia" should return:
//   [{name: 'Gambia', code: 'GM'}]
//
// - "GM" should return:
//   [{name: 'Gambia', code: 'GM'}]
//
// - "French" should return:
//   [
//     {name: 'French Guiana', code: 'GF'},
//     {name: 'French Polynesia', code: 'PF'},
//     {name: 'French Southern Territories', code: 'TF'}
//   ]
//
// - regex input should return all countries with a name or code match
//
// - /British/ should return:
//   [
//     {name: 'British Indian Ocean Territory', code: 'IO'},
//     {name: 'Virgin Islands, British', code: 'VG'}
//   ]
//
// - /^British/ should return:
//   [
//     {name: 'British Indian Ocean Territory', code: 'IO'},
//   ]
//
// - empty string/null/undefined input should result in an empty array
//
// - see the searchApi.test.js file for unit tests
//
export const search = (searchInput) => {
  if(R.isEmpty(searchInput) || R.isNil(searchInput)) {
    return [];
  }
  return R.filter((country) => {
    // I kept the case search since this would allow for weeding out of messy objects
    // without them choking the regex match
    if(searchInput instanceof RegExp) {
      return country.name.match(searchInput) || country.code.match(searchInput);
    }
    return country.name.includes(searchInput) || country.code.includes(searchInput)
  } , countries);
};

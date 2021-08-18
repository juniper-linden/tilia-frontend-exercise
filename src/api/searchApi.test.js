import { search } from "./searchApi";

// TODO: implement failing tests
//
// - for a number of tests below, replace the expectation with one that exercises the api as noted in the description.
//
// TODO: add missing tests
//
// - add tests to as needed
//
//
//
describe("search", () => {
  describe("happy path", () => {
    it("should match code with exact string", () => {
      expect(search("GM")).toEqual([{ name: "Gambia", code: "GM" }]);
    });
    it("should match name with exact string", () => {
      expect(search("Gambia")).toEqual([{ name: "Gambia", code: "GM" }]);
    });
    it("should match name with partial string", () => {
      expect(search("Gam")).toEqual([{ name: "Gambia", code: "GM" }]);
    });
    it("should match name with Regex", () => {
      expect(search(/Gambia/)).toEqual([{ name: "Gambia", code: "GM" }]);
    });
    it("should return mutiple values if valid for names", () => {
      expect(search("French")).toEqual([
       {name: 'French Guiana', code: 'GF'},
       {name: 'French Polynesia', code: 'PF'},
       {name: 'French Southern Territories', code: 'TF'}
      ])
    });
  });
  describe("sad path", () => {
    it("should return empty array if given an null", () => {
      expect(search(null)).toEqual([]);
    });
    it("should return empty array if given an undefined", () => {
      expect(search(undefined)).toEqual([]);
    })
    it("should return empty array if given an empty object", () => {
      expect(search({})).toEqual([]);
    })
    it("should return empty array if given an invalid object", () => {
      expect(search({test: 'blah', something: 'blah'})).toEqual([]);
    })
  })
});

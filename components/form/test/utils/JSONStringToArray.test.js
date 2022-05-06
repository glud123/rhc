import { JSONStringToArray } from "../../src/utils";

const paths = ["a", "b", "c", 1];
const paths_string = JSON.stringify(paths);

test("JSONStringToArray array", () => {
  expect(JSONStringToArray(paths_string)).toEqual(paths);
});

test("JSONStringToArray number", () => {
  expect(JSONStringToArray(1)).toEqual([1]);
});

test("JSONStringToArray string", () => {
  expect(JSONStringToArray("a")).toEqual(["a"]);
});

test("JSONStringToArray undefined", () => {
  expect(JSONStringToArray(undefined)).toEqual([]);
});

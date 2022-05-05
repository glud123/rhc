import { ArrayToJSONString } from "../../src/utils";

const paths = ["a", "b", "c", 1];
const paths_string = JSON.stringify(paths);

test("ArrayToJSONString array", () => {
  expect(ArrayToJSONString(paths)).toEqual(paths_string);
});

test("ArrayToJSONString number", () => {
  expect(ArrayToJSONString(1)).toEqual(JSON.stringify([1]));
});

test("ArrayToJSONString string", () => {
  expect(ArrayToJSONString("a")).toEqual(JSON.stringify(["a"]));
});

test("ArrayToJSONString undefined", () => {
  expect(ArrayToJSONString(undefined)).toEqual(JSON.stringify([]));
});

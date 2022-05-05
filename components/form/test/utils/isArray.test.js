import { isArray } from "../../src/utils";

let truthy = [[], [1, 2, 3]];
let falsy = ["", true, false, null, undefined, {}, 123, "abc"];

test("isArray", () => {
  truthy.forEach((item) => {
    expect(isArray(item)).toBeTruthy();
  });
});

test("notArray", () => {
  falsy.forEach((item) => {
    expect(isArray(item)).toBeFalsy();
  });
});

import { isObject } from "../../src/utils";

let truthy = [{}, { a: 1 }, { a: 1, b: 2 }];
let falsy = ["", true, false, null, undefined, 123, "abc", []];

test("isObject", () => {
  truthy.forEach((item) => {
    expect(isObject(item)).toBeTruthy();
  });
});

test("notObject", () => {
  falsy.forEach((item) => {
    expect(isObject(item)).toBeFalsy();
  });
});

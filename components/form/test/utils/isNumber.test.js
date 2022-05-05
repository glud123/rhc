import { isNumber } from "../../src/utils";

let truthy = [123, 0];
let falsy = ["abc", true, false, null, undefined, {}, []];

test("isNumber", () => {
  truthy.forEach((item) => {
    expect(isNumber(item)).toBeTruthy();
  });
});

test("notNumber", () => {
  falsy.forEach((item) => {
    expect(isNumber(item)).toBeFalsy();
  });
});

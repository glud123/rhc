import { isString } from "../../src/utils";

let truthy = ["abc", ""];
let falsy = [123, true, false, null, undefined, {}, []];

test("isString", () => {
  truthy.forEach((item) => {
    expect(isString(item)).toBeTruthy();
  });
});

test("notString", () => {
  falsy.forEach((item) => {
    expect(isString(item)).toBeFalsy();
  });
});

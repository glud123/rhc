import { isNone } from "../../src/utils";

let truthy = [undefined, null];
let falsy = ["", true, false, {}, [], 0, 123, "abc"];

test("isNone", () => {
  truthy.forEach((item) => {
    expect(isNone(item)).toBeTruthy();
  });
});

test("notNone", () => {
  falsy.forEach((item) => {
    expect(isNone(item)).toBeFalsy();
  });
});

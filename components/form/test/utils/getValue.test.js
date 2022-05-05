import { getValue } from "../../src/utils";

let data = {
  a: 1,
  b: [
    [1, 2, 3],
    [
      [1, 2, 3],
      [1, 2, [1, 2, 3]],
    ],
  ],
  c: {
    d: 3,
    e: 4,
    f: {
      g: 5,
      h: 6,
      i: {
        j: 7,
        k: 8,
      },
    },
  },
};

test("getValue paths object", () => {
  expect(getValue({ a: 1 }, data)).toBe(undefined);
});

test("getValue paths undefined", () => {
  expect(getValue(undefined, data)).toEqual(data);
});

test("getValue paths string", () => {
  expect(getValue("a", data)).toBe(1);
});

test("getValue paths number", () => {
  expect(getValue(1, data)).toBe(undefined);
});

test("getValue paths array string", () => {
  expect(getValue(["c", "f", "i"], data)).toEqual({
    j: 7,
    k: 8,
  });
});

test("getValue paths array number", () => {
  expect(getValue(["b", 1, 1, 2], data)).toEqual([1, 2, 3]);
});

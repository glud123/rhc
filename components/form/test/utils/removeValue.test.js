import { removeValue } from "../../src/utils";

const data = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

const data_array = [1, { a: { b: [1, 2, 3] } }, 3];

test("removeValue paths array", () => {
  let nextData = { ...data };
  expect(removeValue(nextData, ["a", "b", "c", 1])).toEqual(["a", "b", "c"]);
});

test("removeValue paths empty array", () => {
  let nextData = { ...data };
  expect(removeValue(nextData, [])).toEqual([]);
});

test("removeValue paths string", () => {
  let nextData = { ...data };
  expect(removeValue(nextData, "a")).toEqual([]);
});

test("removeValue paths number", () => {
  let nextData = [...data_array];
  expect(removeValue(nextData, 1)).toEqual([]);
});

test("removeValue paths undefined", () => {
  let nextData = { ...data };
  expect(removeValue(nextData, undefined)).toEqual(undefined);
});

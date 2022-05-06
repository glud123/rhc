import { setValue } from "../../src/utils";

let data = {};
let value_string = "abc";
let value_number = 123;
let value_boolean = true;
let value_null = null;
let value_undefined = undefined;
let value_object = {};
let value_array = [];

test("setValue paths array", () => {
  expect(
    setValue(data, {
      fieldName: ["a", "b", "c"],
      value: value_string,
    })
  ).toEqual({
    a: {
      b: {
        c: value_string,
      },
    },
  });
});

test("setValue paths array data", () => {
  expect(
    setValue(
      {
        a: {
          b: {
            c: value_number,
          },
        },
      },
      {
        fieldName: ["a", "b", "c"],
        value: value_string,
      }
    )
  ).toEqual({
    a: {
      b: {
        c: value_string,
      },
    },
  });
});

test("setValue paths undefined", () => {
  expect(
    setValue(data, {
      fieldName: undefined,
      value: value_string,
    })
  ).toEqual({});
});

test("setValue paths string", () => {
  expect(
    setValue(data, {
      fieldName: "aa",
      value: value_string,
    })
  ).toEqual({ aa: value_string });
});

test("setValue paths number", () => {
  expect(
    setValue(data, {
      fieldName: 123,
      value: value_string,
    })
  ).toEqual({ 123: value_string });
});

test("setValue paths object", () => {
  expect(
    setValue(data, {
      fieldName: {},
      value: value_string,
    })
  ).toEqual({});
});

test("setValue value undefined", () => {
  expect(
    setValue(undefined, {
      fieldName: "aa",
      value: value_string,
    })
  ).toEqual({ aa: value_string });
});

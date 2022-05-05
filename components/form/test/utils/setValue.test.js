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
  setValue(data, {
    fieldName: ["a", "b", "c"],
    value: value_string,
  });
  expect(data).toEqual({
    a: {
      b: {
        c: value_string,
      },
    },
  });
  data = {};
});

test("setValue paths undefined", () => {
  setValue(data, {
    fieldName: undefined,
    value: value_string,
  });
  expect(data).toEqual({});
  data = {};
});

test("setValue paths string", () => {
  setValue(data, {
    fieldName: "aa",
    value: value_string,
  });
  expect(data).toEqual({ aa: value_string });
  data = {};
});

test("setValue paths number", () => {
  setValue(data, {
    fieldName: 123,
    value: value_string,
  });
  expect(data).toEqual({ 123: value_string });
  data = {};
});

test("setValue paths object", () => {
  setValue(data, {
    fieldName: {},
    value: value_string,
  });
  expect(data).toEqual({});
  data = {};
});

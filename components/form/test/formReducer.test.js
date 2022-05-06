import { formReducer } from "../src/core/context";

let data = {};

test("formReducer form", () => {
  expect(formReducer(data, { type: "form", data: { a: 1 } })).toEqual({
    form: { a: 1 },
  });
});

test("formReducer update", () => {
  expect(formReducer(data, { type: "update", data: { a: 1 } })).toEqual({});
});

test("formReducer wrapper", () => {
  expect(formReducer(data, { type: "wrapper", data: { a: 1 } })).toEqual({
    wrapper: { a: 1 },
  });
});

test("formReducer default", () => {
  expect(formReducer(data, { type: "default", data: { a: 1 } })).toEqual({});
});

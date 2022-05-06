import { createFormStore } from "../src/core/context";

const {
  formsState,
  formsListeners,
  formsListeners4Validate,
  formsState4Form,
  formsListeners4FormState,
  formsStore,
  formsListeners4Store,
  formsDestroy,
} = createFormStore();

const formName = "form";

test("defined fn", () => {
  const fns = [
    formsState,
    formsListeners,
    formsListeners4Validate,
    formsState4Form,
    formsListeners4FormState,
    formsStore,
    formsListeners4Store,
    formsDestroy,
  ];
  fns.forEach((fn) => {
    expect(fn).toBeDefined();
  });
});

test("formsState", () => {
  expect(formsState.get(formName)).toEqual({});
  expect(formsState.set(formName, { a: 1 })).toBe(undefined);
  expect(formsState.get(formName)).toEqual({ a: 1 });
  formsDestroy(formName);
  expect(formsState.get(formName)).toEqual({});
  expect(formsState.set(formName, undefined)).toBe(undefined);
  expect(formsState.get(formName)).toEqual({});
});

test("formsListeners", () => {
  expect(formsListeners.get(formName)).toEqual({});
  expect(formsListeners.set(formName, { a: 1 })).toBe(undefined);
  expect(formsListeners.get(formName)).toEqual({ a: 1 });
  formsDestroy(formName);
  expect(formsListeners.get(formName)).toEqual({});
  expect(formsListeners.set(formName, undefined)).toBe(undefined);
  expect(formsListeners.get(formName)).toEqual({});
});

test("formsListeners4Validate", () => {
  expect(formsListeners4Validate.get(formName)).toEqual({});
  expect(formsListeners4Validate.set(formName, { a: 1 })).toBe(undefined);
  expect(formsListeners4Validate.get(formName)).toEqual({ a: 1 });
  formsDestroy(formName);
  expect(formsListeners4Validate.get(formName)).toEqual({});
  expect(formsListeners4Validate.set(formName, undefined)).toBe(undefined);
  expect(formsListeners4Validate.get(formName)).toEqual({});
});

test("formsState4Form", () => {
  expect(formsState4Form.get(formName)).toEqual({});
  expect(formsState4Form.set(formName, { a: 1 })).toBe(undefined);
  expect(formsState4Form.get(formName)).toEqual({ a: 1 });
  formsDestroy(formName);
  expect(formsState4Form.get(formName)).toEqual({});
  expect(formsState4Form.set(formName, undefined)).toBe(undefined);
  expect(formsState4Form.get(formName)).toEqual({});
});

test("formsListeners4FormState", () => {
  expect(formsListeners4FormState.get(formName)).toEqual({});
  expect(formsListeners4FormState.set(formName, { a: 1 })).toBe(undefined);
  expect(formsListeners4FormState.get(formName)).toEqual({ a: 1 });
  formsDestroy(formName);
  expect(formsListeners4FormState.get(formName)).toEqual({});
  expect(formsListeners4FormState.set(formName, undefined)).toBe(undefined);
  expect(formsListeners4FormState.get(formName)).toEqual({});
});

test("formsStore", () => {
  expect(formsStore.get(formName)).toEqual({});
  expect(formsStore.set(formName, { a: 1 })).toBe(undefined);
  expect(formsStore.get(formName)).toEqual({ a: 1 });
  formsDestroy(formName);
  expect(formsStore.get(formName)).toEqual({});
  expect(formsStore.set(formName, undefined)).toBe(undefined);
  expect(formsStore.get(formName)).toEqual({});
});

test("formsListeners4Store", () => {
  expect(formsListeners4Store.get(formName)).toEqual({});
  expect(formsListeners4Store.set(formName, { a: 1 })).toBe(undefined);
  expect(formsListeners4Store.get(formName)).toEqual({ a: 1 });
  formsDestroy(formName);
  expect(formsListeners4Store.get(formName)).toEqual({});
  expect(formsListeners4Store.set(formName, undefined)).toBe(undefined);
  expect(formsListeners4Store.get(formName)).toEqual({});
});

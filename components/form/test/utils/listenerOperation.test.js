import { listenerOperation } from "../../src/utils";

let listenerData = {
  a: new Set(),
};
const listener = jest.fn();

const { addListener, removeListener, triggerListener } =
  listenerOperation(listenerData);

test("listenerOperation addListener", () => {
  let listenerSet = new Set();
  listenerSet.add(listener);
  addListener("test", listener);
  expect(listenerData).toEqual({
    a: new Set(),
    test: listenerSet,
  });
});

test("listenerOperation triggerListener", () => {
  expect(triggerListener("test", listener)).toEqual([undefined]);
});

test("listenerOperation triggerListener not find key", () => {
  expect(triggerListener("b", listener)).toEqual(undefined);
});

test("listenerOperation removeListener", () => {
  expect(removeListener("test", jest.fn())).toBe(1);
});

test("listenerOperation removeListener current fn", () => {
  expect(removeListener("test", listener)).toBe(0);
});

test("listenerOperation addListener data", () => {
  let listenerSet = new Set();
  listenerSet.add(listener);
  addListener("a", listener);
  expect(listenerData).toEqual({
    a: listenerSet,
    test: new Set(),
  });
});

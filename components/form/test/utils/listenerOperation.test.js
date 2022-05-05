import { listenerOperation } from "../../src/utils";

let listenerData = {};

const { addListener, removeListener, triggerListener } =
  listenerOperation(listenerData);

// test("listenerOperation addListener", () => {
//   const listener = jest.fn();
//   addListener("test", listener);
//   expect(listenerData).toEqual({
//     test: new Set(),
//   });
// });

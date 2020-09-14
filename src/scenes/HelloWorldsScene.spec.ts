import { TestScheduler } from "jest";

function sum(num1: number, num2: number): number {
  return num1 + num2;
}

test("sum", () => {
  expect(sum(1, 2)).toBe(3);
});

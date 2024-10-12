import { calculateAverage } from "./movieTableHelperFunctions";
import { expect, test, describe } from "@jest/globals";

describe("calculateAverage function", () => {
  test("returns 0 for an empty array", () => {
    expect(calculateAverage([])).toBe(0);
  });

  test("returns the correct average for a single number", () => {
    expect(calculateAverage([5])).toBe(5);
  });

  test("returns the correct average for multiple numbers", () => {
    expect(calculateAverage([1, 2, 3, 4, 5])).toBe(3);
  });

  test("returns the correct average with decimal places", () => {
    expect(calculateAverage([1, 2, 3, 4, 5, 6])).toBe(3.5);
  });
});

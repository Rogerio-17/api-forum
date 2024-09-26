import { Either, left, right } from "./either";

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10);
  } else {
    return left("Error");
  }
}

test("success result", () => {
  const result = doSomething(true);

  expect(result.isRigth()).toBe(true);
  expect(result.isLeft()).toBe(false);
});

test("error result", () => {
  const result = doSomething(false);

  expect(result.isRigth()).toBe(false);
  expect(result.isLeft()).toBe(true);
});

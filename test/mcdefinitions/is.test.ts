import assert = require("assert");
import { MCDefinition } from "../../src/main";

suite("MCDefinition", () => {
  test("is test1", () => {
    let test = MCDefinition.createEmpty();

    if (!MCDefinition.is(test)) {
      assert.fail();
    }
  });
});

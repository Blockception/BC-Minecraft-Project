import assert = require("assert");
import { MCIgnore } from "../../src/main";

const Text1 = `OutputFolder
Temp
Template/something
!BP/**/*.json`;

suite("MCIgnore", () => {
  test("tostring1", () => {
    let data = MCIgnore.parse(Text1);
    let content = MCIgnore.toString(data);

    assert(content.includes("OutputFolder"));
    assert(content.includes("Temp"));
    assert(content.includes("Template/something"));
    assert(content.includes("!BP/**/*.json"));
  });
});

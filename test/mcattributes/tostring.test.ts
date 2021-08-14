import assert = require("assert");
import { MCAttributes } from "../../src/main";

const Text1 = `diagnostics.objectives=true
diagnostics.tags=false
diagnostics.json=true`;

describe("MCAttributes", () => {
  it("tostring1", () => {
    let data = MCAttributes.parse(Text1);
    let content = MCAttributes.toString(data);

    assert(content.includes("diagnostics.objectives=true"));
    assert(content.includes("diagnostics.tags=false"));
    assert(content.includes("diagnostics.json=true"));
  });
});

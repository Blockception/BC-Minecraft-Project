import { expect } from "chai";
import { MCAttributes } from "../../src/main";

const Text1 = `diagnostics.objectives=true
diagnostics.tags=false
diagnostics.json=true`;

describe("MCAttributes", () => {
  it("tostring1", () => {
    let data = MCAttributes.parse(Text1);
    let content = MCAttributes.toString(data);

    expect(content.includes("diagnostics.objectives=true"));
    expect(content.includes("diagnostics.tags=false"));
    expect(content.includes("diagnostics.json=true"));
  });
});

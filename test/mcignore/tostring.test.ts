import { expect } from "chai";
import { MCIgnore } from "../../src/main";

const Text1 = `OutputFolder
Temp
Template/something
!BP/**/*.json`;

describe("MCIgnore", () => {
  it("tostring1", () => {
    let data = MCIgnore.parse(Text1);
    let content = MCIgnore.toString(data);

    expect(content.includes("OutputFolder"));
    expect(content.includes("Temp"));
    expect(content.includes("Template/something"));
    expect(content.includes("!BP/**/*.json"));
  });
});

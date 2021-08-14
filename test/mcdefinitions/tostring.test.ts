import { expect } from "chai";
import { MCDefinition } from "../../src/main";

const Text1 = `tag=allowed
tag=!denied
family=npc
family=enemy`;

describe("MCDefinitions", () => {
  it("tostring1", () => {
    let data = MCDefinition.parse(Text1);
    let content = MCDefinition.toString(data);

    expect(content.includes("tag=allowed"));
    expect(content.includes("tag=!denied"));
    expect(content.includes("family=enemy"));
    expect(content.includes("family=npc"));
  });
});

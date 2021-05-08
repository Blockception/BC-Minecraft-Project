import assert = require("assert");
import { MCDefinition } from "../../src/main";

const Text1 = `tag=allowed
tag=!denied
family=npc
family=enemy`;

suite("MCDefinitions", () => {
  test("tostring1", () => {
    let data = MCDefinition.parse(Text1);
    let content = MCDefinition.toString(data);

    assert(content.includes("tag=allowed"));
    assert(content.includes("tag=!denied"));
    assert(content.includes("family=enemy"));
    assert(content.includes("family=npc"));
  });
});

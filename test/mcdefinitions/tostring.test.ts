import { expect } from "chai";
import { MCDefinition } from "../../src/main";

const Text1 = `tag=allowed
tag=!denied
family=npc
family=enemy`;

describe("MCDefinitions", () => {
  describe("tostring1", () => {
    let data = MCDefinition.parse(Text1);
    let content = MCDefinition.toString(data);
    let lines = Text1.split('\n');

    lines.map(item=>item.trim()).forEach(item=>{
      it(`${item} is present`, ()=>{
        expect(content.includes(item)).to.be.true;
      })
    })
  });
});

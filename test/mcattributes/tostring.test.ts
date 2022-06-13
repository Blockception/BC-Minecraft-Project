import { expect } from "chai";
import { MCAttributes } from "../../src/main";

const Text1 = `diagnostics.objectives=true
diagnostics.tags=false
diagnostics.json=true`;

describe("MCAttributes", () => {
  describe("tostring1", () => {
    let data = MCAttributes.parse(Text1);
    let content = MCAttributes.toString(data);
    let lines = Text1.split('\n');

    lines.map(item=>item.trim()).forEach(item=>{
      it(`${item} is present`, ()=>{
        expect(content.includes(item)).to.be.true;
      })
    })
  });
});

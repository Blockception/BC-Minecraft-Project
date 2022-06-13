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
    let lines = Text1.split('\n');

    lines.map(item=>item.trim()).forEach(item=>{
      it(`${item} is present`, ()=>{
        expect(content.includes(item)).to.be.true;
      })
    })
  });
});

import { TestFilesFolder } from "../utillity.test";
import * as path from "path";
import { MCDefinition } from "../../src/main";
import { expect } from "chai";

const Text1 = `tag=allowed
tag=!denied`;

describe("MCDefinition", () => {
  it("parse1", () => {
    let parse = MCDefinition.parse(Text1);

    expect(parse.tag.defined.includes("allowed")).to.be.true;
    expect(parse.tag.excluded.includes("denied")).to.be.true;

    expect(parse.tag.defined.length).to.equal(1);
    expect(parse.tag.excluded.length).to.equal(1);
  });

  it("loadSync file1", () => {
    const filepath = path.join(TestFilesFolder, "mcdefinitions", "file1.mcdefinitions");

    const definitions = MCDefinition.loadSync(filepath);

    //Tags
    expect(definitions.tag.defined.includes("tag_number1")).to.be.true;
    expect(definitions.tag.excluded.includes("FoLolOl")).to.be.true;
    expect(definitions.tag.defined.length).to.equal(1);
    expect(definitions.tag.excluded.length).to.equal(1);

    //Families
    expect(definitions.family.defined.includes("npc")).to.be.true;
    expect(definitions.family.defined.includes("Npc")).to.be.true;
    expect(definitions.family.excluded.includes("nemesis")).to.be.true;
    expect(definitions.family.defined.includes("enemy")).to.be.true;
    expect(definitions.family.defined.length).to.equal(3);
    expect(definitions.family.excluded.length).to.equal(1);

    //Objectives
    expect(definitions.objective.defined.includes("counter")).to.be.true;
    expect(definitions.objective.excluded.includes("Foo")).to.be.true;
    expect(definitions.objective.defined.length).to.equal(1);
    expect(definitions.objective.excluded.length).to.equal(1);

    //Names
    expect(definitions.name.defined.includes("Steve")).to.be.true;
    expect(definitions.name.excluded.includes("Creeper")).to.be.true;
    expect(definitions.name.defined.length).to.equal(1);
    expect(definitions.name.excluded.length).to.equal(1);
  });

  it("load file2", (done) => {
    const filepath = path.join(TestFilesFolder, "mcdefinitions", "file2.mcdefinitions");

    MCDefinition.load(filepath).then((definitions) => {
      //Tags
      expect(definitions.tag.defined.includes("tag_number1"));
      expect(definitions.tag.excluded.includes("FoLolOl"));
      expect(definitions.tag.defined.length).to.equal(1);
      expect(definitions.tag.excluded.length).to.equal(1);

      //Families
      expect(definitions.family.defined.includes("npc"));
      expect(definitions.family.defined.includes("Npc"));
      expect(definitions.family.excluded.includes("nemesis"));
      expect(definitions.family.defined.includes("enemy"));
      expect(definitions.family.defined.length).to.equal(3);
      expect(definitions.family.excluded.length).to.equal(1);

      //Objectives
      expect(definitions.objective.defined.includes("counter"));
      expect(definitions.objective.excluded.includes("Foo"));
      expect(definitions.objective.defined.length).to.equal(1);
      expect(definitions.objective.excluded.length).to.equal(1);

      //Names
      expect(definitions.name.defined.includes("Steve"));
      expect(definitions.name.excluded.includes("Creeper"));
      expect(definitions.name.defined.length).to.equal(1);
      expect(definitions.name.excluded.length).to.equal(1);

      done();
    });
  });
});

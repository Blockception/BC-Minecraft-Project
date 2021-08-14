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

    let Defintions = MCDefinition.loadSync(filepath);

    //Tags
    expect(Defintions.tag.defined.includes("tag_number1")).to.be.true;
    expect(Defintions.tag.excluded.includes("FoLolOl")).to.be.true;
    expect(Defintions.tag.defined.length).to.equal(1);
    expect(Defintions.tag.excluded.length).to.equal(1);

    //Families
    expect(Defintions.family.defined.includes("npc")).to.be.true;
    expect(Defintions.family.defined.includes("Npc")).to.be.true;
    expect(Defintions.family.excluded.includes("nemesis")).to.be.true;
    expect(Defintions.family.defined.includes("enemy")).to.be.true;
    expect(Defintions.family.defined.length).to.equal(3);
    expect(Defintions.family.excluded.length).to.equal(1);

    //Objectives
    expect(Defintions.objective.defined.includes("counter")).to.be.true;
    expect(Defintions.objective.excluded.includes("Foo")).to.be.true;
    expect(Defintions.objective.defined.length).to.equal(1);
    expect(Defintions.objective.excluded.length).to.equal(1);

    //Names
    expect(Defintions.name.defined.includes("Steve")).to.be.true;
    expect(Defintions.name.excluded.includes("Creeper")).to.be.true;
    expect(Defintions.name.defined.length).to.equal(1);
    expect(Defintions.name.excluded.length).to.equal(1);
  });

  it("load file2", (done) => {
    const filepath = path.join(TestFilesFolder, "mcdefinitions", "file2.mcdefinitions");

    MCDefinition.load(filepath).then((Defintions) => {
      //Tags
      expect(Defintions.tag.defined.includes("tag_number1"));
      expect(Defintions.tag.excluded.includes("FoLolOl"));
      expect(Defintions.tag.defined.length).to.equal(1);
      expect(Defintions.tag.excluded.length).to.equal(1);

      //Families
      expect(Defintions.family.defined.includes("npc"));
      expect(Defintions.family.defined.includes("Npc"));
      expect(Defintions.family.excluded.includes("nemesis"));
      expect(Defintions.family.defined.includes("enemy"));
      expect(Defintions.family.defined.length).to.equal(3);
      expect(Defintions.family.excluded.length).to.equal(1);

      //Objectives
      expect(Defintions.objective.defined.includes("counter"));
      expect(Defintions.objective.excluded.includes("Foo"));
      expect(Defintions.objective.defined.length).to.equal(1);
      expect(Defintions.objective.excluded.length).to.equal(1);

      //Names
      expect(Defintions.name.defined.includes("Steve"));
      expect(Defintions.name.excluded.includes("Creeper"));
      expect(Defintions.name.defined.length).to.equal(1);
      expect(Defintions.name.excluded.length).to.equal(1);

      done();
    });
  });
});

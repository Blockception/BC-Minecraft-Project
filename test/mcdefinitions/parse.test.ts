import { TestFilesFolder } from "../utillity.test";
import * as path from "path";
import assert = require("assert");
import { MCDefinition } from "../../src/main";

const Text1 = `tag=allowed
tag=!denied`;

describe("MCDefinition", () => {
  it("parse1", () => {
    let parse = MCDefinition.parse(Text1);

    assert(parse.tag.defined.includes("allowed"));
    assert(parse.tag.excluded.includes("denied"));

    assert.strictEqual(parse.tag.defined.length, 1);
    assert.strictEqual(parse.tag.excluded.length, 1);
  });

  it("loadSync file1", () => {
    const filepath = path.join(TestFilesFolder, "mcdefinitions", "file1.mcdefinitions");

    let Defintions = MCDefinition.loadSync(filepath);

    //Tags
    assert(Defintions.tag.defined.includes("tag_number1"));
    assert(Defintions.tag.excluded.includes("FoLolOl"));
    assert.strictEqual(Defintions.tag.defined.length, 1);
    assert.strictEqual(Defintions.tag.excluded.length, 1);

    //Families
    assert(Defintions.family.defined.includes("npc"));
    assert(Defintions.family.defined.includes("Npc"));
    assert(Defintions.family.excluded.includes("nemesis"));
    assert(Defintions.family.defined.includes("enemy"));
    assert.strictEqual(Defintions.family.defined.length, 3);
    assert.strictEqual(Defintions.family.excluded.length, 1);

    //Objectives
    assert(Defintions.objective.defined.includes("counter"));
    assert(Defintions.objective.excluded.includes("Foo"));
    assert.strictEqual(Defintions.objective.defined.length, 1);
    assert.strictEqual(Defintions.objective.excluded.length, 1);

    //Names
    assert(Defintions.name.defined.includes("Steve"));
    assert(Defintions.name.excluded.includes("Creeper"));
    assert.strictEqual(Defintions.name.defined.length, 1);
    assert.strictEqual(Defintions.name.excluded.length, 1);
  });

  it("load file2", (done) => {
    const filepath = path.join(TestFilesFolder, "mcdefinitions", "file2.mcdefinitions");

    MCDefinition.load(filepath).then((Defintions) => {
      //Tags
      assert(Defintions.tag.defined.includes("tag_number1"));
      assert(Defintions.tag.excluded.includes("FoLolOl"));
      assert.strictEqual(Defintions.tag.defined.length, 1);
      assert.strictEqual(Defintions.tag.excluded.length, 1);

      //Families
      assert(Defintions.family.defined.includes("npc"));
      assert(Defintions.family.defined.includes("Npc"));
      assert(Defintions.family.excluded.includes("nemesis"));
      assert(Defintions.family.defined.includes("enemy"));
      assert.strictEqual(Defintions.family.defined.length, 3);
      assert.strictEqual(Defintions.family.excluded.length, 1);

      //Objectives
      assert(Defintions.objective.defined.includes("counter"));
      assert(Defintions.objective.excluded.includes("Foo"));
      assert.strictEqual(Defintions.objective.defined.length, 1);
      assert.strictEqual(Defintions.objective.excluded.length, 1);

      //Names
      assert(Defintions.name.defined.includes("Steve"));
      assert(Defintions.name.excluded.includes("Creeper"));
      assert.strictEqual(Defintions.name.defined.length, 1);
      assert.strictEqual(Defintions.name.excluded.length, 1);

      done();
    });
  });
});

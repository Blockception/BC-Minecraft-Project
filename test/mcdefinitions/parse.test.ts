import { TestFilesFolder } from "../utillity.test";
import * as path from "path";
import assert = require("assert");
import { MCDefinition } from "../../src/main";

const Text1 = `tag=allowed
tag=!denied`;

suite("MCDefinition", () => {
  test("parse1", () => {
    let parse = MCDefinition.parse(Text1);

    assert(parse.tag.Defined.includes("allowed"));
    assert(parse.tag.Excluded.includes("denied"));

    assert.strictEqual(parse.tag.Defined.length, 1);
    assert.strictEqual(parse.tag.Excluded.length, 1);
  });

  test("loadSync file1", () => {
    const filepath = path.join(TestFilesFolder, "mcdefinitions", "file1.mcdefinitions");

    let Defintions = MCDefinition.loadSync(filepath);

    //Tags
    assert(Defintions.tag.Defined.includes("tag_number1"));
    assert(Defintions.tag.Excluded.includes("FoLolOl"));
    assert.strictEqual(Defintions.tag.Defined.length, 1);
    assert.strictEqual(Defintions.tag.Excluded.length, 1);

    //Families
    assert(Defintions.family.Defined.includes("npc"));
    assert(Defintions.family.Defined.includes("Npc"));
    assert(Defintions.family.Excluded.includes("nemesis"));
    assert(Defintions.family.Defined.includes("enemy"));
    assert.strictEqual(Defintions.family.Defined.length, 3);
    assert.strictEqual(Defintions.family.Excluded.length, 1);

    //Objectives
    assert(Defintions.objective.Defined.includes("counter"));
    assert(Defintions.objective.Excluded.includes("Foo"));
    assert.strictEqual(Defintions.objective.Defined.length, 1);
    assert.strictEqual(Defintions.objective.Excluded.length, 1);

    //Names
    assert(Defintions.name.Defined.includes("Steve"));
    assert(Defintions.name.Excluded.includes("Creeper"));
    assert.strictEqual(Defintions.name.Defined.length, 1);
    assert.strictEqual(Defintions.name.Excluded.length, 1);
  });

  test("load file2", (done) => {
    const filepath = path.join(TestFilesFolder, "mcdefinitions", "file2.mcdefinitions");

    MCDefinition.load(filepath).then((Defintions) => {
      //Tags
      assert(Defintions.tag.Defined.includes("tag_number1"));
      assert(Defintions.tag.Excluded.includes("FoLolOl"));
      assert.strictEqual(Defintions.tag.Defined.length, 1);
      assert.strictEqual(Defintions.tag.Excluded.length, 1);

      //Families
      assert(Defintions.family.Defined.includes("npc"));
      assert(Defintions.family.Defined.includes("Npc"));
      assert(Defintions.family.Excluded.includes("nemesis"));
      assert(Defintions.family.Defined.includes("enemy"));
      assert.strictEqual(Defintions.family.Defined.length, 3);
      assert.strictEqual(Defintions.family.Excluded.length, 1);

      //Objectives
      assert(Defintions.objective.Defined.includes("counter"));
      assert(Defintions.objective.Excluded.includes("Foo"));
      assert.strictEqual(Defintions.objective.Defined.length, 1);
      assert.strictEqual(Defintions.objective.Excluded.length, 1);

      //Names
      assert(Defintions.name.Defined.includes("Steve"));
      assert(Defintions.name.Excluded.includes("Creeper"));
      assert.strictEqual(Defintions.name.Defined.length, 1);
      assert.strictEqual(Defintions.name.Excluded.length, 1);

      done();
    });
  });
});

import { TestFilesFolder } from "../utillity.test";
import * as path from "path";
import assert = require("assert");
import { MCDefinition } from "../../src/main";

const Text1 = `tag=allowed
tag=!denied`;

suite("MCDefinition", () => {
  test("parse1", () => {
    let parse = MCDefinition.parse(Text1);

    assert(parse.Tags.Defined.includes("allowed"));
    assert(parse.Tags.Excluded.includes("denied"));

    assert.strictEqual(parse.Tags.Defined.length, 1);
    assert.strictEqual(parse.Tags.Excluded.length, 1);
  });

  test("loadSync file1", () => {
    const filepath = path.join(TestFilesFolder, "mcdefinitions", "file1.mcdefinitions");

    let Defintions = MCDefinition.loadSync(filepath);

    //Tags
    assert(Defintions.Tags.Defined.includes("tag_number1"));
    assert(Defintions.Tags.Excluded.includes("FoLolOl"));
    assert.strictEqual(Defintions.Tags.Defined.length, 1);
    assert.strictEqual(Defintions.Tags.Excluded.length, 1);

    //Families
    assert(Defintions.Families.Defined.includes("npc"));
    assert(Defintions.Families.Defined.includes("Npc"));
    assert(Defintions.Families.Excluded.includes("nemesis"));
    assert(Defintions.Families.Defined.includes("enemy"));
    assert.strictEqual(Defintions.Families.Defined.length, 3);
    assert.strictEqual(Defintions.Families.Excluded.length, 1);

    //Objectives
    assert(Defintions.Objectives.Defined.includes("counter"));
    assert(Defintions.Objectives.Excluded.includes("Foo"));
    assert.strictEqual(Defintions.Objectives.Defined.length, 1);
    assert.strictEqual(Defintions.Objectives.Excluded.length, 1);

    //Names
    assert(Defintions.Names.Defined.includes("Steve"));
    assert(Defintions.Names.Excluded.includes("Creeper"));
    assert.strictEqual(Defintions.Names.Defined.length, 1);
    assert.strictEqual(Defintions.Names.Excluded.length, 1);
  });

  test("load file2", (done) => {
    const filepath = path.join(TestFilesFolder, "mcdefinitions", "file2.mcdefinitions");

    MCDefinition.load(filepath).then((Defintions) => {
      //Tags
      assert(Defintions.Tags.Defined.includes("tag_number1"));
      assert(Defintions.Tags.Excluded.includes("FoLolOl"));
      assert.strictEqual(Defintions.Tags.Defined.length, 1);
      assert.strictEqual(Defintions.Tags.Excluded.length, 1);

      //Families
      assert(Defintions.Families.Defined.includes("npc"));
      assert(Defintions.Families.Defined.includes("Npc"));
      assert(Defintions.Families.Excluded.includes("nemesis"));
      assert(Defintions.Families.Defined.includes("enemy"));
      assert.strictEqual(Defintions.Families.Defined.length, 3);
      assert.strictEqual(Defintions.Families.Excluded.length, 1);

      //Objectives
      assert(Defintions.Objectives.Defined.includes("counter"));
      assert(Defintions.Objectives.Excluded.includes("Foo"));
      assert.strictEqual(Defintions.Objectives.Defined.length, 1);
      assert.strictEqual(Defintions.Objectives.Excluded.length, 1);

      //Names
      assert(Defintions.Names.Defined.includes("Steve"));
      assert(Defintions.Names.Excluded.includes("Creeper"));
      assert.strictEqual(Defintions.Names.Defined.length, 1);
      assert.strictEqual(Defintions.Names.Excluded.length, 1);

      done();
    });
  });
});

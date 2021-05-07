import { TestFilesFolder } from "../utillity.test";
import * as path from "path";
import assert = require("assert");
import { Definition, MCDefinition } from "../../src/main";

const Text1 = `tag=allowed
tag=!denied`;

suite("mcattribute", () => {
  test("parse1", () => {
    let parse = MCDefinition.parse(Text1);

    assert(parse.Tags.Defined.includes("allowed"));
    assert(parse.Tags.Excluded.includes("denied"));
  });

  test("loadSync file1", () => {
    const filepath = path.join(TestFilesFolder, "mcdefinitions", "file1.mcdefinitions");

    let Defintions = MCDefinition.loadSync(filepath);

    assert(Defintions.Tags.Defined.includes("tag_number1"));
    assert(Defintions.Tags.Excluded.includes("FoLolOl"));

    assert(Defintions.Families.Defined.includes("npc"));
    assert(Defintions.Families.Defined.includes("Npc"));
    assert(Defintions.Families.Excluded.includes("nemesis"));
    assert(Defintions.Families.Defined.includes("enemy"));

    assert(Defintions.Objectives.Defined.includes("counter"));
    assert(Defintions.Objectives.Excluded.includes("Foo"));

    assert(Defintions.Names.Defined.includes("Steve"));
    assert(Defintions.Names.Excluded.includes("Creeper"));
  });

  test("load file2", (done) => {
    const filepath = path.join(TestFilesFolder, "mcdefinitions", "file2.mcdefinitions");

    MCDefinition.load(filepath).then((Defintions) => {
      assert(Defintions.Tags.Defined.includes("tag_number1"));
      assert(Defintions.Tags.Excluded.includes("FoLolOl"));

      assert(Defintions.Families.Defined.includes("npc"));
      assert(Defintions.Families.Defined.includes("Npc"));
      assert(Defintions.Families.Excluded.includes("nemesis"));
      assert(Defintions.Families.Defined.includes("enemy"));

      assert(Defintions.Objectives.Defined.includes("counter"));
      assert(Defintions.Objectives.Excluded.includes("Foo"));

      assert(Defintions.Names.Defined.includes("Steve"));
      assert(Defintions.Names.Excluded.includes("Creeper"));

      done();
    });
  });
});

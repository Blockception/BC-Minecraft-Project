import { TestFilesFolder } from "../utillity.test";
import * as path from "path";
import assert = require("assert");
import { MCIgnore, MCProject } from "../../src/main";

const Text1 = `OutputFolder
Temp
Template/something
!BP/**/*.json`;

suite("MCProject", () => {
  test("loadSync p1", () => {
    const folder = path.join(TestFilesFolder, "mcproject", "p1");

    let project = MCProject.loadSync(folder);

    //Attributes
    var keys = Object.getOwnPropertyNames(project.attributes);
    assert.strictEqual(keys.length, 5, "expected 5 attributes");

    //Definitions
    assert.strictEqual(project.definitions.Tags.Defined.length, 1);
    assert.strictEqual(project.definitions.Tags.Excluded.length, 1);

    assert.strictEqual(project.definitions.Families.Defined.length, 3);
    assert.strictEqual(project.definitions.Families.Excluded.length, 1);

    assert.strictEqual(project.definitions.Objectives.Defined.length, 1);
    assert.strictEqual(project.definitions.Objectives.Excluded.length, 1);

    assert.strictEqual(project.definitions.Names.Defined.length, 1);
    assert.strictEqual(project.definitions.Names.Excluded.length, 1);

    //Ignores
    assert.strictEqual(project.ignores.patterns.length, 4);
  });

  test("load file2", (done) => {
    const folder = path.join(TestFilesFolder, "mcproject", "p1");

    MCProject.load(folder).then((project) => {
      //Attributes
      var keys = Object.getOwnPropertyNames(project.attributes);
      assert.strictEqual(keys.length, 5, "expected 5 attributes");

      //Definitions
      assert.strictEqual(project.definitions.Tags.Defined.length, 1);
      assert.strictEqual(project.definitions.Tags.Excluded.length, 1);

      assert.strictEqual(project.definitions.Families.Defined.length, 3);
      assert.strictEqual(project.definitions.Families.Excluded.length, 1);

      assert.strictEqual(project.definitions.Objectives.Defined.length, 1);
      assert.strictEqual(project.definitions.Objectives.Excluded.length, 1);

      assert.strictEqual(project.definitions.Names.Defined.length, 1);
      assert.strictEqual(project.definitions.Names.Excluded.length, 1);

      //Ignores
      assert.strictEqual(project.ignores.patterns.length, 4);

      done();
    });
  });
});

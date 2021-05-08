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
    assert.strictEqual(project.definitions.tag.defined.length, 1);
    assert.strictEqual(project.definitions.tag.excluded.length, 1);

    assert.strictEqual(project.definitions.family.defined.length, 3);
    assert.strictEqual(project.definitions.family.excluded.length, 1);

    assert.strictEqual(project.definitions.objective.defined.length, 1);
    assert.strictEqual(project.definitions.objective.excluded.length, 1);

    assert.strictEqual(project.definitions.name.defined.length, 1);
    assert.strictEqual(project.definitions.name.excluded.length, 1);

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
      assert.strictEqual(project.definitions.tag.defined.length, 1);
      assert.strictEqual(project.definitions.tag.excluded.length, 1);

      assert.strictEqual(project.definitions.family.defined.length, 3);
      assert.strictEqual(project.definitions.family.excluded.length, 1);

      assert.strictEqual(project.definitions.objective.defined.length, 1);
      assert.strictEqual(project.definitions.objective.excluded.length, 1);

      assert.strictEqual(project.definitions.name.defined.length, 1);
      assert.strictEqual(project.definitions.name.excluded.length, 1);

      //Ignores
      assert.strictEqual(project.ignores.patterns.length, 4);

      done();
    });
  });

  test("loadSync not existing", () => {
    const folder = path.join(TestFilesFolder, "mcproject", "non_existing");

    let project = MCProject.loadSync(folder);

    var keys = Object.getOwnPropertyNames(project.attributes);
    assert.strictEqual(keys.length, 0);

    var keys = Object.getOwnPropertyNames(project.definitions);
    assert.strictEqual(keys.length, 0);

    assert.strictEqual(project.ignores.patterns.length, 0);
  });

  test("load not existing", (done) => {
    const folder = path.join(TestFilesFolder, "mcproject", "non_existing");

    MCProject.load(folder).then((project) => {
      var keys = Object.getOwnPropertyNames(project.attributes);
      assert.strictEqual(keys.length, 0);

      var keys = Object.getOwnPropertyNames(project.definitions);
      assert.strictEqual(keys.length, 0);

      assert.strictEqual(project.ignores.patterns.length, 0);

      done();
    });
  });
});

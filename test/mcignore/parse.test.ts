import { TestFilesFolder } from "../utillity.test";
import * as path from "path";
import assert = require("assert");
import { MCIgnore } from "../../src/main";

const Text1 = `OutputFolder
Temp
Template/something
!BP/**/*.json`;

suite("MCIgnore", () => {
  test("parse1", () => {
    let Ignores = MCIgnore.parse(Text1);

    assert.strictEqual(Ignores.patterns.length, 4);
    assert(Ignores.patterns.includes("OutputFolder"));
    assert(Ignores.patterns.includes("Temp"));
    assert(Ignores.patterns.includes("Template/something"));
    assert(Ignores.patterns.includes("!BP/**/*.json"));
  });

  test("loadSync file1", () => {
    const filepath = path.join(TestFilesFolder, "mcignore", "file1.mcignore");

    let Ignores = MCIgnore.loadSync(filepath);

    assert.strictEqual(Ignores.patterns.length, 4);
    assert(Ignores.patterns.includes("OutputFolder"));
    assert(Ignores.patterns.includes("Temp"));
    assert(Ignores.patterns.includes("Template/something"));
    assert(Ignores.patterns.includes("!BP/**/*.json"));
  });

  test("load file2", (done) => {
    const filepath = path.join(TestFilesFolder, "mcignore", "file2.mcignore");

    MCIgnore.load(filepath).then((Ignores) => {
      assert.strictEqual(Ignores.patterns.length, 4);
      assert(Ignores.patterns.includes("OutputFolder"));
      assert(Ignores.patterns.includes("Temp"));
      assert(Ignores.patterns.includes("Template/something"));
      assert(Ignores.patterns.includes("!BP/**/*.json"));

      done();
    });
  });
});

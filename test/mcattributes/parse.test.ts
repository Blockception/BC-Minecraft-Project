import { MCAttributes } from "../../src/main";
import { TestFilesFolder } from "../utillity.test";
import * as path from "path";
import assert = require("assert");

const Text1 = `diagnostics.objectives=true
diagnostics.tags=false
diagnostics.json=true`;

const Attribute1 = [
  { key: "diagnostics.objectives", value: "true" },
  { key: "diagnostics.tags", value: "false" },
  { key: "diagnostics.json", value: "true" },
];

describe("MCAttributes", () => {
  it("parse1", () => {
    let parse = MCAttributes.parse(Text1);

    for (var I = 0; I < Attribute1.length; I++) {
      const element = Attribute1[I];

      const value = parse[element.key];

      assert.strictEqual(value, element.value);
    }
  });

  it("loadSync file1", () => {
    const filepath = path.join(TestFilesFolder, "mcattributes", "file1.mcattributes");

    let Attributes = MCAttributes.loadSync(filepath);

    assert.strictEqual(Attributes["diagnose"], "true");
    assert.strictEqual(Attributes["diagnose.objectives"], "true");
    assert.strictEqual(Attributes["diagnose.tags"], "false");
    assert.strictEqual(Attributes["diagnose.mcfunctions"], "true");

    assert.strictEqual(Attributes["world.area_used"], "0 0 0 1000 256 1000");
  });

  it("load file2", (done) => {
    const filepath = path.join(TestFilesFolder, "mcattributes", "file2.mcattributes");

    MCAttributes.load(filepath).then((Attributes) => {
      assert.strictEqual(Attributes["diagnose"], "true");
      assert.strictEqual(Attributes["diagnose.objectives"], "true");
      assert.strictEqual(Attributes["diagnose.tags"], "false");
      assert.strictEqual(Attributes["diagnose.mcfunctions"], "true");

      assert.strictEqual(Attributes["world.area_used"], "0 0 0 1000 256 1000");

      done();
    });
  });
});

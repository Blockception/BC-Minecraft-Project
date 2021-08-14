import { TestFilesFolder } from "../utillity.test";
import * as path from "path";
import { MCIgnore } from "../../src/main";
import { expect } from "chai";

const Text1 = `OutputFolder
Temp
Template/something
!BP/**/*.json`;

describe("MCIgnore", () => {
  it("parse1", () => {
    let Ignores = MCIgnore.parse(Text1);

    expect(Ignores.patterns.length).to.equal(4);
    expect(Ignores.patterns.includes("OutputFolder"));
    expect(Ignores.patterns.includes("Temp"));
    expect(Ignores.patterns.includes("Template/something"));
    expect(Ignores.patterns.includes("!BP/**/*.json"));
  });

  it("loadSync file1", () => {
    const filepath = path.join(TestFilesFolder, "mcignore", "file1.mcignore");

    let Ignores = MCIgnore.loadSync(filepath);

    expect(Ignores.patterns.length).to.equal(4);
    expect(Ignores.patterns.includes("OutputFolder"));
    expect(Ignores.patterns.includes("Temp"));
    expect(Ignores.patterns.includes("Template/something"));
    expect(Ignores.patterns.includes("!BP/**/*.json"));
  });

  it("load file2", (done) => {
    const filepath = path.join(TestFilesFolder, "mcignore", "file2.mcignore");

    MCIgnore.load(filepath).then((Ignores) => {
      expect(Ignores.patterns.length).to.equal(4);
      expect(Ignores.patterns.includes("OutputFolder"));
      expect(Ignores.patterns.includes("Temp"));
      expect(Ignores.patterns.includes("Template/something"));
      expect(Ignores.patterns.includes("!BP/**/*.json"));

      done();
    });
  });
});

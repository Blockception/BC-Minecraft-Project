import { TestFilesFolder } from "../utillity.test";
import * as path from "path";
import { MCProject } from "../../src/main";
import { expect } from "chai";

const Text1 = `OutputFolder
Temp
Template/something
!BP/**/*.json`;

describe("MCProject", () => {
  it("loadSync p1", () => {
    const folder = path.join(TestFilesFolder, "mcproject", "p1");

    let project = MCProject.loadSync(folder);

    //Attributes
    var keys = Object.getOwnPropertyNames(project.attributes);
    expect(keys.length).to.equal(5, "expected 5 attributes");

    //Definitions
    expect(project.definitions.tag.defined.length).to.equal(1);
    expect(project.definitions.tag.excluded.length).to.equal(1);

    expect(project.definitions.family.defined.length).to.equal(3);
    expect(project.definitions.family.excluded.length).to.equal(1);

    expect(project.definitions.objective.defined.length).to.equal(1);
    expect(project.definitions.objective.excluded.length).to.equal(1);

    expect(project.definitions.name.defined.length).to.equal(1);
    expect(project.definitions.name.excluded.length).to.equal(1);

    expect(project.attributes.diagnose).to.equal("true");
    expect(project.attributes["world.area_used"]).to.equal("0 0 0 1000 256 1000");

    //Ignores
    expect(project.ignores.patterns.length).to.equal(4);
  });

  it("load file2", (done) => {
    const folder = path.join(TestFilesFolder, "mcproject", "p1");

    MCProject.load(folder).then((project) => {
      //Attributes
      var keys = Object.getOwnPropertyNames(project.attributes);
      expect(keys.length).to.equal(5, "expected 5 attributes");

      //Definitions
      expect(project.definitions.tag.defined.length).to.equal(1);
      expect(project.definitions.tag.excluded.length).to.equal(1);

      expect(project.definitions.family.defined.length).to.equal(3);
      expect(project.definitions.family.excluded.length).to.equal(1);

      expect(project.definitions.objective.defined.length).to.equal(1);
      expect(project.definitions.objective.excluded.length).to.equal(1);

      expect(project.definitions.name.defined.length).to.equal(1);
      expect(project.definitions.name.excluded.length).to.equal(1);

      expect(project.attributes.diagnose).to.equal("true");
      expect(project.attributes["world.area_used"], "0 0 0 1000 256 1000");

      //Ignores
      expect(project.ignores.patterns.length).to.equal(4);

      done();
    });
  });

  it("loadSync not existing", () => {
    const folder = path.join(TestFilesFolder, "mcproject", "non_existing");

    let project = MCProject.loadSync(folder);

    var keys = Object.getOwnPropertyNames(project.attributes);
    expect(keys.length).to.equal(0);

    var keys = Object.getOwnPropertyNames(project.definitions);
    expect(keys.length).to.equal(0);

    expect(project.ignores.patterns.length).to.equal(0);
  });

  it("load not existing", (done) => {
    const folder = path.join(TestFilesFolder, "mcproject", "non_existing");

    MCProject.load(folder).then((project) => {
      var keys = Object.getOwnPropertyNames(project.attributes);
      expect(keys.length).to.equal(0);

      var keys = Object.getOwnPropertyNames(project.definitions);
      expect(keys.length).to.equal(0);

      expect(project.ignores.patterns.length).to.equal(0);

      done();
    });
  });
});

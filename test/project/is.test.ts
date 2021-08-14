import { MCProject } from "../../src/main";
import { TestFilesFolder } from "../utillity.test";
import * as path from "path";
import { expect } from "chai";

describe("MCProject", () => {
  it("is it1", () => {
    let it = MCProject.createEmpty();

    if (!MCProject.is(it)) {
      expect.fail();
    }
  });

  it("is p1", () => {
    const folder = path.join(TestFilesFolder, "mcproject", "p1");

    let project = MCProject.loadSync(folder);

    if (!MCProject.is(project)) {
      expect.fail();
    }
  });

  it("is async p1", (done) => {
    const folder = path.join(TestFilesFolder, "mcproject", "p1");

    MCProject.load(folder).then((project) => {
      if (!MCProject.is(project)) {
        expect.fail();
      }

      done();
    });
  });
});

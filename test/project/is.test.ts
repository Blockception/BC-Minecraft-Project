import assert = require("assert");
import { MCProject } from "../../src/main";
import { TestFilesFolder } from "../utillity.test";
import * as path from "path";

describe("MCProject", () => {
  it("is it1", () => {
    let it = MCProject.createEmpty();

    if (!MCProject.is(it)) {
      assert.fail();
    }
  });

  it("is p1", () => {
    const folder = path.join(TestFilesFolder, "mcproject", "p1");

    let project = MCProject.loadSync(folder);

    if (!MCProject.is(project)) {
      assert.fail();
    }
  });

  it("is async p1", (done) => {
    const folder = path.join(TestFilesFolder, "mcproject", "p1");

    MCProject.load(folder).then((project) => {
      if (!MCProject.is(project)) {
        assert.fail();
      }

      done();
    });
  });
});

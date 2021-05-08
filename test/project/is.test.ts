import assert = require("assert");
import { MCProject } from "../../src/main";
import { TestFilesFolder } from "../utillity.test";
import * as path from "path";

suite("MCProject", () => {
  test("is test1", () => {
    let test = MCProject.createEmpty();

    if (!MCProject.is(test)) {
      assert.fail();
    }
  });

  test("is p1", () => {
    const folder = path.join(TestFilesFolder, "mcproject", "p1");

    let project = MCProject.loadSync(folder);

    if (!MCProject.is(project)) {
      assert.fail();
    }
  });

  test("is async p1", (done) => {
    const folder = path.join(TestFilesFolder, "mcproject", "p1");

    MCProject.load(folder).then((project) => {
      if (!MCProject.is(project)) {
        assert.fail();
      }

      done();
    });
  });
});

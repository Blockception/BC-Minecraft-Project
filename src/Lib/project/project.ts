import FastGlob = require("fast-glob");
import { MCAttributes } from "../mcattributes/mcattributes";
import { MCDefinition } from "../mcdefinitions/mcdefinitions";
import { MCIgnore } from "../mcignore/mcignore";

/**
 *
 */
export interface MCProject {
  attributes: MCAttributes;
  ignores: MCIgnore;
  definitions: MCDefinition;
}

export namespace project {
  /**
   *
   * @param Source
   */
  export function Load(Source: string | string[]): MCProject {
    var Results = FastGlob.sync(Source);
  }

  /**
   *
   * @param Folder
   * @param project
   */
  export function Save(Folder: string, project: MCProject): void {}
}

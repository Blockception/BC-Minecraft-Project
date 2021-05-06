import FastGlob = require("fast-glob");
import { MCAttributes } from "../mcattributes/mcattributes";
import { MCDefinition } from "../mcdefinitions/mcdefinitions";
import { MCIgnore } from "../mcignore/mcignore";
import * as path from "path";
import { promises } from "dns";

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
  export function Load(Source: string): MCProject {
    var Results = FastGlob.sync(Source, { absolute: true, onlyFiles: true });
  }

  /**
   *
   * @param Folder
   * @param project
   */
  export function SaveSync(Folder: string, project: MCProject): void {
    MCAttributes.SaveSync(project.attributes, path.join(Folder, MCAttributes.Filename));
    MCIgnore.SaveSync(project.ignores, path.join(Folder, MCIgnore.Filename));
    MCDefinition.SaveSync(project.definitions, path.join(Folder, MCDefinition.Filename));
  }

  /**
   *
   * @param Folder
   * @param project
   */
  export async function Save(Folder: string, project: MCProject): Promise<void[]> {
    let P: Promise<void>[] = [
      MCAttributes.Save(project.attributes, path.join(Folder, MCAttributes.Filename)),
      MCIgnore.Save(project.ignores, path.join(Folder, MCIgnore.Filename)),
      MCDefinition.Save(project.definitions, path.join(Folder, MCDefinition.Filename)),
    ];

    return Promise.all(P);
  }
}

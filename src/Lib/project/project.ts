import { MCAttributes } from "../mcattributes/mcattributes";
import { MCDefinition } from "../mcdefinitions/mcdefinitions";
import { MCIgnore } from "../mcignore/mcignore";
import * as path from "path";

/**
 *
 */
export interface MCProject {
  attributes: MCAttributes;
  ignores: MCIgnore;
  definitions: MCDefinition;
}

/**
 *
 */
export namespace project {
  /**
   *
   * @param Source
   */
  export function LoadSync(Source: string): MCProject {
    let Attributes = MCAttributes.LoadSync(path.join(Source, MCAttributes.Filename));
    let Definitions = MCDefinition.LoadSync(path.join(Source, MCDefinition.Filename));
    let Ignores = MCIgnore.LoadSync(path.join(Source, MCIgnore.Filename));

    return {
      attributes: Attributes,
      definitions: Definitions,
      ignores: Ignores,
    };
  }

  /**
   *
   * @param Source
   */
  export function Load(Source: string): Promise<MCProject> {
    return new Promise((reject, resolve) => {
      return LoadSync(Source);
    });
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

  /**
   *
   * @returns
   */
  export function CreateEmpty(): MCProject {
    return {
      attributes: MCAttributes.CreateEmpty(),
      definitions: MCDefinition.CreateEmpty(),
      ignores: MCIgnore.CreateEmpty(),
    };
  }
}

import * as fg from "fast-glob";
import * as path from "path";
import { MCAttributes } from "./mcattributes";
import { MCDefinition } from "./mcdefinitions";
import { MCIgnore } from "./mcignore";

/**An interface that stored minecraft project data */
export interface MCProject {
  /**The collection of project attributes*/
  attributes: MCAttributes;
  /**The collection of project ignores patterns*/
  ignores: MCIgnore;
  /**The collection of definitions to the project*/
  definitions: MCDefinition;
}

/**The namespace that provides functionality to MCProjects*/
export namespace MCProject {
  /**Creates an empty version of the MCProject
   * @returns
   */
  export function createEmpty(): MCProject {
    return {
      attributes: MCAttributes.createEmpty(),
      definitions: MCDefinition.createEmpty(),
      ignores: MCIgnore.createEmpty(),
    };
  }

  /**Checks wheter or not the given object implements MCProject
   * @param value The object to inspect
   * @returns Wheter or not the given object implements MCProject
   */
  export function is(value: any): value is MCProject {
    if (value) {
      if (!(value.definitions && MCDefinition.is(value.definitions))) return false;
      if (!(value.ignores && MCIgnore.is(value.ignores))) return false;
      if (!(value.attributes && typeof value.attributes === "object")) return false;

      return true;
    }

    return false;
  }

  /**Uses fast-glob to collect files in given source(s)
   * @param project The project to retrieve files from
   * @param source The source(s) where to start lookinto, or glob patterns
   * @param options Possible options that needs to be applied, the .ignore will receive patterns from the MCIGnore
   * @returns A collection of found files
   */
  export function getFiles(project: MCProject, source: string | string[], options: fg.Options | undefined = undefined): string[] {
    return MCIgnore.getFiles(source, project.ignores, options);
  }

  /**Uses fast-glob to collect files in given source(s)
   * @param project The project to retrieve files from
   * @param options Possible options that needs to be applied, the .ignore will receive patterns from the MCIGnore
   * @returns A promise that will return collected files
   */
  export async function getFilesAsync(project: MCProject, source: string | string[], options: fg.Options | undefined = undefined): Promise<string[]> {
    return MCIgnore.getFilesAsync(source, project.ignores, options);
  }

  /**Loads from the given root folder the nesscary project files
   * @param Source The root folder to retrieve files from
   * @returns
   */
  export function loadSync(Source: string): MCProject {
    let Attributes = MCAttributes.loadSync(path.join(Source, MCAttributes.filename));
    let Definitions = MCDefinition.loadSync(path.join(Source, MCDefinition.filename));
    let Ignores = MCIgnore.loadSync(path.join(Source, MCIgnore.filename));

    return {
      attributes: Attributes,
      definitions: Definitions,
      ignores: Ignores,
    };
  }

  /**Loads from the given root folder the nesscary project files
   * @param Source The root folder to retrieve files from
   */
  export function load(Source: string): Promise<MCProject> {
    return new Promise((resolve, reject) => {
      resolve(loadSync(Source));
    });
  }

  /**Saves the gives project into the specified folder
   * @param FolderThe folder to the save the data into
   * @param project The data to save
   */
  export function saveSync(Folder: string, project: MCProject): void {
    MCAttributes.saveSync(project.attributes, path.join(Folder, MCAttributes.filename));
    MCIgnore.saveSync(project.ignores, path.join(Folder, MCIgnore.filename));
    MCDefinition.saveSync(project.definitions, path.join(Folder, MCDefinition.filename));
  }

  /**Saves the gives project into the specified folder
   * @param FolderThe folder to the save the data into
   * @param project The data to save
   * @returns A promise that is done wheter the data has been written
   */
  export async function save(Folder: string, project: MCProject): Promise<void[]> {
    let P: Promise<void>[] = [
      MCAttributes.save(project.attributes, path.join(Folder, MCAttributes.filename)),
      MCIgnore.save(project.ignores, path.join(Folder, MCIgnore.filename)),
      MCDefinition.save(project.definitions, path.join(Folder, MCDefinition.filename)),
    ];

    return Promise.all(P);
  }
}

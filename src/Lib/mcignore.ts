import * as fg from "fast-glob";
import * as fs from "fs";

/**The interface that collects ignore patterns*/
export interface MCIgnore {
  /**The glob patterns that are used to ignore*/
  patterns: string[];
}

/**The namespace that provides functions for MCIgnore interfaces*/
export namespace MCIgnore {
  /**The default filename of a MCIgnore filename*/
  export const filename = ".mcignore";

  /**Creates an empty version of MCIgnore
   * @returns An empty MCIgnore object
   */
  export function createEmpty(): MCIgnore {
    return { patterns: [] };
  }

  /** Merges the two given objects into a new MCIgnore.
   * @param A The first data set
   * @param B The second data set
   * @returns A new object with the combined patterns
   */
  export function merge(A: MCIgnore | undefined, B: MCIgnore | undefined): MCIgnore {
    let Out = MCIgnore.createEmpty();

    if (A) Out.patterns.push(...A.patterns);
    if (B) Out.patterns.push(...B.patterns);

    return Out;
  }

  /** Checks wheter or not the given object implements MCIgnore
   * @param value The object to test
   */
  export function is(value: any): value is MCIgnore {
    if (value) {
      if (value.patterns && Array.isArray(value.patterns)) return true;
    }

    return false;
  }

  /**Uses fast-glob to collect files in given source(s)
   * @param source The source(s) where to start lookinto, or glob patterns
   * @param ignore The patterns that will be used to filter out files
   * @param options Possible options that needs to be applied, the .ignore will receive patterns from the MCIGnore
   * @returns A collection of found files
   */
  export function getFiles(source: string | string[], ignore: MCIgnore, options: fg.Options | undefined = undefined): string[] {
    if (!options) {
      options = { absolute: true, onlyFiles: true, ignore: [] };
    }

    if (!options.ignore) {
      options.ignore = [];
    }

    options.ignore.push(...ignore.patterns);

    let Results = fg.sync(source, options);

    return Results;
  }

  /**Uses fast-glob to collect files in given source(s)
   * @param source The source(s) where to start lookinto, or glob patterns
   * @param ignore The patterns that will be used to filter out files
   * @param options Possible options that needs to be applied, the .ignore will receive patterns from the MCIGnore
   * @returns A promise that will return collected files
   */
  export async function getFilesAsync(source: string | string[], ignore: MCIgnore, options: fg.Options | undefined = undefined): Promise<string[]> {
    if (!options) {
      options = { absolute: true, onlyFiles: true, ignore: [] };
    }

    if (!options.ignore) {
      options.ignore = [];
    }

    options.ignore.push(...ignore.patterns);

    return fg(source, options);
  }

  /**Parses the given content as if its file content, whereby each line is an pattern
   * @param content The content that one would get as in a file
   * @returns A parsed version based on the contents, or an empty object
   */
  export function parse(content: string): MCIgnore {
    let parts = content.split(/(\r\n|\n)/);
    let Out: MCIgnore = { patterns: [] };

    Out.patterns.push(...parts);

    return Out;
  }

  /**Converts the given MCIgnore to file content
   * @param data The MCIgnore data to convert
   * @returns A string represerntation of the contents of a MCIgnore
   */
  export function toString(data: MCIgnore): string {
    let Out = data.patterns.join("\n");

    return Out;
  }

  /** Loads the content of the given file into a MCIgnore
   * @param filepath The path to the file to load
   * @returns A filled MCIgnore
   */
  export function loadSync(filepath: string): MCIgnore {
    if (fs.existsSync(filepath)) {
      let buffer = fs.readFileSync(filepath);

      return parse(buffer.toString());
    }

    return createEmpty();
  }

  /** Loads the content of the given file into a MCIgnore
   * @param filepath The path to the file to load
   * @returns A filled promise that returns a MCIgnore
   */
  export async function load(filepath: string): Promise<MCIgnore> {
    let P = fs.promises.readFile(filepath);

    return P.then((buffer) => parse(buffer.toString()));
  }

  /** Saves the given MCIgnore into the specified file
   * @param data The data to save
   * @param filepath The filepath to save to
   */
  export function saveSync(data: MCIgnore, filepath: string): void {
    const content = toString(data);

    fs.writeFileSync(filepath, content);
  }

  /** Saves the given MCIgnore into the specified file
   * @param data The data to save
   * @param filepath The filepath to save to
   * @returns A promise for when the file will be saved
   */
  export async function save(data: MCIgnore, filepath: string): Promise<void> {
    const content = toString(data);

    return fs.promises.writeFile(filepath, content);
  }
}

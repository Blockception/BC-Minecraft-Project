import * as fg from "fast-glob";
import * as fs from "fs";

/**
 *
 */
export interface MCIgnore {
  /**
   *
   */
  patterns: string[];
}

/**
 *
 */
export namespace MCIgnore {
  /**
   *
   */
  export const Filename = ".mcignore";

  /**
   *
   * @param startFolder
   * @param ignore
   */
  export function GetFiles(source: string | string[], ignore: MCIgnore): string[] {
    let Results = fg.sync(source, { ignore: ignore.patterns, absolute: true, onlyFiles: true });

    return Results;
  }

  /**
   *
   * @param source
   * @param ignore
   * @returns
   */
  export async function GetFilesAsync(source: string | string[], ignore: MCIgnore): Promise<string[]> {
    return fg(source, { ignore: ignore.patterns });
  }

  /**
   *
   * @param content
   * @returns
   */
  export function Parse(content: string): MCIgnore {
    let parts = content.split("\n");
    let Out: MCIgnore = { patterns: [] };

    Out.patterns.push(...parts);

    return Out;
  }

  /**
   *
   * @param data
   * @returns
   */
  export function ToString(data: MCIgnore): string {
    let Out = data.patterns.join("\n");

    return Out;
  }

  /**
   *
   * @param filepath
   */
  export function LoadSync(filepath: string): MCIgnore {
    if (fs.existsSync(filepath)) {
      let buffer = fs.readFileSync(filepath);

      return Parse(buffer.toString());
    }

    return { patterns: [] };
  }

  /**
   *
   * @param filepath
   * @returns
   */
  export async function Load(filepath: string): Promise<MCIgnore> {
    let P = fs.promises.readFile(filepath);

    return P.then((buffer) => Parse(buffer.toString()));
  }

  /**
   *
   * @param data
   * @param filepath
   */
  export function SaveSync(data: MCIgnore, filepath: string): void {
    const content = ToString(data);

    fs.writeFileSync(filepath, content);
  }

  /**
   *
   * @param data
   * @param filepath
   * @returns
   */
  export async function Save(data: MCIgnore, filepath: string): Promise<void> {
    const content = ToString(data);

    return fs.promises.writeFile(filepath, content);
  }
}

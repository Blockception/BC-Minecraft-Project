import * as fs from "fs";

/**
 *
 */
export interface MCAttributes {
  /**
   *
   */
  [property: string]: string;
}

/**
 *
 */
export namespace MCAttributes {
  /**
   *
   */
  export const Filename = ".mcattributes";

  /**
   *
   * @param content
   */
  export function Parse(content: string): MCAttributes {
    let parts = content.split("\n");

    let Out: MCAttributes = {};

    parts.forEach((property) => {
      let cindex = property.indexOf("#");

      if (cindex >= 0) {
        property = property.substring(0, cindex);
      }

      let index = property.indexOf("=");

      if (index >= 0) {
        let name = property.substring(0, index);
        let value = property.substring(index + 1, property.length);

        //Write value
        if (name !== "") Out[name] = value;
      }
    });

    return Out;
  }

  /**
   *
   * @param data
   * @returns
   */
  export function ToString(data: MCAttributes): string {
    let Out = "";

    for (const Key in data) {
      const value = data[Key];

      Out += `${Key}=${value}`;
    }

    return Out;
  }

  /**
   *
   * @param filepath
   */
  export function LoadSync(filepath: string): MCAttributes {
    if (fs.existsSync(filepath)) {
      let buffer = fs.readFileSync(filepath);

      return Parse(buffer.toString());
    }

    return {};
  }

  /**
   *
   * @param receiver
   * @param source
   */
  export function Merge(receiver: MCAttributes, source: MCAttributes): void {
    for (const Key in source) {
      const value = source[Key];

      receiver[Key] = value;
    }
  }

  /**
   *
   * @param filepath
   * @returns
   */
  export async function Load(filepath: string): Promise<MCAttributes> {
    let P = fs.promises.readFile(filepath);

    return P.then((buffer) => Parse(buffer.toString()));
  }

  /**
   *
   * @param data
   * @param filepath
   */
  export function SaveSync(data: MCAttributes, filepath: string): void {
    const content = ToString(data);

    fs.writeFileSync(filepath, content);
  }

  /**
   *
   * @param data
   * @param filepath
   * @returns
   */
  export async function Save(data: MCAttributes, filepath: string): Promise<void> {
    const content = ToString(data);

    return fs.promises.writeFile(filepath, content);
  }
}

import * as fs from "fs";

/**An obect that stores project settings, attributes or other project related definition*/
export interface MCAttributes {
  /**A property definition*/
  [property: string]: string;
}

/**The namespace that provides code for MCAttributes interfaces*/
export namespace MCAttributes {
  /**The default filename of a MCAttributes filename*/
  export const filename = ".mcattributes";

  /**Creates an empty version of MCAttributes
   * @returns An empty MCAttributes object
   */
  export function createEmpty(): MCAttributes {
    return {};
  }

  /**Parses the given content as if its file content, whereby each line is an attribute
   * @param content The content that one would get as in a file
   * @returns A parsed version based on the contents, or an empty object
   */
  export function parse(content: string): MCAttributes {
    let parts = content.split(/(\r\n|\n)/);

    let Out: MCAttributes = {};

    parts.forEach((property) => {
      let cindex = property.indexOf("#");

      if (cindex >= 0) {
        property = property.substring(0, cindex).trim();
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

  /**Converts the given MCAttributes to file content
   * @param data The MCAttributes data to convert
   * @returns A string represerntation of the contents of a MCAttributes
   */
  export function toString(data: MCAttributes): string {
    let Out = "";

    for (const Key in data) {
      const value = data[Key];

      if (value && typeof value === "string") Out += `${Key}=${value}`;
    }

    return Out;
  }

  /** Merges the two given objects into a new mcattributes. Whereby B overrides anything A has specified
   * @param A The first data set
   * @param B The second data set, overrides anything A has specified
   * @returns A new object with the combined attributes
   */
  export function merge(A: MCAttributes, B: MCAttributes): MCAttributes {
    let Out = createEmpty();

    for (const Key in A) {
      const value = A[Key];

      Out[Key] = value;
    }

    for (const Key in B) {
      const value = B[Key];

      Out[Key] = value;
    }

    return Out;
  }

  /** Loads the content of the given file into a MCAttributes
   * @param filepath The path to the file to load
   * @returns A filled MCAttributes
   */
  export function loadSync(filepath: string): MCAttributes {
    if (fs.existsSync(filepath)) {
      let buffer = fs.readFileSync(filepath);

      return parse(buffer.toString());
    }

    return {};
  }

  /** Loads the content of the given file into a MCAttributes
   * @param filepath The path to the file to load
   * @returns A filled promise that returns a MCAttributes
   */
  export async function load(filepath: string): Promise<MCAttributes> {
    let P = fs.promises.readFile(filepath);

    return P.then((buffer) => parse(buffer.toString()));
  }

  /** Saves the given MCAttributes into the specified file
   * @param data The data to save
   * @param filepath The filepath to save to
   */
  export function saveSync(data: MCAttributes, filepath: string): void {
    const content = toString(data);

    fs.writeFileSync(filepath, content);
  }

  /** Saves the given MCAttributes into the specified file
   * @param data The data to save
   * @param filepath The filepath to save to
   * @returns A promise for when the file will be saved
   */
  export async function save(data: MCAttributes, filepath: string): Promise<void> {
    const content = toString(data);

    return fs.promises.writeFile(filepath, content);
  }

  /**Appends the given property and value into the give file
   * @param filepath The path to the MCAttributes
   * @param property The property key
   * @param value The value of the porerty
   */
  export function appendSync(filepath: string, property: string, value: string): void {
    fs.appendFileSync(filepath, `${property}=${value}\n`);
  }

  /**Appends the given property and value into the give file
   * @param filepath The path to the MCAttributes
   * @param property The property key
   * @param value The value of the porerty
   * @returns A promise for when the file is appended
   */
  export async function append(filepath: string, property: string, value: string): Promise<void> {
    return fs.promises.appendFile(filepath, `${property}=${value}\n`);
  }
}

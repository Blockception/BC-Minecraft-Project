import * as fs from "fs";

/**A single defintion for MCDefinitions*/
export interface Definition {
  /**The definition that have been defined*/
  Defined: string[];

  /**The definition that have to be excluded*/
  Excluded: string[];
}

/**The namespace that provides functions for Definitions*/
export namespace Definition {
  /**Add the given value to the definition container, checks if value start with '!' to determine if its exclude or not
   * @param container The container to add to
   * @param value The value to add, if its start with '!' its added to the exclude list
   */
  export function add(container: Definition, value: string): void {
    if (value.startsWith("!")) {
      container.Excluded.push(value.substring(1, value.length));
    } else {
      container.Defined.push(value);
    }
  }

  /**Converts the given container into a text rep for files
   * @param container The container to convert
   * @param key The key each item will be receiving
   * @returns A text rep of the object for files
   */
  export function toString(container: Definition, key: string): string {
    let Out = "";

    Out += `## ${key}\n`;
    for (let I = 0; I < container.Defined.length; I++) {
      Out += `${key}=${container.Defined[I]}\n`;
    }

    for (let I = 0; I < container.Excluded.length; I++) {
      Out += `${key}=!${container.Excluded[I]}\n`;
    }

    Out += "\n";

    return Out;
  }

  /**Creates an empty version of the interface Definition
   * @returns A empty version of Definition
   */
  export function createEmpty(): Definition {
    return {
      Excluded: [],
      Defined: [],
    };
  }

  /** Checks if the given object implements the Defintion interface
   * @param value The object to inspect
   * @returns Wheter or not the object implements Definition
   */
  export function is(value: any): value is Definition {
    if (value) {
      if (value.Defined && Array.isArray(value.Defined)) {
        if (value.Excluded && Array.isArray(value.Excluded)) {
          return true;
        }
      }
    }

    return false;
  }
}

/**The interface for MCDefinitions*/
export interface MCDefinition {
  [category: string]: Definition;
}

/**The namespace that provides functions for the MCDefinition interface*/
export namespace MCDefinition {
  /**The default filename of MCDefintions*/
  export const filename = ".mcdefinitions";

  /**Converts the given contents as if its file contents and returns a MCDefinition object
   * @param content The contents of the given files
   */
  export function parse(content: string): MCDefinition {
    let parts = content.split(/(\r\n|\n)/);
    let Out = MCDefinition.createEmpty();

    parts.forEach((property) => {
      //Remove comment
      let cindex = property.indexOf("#");

      if (cindex >= 0) {
        property = property.substring(0, cindex);
      }

      let index = property.indexOf("=");

      if (index >= 0) {
        const name = property.substring(0, index).toLowerCase();
        const value = property.substring(index + 1, property.length);

        let container = getOrAdd(Out, name);
        Definition.add(container, value);
      }
    });

    return Out;
  }

  /**
   *
   * @param data
   * @param category
   */
  export function getOrAdd(data: MCDefinition, category: string): Definition {
    let item = data[category];

    if (item === undefined || item === null) {
      item = Definition.createEmpty();
      data[category] = item;
    }

    return item;
  }

  /**Converts the given MCDefinition object into a file content rep of the object
   * @param data The MCDefinition to convert
   * @returns A text rep of the object
   */
  export function toString(data: MCDefinition): string {
    let Out = "";

    Out += Definition.toString(data.Tags, "tag");
    Out += Definition.toString(data.Objectives, "objective");
    Out += Definition.toString(data.Names, "name");
    Out += Definition.toString(data.Families, "family");

    return Out;
  }

  /**Creates an empty version of MCDefinition
   * @returns An empty definition of MCDefinition
   */
  export function createEmpty(): MCDefinition {
    return {};
  }

  /**Appends the given property and value into the give file
   * @param filepath The path to the MCAttributes
   * @param key The key of the value
   * @param value The value of the porerty
   * @param exclude Whetever or not the exclude the value
   */
  export function appendSync(filepath: string, key: string, value: string, exclude: boolean = false): void {
    if (exclude) {
      value = "!" + value;
    }

    fs.appendFileSync(filepath, `${key}=${value}\n`);
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

  /** Loads the content of the given file into a MCDefinition
   * @param filepath The path to the file to load
   * @returns A filled MCDefinition
   */
  export function loadSync(filepath: string): MCDefinition {
    if (fs.existsSync(filepath)) {
      let buffer = fs.readFileSync(filepath);

      return parse(buffer.toString());
    }

    return createEmpty();
  }

  /** Loads the content of the given file into a MCDefinition
   * @param filepath The path to the file to load
   * @returns A filled promise that returns a MCDefinition
   */
  export async function load(filepath: string): Promise<MCDefinition> {
    let P = fs.promises.readFile(filepath);

    return P.then((buffer) => parse(buffer.toString()));
  }

  /** Saves the given MCDefinition into the specified file
   * @param data The data to save
   * @param filepath The filepath to save to
   */
  export function saveSync(data: MCDefinition, filepath: string): void {
    const content = toString(data);

    fs.writeFileSync(filepath, content);
  }

  /** Saves the given MCDefinition into the specified file
   * @param data The data to save
   * @param filepath The filepath to save to
   * @returns A promise for when the file will be saved
   */
  export async function save(data: MCDefinition, filepath: string): Promise<void> {
    const content = toString(data);

    return fs.promises.writeFile(filepath, content);
  }
}

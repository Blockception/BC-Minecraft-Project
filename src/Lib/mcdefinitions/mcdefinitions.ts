import * as fs from "fs";

/**
 *
 */
export interface Definition {
  /**
   *
   */
  Defined: string[];

  /**
   *
   */
  Excluded: string[];
}

/**
 *
 */
export namespace Definition {
  /**
   *
   * @param container
   * @param value
   */
  export function Add(container: Definition, value: string): void {
    if (value.startsWith("!")) {
      container.Excluded.push(value.substring(1, value.length));
    } else {
      container.Defined.push(value);
    }
  }

  /**
   *
   * @param container
   * @param key
   * @returns
   */
  export function ToString(container: Definition, key: string): string {
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

  /**
   *
   * @returns
   */
  export function CreateEmpty(): Definition {
    return {
      Excluded: [],
      Defined: [],
    };
  }
}

/**
 *
 */
export interface MCDefinition {
  /** */
  Tags: Definition;

  /** */
  Objectives: Definition;

  /** */
  Families: Definition;

  /** */
  Names: Definition;
}

/**
 *
 */
export namespace MCDefinition {
  /**
   *
   * @param content
   */
  export function Parse(content: string): MCDefinition {
    let parts = content.split("\n");
    let Out = MCDefinition.CreateEmpty();

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

        switch (name) {
          case "tag":
            Definition.Add(Out.Tags, value);

          case "objective":
            Definition.Add(Out.Objectives, value);

          case "family":
            Definition.Add(Out.Families, value);

          case "name":
            Definition.Add(Out.Names, value);

          default:
        }
      }
    });

    return Out;
  }

  /**
   *
   * @param data
   * @returns
   */
  export function ToString(data: MCDefinition): string {
    let Out = "";

    Out += Definition.ToString(data.Tags, "tag");
    Out += Definition.ToString(data.Objectives, "objective");
    Out += Definition.ToString(data.Names, "name");
    Out += Definition.ToString(data.Families, "family");

    return Out;
  }

  /**
   *
   * @param filepath
   */
  export function LoadSync(filepath: string): MCDefinition {
    if (fs.existsSync(filepath)) {
      let buffer = fs.readFileSync(filepath);

      return Parse(buffer.toString());
    }

    return CreateEmpty();
  }

  /**
   *
   * @param filepath
   * @returns
   */
  export async function Load(filepath: string): Promise<MCDefinition> {
    let P = fs.promises.readFile(filepath);

    return P.then((buffer) => Parse(buffer.toString()));
  }

  /**
   *
   * @param data
   * @param filepath
   */
  export function SaveSync(data: MCDefinition, filepath: string): void {
    const content = ToString(data);

    fs.writeFileSync(filepath, content);
  }

  /**
   *
   * @param data
   * @param filepath
   * @returns
   */
  export async function Save(data: MCDefinition, filepath: string): Promise<void> {
    const content = ToString(data);

    return fs.promises.writeFile(filepath, content);
  }

  /**
   *
   * @returns
   */
  export function CreateEmpty(): MCDefinition {
    return {
      Families: Definition.CreateEmpty(),
      Names: Definition.CreateEmpty(),
      Objectives: Definition.CreateEmpty(),
      Tags: Definition.CreateEmpty(),
    };
  }

  /**
   *
   * @param filepath
   * @param key
   * @param value
   * @param exclude
   */
  export function Append(filepath: string, key: string, value: string, exclude: boolean = false): void {
    if (exclude) {
      value = "!" + value;
    }

    fs.appendFileSync(filepath, `${key}=${value}\n`);
  }
}

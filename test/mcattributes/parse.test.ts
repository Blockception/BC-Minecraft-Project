import { assert } from "console";
import { MCAttributes } from "../../src/main";

const Text1 = `diagnostics.objectives=true
diagnostics.tags=false
diagnostics.json=true`;

const Attribute1 = [
  { key: "diagnostics.objectives", value: "true" },
  { key: "diagnostics.tags", value: "false" },
  { key: "diagnostics.json", value: "true" },
];

suite("mcattribute", () => {
  test("parse1", () => {
    let parse = MCAttributes.Parse(Text1);

    for (var I = 0; I < Attribute1.length; I++) {
      const element = Attribute1[I];

      const value = parse[element.key];

      assert(value === element.value, `expected: ${element.value} got ${value}`);
    }
  });
});

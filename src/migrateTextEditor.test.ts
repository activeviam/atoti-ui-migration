import { migrateTextEditor } from "./migrateTextEditor";
import { legacyTextEditor } from "./__test_resources__/legacyTextEditor";

describe("migrateTextEditor", () => {
  it("returns the ActiveUI5 Text Editor widget state corresponding to the given ActiveUI4 Rich Text Editor widget state", () => {
    expect(migrateTextEditor(legacyTextEditor)).toMatchInlineSnapshot(`
      Object {
        "displayMode": "view",
        "name": "Text Editor",
        "text": "## Markdown Text Editor

      It handles:
      - **bold text**
      - *or in italics*
      - \`code\`
      - mathematical formulas using [KaTex](https://katex.org) such as $\\\\frac{4\\\\pi}{c}\\\\vec{\\\\mathbf{j}} \\\\nabla \\\\cdot \\\\vec{\\\\mathbf{E}} = 4 \\\\pi \\\\rho$ 
      - and a lot of other things such as tables and images.

      See the entire list of supported features at https://markdown-it.github.io/.
      ",
        "widgetKey": "text-editor",
      }
    `);
  });
});

import { migrateTextEditor } from "./migrateTextEditor";
import { legacyTextEditor } from "./__test_resources__/legacyTextEditor";

describe("migrateTextEditor", () => {
  it("returns the ActiveUI5 Text Editor widget state corresponding to the given ActiveUI4 Rich Text Editor widget state", () => {
    const migratedTextEditor = migrateTextEditor(legacyTextEditor);
    expect(migratedTextEditor).toMatchInlineSnapshot(`
      {
        "displayMode": "view",
        "name": "Text Editor",
        "text": "## Markdown Text Editor

      It handles:
      - **bold text**
      - *or in italics*
      - \`code\`
      - mathematical formulas using [KaTex](https://katex.org) such as \`katex \\frac{4\\pi}{c}\\vec{\\mathbf{j}} \\nabla \\cdot \\vec{\\mathbf{E}} = 4 \\pi \\rho\` 
      - and a lot of other things such as tables and images.

      See the entire list of supported features at https://markdown-it.github.io/.
      ",
        "widgetKey": "text-editor",
      }
    `);
  });

  it("converts katex block formulas", () => {
    expect(
      migrateTextEditor({
        type: "container",
        name: "Text Editor",
        value: {
          style: {},
          showTitleBar: true,
          body: {
            editingMode: "view",
            renderer: "markdown",
            content:
              "$$Curvature\\ risk = \\sqrt{max\\left ( 0,\\sum _{b} K_{b}^{2} + \\sum _{b}\\sum _{c\\neq b}\\gamma_{bc}\\cdot S_b \\cdot S_c \\cdot \\psi (S_b,S_c) \\right )}$$",
          },
          containerKey: "rich-text-editor",
        },
      }).text,
    ).toBe(`\`\`\`katex
Curvature\\ risk = \\sqrt{max\\left ( 0,\\sum _{b} K_{b}^{2} + \\sum _{b}\\sum _{c\\neq b}\\gamma_{bc}\\cdot S_b \\cdot S_c \\cdot \\psi (S_b,S_c) \\right )}
\`\`\``);
  });
});

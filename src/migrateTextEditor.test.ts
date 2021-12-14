import { migrateTextEditor } from "./migrateTextEditor";
import { legacyTextEditor } from "./__test_resources__/legacyTextEditor";

describe("migrateTextEditor", () => {
  let warn: Console["warn"];

  beforeAll(() => {
    warn = console.warn;
    console.warn = jest.fn();
  });

  afterAll(() => {
    console.warn = warn;
  });

  it("returns the ActiveUI5 Text Editor widget state corresponding to the given ActiveUI4 Rich Text Editor widget state", () => {
    const migratedTextEditor = migrateTextEditor(legacyTextEditor);
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(
      "The `text-editor` widget is not part of the plugin registry in the ActiveUI 5 starter.\nMake sure to add it in your project.\n See https://activeviam.com/activeui/documentation/5.0.3/docs/tutorial/yourFirstCustomWidget#extend-activeui."
    );
    expect(migratedTextEditor).toMatchInlineSnapshot(`
      Object {
        "displayMode": "view",
        "name": "Text Editor",
        "text": "## Markdown Text Editor

      It handles:
      - **bold text**
      - *or in italics*
      - \`code\`
      - mathematical formulas using [KaTex](https://katex.org) such as \`katex \\\\frac{4\\\\pi}{c}\\\\vec{\\\\mathbf{j}} \\\\nabla \\\\cdot \\\\vec{\\\\mathbf{E}} = 4 \\\\pi \\\\rho\` 
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
      }).text
    ).toBe(`\`\`\`katex
Curvature\\ risk = \\sqrt{max\\left ( 0,\\sum _{b} K_{b}^{2} + \\sum _{b}\\sum _{c\\neq b}\\gamma_{bc}\\cdot S_b \\cdot S_c \\cdot \\psi (S_b,S_c) \\right )}
\`\`\``);
  });
});

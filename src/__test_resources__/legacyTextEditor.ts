import type { LegacyWidgetState } from "../4.3_to_5.0/migration.types";

/**
 * The widgetState of a legacy Text Editor, useful for unit tests.
 */
export const legacyTextEditor: LegacyWidgetState = {
  type: "container",
  name: "Text Editor",
  value: {
    style: {},
    showTitleBar: true,
    body: {
      editingMode: "view",
      renderer: "markdown",
      content:
        "## Markdown Text Editor\n\nIt handles:\n- **bold text**\n- *or in italics*\n- `code`\n- mathematical formulas using [KaTex](https://katex.org) such as $\\frac{4\\pi}{c}\\vec{\\mathbf{j}} \\nabla \\cdot \\vec{\\mathbf{E}} = 4 \\pi \\rho$ \n- and a lot of other things such as tables and images.\n\nSee the entire list of supported features at https://markdown-it.github.io/.\n",
    },
    containerKey: "rich-text-editor",
  },
};

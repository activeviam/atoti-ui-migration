import type { MdxString } from "@activeviam/activeui-sdk-5.0";
import type { LegacyContextValues } from "./_migrateContextValues";

export interface LegacyLayoutLeaf {
  ck: string;
  size?: number;
}

export interface LegacyWidgetState {
  name: string;
  type: "container";
  value: {
    style?: any;
    showTitleBar?: boolean;
    body: any;
    containerKey: string;
  };
  writable?: boolean;
}

/**
 * Legacy dashboard page, supported for compatibility with ActiveUI 4.
 * The legacy part is that the content is an array and not a map (whereas we need to access the widgets it contains all the time).
 */
export interface LegacyDashboardPage {
  content: { bookmark: LegacyWidgetState; key: string }[];
  filters?: { [cubeName: string]: MdxString[] };
  contextValues?: { [cubeName: string]: LegacyContextValues };
  layout: LegacyLayout;
  name: string;
}

/**
 * ActiveUI 4 dashboard page layout.
 * The legacy part is that the tree is binary, leading to an unexpected resizing behaviour.
 */
export interface LegacyLayout {
  children: {
    [key: string]: LegacyLayout | LegacyLayoutLeaf;
  };
  direction: "column" | "row";
  size?: number;
}

/**
 * ActiveUI 4 dashboard state.
 */
export interface LegacyDashboardState {
  name: string;
  type: "container";
  value: {
    containerKey: "dashboard";
    showTitleBar: boolean;
    style: Record<string, unknown>;
    body: {
      pages: LegacyDashboardPage[];
      filters?: { [cubeName: string]: MdxString[] };
      contextValues?: { [cubeName: string]: LegacyContextValues };
    };
  };
  writable: boolean;
}

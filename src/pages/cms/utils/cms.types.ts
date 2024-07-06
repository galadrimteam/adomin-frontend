/* eslint-disable @typescript-eslint/no-explicit-any */

export interface BlockConfig {
  name: string;
  propsExample: Record<string, any>;
}

export interface LayoutConfig {
  name: string;
  propsExample: Record<string, any>;
}

export interface CmsConfig {
  blocks: BlockConfig[];
  layouts: LayoutConfig[];
}

export interface LayoutParams {
  name: string;
  props: Record<string, any>;
}

export type GridTemplateAreas = string[][];

export interface GridLayout {
  sm: GridTemplateAreas;
  medium: GridTemplateAreas | null;
  large: GridTemplateAreas | null;
  xl: GridTemplateAreas | null;
}

export type BlockProps<T = object> = T & { gridIdentifier: string };

export interface BlockParams {
  name: string;
  props: BlockProps<Record<string, any>>;
}

export interface CmsPage {
  id: number;

  url: string;
  title: string;
  internal_label: string;
  config: {
    layout: LayoutParams;
    blocks: BlockParams[];
    gridLayout: GridLayout;
  };

  views: number;

  is_published: boolean;

  created_at: Date;
  updated_at: Date;
}

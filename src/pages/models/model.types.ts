import { AdominFieldConfig } from "./fields.types";

export interface ModelField {
  name: string;
  adomin: AdominFieldConfig;
  isVirtual: boolean;
}

export interface AdominStaticRightsConfig {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  list: boolean;
}

export interface ModelFieldsConfig {
  name: string;
  label: string;
  labelPluralized: string;
  fields: ModelField[];
  primaryKey: string;
  isHidden: boolean;
  staticRights: AdominStaticRightsConfig;
  globalActions: AdominActionConfig[]
  instanceActions: AdominActionConfig[]
}

export type AdominActionConfig = {
  /** Must be unique for the model */
  name: string
  /**
   * Icon name, by default this uses Tabler icons
   *
   * You can browse the list of available icons at:
   * https://tabler.io/icons
   */
  icon: string
  /** icon color */
  iconColor?: string
  /** Tooltip shown on the frontend, when hovering the button */
  tooltip: string
} & AdominActionTypes

type AdominActionTypes = AdominActionLink | AdominActionBackend

export interface AdominActionBackend {
  type: 'backend-action'
}

export interface AdominActionLink {
  type: 'link'
  /** Link to open */
  href: string
  /** Open the link in a new tab @default false */
  openInNewTab?: boolean
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ModelData = Record<string, any>;

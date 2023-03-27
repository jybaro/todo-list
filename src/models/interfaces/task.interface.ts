export interface Task {
  id?: number;
  color?: string;
  description?: string;

  left?: number;
  top?: number;

  width?: number;
  height?: number;

  zindex?: string;
  done?: boolean;
  deleted?: boolean;

  owner?: string;
}

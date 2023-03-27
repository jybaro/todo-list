export interface IStickyNote {
  id: number;
  color: string;
  text: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  zIndex: string;
  visible: boolean;
}

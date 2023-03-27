import { IZone } from '../../../models/interfaces/zone.interface';

const detectZone = (props: IZone) => {
  const { x, y, id } = props;
  let zoneDetected: Boolean = false;
  const elements = document.elementsFromPoint(x, y);
  elements.forEach((element) => {
    if (element.id === id) {
      zoneDetected = true;
    }
  });
  return zoneDetected;
};

export default detectZone;

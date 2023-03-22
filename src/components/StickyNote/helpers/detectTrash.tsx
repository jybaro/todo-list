const detectTrash = (x, y) => {
  let trashDetected: Boolean = false;
  const elements = document.elementsFromPoint(x, y);
  elements.forEach((element) => {
    if (element.id === 'trash') {
      trashDetected = true;
    }
  });
  return trashDetected;
};

export default detectTrash;

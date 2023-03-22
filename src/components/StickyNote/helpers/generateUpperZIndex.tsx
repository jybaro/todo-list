const generateUpperZIndex = (): string => {
  return Date.now().toString().slice(-10, -2);
};

export default generateUpperZIndex;

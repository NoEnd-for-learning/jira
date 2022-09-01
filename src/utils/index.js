export const isFalsy = (v) => v === 0 ? false : !v;

export const cleanObject = (obj) => {
  const result = {...obj};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if(isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

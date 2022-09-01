export const isFalsy = (v: any) => v === 0 ? false : !v;

export const cleanObject = (obj: object) => {
  const result = {...obj};
  Object.keys(obj).forEach((key) => {
    const value = obj[key as keyof typeof obj];
    if(isFalsy(value)) {
      delete result[key as keyof typeof obj];
    }
  });
  return result;
};

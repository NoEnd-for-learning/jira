// unknown 不能赋值给任何类型的值
export const isFalsy = (v: unknown): boolean => v === 0 ? false : !v;

export const cleanObject = (obj: object): object => {
  const result = {...obj};
  Object.keys(obj).forEach((key) => {
    const value = obj[key as keyof typeof obj];
    if(isFalsy(value)) {
      delete result[key as keyof typeof obj];
    }
  });
  return result;
};

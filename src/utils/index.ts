// unknown 不能赋值给任何类型的值
export const isVoid = (v: any): boolean => [undefined, null, ''].includes(v);

export const cleanObject = (obj: {[key: string]: unknown}): object => {
  const result = {...obj};
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if(isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

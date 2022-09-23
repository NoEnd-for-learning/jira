// unknown 不能赋值给任何类型的值
export const isVoid = (v: any): boolean => [undefined, null, ''].includes(v);

export const cleanObject = (obj: {[key: string]: unknown}): object => {
  if(!obj) {
    return {};
  }
  const result = {...obj};
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if(isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const resetRoute = () => window.location.href = window.location.origin;

export const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value);

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
    O extends { [key in string]: unknown },
    K extends keyof O
    >(
    obj: O,
    keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
      keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

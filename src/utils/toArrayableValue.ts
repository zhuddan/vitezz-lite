/**
 * 将输入值转换为数组形式，根据参数控制是否包裹单个值。
 * 确保我只处理数组
 * @param maybeArray 输入值，可以是单个值或数组
 * @param strict 严格模式，默认为 true。在严格模式下，如果输入是数组，则直接返回该数组。
 *               当 T 是数组且只有一个元素时，也返回 T，而不是 T[]
 *               在非严格模式下，无论输入是否是数组，都将其包裹在数组中。适用于处理 T 为数组类型时，保持期望的数据结构。
 *
 *               严格数组模式 默认开启 只要 maybeArray 是数组(不管T是否数组)则永远返回 maybeArray
 *               但是当 T 是数组时候 且只有只一个值时
 *               例如 type Data = string[]
 *               toArrayableValue<Data>(['a','b','c']) = ['a','b','c'] 而不是 Data[] 这不符合预期(虽然 string[]也是个数组)
 *               但是期望的是 [['a','b','c']]  一个二维数组 Data[]
 *               这时候传入 strict = false
 * @example
 *  toArrayableValue(['a','b','c']) = ['a','b','c']
 *  toArrayableValue('a') = ['a']
 *  toArrayableValue(['a','b','c'], false) = [['a','b','c']]
 *  strict = false 只对 maybeArray 是数组时有效
 *  toArrayableValue('a', false) = ['a']
 */
export function toArrayableValue<T>(maybeArray?: Arrayable<T>, strict = true): T[] {
  if (!maybeArray) return [];
  if (strict && Array.isArray(maybeArray))
    return maybeArray;
  else return [maybeArray] as T[];
}

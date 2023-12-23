/**
 * prop type helpers
 * help us to write less code and reduce bundle size
 */
import type { CSSProperties, PropType } from 'vue';

export const unknownProp = null as unknown as PropType<unknown>;

export const numericProp = [Number, String];

export const truthProp = {
  type: Boolean,
  default: true as const,
};

export const createRequiredProp = <T>(type: T) => ({
  type,
  required: true as const,
});

export const createArrayProp = <T>() => ({
  type: Array as PropType<T[]>,
  default: () => [],
});

export const createBooleanProp = (value = false) => ({
  type: Boolean,
  default: value,
});

export const createNumberProp = <T>(defaultVal: T) => ({
  type: Number as unknown as PropType<T>,
  default: defaultVal,
});

export const createNumericProp = <T>(defaultVal: T) => ({
  type: numericProp,
  default: defaultVal,
});

export const createStringProp = <T>(defaultVal: T) => ({
  type: String as unknown as PropType<T>,
  default: defaultVal,
});

export const createStyleProp = () => ({
  type: [String, Object, Array] as PropType<Arrayable<string | CSSProperties>>,
});
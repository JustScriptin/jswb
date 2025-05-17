export const CATEGORY_METHODS = {
  array: ["reduce", "map", "filter", "forEach"] as const,
  map: ["set", "get", "has"] as const,
  object: ["keys", "values", "entries"] as const,
  set: ["add", "has", "delete"] as const,
} as const;

export type CategoryName = keyof typeof CATEGORY_METHODS;
export type MethodName<T extends CategoryName> =
  (typeof CATEGORY_METHODS)[T][number];
export type Category<T extends CategoryName = CategoryName> = {
  name: T;
  method: MethodName<T>;
};

export type TestCase = {
  input: unknown[];
  expected: unknown;
  message: string;
};

export type Exercise<T extends CategoryName = CategoryName> = {
  slug: string;
  title: string;
  description: string;
  category: Category<T>;
  starterCode: string;
  testCases: TestCase[];
  Component: React.ComponentType;
};

import * as ReduceSumModule from "@/features/codingChallenges/content/exercises/reduce-sum.mdx";
import * as ReduceMaxModule from "@/features/codingChallenges/content/exercises/reduce-max.mdx";
import * as ReduceCountModule from "@/features/codingChallenges/content/exercises/reduce-count.mdx";

const ReduceSum = ReduceSumModule.default;
const reduceSumMeta = (ReduceSumModule as any).metadata;

const ReduceMax = ReduceMaxModule.default;
const reduceMaxMeta = (ReduceMaxModule as any).metadata;

const ReduceCount = ReduceCountModule.default;
const reduceCountMeta = (ReduceCountModule as any).metadata;

export const EXERCISES: Exercise[] = [
  { ...reduceSumMeta, description: reduceSumMeta.excerpt, Component: ReduceSum },
  { ...reduceMaxMeta, description: reduceMaxMeta.excerpt, Component: ReduceMax },
  { ...reduceCountMeta, description: reduceCountMeta.excerpt, Component: ReduceCount },
];

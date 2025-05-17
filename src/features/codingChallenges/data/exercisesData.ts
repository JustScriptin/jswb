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

import type { FC } from "react";

export type Exercise<T extends CategoryName = CategoryName> = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category<T>;
  starterCode: string;
  testCases: TestCase[];
  Component: FC<Record<string, never>>;
};

import ReduceSum, { metadata as reduceSum } from "@/features/codingChallenges/content/reduce-sum.mdx";
import ReduceMax, { metadata as reduceMax } from "@/features/codingChallenges/content/reduce-max.mdx";
import ReduceCount, { metadata as reduceCount } from "@/features/codingChallenges/content/reduce-count.mdx";

export const EXERCISES: Exercise[] = [
  { ...reduceSum, Component: ReduceSum },
  { ...reduceMax, Component: ReduceMax },
  { ...reduceCount, Component: ReduceCount },
];

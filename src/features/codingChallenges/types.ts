import { z } from "zod";

export const LANGUAGES = ["typescript", "javascript"] as const;
export const LanguageSchema = z.enum(LANGUAGES);
export type Language = z.infer<typeof LanguageSchema>;

export const CATEGORY_METHODS = {
  array: ["reduce", "map", "filter", "forEach"] as const,
  map: ["set", "get", "has"] as const,
  object: ["keys", "values", "entries"] as const,
  set: ["add", "has", "delete"] as const,
} as const;

const categoryNames = ["array", "map", "object", "set"] as const;
export const CategoryNameSchema = z.enum(categoryNames);
export type CategoryName = z.infer<typeof CategoryNameSchema>;

const methodNames = [
  ...CATEGORY_METHODS.array,
  ...CATEGORY_METHODS.map,
  ...CATEGORY_METHODS.object,
  ...CATEGORY_METHODS.set,
] as const;
export const MethodNameSchema = z.enum(methodNames);
export type MethodName = z.infer<typeof MethodNameSchema>;

export const CategorySchema = z
  .object({
    name: CategoryNameSchema,
    method: MethodNameSchema,
  })
  .superRefine((val, ctx) => {
    if (!CATEGORY_METHODS[val.name].includes(val.method as never)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Method ${val.method} is not valid for ${val.name}`,
      });
    }
  });
export type Category = z.infer<typeof CategorySchema>;

export const EducationSchema = z.object({
  concept: z.string(),
  explanation: z.string(),
  useCases: z.array(z.string()),
  visualExample: z.string().optional(),
  commonMistakes: z.array(z.string()).optional(),
  tips: z.array(z.string()).optional(),
});
export type Education = z.infer<typeof EducationSchema>;

export const TestCaseSchema = z.object({
  input: z.array(z.unknown()),
  expected: z.unknown(),
  message: z.string(),
});
export type TestCase = z.infer<typeof TestCaseSchema>;

export const ExerciseSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  category: CategorySchema,
  education: EducationSchema,
  starterCode: z.string(),
  testCases: z.array(TestCaseSchema),
});
export type Exercise = z.infer<typeof ExerciseSchema>;

export const TestResultSchema = z.object({
  passed: z.boolean(),
  message: z.string(),
  error: z.string().optional(),
});
export type TestResult = z.infer<typeof TestResultSchema>;

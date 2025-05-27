# MDX Content Guide for JavaScript Methods Learning App

## Overview

This application uses MDX (Markdown + JSX) for exercise content management. MDX allows us to write content in Markdown while embedding React components for interactive elements.

## Technology Stack

- **Next.js 15** with App Router
- **next-mdx-remote/rsc** for server-side MDX compilation
- **React 19** with React Compiler
- **Custom MDX components** for consistent styling

## Directory Structure

```
content/
└── exercises/
    ├── reduce-sum.mdx
    ├── reduce-max.mdx
    ├── reduce-count.mdx
    ├── filter-even.mdx
    ├── map-square.mdx
    ├── foreach-sum.mdx
    └── object-keys.mdx
```

## MDX File Structure

Each exercise MDX file must follow this exact structure:

````mdx
---
title: "Exercise Title"
slug: "exercise-slug"
category: "array|object|string"
method: "methodName"
---

# Exercise Title

### Problem

Brief description of what the user needs to implement.

### Example

```js
Input: [1, 2, 3];
Output: 6;
```
````

### Requirements

1. First requirement
2. Second requirement
3. Third requirement

## Education

### Learning Concept Title

## Main Education Content

Educational content explaining the concept...

### Common Use Cases

- **Use Case 1**: Description
- **Use Case 2**: Description

### Pro Tips

- Tip 1
- Tip 2

## Starter Code

```javascript
const solve = (input) => {
  // Implementation here
  return result;
};
```

## Test Cases

### Test 1

- **Input:** `[[1,2,3]]`
- **Expected:** `6`
- **Description:** Test description

### Test 2

- **Input:** `[[]]`
- **Expected:** `0`
- **Description:** Test description

````

## Important Formatting Rules

### Heading Hierarchy

1. **Main Title**: Use `#` only for the exercise title at the top
2. **Major Sections**: Use `##` for Education, Starter Code, Test Cases
3. **Subsections**: Use `###` for subsections within major sections
4. **Content Headers**: Use `##` for content headers within Education section

❌ **Incorrect:**
```mdx
## Education
### Concept
# Main Content Header  <!-- Wrong: Don't use # inside sections -->
````

✅ **Correct:**

```mdx
## Education

### Concept

## Main Content Header <!-- Correct: Use ## for content headers -->
```

### Frontmatter Requirements

All fields in the frontmatter are required:

- `title`: Display title for the exercise
- `slug`: URL-friendly identifier (must match filename without .mdx)
- `category`: One of: `array`, `object`, `string`, `number`
- `method`: The JavaScript method being taught

### Code Blocks

- Use triple backticks with language identifier
- JavaScript code blocks: ` ```javascript `
- Plain text examples: ` ```text `
- Input/Output examples: ` ```js `

### Test Case Format

Test cases must follow this exact format for parsing:

```mdx
### Test N

- **Input:** `[[value1, value2]]`
- **Expected:** `result`
- **Description:** What this test validates
```

## How the System Works

### 1. Content Loading

The `exerciseContentService.ts` handles MDX parsing:

```typescript
// Loads MDX file from content/exercises/[slug].mdx
const fileContent = await fs.readFile(filePath, "utf-8");

// Extracts frontmatter using gray-matter
const { data: frontmatter, content } = matter(fileContent);

// Splits content into sections based on ## headings
const majorSections = content.split(/^## /m);
```

### 2. Content Compilation

MDX content is compiled server-side using `compileMDX`:

```typescript
const { content: compiledContent } = await compileMDX({
  source: mdxSource,
  options: { parseFrontmatter: false },
  components: MDXComponents,
});
```

### 3. Custom Components

The `MDXComponents` in `src/lib/mdx-components.tsx` provides custom styling:

- Headings with proper spacing and typography
- Code blocks with syntax highlighting
- Lists with consistent styling
- Links that open in new tabs
- Responsive images

### 4. Rendering Flow

1. User navigates to `/exercises/[slug]`
2. `page.tsx` loads exercise metadata and MDX content
3. Content is passed to `ExerciseClientMDX` component
4. MDX content is rendered in appropriate tabs (Learn, Instructions)

## Adding a New Exercise

1. **Create MDX file**: `content/exercises/new-exercise.mdx`
2. **Add metadata**: Update `EXERCISE_METADATA` in `exerciseMetadata.ts`
3. **Follow structure**: Use the template above
4. **Test locally**: Ensure all sections render correctly

## Common Issues and Solutions

### Issue: Content not showing on Learn tab

**Solution**: Check heading hierarchy - ensure no `#` headings inside Education section

### Issue: Test cases not parsing

**Solution**: Verify exact format with `- **Label:** \`value\`` pattern

### Issue: Code blocks not highlighting

**Solution**: Ensure language identifier is specified after triple backticks

## Best Practices

1. **Keep content focused**: Each exercise should teach one concept
2. **Use examples**: Provide clear input/output examples
3. **Progressive difficulty**: Start with simple cases, add complexity
4. **Explain why**: Don't just show how, explain why it matters
5. **Real-world context**: Include practical use cases

## Maintenance

### Updating Content

- Edit the MDX file directly
- Changes are reflected immediately in development
- No need to restart the server

### Adding New Categories

1. Update type definitions in `types.ts`
2. Add category to `CATEGORY_METHODS` constant
3. Update category colors in `constants.ts`

### Extending Components

Custom MDX components can be added in `mdx-components.tsx` for new formatting needs.

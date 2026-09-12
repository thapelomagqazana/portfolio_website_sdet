/**
 * lint-staged configuration — Thapelo Magqazana Engineering Portfolio
 *
 * Runs formatters and linters on staged files only.
 * Type checking is NOT here — it runs in .husky/pre-commit
 * because tsc needs the full project type graph.
 */
export default {
  // TypeScript / React source — format + lint + fix
  '*.{ts,tsx}': ['prettier --write', 'eslint --fix'],

  // Config files, JSON, styles — format only
  '*.{js,cjs,mjs,json,css,scss}': ['prettier --write'],

  // Markdown — format only (docs are excluded via .prettierignore)
  '*.md': ['prettier --write'],
};

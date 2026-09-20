import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'object-shorthand': ['error', 'always'],
      'no-else-return': 'error',
      'no-nested-ternary': 'error',
      'no-param-reassign': [
        'error',
        {
          props: true,
        },
      ],
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 0,
    },
  },

  // Harus terakhir agar rule formatting ESLint tidak berantem dengan Prettier
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig

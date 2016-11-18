export const TEST_TSCONFIG =
`{
  "compilerOptions": {
    "declaration": true,
    "moduleResolution": "node",
    "module": "commonjs",
    "target": "es5",
    "lib": [
      "es5",
      "es2015"
    ],
    "noImplicitAny": true,
    "sourceMap": true,
    "noUnusedParameters": true,
    "strictNullChecks": true,
    "types": [
      "node",
      "mocha"
    ]
  },
  "include": [
    "./**/*.ts"
  ]
}`;
export const TSCONFIG =
`{
  "compilerOptions": {
    "lib": [
      "es5",
      "es2015"
    ],
    "moduleResolution": "node",
    "declaration": true,
    "noImplicitAny": true,
    "sourceMap": true,
    "noUnusedParameters": true,
    "strictNullChecks": true,
    "outDir": ".tmp",
    "types": []
  },
  "include": [
    "src/**/*.ts"
  ]
}
`;
export const TSCONFIG_COMMONJS =
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
    "outDir": "lib/commonjs",
    "types": [
    ]
  },
  "files": [
    "src/index.ts"
  ]
}
`;
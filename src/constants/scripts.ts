export const SCRIPTS =
  {
    'test:lint': 'tslint src/**/*.ts src/*.ts',
    'test:unit': 'TS_NODE_PROJECT=test/tsconfig.json mocha -r ts-node/register test/*.ts',
    'test': 'npm run test:lint && npm run test:unit',
    'commit': 'git-cz',
    'changelog': 'conventional-changelog --infile CHANGELOG.md --same-file --release-count 0 --preset angular',
    'postchangelog': 'git add CHANGELOG.md && git commit -m \'docs(CHANGELOG): append to changelog\'',
    'build:es2015': 'tsc -P tsconfig.json',
    'build:commonjs': 'tsc -P tsconfig.commonjs.json',
    'build': 'npm run build:es2015 && npm run build:commonjs',
    'preversion': 'npm run build',
    'postversion': 'npm run changelog && git push origin master --tags && npm publish',
    'release:minor': 'npm version minor -m \'chore(package): v%s\'',
    'release:major': 'npm version major -m \'chore(package): v%s\'',
  };

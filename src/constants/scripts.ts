/* tslint:disable:max-line-length */
export const SCRIPTS =
  {
    'test:lint': 'northbrook tslint',
    'test:unit': 'northbrook mocha',
    'test': 'npm run test:lint && npm run test:unit',
    'commit': 'northbrook commit',
    'build': 'northbrook tsc',
    'preversion': 'npm run build',
    'release': 'northbrook release',
  };

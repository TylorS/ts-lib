export const NORTHBROOK_CONFIG =
`
import { plugin as tsc } from '@northbrook/ts';
import { plugin as tslint } from '@northbrook/tslint';
import { plugin as mocha } from '@northbrook/mocha';
import { plugin as northbrook } from 'northbrook/plugins';

const config =
  {
    plugins: [
      northbrook,
      mocha,
      tslint,
      tsc,
    ],

    mocha: {
      patterns: [
        'src/**/*.test.ts',
      ],
    },

    tsc: {
      es2015: true,
      patterns: [
        'src/**/*.ts',
        '!src/**/*.test.ts',
      ],
    },

    tslint: {
      patterns: [
        'src/**/*.ts',
      ],
    },
  };

export = config;
`;

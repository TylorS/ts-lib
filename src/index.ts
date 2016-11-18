#!/usr/bin/env node

import { run, app } from 'reginn';
import { initialize } from './commands/init';

const tsLib = app(initialize);

if (module === require.main)
  run(process.argv.slice(2), tsLib);

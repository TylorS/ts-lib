#!/usr/bin/env node
'use strict';

var dirname = require('path').dirname;

process.chdir(dirname(dirname(process.cwd())));

var initialize = require('./lib/commonjs/commands/init').initialize;

initialize.handler();

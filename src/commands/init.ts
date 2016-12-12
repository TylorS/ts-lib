import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';

import { command, alias, withCallback, Command } from 'reginn';
import { reduce } from 'ramda';
import { prompt, Question, InputQuestion } from 'typed-prompts';
import * as jsonbeautify from 'js-beautify';
import * as Listr from 'listr';
import * as mkdirp from 'mkdirp';

import * as constants from '../constants';
import { isFile } from '../helpers';

import { ISSUE_TEMPLATE } from '../templates/.github/ISSUE_TEMPLATE.md';
import { PULL_REQUEST_TEMPLATE } from '../templates/.github/PULL_REQUEST_TEMPLATE.md';
import { SETTINGS } from '../templates/.vscode/settings.json';
import { SRC_INDEX } from '../templates/src/index';
import { TEST_INDEX } from '../templates/test/index';
import { TEST_TSCONFIG } from '../templates/test/tsconfig.json';
import { CONTRIBUTING } from '../templates/CONTRIBUTING.md';
import { EDITORCONFIG } from '../templates/dot-editorconfig';
import { GITIGNORE } from '../templates/dot-gitignore';
import { NPMIGNORE } from '../templates/dot-npmignore';
import { TRAVIS } from '../templates/dot-travis.yml';
import { LICENSE } from '../templates/LICENSE.md';
import { README } from '../templates/README.md';
import { TSCONFIG_COMMONJS } from '../templates/tsconfig.commonjs.json';
import { TSCONFIG } from '../templates/tsconfig.json';
import { TSLINT } from '../templates/tslint.json';

const CURRENT_DIRECTORY = process.cwd();

const join = (directory: string) => path.join(CURRENT_DIRECTORY, directory);

export const initialize: Command = command(alias('init', 'i'));

withCallback(initialize, init);

function init () {
  const tasks = new Listr([
    {
      title: 'Scaffolding your application',
      task: () => {
        return new Listr([
          {
            title: 'Creating directories',
            task: () => {
              return sequence(
                () => makeDirectory(join('.github')),
                () => makeDirectory(join('.vscode')),
                () => makeDirectory(join('src')),
                () => makeDirectory(join('test')),
              );
            },
          },
          {
            title: 'Creating files',
            task: () => {
              return new Listr([
                {
                  title: '.github/ISSUE_TEMPLATE.md',
                  task: () => writeFile(join('.github/ISSUE_TEMPLATE.md'), ISSUE_TEMPLATE),
                },
                {
                  title: '.github/PULL_REQUEST_TEMPLATE.md',
                  task: () =>
                    writeFile(join('.github/PULL_REQUEST_TEMPLATE.md'), PULL_REQUEST_TEMPLATE),
                },
                {
                  title: '.vscode/settings.json',
                  task: () => writeFile(join('.vscode/settings.json'), SETTINGS),
                },
                {
                  title: 'src/index.ts',
                  task: () => writeFile(join('src/index.ts'), SRC_INDEX),
                },
                {
                  title: 'test/index.ts',
                  task: () => writeFile(join('test/index.ts'), TEST_INDEX),
                },
                {
                  title: 'test/tsconfig.json',
                  task: () => writeFile(join('test/tsconfig.json'), TEST_TSCONFIG),
                },
                {
                  title: 'CONTRIBUTING.md',
                  task: () => writeFile(join('CONTRIBUTING.md'), CONTRIBUTING),
                },
                {
                  title: '.editorconfig',
                  task: () => writeFile(join('.editorconfig'), EDITORCONFIG),
                },
                {
                  title: '.gitignore',
                  task: () => writeFile(join('.gitignore'), GITIGNORE),
                },
                {
                  title: '.npmignore',
                  task: () => writeFile(join('.npmignore'), NPMIGNORE),
                },
                {
                  title: '.travis.yml',
                  task: () => writeFile(join('.travis.yml'), TRAVIS),
                },
                {
                  title: 'LICENSE.md',
                  task: (ctx: any) => writeFile(join('LICENSE.md'), LICENSE(ctx.name)),
                },
                {
                  title: 'README.md',
                  task: (ctx: any) =>
                    writeFile(join('README.md'), README(ctx.packageName, ctx.description)),
                },
                {
                  title: 'tsconfig.commonjs.json',
                  task: () => writeFile(join('tsconfig.commonjs.json'), TSCONFIG_COMMONJS),
                },
                {
                  title: 'tsconfig.json',
                  task: () => writeFile(join('tsconfig.json'), TSCONFIG),
                },
                {
                  title: 'tslint.json',
                  task: () => writeFile(join('tslint.json'), TSLINT),
                },
              ]);
            },
          },
          {
            title: 'Make adjustments to package.json',
            task: () => modifyPackageJson(),
          },
          {
            title: 'Install dependencies',
            task: () => {
              const dependencies = [
                `@motorcycle/tslint`,
                `@types/mocha`,
                `@types/node`,
                `commitizen`,
                `cz-conventional-changelog`,
                `conventional-changelog-cli`,
                `ghooks`,
                `mocha`,
                `ts-node`,
                `typescript@latest`,
                `tslint@latest`,
                `validate-commit-msg`,
              ];

              return new Listr(dependencies.map(dep => ({
                title: 'Install ' + dep,
                task: () => installDependency(dep),
              })), { concurrent: true });
            },
          },
        ]);
      },
    },
  ]);

  const whatIsYourName: InputQuestion =
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (For licensing):',
    };

  const whatIsThePackageName: InputQuestion =
    {
      type: 'input',
      name: 'packageName',
      message: 'What is the name of your package?',
    };

  const packageDescription: InputQuestion =
    {
      type: 'input',
      name: 'description',
      message: 'Please write a short summary of your library:',
    };

  const questions: Array<Question> =
    [
      whatIsYourName,
      whatIsThePackageName,
      packageDescription,
    ];

  return sequence(
    () => prompt(questions),
    (answers: any) => tasks.run(answers),
  );
}

function writeFile (fileName: string, content: string): Promise<any> {
  return new Promise<any>(function (resolve, reject) {
    if (isFile(fileName))
      resolve(void 0);

    if (!isFile(fileName))
      fs.closeSync(fs.openSync(fileName, 'w'));

    fs.writeFile(fileName, content, function (err: Error) {
      if (err) reject(err);

      resolve(void 0);
    });
  });
}

function makeDirectory (path: string): Promise<any> {
  return new Promise<any>(function (resolve, reject) {
    mkdirp(path, function (err: Error, made: string) {
      if (err) reject(err);

      resolve(made);
    });
  });
};

function sequence (...promiseFns: Array<(x?: any) => Promise<any>>): Promise<any> {
  return reduce((promise, f) => {
    return promise.then((x: any) => f(x));
  }, Promise.resolve(), promiseFns);
}

const beautify = (obj: any) =>
  jsonbeautify(JSON.stringify(obj), { indent_size: 2, indent_char: ' ' });

function modifyPackageJson() {
  const pkgJson = require(join('package.json'));

  return new Promise((resolve) => {
    const pkg = Object.assign({}, pkgJson, {
      config: constants.CONFIG,
      scripts: constants.SCRIPTS,
      main: 'lib/commonjs',
      'jsnext:main': 'lib/es2015/index.js',
      module: 'lib/es2015/index.js',
      typings: 'lib/es2015/index.d.ts',
    });

    return writeFile(join('package.json'), beautify(pkg)).then(resolve);
  });
}

function installDependency (name: string, dev = true): Promise<any> {
  return new Promise((resolve, reject) => {
    const cmd = `npm install ${name} ${dev ? '--save-dev' : '--save'}`;

    exec(cmd, 'utf8',
      function (err: Error, stdout: string) {
        if (err) reject(err);
        resolve(stdout);
      },
    );
  });
}
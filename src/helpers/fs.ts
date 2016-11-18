import { join, relative } from 'path';
import * as fs from 'fs';
import { reduce , append, concat } from 'ramda';

export function getAllInDirectory (directory: string): Array<string> {
  return reduce((files: string[], file: string) => {
    const abspath = join(directory, file);

    if (isFile(abspath))
      return append(file, files);

    if (isDirectory(abspath))
      return concat(files,
        getAllInDirectory(abspath).map((f: string) => join(relative(directory, abspath), f)));

    return files;
  }, [], fs.readdirSync(directory));
}

export function exists (pathname: string) {
  try {
    return fs.statSync(pathname);
  } catch (e) {
    return false;
  }
}

/**
 * tests if an absolute path is a directory
 */
export function isDirectory (pathname: string) {
  const stats = exists(pathname);
  return stats ? stats.isDirectory() : false;
}

/**
 * tests if an absolute path is a file
 */
export function isFile (pathname: string) {
  const stats = exists(pathname);
  return stats ? stats.isFile() : false;
}
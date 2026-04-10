#!/usr/bin/env node
import { expand, copyAsync, copyMultipleAsync, copyRecursiveAsync } from '../src/index.js'
import { Package } from '@vanillaes/esmtk'
import { Command } from 'commander'

const pkg = new Package()
const program = new Command()
  .version(pkg?.version || '', '-v, --version')
  .usage(`[-r] source target

    Examples:
      $ cp SOURCE DEST
      $ cp SOURCE... DIRECTORY
      $ cp SOURCEGLOB... DIRECTORY
      $ cp -r SOURCEDIR DIRECTORY
  `)
  .description('Copy files and directories')
  .argument('[paths...]')
  // .option('-f, --force', 'Do not prompt before overwriting', false)
  .option('-r, --recursive', 'Copy directories recursively', false)
  .action((paths, options) => {
    cp(paths, options)
  })

program.parse(process.argv)

/**
 * POSIX cp Implemented in Node
 * @private
 * @param {string[]} paths Variadic of source/destination paths
 * @param {object} options 'cp' options
 * @param {boolean} options.force Do not prompt before overwriting
 * @param {boolean} options.recursive Copy file(s)/directorie(s) recursively
 */
export async function cp (paths, options) {
  if (paths.length < 2) {
    console.error('cp: Not enough arguments')
    process.exitCode = 1
    return
  }

  if (paths.length === 2) {
    const source = paths[0]
    const target = paths[1]

    if (!options?.recursive && !source.includes('*')) {
      await copyAsync(source, target, options?.force)
    }

    if (options?.recursive) {
      await copyRecursiveAsync(source, target, options?.force)
    }

    if (source.includes('*')) {
      const sources = await expand(source)
      await copyMultipleAsync(sources, target, options?.force)
    }
  }

  if (paths.length > 2) {
    const sourcePatterns = paths.slice(0, -1)
    const sourceFiles = await await Promise.all(sourcePatterns.map(source => expand(source)))
    const sources = sourceFiles.flat()
    const target = paths.slice(-1)[0]

    await copyMultipleAsync(sources, target, options?.force)
  }
}

#!/usr/bin/env node
import { expand, removeAsync, removeMultipleAsync, removeRecursiveAsync } from '../src/index.js'
import { Package } from '@vanillaes/esmtk'
import { Command } from 'commander'

const pkg = new Package()
const program = new Command()
  .version(pkg?.version || '', '-v, --version')
  .usage(`[...options] [files]

    Examples:
      $ rm FILE
      $ rm FILES...
      $ rm GLOB...
      $ rm -r DIRECTORY
  `)
  .description('Remove files or directories')
  .argument('[paths...]')
// .option('-f, --force', 'Do not prompt before overwriting', false)
  .option('-r, --recursive', 'Remove directories recursively', false)
  .action((paths, options) => {
    rm(paths, options)
  })

program.parse(process.argv)

/**
 * POSIX rm Implemented in Node
 * @private
 * @param {string[]} paths Variadic of file paths
 * @param {object} options 'rm' options
 * @param {boolean} options.force Do not prompt before overwriting
 * @param {boolean} options.recursive Copy file(s)/directorie(s) recursively
 */
export async function rm (paths, options) {
  if (paths.length === 1) {
    if (!options?.recursive && !paths[0].includes('*')) {
      const file = paths[0]
      await removeAsync(file, options?.force)
    }

    if (options?.recursive) {
      const directory = paths[0]
      await removeRecursiveAsync(directory, options?.force)
    }

    if (paths[0].includes('*')) {
      const glob = paths[0]
      const files = await expand(glob)
      await removeMultipleAsync(files, options?.force)
    }
  }

  if (paths.length > 1) {
    const files = await await Promise.all(paths.map(path => expand(path)))
    const flatFiles = files.flat()

    await removeMultipleAsync(flatFiles, options?.force)
  }
}

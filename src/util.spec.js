import { setup, teardown, test } from './__tests__/test.js'
import { expand } from '@vanillaes/esmtk'
import { rmSync } from 'node:fs'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const files = require('./__tests__/util.json')

setup(async (t) => {
  process.chdir(process.cwd())
  rmSync('test', { recursive: true, force: true })

  t.end()
})

test('expand #1 - match glob', files.expand, async (t) => {
  const actual = await expand('*.txt')
  const expect = ['test1.txt', 'test2.txt']

  t.deepEqual(actual, expect)
  t.end()
})

teardown(async (t) => {
  process.chdir(process.cwd())
  rmSync('test', { recursive: true, force: true })

  t.end()
})

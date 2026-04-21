import { exists, match } from '@vanillaes/esmtk'

/**
 * Expand file/glob into a list of paths
 * @param {string} source the source file/glob
 * @returns {Promise<string[]>} an array of paths
 */
export async function expand (source) {
  const isGlob = source.includes('*')
  if (isGlob) {
    const paths = await match(source, process.cwd(), '', true)
    if (paths.length === 0) {
      console.error(`${source} no matches found`)
      process.exitCode = 1
      return []
    }
    return paths
  } else {
    const sExists = await exists(source)
    if (!sExists) {
      console.error(`${source} No such file or directory`)
      process.exitCode = 1
      return []
    }
    return [source]
  }
}

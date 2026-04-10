/**
 * Expand file/glob into a list of paths
 * @param {string} source the source file/glob
 * @returns {Promise<string[]>} an array of paths
 */
export function expand(source: string): Promise<string[]>;

<h1 align="center">POSIX Core Utilities</h1>

<div align="center">CrossCross-Platform POSIX core-utils in JavaScript</div>

<br />

<div align="center">
  <a href="https://github.com/vanillaes/core-utils/releases"><img src="https://badgen.net/github/tag/vanillaes/core-utils?cache-control=no-cache" alt="GitHub Release"></a>
  <a href="https://www.npmjs.com/package/@vanillaes/core-utils"><img src="https://badgen.net/npm/v/@vanillaes/core-utils?icon=npm" alt="NPM Version"></a>
  <a href="https://www.npmjs.com/package/@vanillaes/core-utils"><img src="https://badgen.net/npm/dm/@vanillaes/core-utils?icon=npm" alt="NPM Downloads"></a>
  <a href="https://github.com/vanillaes/core-utils/actions"><img src="https://github.com/vanillaes/core-utils/workflows/Latest/badge.svg" alt="Latest Status"></a>
  <a href="https://github.com/vanillaes/core-utils/actions"><img src="https://github.com/vanillaes/core-utils/workflows/Release/badge.svg" alt="Release Status"></a>
</div>


## Commands

- [cp-es](#cp-es) - A cross-platform clone of the `cp` command in Linux
- [rm-es](#rm-es) - A cross-platform clone of the `rm` command in Linux


## CP-ES

A cross-platform clone of the `cp` command in Linux

### Arguments

`cp-es [...options] [source...] [destination]`

- `[source...]` - Source file(s)/glob(s)
- `[destination]` - The destination file/directory
- `-r, --recursive` - Copy file(s)/directorie(s) recursively

### Usage

```sh
# copy one file
cp-es file1.txt dest/file1.txt

# copy multiple files
cp-es file1.txt file2.txt file3.txt dest/

# copy files that match a glob
cp-es *.txt dest/

# copy files that match multiple globs
cp-es *.txt *.js *.ts dest/

# recursively copy files from one directory to another
cp-es -r src/ dest/
```


## RM-ES

A cross-platform clone of the `rm` command in Linux

### Arguments

`rm-es [...options] [paths...]`

- `[paths...]` - the source file(s)/glob(s)
- `-r, --recursive` - remove directory recursively

### Usage

```sh
# remove one file
rm-es file1.txt

# remove multiple files
rm-es file1.txt file3.txt file3.txt

# remove files that match a glob
rm-es *.txt

# remove files that match miltiple globs
rm-es *.txt *.js *.ts

# recursively remove a 
rm-es -r src/
```

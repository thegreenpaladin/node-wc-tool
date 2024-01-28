# wc-command

This is a custom implementation of the UNIX wc command in Node.js. It is a command line tool that counts the number of lines, words, characters, and bytes in a file.

## Installation

Just clone the repository, that's it!

## Usage

Open a terminal in the root directory of the project and run:

`node ccwc [path to file] [flag]`

### Flags

- `-l` to get the number of lines
- `-w` to get the word count
- `-m` to get the character count
- `-c` to get the number of bytes

### Alternative Usage

`node ccwc [path to file]`

If the flag is omitted, the program executes the -l, -w, and -c flags by default.

`type test.txt | node ccwc -l`
`echo "Hello World" | node ccwc -w`

The program also supports standard input (a file or user entered string) from the terminal and executes the given flag on the received input.

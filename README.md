# EnvLint

EnvLint is a tool for identifying issues with `.env` files in nodejs projects. It uses [dotenv]() to read a _master_ and one or more _test_ `.env` files and compares them against eachother against a set of rules. 

## Installation

``` bash
npm install --save-dev envlint
```

## Usage

EnvLint is primarily a CLI tool intended to be run inside an NPM script: 

``` JSON
{
    "scripts": {
        "start": "envlint && node ./app.js"
    }
}
```

It is a node binary which can also be invoked directly from the command line:

``` bash
npx envlint [options] # using npx

envlint [options] # linked or installed globally
```

## Options

- path [p] - path to directory container `.env` files
- exit [e] - condition to exit with non-zero exit code (stops execution of npm script)
    - _Options:_
        - `none` - (default) always exit cleanly
        - `error` - exit only if errors
        - `warn` - exit if warnings

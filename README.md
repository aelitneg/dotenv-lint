# dotenv-lint
![npm](https://img.shields.io/npm/v/dotenv-lint)
![build](https://github.com/agentile1990/dotenv-lint/workflows/build/badge.svg)
![NPM](https://img.shields.io/npm/l/dotenv-lint)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


dotenv-lint is a tool for identifying issues with `.env` files in nodejs projects. It uses [dotenv](https://www.npmjs.com/package/dotenv) to read a _master_ and one or more _test_ `.env` files and compares them against eachother against a set of rules. 

## Installation

``` bash
npm install --save-dev dotenv-lint
```

## Usage

**Imporant:** By default, dotenv-lint runs in the **current directory** and uses **`.env.template`** as the **_master_** and **`.env`** as the **_test_**.

dotenv-lint is primarily a CLI tool intended to be run inside an NPM script: 

``` JSON
{
    "scripts": {
        "start": "dotenv-lint && node ./app.js"
    }
}
```

It is a node binary which can also be invoked directly from the command line:

``` bash
npx dotenv-lint [options] # using npx

dotenv-lint [options] # linked or installed globally
```

## Options

- path [p] - path to directory container `.env` files
- master [m] - filename of master file
- test [t] - filename(s) of test files
- exit [e] - condition to exit with non-zero exit code (stops execution of npm script)
    - _Options:_
        - `none` - (default) always exit cleanly
        - `error` - exit only if errors
        - `warn` - exit if warnings

## Examples
- All default options
    ``` bash
    dotenv-lint
    ```
    - In current directory, loads `.env.template` as the master and `.env` as the test

- Specify path
    ``` bash
    dotenv-lint --path ./my-package
    ```
    - In `/my-package` directory, loads `.env.template` as the master and `.env` as the test
    - Path supports relative and absolute paths

- Specify master
    ``` bash
    dotenv-lint --master .env.example
    ```
    - In current directory, loads `.env.example` as the master and `.env` as the test

- Specify multiple tests
    ``` bash
    dotenv-lint -p ./my-package -t .env.prod .env.dev
    ```
    - In the `/my-package` directory, loads `.env.template` as the master and `.env.prod` _and_ `.env.dev` as tests

- Stop NPM script on error
    ``` bash
    dotenv-lint -e error
    ```


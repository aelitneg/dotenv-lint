# EnvLint

EnvLint is a tool for identifying issues with `.env` files in nodejs projects. It uses [dotenv]() to read a _master_ and one or more _test_ `.env` files and compares them against eachother against a set of rules. 

## Installation

``` bash
npm install --save-dev envlint
```

## Usage

**Imporant:** By default, EnvLint runs in the **current directory** and uses **`.env.template`** as the **_master_** and **`.env`** as the **_test_**.

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
    envlint
    ```
    - In current directory, loads `.env.template` as the master and `.env` as the test

- Specify path
    ``` bash
    envlint --path ./my-package
    ```
    - In `/my-package` directory, loads `.env.template` as the master and `.env` as the test
    - Path supports relative and absolute paths

- Specify master
    ``` bash
    envlint --master .env.example
    ```
    - In current directory, loads `.env.example` as the master and `.env` as the test

- Specify multiple tests
    ``` bash
    envlint -p ./my-package -t .env.prod .env.dev
    ```
    - In the `/my-package` directory, loads `.env.template` as the master and `.env.prod` _and_ `.env.dev` as tests

- Stop NPM script on error
    ``` bash
    envlint -e error
    ```


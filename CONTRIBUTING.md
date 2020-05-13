# Contributing

## Setup

1. Clone the [env-complete repository](https://github.com/agentile1990/env-complete) from GitHub
    ``` bash
    git clone https://github.com/agentile1990/env-complete.git
    ```
1. Enter the env-complete directory and install dependencies
    ``` bash
    cd ./env-complete 
    npm ci # install from packack.lock.json
    ```
1. Build and run the development stack
    ``` bash
    npm run dev
    ```
    This runs webpack in watch mode and starts node with nodemon watching the transpiled javascript in the `./dist` directory. Everytime you save, webpack will transpile the code and nodemon will restart and rerun the `env-complete` command. For development, the `--path` option is set to `./test`, which contains sample `.env` and `.env.template` files. This option is set in the `webpack.config.js`

    ``` javascript
    plugins: [
        new NodemonPlugin({
            args: ['--path', './test'],
        }),
    ],
    ```

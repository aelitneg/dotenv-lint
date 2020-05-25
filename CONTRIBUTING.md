# Contributing

## Setup

1. Clone the [envlint repository](https://github.com/agentile1990/envlint) from GitHub
    ``` bash
    git clone https://github.com/agentile1990/envlint.git
    ```
1. Enter the envlint directory and install dependencies
    ``` bash
    cd ./envlint 
    npm ci # install from package-lock.json
    ```
1. Build and run the development stack
    ``` bash
    npm run dev
    ```
    This runs webpack in watch mode and starts node with nodemon watching the transpiled javascript in the `./dist` directory. Everytime you save, webpack will transpile the code and nodemon will restart and rerun the `envlint` command. For development, the `--path` option is set to `./test`, which contains sample `.env` and `.env.template` files. This option is set in the `webpack.config.js`

    ``` javascript
    plugins: [
        new NodemonPlugin({
            args: ['--path', './test'],
        }),
    ],
    ```

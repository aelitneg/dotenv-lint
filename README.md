# envlint
Find missing or incomplete environment variables in .env files for nodejs projects.

Compare`.env.example` and `.env.template` files with `.env` files found in the same directory. Find keys defined in template which are missing or have incomplete values in the `.env`.

## Development Documentation

The below will serve as a development discussion until a more formal project / wiki is setup.

### Process Overview
- Search for `.env.example`, `.env.template`, and `.env` files in a directory
- Parse _template_ for keys and values (array of objects)
- Parse _env_ for keys and values (array of objects)
- Find missing keys / incomplete values in _env_
- Print results to console

### Future Features
- Path - run process on a specific path
- Custom Extensions - Allow custom _template_ extensions
- Recursive Search - search through all folders in a project
- Add Missing Keys - automatically add missing keys to `.env`

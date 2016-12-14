# Trivia Quest

> A rogue-like dungeon crawler RPG with trivia challenges as enemies.

## Team

  - __Product Owner__: Dan Burke
  - __Scrum Master__: Maureen E. Mirville
  - __Development Team Members__: Cai Lu, Stefan Ruijsenaars, Stephen Om

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    a. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Log in, navigate with keyboard, contact enemies to begin a challenge and submit your response in the input field.

## Requirements

- Node
- NPM
- Gulp
- Gulp CLI
- Babel
- Live-Server
- MongoDB
- Nodemon

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g gulp
npm install -g gulpcli
npm install -g babel
npm install -g live-server
npm install
```
From within the client directory:

```sh
npm install
```
### Starting Up MongoDB
For MacOS
```sh
$sudo mongod
```
For Windows Users, create a data folder and run the following commands in two separate terminals (see example below, visit [MongoDB](https://www.mongodb.com/) for more details)
```sh
$"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "C:\Users\NAME\Documents\data"
$"C:\Program Files\MongoDB\Server\3.4\bin\mongo.exe"
```
### Running the Server
From server directory
```sh
$node server.js
```
### Seeding the Application
From root directory
```sh
$node seed.js
```
### Compiling and Building
From client directory
```sh
$gulp build
```
Or, to watch for changes and build:
```sh
$gulp
```
## View Application
In your browser, navigate to:
```sh
http://localhost:8000
```
## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

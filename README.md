# Worktables Countries Web App

## Overview

This project consists of a table that uses the monday.api in GraphQL and an internal API rest from the repository: https://github.com/profparedes/worktables-countries-api. This application is designed to run within the monday iframe at: https://worktables.monday.com/boards/4505502032/views/104714866 through the port http://localhost:4000 (which is already configured).

The project is based on Vite, React.js, and Typescript.

## Environment Variables

The project has an env.example file:
```
VITE_APP_NAME="Worktables countries"
VITE_API_BASE_URL=http://localhost:3000
```

It's crucial to note that this project requires the internal API to be running alongside it.

## Download and Installation

1. Clone the project using the following command:

```
git clone https://github.com/profparedes/worktables-countries-web-app.git
```
2. Then navigate to the project's directory:
```
cd worktables-countries-web-app
```
3. Install the required dependencies:
```
yarn
```
4. Now, copy the `.env.example` to a new `.env` file and set the environment variables as per your setup.

## Running the App
Start the application with the following command:

```
yarn dev
```
The app should now be running at http://localhost:4000.

## Tests
The project contains tests that can be executed with the following command:
```
yarn test
```

# Basics

## First run tutorial

[WARNING] You should use Node 16 to be able to use the project properly. <br/> Node > 16 causes errors.

1. `cd billennium`
2. `npm install --legacy-peer-deps`
3. `npm start` - runs all apps in monorepo in our case we have only one

## Creating TypeScript library

`cd billennium`
`npx nx generate @nrwl/js:lib api` or `npx nx generate @nrwl/js:lib api --appProject=billespace`

Remember to stop the dev server and run `npm start` again for affected code. Also, there will be probably a need to restart the TypeScript server.

## Running storybook for UI

`cd billennium`
`npx nx run ui:storybook`

## Creating Nest.js project

`cd billennium`
`npx nx g @nrwl/nest:app project-name`

## Check and update plugin versions

nx and @nrwl/node should have same versions

`cd billennium`
`npx nx report`

`npm install nx@version --legacy-peer-deps`
`npm install @nrwl/node@version --legacy-peer-deps`

## Running Nest.js server

`cd billennium`
`npx nx serve project-name`

## Building Nest.js server

`cd billennium`
`npx nx build project-name`

## Testing

### e2e

Every scenario from the `scenarios` directory should be covered with the e2e test.

Command to run e2e tests: `npx nx e2e billespace-e2e --watch`

### Unit tests/integration tests

Up to you.

Command to run these tests: `npm run test` or `npx nx test --watch`.

If you want to run single project tests: `npx nx test sm --watch`.

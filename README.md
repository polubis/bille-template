# Basics

## First run tutorial

[WARNING] You should use Node 16 to be able to use the project properly. <br/> Node > 16 causes errors.

1. `cd bille`
2. `npm install --legacy-peer-deps`
3. `npm start` - runs all apps in monorepo in our case we have only one

## Creating TypeScript library

`cd bille`
`npx nx generate @nrwl/js:lib api` or `npx nx generate @nrwl/js:lib api --appProject=billespace`

Remember to stop the dev server and run `npm start` again for affected code. Also, there will be probably a need to restart the TypeScript server.

## Running storybook for UI

`cd bille`
`npx nx run ui:storybook`

## Creating Nest.js project

`cd bille`
`npx nx g @nrwl/nest:app project-name`

## Check and update plugin versions

nx and @nrwl/node should have same versions

`cd bille`
`npx nx report`

`npm install nx@version --legacy-peer-deps`
`npm install @nrwl/node@version --legacy-peer-deps`

## Running Nest.js server

`cd bille`
`npx nx serve project-name`

## Building Nest.js server

`cd bille`
`npx nx build project-name`

## Testing

### e2e

Every scenario from the `scenarios` directory should be covered with the e2e test.

Command to run e2e tests: `npx nx e2e billespace-e2e --watch`

### Unit tests/integration tests

Up to you.

Command to run these tests: `npm run test` or `npx nx test --watch`.

If you want to run single project tests: `npx nx test sm --watch`.

# Architecture in apps directory

## For frontend apps

> THIS CONVENTIONS/ARCHITECTURE SHOULD BE APPLIED ONLY TO FRONTEND APPLICATIONS NOT LIBRARIES OR BACKEND API's.

### .component

Pure presentational component but connected with application domain via interfaces -> getting props and renders content, nothing more. That
component can know what is **User** but knows that only by domain interfaces.

```tsx
interface UsersListComponentProps {}

const UsersListComponent = (props: UsersListComponentProps) => {
  return <ul></ul>;
};
```

### .controller

Have access to the application domain, can dispatch actions and trigger state changes in redux. The community uses the name **Container** but we
will use **Controller**. It's because often in styling we often use **Container**. So **Controller** will be a file and architecture building block that manages communication with redux and decides which actions should be dispatched or injects data into **Components**.

### .provider

File which exposes any state via Context API. In our case we using redux so this should be only UI-related state or other metadata.
This file should have also a hook that exposes access to Context API and hides the option to directly import created Context.

### .module

Entry point for dedicated feature in-app. Manages lazy loading, and pre-fetching data.

# City of Austin: Office of Police Oversight - thanks Form
Started by using the [US Forms System Starter App](https://github.com/usds/us-forms-system-starter-app).

## Running the form locally
### Set up your development environment
💾 [Install yarn](https://yarnpkg.com/en/docs/install)

👯 Clone the repo (recommended: --recursive to also pull submodules) [more about submodules](http://www.vogella.com/tutorials/GitSubmodules/article.html)
```
git clone --recursive https://github.com/cityofaustin/officer-thanks-form
cd officer-thanks-form
```

### Install dependencies and run

💾 Install dependencies
```
yarn
```

If you're cloning for the first time, you'll need pull in our submodules and update them:

```
git submodule update --init --recursive
```

Then you're ready to go!
⌨️ Run
```
yarn start
```

## Building for production

The app outputs as a static build.

🏗 Build
```
yarn build
```

Puts a static build in the public folder. You can serve this anywhere you'd deploy static html.

## How to Deploy
This form depends on `usfs-components` and `officer-form-chapters`. If either of those dependencies change, you'll need to also update this repo.

If you made changes to `usfs-components`:

1. Merge changes in `usfs-components` into its master branch. Follow the steps to publish your newest version of `usfs-components` to npm.
2. Update this repo's `package.json` to use the latest `usfs-components` version. Then run `yarn install` to update this repo's `yarn.lock`.
3. Commit. Push to master.

If you need to made changes to `officer-form-chapters`:
1. Merge changes in `officer-form-chapters` into its master branch.
2. In this repo, run `git submodule update --remote`.
3. Git add and commit the change to `js/config/chapters`.
4. Push to master.

## Modifying Chapters
The schema definitions for chapters are in `/js/config/chapters`. This is a gitmodule that pulls from https://github.com/cityofaustin/officer-form-chapters. If you make changes in this directory, you'll need to commit them to this repo. Either `cd` to `/js/config/chapters` and use the git CLI from there, or open the folder in your favorite git GUI.

Once you've committed your changes to chapters, you should notice the `Subproject commit` for the chapters directory in the parent directory has changed. If you don't check this in then an old version of the chapters will appear on the form outside of your local environment.

## Schema Blocks and Custom Components
We import schema blocks and custom components via npm: https://www.npmjs.com/package/@cityofaustin/usfs-schema-blocks, https://www.npmjs.com/package/@cityofaustin/usfs-components. We plan to use these across many forms, and publishing them this way allows for sensible versioning. If you'd like to make and see changes locally, you can utilize [yarn link](https://yarnpkg.com/lang/en/docs/cli/link/).

### Using yarn link (for components in this example)

👯 Clone the repo
```
git clone https://github.com/cityofaustin/usfs-components
cd usfs-components
```
💾 Install dependencies
```
yarn
```
🏗 Build
```
yarn build
```
🔗Link
```
yarn link
cd ../officer-thanks-form
yarn link "@cityofaustin/usfs-components"
```

By doing this, instead of using the version of the components from npm, your local form will use the linked version you can modify locally. We do not currently have live updating implemented, so when you want to see how your changes behave in the form you will need to run `yarn build` first.

## Yarn Lock

*Keep the yarn.lock updated for every commit done to the dependency libraries.*

We encountered some issues of the forms building with outdated components, as a general rule of thumb, when referencing any repo in package.json, it is important to re-render `yarn.lock`. The quickest way to do this is by removing the library and adding it back through the yarn command, for example:

```
yarn remove "cityofaustin/us-forms-system"

--and then--

yarn add "cityofaustin/us-forms-system"
```

note about us-forms-system: you can pass in classnames in ui options to allow for styling of particular component stuff.

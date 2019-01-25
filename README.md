# City of Austin: Office of Police Oversight - Complaint Form
Started by using the [US Forms System Starter App](https://github.com/usds/us-forms-system-starter-app).

## Running the form locally
### Set up your development environment
💾 [Install yarn](https://yarnpkg.com/en/docs/install)

👯 Clone the repo
```
git clone https://github.com/cityofaustin/officer-complaint-form
cd officer-complaint-form
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

🏗 Build
```
yarn build
```

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
cd ../officer-complaint-form
yarn link "@cityofaustin/usfs-components"
```

By doing this, instead of using the version of the components from npm, your local form will use the linked version you can modify locally. We do not currently have live updating implemented, so when you want to see how your changes behave in the form you will need to run `yarn build` first.

## Deploying
*TODO*

After encountering issues with heroku and travis, I decided to try out using GitLab for some deployment stuff. It's currently living here: https://gitlab.com/briaguya/officer-complaint-form but I'm more than open to changing it.

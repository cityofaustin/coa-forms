# Documentation for Deployment Functions

## Summary of How Deployment Works
To deploy a form, add its directory name as a FORM parameter in new job in .circleci/config.yml.

Dev Branch/PR Builds are available at https://opo.austintexas.io/police-complain/[branch-name]

The S3 bucket destination for your form is determined by `DEPLOY_ENV` argument passed to `run.sh`. `circleci.config.yml` sets the `DEPLOY_ENV` for each git branch.

+ The "master" branch uses DEPLOY_ENV="staging". This will source environment variables from your form's `deployment/vars/staging.env` and deploy to the staging S3 Bucket (as set in `staging.env`).
+ The "production" branch uses DEPLOY_ENV="prod". This will source environment variables from your form's `deployment/vars/prod.env` and deploy to the production S3 Bucket (as set in `prod.env`).
+ All other dev/feature/pull-request branches use DEPLOY_ENV="dev". This will source environment variables from your form's `deployment/vars/dev.env` and deploy to the pr S3 Bucket (as set in `dev.env`).

---
## `deploy_one_form.sh`
Installs dependencies, builds, and uploads all locale builds to AWS. Invokes `build_form.sh` and `upload_form.sh`

args:
+ $1 FORM: the directory of the form to deploy

ex: `bash deployment/scripts/run.sh officer-complaint-form`

---
## `build_form.sh`

Builds all locales for a Form using webpack. Outputs are saved in Form's `/public*/` directories.

args:
+ -f FORM (required): the name of the form you want to build; corresponds to the directory name inside of `/src`.
+ -e DEPLOY_ENV (required): the deployment environment (dev, staging, prod, etc.). Determines which environment variables to use and the S3 Bucket to deploy to.

ex: `bash deployment/scripts/build_form.sh -f officer-complaint-form -e dev`

---
## `translate_form.sh`
Translates a form into each of the languages specified in its `src/locale/settings.json`. This script is executed by `webpack` as a plugin.

The resulting translated forms will be saved in their own public folders.
For example, a Spanish translated form will be saved in `public_es/`.

args:
+ -f FORM (required): the name of the form you want to translate; corresponds to the directory name inside of `/src`.
+ -l LANGUAGE (required): Specifies which translation to run (and in which compiled public/ directory to run that translation).


ex: `bash deployment/scripts/translate_form.sh -f officer-complaint-form -l es` will run `translate.py` for `officer-complaint-form/public_es`

---
## `upload_form.sh`
Syncs a built form to AWS.

args:
+ -f FORM (required): the name of the form you want to translate; corresponds to the directory name inside of `/src`.
+ -e DEPLOY_ENV (required): the deployment environment (dev, staging, prod, etc.). Determines which S3 Bucket to deploy to.
+ -l LANGUAGE (optional, null defaults to English): Specifies which translation to deploy. Corresponds to the build file suffix.

ex: `bash deployment/scripts/upload_form.sh -f officer-complaint-form -e dev -l es` will sync `officer-complaint-form/public_es` to the AWS PR Bucket for your particular branch.

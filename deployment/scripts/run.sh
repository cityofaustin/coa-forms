#!/bin/bash

DEPLOY_ENV=$1
CURRENT_DIR=`dirname $BASH_SOURCE`
if \
  [ "$DEPLOY_ENV" != "prod" ] && \
  [ "$DEPLOY_ENV" != "staging" ]
then
  DEPLOY_ENV=dev
fi

# Catch any errors early
for FORM in $(jq -r ".forms_to_deploy[]" "$CURRENT_DIR/../dev_deploy_options.json");
do
  FORM_PATH="$CURRENT_DIR/../src/$FORM"
  if [ ! -d $FORM_PATH ]; then
    echo "ERROR in dev_deploy_options.json: form \"$FORM\" does not exist"
    exit 1
  fi
done;

# Install top-level coa-forms dependencies
yarn install --production=false

for FORM in $(jq -r ".forms_to_deploy[]" "$CURRENT_DIR/../dev_deploy_options.json");
do
  bash deploy_one_form.sh $DEPLOY_ENV $FORM
done;





# Determine which forms to deploy

# Determine which environment to deploy to

# Determine which s3 bucket to deploy them to

# For each form:
#   Install form and chapter dependencies
#   Set env variables
#   test
#   build
#   translate
#   sync
#   reset crucial environment variables

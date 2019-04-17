#!/bin/bash
DEPLOY_ENV=$1
CURRENT_DIR=`dirname $BASH_SOURCE`

# Catch any errors in dev_deploy_options.json
for FORM in $(jq -r ".forms_to_deploy[]" "$CURRENT_DIR/../dev_deploy_options.json");
do
  FORM_PATH="$CURRENT_DIR/../../src/$FORM"
  if [ ! -d $FORM_PATH ]; then
    echo "ERROR in dev_deploy_options.json: form \"$FORM\" does not exist"
    exit 1
  fi
done;

# Install top-level coa-forms dependencies
yarn install --production=false

# Run all deploy steps for each form in dev_deploy_options.json
for FORM in $(jq -r ".forms_to_deploy[]" "$CURRENT_DIR/../dev_deploy_options.json");
do
  bash $CURRENT_DIR/deploy_one_form.sh $DEPLOY_ENV $FORM
done;

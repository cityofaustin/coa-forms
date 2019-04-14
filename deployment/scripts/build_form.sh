#!/bin/bash
# check deployment/README.md for documentation
CURRENT_DIR=`dirname $BASH_SOURCE`
FORM=''
DEPLOY_ENV=''
SHOULD_UPLOAD="false"

while getopts "f:e:u" opt; do
  case $opt in
    f )
      FORM=$OPTARG
      ;;
    e )
      DEPLOY_ENV=$OPTARG
      ;;
    u )
      SHOULD_UPLOAD="true"
      ;;
    \? )
      echo "Invalid option: -$OPTARG" >&2
      exit;
      ;;
    : )
      echo "Invalid option: -$OPTARG requires an argument" 1>&2
      exit;
      ;;
  esac
done

FORM_PATH="$CURRENT_DIR/../../src/$FORM"

if [ -z $FORM ]; then
  echo "ERROR: -f argument is required. Please specify a FORM to translate."
  exit 1
elif [ ! -d $FORM_PATH ]; then
  echo "ERROR: form \"$FORM\" does not exist"
  exit 1
elif [ -z $DEPLOY_ENV ]; then
  echo "ERROR: -e argument is required. Please specify a DEPLOY_ENV."
  exit 1
fi

##### Begin #####

yarn --cwd $FORM_PATH build

# Optional clause to upload translated form.
# Triggered when -u arg is passed with a valid -e $DEPLOY_ENV
if [[ $SHOULD_UPLOAD = "true" ]]; then
  $CURRENT_DIR/upload_form.sh -f $FORM -e $DEPLOY_ENV
fi;

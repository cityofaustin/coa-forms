#!/bin/bash
# check deployment/README.md for documentation
CURRENT_DIR=`dirname $BASH_SOURCE`
FORM=''
DEPLOY_ENV=''
LANGUAGE=''
TRANSLATED="false"

while getopts "f:e:l" opt; do
  case $opt in
    f )
      FORM=$OPTARG
      ;;
    e )
      DEPLOY_ENV=$OPTARG
      ;;
    l )
      LANGUAGE=$OPTARG
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
if [[ ! -z $LANGUAGE ]] && [[ $LANGUAGE != "en" ]]; then
  TRANSLATED="true"
fi
ENV_VAR_PATH="$FORM_PATH/deployment/vars/$DEPLOY_ENV"
BUILD_PATH="$FORM_PATH/public"

if [ -z $FORM ]; then
  echo "ERROR: -f argument is mandatory. Please specify a form to translate."
  exit 1
elif [ -z $DEPLOY_ENV ]; then
  echo "ERROR: -e argument is mandatory. Please specify a -e DEPLOY_ENV to upload your form to."
  exit 1
elif [ ! -d $FORM_PATH ]; then
  echo "ERROR: form \"$FORM_PATH\" does not exist"
  exit 1
elif [ ! -d $ENV_VAR_PATH ]; then
  echo "ERROR: env variable file \"$ENV_VAR_PATH\" does not exist"
  exit 1
fi

##### Begin #####

# Source environment variables
# eg: DEPLOYMENT_BUCKET, DEPLOYMENT_PATH_*
source $ENV_VAR_PATH

if [[ $TRANSLATED != "true" ]]; then
  DEPLOYMENT_PATH=$DEPLOYMENT_PATH_EN
else
  BUILD_PATH="${BUILD_PATH}_${LANGUAGE}"
  # Finds the correct DEPLOYMENT_PATH_* variable from your form's vars/common.sh
  # ex: LANGUAGE=es would need to set DEPLOYMENT_PATH_ES as your DEPLOYMENT_PATH
  DEPLOYMENT_PATH_FOR_LANG="DEPLOYMENT_PATH_$(echo $LANGUAGE | tr a-z A-Z)"
  DEPLOYMENT_PATH=${!DEPLOYMENT_PATH_FOR_LANG}
fi

# TODO: determine DEPLOYMENT_PATH based on DEPLOY_ENV
if [ $DEPLOY_ENV = "staging" ]; then
  DEPLOYMENT_PATH=$DEPLOYMENT_PATH-pr-x
fi;

S3_DESTINATION="s3://${DEPLOYMENT_BUCKET}/${DEPLOYMENT_PATH}"

echo "Syncing ${BUILD_PATH} into ${S3_DESTINATION}"
aws s3 sync $BUILD_PATH $S3_DESTINATION --delete

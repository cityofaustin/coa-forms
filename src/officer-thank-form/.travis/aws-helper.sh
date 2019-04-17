#!/usr/bin/env bash

#set -o errexit

#
# Colors
#

    RED='\033[0;31m'
    NC='\033[0m' # No Color

#
#
#

echo "TRAVIS_BRANCH: $TRAVIS_BRANCH"
echo "TRAVIS_PULL_REQUEST: $TRAVIS_PULL_REQUEST"
echo "TRAVIS_PULL_REQUEST_BRANCH: $TRAVIS_PULL_REQUEST_BRANCH"
echo "TRAVIS_BUILD_DIR: $TRAVIS_BUILD_DIR"
#
# Prints error message and stops deployment by returing exit 1
# $1 (string) - Error message to display
# Example: helper_halt_deployment "File not found"
#

function helper_halt_deployment {
    echo -e "\n\n--------------------------------------------------------------"
    echo -e "${RED}FATAL ERROR:${NC}"
    echo -e "${1}"
    echo -e "--------------------------------------------------------------\n\n"
    travis_terminate 1;
}

#
# Simply builds a noticeable header when parsing logs.
# This should help determine when our commands begin execution,
# and what branch is being affected by current deployment.
#

function print_header {
    echo ""
    echo ""
    echo "--------------------------------------------------------------"
    echo "   $1"
    echo "--------------------------------------------------------------"
    echo "  TRAVIS_BRANCH:              ${TRAVIS_BRANCH}"
    echo "  TRAVIS_PULL_REQUEST:        ${TRAVIS_PULL_REQUEST}"
    echo "  TRAVIS_PULL_REQUEST_BRANCH: ${TRAVIS_PULL_REQUEST_BRANCH}"
    echo ""
}

#
# Identify 'Production' or 'Staging' branches
#

DEPLOYMENT_MODE="not-available"

#
# We need the branch
#

if [ "${TRAVIS_BRANCH}" == "" ]; then
  helper_halt_deployment "Branch name not defined in variable TRAVIS_BRANCH."
fi;


#
# We need AWS permissions
#

if [ "${AWS_ACCESS_KEY_ID}" == "" ] || [ "${AWS_DEFAULT_REGION}" == "" ] || [ "${AWS_SECRET_ACCESS_KEY}" == "" ]; then
  helper_halt_deployment "Halting deployment, please check your AWS API keys."
fi;


#
# We will need to determine the deployment mode (environment, ie. production or staging)
#

if [ "${TRAVIS_BRANCH}" == "production" ]; then
  DEPLOYMENT_MODE="PRODUCTION"
  API_URL=$API_URL_PRODUCTION
elif [ "${TRAVIS_BRANCH}" == "master" ]; then
  DEPLOYMENT_MODE="STAGING"
  API_URL=$API_URL_STAGING
else
  helper_halt_deployment "TRAVIS_BRANCH: '${TRAVIS_BRANCH}' cannot be deployed to staging or production."
fi;


#
# We need AWS permissions
#
if [ "${API_URL}" == "" ]; then
  helper_halt_deployment "Halting deployment, please make sure the env. var. API_URL is configured."
fi;


echo "Working with deployment mode: ${DEPLOYMENT_MODE}"
echo "Endpoint API_URL: ${API_URL}"


#
#
#    HELPER FUNCTIONS
#
#

# Returns TRUE if this is a Pull Request
function is_pull_request {
    if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
      echo "FALSE";
    else
      echo "TRUE";
    fi;
}

# Returns $1 in upper case
function to_uppercase {
  echo $1 | awk '{print toupper($0)}'
}

# Returns $1 in lower case
function to_lowercase {
  echo $1 | awk '{print tolower($0)}'
}

# Returns the name of the bucket to deploy to
function resolve_bucket {
  IS_PR=$(is_pull_request);

  if [ "${IS_PR}" = "TRUE" ]; then
    echo $AWS_BUCKET_NAME_PR;
  elif [ "${DEPLOYMENT_MODE}" == "PRODUCTION" ]; then
    echo $AWS_BUCKET_NAME_PRODUCTION;
  else
    echo $AWS_BUCKET_NAME_STAGING;
  fi;
}


# Returns the repo name
function form_get_repo_name {
  REPO_SLUG=""

  if [ "${TRAVIS_PULL_REQUEST_SLUG}" = "" ]; then
    REPO_SLUG=${TRAVIS_REPO_SLUG};
  else
    REPO_SLUG=${TRAVIS_PULL_REQUEST_SLUG};
  fi;

  echo $REPO_SLUG | awk -F"/" '{print $NF}';
}

#
# A shortcut to search-replace a string in a file
# ie. forms_search_replace_file  "http://localhost" "http://www.prod.com" myconfig.js
#
function forms_search_replace_file {
	SEARCHSTR=$1
	REPLACESTR=$2
	FILE=$3
  echo "Replacing, current working dir: ${PWD}";
  echo "sed -i -e 's|${SEARCHSTR}|${REPLACESTR}|g' $FILE;"
	sed -i -e "s|${SEARCHSTR}|${REPLACESTR}|g" $FILE;
}

#
# Packages the application and deploys to a Lambda Function
#
function forms_show_cwd {
  echo "Current working directory: $PWD";
}

#
# Changes the current directory to the initial default TRAVIS_BUILD_DIR
#
function forms_reset_cwd {
  echo "Resetting working directory to $TRAVIS_BUILD_DIR"
  cd $TRAVIS_BUILD_DIR;
  forms_show_cwd;
}

#
# Returns the final URL for a form
#

function resolve_form_url {
  IS_PR=$(is_pull_request);
  if [ "${IS_PR}" = "TRUE" ]; then
    echo "officer-thank-pr-${TRAVIS_PULL_REQUEST}";
  else
    echo "${FORM_DEPLOYMENT_URI}";
  fi;
}


#
# Returns the name of the repo from a github url
#
function forms_get_slug {
  echo $1 | awk -F"/" '{print $NF}';
}

#
# Download the repo, equivalent to git clone
#
function forms_clone_repo {
  REPO_URL=$1
  echo "Cloning Repo: ${REPO_URL}"
  git clone $REPO_URL;
}

#
# Changes the directory, need this to track on stdout where we currently are
#
function forms_change_dir {
  FORM_DIR=$1
  echo "Changing directory to ${FORM_DIR}"
  cd $FORM_DIR
  echo "New PWD: ${PWD}";
  ls -lha;
}


function forms_sync_fonts {
  forms_change_dir "fonts"
  S3_DESTINATION="s3://${DEPLOYMENT_BUCKET}/fonts"
  echo "Syncing files from ${PWD} into ${S3_DESTINATION}"
  aws s3 sync . $S3_DESTINATION --delete
}


function forms_sync_form_aws {
  FORM_SLUG=$1
  DEPLOYMENT_BUCKET=$(resolve_bucket)
  S3_DESTINATION="s3://${DEPLOYMENT_BUCKET}/${FORM_SLUG}"
  echo "Syncing ${FORM_SLUG} into ${S3_DESTINATION}"
  aws s3 sync . $S3_DESTINATION --delete
}



#
# Builds a repo
#
function forms_build {
  print_header "Building Form"
  forms_reset_cwd;

  FINAL_URL=$(resolve_form_url)


  echo "URI GENERATED: ${FINAL_URL}"

  echo "forms_build() Running yarn"
  yarn;

  echo "forms_build() Downloading git submodules"
  yarn postinstall;

  #
  # Since we do not link or build, we have to inject the API endpoint in
  # the usfs FileUpload component.
  #
  USFS_NODEMODULE_PATH="node_modules/@cityofaustin/usfs-components"
  forms_search_replace_file "http://localhost:5000" "${API_URL}" "${USFS_NODEMODULE_PATH}/webpack.config.js";
  forms_search_replace_file "http://localhost:5000" "${API_URL}" "${USFS_NODEMODULE_PATH}/build/index.js";

  forms_search_replace_file "process.env.API_URL" "'${API_URL}'" "${TRAVIS_BUILD_DIR}/webpack.prod.js";

  #
  # We can now proceed to build the rest of the form
  #

  echo "forms_build() Running Yarn Build"

  yarn build;

  echo "forms_build() Copy index: cp ${TRAVIS_BUILD_DIR}/.travis/index.html ${TRAVIS_BUILD_DIR}/public/"

  cp $TRAVIS_BUILD_DIR/.travis/index.html $TRAVIS_BUILD_DIR/public/;

  forms_change_dir "public";

  forms_sync_form_aws $FINAL_URL;

  forms_sync_fonts;

  forms_reset_cwd;
}

function forms_translate {
  print_header "Translating Form"
  
  for LANGUAGE in $(jq -r ".supported_languages[]" "./locale/settings.json");
  do
    echo "Switching back to default directory";
    forms_reset_cwd;
    echo "Directory now: $PWD";

    echo "Current Language code: ${LANGUAGE}"; 
    ORIGIN_PATH="public"; 
    TRANSLATION_PATH="${ORIGIN_PATH}_${LANGUAGE}"; 

    echo "Copying: ${ORIGIN_PATH} to ${TRANSLATION_PATH}"; 
    echo "cp -r $ORIGIN_PATH $TRANSLATION_PATH;"
    cp -r $ORIGIN_PATH $TRANSLATION_PATH;

    echo "First, let's translate the routes:"; 
    python3 "./.travis/translate.py" "./locale/routes.json" "./${TRANSLATION_PATH}/js/app.bundle.js" "${LANGUAGE}" --routes

    echo "Then, let's translate the rest of the form:"
    python3 "./.travis/translate.py" "./locale/translations.json" "./${TRANSLATION_PATH}/js/app.bundle.js" "${LANGUAGE}"

    DEPLOYMENT_PATH=$(jq -r ".deployment_path.${LANGUAGE}"  "./locale/routes.json")

    forms_change_dir $TRANSLATION_PATH;

    forms_sync_form_aws $DEPLOYMENT_PATH;
  done;
}

function forms_postrelease {
  CURRENT_BRANCH=$1
  echo "Nothing to be done for $CURRENT_BRANCH"
  echo "Deployment Mode: ${DEPLOYMENT_MODE}"
}

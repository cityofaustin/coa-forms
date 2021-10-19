# AWS
DEPLOYMENT_BUCKET=coa-forms-dev
DEPLOYMENT_PATH_EN=police-thank/$CIRCLE_BRANCH
DEPLOYMENT_PATH_ES=policia-agradezca/$CIRCLE_BRANCH

# App
NODE_ENV=development
FORM_API_URL=https://7p7ja2j59b.execute-api.us-west-2.amazonaws.com/staging

# Structure
FORM_DIR=officer-thank-form
CHAPTERS_DIR=OPO

# Debug
# RUN_BUNDLE_ANALYZER=true

if [ "$CIRCLE_BRANCH" == "2411-OPO-anon" ]; then
  FORM_API_URL=https://uwpchcncag.execute-api.us-east-1.amazonaws.com/pr_2411_complaint_email_update
elif [ "$CIRCLE_BRANCH" == "2309-new-forms" ]; then
  FORM_API_URL=https://k747e3g5yb.execute-api.us-east-1.amazonaws.com/pr_2309_new_forms
fi

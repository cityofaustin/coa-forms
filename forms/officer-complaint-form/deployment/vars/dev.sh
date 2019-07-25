# AWS
DEPLOYMENT_BUCKET=coa-forms-dev
DEPLOYMENT_PATH_EN=police-complain/$CIRCLE_BRANCH
DEPLOYMENT_PATH_ES=policia-queja/$CIRCLE_BRANCH

# App
NODE_ENV=development
FORM_API_URL=https://qn4qdnpw9c.execute-api.us-east-1.amazonaws.com/staging

# Structure
FORM_DIR=officer-complaint-form
CHAPTERS_DIR=OPO

# Debug
# RUN_BUNDLE_ANALYZER=true

if [ "$CIRCLE_BRANCH" == "2411-OPO-anon" ]; then
  FORM_API_URL=https://uwpchcncag.execute-api.us-east-1.amazonaws.com/pr_2411_complaint_email_update
elif [ "$CIRCLE_BRANCH" == "2309-new-forms" ]; then
  FORM_API_URL=https://k747e3g5yb.execute-api.us-east-1.amazonaws.com/pr_2309_new_forms
fi

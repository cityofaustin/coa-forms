# AWS
DEPLOYMENT_BUCKET=coa-forms-dev
DEPLOYMENT_PATH_EN=day-labor/$CIRCLE_BRANCH
DEPLOYMENT_PATH_ES=day-labor-es/$CIRCLE_BRANCH

# App
NODE_ENV=development
FORM_API_URL=https://6jm8rnjkxf.execute-api.us-east-1.amazonaws.com/staging

# Structure
FORM_DIR=day-labor
# CHAPTERS_DIR=day-labor

# Debug
# RUN_BUNDLE_ANALYZER=true

if [ "$CIRCLE_BRANCH" == "2309-day-labor" ]; then
  FORM_API_URL=https://k747e3g5yb.execute-api.us-east-1.amazonaws.com/pr_2309_day_labor
fi

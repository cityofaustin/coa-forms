# AWS
DEPLOYMENT_BUCKET=coa-forms-dev
DEPLOYMENT_PATH_EN=request-day-laborer/$CIRCLE_BRANCH
DEPLOYMENT_PATH_ES=request-day-laborer-es/$CIRCLE_BRANCH

# App
NODE_ENV=development
FORM_API_URL=https://qn4qdnpw9c.execute-api.us-east-1.amazonaws.com/staging

# Structure
FORM_DIR=day-labor
# CHAPTERS_DIR=day-labor

# Debug
# RUN_BUNDLE_ANALYZER=true

if [ "$CIRCLE_BRANCH" == "2626-day-labor-content" ]; then
  FORM_API_URL=https://urz68t6uk8.execute-api.us-east-1.amazonaws.com/pr_2626_day_labor_email
fi
2626-day-labor-email

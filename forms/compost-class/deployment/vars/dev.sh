# AWS
DEPLOYMENT_BUCKET=coa-forms-dev
DEPLOYMENT_PATH_EN=request-compost-class/$CIRCLE_BRANCH
DEPLOYMENT_PATH_ES=request-compost-class-es/$CIRCLE_BRANCH

# App
NODE_ENV=development
FORM_API_URL=https://qn4qdnpw9c.execute-api.us-east-1.amazonaws.com/staging

# Structure
FORM_DIR=compost-class
# CHAPTERS_DIR=compost-class

# Debug
# RUN_BUNDLE_ANALYZER=true

if [ "$CIRCLE_BRANCH" == "2499-compost-class" ]; then
  FORM_API_URL=https://7rn6ue7x09.execute-api.us-east-1.amazonaws.com/pr_2499_compost_class
fi

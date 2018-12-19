import { createRoutes } from "us-forms-system/lib/js/helpers";

import formConfig from "./usfsFormConfig";
import Form from "./USFSForm";

const routes = createRoutes(formConfig);

const route = {
  path: "/",
  component: Form,
  indexRoute: {
    onEnter: (nextState, replace) =>
      replace(formConfig.urlPrefix + routes[0].path)
  },
  childRoutes: routes
};

export default route;

import formConfig from './config/form';
import createSchemaFormReducer from '@cityofaustin/us-forms-system/lib/js/state';

export default {
  form: createSchemaFormReducer(formConfig)
};

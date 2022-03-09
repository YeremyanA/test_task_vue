/* eslint-disable */
import Vue from 'vue'
import * as VeeValidate from 'vee-validate'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import { extend } from 'vee-validate'
import { required, email, min, confirmed } from 'vee-validate/dist/rules'

// The types of validators used in the project
extend('required', required)
extend('confirmed', confirmed)
extend('email', email)
extend('min', min)

extend('password', {
  validate: (string) => {
    if (!/\d/.test(string)) {
      return "Password field must have number"
    } else if (!/[A-Z]/.test(string)) {
      return "Password field must have upper case letter"
    } else if (!/[a-z]/.test(string)) {
      return "Password field must have lower case letter"
    } else if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(string)) {
      return "Password field must have special character"
    } else if (string.length < 8) {
      return "Password field must have min 8 character"
    } else {
      return true
    }

  }
})

Vue.use(VeeValidate, {errorBagName: 'vErrors'})
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
export default VeeValidate

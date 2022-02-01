// import PasswordWidget from '../components/PasswordWidget'

export default {
  name: 'demo',
  schema: {
    type: 'number',
  },
  uiSchema: {},
  default: 1,
  async customValidate(data: any, errors: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.pass1 != data.pass2) {
          errors.pass2.addError('密码必须相同')
        }
        resolve(true)
      }, 2000)
    })
  },
}

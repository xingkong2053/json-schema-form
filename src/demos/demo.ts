// import PasswordWidget from '../components/PasswordWidget'

export default {
  name: 'demo',
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      age: {
        type: 'number'
      },
      staticArr: {
        type: 'array',
        items: [
          {
            type: 'string'
          },
          {
            type: 'number'
          },
          {
            type: 'string'
          },
        ]
      },
      singleTypeArray:{
        type: 'array',
        items: {
          type: 'string'
        }
      },
      enumArr:{
        type: 'array',
        items: {
          type: 'string',
          enum: ['北京','上海','杭州','广州']
        }
      },
      arr4:{
        type: "array",
        items:{
          type: "string"
        }
      }
    }
  },
  uiSchema: {},
  default: null,
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

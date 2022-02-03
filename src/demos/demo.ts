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
      }
    }
  },
  uiSchema: {},
  default: {
    name: 'xingkong',
    age: 22,
    staticArr: ['hello',666,'world'],
    singleTypeArray:'HAPPY SPRING FESTIVAL'.split(' ')
  },
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

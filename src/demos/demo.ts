// import PasswordWidget from '../components/PasswordWidget'

export default {
  name: 'demo',
  schema: {
    type: 'object',
    properties: {
      name: {
        title: '名称',
        type: 'string',
      },
      age: {
        title: '年龄',
        type: 'number'
      },
      staticArr: {
        type: 'array',
        title: 'staticArr',
        items: [
          {
            title: '数组项#1',
            type: 'string'
          },
          {
            title: '数组项#2',
            type: 'number'
          },
          {
            title: '数组项#3',
            type: 'string'
          },
        ]
      },
      singleTypeArray:{
        type: 'array',
        title: '动态数组',
        items: {
          type: 'string'
        }
      },
      enumArr:{
        type: 'array',
        title: '多选',
        items: {
          type: 'string',
          enum: ['北京','上海','杭州','广州']
        }
      },
      arr4:{
        type: "array",
        title: "arr4",
        items:{
          title: 'string',
          type: "string"
        }
      }
    }
  },
  uiSchema: {},
  default: {
    name: 'xingkong',
    age: 18,
    staticArr: [
      0,"hello",66
    ],
    singleTypeArray: [],
    enumArr: [],
    arr4: [],
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

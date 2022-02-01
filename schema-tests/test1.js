
const Ajv = require('ajv')
// ajv-formats document: https://ajv.js.org/guide/formats.html
const addFormats = require('ajv-formats')
const localize = require('ajv-i18n')

// 校验规则
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 10,
      // 自定义关键字
      test: 'this is a test keyword'
    },
    age: {
      type: 'number',
    },
    location:{
      type: 'string',
      format: 'country'
    },
    educations: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  // required:['name','age']
}

// 校验数据
const data = {
  name: 'center',
}

const ajv = new Ajv()
addFormats(ajv)

// 自定义format
ajv.addFormat('country', data=>['england','america','germany'].includes(data))

// 自定义关键字
ajv.addKeyword('test',{
  // validate(schema,data){
  //   console.log({schema,data});
  //   return true
  // },
  compile(schema,parent){
    console.log({schema,parent});
    return (...param)=>{
      console.log({...param});
      return true
    }
  }
})

const validate = ajv.compile(schema)
const valid = validate(data)

if(!valid){
  localize.zh(validate.errors)
  console.log(validate.errors)
}

// node schema-tests/test1.js
import { defineComponent, PropType } from "vue";
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  ul: {
    listStyle: 'none',
    paddingLeft: 0
  },
  li: {
    lineHeight: '1.2em',
    fontSize: '12px',
    color: 'red'
  }
})

export const Errors = defineComponent({
  name: 'Errors',
  props: {
    errors: {
      type: Array as PropType<string[]>,
    }
  },
  setup(props){
    const classesRef = useStyles()
    return ()=>{
      const {errors = []} = props
      const classes = classesRef.value
      return errors?.length > 0 && <ul class={classes.ul}>
        {errors.map(e=><li id={e} class={classes.li}>{e}</li>)}
      </ul>
    }
  }
})

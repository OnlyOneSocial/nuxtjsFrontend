<template>
  <div>
    <div v-for="(todo,index) in todoObj" :key="index" style="margin-left:6px">
      <textarea v-model="todo.newTodo" @keyup.enter="()=>{addTodo(index)}" />
      <div v-for="(todoOne,index2) in todo.todo" :key="index2" style="background-color: white; margin-top:12px">
        {{ todoOne }}
      </div>
    </div>
    <div style="margin-left:6px">
      <textarea v-model="newTodo" @keyup.enter="newTodoFunc" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      todoObj: [
        {
          newTodo: '',
          todo: []
        }
      ],
      newTodo: ''

    }
  },
  methods: {
    addTodo (index) {
      this.todoObj[index].todo.push(this.todoObj[index].newTodo)
      this.todoObj[index].newTodo = ''
    },
    newTodoFunc () {
      this.todoObj.push(
        {
          newTodo: '',
          todo: [this.newTodo]
        }
      )
      this.newTodo = ''
    }
  }
}
</script>

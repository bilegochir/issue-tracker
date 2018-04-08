<template>
  <div class="row">
    <div class="col">
      <div class="form-group">
        <label>Task name</label>
        <input type="text" class="form-control form-control-sm" v-model="name" id="name" placeholder="Enter task name" required>
      </div>
      <div class="form-group">
        <label>Due date</label>
        <input class="form-control form-control-sm" type="date" v-model="pub_date" required>
      </div>
      <div class="form-group">
        <label>Assignee</label>
        <input type="text" class="form-control form-control-sm" v-model="assignee" id="assignee" placeholder="Enter assignnee" required>
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea class="form-control form-control-sm" v-model="description" id="description" placeholder="Enter description" rows="3" required></textarea>
      </div>
      <div class="form-group" v-if="old_task">
        <label>Log description</label>
        <textarea class="form-control form-control-sm" v-model="log_desc" id="log_desc" placeholder="Enter log description" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <select v-model="category" class="form-control form-control-sm" id="category">
                <option selected="selected">None</option>
                <option v-for="option in categories" v-bind:value="option" :key="option._id">
                    {{ option }}
                </option>
            </select>
      </div>
      <div class="float-right">
        <button type="submit" class="btn btn-outline-secondary mr-2 btn-sm" @click="saveTask()">Save</button>
        <router-link :to="{ name: 'TaskList' }" class="btn btn-outline-secondary btn-sm">Back</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  
  export default {
    name: 'AddTask',
    data() {
      return {
        name: '',
        pub_date: '',
        assignee: '',
        author: 'bilegochir',
        description: '',
        category: '',
        categories: ['open', 'closed', 're-opened', 'pending'],
        old_task: null,
        log_desc: ''
      }
    },
    props: {
      msg: String
    },
    created() {
      if (this.$route.params.id)
        this.checkTask()
    },
    methods: {
      formatDate(date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
  
        return [year, month, day].join('-');
      },
      checkTask() {
        axios.get("http://localhost:3000/task-view", {
          params: {
            id: this.$route.params.id
          }
        }).then(response => {
          this.old_task = response.data[0]
          this.name = response.data[0].name
          this.description = response.data[0].description
          this.pub_date = this.formatDate(response.data[0].pub_date)
          this.assignee = response.data[0].assignee
          this.author = response.data[0].author
          this.category = response.data[0].category
        })
      },
      saveTask() {
        if (this.old_task) {
          if (this.old_task.category != this.category) {
            axios.post("http://localhost:3000/tasklog", {
              task_id: this.old_task._id,
              category: this.category,
              log_desc: this.log_desc
            }).then(res => {
              console.log('log saved: ', res)
            })
          }
  
          axios.put("http://localhost:3000/task", {
            _id: this.old_task._id,
            name: this.name,
            description: this.description,
            pub_date: this.pub_date,
            author: this.author,
            assignee: this.assignee,
            category: this.category
          }).then(res => {
            console.log('saved: ', res)
            this.$notify({
              text: 'Task saved!',
              type: 'success'
            });
          }).catch(err => {
            console.log('error: ', err)
            this.$notify({
              text: err,
              type: 'error'
            });
          })
        } else {
  
          axios.post("http://localhost:3000/task", {
            name: this.name,
            description: this.description,
            pub_date: this.pub_date,
            author: this.author,
            assignee: this.assignee,
            category: this.category,
            project_id: this.$store.state.project_id
          }).then(res => {
  
            axios.post("http://localhost:3000/tasklog", {
              task_id: res.data._id,
              category: this.category
            }).then(res => {
              console.log('log saved: ', res)
            })
  
            console.log('saved: ', res)
            this.$notify({
              text: 'Task saved!',
              type: 'success'
            });
          }).catch(err => {
            console.log('error: ', err)
            this.$notify({
              text: err,
              type: 'error'
            });
          })
        }
  
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .row {
    margin-bottom: 20px;
  }
</style>

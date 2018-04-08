<template>
  <div>
  
    <div class="row mb-3">
      <div class="col">
        <input type="text" class="form-control search" v-model="search_query" placeholder="Search...">
      </div>
    </div>

    <div class="row">
      <div class="col add">
        <router-link :to="{ name: 'AddTask', params: { id: null }}" class="btn btn-link float-right">
          Add
        </router-link>
      </div>
    </div>
  
    <div v-if="tasks.length != 0" class="row">
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Due date</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tasks" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <router-link :to="{ name: 'Task', params: { task_id: item._id }}">
                  {{ item.name }}
                </router-link>
              </td>
              <td><span class="badge badge-pill" :class="getClass(item)">{{ item.category }}</span></td>
              <td>
                {{ formatDate(item.pub_date) }}
              </td>
              <td>
                <router-link :to="{ name: 'AddTask', params: { id: item._id }}">
                  <v-icon name="edit"></v-icon>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      no data
    </div>
  </div>
</template>

<script>
  import APIService from '@/services/APIService'
  import AuthCheck from '@/exception/AuthCheck'
  
  export default {
    name: 'TaskList',
    data() {
      return {
        tasks: [],
        isDanger: false,
        search_query: ''
      }
    },
    created() {
      this.fetchTask()
    },
    watch: {
      search_query: function(new_data) {
        APIService.getTaskByProject(this.$store.state.project_id, new_data).then(response => {
          this.tasks = response.data
        })
      }
    },
    methods: {
      fetchTask() {
        APIService.getTaskByProject(this.$store.state.project_id, '').then(response => {
          this.tasks = response.data
        }).catch(err => {
          AuthCheck.check(err.response.data)
        })
      },
      getClass(item) {
        switch (item.category) {
          case 'open':
            if (new Date() > new Date(item.pub_date))
              return 'badge-danger'
            return 'badge-primary'
          case 'closed':
            return 'badge-success'
          case 'pending':
            return 'badge-warning'
          default:
            break;
        }
      },
      formatDate(date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
  
        return [year, month, day].join('-');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .icon {
    width: 18px;
    margin: 0 0 0 5px;
    padding: 0;
  }
  
  .add {
    margin-top: -20px;
    padding: 0;
  }
</style>


<template>
  <div>
    <div v-if="$store.state.user">
      <div class="row mb-3">
        <div class="col">
          <input type="text" class="form-control" v-model="search_query" placeholder="Search...">
        </div>
      </div>
      <div class="row">
        <div class="col add">
          <router-link :to="{ name: 'AddProject', params: { id: null }}" class="btn btn-link float-right">
            Add
          </router-link>
        </div>
      </div>

      <div v-if="projects.length != 0">
        <div class="row">
          <div class="col">
            <div class="list-group">
              <router-link v-for="(item, index) in projects" :key="index" :to="{ name: 'Project', params: 
                  { project_id: item._id }}" class="list-group-item list-group-item-action flex-column align-items-start" v-on:click.native="setProjectTitle(item.name, item._id)">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{ index + 1 }}. {{ item.name }}</h5>
                  <small>Begin date: {{ formatDate(item.begin_date )}}</small>
                </div>
                <p class="mb-1">{{ item.description }}</p>
                <p class="float-right">
                  <router-link to="/members">
                    <v-icon name="users" class="float-right ml-2"></v-icon>
                  </router-link>
                  <router-link :to="{ name: 'TaskList'}" alt="Project tasks">
                    <v-icon name="layers"></v-icon>
                  </router-link>
                </p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        no data
      </div>
    </div>
    <div v-else>
      <p>Please log in.</p>
    </div>
  </div>
</template>

<script>
  import APIService from '@/services/APIService'
  import AuthCheck from '@/exception/AuthCheck'
  
  export default {
    name: 'ProjectList',
    data() {
      return {
        projects: [],
        isDanger: false,
        search_query: ''
      }
    },
    created() {
      this.fetchProject()
    },
    computed: {
  
    },
    watch: {
      search_query: function(new_data) {
        APIService.getProjectListSearch(new_data).then(response => {
          this.projects = response.data
        })
      }
    },
    methods: {
      fetchProject() {
        APIService.getProjectList().then(response => {
          this.projects = response.data
        }).catch(err => {
          AuthCheck.check(err.response.data)
        })
      },
      getClass(item) {
        if (new Date() > new Date(item))
          return 'task-danger'
        return 'task-success'
      },
      formatDate(date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
  
        return [year, month, day].join('-');
      },
      setProjectTitle(name, id) {
        this.$store.dispatch('setProject', name)
        this.$store.dispatch('setProjectId', id)
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


<template>
  <div class="row">
    <div class="col">
      <div class="form-group">
        <label>Project name</label>
        <input type="text" class="form-control form-control-sm" v-model="name" id="name" placeholder="Enter project name" required>
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea class="form-control form-control-sm" v-model="description" id="description" rows="5" placeholder="Enter project description" required></textarea>
      </div>
      <div class="form-group">
        <label>Begin date</label>
        <input class="form-control form-control-sm" type="date" v-model="begin_date" required>
      </div>
      <div class="form-group">
        <label>End date</label>
        <input class="form-control form-control-sm" type="date" v-model="end_date" required>
      </div>
      <div class="form-group">
        <label>Status</label>
        <input class="form-control form-control-sm" placeholder="Enter status" type="text" v-model="status" required>
      </div>
      <div class="form-group" v-if="old_project">
        <label>Log description</label>
        <textarea class="form-control form-control-sm" v-model="log_desc" id="log_desc" placeholder="Enter log description" rows="3"></textarea>
      </div>
      <div class="float-right">
        <button type="submit" class="btn btn-outline-secondary mr-2 btn-sm" @click="saveProject()">Save</button>
        <router-link :to="{ name: 'ProjectList' }" class="btn btn-outline-secondary btn-sm">Back</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import APIService from '@/services/APIService'
  
  export default {
    name: 'AddProject',
    data() {
      return {
        old_project: null,
        name: '',
        status: '',
        description: '',
        begin_date: '',
        end_date: '',
        log_desc: ''
      }
    },
    created() {
      if (this.$route.params.id)
        this.checkProject()
    },
    methods: {
      checkProject() {
        APIService.getProjectById(this.$route.params.id).then(response => {
          this.old_project = response.data[0]
          this.name = response.data[0].name
          this.description = response.data[0].description
          this.begin_date = this.formatDate(response.data[0].begin_date)
          this.end_date = this.formatDate(response.data[0].end_date)
          this.status = response.data[0].status
        })
      },
      saveProject() {
        if (this.old_project) {

          if (this.old_project.status != this.status) {
            console.log(this.old_project._id)
            APIService.postProjectLog({
              project_id: this.old_project._id,
              status: this.status,
              log_desc: this.log_desc
            }).then(res => {
              console.log('log saved: ', res)
            })
          }

          APIService.updateProject({
            _id: this.old_project._id,
            name: this.name,
            description: this.description,
            begin_date: this.begin_date,
            end_date: this.end_date
          }).then(res => {
            console.log('updated: ', res)
            this.$notify({
              text: 'Project updated!',
              type: 'success'
            })
          }).catch(err => {
            console.log('error: ', err)
            this.$notify({
              text: err,
              type: 'error'
            });
          })
        } else {
          APIService.postProject({
            name: this.name,
            description: this.description,
            begin_date: this.begin_date,
            status: this.status,
            end_date: this.end_date
          }).then(res => {
            APIService.postProjectLog({
              project_id: res.data._id,
              status: this.status
            }).then(res => {
              console.log('new log saved: ', res)
            })

            console.log('new saved: ', res)
            this.$notify({
              text: 'Project saved!',
              type: 'success'
            })
          }).catch(err => {
            console.log('error: ', err)
            this.$notify({
              text: err,
              type: 'error'
            });
          })
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

<style scoped>
  
</style>



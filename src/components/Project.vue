<template>
  <div>
    <div class="row mb-3">
      <div class="col-10">
          <h6 class="ml-4 mb-3">{{ project ? project.name : 'Project' }}</h6>
      </div>
      <div class="col">
        <router-link :to="{ name: 'AddProject', params: { id: project ? project._id : null }}">
          <v-icon name="edit" class="float-right"></v-icon>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <ul class="timeline">
          <li v-for="(item, index) in logs" :key="item._id">
            <div class="ivu-timeline-item-tail"></div>
            <div v-if="index == 0"  class="ivu-timeline-item-head ivu-timeline-item-head-custom">
              <v-icon name="bell"></v-icon>
            </div>
            <div v-if="(logs.length - 1) == index" class="ivu-timeline-item-head ivu-timeline-item-head-custom">
              <v-icon name="star"></v-icon>
            </div>
            <div v-if="(logs.length - 1) != index && index != 0" class="ivu-timeline-item-head open">
            </div>
            <div class="ivu-timeline-item-content">
              <p class="timeline-head">{{ item.status }}</p>
              <p>{{ item.log_desc }}</p>
              <p v-if="index == 0" >{{ project.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import APIService from '@/services/APIService'
  
  export default {
    name: "Project",
    data() {
      return {
        project: null,
        logs: null
      }
    },
    created() {
      APIService.getProjectById(this.$route.params.project_id)
        .then(response => {
          this.project = response.data[0]
        })

      APIService.getProjectLog(this.$route.params.project_id)
        .then(response => {
          this.logs = response.data
        })
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
      }
    }
  }
</script>

<style scoped>
  .icon {
    width: 16px;
  }
</style>



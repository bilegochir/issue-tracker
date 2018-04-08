<template>
    <div>
        <div class="row mb-3">
            <div class="col-10">
                <h6 class="ml-4 mb-3">{{ task ? task.name : 'Task' }}</h6>
            </div>
            <div class="col-2">
                <router-link :to="{ name: 'AddTask', params: { id: task ? task._id : null }}" class="float-right">
                    <v-icon name="edit" class="float-right"></v-icon>
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <ul class="timeline">
                    <li v-for="item in logs" :key="item._id">
                        <div class="ivu-timeline-item-tail"></div>
                        <div class="ivu-timeline-item-head" :class="item.category"></div>
                        <div class="ivu-timeline-item-content">
                            <p class="timeline-head">
                                {{ item.category }} ({{ formatDate(item.created_date) }})
                            </p>
                            <p>
                                {{ (item.log_desc == null && task != null ? task.description : item.log_desc) }}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    
    export default {
        name: 'Task',
        data() {
            return {
                logs: [],
                task: null
            }
        },
        mounted() {
            if (this.$route.params.task_id != null) {
                axios.get("http://localhost:3000/tasklog", {
                    params: {
                        task_id: this.$route.params.task_id
                    }
                }).then(response => {
                    this.logs = response.data
                })
    
                axios.get("http://localhost:3000/task-view", {
                    params: {
                        id: this.$route.params.task_id
                    }
                }).then(response => {
                    this.task = response.data[0]
                })
            } else {
                console.log('Paramater null')
            }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .icon {
        width: 18px;
        margin: 0 0 0 5px;
        padding: 0;
    }
</style>


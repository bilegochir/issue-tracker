<template>
    <div>
        <div class="row details">
            <div class="col col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div class="card">
                    <p>{{ $store.state.user ? $store.state.user.firstname + ' ' + $store.state.user.lastname : '-'}}</p>
                    <p>{{ $store.state.user ? $store.state.user.email : '-' }}</p>
                    <p>{{ $store.state.user ? $store.state.user.phone : '-' }}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Due date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in tasks" :key="item._id">
                            <td>
                                <router-link :to="{ name: 'Task', params: { task_id: item._id }}">
                                    {{ item.name }}
                                </router-link>
                            </td>
                            <td>{{ item.category }}</td>
                            <td>
                                {{ formatDate(item.pub_date) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import APIService from '@/services/APIService'
    
    export default {
        name: "Profile",
        data() {
            return {
                tasks: [],
                projects: []
            }
        },
        created() {
            this.fetchTask()
        },
        methods: {
            fetchTask() {
                APIService.getTaskList().then(response => {
                    this.projects = response.data
                })
    
                if (this.$store.state.user)
                    APIService.getTaskByUser(this.$store.state.user.username).then(response => {
                        this.tasks = response.data
                    })
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
    .details {
        margin-bottom: 20px;
    }
    
    .card {
        padding: 10px;
    }
</style>



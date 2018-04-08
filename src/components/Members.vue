<template>
    <div>
        <div class="row mb-3">
            <div class="col">
                <button @click="showUserList = !showUserList" class="float-right btn btn-link">
                    <v-icon v-if="!showUserList" name="plus-circle" class="float-right"></v-icon>
                    <v-icon v-else name="minus-circle" class="float-right"></v-icon>
                </button>
            </div>
        </div>
        <transition name="slide-fade">
            <div class="row" v-if="showUserList">
                <div class="col">
                    <h5>User List</h5>
                    <div class="table-responsive">
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Registered</th>
                                    <th scope="col">Add</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in users" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ item.firstname + ' ' + item.lastname }}</td>
                                    <td>{{ item.username }}</td>
                                    <td>{{ item.email }}</td>
                                    <td>{{ formatDate(item.created_date) }}</td>
                                    <td>
                                        <button class="btn btn-link" @click="add(item._id)">
                                                                                                            <v-icon name="arrow-down-circle"></v-icon>
                                                                                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </transition>
        <div class="row">
            <div class="col">
                <h5>Member List</h5>
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Registered</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in members" :key="index">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ item.firstname + ' ' + item.lastname }}</td>
                                <td>{{ item.username }}</td>
                                <td>{{ item.email }}</td>
                                <td>{{ formatDate(item.created_date) }}</td>
                                <td>
                                    <button class="btn btn-link" @click="remove(item._id)">
                                                                        <v-icon name="arrow-up-circle"></v-icon>
                                                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import APIService from '@/services/APIService'
    
    export default {
        name: "Members",
        data() {
            return {
                users: [],
                members: [],
                showUserList: false
            };
        },
        methods: {
            add(member_id) {
                APIService.postMemberByProject(this.$store.state.project_id, member_id).then(res => {
                    console.log(res)
                    this.members = []
                    this.fetchMembers()
                    this.$notify({
                        text: 'Member successfully added.',
                        type: 'success'
                    });
                }).catch(err => {
                    console.log(err)
                    switch (err.response.status) {
                        case 403:
                            this.$notify({
                                text: 'Login session has expired.',
                                type: 'error'
                            });
                            this.$router.push({
                                name: 'Home'
                            })
                            break;
                        case 401:
                            this.$notify({
                                text: 'Authentication error.',
                                type: 'error'
                            });
                            break;

                        default:
                            break;
                    }
                })
            },
            remove(member_id) {
                APIService.deleteMemberByProject(member_id).then(res => {
                    console.log(res)
                    this.members = []
                    this.fetchMembers()
                    this.$notify({
                        text: 'Member successfully removed.',
                        type: 'success'
                    });
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
            },
            fetchMembers() {
                APIService.getMemberByProject(this.$store.state.project_id).then(response => {
                    for (var i = 0; i < response.data.length; i++) {
                        APIService.getUserById(response.data[i].member_id).then(res => {
                            this.members.push(res.data)
                        }).catch(error => {
                            console.log(error)
                            switch (error.response.status) {
                                case 403:
                                    this.$notify({
                                        text: 'Login session has expired.',
                                        type: 'error'
                                    });
                                    this.$router.push({
                                        name: 'Home'
                                    })
                                    break;
                                case 401:
                                    this.$notify({
                                        text: 'Authentication error.',
                                        type: 'error'
                                    });
                                    break;
    
                                default:
                                    break;
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err)
                    switch (err.response.status) {
                        case 403:
                            this.$notify({
                                text: 'Login session has expired.',
                                type: 'error'
                            });
                            this.$router.push({
                                name: 'Home'
                            })
                            break;
                        case 401:
                            this.$notify({
                                text: 'Authentication error.',
                                type: 'error'
                            });
                            break;

                        default:
                            break;
                    }
                })
            },
            fetchUsers() {
                APIService.getUserList().then(response => {
                    this.users = response.data
                }).catch(err => {
                    console.log(err)
                    switch (err.response.status) {
                                case 403:
                                    this.$notify({
                                        text: 'Login session has expired.',
                                        type: 'error'
                                    });
                                    this.$router.push({
                                        name: 'Home'
                                    })
                                    break;
                                case 401:
                                    this.$notify({
                                        text: 'Authentication error.',
                                        type: 'error'
                                    });
                                    break;
    
                                default:
                                    break;
                            }
                })
            }
        },
        created() {
            this.fetchMembers()
            this.fetchUsers()
        }
    }
</script>

<style scoped>
    .icon {
        width: 16px;
    }
    
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    
    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    
    .slide-fade-enter
    /* .slide-fade-leave-active below version 2.1.8 */
    
    {
        transform: translateX(10px);
        opacity: 0;
    }
    
    .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */
    
    {
        opacity: 0;
        transform: translateX(10px);
    }
</style>


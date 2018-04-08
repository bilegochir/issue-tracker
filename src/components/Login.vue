<template>
    <div class="row justify-content-center">
        <div class="col-12 login">
            <div class="form-group">
                <label>Username</label>
                <input class="form-control" type="text" v-model="username">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input class="form-control" type="password" v-model="password">
            </div>
            <button @click="login()" class="btn btn-outline-secondary mr-2 btn-sm float-right">Login</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                axios.post("http://localhost:3000/auth/login", {
                    username: this.username,
                    password: this.password
                }).then(res => {
                    this.$store.dispatch('setUser', res.data.user)
                    this.$store.dispatch('setToken', res.data.token)
                    this.$router.push({
                        name: 'Home'
                    })
                }).catch(err => {
                    this.$notify({
                        text: err.response.data,
                        type: 'error'
                    }); 
                })
            }
        }
    }
</script>

<style scoped>
    .login {
        max-width: 50%;
    }
</style>



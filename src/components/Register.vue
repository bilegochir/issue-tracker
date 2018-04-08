<template>
    <div class="row justify-content-md-center">
        <div class="col-12 register">
            <div class="form-group">
                <label>Firstname</label>
                <input class="form-control" type="text" v-model="firstname" autocomplete="off">
            </div>
            <div class="form-group">
                <label>Lastname</label>
                <input class="form-control" type="text" v-model="lastname" autocomplete="off">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input class="form-control" type="text" v-model="email" autocomplete="off">
            </div>
            <div class="form-group">
                <label>Username</label>
                <input class="form-control" type="text" v-model="username" autocomplete="off">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input class="form-control" type="text" v-model="phone" autocomplete="off">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input class="form-control" type="password" v-model="password" autocomplete="off">
            </div>
            <div class="form-group">
                <label>Password again</label>
                <input class="form-control" type="password" v-model="password_2" autocomplete="off">
            </div>
            <button @click="register()" class="btn btn-outline-secondary mr-2 btn-sm float-right">Register</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Login',
        data() {
            return {
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                username: '',
                password: '',
                password_2: ''
            }
        },
        methods: {
            register() {
                if (this.password === this.password_2) {
                    axios.post("http://localhost:3000/auth/register", {
                        firstname: this.firstname,
                        lastname: this.lastname,
                        email: this.email,
                        phone: this.phone,
                        username: this.username,
                        password: this.password
                    }).then(res => {
                        console.log(res)
                        this.$notify({
                            text: 'User successfully registered!',
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
                    this.$notify({
                        text: 'Password does not match.',
                        type: 'error'
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .register {
        max-width: 300px;
    }
</style>


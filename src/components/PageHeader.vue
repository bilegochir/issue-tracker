<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link to="/"><v-icon name="target"></v-icon></router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" 
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <router-link class="nav-item nav-link" to="/projectlist" v-on:click.native="goHome()">Projects</router-link>
                <span v-if="$store.state.project != 'Projects' && $store.state.user" class="nav-item nav-link current" @click="setProjectTitle()">(Current)</span>
                <router-link class="nav-item nav-link" v-if="$store.state.project != 'Projects' && $store.state.user" to="/tasklist">Tasks</router-link>
                <router-link class="nav-item nav-link" v-if="$store.state.project != 'Projects' && $store.state.user" to="/members">Members</router-link>
                <router-link class="nav-item nav-link" v-if="!$store.state.user" to="/login">Login</router-link>
                <router-link class="nav-item nav-link" v-if="!$store.state.user" to="/register">Register</router-link>
                <router-link class="nav-item nav-link" to="/help">Help</router-link>
                <span v-if="$store.state.user" class="nav-item nav-link logout" @click="logout()">Logout</span>
                <router-link v-if="$store.state.user" class="nav-item nav-link profile" to="/profile">{{ $store.state.user.username }}</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "PageHeader",
        data() {
            return {};
        },
        props: {
            msg: String
        },
        created() {},
        methods: {
            setProjectTitle() {
                this.$router.push({
                    name: 'Project',
                    params: { project_id: this.$store.state.project_id }
                })
            },
            goHome() {
                this.$store.dispatch('setProject', 'Projects')
            },
            logout() {
                this.$store.dispatch('setUser', null)
                this.$store.dispatch('setToken', null)
                this.$router.push({
                    name: 'Home'
                })
            }
        }
    };
</script>

<style scoped>
    nav {
        margin-bottom: 20px;
    }
    @media (min-width: 992px){
        .profile {
            position: absolute;
            right: 0;
            margin-right: 5px;
        }
    }
    .current {
        margin-left: -12px;
        cursor: pointer;
        color: #007bff !important;
    }
    .icon {
        margin-top: 4px;
        width: 22px;
        padding: 3px;
        border: 1px solid rgba(0,0,0,.5);
        border-radius: 3px;
        color: rgba(0,0,0,.5);
    }
    .logout {
        cursor: pointer;
    }
</style>



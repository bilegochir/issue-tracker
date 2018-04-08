import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        project: 'Projects',
        project_id: null,
        token: null,
        user: null
    },
    mutations: {
        setProject (state, project) {
            state.project = project
        },
        setProjectId (state, project_id) {
            state.project_id = project_id
        },
        setUser (state, user) {
            state.user = user
        },
        setToken(state, token) {
            state.token = token
        }
    },
    actions: {
        setProject ({commit}, project) {
            commit('setProject', project)
        },
        setProjectId ({commit}, project_id) {
            commit('setProjectId', project_id)
        },
        setUser ({commit}, user) {
            commit('setUser', user)
        },
        setToken ({commit}, token) {
            commit('setToken', token)
        }
    }
})

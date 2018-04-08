import Service from '@/services/Service'

export default {

    getUserList() {
        return Service().get('user')
    },
    getUserById(member_id) {
        return Service().get('/userById', { params: { member_id: member_id }})
    },
    getTaskList() {
        return Service().get('/task')
    },
    getTaskListSearch(search) {
        return Service().get('/tasksearch', { params: { search: search }})
    },
    getTaskByProject(project_id, search) {
        return Service().get('/taskByProject', { params: { project_id: project_id, search: search }})
    },
    getTaskByUser(assignee) {
        return Service().get('/taskByUser', { params: { assignee: assignee }})
    },
    getProjectList() {
        return Service().get('/project')
    },
    getProjectById(project_id) {
        return Service().get('/project-view', { params: { project_id: project_id }})
    },
    getMemberByProject(project_id) {
        return Service().get('/memberByProject', { params: { project_id: project_id }})
    },
    postMemberByProject(project_id, member_id) {
        return Service().post('/projectmember', { project_id: project_id, member_id: member_id })
    },
    deleteMemberByProject(member_id) {
        return Service().delete('/projectmember', { params: { member_id: member_id }})
    },
    getProjectListSearch(search) {
        return Service().get('/projectsearch', { params: { search: search }})
    },
    updateProject(data) {
        return Service().put('/project', data)
    },
    postProject(data) {
        return Service().post('/project', data)
    },
    postHelpData(data) {
        return Service().post('/help', data)
    },
    getHelpData() {
        return Service().get('/help')
    },
    updateHelpData(data) {
        return Service().put('/help', data)
    },
    postHomeData(data) {
        return Service().post('/home', data)
    },
    getHomeData() {
        return Service().get('/home')
    },
    updateHomeData(data) {
        return Service().put('/home', data)
    },
    getProjectLog(project_id) {
        return Service().get('/projectlog', { params: { project_id: project_id }})
    },
    postProjectLog(data) {
        return Service().post('/projectlog', data)
    }

}
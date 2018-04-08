import Vue from 'vue'
import Router from 'vue-router'
import AddTask from '@/components/AddTask'
import Members from '@/components/Members'
import TaskList from '@/components/TaskList'
import Task from '@/components/Task'
import Help from '@/components/Help'
import Project from '@/components/Project'
import ProjectList from '@/components/ProjectList'
import AddProject from '@/components/AddProject'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/addtask',
      name: 'AddTask',
      component: AddTask,
      props: true
    },
    {
      path: '/members',
      name: 'Members',
      component: Members,
      props: true
    },
    {
      path: '/tasklist',
      name: 'TaskList',
      component: TaskList,
      props: true
    },
    {
      path: '/task',
      name: 'Task',
      component: Task,
      props: true
    },
    {
      path: '/help',
      name: 'Help',
      component: Help,
      props: true
    },
    {
      path: '/project',
      name: 'Project',
      component: Project,
      props: true
    },
    {
      path: '/projectlist',
      name: 'ProjectList',
      component: ProjectList,
      props: true
    },
    {
      path: '/addproject',
      name: 'AddProject',
      component: AddProject
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      props: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: true
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

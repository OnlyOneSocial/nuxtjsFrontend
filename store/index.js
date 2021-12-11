let serverUrl = 'https://only-one.su/api'
let serverNewsUrl = serverUrl
let serverUsersUrl = serverUrl
if (process.env.NODE_ENV === 'production' && process.env.VUE_ENV === 'server') { serverUrl = 'http://localhost:3044/api'; serverNewsUrl = 'http://localhost:3053/api'; serverUsersUrl = 'http://localhost:3046/api' }

export const state = () => ({
  me: {
    id: 0
  },
  modal: {
    type: false,
    data: ''
  },
  news: [],
  users: [],
  post: {}
})

export const actions = {
  async nuxtServerInit ({ commit, state }, { app, redirect }) {
    const token = this.$cookies.get('token')
    const namePage = app.router.history.current.name
    if (!token && namePage === 'index') {
      redirect('/login')
    }
    if (token && namePage === 'index') {
      redirect('/news')
    }
    if (token && namePage === 'login') {
      redirect('/news')
    }
    if (token && namePage !== 'login') {
      let headers = {}

      if (token !== '') {
        headers = {
          authorization: 'Bearer ' + token
        }
      }

      const res = await this.$axios.get(`${serverUrl}/auth/user/`, { headers }).catch((err) => {
        if (err.response.status === 401) {
          this.$cookies.remove('token')
          // redirect('/login')
        }
      })

      if (res && res.data && res.data.user && res.data.user.id) { commit('SetMe', res.data.user) }
    }
  },
  async getUsers ({ commit }, userid) {
    const response = await this.$api.$get(`${serverUsersUrl}/user/get`).catch((err) => {
      console.log(err)
    })
    if (response) {
      const content = response
      commit('SetUsers', content)
    }
    return true
  },
  async getNews ({ commit }) {
    const response = await this.$api.$get(`${serverNewsUrl}/wall/get`).catch((err) => {
      console.log(err)
    })
    if (response) {
      const content = response
      commit('SetNews', content)
    }
    return true
  },
  async getPost ({ commit }, { PostID }) {
    const response = await this.$api.$get(`${serverNewsUrl}/wall/post/${PostID}`).catch((err) => {
      console.log(err)
    })
    if (response) {
      const content = response
      commit('SetPost', content)
    }
    return true
  },
  async getMe ({ commit }) {
    const response = await this.$api.$get(`${serverUrl}/auth/user/`).catch((err) => {
      console.log(err)
    })
    if (response) {
      const content = response.user
      commit('SetMe', content)
    }
    return true
  }
}

export const mutations = {
  SetModal (state, { type, data }) {
    state.modal = {
      type,
      data
    }
  },
  SetNews (state, content) {
    state.news = content
  },
  SetPost (state, content) {
    state.post = content
  },
  SetMe (state, content) {
    state.me = content
  },
  SetUsers (state, content) {
    state.users = content
  }
}

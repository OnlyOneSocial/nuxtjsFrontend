let serverUrl = 'https://social.katelinlis.ru/api'
let serverNewsUrl = serverUrl
if (process.env.NODE_ENV === 'production' && process.env.VUE_ENV === 'server') { serverUrl = 'http://localhost:3044/api'; serverNewsUrl = 'http://localhost:3053/api' }

export const state = () => ({
  me: {
    id: 0
  },
  user: {
    username: 'asdasdsd',
    id: '',
    avatar: '',
    friends: {
      list: [],
      count: 0
    }
  },
  users: [],
  posts: []
})

export const actions = {
  async getUsers ({ commit }, userid) {
    const response = await this.$api.$get(`${serverUrl}/user/get`).catch((err) => {
      console.log(err)
    })
    if (response) {
      const content = response
      commit('SetUsers', content)
    }
    return true
  },
  async getUser ({ commit }, userid) {
    const response = await this.$api.$get(`${serverUrl}/user/get/${userid}`).catch((err) => {
      console.log(err)
    })
    if (response) {
      const content = response.user
      commit('SetUser', content)
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
  },
  async getPosts ({ commit }, userid) {
    const response = await this.$api.$get(`${serverNewsUrl}/wall/get/${userid}`).catch((err) => {
      console.log(err)
    })
    if (response) {
      const content = response
      commit('SetPosts', content)
    }
    return true
  }
}

export const mutations = {
  SetUser (state, content) {
    state.user = content
  },
  SetMe (state, content) {
    state.me = content
  },
  SetUsers (state, content) {
    state.users = content
  },
  SetPosts (state, content) {
    state.posts = content
  }
}

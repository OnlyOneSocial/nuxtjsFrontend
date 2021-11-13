let serverUrl = 'https://social.katelinlis.ru/api'
let serverNewsUrl = serverUrl
if (process.env.NODE_ENV === 'production' && process.env.VUE_ENV === 'server') { serverUrl = 'http://localhost:3044/api'; serverNewsUrl = 'http://localhost:3053/api' }

export const state = () => ({
  user: {
    username: 'asdasdsd',
    id: '',
    avatar: '',
    friends: {
      list: [],
      count: 0
    }
  },
  friendStatus: {},
  posts: []
})

export const actions = {
  async getUser ({ commit }, userid) {
    const response = await this.$api.$get(`${serverUrl}/user/get/${userid}`)
    if (response) {
      const user = response.user
      const friendStatus = response.friend_status
      commit('SetUser', user)
      commit('SetFriendStatus', friendStatus)
    }
    return true
  },
  async getPosts ({ commit }, userid) {
    const response = await this.$api.$get(`${serverNewsUrl}/wall/get/${userid}`)
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
  SetFriendStatus (state, content) {
    state.friendStatus = content
  },
  SetPosts (state, content) {
    state.posts = content
  }
}

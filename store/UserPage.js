let serverUrl = 'https://only-one.su/api'
let serverNewsUrl = serverUrl
let serverUsersUrl = serverUrl
if (process.env.NODE_ENV === 'production' && process.env.VUE_ENV === 'server') { serverUrl = 'http://localhost:3044/api'; serverNewsUrl = 'http://localhost:3053/api'; serverUsersUrl = 'http://localhost:3046/api' }

export const state = () => ({
  user: {
    username: 'asdasdsd',
    id: '',
    avatar: ''
  },
  friends: {
    list: [],
    count: 0
  },
  friendStatus: {},
  posts: {
    list: [],
    end: false
  }
})

export const actions = {
  async getUser ({ commit }, userid) {
    const response = await this.$api.$get(`${serverUsersUrl}/user/get/${userid}`).catch((err) => {
      if (err.response.status === 404) { return '404' }
    })
    if (response.user) {
      const user = response.user
      const friends = response.friends
      const friendStatus = response.friend_status
      commit('SetUser', user)
      commit('SetFriends', friends)
      commit('SetFriendStatus', friendStatus)
    }
    if (response === '404') { throw new Error('404') }
  },
  async getPosts ({ commit }, { offset, limit, userid }) {
    const response = await this.$api.$get(`${serverNewsUrl}/wall/get/${userid}?offset=${offset}&limit=${limit}`)
    if (response) {
      const content = response
      commit('SetPosts', { content, offset })
    }
    return true
  }
}

export const mutations = {
  SetUser (state, content) {
    state.user = content
  },
  SetFriends (state, content) {
    state.friends = content
  },
  SetFriendStatus (state, content) {
    state.friendStatus = content
  },
  SetPosts (state, content) {
    if (content.content.length === 0 && content.offset !== 0) { state.posts.end = true }
    if (content.offset === 0) { state.posts.list = content.content } else { state.posts.list.push(...content.content) }
  }
}

export default function (context, inject) {
  const token = context.$cookies.get('token')
  let headers = {}

  if (token !== '') {
    headers = {
      authorization: 'Bearer ' + token
    }
  }

  const api = context.$axios.create({
    headers
  })

  // Set baseURL to something different
  api.setBaseURL('https://social.katelinlis.xyz/api/')

  // Inject to context as $api
  inject('api', api)
}

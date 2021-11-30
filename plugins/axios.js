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
  if (process.server) {
    if (context.req.headers.host.split(':')[0] === 'social.anon') { api.setBaseURL('http://social.anon/api/') } else { api.setBaseURL('https://only-one.su/api/') }
    console.log(123)
  }
  // Inject to context as $api
  inject('api', api)
}

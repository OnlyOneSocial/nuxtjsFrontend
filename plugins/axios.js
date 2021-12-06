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
    if (process.client) {
        if (window.location.host.split(':')[0] === 'social.anon') {
            api.setBaseURL('http://social.anon/api/')
        } else {
            api.setBaseURL('https://only-one.su/api/')
        }
    }
    if (process.server) {
        if (context.req.headers.host.split(':')[0] === 'social.anon') {
            api.setBaseURL('http://social.anon/api/')
        } else {
            api.setBaseURL('https://only-one.su/api/')
        }
    }
    // Inject to context as $api
    inject('api', api)
}

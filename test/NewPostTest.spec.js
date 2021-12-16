import { mount } from '@vue/test-utils'
import NewPost from '@/components/News/newPost.vue'

describe('NuxtLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(NewPost)
    expect(wrapper.vm).toBeTruthy()
  })
})

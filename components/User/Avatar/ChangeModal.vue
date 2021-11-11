<template>
  <div
    :style="StyleSizeBlock+' margin: 0 auto;top: 100px;position:relative;background-color:gray'"
  >
    <div>
      <div style="width:300px;margin: 0 auto;">
        <div v-if="step===0" style="padding-top:25%;height:70%">
          <span style="padding-top:50px;position:relative;">Вы можете загрузить изображение в формате JPG, GIF или PNG.</span>
          <input type="file" @change="loadImage">
        </div>
        <span v-if="step===1">Выберите зону загрузки как полную фоографию</span>
        <span v-if="step===2">Выберите зону для миниатюрной фотографии</span>
        <cropper
          v-if="step===1"
          class="cropper"
          :src="image.src"
          :stencil-props="{
            aspectRatio: 10/12
          }"

          @change="change"
        />
        <cropper
          v-if="step===2"
          class="cropper"
          :src="image2.src"
          :stencil-props="{
            aspectRatio: 10/12
          }"
          stencil-component="circle-stencil"

          @change="change2"
        />
        <img v-if="step===3" width="100" :src="image2.src">
        <img v-if="step===3" style="border-radius: 100%;" width="100" :src="image3.src">
        <button style="background-color:red" @click="step++">
          Сохранить и продолжить
        </button>
        <button v-if="step>0" style="background-color:red" @click="step--">
          Вернуть назад
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
function getMimeType (file, fallback = null) {
  const byteArray = (new Uint8Array(file)).subarray(0, 4)
  let header = ''
  for (let i = 0; i < byteArray.length; i++) {
    header += byteArray[i].toString(16)
  }
  switch (header) {
    case '89504e47':
      return 'image/png'
    case '47494638':
      return 'image/gif'
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      return 'image/jpeg'
    default:
      return fallback
  }
}
export default {
  components: {
    Cropper
  },
  props: {
    avatar: {
      type: String,
      default: ''
    },
    open: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      upload: false,
      image: { src: '', type: '' },
      image2: { src: '', type: '' },
      image3: { src: '', type: '' },
      step: 0

    }
  },
  computed: {
    StyleSizeBlock () {
      switch (this.step) {
        case 0:
          return 'width:600px;height:250px;'
        case 1:
          return 'width:600px;height:650px;'
        case 2:
          return 'width:400px;height:500px;'
        case 3:
          return 'width:400px;height:200px;'
        default:
          return ''
      }
    }
  },
  methods: {
    change ({ coordinates, canvas }) {
      // this.coordinates = coordinates;

      this.image2.src = canvas.toDataURL()
      // this.step++
    },
    change2 ({ coordinates, canvas }) {
      // this.coordinates = coordinates;

      this.image3.src = canvas.toDataURL()
      // this.step++
    },
    loadImage (event) {
      this.step++
      const { files } = event.target
      if (files && files[0]) {
        if (this.image.src) {
          URL.revokeObjectURL(this.image.src)
        }
        const blob = URL.createObjectURL(files[0])
        const reader = new FileReader()

        reader.onload = (e) => {
          this.upload = true
          this.image = {
            src: blob,
            type: getMimeType(e.target.result, files[0].type)
          }
        }
        reader.readAsArrayBuffer(files[0])
      }
    }
  }
}
</script>

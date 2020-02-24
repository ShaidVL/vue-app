<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <h1 class="text--secondary mb-3">New Ad</h1>
        <v-form
          ref="form"
          v-model="valid"
          validation
          class="mb-3"
        >
          <v-text-field
            label="Ad title"
            name="title"
            type="text"
            :rules="[v=>!!v || 'Title is required']"
            v-model="title"
          />

          <v-textarea
            label="Ad description"
            name="description"
            type="text"
            :rules="[v=>!!v || 'Description is required']"
            v-model="description"
          />
        </v-form>
        <v-row class="mb-3">
          <v-col>
            <v-btn
              class="warning"
              @click="triggerUpload"
            >
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              style="display: none;"
              accept="image/*"
              @change="onFileChange"
            >
          </v-col>
        </v-row>
        <v-row>
          <v-img
            height="100"
            :src="imageSrc"
            v-if="imageSrc"
            ></v-img>
        </v-row>
        <v-row>
          <v-switch
            color="primary"
            v-model="promo"
            label="Ad to promo?"
          ></v-switch>
        </v-row>
        <v-row>
          <v-col>
            <v-spacer />
              <v-btn
                :loading="loading"
                :disabled="!valid || !image || loading"
                class="success"
                @click="createAd"
              >
                Create Ad
              </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createAd () {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          imageSrc: this.image
        }
        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      }
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>

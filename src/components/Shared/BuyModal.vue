<template>
  <div class="d-inline mr-3">
    <v-btn
      text
      class="primary"
      @click.stop="modal = true"
    >
      Buy
    </v-btn>
    <v-dialog width="400px" v-model="modal">
      <v-card>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card-text>
                <h1 class="text--primary">Do you want to buy it?</h1>
              </v-card-text>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12">
              <v-card-text>
                <v-text-field
                  label="Your name"
                  name="name"
                  type="text"
                  v-model="name"
                />
                <v-text-field
                  label="Your phone"
                  name="phone"
                  type="text"
                  v-model="phone"
                />
              </v-card-text>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  @click="onCancel"
                  :disabled="localLoading"
                >
                  Close</v-btn>
                <v-btn
                  text
                  class="success"
                  @click="onSave"
                  :disabled="localLoading"
                  :loading="localLoading"
                >
                  Buy it!</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
export default {
  props: ['ad'],
  data () {
    return {
      modal: false,
      name: '',
      phone: '',
      localLoading: false
    }
  },
  methods: {
    onCancel () {
      this.name = ''
      this.phone = ''
      this.modal = false
    },
    onSave () {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true
        this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          adId: this.ad.id,
          ownerId: this.ad.ownerId
        })
          .finally(() => {
            this.name = ''
            this.phone = ''
            this.localLoading = false
            this.modal = false
          })
      }
    }
  }
}
</script>

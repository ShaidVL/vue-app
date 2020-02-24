<template>
  <div class="d-inline mr-3">
    <v-btn
    text
    class="warning"
    @click.stop="modal = true"
  >
    Edit
  </v-btn>
    <v-dialog width="400px" v-model="modal">
      <v-card>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card-text>
                <h1 class="text--primary">Edit ad</h1>
              </v-card-text>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12">
              <v-card-text>
                <v-text-field
                  label="Title"
                  name="title"
                  type="text"
                  v-model="editedTitle"
                />
                <v-textarea
                  label="Description"
                  name="description"
                  type="text"
                  v-model="editedDescription"
                />
              </v-card-text>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="onCancel">Cancel</v-btn>
                <v-btn text class="success" @click="onSave">Save</v-btn>
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
      editedDescription: this.ad.description,
      editedTitle: this.ad.title
    }
  },
  methods: {
    onCancel () {
      this.editedDescription = this.ad.description
      this.editedTitle = this.ad.title
      this.modal = false
    },
    onSave () {
      if (this.editedDescription !== '' && this.editedTitle !== '') {
        this.$store.dispatch('updateAd', {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        })
        this.model = false
      }
    }
  }
}
</script>

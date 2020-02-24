<template>
  <v-container>
    <v-row v-if="!loading && myAds.length !== 0">
      <v-col
        cols="12"
        sm="6"
        offset-sm="3"
      >
        <h1 class="text--secondary mb-3">My ads</h1>

        <v-card
        class="elevation-10 mb-3"
        v-for="ad in myAds"
        :key="ad.id"
        >
          <v-row>
            <v-col cols="4" padless>
              <v-img :src="ad.imageSrc" height="150px"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-text>
                <h2 class="text--primary">{{ad.title}}</h2>
                <p>{{ad.description}}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  class="info"
                  :to="'/ad/' + ad.id"
                >Open</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else-if="!loading && myAds.length === 0">
      <v-col cols="12">
        <h1 class="text--primary">You have no ads</h1>
      </v-col>
    </v-row>
    <div v-else>
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center pt-5">
            <v-progress-circular
              :size="100"
              :width="4"
              color="purple"
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    myAds () {
      return this.$store.getters.myAds
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

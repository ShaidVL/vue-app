<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
      v-if="!loading && orders.length !== 0"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
      >
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list
          two-line
        >
          <v-list-item
            v-for="order in orders"
            :key="order.id"
          >
            <v-list-item-action>
              <v-checkbox
                color="success"
                :input-value="order.done"
                @change="markDone(order)"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{order.name}}</v-list-item-title>
              <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                :to="'/ad/' + order.adId"
                class="primary"
              >Open
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row v-else-if="!loading && orders.length === 0">
      <v-col>
        <h1 class="text--secondary">You have no orders</h1>
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
    return {
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  methods: {
    markDone (order) {
      this.$store.dispatch('markOrderDone', order.id)
        .then(() => {
          order.done = true
        })
        .catch(() => {})
    }
  },
  created () {
    this.$store.dispatch('fetchOrders')
  }
}
</script>

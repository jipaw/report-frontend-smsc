<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="subtitle has-text-centered">USER</p>
          <p class="title has-text-centered">{{ data.username }}</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="subtitle has-text-centered">SMS Balance</p>
          <p class="title has-text-centered">{{ data.sms_balance }}</p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="subtitle has-text-centered">SMS Pending</p>
          <p class="title has-text-centered">{{ data.sms_pending }}</p>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="subtitle">TODAY SUMARRY TRANSACTION</p>

          <div class="field is-grouped">
            <p class="control is-expanded" >
              <label class="label">Start Date</label>
              <datepicker :inputClass="{ test: true }" :config="{ wrap: true }" v-model="value.startDate">
                <a class="button" data-toggle><i class="fa fa-calendar"></i></a>
                <!--<a class="button" data-clear><i class="fa fa-close"></i></a>-->
              </datepicker>
              <label class="label">End Date</label>
              <datepicker :inputClass="{ test: true }" :config="{ wrap: true }" v-model="value.endDate">
                <a class="button" data-toggle><i class="fa fa-calendar"></i></a>
                <!--<a class="button" data-clear><i class="fa fa-close"></i></a>-->
              </datepicker>
              <a class="button is-dark" @click="loadData">Show</a>
            </p>
          </div>
          <div class="field">
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="subtitle has-text-centered">SMS Request</p>
          <p class="title has-text-centered"><span class="title help"><strong>{{ data.sms_request }}</strong></span></p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="subtitle has-text-centered">SMS Sent</p>
          <p class="title has-text-centered"><span class="title help is-primary"><strong>{{ data.sms_success }}</strong></span></p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="subtitle has-text-centered">SMS Failed</p>
          <p class="title has-text-centered"><span class="title help is-danger"><strong>{{ data.sms_failed }}</strong></span></p>
        </article>
      </div>
    </div>
<!--    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h5 class="subtitle has-text-centered">Raw SMS Queue</h5>
          <table class="table is-narrow">
            <thead>
            <tr>
              <th>Date</th>
              <th>Destination</th>
              <th>Chip Sender</th>
              <th>Status</th>
              <th>Process</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items">
              <td>{{ item.in_time }}</td>
              <td>{{ item.destination }}</td>
              <td>{{ item.chip_sender }}</td>
              <td>{{ item.reference }}</td>
              <td><a class="button is-small" @click="resend(item)"><span class="icon is-small"><i class="fa fa-spinner"></i></span></a>
                <a class="button is-small" @click="setSuccess(item)"><span class="icon is-small"><i class="fa fa-check-circle"></i></span></a>
                <a class="button is-small" @click="setFailed(item)"><span class="icon is-small"><i class="fa fa-times-circle"></i></span></a></td>
            </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div> -->
  </div>
</template>

<script>
import Datepicker from 'vue-bulma-datepicker'

export default {
  components: {
    Datepicker
  },

  data () {
    return {
      data: {
        username: null,
        sms_balance: 0,
        sms_pending: 0,
        sms_request: 0,
        sms_success: 0,
        sms_failed: 0
      },
      value: {
        startDate: null,
        endDate: null
      }
    }
  },

  // watch: {
  //   value (newVal, oldVal) {
  //     console.log(newVal, oldVal)
  //   }
  // },

  methods: {
    loadData () {
      this.$http({
        url: 'http://5.189.176.218:10900/get-data',
        method: 'post',
        data: {
          startDate: this.value.startDate,
          endDate: this.value.endDate
        }
      }).then((response) => {
       // console.log(response)
        this.data.sms_request = response.data.sms_request
        this.data.sms_success = response.data.sms_success
        this.data.sms_failed = response.data.sms_failed
      }).catch((error) => {
        console.log(error)
      })
    }
  },

  mounted () {
    let hari = new Date()
    let yyyy = hari.getFullYear().toString()
    let mm = (hari.getMonth() + 1).toString()
    let dd = hari.getDate().toString()

    let mmChars = mm.split('')
    let ddChars = dd.split('')

    this.value.startDate = yyyy + '-' + (mmChars[1] ? mm : '0' + mmChars[0]) + '-' + (ddChars[1] ? dd : '0' + ddChars[0])
    this.value.endDate = yyyy + '-' + (mmChars[1] ? mm : '0' + mmChars[0]) + '-' + (ddChars[1] ? dd : '0' + ddChars[0])

    this.$http({
      url: 'http://5.189.176.218:10900/dashboard',
      method: 'post'
    }).then((response) => {
      this.data.username = response.data.username
      this.data.sms_balance = response.data.sms_balance
      this.data.sms_pending = response.data.sms_pending
      this.data.sms_request = response.data.sms_request
      this.data.sms_success = response.data.sms_success
      this.data.sms_failed = response.data.sms_failed
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    <!-- <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="subtitle">SUMARRY TRANSACTION</p>

          <div class="field is-grouped">
            <p class="control is-expanded" >
              <label class="label">Start Date</label>
              <datepicker :inputClass="{ test: true }" :config="{ wrap: true }" v-model="value.startDate">
                <a class="button" data-toggle><i class="fa fa-calendar"></i></a>
              </datepicker>
              <label class="label">End Date</label>
              <datepicker :inputClass="{ test: true }" :config="{ wrap: true }" v-model="value.endDate">
                <a class="button" data-toggle><i class="fa fa-calendar"></i></a>
              </datepicker>
              <a class="button is-dark" @click="loadData()">Show</a>
            </p>
          </div>
          <div class="field">
          </div>
        </article>
      </div>
    </div> -->
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="subtitle">DAILY RAW DATA SMS</h4>
          <div id="people">
            <v-server-table url="http://5.189.176.218:10900/inbox" :columns="columns" :options="options"></v-server-table>
          </div>
        </article>
      </div>
    </div>
<!--    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="subtitle">RAW DATA SMS</h4>
          <div class="table-responsive">
            <table class="table is-bordered is-striped is-narrow">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Destination</th>
                  <th>Message</th>
                  <th>Time</th>
                  <th>Trx ID</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>No</th>
                  <th>Destination</th>
                  <th>Message</th>
                  <th>Time</th>
                  <th>Trx ID</th>
                </tr>
              </tfoot>
              <tbody>
              <tr v-for="item in items">
                <td>{{ items.in_seq }}</td>
                <td>{{ items.destination }}</td>
                <td>{{ items.message }}</td>
                <td>{{ items.in_time }}</td>
                <td>{{ items.trx_id }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </div>-->
  </div>
</template>

<script>
  import moment from 'moment'
  import Datepicker from 'vue-bulma-datepicker'
  import ServerTable from 'vue-tables-2'

  export default {
    components: {
      Datepicker,
      ServerTable
    },
    data () {
      return {
        columns: ['in_seq', 'destination', 'message', 'in_time', 'trx_id'],
        options: {
          // filterByColumn: true,
          filterable: ['destination', 'message', 'trx_id', 'in_time'],
          // customFilters: ['destination'],
          // dateColumns: ['in_time'],
          // datepickerOptions: {
          //   showDropdowns: true
          // },
          // customFilters: [
          //   {
          //     name: 'formatDate',
          //     callback: function (row) {
          //       console.log(row.in_time)
          //       var value = row.in_time
          //       if (value == null) return ''
          //       var fmt = (typeof fmt === 'undefined') ? 'D MMM YYYY' : fmt
          //       return moment(value, 'YYYY-MM-DD').format(fmt)
          //     }
          //   }
          // ],
          pagination: {
            chunk: 10
          },
          perPage: 25,
          perPageValues: [],
          orderBy: {
            column: 'in_time',
            ascending: 0
          },
          debounce: 1000,
          skin: 'table table-vue table-striped table-bordered table-hover',
          responseAdapter: function (resp) {
            // console.log(resp)
            return {
              data: resp.data,
              count: resp.count
            }
          }
          // templates: {
          //   action: function (h, row) {
          //     return <div class="">
          //       <show-link id={row.id} module=""></show-link>
          //       <edit-link id={row.id} module=""></edit-link>
          //       <delete-link id={row.id} module="" table={this.$refs.listTable}></delete-link>
          //     </div>
          //   }
          // }
        },
        value: {
          startDate: null,
          endDate: null
        },
        items: {
          in_seq: '001',
          destination: '62812345678',
          message: 'test message',
          in_time: '2017-01-01',
          trx_id: '201524585452'
        }
      }
    },

    computed: {
      today () {
        return moment().format('YYYY-MM-DD hh:mm:ss')
      }
    },
    // watch: {
    //   value (newVal, oldVal) {
    //     console.log(newVal, oldVal)
    //   }
    // },
    methods: {
      onLoaded () {
//        this.$http({
//          url: 'http://5.189.176.218:10900/inbox',
//          method: 'post',
//          data: {
//            startDate: this.value.startDate,
//            endDate: this.value.endDate
//          }
//        }).then((response) => {
//          console.log(response)
//          this.data.sms_request = response.data.sms_request
//          this.data.sms_success = response.data.sms_success
//          this.data.sms_failed = response.data.sms_failed
//        }).catch((error) => {
//          console.log(error)
//        })
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
    }
  }
</script>

<style lang="scss">
.table-responsive {
  display: block;
  width: 100%;
  min-height: .01%;
  overflow-x: auto;
}
</style>

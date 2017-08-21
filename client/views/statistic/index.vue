<template>
  <div>
     <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <tabs animation="slide" :only-fade="false">
            <tab-pane label="Daily"selected>
              <div class="field is-horizontal">
                <p class="control is-expanded" >
                  <label class="label">Pick Day</label>
                  <datepicker :inputClass="{ test: true }" :config="{ wrap: true }" v-model="value.startDate">
                    <a class="button" data-toggle><i class="fa fa-calendar"></i></a>
                   <!--<a class="button" data-clear><i class="fa fa-close"></i></a>-->
                  </datepicker>
                  <a class="button is-dark" @click="loadDaily">Show</a>
                </p>
                <h5 class="subtitle has-text-centered">SMS Summary</h5>
                <table class="table is-bordered is-striped is-narroww">
                  <thead class="has-text-centered">
                  <tr>
                    <th style="text-align: center">Hour</th>
                    <th style="text-align: center">Success</th>
                    <th style="text-align: center">Failed</th>
                    <th style="text-align: center">Total SMS</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in items">
                    <td class="has-text-centered">{{ item.count_time }}</td>
                    <td class="has-text-centered">{{ item.success }}</td>
                    <td class="has-text-centered">{{ item.failed }}</td>
                    <td class="has-text-centered">{{ item.request }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </tab-pane>
            <tab-pane label="Monthly">
              <div class="field is-grouped">
                <p class="control is-expanded" >
                  <label class="label">Pick Month</label>
                  <span class="select" >
                    <select v-model="month" name="month">
                      <option v-for="month in months">{{ month }}</option>
                    </select>
                  </span>
                  <a class="button is-dark" @click="loadMonthly">Show</a>
                </p>
                <table class="table is-bordered is-striped is-narroww">
                  <thead class="has-text-centered">
                  <tr>
                    <th style="text-align: center">Day</th>
                    <th style="text-align: center">Success</th>
                    <th style="text-align: center">Failed</th>
                    <th style="text-align: center">Total SMS</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="data in datas">
                    <td class="has-text-centered">{{ data.count_date }}</td>
                    <td class="has-text-centered">{{ data.success }}</td>
                    <td class="has-text-centered">{{ data.failed }}</td>
                    <td class="has-text-centered">{{ data.request }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </tab-pane>
          </tabs>
        </article>
      </div>
    </div>

  <!--   <div class=" tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h4 class="title">SMS GRAPH</h4>
          <div class="block">
            <chart :type="'line'" :data="loadData" :options="options"></chart>
          </div>
        </article>
      </div>
  </div>
 <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">{{ data.sms_request }}</p>
        <p class="subtitle">SMS Request</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">{{ data.sms_success }}</p>
        <p class="subtitle">SMS Success</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">{{ data.sms_failed }}</p>
        <p class="subtitle">SMS Failed</p>
      </article>
    </div>
  </div> -->
  </div>
</template>

<script>
  import Datepicker from 'vue-bulma-datepicker'
  import Chart from 'vue-bulma-chartjs'
  import { Tabs, TabPane } from 'vue-bulma-tabs'

  export default {
    components: {
      Datepicker,
      Chart,
      Tabs,
      TabPane
    },

    data () {
      return {
        items: [{
          count_time: null,
          success: null,
          failed: null,
          request: null
        }],
        datas: [{
          count_date: null,
          success: null,
          failed: null,
          request: null
        }],
        month: null,
        months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
        // ``data: {
        // ``  username: null,
        // ``  sms_request: 0,
        // ``  sms_success: 0,
        // ``  sms_failed: 0
        // ``},
        value: {
          startDate: '2017-24-03',
          endDate: null
        },
        labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        data: [
          [35, 59, 30, 21, 56, 55, 40],
          [28, 48, 10, 29, 88, 27, 45]
        ],
        options: {
          // segmentShowStroke: false,
          tooltips: {
            mode: 'label'
          }
        },
        backgroundColor: [
          'rgba(31, 200, 219, 1)',
          'rgba(151, 155, 18, 1)'
        ],
        series: ['Success', 'Failed']
      }
    },

    // watch: {
    //   value (newVal, oldVal) {
    //     console.log(newVal, oldVal)
    //   }
    // },

    computed: {
      loadData () {
        let data = {
          labels: this.labels
        }
        data.datasets = this.series.map((e, i) => {
          return {
            // data: list[i],
            data: this.data[i],
            // label: labels[i],
            label: this.series[i],
            borderColor: this.backgroundColor[i].replace(/1\)$/, '.5)'),
            pointBackgroundColor: this.backgroundColor[i],
            backgroundColor: this.backgroundColor[i].replace(/1\)$/, '.5)')
          }
        })
        // console.log(data)
        return data
      }
    },

    methods: {
      loadDaily () {
        this.$http({
          url: 'http://5.189.176.218:10900/graph/daily',
          method: 'post',
          data: {
            startDate: this.value.startDate
          }
        }).then((response) => {
          this.labels = response.data.labels
          this.data = response.data.series
        }).catch((error) => {
          console.log(error)
        })
      },
      loadMonthly () {
        let postData = null
        for (let i = 0; i < this.months.length; i++) {
          if (this.month === this.months[i]) {
            postData = i + 1
            break
          }
        }
        if (postData === null) { return }
        this.$http({
          url: 'http://5.189.176.218:10900/graph/monthly',
          method: 'post',
          data: {
            month: postData
          }
        }).then((response) => {
          this.labels = response.data.labels
          this.data = response.data.series
          this.datas = response.data.items
        }).catch((error) => {
          console.log(error)
        })
      }
      //   this.$http({
      //     url: 'http://5.189.176.218:10900/graph/daily',
      //     method: 'post',
      //     data: {
      //       startDate: this.value.startDate
      //     }
      //   }).then((response) => {
      //     let data = {
      //       labels: response.data.labels
      //     }
      //     data.datasets = this.series.map((e, i) => {
      //       return {
      //         data: this.data[i],
      //         label: this.series[i],
      //         borderColor: this.backgroundColor[i].replace(/1\)$/, '.5)'),
      //         pointBackgroundColor: this.backgroundColor[i],
      //         backgroundColor: this.backgroundColor[i].replace(/1\)$/, '.5)')
      //       }
      //     })
      //     return data
      //     // console.log(response)
      //     // this.labels = response.data.labels
      //     // this.series = response.data.series
      //   }).catch((error) => {
      //     console.log(error)
      //   })
    },

    mounted () {
      // setInterval(() => {
      //   // https://vuejs.org/guide/list.html#Mutation-Methods
      //   this.data[0].unshift(this.data[0].pop())
      // }, 10000)
      let hari = new Date()
      let yyyy = hari.getFullYear().toString()
      let mm = (hari.getMonth() + 1).toString()
      let dd = hari.getDate().toString()
      let mmChars = mm.split('')
      let ddChars = dd.split('')
      this.value.startDate = yyyy + '-' + (mmChars[1] ? mm : '0' + mmChars[0]) + '-' + (ddChars[1] ? dd : '0' + ddChars[0])
      this.value.monthDate = yyyy + '-' + (mmChars[1] ? mm : '0' + mmChars[0])
      this.$http({
        url: 'http://5.189.176.218:10900/graph/daily',
        method: 'post',
        data: {
          startDate: this.value.startDate
        }
      }).then((response) => {
        this.labels = response.data.labels
        this.data = response.data.series
        this.items = response.data.items
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>

<style lang="scss" scoped>
</style>

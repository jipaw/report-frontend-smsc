import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'
// import charts from './charts'
// import uifeatures from './uifeatures'
// import components from './components'
// import tables from './tables'

// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  items: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      meta: {
        auth: true,
        icon: 'fa-server',
        link: 'dashboard/index.vue'
      },
      component: lazyLoading('dashboard', true)
    },
    {
      name: 'Statistic',
      path: '/statistic',
      meta: {
        auth: true,
        icon: 'fa-bar-chart',
        link: 'statistic/index.vue'
      },
      component: lazyLoading('statistic', true)
    },
    {
      name: 'Raw Data',
      path: '/raw-data',
      meta: {
        auth: true,
        icon: 'fa-line-chart',
        link: 'raw-data/index.vue'
      },
      component: lazyLoading('raw-data', true)
    }
    // {
    //   name: 'Logout',
    //   path: '/logout',
    //   meta: {
    //     auth: true,
    //     icon: 'fa-power-off',
    //     link: 'logout/index.vue'
    //   },
    //   component: lazyLoading('raw-data', true)
    // }
    // charts,
    // uifeatures,
    // components,
    // tables
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}

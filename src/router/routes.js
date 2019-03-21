const lazyload = (name) => (resolve) => require([`@/pages/${name}`], resolve)

const routerMap = [
    {
        path: '/',
        name: '主页',
        meta: {
            title: '病理大师'
        },
        component: lazyload('userHomePage')
    },
    {
        path: '/blConsultInfo',
        name: '主页',
        meta: {
            title: '病理大师'
        },
        component: lazyload('blConsultInfo')
    },
    {
        path: '/blConsult',
        name: '主页',
        meta: {
            title: '病理大师'
        },
        component: lazyload('blConsult')
    },
    {
        path: '/userCenter',
        name: '个人中心',
        meta: {
            title: '病理大师'
        },
        component: lazyload('userCenter'),
        children: [{
            path: '/userCenter',
            name: '我的会议',
            meta: {
                title: '病理大师-个人中心'
            },
            component: lazyload('user/huiyi')
        },
        {
            path: '/jilu',
            name: '会议记录',
            meta: {
                title: '病理大师-个人中心'
            },
            component: lazyload('user/jilu')
        },
        {
            path: '/shenqing',
            name: '申请会议',
            meta: {
                title: '病理大师-个人中心'
            },
            component: lazyload('user/shenqing')
        },
        {
            path: '/shezhi',
            name: '我的设置',
            meta: {
                title: '病理大师-个人中心'
            },
            component: lazyload('user/shezhi')
        }
    ]
    },
    {
        path: '/payOnline',
        name: '支付',
        meta: {
            title: '病理大师'
        },
        component: lazyload('payOnline')
    },
    {
        path: '/blConsultType',
        name: '申请',
        meta: {
            title: '病理大师'
        },
        component: lazyload('blConsultType')
    },
    {
        path: '/expertInfo',
        name: '医师详情',
        meta: {
            title: '病理大师-医师详情'
        },
        component: lazyload('expertInfo')
    },
    {
        path: '/404',
        name: '404',
        meta: {
            title: '出错啦'
        },
        component: lazyload('errorPage/404')
    }, {
        path: '/401',
        name: '401',
        meta: {
            title: '出错啦'
        },
        component: lazyload('errorPage/401')
    }, {
        path: '/500',
        name: '500',
        meta: {
            title: '出错啦'
        },
        component: lazyload('errorPage/500')
    },
    {
        path: '/second',
        name: 'second',
        meta: {
            title: 'mady'
        },
        component: lazyload('secondPage')
    },
    {
        path: '/homePage',
        name: 'HomePage',
        meta: {
            title: '管理中心'
        },
        component: lazyload('HomePage'),
        children: [{
            path: '/blControl',
            name: '管理中心',
            meta: {
                title: 'mady'
            },
            component: lazyload('admin/demo')
        },
        {
            path: '/priceControl',
            name: '管理中心',
            meta: {
                title: 'mady'
            },
            component: lazyload('admin/price')
        },
        {
            path: '/qualityControl',
            name: '管理中心',
            meta: {
                title: 'mady'
            },
            component: lazyload('admin/quality')
        },
        {
            path: '/doctorsControl',
            name: '管理中心',
            meta: {
                title: 'mady'
            },
            component: lazyload('admin/doctors')
        },
        {
            path: '/hospitalControl',
            name: '管理中心',
            meta: {
                title: 'mady'
            },
            component: lazyload('admin/hospital')
        }
    ]
    },
    // {
    //     path: '/userHomePage',
    //     name: '普通用户',
    //     meta: {
    //         title: '移动会议-个人中心'
    //     },
    //     component: lazyload('userHomePage'),
    //     children: [{
    //         path: '/userHomePage/huiyi',
    //         name: '我的会议',
    //         meta: {
    //             title: '移动会议-个人中心'
    //         },
    //         component: lazyload('user/huiyi')
    //     },
    //     {
    //         path: '/userHomePage/jilu',
    //         name: '会议记录',
    //         meta: {
    //             title: '移动会议-个人中心'
    //         },
    //         component: lazyload('user/jilu')
    //     },
    //     {
    //         path: '/userHomePage/shenqing',
    //         name: '申请会议',
    //         meta: {
    //             title: '移动会议-个人中心'
    //         },
    //         component: lazyload('user/shenqing')
    //     },
    //     {
    //         path: '/userHomePage/shezhi',
    //         name: '我的设置',
    //         meta: {
    //             title: '移动会议-个人中心'
    //         },
    //         component: lazyload('user/shezhi')
    //     }
    // ]
    // },

]

const routes = [...routerMap]

export {
    routes
}
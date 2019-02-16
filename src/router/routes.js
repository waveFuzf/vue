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
            title: '移动会议'
        },
        component: lazyload('homePage'),
        children: [{
            path: '/default',
            name: 'default',
            meta: {
                title: 'mady'
            },
            component: lazyload('admin/default')
        },
        {
            path: '/user',
            name: 'user',
            meta: {
                title: 'mady'
            },
            component: lazyload('admin/userPage')
        },
        {
            path: '/dept',
            name: 'dept',
            meta: {
                title: 'mady'
            },
            component: lazyload('admin/department')
        }
    ]
    },
    {
        path: '/userHomePage',
        name: '普通用户',
        meta: {
            title: '移动会议-个人中心'
        },
        component: lazyload('userHomePage'),
        children: [{
            path: '/userHomePage/huiyi',
            name: '我的会议',
            meta: {
                title: '移动会议-个人中心'
            },
            component: lazyload('user/huiyi')
        },
        {
            path: '/userHomePage/jilu',
            name: '会议记录',
            meta: {
                title: '移动会议-个人中心'
            },
            component: lazyload('user/jilu')
        },
        {
            path: '/userHomePage/shenqing',
            name: '申请会议',
            meta: {
                title: '移动会议-个人中心'
            },
            component: lazyload('user/shenqing')
        },
        {
            path: '/userHomePage/shezhi',
            name: '我的设置',
            meta: {
                title: '移动会议-个人中心'
            },
            component: lazyload('user/shezhi')
        }
    ]
    },

]

const routes = [...routerMap]

export {
    routes
}
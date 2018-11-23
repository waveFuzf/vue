const lazyload = (name) => (resolve) => require([`@/pages/${name}`], resolve)

const routerMap = [
    {
        path: '/',
        name: '登录',
        meta: {
            title: '移动会议'
        },
        component: lazyload('LoginPage')
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
        component: lazyload('HomePage'),
        children: [{
            path: '/first',
            name: 'first',
            meta: {
                title: 'mady'
            },
            component: lazyload('firstPage')
        },]
    }
]

const routes = [...routerMap]

export {
    routes
}
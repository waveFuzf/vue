import Cookies from 'universal-cookie'
const cookies = new Cookies()
let cookieConfig = {}
//if(CookieDomain !== ''){
  cookieConfig = { domain: document.domain, path:'/'} //path:'/',maxAge:365*24*60*60
//}

export function saveCookie(name,value) {
  cookies.set(name, value, cookieConfig)
}

export function getCookie(name) {
  return cookies.get(name)
}

export function removeCookie(name) {
  cookies.remove(name, cookieConfig)
}

export function signOut() {
  cookies.remove('token', cookieConfig)
}

export function isLogin() {
  return !!cookies.get('token')
}

export const cache = {
    setItem(key, value) {
      let data = JSON.stringify(value);
      if (process.env.NODE_ENV == 'production') {
        data = Base64.encode(data);
      }
      sessionStorage.setItem(key, data);
    },
    getItem(key) {
      let data = sessionStorage.getItem(key);
      if (!data) return null;
      if (process.env.NODE_ENV == 'production') {
        data = Base64.decode(data);
      }
      return data ? JSON.parse(data) : null;
    },
    removeItem(key) {
      sessionStorage.removeItem(key)
    }
  }

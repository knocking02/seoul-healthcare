
const util = {
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
    },

    /** 필요한 공통합수 서술 */
}

export default {
    install: (app) => {
        app.config.globalProperties.$util = util
    }
}
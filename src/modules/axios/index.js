import seviceAxios from "./axios";

export default {
    install: (app, options = {}) => {
        app.config.globalProperties.$axios = seviceAxios
    }
 }

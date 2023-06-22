const constant = {
    SITE_NAME: '서울시 헬스케어',
    BOARD: {
        PAGE_SIZE: 10,        
    }
}

export default {
    install: (app) => {
        app.config.globalProperties.$const = constant
    }
}
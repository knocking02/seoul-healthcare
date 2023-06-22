import axios from "axios";

// axios default 설정 추가 (header, timeout...... )
axios.defaults.timeout = 40000

const seviceAxios = {

   process(axiosFunc) {
      // 로딩바 Start

      return new Promise((resolve, reject) => {
         axiosFunc
            .then((data) => {
               resolve(data)
            })
            .catch((error) => {
               // 에러 처리
               reject(error)
            })
            .finally(() => {
               // 로딩바 End
            })
      })
   },

   get(url, param = {}) {
      return this.process(axios.get(url, { params: param }))
   },

   post(url, param = {}) {
      return this.process(axios.post(url, param))
   },

   put(url, param = {}) {
      return this.process(axios.put(url, param))
   },

   delete(url, param = {}) {
      return this.process(axios.delete(url, { params: param }))
   },
   
   // header 정보 추가
   setHeaders() {

   },

   // 토큰 정보 추가
   setTokens() {

   }
}

export default seviceAxios
import axios from 'axios'


export const getAllGames = async (token:string) => {
    try {
        let config = {
          headers: {
            'Accept': '*/*',
            'Authorization': 'Bearer ' + token,
            'Accept-Encoding': 'gzip, deflate, br'
          }
        }
        const response = await axios.get('https://openapi.shl.se/seasons/2022/games.json', config)
        if (response.status !== 200) {
            throw new Error('Response error')
        }
        return await response.data

      } catch (err: any) {
        return Promise.reject(err)
      }
}
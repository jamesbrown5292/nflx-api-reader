import * as apiTrackers from './utils/apiTracker.js'
import axios from 'axios'
import genres from './apiResults/genres.js'
import dotenv from 'dotenv'
dotenv.config()

const {returnThis, apiCallCount, getApiCallCount, incrementApiCallCount} = apiTrackers.apiTrackers


const unogsNGptions = {
    method: 'GET',
    url: 'https://unogsng.p.rapidapi.com/search',
    params: {
      newdate: '1989-02-01',
      genrelist: '',
      type: 'series',
      start_year: '1972',
      orderby: 'title',
      limit: '100',
      subtitle: 'english',
      audio: 'english',
      offset: '0',
      end_year: '2022'
    },
    headers: {
      'x-rapidapi-host': 'unogsng.p.rapidapi.com',
      'x-rapidapi-key': process.env.XRAPIDAPIKEY
    }
};

getApiCallCount().then(res => {
    let apiCalls = res
    console.log("Api calls is:", apiCalls)
}).then(() => {
    let res;
    Object.keys(genres).forEach((idCode, apiCalls) => {
        if (apiCalls < 100) {
            console.log("API CALLS IS", apiCalls)
            console.log("Simulated API Call, write data to file")
            res = 100;
            console.log("res length is", res, "\n query api again")
            if (res == 100) {
                console.log("More results available, query again")
                console.log("Simulating Api Call")
                res--;
            }

        }
        incrementApiCallCount()
    })

})
// console.log("apitracker", apiTrackers)
// console.log("API", returnThis())
//Cycle through the list of genres - loop over object.keys
// exhausting every result in each genre - increase the offset by offset + limit (or if number of results < limit), by offset + number of results
// before moving on to the next one - if number of results < 100, move on to the next genre
// ensure api count does not go over 100 per day 
// with the data from each api call, append it to our series file.

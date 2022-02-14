import * as apiTrackers from './utils/apiTracker.js'
import axios from 'axios'
import genres from './apiResults/genres.js'
import dotenv from 'dotenv'
import * as fs from 'fs';

dotenv.config()

const { returnThis, apiCallCount, getApiCallCount, incrementApiCallCount } = apiTrackers.apiTrackers


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


const asyncTest = async () => {
    for (let i = 0; i < 10; i++) {
        await getApiCallCount()
        // await incrementApiCallCount()
    };

    console.log("Loop finished")
}

// asyncTest()



function waitforme(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}

async function printy() {
    for (let i = 0; i < 10; ++i) {
        await waitforme(1000);
        console.log(i);
    }
    console.log("Loop execution finished!)");
}


// printy();

const readAPICount = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./apiTrackers/apiCalls.txt', 'utf-8', (e, data) => {
            e && reject(e) || resolve(data)
        })
    })
}

const incrementApiCount = async () => {
    await readAPICount().then((res) => {
        console.log("incrementing...")
        console.log("res is...", res)
        const countIncremented = parseInt(res) + 1
        return new Promise((resolve, reject) => {
            fs.writeFile('./apiTrackers/apiCalls.txt', `${countIncremented}`, (e) => {
                e && reject(e) || resolve(countIncremented)
            })
        })
    })
}

// const loopRead = async () => {
//     for (let i = 0; i < 10; ++i) {
//         await readAPICount().then((res) => {
//             console.log("reading count:", res)
//         }).then(() => {
//             console.log("incrementing api count")
//             incrementApiCount()
//         }).then(() => {
//             console.log("i is", i);
//         })
//         // incrementApiCount();
//     }
//     console.log("Loop execution finished!");
// }

// loopRead();



const testLoop = async () => {
    let i = 0;
    for (const key of Object.keys(genres)) {
        if (i < 100) {
            await apiCallCount()
                .then((res) => {
                    console.log("Iteration key", key)
                    incrementApiCallCount(res)
                }).catch((e) => {
                    console.log("Promise error:", e)
                })
            i++;
        }
    }

}
testLoop();

// console.log("apitracker", apiTrackers)
// console.log("API", returnThis())
//Cycle through the list of genres - loop over object.keys
// exhausting every result in each genre - increase the offset by offset + limit (or if number of results < limit), by offset + number of results
// before moving on to the next one - if number of results < 100, move on to the next genre
// ensure api count does not go over 100 per day 
// with the data from each api call, append it to our series file.

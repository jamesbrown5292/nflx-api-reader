import * as fs from 'fs';

const apiTrackers = {

    apiCallCount: function () {
        return new Promise((resolve, reject) => {
            fs.readFile('./apiTrackers/apiCalls.txt', 'utf-8', (e, data) => {
                e && reject(e) || resolve(data)
            })
        })
    },


    getApiCallCount: function () {
        apiTrackers.apiCallCount().then((res) => {
            console.log("REturning:", res)
            return parseInt(res)
        })
    },

    incrementApiCallCount: async function (count) {
        const incrementAPI = parseInt(count) + 1
        new Promise((reject, resolve) => {
            console.log("Writing file with ", incrementAPI)
            fs.writeFile('./apiTrackers/apiCalls.txt', `${incrementAPI}`, (err) => {
                if (err) throw err;
            })
        })


        // let apiCountIncremented = parseInt(res) + 1;
        // fs.writeFile('./apiTrackers/apiCalls.txt', `${apiCountIncremented}`, (e) => {
        //     e && console.error(e) || console.log("written to file", apiCountIncremented)
        // })
    }
}

export { apiTrackers }


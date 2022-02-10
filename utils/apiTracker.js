import * as fs from 'fs';

const apiTrackers = {

    apiCallCount: function() {
        return new Promise((resolve, reject) => {
            fs.readFile('./apiTrackers/apiCalls.txt', 'utf-8', (e, data) => {
                e && reject(e) || resolve(data)
           })
        })
    },

    getApiCallCount: async function() {
        let apiCount = await apiTrackers.apiCallCount()
        return parseInt(apiCount)
    },

    incrementApiCallCount: function() {
        apiTrackers.getApiCallCount().then((res) => {
            let apiCountIncremented = parseInt(res) + 1;
            fs.writeFile('./apiTrackers/apiCalls.txt', `${apiCountIncremented}`, (e) => {
                e && console.error(e)
            })
        })
    }

}

export {apiTrackers}


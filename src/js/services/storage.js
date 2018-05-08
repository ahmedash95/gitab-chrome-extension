import HubStorage from '../storage.js'

export default function Storage() {
    return {
        get: function () {
            return new HubStorage();
        }
    }
}
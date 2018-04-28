/**
 * @Author https://github.com/kamranahmedse
 * Hub Storage to assist in storing the repo information to localStorage
 * and retrieving to populate back
 *
 * @returns {{get: get, set: set, getStorage: getStorage}}
 * @constructor
 */
export default function HubStorage() {

    /**
     * Returns the storage object if available, otherwise
     * a polyfill
     * @returns {*}
     */
    let getStorage = function () {
        if (window.localStorage) {
            return window.localStorage;
        }

        return {
            setItem: function () {
            },
            getItem: function () {
            }
        }
    };


    return {

        get: function(s){
            return getStorage().getItem(s);
        },
        set: function(s,v){
            getStorage().setItem(s,v);
        },
        /**
         * Returns the localStorageObject
         * @returns {{setItem, getItem}}
         */
        getStorage: function () {
            return getStorage();
        }
    };
}
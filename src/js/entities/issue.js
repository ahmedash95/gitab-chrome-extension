export default function Issue() {
    let title,id,url,userName,userImage,state;
    let setTitle = function(s){
        title = s;
    }
    let getTitle = function(){
        return title;
    }
    let setId = function(n){
        id = parseInt(n);
    }
    let getId = function(){
        return id;
    }
    let setUrl = function(s){
        url = s;
    }
    let getUrl = function(){
        return url;
    }
    let setUserName = function(s){
        userName = s;
    }
    let getUserName = function(){
        return userName;
    }
    let setUserImage = function(s){
        userImage = s;
    }
    let getUserImage = function(){
        return userImage;
    }
    let setState = function(s){
        state = s;
    }
    let getState = function(){
        return state;
    }
    let jsonify = function () {
        return {
            title: getTitle(),
            id: getId(),
            url: getUrl(),
            userName: getUserName(),
            userImage: getUserImage(),
            state: getState(),
        }
    }
    return {
        setTitle: setTitle,
        getTitle: getTitle,
        setId: setId,
        getId: getId,
        setUrl: setUrl,
        getUrl: getUrl,
        setUserName: setUserName,
        getUserName: getUserName,
        setUserImage: setUserImage,
        getUserImage: getUserImage,
        setState: setState,
        getState: getState,
        toJson: jsonify
    }
}
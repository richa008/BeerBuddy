beerBuddyApp.factory("dataService", ["$http", function ($http) {
    
    function sendResponse(callBack, response){
        let temp = angular.fromJson(response);
        let dataArray = ((temp.data == null) ? [] : temp.data);
        callBack(dataArray);        
    }

    
    //Makes service call to get all styles   
    let getStyles = function (callBack) {
        $http.get("/getStyles").success(function (response) {
            if(typeof callBack === 'function'){
                sendResponse(callBack, response);
            }
        });
    }
    
    //Makes service call to get beers based on beer name
    let searchBeer = function (searchTxt, callBack) {
        let config = {
            params: {
                searchText: searchTxt
            }
        }
        $http.get("/searchBeer", config).success(function (response) {
            if(typeof callBack === 'function'){
                sendResponse(callBack, response);
            }
        });
    }
    
    //Makes service call to get beers based on style, ABV or IBU
    let getAllBeers = function (params, callBack) {
        let config = {
            params: params
        }
        $http.get("/getAllBeers", config).success(function (response) {
            if(typeof callBack === 'function'){
                sendResponse(callBack, response);
            }
        });
    }
    return {
        getStyles: getStyles,
        searchBeer: searchBeer,
        getAllBeers: getAllBeers
    }
}]);
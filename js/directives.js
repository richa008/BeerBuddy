beerBuddyApp.directive("beerSearch", ["dataService", "$filter", function (dataService, $filter) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'partials/beerSearch.html',
        link: function (scope, element, attr) {
            getStyles();
            scope.styleId = "";
            scope.propertyName = 'name';
            scope.reverse = false;
            
            scope.searchBeer = function () {
                if (scope.searchString) {
                    if (paramsNotEmpty()) {
                        searchBeersByFiltersAndName();
                    }
                    else {
                        searchBeersByName();
                    }
                }
                else {
                    searchBeersByFilters();
                }
            }
            
            scope.sortBy = function (propertyName) {
                scope.reverse = (scope.propertyName === propertyName) ? !scope.reverse : false;
                scope.propertyName = propertyName;
            };

            function getStyles() {
                scope.loading = true;
                dataService.getStyles(function (data) {
                    scope.loading = false;
                    scope.styles = data;
                });
            }

            function getParams() {
                let params = {
                    abvMin: scope.abvMin,
                    abvMax: scope.abvMax,
                    ibuMin: scope.ibuMin,
                    ibuMax: scope.ibuMax,
                    styleId: scope.styleId
                }
                return params;
            }

            function paramsNotEmpty() {
                return (scope.abvMin || scope.abvMax || scope.ibuMin || scope.ibuMax || scope.styleId);
            }

            //Makes 2 api calls and finds the beers that are in common between the 2 lists 
            function searchBeersByFiltersAndName() {
                let params = getParams();
                let searchString = scope.searchString;
                scope.loading = true;
                dataService.getAllBeers(params, function (beerData) {
                    dataService.searchBeer(searchString, function (data) {
                        let mData = data.filter(function(el){
                            return (el.name.indexOf(searchString) !== -1);
                        });
                        mapValues(intersection(beerData, data));
                        scope.sortBy('name');
                        scope.loading = false;
                    });
                });
            }

            function intersection(filterdata, data) {
                let finalResults = [];
                for (let i = 0; i < filterdata.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        if (filterdata[i].id === data[j].id) {
                            finalResults.push(filterdata[i]);
                        }
                    }
                }
                return finalResults
            }

            function searchBeersByName() {
                let searchString = scope.searchString;
                scope.loading = true;
                dataService.searchBeer(searchString, function (data) {
                    let mData = data.filter(function(el){
                        return (el.name.indexOf(searchString) !== -1);
                    });
                    mapValues(mData);
                    scope.sortBy('name');
                    scope.loading = false;
                });
            }

            function searchBeersByFilters() {
                let params = getParams();
                scope.loading = true;
                dataService.getAllBeers(params, function (data) {
                    mapValues(data);
                    scope.sortBy('name');
                    scope.loading = false;
                });
            }

            function mapValues(data) {
                scope.searchResults = data.map(function (el) {
                    el.abv = isNaN(parseFloat(el.abv)) ? "" : parseFloat(el.abv);
                    el.ibu = isNaN(parseFloat(el.ibu)) ? "" : parseFloat(el.ibu);
                    return el;
                });
            }
        }
    }
}]);
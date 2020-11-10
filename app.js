(function (){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
//.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems',FoundItems);
//.filter('total', TotalFilter);

NarrowItDownController.$inject = ['MenuSearchService'];

function NarrowItDownController(MenuSearchService) {
  var ctrl = this;
  ctrl.searchTerm ="";
  ctrl.search = function(){
  var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
  promise.then(function(result){
  ctrl.found  = result
  //console.log(ctrl.found);
  })

};

ctrl.removeItem = function (itemIndex){
  MenuSearchService.removeItem(itemIndex);
}

}

function FoundItems(){
  var ddo ={
    templateUrl: 'listOfItem.html',
    scope: {
      items:'<',
      onRemove:'&'
    }
  };

  return ddo;
}


MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
  var service = this;
  var found=[];
  service.getMatchedMenuItems = function (searchTerm)  {
    //console.log(searchTerm);
    var response = $http({
      method: "GET",
      url:("https://davids-restaurant.herokuapp.com/menu_items.json")
    })
    .then(function(result){
      var i;
      if(searchTerm ==="") {return []}
      // clear the previous list
      found=[];
      for (i =0; i < result.data.menu_items.length; i++){
        if(result.data.menu_items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
          found.push(result.data.menu_items[i])
        }
      }
    return found; }
  )
    return response;
  }

  service.removeItem = function (itemIndex) {
  found.splice(itemIndex, 1);
};

}



})();

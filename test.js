(function(){
    chrome.extension.sendRequest({method: "getUsers"}, function(response) {
        let x = response.status;
        let name = document.querySelectorAll('a');
        for (var j = 0; j < name.length; j++) {
        for (var i = 0; i < x.length; i++) {
            if(name[j] == x[i].url){

                document.querySelector('.username').style.color = x[i].tag;
				document.querySelector('.nc684nl6').style.color = x[i].tag;
                break;  //exit loop since you found the person
            }
         }
        }
      });
})();

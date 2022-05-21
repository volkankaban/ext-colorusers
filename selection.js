let username = "";
var url = "";
let colorPicker = $('.container').css('background-color');
document.getElementById("showbtn").onclick = function(element) {
    chrome.tabs.executeScript({
            code: "window.getSelection().toString();",
        },
        function(selection) {
            document.getElementById("showbtn").innerHTML = selection[0];
            username = selection[0];
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { todo: "getLink", username: username }, res => {
                    url = res.url;
                })
            })
        }
    );
    //current tab.url needs to replace with selected username url "showbtn" but, I can't figure out how to get/trim or replace to save localdatabase.
    /* let queryInfo = {
        active: true,
        currentWindow: true,
    };
    chrome.tabs.query(queryInfo, tabs => {
        let tab = tabs[0];
        url = tab.url;
        //alert(url);
    }); */
    /* let themeButtons = document.querySelectorAll(".theme-buttons");
    themeButtons.forEach(color => {
         color.addEventListener("click", () => {
             alert('life')
           let dataColor = color.getAttribute("data-color");
            alert('hi')
            //Database
            let db = localStorage.getItem("users");
            if (db == null) {
                let users = [];
                let user = { username: username, tag: dataColor, url: url };
                users.push(user);
                localStorage.setItem("users", JSON.stringify(users));
            } else {
                let users = JSON.parse(db);
                let user = { username: username, tag: dataColor, url: url };
                users.push(user);
                localStorage.setItem("users", JSON.stringify(users));
            }
        });
    });*/
};

const filter = (db, usr) => {
    $.each(chDB, function(i, v) {
        $.each(v, function(ii, vv) {
            if (user.url == v['url']) {
                chDB.splice(i, 1);
            }
        });
    });
}

$('.theme-buttons').each(function() {
    $(this).click(function() {
        let color = $(this).data('color');
        let user = { username, url, color };
        let addDB = [];
        let chDB = []
        let getDb = localStorage.getItem('profile');
        if (getDb) {
            getDb = JSON.parse(getDb)
            $.each(getDb, function(i, v) {
                if (v.url) {
                    chDB.push(v)
                }
            });
            if (user.username) {
                $.each(chDB, function(i, v) {
                    $.each(v, function(ii, vv) {
                        if (user.url == v['url']) {
                            chDB.splice(i, 1);
                        }
                    });
                });
                $.each(chDB, function(i, v) {
                    addDB.push(v)
                });
                $.each(addDB, function(i, v) {
                    $.each(v, function(ii, vv) {
                        if (user.url == v['url']) {
                            addDB.splice(i, 1);
                        }
                    });
                });
                addDB.push(user);
                let addDbLen = addDB.length;

                if (addDB[addDbLen - 1].url) {
                    localStorage.setItem('profile', JSON.stringify(addDB));
                    getSelected()
                } else {
                    alert('URL not found')
                }
            }
        } else {
            if (user.username) {
                addDB.push(user)
                localStorage.setItem('profile', JSON.stringify(addDB));
                getSelected();
            }
        }
    });
});

//get matched url's from localstorage to inject dataColor with username elements;
const getSelected = () => {
    let user = localStorage.getItem("profile");
    if(user) {
        let obj = JSON.parse(user);
        obj.forEach(element => {
            const { color, url, username } = element;
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { todo: 'db', username, url, color })
            })
        });
    }
}

window.onload = function(event) {
    this.setTimeout(function() {
        getSelected();
    }, 300)
};

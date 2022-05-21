chrome.runtime.sendMessage({ todo: "showPageAction" })

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.todo == 'default') {
        console.log('first')
    }
    if (request.todo == "getLink") {
        var username = request.username;

        let tag = $("a:contains(" + username + ")")
        let len = tag.length - 2;

            $.each(tag, function(i, v) {
                let sel = $(v).prop('tagName',function(a,b) {
                    if (b.toLowerCase() != 'script' && b.toLowerCase() != 'html' && b.toLowerCase() != 'body') {
                        if (b.toLowerCase() === 'a') {
                            let url = $(this).attr('href');
                            getLink(url)
                        }
                    }
                })
            })

        function getLink(url) {
            let main_dir;
            if (url[0] == '/') {
                let reEm1 = /(.*\/profile\.php\/\?id=\d+).*(__cft__)/;
                let reEm2 = /(.*\/profile\.php\/\?id=\d+).*/;
                let reEm3 = /(.*\/profile\.php\/\?id=\d+)/;
                let reEm4 = /(.*\/.*\?).*(__cft__)/;
                let reEm5 = /(.*\/.*\?)(__cft__)/;
                let emb;
                let ck_dir1 = url.match(reEm1);
                let ck_dir2 = url.match(reEm2);
                let ck_dir3 = url.match(reEm3);
                let ck_dir4 = url.match(reEm4);
                let ck_dir5 = url.match(reEm5);

                if (ck_dir1) {
                    emb = url.match(reEm1)[1];
                } else if (ck_dir2) {
                    emb = url.match(reEm2)[1];
                } else if (ck_dir3) {
                    emb = url.match(reEm3)[1];
                } else if (ck_dir4) {
                    emb = url.match(reEm4)[1];
                } else if (ck_dir5) {
                    emb = url.match(reEm5)[1];
                } else {
                    emb = url.match(/.*/);
                }
                main_dir = window.location.origin + emb;
            } else {
                let com_dir;
                let re = /(https:|http:)+.*\/(.*)\?/;
                let re2 = /((https:|http:)+.*\/.*)/;


                let mat = url.match(re);
                let wit_id;
                if (mat) {

                    if (mat[2] == 'profile.php') {

                        let reP = /((https:|http:)+.*[a-zA-Z0-9]+\/.*\?id\=\d+).*(__cft__)/;
                        let reP1 = /((https:|http:)+.*[a-zA-Z0-9]+\/.*\?id\=\d+)/;

                        wit_id = url.match(reP);
                        wit_id1 = url.match(reP1);
                        let profile;
                        if (wit_id) {
                            profile = wit_id[1]
                        }else {
                            if (reP1) {
                                profile = wit_id1[1];
                            }
                        }
                        com_dir = profile;

                    } else {
                        let reL = /((https:|http:)+.*)\?(__cft__)/; //\/(.*)\?.*(__cft__)
                        let reL1 = /((https:|http:)+.*\/)\?(__cft__)/; //\/(.*)\?.*(__cft__)
                        let reL2 = /((https:|http:)+.*\/)\?/; //\/(.*)\?.*(__cft__)
                        let reL3 = /((https:|http:)+.*\/)/; //\/(.*)\?.*(__cft__)
                        let reL4 = /((https:|http:)+.*)/; //\/(.*)\?.*(__cft__)
                        let reL5 = /((https:|http:)+.*)\?/; //\/(.*)\?.*(__cft__)
                        link = url.match(reL);
                        link1 = url.match(reL1);
                        link2 = url.match(reL2);
                        link3 = url.match(reL3);
                        link3 = url.match(reL3);
                        link4 = url.match(reL4);
                        link5 = url.match(reL5);
                        if (link) {
                            com_dir = link[1];
                        } else if (link1) {
                            com_dir = url.match(reL1)[1]
                        } else if (link2) {
                            com_dir = url.match(reL2)[1]
                        } else if (link3) {
                            com_dir = url.match(reL3)[1]
                        } else if (link5) {
                            com_dir = url.match(reL5)[1]
                        }  else {
                            com_dir = url.match(reL4)[1]
                        }
                    }
                } else {
                    if(re2) {
                        let matss = url.match(re2);
                        com_dir = matss[1];
                    }
                }
                main_dir = com_dir;
            }
            sendResponse({url: main_dir})
        }
    }
    if (request.todo == 'db') {
        const { color, username } = request;

        let tag = $("a:contains(" + username + ")")
        ChildTag(tag)
        /* runtime function with testing username or password */
        function ChildTag(tag) {
            $.each(tag, function(i,v) {
                let ch = v.firstElementChild
                if($(ch).length) {
                    ChildTag($(ch))
                }else {
                    $(v).css('color', color)
                }
            })
        }
       /*  $.each(tag, function(i, v) {
            let sel = $(v).prop('tagName',function(a,b) {
                if (b.toLowerCase() != 'script' && b.toLowerCase() != 'html' && b.toLowerCase() != 'body') {
                    if (b.toLowerCase() === 'a') {
                        if($(this).prop('href')) {
                            if($(this).children()) {
                                let childrens = $(this).children();
                                let countChild = ($(this).children()).length;
                                if (countChild > 0) {
                                    let firstChild = childrens[countChild - 1].firstElementChild;
                                    if (firstChild == null) {
                                        $(v).css('color',color)
                                    }else {
                                        $(firstChild).css('color',color);
                                    }
                                }else if (countChild == 0) {
                                    $(this).css('color',color)
                                }
                            }else {
                                $(this).css('color',color)
                            }
                        }
                    }
                }
            })
        }) */
    }
})

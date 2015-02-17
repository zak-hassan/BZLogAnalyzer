/******************************************************
 * Object used for navigation pagination..
 *
 * @ Name: PaginQueue.
 * @ Author: Zakeria Hassan
 * @ Usage: For organizing pagination
 *
 * ******************************************************/
(function(){

    var app = angular.module("myApp.service",[]);
    app.factory("PaginQueue",[function(){

        return {
            isFirst: function () {
                return (this.getPageNum() == 1);
            },
            isLast: function () {
                return (this.getPageNum() == this.getTotalPages());
            },
            isHead: function () {
                return (Number($("#page a")[0].innerHTML) == this.getPageNum());
            },
            isTail: function () {
                return (Number($("#page a")[$("#page a").length - 1].innerHTML) == this.getPageNum());
            },
            isMin: function () {
                return (Number($("#page a")[0].innerHTML) == 1);
            },
            isMax: function () {
                return (Number($("#page a")[$("#page a").length - 1].innerHTML) == this.getTotalPages());
            },
            getPos: function (num) {
                return ((num % 10) == 0) ? 10 : (num % 10);
            },
            setupNav: function () {
                try {
                    var start = 1;
                    var end = this.getTotalPages();
                    $("#page ul").empty();
                    for (var i = start; i <= end; i++) {
                        this.getPageLink(i);
                    }
                    this.moveCurLine(0);
                }
                catch (err) {
                }
            },
            moveCurLine: function (num) {
                if ($.find("#page a[class='current-page']").length) {
                    $("#page a[class='current-page']")[0].className = "";
                }
                $("#page a")[num].className = "current-page";
            },
            getPageNum: function () {
                return (!colum) ? 1 : colum;
            },
            BackPaginate: function () {
                try {
                    if (this.isFirst()) {
                        throw "Error: You can not go back when in the first position";
                    }
                    var start = (this.getPageNum() - 10) + 1;
                    var end = this.getPageNum();
                    if (this.isHead() && !this.isMin()) {
                        start--;
                        end--;
                    }
                    $("#page ul").empty();
                    for (var i = start; i <= end; i++) {
                        this.getPageLink(i);
                    }
                    // Set current page:
                    this.moveCurLine($("#page a").length - 1);
                } catch (err) {
                }
                $("body").animate({
                    scrollTop: '0px'
                }, 800);
            },
            getPageLink: function (num) {
                $("#page ul").append("<li><a onclick='fetchResults(" + num + ")' >" + num + "</a></li>");

            },
            Paginate: function () {
                try {
                    if (this.isMax()) {
                        throw "This is the last item in the list sorry…";
                    }

                    $("#page ul").empty();
                    var start = this.getPageNum();
                    var end = this.getPageNum() + 10;
                    start++;

                    if (end >= this.getTotalPages()) {
                        end = this.getTotalPages();
                    }

                    for (var i = start; i < end + 1; i++) {
                        this.getPageLink(i);
                    }

                    this.moveCurLine(0);

                } catch (err) {
                }

                //This used to scroll up the page when a user click the button...
                $("body").animate({
                    scrollTop: '0px'
                }, 800);

            },
            getTotalPages: function () {
                return (!totalPages) ? 0 : totalPages;
            },
            pagin_prev: function () {
                try {

                    if (this.isFirst())
                        throw "Can not go previous at the first location";

                    if (this.isHead()) {
                        this.BackPaginate();
                    }
                    colum--;
                    fetchResults(colum);

                } catch (err) {
                }

            },
            pagin_next: function () {

                try {
                    if (this.isLast())    // return ( this.getPageNum() == this.getTotalPages() );
                        throw "End of pages.. can not select next";

                    //TODO: You have to check if you are in the first position and then set the prev to off

                    if (this.isTail()) {
                        this.Paginate()
                    }
                    colum++;
                    fetchResults(colum);

                } catch (err) {
                    return;
                }
            }
        };

    }]);

}());


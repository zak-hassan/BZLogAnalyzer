

var categories={
    company:{
        0:{
            cname:"cibc",
            cnum:"3"
        }, 1:{
            cname:"cantire",
            cnum:"33"
        }, 2:{
            cname:"dell",
            cnum:"3"
            }
    }, positionType:{
        0:{
            pname:"Full-time",
            pnum:"23"
        }, 1:{
            pname:"Part-time",
            pnum:"28"
        }, 2:{
            pname:"On-Call",
            pnum:"49"
        }
    }
};

function main(){
    var compCol=[];
    var posCol=[];
    for( var cat in categories.company){
        var company=categories.company[cat];
        var position=categories.positionType[cat];
        //You got to push the data to CompanySBList UI..
        // ex. $("#CompanySBList").append(posCol.toString());
        compCol.push(genCat( company.cname, company.cnum , "filterByCompany") );
        //You need to push the data to CareerTypeList..
        // ex. $("#CareerTypeList").append(posCol.toString());
        posCol.push( genCat( position.pname, position.pnum , "filterByType") );
    }
    print(compCol.toString());
    print(posCol.toString());
}
//Calling main method:
main();

function genCat(company,num,callback){
var list='<li><a href="#" onclick="'+callback+'(\''+company+'\');">'+company.toUpperCase() +
    "("+num+")</a></li>";
return list;
}

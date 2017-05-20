$( document ).ready(function() {

    $(".add").on("click", function (event) {
        // prevent page from refreshing when form tries to submit itself
        event.preventDefault();

        // Capture user inputs and store them into variables

        var id = $("#itemId").text();
        var style = $("#style-1").text();
        var color = $("#color").text();
        var price = $("#price").text();
        var quantity = $("#qty-1").val().trim();
        var subtotal = parseFloat(price) * parseInt(quantity).toFixed(2);

        // Console log each of the user inputs to confirm we are receiving them
        // console.log(style);
        // console.log(color);
        // console.log(price);
        // console.log(quantity);



        // Output all of the new information into the relevant sections
        var myObj = {
            itemId: id,
            itemNum: style,
            itemColor: color,
            itemPrice: price,
            itemQuantity: quantity,
            subTotal: subtotal
        };


        addObject(myObj);


    });

    $(".erase").on("click", function (event) {
        event.preventDefault();
        clearStorage();
    });


    $(".eraseCurrent").on("click", function (event) {
        event.preventDefault();

        var id = $("#itemId").text();
        var style = $("#style-1").text();
        var color = $("#color").text();
        var price = $("#price").text();
        var quantity = $("#qty-1").val().trim();

        var myObj = {
            itemId: id,
            itemNum: style,
            itemColor: color,
            itemPrice: price,
            itemQuantity: quantity
        };

        deleteObject(myObj);
        displayCart();
    });

});

function addObject(myObj){
    var arr = [];
    //read all info and store in this function
    var str = localStorage.getItem("ItemCart");
    localStorage.setItem('ItemCart', '');
    console.log('str', str);
    var obj = convertToObject(str);
    console.log('obj', obj);
    //if there is an array & it has stuff in it then arr has property of length
    if(obj == null){
        console.log('this is null');
        arr.push(myObj);
        console.log('arr', arr);
        localStorage.setItem("ItemCart", convertToString(arr));
        localStorage.setItem("total", convertToString(calcTotal(arr)));
    }else{
        //obj is an array and we just want to push
        obj.push(myObj);
        localStorage.setItem("ItemCart", convertToString(obj));
        localStorage.setItem("total", convertToString(calcTotal(obj)));
    }

}

function calcTotal(arr){
    var total = 0;
    for(var i= 0; i<arr.length; i++){

        total += arr[i].subTotal;
    }
    //total = total.toFixed(2);
    return total;
}


function deleteObject(itemID){
    console.log('delete', itemID);
    //read all info from local storage
    var str = localStorage.getItem("ItemCart");
    var obj = convertToObject(str);
    console.log('ItemCart', obj);
    //remove object with matching id
    if(obj == null){
        alert('Cart is empty');
    }else{
        var i = 0;
        do {
            if (convertToString(itemID) === convertToString(obj[i])) {
                //if they match then remove object from array
                obj.splice(i, 1);
                console.log('new arr', obj);
                localStorage.setItem("ItemCart", convertToString(obj));
                localStorage.setItem("total", convertToString(calcTotal(obj)));
                break;
            }
            i++;
        }while(i < obj.length);
    }

}

function convertToString(obj){
    return JSON.stringify(obj);
}

function convertToObject(str){
    return JSON.parse(str);
}


// Clear localStorage
function clearStorage() {
    localStorage.clear();
}

function displayCart(){

    //iterate through an array of objects

    var obj = convertToObject(localStorage.getItem("ItemCart"));

    for(var i = 0; i< obj.length; i++){

        console.log(obj[i]);

    }
}


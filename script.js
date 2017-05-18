$(".btn").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();
    console.log('hey');
    // Capture user inputs and store them into variables
    var style = $("#style-1").text();
    var color = $("#color").text();
    var price = $("#price").text();
    var quantity = $("#qty-1").val().trim();

    // Console log each of the user inputs to confirm we are receiving them
    console.log(style);
    console.log(color);
    console.log(price);
    console.log(quantity);

    // Replaces the content in the "recent-member" div

    // Output all of the new information into the relevant sections
   var myObj = {
       itemNum: style,
       itemColor: color,
       itemPrice: price,
       itemQuantity: quantity
    };


    // Store all content into localStorage
    localStorage.setItem("ItemCart", convertToString(myObj));
    localStorage.setItem("total", myObj.itemPrice);

});

// By default display the content from localStorage



function convertToString(obj){
    return JSON.stringify(obj);
}




// Clear localStorage
function clearStorage() {
    localStorage.clear();
}
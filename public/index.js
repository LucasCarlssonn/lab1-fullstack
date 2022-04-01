const test = document.getElementById("test");
const button = document.getElementById("showUsers");

fetch("/api/users", {
    method: "GET",
    headers: {
        "Content-Type" : "application/json"
    }
})
.then(res => res.json())
.then(response => {
    response = JSON.stringify(response)
    console.log("Response is : " + response);
    console.log("type of response is : " + typeof(response));
    document.getElementById("test").innerHTML = response
})


function createTable(){
    
}

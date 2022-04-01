function deleteUser(ID){
    fetch(`/api/users/${ID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    createTable();
}


function createUser(){
    const createName = document.getElementById("create-name");
    const createAge = document.getElementById("create-age");
    const userDetails = {
        name: createName.value,
        age: createAge.value
    };

    fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userDetails)
    })
    .then(res => res.json())
    .then(response => {
        response

    });
}
function updateUser(){
    fetch("/api/users/:id", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userDetails)
    })
    .then(res => res.json())
    .then(response => {
        response

    });
}

// Function found at https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm
function createTable(){
    fetch("/api/users", {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .then(res => res.json())
    .then(response => {
        var col = [];
        for (let i = 0; i < response.length; i++){
            for (let key in response[i]){
                if (key == "_id" || key == "__v"){
                    continue;
                }
                if (col.indexOf(key) === -1){
                    col.push(key);
                }
            }
    
        }
        var table = document.createElement("table");

        var tr = table.insertRow(-1);

        for (let i = 0; i < col.length; i++){
            var th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        for (let i = 0; i < response.length; i++){
            tr = table.insertRow(-1);

            for (let j = 0; j < col.length; j++){
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = response[i][col[j]];
            }
            var tabCell = tr.insertCell(-1);
            var btn = document.createElement("button");
            btn.innerHTML = "delete"
            btn.setAttribute("onclick", `deleteUser(${response[i].ID})`);
            tabCell.appendChild(btn)
        }

        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    })
}



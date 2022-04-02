function deleteUser(ID){
    fetch(`/api/users/${ID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        console.log(res);
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
function updateUser(ID, nameIndex, ageIndex){

    const name = document.getElementById(nameIndex).innerHTML;
    const age = document.getElementById(ageIndex).innerHTML;
    const userUpdate = {
        name: name,
        age: age
    };
    fetch(`/api/users/${ID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userUpdate)
    })
    .then(res => res.json())
    .then(response => {
        //createTable();
    });
}

function showUser(ID){
    fetch(`/api/users/${ID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(response => {
        document.getElementById("showUser").innerHTML = 
        `<h3>Details about user</h3>
        <p>ID: ${response.ID}<br>
        Name: ${response.name}</p><br>
        <p>age: ${response.age}</p><br>
        ${JSON.stringify(response)}`


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
            let th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        for (let i = 0; i < response.length; i++){
            tr = table.insertRow(-1);

            for (let j = 0; j < col.length; j++){
                let tabCell = tr.insertCell(-1);
                tabCell.innerHTML = response[i][col[j]];
                tabCell.setAttribute("contenteditable", "true")
                tabCell.id = `${i}${j}`
            }
            var tabCell = tr.insertCell(-1);
            var delBtn = document.createElement("button");
            delBtn.innerHTML = "delete"
            delBtn.setAttribute("onclick", `deleteUser(${response[i].ID})`);
            tabCell.appendChild(delBtn)

            var tabCell = tr.insertCell(-1);
            var updateBtn = document.createElement("button");
            updateBtn.innerHTML = "update"
            updateBtn.setAttribute("onclick",
             `updateUser(${response[i].ID},
                 "${i}1",
                 "${i}2")`);
            tabCell.appendChild(updateBtn)

            var tabCell = tr.insertCell(-1);
            var detailsBtn = document.createElement("button");
            detailsBtn.innerHTML = "Show Details"
            detailsBtn.setAttribute("onclick",
             `showUser(${response[i].ID})`);
            tabCell.appendChild(detailsBtn)

        }

        let divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    })
}



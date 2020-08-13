
var ref= firebase.database().ref("student");

var tbl=document.getElementById("tbl");


getdata();
function saveDate(){
    var name = document.getElementById("name");
    var roll = document.getElementById("roll");

    var Student = { 
        name: name.value,
        roll: roll.value
    }
   ref.push(Student);

   tbl.innerHTML = "";
   getdata();

 
}


function getdata(){


ref.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
  console.log(childKey);
  console.log(childData);


      var tr=document.createElement("tr");
      var td1=document.createElement("td");
      var td2=document.createElement("td");
      var td3=document.createElement("td");
      var td4=document.createElement("td");
      
      var edit = document.createElement("BUTTON");   
      edit.innerHTML = "EDIT";
      edit.value = childKey;
      edit.className= "btn btn-primary";  
      edit.onclick = function() {
      
        update(edit.value)
      
      };
      var del = document.createElement("BUTTON");   
      del.innerHTML = "Delete";
      del.value=childKey;
      del.className= "btn btn-danger"; 
      del.onclick = function() {
        deletes(del.value)
      };
            tbl.append(tr);
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            td1.append(childData.name);
            td2.append(childData.roll);
            td3.append(edit);
            td4.append(del)
    });
  });


}



function update(id) {
 
  var name = document.getElementById("name");
  var roll = document.getElementById("roll");

  var Student = { 
      name: name.value,
      roll: roll.value
  }
 ref.child(id).update(Student);
   tbl.innerHTML = "";
   getdata();
 

}


 function deletes(id) {
  ref.child(id).remove();
   tbl.innerHTML = "";
   getdata();
    
  
   
 }
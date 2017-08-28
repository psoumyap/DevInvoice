
//Add and Cut LineItems
$(document).ready(function() {  
    $(document).on("keyup", ".amount", calculateSum);
    $("button").click(function() { addrow('lit') });

});


function calculateSum() {

    var sum = 0;
    $(".amount").each(function () {

        if (!isNaN(this.value) && this.value.length != 0) {
            sum += parseFloat(this.value);
        }

    });
    $("#total").val(sum.toFixed(2));
}

function addrow(tableID) {

    var table = document.getElementById(tableID);

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var colCount = table.rows[1].cells.length;

    for (var i = 0; i < colCount; i++) {

        var newcell = row.insertCell(i);

        newcell.innerHTML = table.rows[1].cells[i].innerHTML;
        switch (newcell.childNodes[0].type) {
            case "text":
                newcell.childNodes[0].value = "";
                break;

        }
    }
}


    function saveUser(){
       
       $.ajax({
        
        url:"/api/user",
        type:"post",
        data:$("#the-form").serialize(),
        success:function(res){
            
            window.location.reload();
            return false;
        },
        error:function(xhr, status, error){
            
            console.log(xhr.responseText);
            var err = '';
            $.each(JSON.parse(xhr.responseText) , function(i, item) {
               
                 err +='<li>'+item.msg+'</li>';
            });
            $(".err-area").html(err);    
            return false;
        }
        
       });
    }
    
    function deleteUser(user_id){
    
        $.ajax({
            url:"/api/user/"+user_id,
            type: 'DELETE',
            success: function(res) {
                
                window.location.reload();
                return false;
            },
            error:function(xhr, status, error){
            
                console.log(xhr.responseText);
                alert("Error deleting");
                return false;
            }
        });
    }


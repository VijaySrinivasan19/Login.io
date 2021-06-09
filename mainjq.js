$(document).ready(function () {
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://api.stackexchange.com/2.2/answers?order=desc&sort=activity&site=stackoverflow');
  ourRequest.onload = function () {
    var ourData = JSON.parse(ourRequest.responseText);
    var newData = ourData.items;
    console.log(newData);
    console.log(newData[0].owner.reputation);
    debugger
    //for (var i = 0; i < 30; i++) {
    $("#Table").DataTable({
      data: newData,
      "columns": [
        { "data": "owner.reputation" },
        { "data": "owner.user_id" },
        { "data": "owner.display_name" },
        { "data": "owner.user_type" }
      ]
    });
    //}
  };
  ourRequest.send();

  $("#addrow").on('click', function () {
    var addRep = $("#addrep").val();
    var addUid = $("#adduid").val();
    var addUname = $("#adduname").val();
    if (addRep != "" && addUid != "" & addUname != "") {
      $("#myTable").append("<tr data_rep='" + addRep + "'data_userid='" + addUid + "'data_name='" + addUname + "'><td>" + addRep + "</td><td>" + addUid + "</td><td>" + addUname + "</td><td><button class=edit id=editbtn>Edit</button></td></tr>");

      $("#addrep").val("");
      $("#adduid").val("");
      $("#adduname").val("");
      $("#addrow").attr("data-dismiss", "modal");
    }
    else {
      if (addRep == "") {
        alert("Enter Reputation");
        $("#adduserModal").modal('show');
      }
      else if (addUid == "") {
        alert("Enter Owner Id");
        $("#adduserModal").modal('show');
      }
      else {
        alert("Enter Owner Name");
        $("#adduserModal").modal('show');
      }
    }
  });

  $("#deleterow").on('click', function () {
    var deluserid = $("#deleteid").val();
    if (deluserid != "") {
      $("#Table td").filter(function () {
        return $(this).text() == deluserid;
      }).closest("tr").remove();

      $("#deleteid").val("");
      $("#deleterow").attr("data-dismiss", "modal");
      alert("Deleted Successfully. Click ok to Refresh");
    }
    else {
      alert("Enter valid userid");
      $("#deluserModal").modal('show');
    }
  });

  $('#logout').click(function () {
    parent.location.href = "index.html";
  });

  $('#myTable').on('click', '.edit', function () {
    $("#rowindex").css("display", "none");
    $("#edituserModal").modal('show');
    var rIndex = $(this).closest("tr").index();
    var rep = $(this).parents('tr').attr('id_rep');
    var uid = $(this).parents('tr').attr('id_uid');
    var uname = $(this).parents('tr').attr('id_uname');
    $("#editrep").val(rep);
    $("#edituid").val(uid);
    $("#edituname").val(uname);
    $("#rowindex").text(rIndex);
  });

  $('#btn-update').on('click', function () {
    var newrep = $("#editrep").val();
    var newuid = $("#edituid").val();
    var newuname = $("#edituname").val();
    var new_rIndex = $("#rowindex").text();
    var rowindex = parseInt(new_rIndex) + parseInt(1);

    $('#Table tr:eq(' + rowindex + ')').find('td:eq(0)').text(newrep);
    $('#Table tr:eq(' + rowindex + ')').find('td:eq(1)').text(newuid);
    $('#Table tr:eq(' + rowindex + ')').find('td:eq(2)').text(newuname);

    $('#Table tr:eq(' + rowindex + ')').attr('id_rep', newrep);
    $('#Table tr:eq(' + rowindex + ')').attr('id_uid', newuid);
    $('#Table tr:eq(' + rowindex + ')').attr('id_uname', newuname);
    $("#edituserModal").modal('hide');
  });

});
$(document).ready(function() {
  $('input.deletable').wrap('<span class="deleteicon"></span>').after($('<span>x</span>').click(function() {
      $(this).prev('input').val('').trigger('change').focus();
  }));
});

document.getElementById('button').onclick = function(){
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueDate = document.getElementById('issueDateInput').value;
  var issueLoc = document.getElementById('search_input').value;
  if(issueDesc.trim() == "" || issueDate.trim() == "" || issueLoc.trim() == "")
  {
    alert("Something was left blank.");
  }
  else{
    document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
  }

}


function saveIssue(e)
{
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueDate = document.getElementById('issueDateInput').value;
  var issueLoc = document.getElementById('search_input').value;

  var issueId = chance.guid();
  var issueStatus = 'To Do';
  console.log(issueDesc);

  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    date: issueDate,
    location: issueLoc
  }

  if (localStorage.getItem('issues') == null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
    
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();
  
}



function deleteIssue(id)
{
    var issues = JSON.parse(localStorage.getItem('issues'));

    for(var i = 0; i<issues.length; i++)
    {
        if(issues[i].id == id)
        {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function fetchIssues() {

  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';
  for (var i = issues.length-1; i >= 0; i--) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var date = issues[i].date;
    var loc = issues[i].location;


    issuesList.innerHTML +=   '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-exclamation-sign"></span> ' + severity + '</p>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + dateFormatter(date) + '</p>'+
                              '<p><span class="glyphicon glyphicon-map-marker"></span> ' + loc + '</p>'+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>';

    }
}
function dateFormatter(date) {
  var year = date.substring(0, 4);
  var month = date.substring(5,7);
  var day = date.substring(8,10);
  var hour = date.substring(11,13);
  var minute = date.substring(14,16);
  var monthword;
  var amOrPm;
  var hourParse;
  var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  for(var i = 1; i<=12; i++){
    if(i<=9){
      if(month == ("0"+i))
      {
        monthword = months[i-1];
      }
    }
    else{
      if(month == (""+i))
      {
        monthword = months[i-1];
      }
    }
    
  }
  if(parseInt(hour)>11)
  {
    if(hour == "12")
    {
      amOrPm = "PM";
      hourParse = hour;
    }
    else
    {
      amOrPm = "PM";
      hourParse=""+(parseInt(hour)-12);
    }
    
  }
  else{
    amOrPm="AM";
    hourParse=hour.substring(1,2);
  }
  return monthword+" "+day+", "+year+" at "+hourParse+":"+minute+" "+amOrPm;
  
}
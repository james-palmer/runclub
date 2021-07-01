var accessToken;

fetch("https://www.strava.com/api/v3/oauth/token", {
  body: "client_id=67886&client_secret=a1c26e6e240b2f33f9a7b238beb67e3429064745&grant_type=refresh_token&refresh_token=c3f97d70bc5ec4ea18b5e5774d1e6517787d7a0a",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  method: "POST"
})
.then(response => response.json())
.then(data => accessToken = data.access_token)
.then(console.log(accessToken))
;

var result = document.getElementById('result');
var newTotal = 0;
var target = 900;

distance();

function distance () {
  fetch('https://www.strava.com/api/v3/clubs/953670/activities?access_token=e4c3f1bbcdabad2e158c493aebd0b201ed5557ba&after=1624802400&per_page=200')
  .then(function(resp) {
    resp.json().then(function(data) {
      var p = 0;
      var rc = 0;
   console.log(data);

      data.filter(function(activity) {
        return activity.type === 'Run' 
        // && oneMonthEarlier(activity.start_date)
        ;
      })
      .map(function (activity) {
        p += round(activity.distance, 4);
        rc += 1;
      });

      var meters = parseFloat(p/1000).toFixed(0);
      var progress = (meters/target)*100;
      var runCount = rc;
      console.log(meters);
      console.log(progress);
      document.getElementById('result').innerHTML = meters;
      document.getElementById('progress').style.width = progress+"%";
      document.getElementById('currentProgress').style.width = progress+"%";
      document.getElementById('currentKm').style.width = meters+"km";
      // document.getElementById('runCount').innerHTML = runCount+" runs recorded";
    });
  }).catch(function(err) {
    console.debug(err);
  });
  
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
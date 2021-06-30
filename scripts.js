var result = document.getElementById('result');
var newTotal = 0;
var target = 900;

distance();

function distance () {
  fetch('https://www.strava.com/api/v3/clubs/953670/activities?access_token=9d660904e69951318ffbb91c1875c0f5d28e87c4&after=1624802400')
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
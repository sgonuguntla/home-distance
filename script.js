document.getElementById('distanceForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const origin = document.getElementById('address1').value;
  const destination = document.getElementById('address2').value;
  const apiKey = 'AIzaSyDezuPnA_Oe7j8o4RLH6POgOY-8wSuLkNA';
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`)
    .then(response => response.json())
    .then(data => {
      if (data.rows[0].elements[0].status === 'OK') {
        const distance = data.rows[0].elements[0].distance.text;
        const duration = data.rows[0].elements[0].duration.text;
        document.getElementById('result').innerHTML = 
          `Driving distance: ${distance}<br>Estimated time: ${duration}`;
      } else {
        document.getElementById('result').innerText = 'Unable to find distance.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('result').innerText = 'Error occurred.';
    });
});

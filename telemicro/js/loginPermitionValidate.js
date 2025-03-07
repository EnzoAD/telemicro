const userData = localStorage.getItem("loggedUser");
userData ? window.location.href = 'http://'+ window.location.hostname + '/telemicro/telemicro/home' : '';
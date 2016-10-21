module.exports = {
  async authenticate(user,callback) {
    var url = 'http://localhost:3000/api/authenticate';
    fetch(url, {
         method: "POST",
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ user })
       })
       .then((response) => response.json())
       .then((responseData) => {})
       .done();
  }
}

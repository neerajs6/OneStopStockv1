import axios from 'axios';

const BASE_URI = 'http://172.27.0.2:5000';

const client = axios.create({
 baseURL: BASE_URI,
 json: true
});

class APIClient {
 constructor(accessToken) {
   this.accessToken = '50';
 }

 getStockData(symbol) {
   return this.perform('get', `/stocks/${symbol}`, symbol);
 }

 register(first, last, email, username, password) {
   console.log(username)
   var date = new Date()
    const payload = {
      "first_name":first,
      "last_name":last,
      "email":email,
      "username":username,
      "password":password,
      "registered_date" : date
    }
   return this.perform('post', '/register', payload)
 }

 login(username, password) {
   const payload = {
     "username":username,
     "password":password
   }
   return this.perform('post', '/login', payload)
 }

 getUserInfo(id) {
   const payload = {
     "id":id
   }
   console.log(id)
   return this.perform('get', `/account/${id}`, payload)
 }

 addToFavorites(symbol, id) {
   const payload = {
     "symbol":symbol,
     "id":id
   }
   return this.perform('post', '/add_to_favorites', payload)
 }

 removeFromFavorites(symbol, id) {
  const payload = {
    "symbol":symbol,
    "id":id
  }
  return this.perform('post', '/remove_from_favorites', payload)
}

isFavorite(symbol, id) {
  const payload = {
    "symbol":symbol,
    "id":id
  }
  return this.perform('post', '/is_favorite', payload)
}

getFavorites(id) {
  const payload = {
    "user_id": id
  }
  return this.perform('get', `/get_all_favorites/${id}`, payload)
}

updateField(id, username, field, value) {
  const payload = {
    "id": id,
    "username": username,
    "field": field,
    "value": value
  }
  return this.perform('post', '/update_user_info', payload)
}

deleteAccount(id) {
  const payload = {
    "id":id
  }
  return this.perform('post', '/delete_user', payload)
}




 async perform (method, resource, data) {
   return client({
     method,
     url: resource,
     data,
     headers: {
       Authorization: `Bearer ${this.accessToken}`,
       "Content-Type": "application/json",
       "Access-Control-Allow-Origin": "*"
     }
   }).then(resp => {
     //console.log(resp.data);
     return resp.data ? resp.data : [];
   })
 }
}

export default APIClient;

export  function authHeader(apidata) {
const user = {};
    user.jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjg3YzM4MDNhNTZiNGZhNDM5MmVjZCIsImlhdCI6MTY0ODY0MzU2NiwiZXhwIjoxNjQ4OTAyNzY2fQ.mzH8RasgEJb70TYizOWKdosBD8XBwD3eEMHMEnJ6HBc'
      // for Node.js Express back-end
      return { 'jwt': user.jwt, result: apidata };
  
  }
  
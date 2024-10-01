# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
    "name": "safirs",
    "email": "safirs@gmail.com",
    "password": "password",
    "confPassword": "password"
}
```

Response Body (Success) :

```json
{
    "data": {
        "name": "safirs",
        "email": "safirs@gmail.com"
    }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Username must not blank, ..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
    "email": "safirs@gmail.com",
    "password": "password"
}
```

Response Body (Success) :

```json
{
    "success": true,
    "access_token": "YOUR_ACCESS_TOKEN"
}
```

Response Body (Failed) :

```json
{
  "errors" : "Username or password wrong, ..."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :
- Bearer Token 

Response Body (Success) :

```json
{
    "name" : "safirs",
    "email" : "safirs@gmail.com"
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized, ..."
}
```


## Logout User

Endpoint : DELETE /api/users/current

Response Body (Success) :

```json
{
  "data" : "OK"
}
```

Response Body (Failed) :

```json
{
  "errors" : "Not allow access!"
}
```
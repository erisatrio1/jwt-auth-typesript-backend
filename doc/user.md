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
  "errors" : "'Password and confirm password dont match!"
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
  "errors" : "Email or password is wrong"
}
```

## Refresh Token

Endpoint : GET /api/users/refresh


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
  "errors" : "Not allow access!"
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :
- Bearer Token 

Lifetime access token is 20 second, if expired please get refresh token

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
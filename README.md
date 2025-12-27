node version 22.20.0

### Documentación importante:

1. intalacion, conexion y consultas en CosmosDB en JS/TS:
   [CosmosDB Azure implementacion](https://learn.microsoft.com/en-us/javascript/api/overview/azure/cosmos-readme?view=azure-node-latest)
2. Http trigger, configs, authlevel:
   [Azure Functions HTTP trigger](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cfunctionsv2&pivots=programming-language-typescript)

### Como correr el proyecto:

```json
0. Tener instalado node version 22.
1. Instalar dependencias con `npm install`.
2. Crear el archivo `local.settings.json`.
3. Configura las variables de entorno en tu `local.settings.json`:
    {
        "IsEncrypted": false,
        "Values": {
            "AzureWebJobsStorage": "UseDevelopmentStorage=true",
            "FUNCTIONS_WORKER_RUNTIME": "node",
            "COSMOSDB_ENDPOINT": "https://your-account.documents.azure.com:443/",
            "COSMOSDB_KEY": "your-cosmos-db-primary-key",
            "COSMOSDB_DATABASE_ID": "your-database-name",
            "COSMOSDB_USER_CONTAINER_ID": "user",
            "COSMOSDB_SPACE_CONTAINER_ID": "space",
            "COSMOSDB_CHAIN_CONTAINER_ID": "chain",
            "COSMOSDB_LINK_CONTAINER_ID": "link",
            "JWT_SECRET": "your-jwt-secret-key",
            "JWT_EXPIRES_IN": "1h",
            "JWT_ISSUER": "blurlink",
            "BCRYPT_SALT_ROUNDS": "10"
        }
    }
4. Correr el proyecto en modo debug con F5.
```

---

### Estructura de CosmosDB - Partition Keys

| Container | Partition Key | Descripción                           |
| --------- | ------------- | ------------------------------------- |
| `user`    | `/id`         | Identificador único del usuario       |
| `space`   | `/userId`     | Agrupa todos los espacios por usuario |
| `chain`   | `/spaceId`    | Agrupa todas las cadenas por espacio  |
| `link`    | `/chainId`    | Agrupa todos los enlaces por cadena   |

> **Nota**: Este diseño permite consultas eficientes dentro de cada partición. Por ejemplo buscar todos los `links` de un `chain` especifico o buscar todos los `chain` de un `space` son rapidos y baratos. Si buscas todos los `chain` por `userId` te saldria caro debido a que este no es su partition key.

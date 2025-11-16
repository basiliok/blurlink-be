node version 22.20.0

### Documentación importante:

1. intalacion, conexion y consultas en CosmosDB en JS/TS:
   [CosmosDB Azure implementacion](https://learn.microsoft.com/en-us/javascript/api/overview/azure/cosmos-readme?view=azure-node-latest)
2. Http trigger, configs, authlevel:
   [Azure Functions HTTP trigger](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cfunctionsv2&pivots=programming-language-typescript)

### Como correr el proyecto:

0. Tener instalado node version 22.

1. Instalar dependencias con `npm install`.

2. Crear el archivo `local.settings.json`.

3. Configura las variables de entorno en tu `local.settings.json`:

```json
{
    "IsEncrypted": false,
    "Values": {
        "AzureWebJobsStorage": "UseDevelopmentStorage=true",
        "FUNCTIONS_WORKER_RUNTIME": "node",
        "COSMOSDB_ENDPOINT": "https://your-account.documents.azure.com:443/",
        "COSMOSDB_KEY": "your-cosmos-db-primary-key",
        "COSMOSDB_DATABASE_ID": "your-database-name",
        "COSMOSDB_CHAIN_CONTAINER_ID": "your-container-name"
    }
}
```

4. Correr el proyecto en modo debug con F5.

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416")

  // remove
  collection.schema.removeField("dfoeyosr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r5mqsd8a",
    "name": "done",
    "type": "bool",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dfoeyosr",
    "name": "status",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "new",
        "pending",
        "done"
      ]
    }
  }))

  // remove
  collection.schema.removeField("r5mqsd8a")

  return dao.saveCollection(collection)
})

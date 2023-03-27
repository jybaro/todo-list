migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416")

  // remove
  collection.schema.removeField("ncojnnan")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sxpsscg4",
    "name": "owner",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "name",
        "email"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ncojnnan",
    "name": "owner",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("sxpsscg4")

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r5mqsd8a",
    "name": "done",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "enfblaut",
    "name": "deleted",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r5mqsd8a",
    "name": "done",
    "type": "bool",
    "required": true,
    "unique": false,
    "options": {}
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "enfblaut",
    "name": "deleted",
    "type": "bool",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})

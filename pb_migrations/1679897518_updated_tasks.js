migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416")

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416")

  // remove
  collection.schema.removeField("enfblaut")

  return dao.saveCollection(collection)
})

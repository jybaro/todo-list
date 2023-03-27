migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gf9wrjys",
    "name": "owner",
    "type": "email",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416")

  // remove
  collection.schema.removeField("gf9wrjys")

  return dao.saveCollection(collection)
})

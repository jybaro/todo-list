migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416")

  // remove
  collection.schema.removeField("rvcf2y1k")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jmmxphby",
    "name": "zindex",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rvcf2y1k",
    "name": "zindex",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // remove
  collection.schema.removeField("jmmxphby")

  return dao.saveCollection(collection)
})

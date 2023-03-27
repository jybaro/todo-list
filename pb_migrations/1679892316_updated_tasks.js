migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416")

  collection.createRule = "owner = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416")

  collection.createRule = null

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416")

  collection.listRule = "owner.id = @request.data.owner"
  collection.viewRule = "owner.id = @request.data.owner"
  collection.updateRule = "owner.id = @request.data.owner"
  collection.deleteRule = "owner.id = @request.data.owner"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416")

  collection.listRule = null
  collection.viewRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})

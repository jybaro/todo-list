migrate((db) => {
  const collection = new Collection({
    "id": "tz0bn2tqlzxj416",
    "created": "2023-03-27 02:52:06.526Z",
    "updated": "2023-03-27 02:52:06.526Z",
    "name": "reminders",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "wtyo0x95",
        "name": "description",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "9q3txwkn",
        "name": "width",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "bfxk7vqy",
        "name": "height",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "rsvkhllq",
        "name": "top",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "skk4bujt",
        "name": "left",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
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
      },
      {
        "system": false,
        "id": "ah8oj6ms",
        "name": "color",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("tz0bn2tqlzxj416");

  return dao.deleteCollection(collection);
})

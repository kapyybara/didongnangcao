const yaml = require('yaml');
const fs = require('fs');

const dir = './snapshot';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    fs.mkdirSync(dir + '/collections');
    fs.mkdirSync(dir + '/fields');
}

const snapShotFile = fs.readFileSync('./snapshot.yaml', 'utf8');

const parsed = yaml.parse(snapShotFile);

const collections = parsed.collections;

const fields = parsed.fields;

const relations = parsed.relations;

collections.forEach(function (item) {
    // Create file content for each collection
    const collectionName = item.collection;

    // Save collections to folder.
    fs.writeFileSync(dir + '/collections/' + collectionName + '.yaml', yaml.stringify(item));

});

const fieldMap = new Map();

fields.forEach(function (field) {
    if (!fieldMap.has(field.collection)) {
        fieldMap.set(field.collection, [field]);
    } else {
        fieldMap.get(field.collection).push(field);
    }
});

fieldMap.forEach(function (value, key) {
    fs.writeFileSync(dir + '/fields/' + key + '.yaml', yaml.stringify(value));
})
// Store relations to relations.yml
fs.writeFileSync(dir + '/relations.yaml', yaml.stringify(relations));


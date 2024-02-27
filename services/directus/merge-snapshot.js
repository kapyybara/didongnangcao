const yaml = require('yaml');
const fs = require('fs');

const dir = './snapshot';

const snapShotObj = {
    version: 1,
    directus: '10.8.3',
    vendor: 'postgres',
    collections: [],
    fields: [],
    relations: []
}

if (fs.existsSync(dir)) {

    fs.readdirSync(dir + '/' + 'collections').forEach(file => {
        const collection = fs.readFileSync(dir + '/collections/' + file, 'utf8');

        const parsedCollection = yaml.parse(collection);

        snapShotObj.collections.push(parsedCollection);
    });


    fs.readdirSync(dir + '/' + 'fields').forEach(file => {
        const field = fs.readFileSync(dir + '/fields/' + file, 'utf8');

        const parsedFields = yaml.parse(field);

        snapShotObj.fields = snapShotObj.fields.concat(parsedFields);
    });

    const relations = fs.readFileSync(dir + '/' + 'relations.yaml', 'utf-8');

    const parsedRelations = yaml.parse(relations);

    snapShotObj.relations = parsedRelations;

    const doc = new yaml.Document();

    doc.contents = snapShotObj;

    fs.writeFileSync('./merged-snapshot.yaml', doc.toString());

}


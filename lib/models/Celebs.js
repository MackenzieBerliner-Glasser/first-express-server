const db = require('../mongo-connector');
const { ObjectId } = require('mongodb');

class Celebs {

    create(name, job) {
        return db('celebs')
            .then(collection => {
                return collection.insertOne({
                    name,
                    job
                });
            })
            .then(result => result.ops[0]);
    }

    get(id) {
        return db('celebs')
            .then(collection => {
                return collection.findOne({ _id: ObjectId(id) });
            });
    }
    
    getAll() {
        return db('celebs')
            .then(collection => {
                return collection.find();
            })
            .then(celebsDocObject => celebsDocObject.toArray());
    }

    update(id, name) {
        return db('celebs')
            .then(collection => {
                return collection.findOneAndUpdate(
                    { _id: ObjectId(id) }, 
                    { $set: name }, 
                    { returnOriginal: false }
                );
            })
            .then(res => res.value);
            
    }

    delete(id) {
        return db('celebs')
            .then(collection => {
                return collection.deleteOne(
                    { _id: ObjectId(id) }
                );
            })
            .then(result => {
                if(result.deletedCount > 0) return { removed: true };
                else return { removed: false };
            });
    }   

    drop() {
        return db('celebs').then(collection => collection.deleteMany());
    }

}

module.exports = new Celebs();

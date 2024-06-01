function loadEducation() {
    const bulkInsert = db.education.initializeUnorderedBulkOp();
    // Get all Documents in 'full' Collection
    const documents = db.data.find({});

    // Process each document
    documents.forEach(function(doc) {
        const element = {
            education: doc.education,
            education_num: doc.education_num
        };
        // Upsert into education Document
        bulkInsert.find(element).upsert().replaceOne(element);
    });
    bulkInsert.execute();
    return true;
}

function loadOccupation() {
    const bulkInsert = db.occupation.initializeUnorderedBulkOp();

    const documents = db.data.find({});

    // Process each document
    documents.forEach(function(doc) {
        const element = {
            occupation: doc.occupation,
            workclass: doc.workclass,
            hours_per_week: doc.hours_per_week
        };
        // Upsert into education Document
        bulkInsert.find(element).upsert().replaceOne(element);
    });
    bulkInsert.execute();
    return true;
}

function loadRelationship() {
    const bulkInsert = db.relationship.initializeUnorderedBulkOp();
    // Get all Documents in 'full' Collection
    const documents = db.data.find({});

    // Process each document
    documents.forEach(function(doc) {
        const element = {
            relationship: doc.relationship,
            marital_status: doc.marital_status
        };
        // Upsert into education Document
        bulkInsert.find(element).upsert().replaceOne(element);
    });
    bulkInsert.execute();
    return true;
}


function loadFinance() {
    const bulkInsert = db.finance.initializeUnorderedBulkOp();
    // Get all Documents in 'full' Collection
    const documents = db.data.find({});

    // Process each document
    documents.forEach(function(doc) {
        const element = {
            total: doc.total,
            capital_gain: doc.capital_gain,
            capital_loss: doc.capital_loss,
            income_bracket: doc.income_bracket
        };
        // Upsert into education Document
        bulkInsert.find(element).upsert().replaceOne(element);
    });
    bulkInsert.execute();
    return true;
}


function loadUsers() {
    const bulkInsert = db.user.initializeUnorderedBulkOp();
    // Get all Documents in 'full' Collection
    const documents = db.data.find({});

    // Process each document
    documents.forEach(function(doc) {
        const element = {
            age: doc.age,
            gender: doc.gender,
            native_country: doc.native_country,
            race: doc.race,
        };

        // Get education PK
        const education = db.education.findOne({
            education: doc.education
        });
        const occupation = db.occupation.findOne({
            occupation: doc.occupation
        });
        const finance = db.finance.findOne({
            total: doc.total
        });
        const relationship = db.relationship.findOne({
            relationship: doc.relationship
        });
        element.education_id = education._id;
        element.occupation_id = occupation._id;
        element.relationship_id = relationship._id;
        element.finance_id = finance._id;

        // Upsert into user collection
        bulkInsert.find(element).upsert().replaceOne(element);
    });

    bulkInsert.execute();
    return true;
}
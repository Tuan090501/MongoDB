db.user.aggregate(
    [{
            $match: { native_country: 'United-States' }
        },
        {
            $lookup: {
                from: 'finance',
                localField: 'finance_id',
                foreignField: '_id',
                as: 'finance_info'
            }
        },
        {
            $unwind: '$finance_info'
        },
        {
            $group: {
                _id: '$native_country',
                result: { $sum: '$finance_info.total' }
            }
        },
        {
            $project: {
                _id: 0,
                result: 1
            }
        }
    ]

)
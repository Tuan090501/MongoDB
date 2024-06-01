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
            $match: { 'finance_info.income_bracket': { $eq: '>50K' } }
        },
        {
            $count: 'result'
        }
    ]

)
db.user.aggregate(
    [{
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
            $match: { 'finance_info.income_bracket': '<=50K' }
        },
        {
            $lookup: {
                from: 'occupation',
                localField: 'occupation_id',
                foreignField: '_id',
                as: 'occupation_info'
            }
        },
        {
            $unwind: '$occupation_info'
        },
        {
            $group: {
                _id: null,
                result: { $sum: '$occupation_info.hours_per_week' }
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
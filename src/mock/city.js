import Mock from "mockjs";
const Random = Mock.Random;

Mock.mock("/api/location",{
    "status": 200,
    "locationList|5":[
        {
            "value|1":["beijing","shanghai","nanjing","tianjin","changsha"] ,
            "label": Random.province(),
            "children|10":[
                {
                    "value|1":["beijing","shanghai","nanjing","tianjin","changsha"] ,
                    "label": Random.city(),
                    "children|15":[
                        {
                            "value|1":["beijing","shanghai","nanjing","tianjin","changsha"] ,
                            "label": Random.county(),
                        }
                    ]
                }
            ]
        }
    ]
});
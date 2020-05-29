import Mock from "mockjs";

Mock.mock("/api/index",{
    "status":200,
    "list|10":[
        {
            "name|+1":["John Brown","Jim Green","Joe Black","Jon Snow"],
            "age|18-50":45,
            "address":Mock.Random.region(),
            "date":Mock.Random.date()
        }
    ]
});
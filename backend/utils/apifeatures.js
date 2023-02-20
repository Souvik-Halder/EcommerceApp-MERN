class Apifeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr
    }
    //search feature
    search(){
        const keyword=this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options:"i"
            }
        }:{};

        this.query=this.query.find({...keyword})
        return this
    }
    //filter feature
    filter(){
        const queryCopy={...this.queryStr}//here we are using spread operator because in js the reference of the object is passed but we
        //need to pass the value here because in case of the reference if we change the value of the actual object then the value of the copy also be changed and we don't want that
        //Removing from that 
        
        const removeFields=['keyword','page',"limit"];
        removeFields.forEach(key=> delete queryCopy[key])
        //filter for the price
    // console.log(queryCopy)
        let queryStr=JSON.stringify(queryCopy);
        //putting the $ sign before the gt gte ,lt
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`)
       
        // console.log(queryStr)
        this.query=this.query.find(JSON.parse(queryStr));
    
        return this
    }
    pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page)||1; 
        const skip= resultPerPage * (currentPage-1)

        this.query=this.query.limit(resultPerPage).skip(skip)//This .limit tells about how much product we need to display and .skip tells about how much product we need to skip
        
        return this
    }
}

module.exports=Apifeatures

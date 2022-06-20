const middleware = {
    validate:(req,res,next)=>{
        console.log(req.body)
        console.log(req.file)
        const a = ['lastname','firstname','classname','age'];
        let errors = [];
        let check = false;
        if(!req.body) return res.json({errorMessage: "empty value  in form exists"});
        if(!req.file && !req.body.avatar ) return res.json({errorMessage: "empty value  in file exists"});
        a.forEach( v =>{
                if(!req.body[v]){ 
                    errors.push(v+'- not found');
                    check = true;
                }
        })
        if(!req.body.avatar){
            if(!req.file.mimetype.startsWith('image')){
                    errors.push("not type file image");
                    check=true;
            }
        }
        if(check) return res.json({errorMessage: errors});
        next();
    }
}
module.exports = middleware
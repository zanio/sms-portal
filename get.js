window.addEventListener('load',function(){
    const url = 'https://lab.alphsms.com:8000/sendername/registername';

    const getUser = (endpoint, option)=>{
        return new Promise((resolve, reject)=>{
            if(window.fetch){
                fetch(endpoint,option)
                .then(res=> resolve(res))
                .catch(err=>reject(err));
            }
    
        });
    };

    const getValues = (id)=>{
        return document.querySelector(id).value
    }

    const checkNewLine = (values)=>{
        let arr;
        arr = values.split('\n').join(',');
        return arr
    }
    document.querySelector('#submit').addEventListener('click',function(){
        let values;
        values = getValues('#names');  
        if(!values){
            document.querySelector('.error').innerHTML='Please add users name';
        } else{
            const listNames = checkNewLine(values)         
            const db = JSON.parse(localStorage.getItem('user'))
            const newBody = JSON.parse(db.body);
            newBody.sender_name = listNames;
            db.body = JSON.stringify(newBody);
            console.log(db, values)
            getUser(url,db).then(res => res.json()).then(res => console.log(res));
            //location.href= 'flow-3.html'
        }
        
    });

})
(function(){
    const url = 'https://lab.alphsms.com:8000/sendername/getname';
    const getUser = (endpoint, option)=>{
        return new Promise((resolve, reject)=>{
            if(window.fetch){
                fetch(endpoint,option)
                .then(res=> resolve(res))
                .catch(err=>reject(err));
            }
    
        });
    };
   

    const extractData = (locationsearch) => {
        if(locationsearch){
            const searchsplit = locationsearch.split('&');
            const email = searchsplit[1].split('email=')[1]
            const token = searchsplit[0].split('?token=')[1]
    
            const body ={};
            body['email'] =email;
            body['token'] =token;
            const data = {
                method:'POST',
                body:JSON.stringify(body)
            }
            localStorage.setItem('user',JSON.stringify(data));
            const db = JSON.parse(localStorage.getItem('user'))
           return data;
        }
        
    }

    getUser(url,extractData(location.search))
    .then(res=>res.json())
    .then(res=>{
        if(res.err){
            document.querySelector('.name').innerHTML = `${res.error}`
        }
        const username = res.success[0].firstname
        document.querySelector('.name').innerHTML = `Hello ${username}`
        console.log(res)
    })
    .catch(err=>err)
    console.log(extractData(location.search));

   


        
})();
    

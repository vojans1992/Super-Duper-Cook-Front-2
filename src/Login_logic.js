


export const checkUser = (roles) => {
    const user = localStorage.getItem('user'); //preuzmemo korisnika iz localStorage/a, ovo nam je string moramo parsirati podake kako bi dobili role korisnika
    let user_obj; //
    if(user){
        user_obj=JSON.parse(user);
    }
    console.log(user);
    if(!user || user === undefined){
        //niko nije ulogovan i ne sme da se otvori odredjena stranica
        const err = {
            cause: "login",
            message: "Korisnik nije ulogovan"
        };
        throw err;
    }else if(roles){
        
        if(!roles.includes(user_obj.role)){
            const err = {
                cause: 'security',
                message: 'Korisnik nema pravo pristupa'
            }
            throw err;
        }
    }

    //ako je sve ok vratimo ulogovanog korisnika
    return user_obj;
}
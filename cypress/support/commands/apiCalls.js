/// <reference types="cypress"/>

class callRequest{

    getUsersPage(){
        return cy.request("GET","/users?page=2");
    }

    getUsers(id){
        return cy.request("GET","/users/"+id);
    }

    postUsers(name, leader){
        return cy.request("POST","/users", { "name": name, "job": leader});
    }
    
    postRegister(testemail){
        return cy.request({ method: "POST", url: "/register", failOnStatusCode: false,body:{ email : testemail}} );
    }
    
}
export default callRequest
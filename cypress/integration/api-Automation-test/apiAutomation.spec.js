/// <reference types="cypress" />
import callRequest from '../../support/commands/apiCalls'
import testData from '../../fixtures/testData.json'

describe('API Automation Test', () => {
  const request = new callRequest();
  let userID

  it('Create test for the endpoint “GET, LIST USERS”. ', () => {
    request.getUsersPage().should((response)=>{
      expect(response.status).to.eq(200);
      expect(response.body.page).to.eq(2);
      expect(response.body.per_page).to.eq(6);
      expect(response.body.data).to.have.length(6);
      userID = response.body.data.find(item => item.id === 11);
    });
  });

  it('Create test for the endpoint “GET, SINGLE USER” ', () => {
    request.getUsers(userID.id).should((response)=>{
      expect(response.status).to.eq(200);
      expect(response.body.data.id).to.eq(userID.id);
      expect(response.body.data.email).to.equal(userID.email);
      expect(response.body.data.first_name).to.equal(userID.first_name);
      expect(response.body.data.first_name).to.equal(userID.first_name);
      expect(response.body.data.last_name).to.equal(userID.last_name);
      expect(response.body.data.avatar).to.equal(userID.avatar);
    });  
  });

  it('Create test for the endpoint “POST, CREATE” ', () => {
    request.postUsers(testData.test1.name,testData.test1.job).should((response)=>{
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("name").and.have.string(testData.test1.name);
      expect(response.body).to.have.property("job").and.have.string(testData.test1.job);
    });  
  });

  it('Create test for the endpoint “POST, REGISTER – UNSUCCESSFUL”', () => {
    request.postRegister(testData.test2.email).should((response)=>{
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error").and.have.string("Missing password");
    });
  });

  it('Create a test that will interact with 2 endpoints', () => {
    request.getUsersPage().then((response)=>{
      userID = response.body.data.find(item => item.id === 11)
      request.getUsers(userID.id).should((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body.data.id).to.eq(userID.id);
        expect(response.body.data.email).to.equal(userID.email);
        expect(response.body.data.first_name).to.equal(userID.first_name);
        expect(response.body.data.first_name).to.equal(userID.first_name);
        expect(response.body.data.last_name).to.equal(userID.last_name);
        expect(response.body.data.avatar).to.equal(userID.avatar);
      });
    });
  });
});

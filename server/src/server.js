const http=require('http');
const app=require('./app');
const request=require('supertest');
const except=require('chai').expect;
const assert=require('assert');
const PORT=process.env.PORT || 8000
const {loadPlanetsData}=require('./models/planets.model')
const server=http.createServer(app)

async function startServer(){
    await loadPlanetsData()
    server.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}`)
    })
}
startServer()

describe("TEST ON /GET PLANETS",()=>{
    it('should return status 200',async()=>{
      const response=await request(app).get("/planets");
      console.log(response.statusCode)
      // assert.equal(response.status,200)
      except(response.status).to.equal(200)
    })
    it('should return json',async()=>{
      const response=await request(app).get('/planets')
      except(response.type).to.equal('application/json')
    })
  })
  const data={
    mission:'Kepler Exploration X',
    rocket:"Explorer IS1",
    launchDate:"December 27, 2030",
    target:"Kepler-442 b"
  }
  describe("TEST ON /GET LAUNCHES",()=>{
    it("should return status 200",async()=>{
      const response=await request(app).get("/launches")
      except(response.status).to.equal(200)
    })
    it("should return json",async()=>{
      const response=await request(app).get("/launches")
      except(response.type).to.equal('application/json')
    })
    it("should have length at least 1",async()=>{
      const response=await request(app).get("/launches")
      console.log("Body length: ",response.body.length)
      except(response.body.length).to.be.at.least(1)
    })
  })
  describe("TEST ON /POST LAUNCHES",()=>{
    it("should return status 201",async()=>{
      const response=await request(app)
      .post("/launches")
      .send(data) //send data to server
      .set('Accept','application/json')
      console.log("POST response: ",response.body)
      except(response.status).to.equal(201)
    })
    it("should return json",async()=>{
      const response=await request(app)
      .post("/launches")
      .send(data)
      .set('Accept','application/json')
      except(response.type).to.equal('application/json')
    })
    it("should have property success",async()=>{
      const response=await request(app)
      .post("/launches")
      .send(data)
      .set('Accept','application/json')
      //Kiểm tra nếu response có prop là success
      except(response.body).to.have.property('success')
    })
    it("should have response property mission with typeof String",async()=>{
      const response=await request(app).post("/launches")
      .send(data).set('Accept','application/json')
      except(response.body.mission).to.be.a('string')
      
    })
  })
  //flightNumber thường bắt đầu từ 100, ta thử giá trị flightNumber nhỏ hơn 100
  //Giờ thử với 100
  describe('TEST ON /DELETE LAUNCHES',()=>{
    it('should return status 200',async()=>{
      const response=await request(app).delete("/launches/100")
      except(response.status).to.equal(200)
    })  
    //Kiểm tra reponse body trả về có prop success không
    it('should have property success',async()=>{
      const response=await request(app).delete("/launches/100")
      console.log(response.body)
      except(response.body).to.have.property('success')
    })
    //Success phải là false
    it('should have property success with value false',async()=>{
      const response=await request(app).delete("/launches/100")
      except(response.body.success).to.equal(false)
    })
  })
  
  //Vậy là mình đã test hết các ENDPOINT lẫn các method GET.POST.DELETE =12 bộ testcase
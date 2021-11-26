var connection = new require("./kafka/Connection");
//topics files
//var signin = require('./services/signin.js');
//var Books = require('./services/books.js');
// var JobPostingsData = require("./services/employer/JobPostingsData");

// const companyReviews = require('./services/company/getreviews')

const { mongoConnectionURL } = require("./database/mongoConnection");
const mongoose = require("mongoose");

const mongoDbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 100,
};

mongoose.connect(mongoConnectionURL, mongoDbOptions, (err, result) => {
  if (err) {
    console.log("Error while connecting to mongoDB : " + err);
  } else {
    console.log("Connected to Mongo DB!");
  }
});

const { initDBConnection } = require("./database/mysqlConnection");
initDBConnection().then(async () => {
  require("./models/CompanyReviewsModel");
  require("./models/CompanyDetailsModel");
  require("./models/LoginDetailsModel");
  require("./models/MessagesModel");
  await global.DB.sync({ alter: false });
});

const companyReviews = require('./services/company/getreviews')
const update_featured_review_status = require('./services/company/update_featured_review_status')
const get_featured_reviews = require('./services/company/get_featured_reviews')
const remove_featured_review = require('./services/employer/remove_featured_review')
const update_employer = require('./services/employer/update_employer_details')
const searchQuery = require('./services/jobSeeker/searchQuery')
const companyDetails = require('./services/company/getCompanyDetails');
const CreateJobPosting = require('./services/employer/createJobPosting');
const UpdateJobPosting = require('./services/employer/updateJobPosting');
const JobPostingData = require('./services/employer/getJobPosting');
const CompanyJobPostings = require('./services/company/getJobPostings');
const CreateJobApplication = require('./services/jobSeeker/createJobApplication');
const UpdateApplicationStatus = require('./services/employer/updateApplicationStatus');
const JobApplicationsData = require('./services/employer/getJobApplications');

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", async function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    await fname.handle_request(data.data, function (err, res) {
      console.log("after handle" );
      console.log(res)
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}

handleTopicRequest("company.getreviews", companyReviews);
handleTopicRequest("update_featured_review_status", update_featured_review_status);
handleTopicRequest("get_featured_reviews", get_featured_reviews);
handleTopicRequest("remove_featured_review", remove_featured_review);
handleTopicRequest("update_employer_details", update_employer);
handleTopicRequest("search", searchQuery)
handleTopicRequest("company_details", companyDetails);
handleTopicRequest("company.getCompanyJobPostings", CompanyJobPostings);
handleTopicRequest("employer.createJobPosting", CreateJobPosting);
handleTopicRequest("employer.updateJobPosting", UpdateJobPosting);
handleTopicRequest("employer.getJobPosting", JobPostingData);
handleTopicRequest("employer.updateApplicationStatus", UpdateApplicationStatus);
handleTopicRequest("employer.getJobApplications", JobApplicationsData);
handleTopicRequest("jobseeker.createJobApplication", CreateJobApplication);

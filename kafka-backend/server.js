var connection = new require("./kafka/Connection");
//topics files
//var signin = require('./services/signin.js');
//var Books = require('./services/books.js');
// var JobPostingsData = require("./services/employer/JobPostingsData");

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

// const add_featured_review = require('./services/employer/add_featured_review')
// const get_featured_reviews = require('./services/employer/get_featured_reviews')
//const update_featured_review_status = require('./services/company/update_featured_review_status')
// const remove_featured_review = require('./services/employer/remove_featured_review')
const companyReviews = require("./services/company/getreviews");
const JobPostingData = require("./services/employer/getJobPosting");
const CompanyJobPostings = require("./services/company/getJobPostings");
const GetAllCompanies = require("./services/admin/getAllCompanies");
const GetNumberOfReviewsPerDay = require("./services/admin/getNumberOfReviewsPerDay");
const GetTopFiveMostReviewedCompanies = require("./services/admin/getTopFiveMostReviewedCompanies");
const GetTopFiveCompaniesAvgRating = require("./services/admin/getTopFiveCompaniesAvgRating");
const GetTopFiveSeekersAccpReviews = require("./services/admin/getTopFiveSeekersAccpReviews");
const GetTopTenCEORating = require("./services/admin/getTopTenCEORating");
const CompanySearchQuery = require("./services/company/companySearchQuery");
const getCompanies = require("./services/company/getCompanies");
const updateEmail = require("./services/jobseeker/update_email");
const login = require("./services/users/login");
const signup = require("./services/users/signup");
// const companyReviews = require('./services/company/getreviews')
const get_featured_reviews = require("./services/company/get_featured_reviews");
const update_featured_review_status = require("./services/company/update_featured_review_status");
const get_avg_salary_by_dept = require("./services/salary_reviews/get_avg_salaries_by_dept");
const get_company_dept_titles_list = require("./services/salary_reviews/get_company_dept_titles");
const update_employer = require("./services/employer/update_employer_details");
const searchQuery = require("./services/jobSeeker/searchQuery");
const companyDetails = require("./services/company/getCompanyDetails");
const updateCompanyDetails = require("./services/company/updateCompanyDetails");
const CreateJobPosting = require("./services/employer/createJobPosting");
const UpdateJobPosting = require("./services/employer/updateJobPosting");
const CompanyJobPostingsWithPagination = require("./services/company/getJobPostingsWithPagination");
const CreateJobApplication = require("./services/jobSeeker/createJobApplication");
const UpdateApplicationStatus = require("./services/employer/updateApplicationStatus");
const JobApplicationsData = require("./services/employer/getJobApplications");
const GetChatMessage = require("./services/chats/getChatMessages");
const AddChatMessage = require("./services/chats/addChatMessage");
const CompanyJobStats = require("./services/company/getJobStats");
const update_jobseeker = require("./services/jobseeker/update_jobseeker_profile");
const get_jobseeker = require("./services/jobseeker/get_jobseeker_profile");
const get_resume = require("./services/jobseeker/get_resume");
const update_resume = require("./services/jobseeker/update_resume");
const delete_resume = require("./services/jobseeker/delete_resume");
const getSavedJobs = require("./services/jobSeeker/getSavedJobs");
const appliedJobs = require("./services/jobSeeker/getAppliedJobs");
const addReviews = require("./services/jobSeeker/addReviews");
const get_emp = require("./services/employer/getEmployerProfile");
const MarkReviewAsInappropriate = require("./services/admin/markReviewAsInappropriate");
const GetAllReviews = require("./services/admin/getAllReviews");
const getReviews = require("./services/jobSeeker/getReviews");
const add_salary_review = require("./services/salary_reviews/add_salary_review");
const add_review = require("./services/company/add_review");
const get_reviews = require("./services/company/get_reviews");

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
      console.log("after handle" + res);
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

handleTopicRequest("company.getreviews", get_reviews);
handleTopicRequest("get_reviews", getReviews);
// handleTopicRequest("add_featured_review", add_featured_review);
// handleTopicRequest("update_featured_review_status", update_featured_review_status);
// handleTopicRequest("get_featured_reviews", get_featured_reviews);
// handleTopicRequest("remove_featured_review", remove_featured_review);
handleTopicRequest("update_email", updateEmail);
handleTopicRequest("login", login);
handleTopicRequest("signup", signup);
handleTopicRequest(
  "update_featured_review_status",
  update_featured_review_status
);
handleTopicRequest("get_featured_reviews", get_featured_reviews);
handleTopicRequest("get_avg_salary_by_dept", get_avg_salary_by_dept);
handleTopicRequest(
  "get_company_dept_titles_list",
  get_company_dept_titles_list
);
handleTopicRequest("add_salary_review", add_salary_review);
handleTopicRequest("update_employer_details", update_employer);
handleTopicRequest("search", searchQuery);
handleTopicRequest("company_details", companyDetails);
handleTopicRequest("updateCompanyDetails", updateCompanyDetails);
handleTopicRequest("company.getCompanyJobPostings", CompanyJobPostings);
handleTopicRequest(
  "company.getCompanyJobPostingsWithPagination",
  CompanyJobPostingsWithPagination
);
handleTopicRequest("employer.createJobPosting", CreateJobPosting);
handleTopicRequest("employer.updateJobPosting", UpdateJobPosting);
handleTopicRequest("employer.getJobPosting", JobPostingData);
handleTopicRequest("employer.updateApplicationStatus", UpdateApplicationStatus);
handleTopicRequest("employer.getJobApplications", JobApplicationsData);
handleTopicRequest("jobseeker.createJobApplication", CreateJobApplication);
handleTopicRequest("getChatMessage", GetChatMessage);
handleTopicRequest("addChatMessage", AddChatMessage);
handleTopicRequest("company.getJobStats", CompanyJobStats);
handleTopicRequest("get_resume", get_resume);
handleTopicRequest("update_resume", update_resume);
handleTopicRequest("delete_resume", delete_resume);
handleTopicRequest("get_jobseeker_profile", get_jobseeker);
handleTopicRequest("update_jobseeker_profile", update_jobseeker);
// handleTopicRequest("save_jobs", saveJobs);
handleTopicRequest("get_saved_jobs", getSavedJobs);
handleTopicRequest("get_applied_jobs", appliedJobs);
handleTopicRequest("add_reviews", addReviews);
handleTopicRequest(
  "admin.markReviewAsInappropriate",
  MarkReviewAsInappropriate
);
handleTopicRequest("admin.getAllCompanies", GetAllCompanies);
handleTopicRequest("admin.getAllReviews", GetAllReviews);
handleTopicRequest("admin.getNumberOfReviewsPerDay", GetNumberOfReviewsPerDay);
handleTopicRequest(
  "admin.getTopFiveMostReviewedCompanies",
  GetTopFiveMostReviewedCompanies
);
handleTopicRequest(
  "admin.getTopFiveCompaniesAvgRating",
  GetTopFiveCompaniesAvgRating
);
handleTopicRequest(
  "admin.getTopFiveSeekersAccpReviews",
  GetTopFiveSeekersAccpReviews
);
handleTopicRequest("admin.getTopTenCEORating", GetTopTenCEORating);
handleTopicRequest("get_reviews", getReviews);
// handleTopicRequest("admin.getAllReviews", GetAllReviews);
// handleTopicRequest("admin.getNumberOfReviewsPerDay", GetNumberOfReviewsPerDay);
// handleTopicRequest("admin.getTopFiveMostReviewedCompanies", GetTopFiveMostReviewedCompanies);
// handleTopicRequest("admin.getTopFiveCompaniesAvgRating", GetTopFiveCompaniesAvgRating);
// handleTopicRequest("admin.getTopFiveSeekersAccpReviews", GetTopFiveSeekersAccpReviews);
// handleTopicRequest("admin.getTopTenCEORating", GetTopTenCEORating);
// handleTopicRequest("get_reviews", get_reviews);
handleTopicRequest("company.companySearchQuery", CompanySearchQuery);
handleTopicRequest("company.getAllCompanies", getCompanies);
handleTopicRequest("get_emp_profile", get_emp);
handleTopicRequest("add_employee_review", add_review);

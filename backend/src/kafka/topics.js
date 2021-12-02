const kafka = require("kafka-node");
var host="localhost"
const createKafkaTopics = () => {
  const client = new kafka.KafkaClient({
    kafkaHost: "localhost:9092",
  });
  const admin = new kafka.Admin(client);
  admin.createTopics(
    [
      {
        topic: "response_topic",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "login",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "signup",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "company.getreviews",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "add_featured_review",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "get_featured_reviews",
        partitions: 1,
        replicationFactor: 1,
      },
      {
       topic: "remove_featured_review",
        partitions: 1,
        replicationFactor: 1,
      },
      {
       topic: "get_emp_profile",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "update_company_details",
        partitions: 1,
        replicationFactor: 1,
      },
      {

        topic: "get_resume",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "update_employer_details",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "search_byCompanyName",
        partitions: 1,
        replicationFactor: 1,
      },
      {
       topic: "update_resume",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "job_role",
        partitions: 1,
        replicationFactor: 1,
      }, {
        topic: "company_details",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "updateCompanyDetails",
        partitions: 1,
        replicationFactor: 1,
      }, 
      {
        topic: "save_jobs",
        partitions: 1,
        replicationFactor: 1,
      }, {
        topic: "delete_resume",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "update_jobseeker_profile",
        partitions: 1,
        replicationFactor: 1,
      },{
        topic: "jobseeker.createJobApplication",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "get_jobseeker_profile",
        partitions: 1,
        replicationFactor: 1,
      },{
      
       topic: "employer.createJobPosting",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "company.getCompanyJobPostings",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "employer.updateJobPosting",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "employer.getJobPosting",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "employer.updateApplicationStatus",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "get_saved_jobs",
        partitions: 1,
        replicationFactor: 1,
      },
      {

        topic: "employer.getJobApplications",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "add_reviews",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "addChatMessage",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "getChatMessage",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "company.getJobStats",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "get_reviews",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "search",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "company.companySearchQuery",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "update_featured_review_status",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "update_email",
        partitions: 1,
        replicationFactor: 1,
      },
      {
        topic: "get_applied_jobs",
        partitions: 1,
        replicationFactor: 1,
      }
    ],
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
};

module.exports = {
  createKafkaTopics,
};

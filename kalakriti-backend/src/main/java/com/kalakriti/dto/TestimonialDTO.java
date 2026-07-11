package com.kalakriti.dto;

public class TestimonialDTO {

    public static class Request {
        private String studentName;
        private String message;
        private Integer rating;
        private String courseName;

        public String getStudentName() { return studentName; }
        public void setStudentName(String studentName) { this.studentName = studentName; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public Integer getRating() { return rating; }
        public void setRating(Integer rating) { this.rating = rating; }
        public String getCourseName() { return courseName; }
        public void setCourseName(String courseName) { this.courseName = courseName; }
    }
}

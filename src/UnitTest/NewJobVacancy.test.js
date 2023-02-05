import { render, screen } from "@testing-library/react";
import React, { useEffect, useState } from "react";
const { Login } = require("./Login");
const { NewJobVacancySheet } = require("./NewJobVacancySheet");
const { EditPosition } = require("./EditPosition");
const { NewJobVacancyExpirationDate } = require("./NewJobVacancyExpirationDate");



describe("Recruiter log in", () => {
  it("check valid UserName and Password", () => {
    expect(Login("Nourah2001" , "Nourah@999")).toBe(true);
  });

  it("check invalid UserName", () => {
    expect(Login("Nourah2", "Nourah@999")).toBe(false);
  });

  it("check invalid Password", () => {
    expect(Login("Nourah2001", "Nourah@")).toBe(false);
  });
  it("check empty feilds", () => {
    expect(Login("","")).toBe(false);
  });
 
});



describe("Edit Position", () => {
  it("Edit Position Name and Expected Salary with valid inputs values", () => {
    expect(EditPosition("Web designer" , "A web designer is responsible for creating the design and layout of a website or web pages. It and can mean working on a brand new website or updating an already existing site." , 3300 , "We Expect You To Start Within 1 Months" , "Which programming languages do you know?" , "MERN stack and python")).toBe(true);
  });

  it("Edit Position Name and Position Description with invalid inputs values", () => {
    expect(EditPosition("Web@@ designer" , "A web designer is responsible$$ for creating the design and layout of a website or web pages. It and can mean working on a brand new website or updating an already existing site." ,3300 , "We Expect You To Start Within 1 Months" , "Which programming languages do you know?" , "MERN stack and python")).toBe(false);
  });
  it("Edit Position Name and Position Description with invalid inputs values2", () => {
    expect(EditPosition("Web designer" , "A web## designer is responsible$$ for creating the design and layout of a website or web pages. It and can mean working on a brand new website or updating an already existing site." ,3300 , "We Expect You To Start Within 1 Months" , "Which programming languages do you know?" , "MERN stack and python")).toBe(false);
  });

  it("Edit Expected Salary and Notice Period with invalid inputs values", () => {
    expect(EditPosition("Web designer" , "A web designer is responsible for creating the design and layout of a website or web pages. It and can mean working on a brand new website or updating an already existing site." ,273002 , "We Expect You To Start Within 1 Months" , "Which programming languages do you know?" , "MERN stack and python")).toBe(false);
  });
  it("Edit Expected Salary and Notice Period with invalid inputs values22", () => {
    expect(EditPosition("Web designer" , "A web designer is responsible for creating the design and layout of a website or web pages. It and can mean working on a brand new website or updating an already existing site." ,273002 , "We@@@Expect%%% You To Start Within 1 Months" , "Which programming languages do you know?" , "MERN stack and python")).toBe(false);
  });
  it("Edit Question and answer invalid inputs values", () => {
    expect(EditPosition("Web designer" , "A web designer is responsible for creating the design and layout of a website or web pages. It and can mean working on a brand new website or updating an already existing site." ,3300 , "We Expect You To Start Within 1 Months" , "Which###$ programming languages do you know?" , "MERN stack and python")).toBe(false);
  });
  it("Edit Question and answer invalid inputs values22", () => {
    expect(EditPosition("Web designer" , "A web designer is responsible for creating the design and layout of a website or web pages. It and can mean working on a brand new website or updating an already existing site." ,3300 , "We Expect You To Start Within 1 Months" , "Which programming languages do you know?" , "MERN###$ stack and python")).toBe(false);
  });
  it("Edit Position with empty feilds", () => {
    expect(EditPosition("" , "" , 0, "" , "" , "")).toBe(false);
  });
 
});


describe("New Job VacancySheet", () => {
  it("Upload valid Candidate Sheet", () => {
    expect(NewJobVacancySheet("Candidates.xlsx")).toBe(".XLSX files Uploaded Successfully");
  });

  it("Upload invalid Candidate Sheet", () => {
    expect(NewJobVacancySheet("PinnacleLogo.png")).toBe("Only .XLSX and .CSV files are allowed");
  }); 

});

describe("New Job VacancyDate", () => {

  it("Choose invalid Expiration Date", () => {
    expect(NewJobVacancyExpirationDate(new Date('2022/5/12'),new Date())).toBeNull();
  }); 
  it("Choose valid Expiration Date", () => {
    expect(NewJobVacancyExpirationDate(new Date('2023/5/12'), new Date())).toBeTruthy();
  }); 
});
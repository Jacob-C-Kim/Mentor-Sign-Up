export interface FormData {
  email: string;
  name: string;
  major: string;
  year: string;
  mentorGoals: string;
  hobbies: string;
}

export interface FormErrors {
  email?: string;
  name?: string;
  major?: string;
  year?: string;
  mentorGoals?: string;
  hobbies?: string;
}

export const validateEmail = (email: string): boolean => {
  const ritEmailRegex = /^[a-zA-Z0-9._%+-]+@rit\.edu$/;
  return ritEmailRegex.test(email);
};

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Email validation
  if (!formData.email.trim()) {
    errors.email = "RIT Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid RIT email address (@rit.edu)";
  }

  // Required field validation
  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.major.trim()) {
    errors.major = "Major is required";
  }

  if (!formData.year) {
    errors.year = "Year is required";
  }

  if (!formData.mentorGoals.trim()) {
    errors.mentorGoals = "Please describe what you hope to get out of being a mentor";
  }

  if (!formData.hobbies.trim()) {
    errors.hobbies = "Please share some of your hobbies";
  }

  return errors;
};
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { FormData, FormErrors, validateForm } from "../utils/formValidation";
import { YEAR_OPTIONS } from "../constants/formConstants";

export default function BackupMentorForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    major: "",
    year: "",
    mentorGoals: "",
    hobbies: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-[#8bd4e0] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
        <p className="text-gray-600 leading-relaxed">
          Your mentor sign up has been successfully submitted.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Alternative Form</h2>
        <p className="text-gray-600 mb-2">
          If the Google Form above doesn't work, you can use this backup form.
        </p>
        <p className="text-sm text-gray-500">All fields are required</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* RIT Email */}
        <div>
          <Label htmlFor="email" className="text-gray-800 font-medium mb-2 block">
            RIT Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="abc1234@rit.edu"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`h-12 px-4 text-gray-900 bg-white border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 ${
              errors.email 
                ? 'border-red-400 focus:border-red-500 bg-red-50' 
                : 'border-gray-200 focus:border-[#8bd4e0] hover:border-gray-300'
            }`}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-sm text-red-600 flex items-center gap-1" role="alert">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.email}
            </p>
          )}
        </div>

        {/* Name */}
        <div>
          <Label htmlFor="name" className="text-gray-800 font-medium mb-2 block">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`h-12 px-4 text-gray-900 bg-white border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 ${
              errors.name 
                ? 'border-red-400 focus:border-red-500 bg-red-50' 
                : 'border-gray-200 focus:border-[#8bd4e0] hover:border-gray-300'
            }`}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-sm text-red-600 flex items-center gap-1" role="alert">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.name}
            </p>
          )}
        </div>

        {/* Major */}
        <div>
          <Label htmlFor="major" className="text-gray-800 font-medium mb-2 block">
            Major
          </Label>
          <Input
            id="major"
            type="text"
            value={formData.major}
            onChange={(e) => handleInputChange('major', e.target.value)}
            placeholder="e.g., Computer Science, Business, Engineering"
            aria-invalid={errors.major ? 'true' : 'false'}
            aria-describedby={errors.major ? 'major-error' : undefined}
            className={`h-12 px-4 text-gray-900 bg-white border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 ${
              errors.major 
                ? 'border-red-400 focus:border-red-500 bg-red-50' 
                : 'border-gray-200 focus:border-[#8bd4e0] hover:border-gray-300'
            }`}
          />
          {errors.major && (
            <p id="major-error" className="mt-2 text-sm text-red-600 flex items-center gap-1" role="alert">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.major}
            </p>
          )}
        </div>

        {/* Year */}
        <div>
          <Label htmlFor="year" className="text-gray-800 font-medium mb-2 block">
            Year
          </Label>
          <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
            <SelectTrigger 
              aria-invalid={errors.year ? 'true' : 'false'}
              aria-describedby={errors.year ? 'year-error' : undefined}
              className={`h-12 px-4 text-gray-900 bg-white border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 ${
                errors.year 
                  ? 'border-red-400 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-[#8bd4e0] hover:border-gray-300'
              }`}
            >
              <SelectValue placeholder="Select your year" className="text-gray-500" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2 border-gray-200 shadow-lg">
              {YEAR_OPTIONS.map((year) => (
                <SelectItem 
                  key={year} 
                  value={year}
                  className="cursor-pointer hover:bg-[#f0fafa] focus:bg-[#f0fafa] rounded-lg mx-1"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.year && (
            <p id="year-error" className="mt-2 text-sm text-red-600 flex items-center gap-1" role="alert">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.year}
            </p>
          )}
        </div>

        {/* Mentor Goals */}
        <div>
          <Label htmlFor="mentorGoals" className="text-gray-800 font-medium mb-2 block">
            What do you hope to get out of being a mentor?
          </Label>
          <Textarea
            id="mentorGoals"
            value={formData.mentorGoals}
            onChange={(e) => handleInputChange('mentorGoals', e.target.value)}
            placeholder="Share your goals and what you hope to achieve as a mentor..."
            rows={4}
            aria-invalid={errors.mentorGoals ? 'true' : 'false'}
            aria-describedby={errors.mentorGoals ? 'mentorGoals-error' : undefined}
            className={`p-4 text-gray-900 bg-white border-2 rounded-xl resize-none transition-all duration-200 focus:outline-none focus:ring-0 ${
              errors.mentorGoals 
                ? 'border-red-400 focus:border-red-500 bg-red-50' 
                : 'border-gray-200 focus:border-[#8bd4e0] hover:border-gray-300'
            }`}
          />
          {errors.mentorGoals && (
            <p id="mentorGoals-error" className="mt-2 text-sm text-red-600 flex items-center gap-1" role="alert">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.mentorGoals}
            </p>
          )}
        </div>

        {/* Hobbies */}
        <div>
          <Label htmlFor="hobbies" className="text-gray-800 font-medium mb-2 block">
            What are some of your hobbies?
          </Label>
          <Textarea
            id="hobbies"
            value={formData.hobbies}
            onChange={(e) => handleInputChange('hobbies', e.target.value)}
            placeholder="Tell us about your interests and hobbies..."
            rows={4}
            aria-invalid={errors.hobbies ? 'true' : 'false'}
            aria-describedby={errors.hobbies ? 'hobbies-error' : undefined}
            className={`p-4 text-gray-900 bg-white border-2 rounded-xl resize-none transition-all duration-200 focus:outline-none focus:ring-0 ${
              errors.hobbies 
                ? 'border-red-400 focus:border-red-500 bg-red-50' 
                : 'border-gray-200 focus:border-[#8bd4e0] hover:border-gray-300'
            }`}
          />
          {errors.hobbies && (
            <p id="hobbies-error" className="mt-2 text-sm text-red-600 flex items-center gap-1" role="alert">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.hobbies}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-[#8bd4e0] hover:bg-[#7bc7d3] text-black font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
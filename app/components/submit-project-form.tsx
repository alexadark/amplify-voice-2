'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/input';
import { useState } from 'react';
import { BorderButton } from './ui/tailwindcss-buttons';

const MONTHLY_REVENUE_OPTIONS = [
  { value: "0-5000", label: "0-$5,000" },
  { value: "5000-10000", label: "$5,000-$10,000" },
  { value: "10000+", label: "$10,000+" }
];

const PROJECT_BUDGET_OPTIONS = [
  { value: "less_than_4000", label: "< $4,000" },
  { value: "4000-10000", label: "$4,000-$10,000" },
  { value: "more_than_10000", label: "> $10,000" }
];

export interface SubmitProjectFormProps {
  onClose?: () => void;
}

export default function SubmitProjectForm({ onClose }: SubmitProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    company: '',
    website: '',
    project_objectives: '',
    timeline: '',
    budget: '',
    mrr: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        fields: [
          {
            name: 'firstname',
            value: formData.firstname,
            objectId: 'field-firstname',
            key: 'firstname',
          },
          {
            name: 'lastname',
            value: formData.lastname,
            objectId: 'field-lastname',
            key: 'lastname',
          },
          {
            name: 'phone',
            value: formData.phone,
            objectId: 'field-phone',
            key: 'phone',
          },
          {
            name: 'email',
            value: formData.email,
            objectId: 'field-email',
            key: 'email',
          },
          {
            name: 'company',
            value: formData.company,
            objectId: 'field-company',
            key: 'company',
          },
          {
            name: '0-2/website',
            value: formData.website,
            objectId: 'field-website',
            key: 'website',
          },
          {
            name: 'project_objectives',
            value: formData.project_objectives,
            objectId: 'field-project',
            key: 'project_objectives',
          },
          {
            name: '0-2/timeline',
            value: formData.timeline,
            objectId: 'field-timeline',
            key: 'timeline',
          },
          {
            name: '0-2/budget',
            value: formData.budget,
            objectId: 'field-budget',
            key: 'budget',
          },
          {
            name: '0-2/mrr',
            value: formData.mrr,
            objectId: 'field-mrr',
            key: 'mrr',
          },
        ],
        context: {
          pageUri: window.location.href,
          pageName: document.title
        }
      };

      console.log('Submitting form with payload:', payload);

      const response = await fetch(
        'https://api.hsforms.com/submissions/v3/integration/submit/145076170/fb941f0f-22c0-4db3-8916-c11363b53c02',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('HubSpot API Error:', {
          status: response.status,
          statusText: response.statusText,
          response: responseData,
          payload: payload
        });
        
        // Show specific validation errors if available
        if (responseData.errors && responseData.errors.length > 0) {
          const errorMessages = responseData.errors.map((error: any) => error.message).join('\n');
          throw new Error(`Validation errors:\n${errorMessages}`);
        }
        
        throw new Error(responseData.message || `HubSpot API Error: ${response.status} ${response.statusText}`);
      }

      console.log('Form submitted successfully:', responseData);
      setIsSubmitted(true);
      onClose?.();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      // Show error to user with more details
      alert(`Error submitting form: ${error.message || 'Unknown error occurred'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-16 space-y-4">
        <h3 className="text-2xl font-semibold">
          Thanks for submitting your project idea.
        </h3>
        <p className="text-neutral-600 dark:text-neutral-300">
          Alejo and Paige will get back to you within the next 48 hours. We look
          forward to exploring the possibility of collaboration with you!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-neutral-600 dark:text-neutral-300">
        Please provide as much detail about your use case and/or project idea. Once you submit, we&apos;ll reach
        out to you within 1 business day to schedule a follow up call and assess the viability of your project.
      </p>
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstname">First Name *</Label>
            <Input
              id="firstname"
              name="firstname"
              placeholder="Enter your first name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastname">Last Name *</Label>
            <Input
              id="lastname"
              name="lastname"
              placeholder="Enter your last name"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone number *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="company">Company name *</Label>
            <Input
              id="company"
              name="company"
              placeholder="Enter your company name"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="website">Website URL *</Label>
            <Input
              id="website"
              name="website"
              type="url"
              placeholder="Enter your company website"
              value={formData.website}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="project_objectives">Project Objectives: *</Label>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Describe your business and use case for an AI voice assistant. Please be as detailed as possible. (The more detail, the better to get the most out of our call!)
          </p>
          <Textarea
            id="project_objectives"
            name="project_objectives"
            placeholder="Describe your business and use case..."
            value={formData.project_objectives}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="timeline">Timeline *</Label>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            What is your ideal timeline for implementing the Voice Agent?
          </p>
          <Input
            id="timeline"
            name="timeline"
            placeholder="Enter your preferred timeline"
            value={formData.timeline}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="budget">Project Budget *</Label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="">Please Select</option>
            {PROJECT_BUDGET_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="mrr">Monthly Revenue *</Label>
          <select
            id="mrr"
            name="mrr"
            value={formData.mrr}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            required
          >
            <option value="">Please Select</option>
            {MONTHLY_REVENUE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <BorderButton
          type="submit"
          label={isSubmitting ? 'Submitting...' : 'Submit'}
          onClick={(e) => {
            if (isSubmitting) {
              e.preventDefault();
            }
          }}
        />
      </form>
    </div>
  );
}

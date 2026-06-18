export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface WorkshopDetailItem {
  label: string;
  value: string;
  description: string;
  icon: 'age' | 'duration' | 'mode' | 'fee' | 'start';
}

export interface OutcomeItem {
  level: number;
  title: string;
  description: string;
  icon: 'ai' | 'robotics' | 'automation' | 'logic' | 'graduation';
}

export interface RegistrationFormData {
  studentName: string;
  parentEmail: string;
  parentPhone: string;
}

export interface RegistrationResponse {
  success: boolean;
  ticketId?: string;
  message?: string;
}

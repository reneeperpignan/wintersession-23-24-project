import React from 'react'

import { Button } from "@/components/ui/button"

interface FormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  name: string;
  description: string;
  // directors  will be defaulted to signed-in user
  mailingList?: string;
  clubType: string;
  website?: string;
  compType: string;
  meetingDay: string;
  meetingTime: string;
  timeLower: number;
  timeUpper: number;
}

const clubTypes = ["Academic", "Sports", "Music", "Arts", "Professional", "Affinity", "Other"];
const compTypes = ["Mail sign-up", "Completion comp", "Competitive comp"];
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Fridays", "Saturday", "Sunday"];

function Form({ onSubmit }: FormProps) {
  const [formData, setFormData] = React.useState<FormData>({
    name: '',
    description: '',
    mailingList: '',
    clubType: '',
    website: '',
    compType: '',
    meetingDay: '',
    meetingTime: '12:00',
    timeLower: 0,
    timeUpper: 0
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Club name:
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required/>
      </label>
      <br />
      <label>
        Description:
        <textarea name="description" value={formData.description} rows={4} cols={50} required></textarea>
      </label>
      <br />
      <label>
        Email for mailing list:
        <input type="email" name="mailingList" value={formData.mailingList} />
      </label>
      <br />
      <label>
        Type of club:
        <select name="clubType" value={formData.clubType} required>
          <option value="">Select a type</option>
          {clubTypes.map((type:string) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Website link:
        <input type="url" name="website" value={formData.website} onChange={handleInputChange}/>
      </label>
      <br />
      <label>
        Type of club:
        <select name="clubType" value={formData.compType} required>
          <option value="">Select a type</option>
          {compTypes.map((type:string) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Meeting Time:
        <select name="meetingDay" value={formData.meetingDay} required>
          <option value="">Select a day</option>
          {weekDays.map((type:string) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input type="time" name="meetingTime" value={formData.meetingTime} required />
      </label>
      <br />
      <label>
        Time commitment: <br />
        Between
          <input type="number" name="timeLower" value={formData.timeLower} onChange={handleInputChange} required />
        and
          <input type="number" name="timeUpper" value={formData.timeUpper} onChange={handleInputChange} required />
        hours
      </label>
      <br />
      <Button variant="outline" type="submit">Submit</Button>
    </form>
  );
}

export default Form;

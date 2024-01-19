// "use client";
// import { Button } from "@/components/ui/button";

// interface FormProps {
//   onSubmit: (data: FormData) => void;
// }

// interface FormData {
//   name: string;
//   description: string;
//   // directors  will be defaulted to signed-in user
//   mailinglist?: string;
//   type: string;
//   comptype: string;
//   meetingday: string;
//   meetingtime: string;
//   timelower: number;
//   timeupper: number;
//   logo?: string;
//   website?: string;
// }

// const clubTypes = ["Academic", "Sports", "Music", "Arts", "Professional", "Affinity", "Other"];
// const compTypes = ["Mail sign-up", "Completion comp", "Competitive comp"];
// const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Fridays", "Saturday", "Sunday"];

// function AddForm({ onSubmit }: FormProps) {
//   function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   }

//   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     onSubmit(formData);
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Club name:
//         <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
//       </label>
//       <br />
//       <label>
//         Description:
//         <textarea
//           name="description"
//           value={formData.description}
//           rows={4}
//           cols={50}
//           onChange={() => void handleInputChange}
//           required
//         ></textarea>
//       </label>
//       <br />
//       <label>
//         Type of club:
//         <select name="type" value={formData.type} onChange={() => void handleInputChange} required>
//           <option value="">Select a type</option>
//           {clubTypes.map((type: string) => (
//             <option key={type} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>
//       </label>
//       <br />
//       <label>
//         Website link:
//         <input type="url" name="website" value={formData.website} onChange={handleInputChange} />
//       </label>
//       <br />
//       <label>
//         Url of logo:
//         <input type="url" name="logo" onChange={handleInputChange} />
//       </label>
//       <br />
//       <label>
//         Type of comping
//         <select name="comptype" value={formData.comptype} onChange={() => void handleInputChange} required>
//           <option value="">Select a type</option>
//           {compTypes.map((type: string) => (
//             <option key={type} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>
//       </label>
//       <br />
//       <label>
//         Link for mail sign-up:
//         <input type="url" name="mailinglist" value={formData.mailinglist} onChange={handleInputChange} />
//       </label>
//       <br />
//       <label>
//         Meeting Time:
//         <select name="meetingday" value={formData.meetingday} onChange={() => void handleInputChange} required>
//           <option value="">Select a day</option>
//           {weekDays.map((day: string) => (
//             <option key={day} value={day}>
//               {day}
//             </option>
//           ))}
//         </select>
//         <input type="time" name="meetingtime" value={formData.meetingtime} onChange={handleInputChange} required />
//       </label>
//       <br />
//       <label>
//         Time commitment: <br />
//         Between{" "}
//         <input
//           type="number"
//           name="timelower"
//           value={formData.timelower}
//           onChange={handleInputChange}
//           style={{ width: "40px" }}
//           required
//         />{" "}
//         and{" "}
//         <input
//           type="number"
//           name="timeupper"
//           value={formData.timeupper}
//           onChange={handleInputChange}
//           style={{ width: "40px" }}
//           required
//         />{" "}
//         hours
//       </label>
//       <br />
//       <Button variant="outline" type="submit">
//         Submit
//       </Button>
//     </form>
//   );
// }

// export default AddForm;

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type Orgs } from "@/lib/firebase/schema";

export default function OrgCardHomePage(props: Orgs) {
  // Calculate the number of members
  const numberOfMembers = props.members.length;

  return (
    <Card>
      <CardHeader>
        <CardDescription>{`# Members: ${numberOfMembers}`}</CardDescription>
        <CardTitle>{props.name}</CardTitle>
      </CardHeader>
      <CardContent>
        Org Description
        <div>
          <Badge variant="outline">Time Commitment</Badge>
          <Badge variant="outline">Org Type</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">More Info</Button>
        <Button variant="outline">Comp/Join</Button>
      </CardFooter>
    </Card>
  );
}

// const clubTypes = ["Academic", "Sports", "Music", "Arts", "Professional", "Affinity", "Other"];
// const compTypes = ["Mail sign-up", "Completion comp", "Competitive comp"];
// const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Fridays", "Saturday", "Sunday"];

// function Form({ onSubmit }: FormProps) {
//   const [formData, setFormData] = React.useState<FormData>({
//     name: '',
//     description: '',
//     mailingList: '',
//     clubType: '',
//     website: '',
//     logo: undefined,
//     compType: '',
//     meetingDay: '',
//     meetingTime: '12:00',
//     timeLower: 0,
//     timeUpper: 0
//   });

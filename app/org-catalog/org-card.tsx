import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type Orgs } from "@/lib/firebase/schema";
import { Toggle } from "@/components/ui/toggle"


// Card for catalog and favorited page

export default function OrgCardCatalog(props: Orgs) {
  // Calculate the number of members
  const MemberCount = props.members.length;

  return (
    <Card>
      <CardHeader>
        <Toggle>&#9734;</Toggle>
        <CardDescription>{`${MemberCount} Members`}</CardDescription>
        <CardTitle>{props.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {props.description}
        <div>
          <Badge variant="outline">{props.timecommitment}</Badge>
          <Badge variant="outline">{props.comptype}</Badge>
          <Badge variant="outline">{props.type}</Badge>
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
